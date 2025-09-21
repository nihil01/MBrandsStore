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
import LanguageToggle from "@/components/LanguageToggle";
import AuthModal from "@/components/AuthModal";
import {AnimatePresence} from "framer-motion";
import {useAuth} from "@/components/AuthContext";
import {useNavigate} from "react-router-dom";
import { useLanguage } from "@/components/LanguageContext";

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
    const [authModalOpen, setAuthModalOpen] = useState(false);

    const auth = useAuth();
    const navigate = useNavigate();
    const { t } = useLanguage();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        onSearchChange?.(value);
    };

    const categories = {
        [t('nav.newArrivals')]: [],
        [t('nav.men')]: [t('nav.tshirts'), t('nav.jeans'), t('nav.jackets'), t('nav.shoes'), t('nav.accessories')],
        [t('nav.women')]: [t('nav.tops'), t('nav.dresses'), t('nav.jeans'), t('nav.jackets'), t('nav.shoes'), t('nav.bags')],
        [t('nav.accessories')]: [t('nav.bags'), t('nav.belts'), t('nav.hats'), t('nav.watches'), t('nav.jewelry')],
        [t('nav.sale')]: [],
    };

    return (
        <>
            {/* Auth Modal */}
            {authModalOpen && (
                <AuthModal
                    isOpen={authModalOpen}
                    onClose={() => setAuthModalOpen(false)}
                />
            )}

            {/* Desktop Header */}
            <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <h1 className="text-2xl font-bold text-gray-900">MBrands</h1>
                        </div>

                        {/* Desktop Navigation */}
                        <NavigationMenu className="hidden lg:flex">
                            <NavigationMenuList className="flex space-x-8">
                                {Object.entries(categories).map(([category, subcategories]) => (
                                    <NavigationMenuItem key={category}>
                                        {subcategories.length > 0 ? (
                                            <>
                                                <NavigationMenuTrigger className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                                                    {category}
                                                </NavigationMenuTrigger>
                                                <NavigationMenuContent>
                                                    <div className="grid w-48 gap-1 p-4">
                                                        {subcategories.map((subcategory) => (
                                                            <Button
                                                                key={subcategory}
                                                                variant="ghost"
                                                                className="justify-start text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                                                onClick={() => onCategorySelect?.(category, subcategory)}
                                                            >
                                                                {subcategory}
                                                            </Button>
                                                        ))}
                                                    </div>
                                                </NavigationMenuContent>
                                            </>
                                        ) : (
                                            <Button
                                                variant="ghost"
                                                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                                                onClick={() => onCategorySelect?.(category)}
                                            >
                                                {category}
                                            </Button>
                                        )}
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>

                        {/* Search Bar */}
                        <div className="hidden md:flex flex-1 max-w-md mx-8">
                            <div className="relative w-full">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input
                                    type="search"
                                    placeholder={t('header.search')}
                                    className="w-full pl-10 pr-4 py-2 border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2">
                            {/* Language Toggle */}
                            <LanguageToggle />

                            {/* User Actions */}
                            {auth.role === "ROLE_ADMIN" ? (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => navigate("/admin")}
                                    className="hidden sm:flex text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                                >
                                    <Settings className="h-4 w-4 mr-2" />
                                    {t('header.admin')}
                                </Button>
                            ) : auth.role === "ROLE_USER" ? (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="hidden sm:flex text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                                >
                                    <User className="h-4 w-4 mr-2" />
                                    {t('header.profile')}
                                </Button>
                            ) : (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setAuthModalOpen(true)}
                                    className="hidden sm:flex text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                                >
                                    <User className="h-4 w-4 mr-2" />
                                    {t('header.login')}
                                </Button>
                            )}

                            {/* Shopping Cart */}
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={onCartClick}
                                className="relative text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                            >
                                <ShoppingBag className="h-5 w-5" />
                                {cartItemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-black text-white text-xs flex items-center justify-center">
                   {cartItemCount}
                 </span>
                                )}
                                <span className="sr-only">{t('header.cart')}</span>
                            </Button>

                            {/* Mobile Menu Button */}
                            <Button
                                variant="ghost"
                                size="sm"
                                className="lg:hidden"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                {isMenuOpen ? (
                                    <X className="h-5 w-5 text-gray-700" />
                                ) : (
                                    <Menu className="h-5 w-5 text-gray-700" />
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Mobile Search */}
                    <div className="md:hidden pb-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                type="search"
                                placeholder={t('header.search')}
                                className="w-full pl-10 pr-4 py-2 border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <div className="lg:hidden border-t border-gray-200 bg-white">
                            <div className="container mx-auto px-4 py-4">
                                <div className="space-y-2">
                                    {Object.entries(categories).map(([category, subcategories]) => (
                                        <div key={category} className="space-y-1">
                                            <Button
                                                variant="ghost"
                                                className="w-full justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-50 font-medium"
                                                onClick={() => {
                                                    onCategorySelect?.(category);
                                                    setIsMenuOpen(false);
                                                }}
                                            >
                                                {category}
                                            </Button>
                                            {subcategories.length > 0 && (
                                                <div className="pl-4 space-y-1">
                                                    {subcategories.map((subcategory) => (
                                                        <Button
                                                            key={subcategory}
                                                            variant="ghost"
                                                            className="w-full justify-start text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                                            onClick={() => {
                                                                onCategorySelect?.(category, subcategory);
                                                                setIsMenuOpen(false);
                                                            }}
                                                        >
                                                            {subcategory}
                                                        </Button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                    {/* Mobile User Actions */}
                                    <div className="pt-4 border-t border-gray-200">
                                        {auth.role === "ROLE_ADMIN" ? (
                                            <Button
                                                variant="ghost"
                                                className="w-full justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                                onClick={() => {
                                                    navigate("/admin");
                                                    setIsMenuOpen(false);
                                                }}
                                            >
                                                <Settings className="h-4 w-4 mr-2" />
                                                {t('header.admin')}
                                            </Button>
                                        ) : auth.role === "ROLE_USER" ? (
                                            <Button
                                                variant="ghost"
                                                className="w-full justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                            >
                                                <User className="h-4 w-4 mr-2" />
                                                {t('header.profile')}
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="ghost"
                                                className="w-full justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                                onClick={() => {
                                                    setAuthModalOpen(true);
                                                    setIsMenuOpen(false);
                                                }}
                                            >
                                                <User className="h-4 w-4 mr-2" />
                                                {t('header.login')}
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </AnimatePresence>
            </header>
        </>
    );
}