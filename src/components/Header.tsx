import { useState } from "react";
import { Search, ShoppingBag, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface HeaderProps {
    cartItemCount?: number;
    onCartClick?: () => void;
    onSearchChange?: (query: string) => void;
    onCategorySelect?: (category: string, subcategory?: string) => void;
}

export default function Header({
                                   cartItemCount = 0,
                                   onCartClick,
                                   onSearchChange,
                                   onCategorySelect,
                               }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

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
        <header className="bg-background border-b border-border sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between gap-6">
                    {/* Logo */}
                    <div className="flex items-center shrink-0">
                        <img
                            src="/assets/logo.png"
                            alt="MBrandsStore"
                            className="h-10 w-auto object-contain"
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
                                                <NavigationMenuTrigger className="text-sm font-medium text-foreground hover:text-primary bg-transparent focus:bg-transparent">
                                                    {category}
                                                </NavigationMenuTrigger>
                                                <NavigationMenuContent>
                                                    <div className="grid w-[200px] gap-1 p-2">
                                                        <button
                                                            onClick={() => onCategorySelect?.(category)}
                                                            className="text-left px-3 py-2 text-sm hover:bg-accent rounded-md transition-colors"
                                                        >
                                                            All {category}
                                                        </button>
                                                        {subcategories.map((subcategory) => (
                                                            <button
                                                                key={subcategory}
                                                                onClick={() =>
                                                                    onCategorySelect?.(category, subcategory)
                                                                }
                                                                className="text-left px-3 py-2 text-sm hover:bg-accent rounded-md transition-colors"
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
                                                className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
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
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                            type="search"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="pl-10"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon">
                            <User className="w-5 h-5" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onCartClick}
                            className="relative"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
                            )}
                        </Button>

                        {/* Mobile Menu Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? (
                                <X className="w-5 h-5" />
                            ) : (
                                <Menu className="w-5 h-5" />
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}
