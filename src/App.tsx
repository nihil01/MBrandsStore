import {useEffect, useState} from "react";
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

import PreviewScreen from "@/components/PreviewScreen.tsx";
import {AnimatePresence, motion} from "framer-motion";
import {AuthProvider} from "@/components/AuthContext.tsx";
import {shopApi} from "@/lib/queryClient.ts";

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    brand: string;
    size: string;
    color: string;
    stockQuantity: number;
    images: string;
}

export interface CartItem extends Product {
    quantity: number;
}

function HomePage() {
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [showPreviewModal, setShowPreviewModal] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await shopApi.getProducts();
                setAllProducts(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchProducts();
    }, []);

    const filteredProducts = allProducts.filter((product) => {
        const searchMatch =
            searchQuery === "" ||
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase());

        const categoryMatch =
            !selectedCategory ||
            product.category === selectedCategory;

        return searchMatch && categoryMatch;
    });

    const handleProductClick = (productId: number) => {
        const product = allProducts.find((p) => p.id === productId);
        if (product) {
            setSelectedProduct(product);
            setIsProductModalOpen(true);
        }
    };

    const handleAddToCart = (productId: number, size?: string, quantity: number = 1) => {
        const product = allProducts.find((p) => p.id === productId);
        if (!product) return;

        setCartItems(prev => {
            const existingItem = prev.find(item => item.id === productId && item.size === size);
            if (existingItem) {
                return prev.map(item =>
                    item.id === productId && item.size === size
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                return [...prev, { ...product, quantity, size: size || "" }];
            }
        });
    };


    return (
        <>
            {showPreviewModal && (
                <PreviewScreen showPreview={setShowPreviewModal} />
            )}


            {!showPreviewModal && (

                <motion.div className="min-h-screen bg-[#1a0f1f] text-[#f3d4ff]">
                    <Header
                        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                        onCartClick={() => setIsCartOpen(true)}
                        onSearchChange={setSearchQuery}
                        onCategorySelect={setSelectedCategory}
                        textColor="#edadff"
                    />

                    <Hero onShopNow={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })} highlightColor="#edadff" />

                    <div id="products">
                        <ProductGrid
                            products={filteredProducts}
                            onProductClick={handleProductClick}
                            onAddToCart={(id) => handleAddToCart(id)}
                            highlightColor="#edadff"
                        />
                    </div>

                    <Footer textColor="#edadff" />

                    <AnimatePresence>
                        {isProductModalOpen && selectedProduct && (
                            <ProductModal
                                isOpen={isProductModalOpen}
                                onClose={() => setIsProductModalOpen(false)}
                                product={selectedProduct}
                                onAddToCart={handleAddToCart}
                                highlightColor="#edadff"
                            />
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {isCartOpen && (
                            <ShoppingCart
                                items={cartItems}
                                isOpen={isCartOpen}
                                onOpenChange={setIsCartOpen}
                                onUpdateQuantity={(itemId, qty) => {
                                    setCartItems(prev =>
                                        prev.map(item => (item.id === itemId ? { ...item, quantity: qty } : item))
                                    );
                                }}
                                onRemoveItem={(itemId) =>
                                    setCartItems(prev => prev.filter(item => item.id !== itemId))
                                }
                                onCheckout={() => alert("Checkout (mock)")}
                                highlightColor="#edadff"
                            />
                        )}
                    </AnimatePresence>
                </motion.div>

            )}

        </>

    );
}


export default function App() {
    return (
        <ThemeProvider defaultTheme="light" storageKey="modern-style-theme">
            <TooltipProvider>

                <Toaster />

                <AuthProvider>
                    <HomePage />
                </AuthProvider>

            </TooltipProvider>
        </ThemeProvider>
    );
}