import { useState } from "react";
import { Heart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  id: string;
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
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleWishlistClick = () => {
    setIsWishlisted(!isWishlisted);
    onWishlist?.(id);
  };

  const handleAddToCart = () => {
    onAddToCart?.(id);
    console.log(`Added product ${id} to cart`);
  };

  const handleQuickView = () => {
    onQuickView?.(id);
    console.log(`Quick view for product ${id}`);
  };

  return (
    <Card className="group hover-elevate overflow-hidden border-0 shadow-sm" data-testid={`product-card-${id}`}>
      <CardContent className="p-0">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={image}
            alt={name}
            className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            data-testid={`product-image-${id}`}
          />
          
          {/* Loading placeholder */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-muted animate-pulse" />
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isNew && (
              <Badge variant="default" className="bg-primary text-primary-foreground" data-testid="badge-new">
                New
              </Badge>
            )}
            {onSale && (
              <Badge variant="destructive" data-testid="badge-sale">
                Sale
              </Badge>
            )}
          </div>

          {/* Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="icon"
              variant="secondary"
              className="w-8 h-8"
              onClick={handleWishlistClick}
              data-testid={`button-wishlist-${id}`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current text-red-500" : ""}`} />
            </Button>
          </div>

          {/* Quick View Button */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button
              variant="outline"
              onClick={handleQuickView}
              className="bg-background/80 backdrop-blur-sm"
              data-testid={`button-quick-view-${id}`}
            >
              Quick View
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <div className="text-sm text-muted-foreground mb-1" data-testid={`product-category-${id}`}>
            {category}
          </div>
          <h3 className="font-semibold text-foreground mb-2 line-clamp-2" data-testid={`product-name-${id}`}>
            {name}
          </h3>
          
          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-foreground" data-testid={`product-price-${id}`}>
              ${price.toFixed(2)}
            </span>
            {originalPrice && originalPrice > price && (
              <span className="text-sm text-muted-foreground line-through" data-testid={`product-original-price-${id}`}>
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Add to Cart */}
          <Button
            onClick={handleAddToCart}
            className="w-full gap-2"
            data-testid={`button-add-to-cart-${id}`}
          >
            <Plus className="w-4 h-4" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}