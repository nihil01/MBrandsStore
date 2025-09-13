import { useState } from "react";
import {Search, ShoppingBag, Menu, X, User, Settings} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import ThemeToggle from "@/components/ThemeToggle.tsx";
import AuthModal from "@/components/AuthModal.tsx";
import {AnimatePresence} from "framer-motion";
import {useAuth} from "@/components/AuthContext.tsx";
import {useNavigate} from "react-router-dom";

interface HeaderProps {
    cartItemCount?: number;
    onCartClick?: () => void;
    onSearchChange?: (query: string) => void;
    onCategorySelect?: (category: string, subcategory?: string) => void;
    textColor: string;
}

export default function Header({
                                   cartItemCount = 0,
                                   onCartClick,
                                   onSearchChange,
                                   onCategorySelect,
                                   textColor,
                               }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [authModalOpen, setAuthModalOpen] = useState(false);

    const auth = useAuth()
    const navigate = useNavigate();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        onSearchChange?.(value);
    };

    const categories = {
        "New Arrivals": [],
        Men: ["T-Shirts", "Jeans", "Jackets", "Shoes", "Accessories"],
        Women: ["Tops", "Dresses", "Jeans", "Jackets", "Shoes", "Bags"],
        Accessories: ["Bags", "Belts", "Hats", "Watches", "Jewelry"],
        Sale: [],
    };

    return (
        <>

            <AnimatePresence>
                {authModalOpen && (
                    <AuthModal
                        isOpen={authModalOpen}
                        onClose={() => setAuthModalOpen(false)}
                    />
                )}
            </AnimatePresence>


            <div className="w-full px-4 py-4 flex items-center justify-between gap-10">
                {/* Logo */}
                <div className="flex items-center shrink-0">
                    <img
                        src="/assets/logo.png"
                        alt="MBrandsStore"
                        className="h-16 w-auto object-contain"
                    />
                </div>

                {/* Navigation */}
                <nav className="hidden md:block">
                    <NavigationMenu>
                        <NavigationMenuList className="flex space-x-4">
                            {Object.entries(categories).map(([category, subcategories]) => (
                                <NavigationMenuItem key={category}>
                                    {subcategories.length > 0 ? (
                                        <>
                                            <NavigationMenuTrigger
                                                style={{ color: textColor }}
                                                className="text-sm font-medium hover:opacity-80 transition-colors"
                                            >
                                                {category}
                                            </NavigationMenuTrigger>
                                            <NavigationMenuContent>
                                                <div className="grid w-[200px] gap-1 p-2">
                                                    <button
                                                        onClick={() => onCategorySelect?.(category)}
                                                        style={{ color: textColor }}
                                                        className="text-left px-3 py-2 text-sm hover:opacity-70 rounded-md transition-colors"
                                                    >
                                                        All {category}
                                                    </button>
                                                    {subcategories.map((subcategory) => (
                                                        <button
                                                            key={subcategory}
                                                            onClick={() =>
                                                                onCategorySelect?.(category, subcategory)
                                                            }
                                                            style={{ color: textColor }}
                                                            className="text-left px-3 py-2 text-sm hover:opacity-70 rounded-md transition-colors"
                                                        >
                                                            {subcategory}
                                                        </button>
                                                    ))}
                                                </div>
                                            </NavigationMenuContent>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => onCategorySelect?.(category)}
                                            style={{ color: textColor }}
                                            className="px-3 py-2 text-sm font-medium hover:opacity-80 transition-colors"
                                        >
                                            {category}
                                        </button>
                                    )}
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </nav>

                {/* Search */}
                <div className="relative w-full max-w-xs hidden md:block">
                    <Search
                        style={{ color: textColor }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                    />
                    <Input
                        type="search"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="pl-10 text-base"
                        style={{ color: textColor }}
                    />
                </div>


                {/* Actions */}
                <div className="flex items-center gap-3">
                    {auth.role === "ROLE_ADMIN" ? (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => navigate("/admin")}
                        >
                            <Settings style={{ color: textColor }} />
                        </Button>
                    ) : auth.role === "ROLE_USER" ? (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => navigate("/profile")}
                        >
                            <User style={{ color: textColor }} />
                        </Button>
                    ) : (
                        <Button variant="ghost" size="icon" onClick={() => setAuthModalOpen(true)}>
                            <User style={{ color: textColor }} />
                        </Button>
                    )}

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onCartClick}
                        className="relative"
                    >
                        <ShoppingBag style={{ color: textColor }} />
                        {cartItemCount > 0 && (
                            <span
                                className="absolute -top-1 -right-1 rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                style={{
                                    backgroundColor: textColor,
                                    color: "#1a0f1f", // темный фон для контраста
                                }}
                            >
                {cartItemCount}
            </span>
                        )}
                    </Button>

                    <ThemeToggle />

                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <X style={{ color: textColor }} />
                        ) : (
                            <Menu style={{ color: textColor }} />
                        )}
                    </Button>
                </div>

            </div>

        </>
    );
}
