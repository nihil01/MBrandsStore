import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
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
import ThemeToggle from "@/components/ThemeToggle";
import NotFound from "@/pages/not-found";

// Generated images
import tshirtImage from '@assets/generated_images/White_cotton_t-shirt_product_01744f91.png';
import jeansImage from '@assets/generated_images/Dark_blue_denim_jeans_50e62285.png';
import jacketImage from '@assets/generated_images/Black_leather_jacket_product_4db547f1.png';
import sneakersImage from '@assets/generated_images/White_athletic_sneakers_ac51adc5.png';

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

  // Fetch products from API
  const { data: products = [], isLoading: isLoadingProducts } = useQuery({
    queryKey: ['/api/products'],
    queryFn: async () => {
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      // Transform the API data to match our interface
      return data.map((product: any) => ({
        ...product,
        price: parseFloat(product.price),
        originalPrice: product.originalPrice ? parseFloat(product.originalPrice) : undefined,
        rating: parseFloat(product.rating),
      }));
    }
  });

  // Fetch categories from API
  const { data: categories = [] } = useQuery({
    queryKey: ['/api/categories'],
    queryFn: async () => {
      const response = await fetch('/api/categories');
      if (!response.ok) throw new Error('Failed to fetch categories');
      return response.json();
    }
  });

  // TODO: Remove mock data functionality - keeping for fallback during development
  const mockProducts: Product[] = [
    {
      id: "1",
      name: "Premium Cotton T-Shirt",
      price: 49.99,
      originalPrice: 69.99,
      image: tshirtImage,
      category: "Men",
      subcategory: "T-Shirts",
      description: "Made from 100% organic cotton, this premium t-shirt offers unmatched comfort and style. Perfect for casual wear or layering, featuring a modern fit that flatters every body type.",
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      colors: ["white", "black", "navy", "gray"],
      rating: 4.5,
      reviewCount: 127,
      isNew: true,
      onSale: true
    },
    {
      id: "2",
      name: "Slim Fit Denim Jeans",
      price: 89.99,
      image: jeansImage,
      category: "Men",
      subcategory: "Jeans",
      description: "Classic slim-fit jeans crafted from premium denim with a comfortable stretch. Features a modern cut that works perfectly for both casual and smart-casual looks.",
      sizes: ["28", "30", "32", "34", "36", "38"],
      colors: ["blue", "black", "gray"],
      rating: 4.7,
      reviewCount: 89,
      isNew: false,
      onSale: false
    },
    {
      id: "3",
      name: "Leather Biker Jacket",
      price: 249.99,
      originalPrice: 299.99,
      image: jacketImage,
      category: "Men",
      subcategory: "Jackets",
      description: "Genuine leather biker jacket with modern styling. Features asymmetrical zip closure, multiple pockets, and a comfortable lining. A timeless piece that adds edge to any outfit.",
      sizes: ["S", "M", "L", "XL"],
      colors: ["black", "brown"],
      rating: 4.8,
      reviewCount: 65,
      isNew: true,
      onSale: true
    },
    {
      id: "4",
      name: "Athletic Sneakers",
      price: 129.99,
      image: sneakersImage,
      category: "Men",
      subcategory: "Shoes",
      description: "High-performance athletic sneakers designed for both style and comfort. Features breathable mesh upper, cushioned midsole, and durable rubber outsole.",
      sizes: ["7", "8", "9", "10", "11", "12"],
      colors: ["white", "black", "gray"],
      rating: 4.6,
      reviewCount: 134,
      isNew: false,
      onSale: false
    },
    {
      id: "5",
      name: "Classic White Tee",
      price: 39.99,
      image: tshirtImage,
      category: "Women",
      subcategory: "Tops",
      description: "Essential white t-shirt made from soft cotton blend. Perfect basics piece that goes with everything in your wardrobe.",
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["white"],
      rating: 4.3,
      reviewCount: 201,
      isNew: false,
      onSale: false
    },
    {
      id: "6",
      name: "Dark Wash Jeans",
      price: 79.99,
      image: jeansImage,
      category: "Women",
      subcategory: "Jeans",
      description: "Dark wash jeans with regular fit. Made from durable denim with subtle fading for a lived-in look.",
      sizes: ["28", "30", "32", "34", "36"],
      colors: ["blue"],
      rating: 4.4,
      reviewCount: 97,
      isNew: true,
      onSale: false
    },
    {
      id: "7",
      name: "Sports Jacket",
      price: 189.99,
      image: jacketImage,
      category: "Women",
      subcategory: "Jackets",
      description: "Versatile sports jacket that bridges casual and formal wear. Features modern tailoring and high-quality fabric.",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["black", "navy"],
      rating: 4.5,
      reviewCount: 78,
      isNew: false,
      onSale: false
    },
    {
      id: "8",
      name: "Running Shoes",
      price: 149.99,
      originalPrice: 179.99,
      image: sneakersImage,
      category: "Accessories",
      subcategory: "Bags",
      description: "Professional running shoes with advanced cushioning technology. Lightweight design for optimal performance.",
      sizes: ["7", "8", "9", "10", "11"],
      colors: ["white", "black"],
      rating: 4.7,
      reviewCount: 156,
      isNew: true,
      onSale: true
    }
  ];

  // Filter products based on search and category
  const allProducts = products.length > 0 ? products : mockProducts;
  const filteredProducts = allProducts.filter(product => {
    const searchMatch = searchQuery === "" || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.subcategory.toLowerCase().includes(searchQuery.toLowerCase());
    
    const categoryMatch = selectedCategory === "" || 
      selectedCategory === "New Arrivals" ||
      selectedCategory === "Sale" ||
      product.category === selectedCategory;
    
    const subcategoryMatch = selectedSubcategory === "" || 
      product.subcategory === selectedSubcategory;

    return searchMatch && categoryMatch && subcategoryMatch;
  });

  const handleProductClick = (productId: string) => {
    const product = allProducts.find(p => p.id === productId);
    if (product) {
      // Adapt product for modal (convert single image to images array)
      const modalProduct = {
        ...product,
        images: [product.image, product.image, product.image] // TODO: Remove mock functionality - use multiple real images
      };
      setSelectedProduct(modalProduct as any);
      setIsProductModalOpen(true);
    }
  };

  const handleAddToCart = (productId: string, size?: string, quantity: number = 1) => {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cartItems.find(item => 
      item.id === productId && item.size === size
    );

    if (existingItem) {
      setCartItems(prev => prev.map(item =>
        item.id === productId && item.size === size
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      const newItem: CartItem = {
        id: productId,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
        size
      };
      setCartItems(prev => [...prev, newItem]);
    }
    
    // Show success feedback
    console.log(`Added ${quantity} ${product.name} to cart`);
  };

  const handleUpdateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(itemId);
      return;
    }
    setCartItems(prev => prev.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    ));
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleCheckout = () => {
    console.log('Proceeding to checkout with items:', cartItems);
    alert('Checkout functionality will be implemented in the full application!');
  };

  const handleShopNow = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleViewCollection = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCategorySelect = (category: string, subcategory?: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory || "");
    // Scroll to products section
    setTimeout(() => {
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border">
        <Header
          cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          onCartClick={() => setIsCartOpen(true)}
          onSearchChange={setSearchQuery}
          onCategorySelect={handleCategorySelect}
        />
        <ThemeToggle />
      </div>

      {/* Hero Section */}
      <Hero
        onShopNow={handleShopNow}
        onViewCollection={handleViewCollection}
      />

      {/* Products Section */}
      <div id="products">
        <ProductGrid
          products={filteredProducts}
          selectedCategory={selectedCategory}
          selectedSubcategory={selectedSubcategory}
          onProductClick={handleProductClick}
          onAddToCart={(id) => handleAddToCart(id)}
          onWishlist={(id) => console.log('Added to wishlist:', id)}
        />
      </div>

      {/* Footer */}
      <Footer />

      {/* Product Modal */}
      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        product={selectedProduct || undefined}
        onAddToCart={(id, size, qty) => {
          handleAddToCart(id, size, qty);
          setIsProductModalOpen(false);
        }}
      />

      {/* Shopping Cart */}
      <ShoppingCart
        items={cartItems}
        isOpen={isCartOpen}
        onOpenChange={setIsCartOpen}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="modern-style-theme">
        <TooltipProvider>
          <Router />
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;