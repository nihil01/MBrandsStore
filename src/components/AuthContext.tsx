import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type UserRole = "ROLE_USER" | "ROLE_ADMIN" | null;

interface AuthContextType {
    token: string | null;
    role: UserRole;
    login: (token: string, role: UserRole) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [role, setRole] = useState<UserRole>(null);
    const [loading, setLoading] = useState(true);

    // Проверяем токен и получаем роль при инициализации
    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        if (!storedToken) {
            setLoading(false);
            return;
        }

        const fetchRole = async () => {
            try {
                const res = await fetch("/api/v1/auth/role", {
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                    },
                });
                if (!res.ok) throw new Error("Failed to fetch role");

                const data = await res.json();
                const fetchedRole: UserRole = data.role || null;

                setToken(storedToken);
                setRole(fetchedRole);
            } catch (err) {
                console.error("Role fetch error:", err);
                localStorage.removeItem("authToken");
                setToken(null);
                setRole(null);
            } finally {
                setLoading(false);
            }
        };

        fetchRole();
    }, []);

    const login = (token: string, role: UserRole) => {
        setToken(token);
        setRole(role);
        localStorage.setItem("authToken", token);
    };

    const logout = () => {
        setToken(null);
        setRole(null);
        localStorage.removeItem("authToken");
    };

    return (
        <AuthContext.Provider value={{ token, role, login, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
