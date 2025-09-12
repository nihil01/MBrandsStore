import { useState } from "react";
import { Heart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
    id: string;
    highlightColor: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: string;
    isNew?: boolean;
    onSale?: boolean;
    onAddToCart?: (productId: string) => void;
    onQuickView?: (productId: string) => void;
    onWishlist?: (productId: string) => void;
}

export default function ProductCard({
                                        id,
                                        name,
                                        price,
                                        originalPrice,
                                        image,
                                        category,
                                        isNew = false,
                                        onSale = false,
                                        onAddToCart,
                                        onQuickView,
                                        onWishlist,
                                        highlightColor
                                    }: ProductCardProps) {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleWishlistClick = () => {
        setIsWishlisted(!isWishlisted);
        onWishlist?.(id);
    };

    const handleAddToCart = () => {
        onAddToCart?.(id);
    };

    const handleQuickView = () => {
        onQuickView?.(id);
    };

    return (
        <Card className="group hover-elevate overflow-hidden border-0 shadow-sm transform transition-all duration-300 hover:-translate-y-1 animate-in fade-in-0 duration-500" data-testid={`product-card-${id}`}>
            <CardContent className="p-0">
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-muted">
                    <img
                        src={image}
                        alt={name}
                        className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                            imageLoaded ? "opacity-100" : "opacity-0"
                        }`}
                        onLoad={() => setImageLoaded(true)}
                    />
                    {!imageLoaded && <div className="absolute inset-0 bg-muted animate-pulse" />}

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {isNew && (
                            <Badge
                                style={{ backgroundColor: highlightColor, color: "#1a1a1a" }}
                                data-testid="badge-new"
                            >
                                New
                            </Badge>
                        )}
                        {onSale && (
                            <Badge
                                style={{ backgroundColor: highlightColor + "cc", color: "#1a1a1a" }}
                                data-testid="badge-sale"
                            >
                                Sale
                            </Badge>
                        )}
                    </div>

                    {/* Wishlist */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                        <Button
                            size="icon"
                            variant="outline"
                            style={{ borderColor: highlightColor }}
                            className="w-8 h-8"
                            onClick={handleWishlistClick}
                        >
                            <Heart
                                className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`}
                                style={{ color: isWishlisted ? highlightColor : undefined }}
                            />
                        </Button>
                    </div>

                    {/* Quick View */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                        <Button
                            variant="outline"
                            onClick={handleQuickView}
                            style={{ borderColor: highlightColor, color: highlightColor }}
                            className="bg-background/80 backdrop-blur-sm transform scale-95 group-hover:scale-100 transition-transform duration-200"
                        >
                            Quick View
                        </Button>
                    </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                    <div style={{ color: highlightColor }} className="text-sm mb-1">
                        {category}
                    </div>
                    <h3 style={{ color: highlightColor }} className="font-semibold mb-2 line-clamp-2">
                        {name}
                    </h3>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-3">
            <span style={{ color: highlightColor }} className="text-lg font-bold">
              ${price.toFixed(2)}
            </span>
                        {originalPrice && originalPrice > price && (
                            <span style={{ color: highlightColor + "aa" }} className="text-sm line-through">
                ${originalPrice.toFixed(2)}
              </span>
                        )}
                    </div>

                    {/* Add to Cart */}
                    <Button
                        onClick={handleAddToCart}
                        style={{ backgroundColor: highlightColor, color: "#1a1a1a" }}
                        className="w-full gap-2 transform transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                        <Plus className="w-4 h-4" />
                        Add to Cart
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
