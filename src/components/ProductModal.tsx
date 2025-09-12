import { useState } from "react";
import { X, Plus, Minus, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    images: string[];
    category: string;
    description: string;
    sizes: string[];
    colors: string[];
    rating: number;
    reviewCount: number;
    isNew?: boolean;
    onSale?: boolean;
  };
  onAddToCart?: (productId: string, size: string, quantity: number) => void;
}

export default function ProductModal({ isOpen, onClose, product, onAddToCart }: ProductModalProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    onAddToCart?.(product.id, selectedSize, quantity);
    console.log(`Added ${quantity} of ${product.name} (size: ${selectedSize}) to cart`);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    console.log(`${isWishlisted ? 'Removed from' : 'Added to'} wishlist: ${product.name}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" data-testid="product-modal">
        <DialogHeader>
          <DialogTitle className="sr-only">{product.name}</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 z-10"
            onClick={onClose}
            data-testid="button-close-modal"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg border border-border">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                data-testid={`product-main-image`}
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square overflow-hidden rounded-md border-2 transition-colors ${
                      selectedImage === index ? 'border-primary' : 'border-border'
                    }`}
                    data-testid={`product-thumbnail-${index}`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-muted-foreground" data-testid="product-category">
                  {product.category}
                </span>
                {product.isNew && (
                  <Badge variant="default" className="bg-primary text-primary-foreground">
                    New
                  </Badge>
                )}
                {product.onSale && (
                  <Badge variant="destructive">Sale</Badge>
                )}
              </div>
              
              <h1 className="text-2xl font-bold text-foreground mb-2" data-testid="product-modal-name">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center" data-testid="product-rating">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground" data-testid="product-review-count">
                  ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-foreground" data-testid="product-modal-price">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xl text-muted-foreground line-through" data-testid="product-modal-original-price">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed" data-testid="product-description">
                {product.description}
              </p>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-semibold mb-3">Size</h3>
              <Select onValueChange={setSelectedSize} data-testid="select-size">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a size" />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Color</h3>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-colors ${
                        selectedColor === color ? 'border-primary' : 'border-border'
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      title={color}
                      data-testid={`color-${color}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="font-semibold mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  data-testid="button-decrease-quantity"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center font-semibold" data-testid="product-quantity">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  data-testid="button-increase-quantity"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                onClick={handleAddToCart}
                className="flex-1"
                size="lg"
                data-testid="button-add-to-cart-modal"
              >
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleWishlist}
                data-testid="button-wishlist-modal"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current text-red-500' : ''}`} />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}