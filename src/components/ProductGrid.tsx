import { useState } from "react";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {Product} from "@/App.tsx";
import { useLanguage } from "@/components/LanguageContext";

interface ProductGridProps {
    products: Product[];
    selectedCategory?: string;
    selectedSubcategory?: string;
    onProductClick?: (productId: number) => void;
    onAddToCart?: (productId: number) => void;
    onWishlist?: (productId: number) => void;
}

export default function ProductGrid({
                                        products,
                                        selectedCategory,
                                        selectedSubcategory,
                                        onProductClick,
                                        onAddToCart,
                                        onWishlist,
                                    }: ProductGridProps) {
    const [localSelectedCategory, setLocalSelectedCategory] = useState("all");
    const [sortBy, setSortBy] = useState("newest");
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;
    const { t } = useLanguage();

    const categories = ["all", ...Array.from(new Set(products.map(p => p.category)))];

    const filteredProducts = products
        .filter(product => {
            const categoryMatch = selectedCategory === "all" || product.category === selectedCategory || !selectedCategory;
            const subcategoryMatch = selectedSubcategory === "all" || !selectedSubcategory;
            return categoryMatch && subcategoryMatch;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case "price-low": return a.price - b.price;
                case "price-high": return b.price - a.price;
                case "name": return a.name.localeCompare(b.name);
                default: return 0;
            }
        });

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

    const handleCategoryChange = (category: string) => {
        setLocalSelectedCategory(category);
        setCurrentPage(1);
    };

    const handleSortChange = (sort: string) => {
        setSortBy(sort);
        setCurrentPage(1);
    };

    return (
        <div className="w-full">
            {/* Header */}
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {t('products.title')}
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    {t('products.description')}
                </p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-between items-start sm:items-center">
                {/* Category Filter */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
                    <label className="text-sm font-medium text-gray-700">
                        {t('products.category')}
                    </label>
                    <Select value={localSelectedCategory} onValueChange={handleCategoryChange}>
                        <SelectTrigger className="w-full sm:w-48 border-gray-300 focus:border-gray-500 focus:ring-gray-500">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                    {category === "all" ? t('products.allCategories') : category}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Sort Filter */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
                    <label className="text-sm font-medium text-gray-700">
                        {t('products.sortBy')}
                    </label>
                    <Select value={sortBy} onValueChange={handleSortChange}>
                        <SelectTrigger className="w-full sm:w-48 border-gray-300 focus:border-gray-500 focus:ring-gray-500">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="newest">{t('products.newest')}</SelectItem>
                            <SelectItem value="price-low">{t('products.priceLowHigh')}</SelectItem>
                            <SelectItem value="price-high">{t('products.priceHighLow')}</SelectItem>
                            <SelectItem value="name">{t('products.name')}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Results Info */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <p className="text-sm text-gray-600 mb-2 sm:mb-0">
                    {t('products.showing')} {paginatedProducts.length} {t('products.of')} {filteredProducts.length} {t('products.products')}
                    {selectedCategory && selectedCategory !== "all" && (
                        <Badge variant="secondary" className="ml-2 bg-gray-100 text-gray-700">
                            {selectedCategory}
                        </Badge>
                    )}
                </p>
            </div>

            {/* Product Grid */}
            {paginatedProducts.length === 0 ? (
                <div className="text-center py-16">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {t('products.noProducts')}
                    </h3>
                    <p className="text-gray-600">
                        {t('products.tryFilters')}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                    {paginatedProducts.map((product, index) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            category={product.category}
                            images={product.images}
                            highlightColor="#000000"
                            onAddToCart={onAddToCart}
                            onQuickView={onProductClick}
                        />
                    ))}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2">
                    <Button
                        variant="outline"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    >
                        {t('common.previous')}
                    </Button>

                    <div className="flex space-x-1">
                        {[...Array(totalPages)].map((_, i) => (
                            <Button
                                key={i}
                                variant={currentPage === i + 1 ? "default" : "outline"}
                                onClick={() => setCurrentPage(i + 1)}
                                className={
                                    currentPage === i + 1
                                        ? "bg-black text-white hover:bg-gray-800"
                                        : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                                }
                            >
                                {i + 1}
                            </Button>
                        ))}
                    </div>

                    <Button
                        variant="outline"
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    >
                        {t('common.next')}
                    </Button>
                </div>
            )}
        </div>
    );
}