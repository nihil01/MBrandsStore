import { useState } from "react";
import { Search, ShoppingBag, Menu, X, User, ChevronDown } from "lucide-react";
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

export default function Header({ cartItemCount = 0, onCartClick, onSearchChange, onCategorySelect }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearchChange?.(value);
  };

  const categories = {
    "New Arrivals": [],
    "Men": ["T-Shirts", "Jeans", "Jackets", "Shoes", "Accessories"],
    "Women": ["Tops", "Dresses", "Jeans", "Jackets", "Shoes", "Bags"],
    "Accessories": ["Bags", "Belts", "Hats", "Watches", "Jewelry"],
    "Sale": []
  };

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-foreground" data-testid="logo">ModernStyle</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <NavigationMenu>
              <NavigationMenuList className="flex space-x-2">
                {Object.entries(categories).map(([category, subcategories]) => (
                  <NavigationMenuItem key={category}>
                    {subcategories.length > 0 ? (
                      <>
                        <NavigationMenuTrigger 
                          className="text-foreground hover:text-primary transition-colors bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent"
                          data-testid={`nav-${category.toLowerCase().replace(' ', '-')}`}
                        >
                          {category}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="grid w-[200px] gap-1 p-2">
                            <button
                              onClick={() => onCategorySelect?.(category)}
                              className="text-left px-3 py-2 text-sm hover:bg-accent rounded-md transition-colors"
                              data-testid={`nav-${category.toLowerCase().replace(' ', '-')}-all`}
                            >
                              All {category}
                            </button>
                            {subcategories.map((subcategory) => (
                              <button
                                key={subcategory}
                                onClick={() => onCategorySelect?.(category, subcategory)}
                                className="text-left px-3 py-2 text-sm hover:bg-accent rounded-md transition-colors"
                                data-testid={`nav-${category.toLowerCase().replace(' ', '-')}-${subcategory.toLowerCase().replace(' ', '-')}`}
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
                        className="px-4 py-2 text-foreground hover:text-primary transition-colors"
                        data-testid={`nav-${category.toLowerCase().replace(' ', '-')}`}
                      >
                        {category}
                      </button>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10"
                data-testid="search-input"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" data-testid="button-account">
              <User className="w-5 h-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={onCartClick}
              className="relative"
              data-testid="button-cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  data-testid="cart-count"
                >
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
              data-testid="button-menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10"
              data-testid="search-input-mobile"
            />
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-3">
              {Object.entries(categories).map(([category, subcategories]) => (
                <div key={category} className="space-y-2">
                  <button
                    onClick={() => {
                      onCategorySelect?.(category);
                      setIsMenuOpen(false);
                    }}
                    className="text-foreground hover:text-primary transition-colors py-2 text-left font-medium"
                    data-testid={`nav-mobile-${category.toLowerCase().replace(' ', '-')}`}
                  >
                    {category}
                  </button>
                  {subcategories.length > 0 && (
                    <div className="pl-4 space-y-2">
                      {subcategories.map((subcategory) => (
                        <button
                          key={subcategory}
                          onClick={() => {
                            onCategorySelect?.(category, subcategory);
                            setIsMenuOpen(false);
                          }}
                          className="text-muted-foreground hover:text-foreground transition-colors py-1 text-left block text-sm"
                          data-testid={`nav-mobile-${category.toLowerCase().replace(' ', '-')}-${subcategory.toLowerCase().replace(' ', '-')}`}
                        >
                          {subcategory}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}