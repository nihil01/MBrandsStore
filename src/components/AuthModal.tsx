import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

type AuthModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function AuthModal({ onClose }: AuthModalProps) {
    const [isLogin, setIsLogin] = useState(true);

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const endpoint = isLogin ? "login" : "register";
            const body = isLogin
                ? { email, password }
                : { email, password, name, surname, mobileNumber };

            const res = await fetch(`http://localhost:8080/api/v1/auth/${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            const data = await res.json();

            if (res.ok && data.token) {
                localStorage.setItem("authToken", data.token);
                console.log("Success:", data.message);
                onClose(); // закрываем модалку
            } else {
                setError(data.message || "Something went wrong");
            }
        } catch (err: any) {
            console.error(err);
            setError("Server error");
        } finally {
            setLoading(false);
        }
    };


    return (
        <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl w-full max-w-md p-6 relative"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 30, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                    <X className="w-5 h-5" />
                </button>

                <h2 className="text-2xl font-bold text-center mb-4 text-purple-600">
                    {isLogin ? "Login" : "Register"}
                </h2>

                {error && (
                    <p className="text-red-500 text-sm text-center mb-2">{error}</p>
                )}

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    {!isLogin && (
                        <>
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="p-2 rounded-lg border focus:outline-purple-500"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Surname"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                                className="p-2 rounded-lg border focus:outline-purple-500"
                                required
                            />
                            <input
                                type="tel"
                                placeholder="Mobile number"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                                className="p-2 rounded-lg border focus:outline-purple-500"
                                required
                            />
                        </>

                    )}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-2 rounded-lg border focus:outline-purple-500"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-2 rounded-lg border focus:outline-purple-500"
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
                    >
                        {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
                    </button>
                </form>

                <p className="text-center mt-4 text-sm text-gray-600 dark:text-gray-300">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-purple-600 font-semibold"
                    >
                        {isLogin ? "Register" : "Login"}
                    </button>
                </p>
            </motion.div>
        </motion.div>
    );
}
