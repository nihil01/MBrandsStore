import {useEffect, useState} from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";

// Components
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import ProductModal from "@/components/ProductModal";
import ShoppingCart from "@/components/ShoppingCart";
import Footer from "@/components/Footer";

// Generated images
import tshirtImage from '../src/attached_assets/generated_images/White_cotton_t-shirt_product_01744f91.png';
import jeansImage from '../src/attached_assets/generated_images/Dark_blue_denim_jeans_50e62285.png';
import jacketImage from '../src/attached_assets/generated_images/Black_leather_jacket_product_4db547f1.png';
import sneakersImage from '../src/attached_assets/generated_images/White_athletic_sneakers_ac51adc5.png';
import PreviewScreen from "@/components/PreviewScreen.tsx";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  subcategory: string;
  description: string;
  sizes: string[];
  colors: string[];
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  onSale?: boolean;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
}

function HomePage() {
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");
    const [previewShown, setPreviewShown] = useState<boolean>(false);

    // mock products
    const mockProducts: Product[] = [
        {
            id: "1",
            name: "Premium Cotton T-Shirt",
            price: 49.99,
            originalPrice: 69.99,
            image: tshirtImage,
            category: "Men",
            subcategory: "T-Shirts",
            description:
                "Made from 100% organic cotton, this premium t-shirt offers unmatched comfort and style.",
            sizes: ["XS", "S", "M", "L", "XL", "XXL"],
            colors: ["white", "black", "navy", "gray"],
            rating: 4.5,
            reviewCount: 127,
            isNew: true,
            onSale: true,
        },
        {
            id: "2",
            name: "Slim Fit Denim Jeans",
            price: 89.99,
            image: jeansImage,
            category: "Men",
            subcategory: "Jeans",
            description:
                "Classic slim-fit jeans crafted from premium denim with a comfortable stretch.",
            sizes: ["28", "30", "32", "34", "36", "38"],
            colors: ["blue", "black", "gray"],
            rating: 4.7,
            reviewCount: 89,
        },
        {
            id: "3",
            name: "Leather Biker Jacket",
            price: 249.99,
            originalPrice: 299.99,
            image: jacketImage,
            category: "Men",
            subcategory: "Jackets",
            description:
                "Genuine leather biker jacket with modern styling. A timeless piece that adds edge to any outfit.",
            sizes: ["S", "M", "L", "XL"],
            colors: ["black", "brown"],
            rating: 4.8,
            reviewCount: 65,
            isNew: true,
            onSale: true,
        },
        {
            id: "4",
            name: "Athletic Sneakers",
            price: 129.99,
            image: sneakersImage,
            category: "Men",
            subcategory: "Shoes",
            description:
                "High-performance sneakers designed for both style and comfort.",
            sizes: ["7", "8", "9", "10", "11", "12"],
            colors: ["white", "black", "gray"],
            rating: 4.6,
            reviewCount: 134,
        },
    ];

    const allProducts = mockProducts;

    const filteredProducts = allProducts.filter((product) => {
        const searchMatch =
            searchQuery === "" ||
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.subcategory.toLowerCase().includes(searchQuery.toLowerCase());

        const categoryMatch =
            !selectedCategory ||
            product.category === selectedCategory ||
            (selectedCategory === "New Arrivals" && product.isNew) ||
            (selectedCategory === "Sale" && product.onSale);

        const subcategoryMatch =
            !selectedSubcategory || product.subcategory === selectedSubcategory;

        return searchMatch && categoryMatch && subcategoryMatch;
    });

    const handleProductClick = (productId: string) => {
        const product = allProducts.find((p) => p.id === productId);
        if (product) {
            setSelectedProduct({
                ...product,
                images: [product.image, product.image, product.image],
            });
            setIsProductModalOpen(true);
        }
    };

    const handleAddToCart = (productId: string, size?: string, quantity: number = 1) => {
        const product = allProducts.find((p) => p.id === productId);
        if (!product) return;

        const existingItem = cartItems.find(
            (item) => item.id === productId && item.size === size
        );

        if (existingItem) {
            setCartItems((prev) =>
                prev.map((item) =>
                    item.id === productId && item.size === size
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            );
        } else {
            setCartItems((prev) => [
                ...prev,
                {
                    id: productId,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity,
                    size,
                },
            ]);
        }
    };

    const handleUpdateCartQuantity = (itemId: string, quantity: number) => {
        if (quantity <= 0) {
            handleRemoveFromCart(itemId);
            return;
        }
        setCartItems((prev) =>
            prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
        );
    };

    const handleRemoveFromCart = (itemId: string) => {
        setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    };

    const handleCheckout = () => {
        alert("Checkout (mock) – will be implemented later");
    };

    const handleCategorySelect = (category: string, subcategory?: string) => {
        setSelectedCategory(category);
        setSelectedSubcategory(subcategory || "");
        setTimeout(() => {
            document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };


    return (
        !previewShown ? (
            <PreviewScreen showPreview={setPreviewShown}/>
        ) : (
            <div className="min-h-screen bg-[#1a0f1f] text-[#f3d4ff]">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-2 border-b border-[#edadff]">
                    <Header
                        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                        onCartClick={() => setIsCartOpen(true)}
                        onSearchChange={setSearchQuery}
                        onCategorySelect={handleCategorySelect}
                        textColor="#edadff"
                    />
                </div>

                {/* Hero Section */}
                <Hero
                    onShopNow={() =>
                        document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })
                    }
                    onViewCollection={() =>
                        document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })
                    }
                    highlightColor="#edadff"
                />

                {/* Products Section */}
                <div id="products">
                    <ProductGrid
                        products={filteredProducts}
                        selectedCategory={selectedCategory}
                        selectedSubcategory={selectedSubcategory}
                        onProductClick={handleProductClick}
                        onAddToCart={(id) => handleAddToCart(id)}
                        onWishlist={(id) => console.log("Added to wishlist:", id)}
                        highlightColor="#edadff"
                    />
                </div>

                {/* Footer */}
                <Footer textColor="#edadff" />

                {/* Product Modal */}
                <ProductModal
                    isOpen={isProductModalOpen}
                    onClose={() => setIsProductModalOpen(false)}
                    product={selectedProduct || undefined}
                    onAddToCart={(id, size, qty) => {
                        handleAddToCart(id, size, qty);
                        setIsProductModalOpen(false);
                    }}
                    highlightColor="#edadff"
                />

                {/* Shopping Cart */}
                <ShoppingCart
                    items={cartItems}
                    isOpen={isCartOpen}
                    onOpenChange={setIsCartOpen}
                    onUpdateQuantity={handleUpdateCartQuantity}
                    onRemoveItem={handleRemoveFromCart}
                    onCheckout={handleCheckout}
                    highlightColor="#edadff"
                />
            </div>
        )
    );
}



function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="modern-style-theme">
        <TooltipProvider>
            <Toaster />
            <HomePage/>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
);
}

export default App;