import React, { useState } from "react";
import { X, Plus, Minus, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Product } from "@/App.tsx";
import Slider from "react-slick";

interface ProductModalProps {
    isOpen: boolean;
    highlightColor: string;
    onClose: () => void;
    product: Product;
    onAddToCart?: (productId: number, size: string, quantity: number) => void;
}

export default function ProductModal({ isOpen, onClose, product, onAddToCart, highlightColor }: ProductModalProps) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);

    if (!product) return null;

    // Нормализуем изображения в массив
    const imagesArray: string[] = Array.isArray(product.images)
        ? product.images
        : product.images
        ?.replace("[", "")
        .replace("]", "")
        .split(",")
        .map((s) => s.trim()) || [];

    const handleAddToCart = () => {
        if (product.size && !selectedSize) {
            alert("Please select a size");
            return;
        }
        onAddToCart?.(product.id, selectedSize, quantity);
    };

    const handleWishlist = () => {
        setIsWishlisted(!isWishlisted);
    };

    const sliderProps = {
        dots: true,
        infinite: true,
        speed: 250,
        autoplay: true,
        autoplaySpeed: 4000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="sr-only">{product.name}</DialogTitle>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 top-4 z-10"
                        onClick={onClose}
                        style={{ color: highlightColor }}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Product Images */}
                    <div className="space-y-4">
                        <div className="aspect-square overflow-hidden rounded-lg border" style={{ borderColor: highlightColor }}>
                            <Slider {...sliderProps} className="w-full h-screen">
                                {imagesArray.map((src, index) => (
                                    <div key={index} className="w-full h-screen">
                                        <img
                                            src={"http://localhost:8080/static/" + src}
                                            alt={`preview-${index}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </Slider>
                        </div>

                        {imagesArray.length > 1 && (
                            <div className="grid grid-cols-4 gap-2">
                                {imagesArray.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`aspect-square overflow-hidden rounded-md border-2 transition-colors`}
                                        style={{ borderColor: selectedImage === index ? highlightColor : "#d1d5db" }}
                                    >
                                        <img
                                            src={"http://localhost:8080/static/" + image}
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
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span style={{ color: highlightColor }} className="text-sm">{product.category}</span>
                                {product.stockQuantity > 0 && (
                                    <Badge variant="default" style={{ backgroundColor: highlightColor, color: "#fff" }}>In Stock</Badge>
                                )}
                            </div>

                            <h1 style={{ color: highlightColor }} className="text-2xl font-bold mb-2">{product.name}</h1>
                        </div>

                        <div className="flex items-center gap-3">
                            <span style={{ color: highlightColor }} className="text-3xl font-bold">${product.price.toFixed(2)}</span>
                        </div>

                        <Separator style={{ borderColor: highlightColor }} />

                        <div>
                            <h3 style={{ color: highlightColor }} className="font-semibold mb-2">Description</h3>
                            <p style={{ color: highlightColor, opacity: 0.85 }} className="leading-relaxed">{product.description}</p>
                        </div>

                        {/* Size Selection */}
                        {product.size && (
                            <div>
                                <h3 style={{ color: highlightColor }} className="font-semibold mb-3">Size</h3>
                                <Select onValueChange={setSelectedSize}>
                                    <SelectTrigger className="w-full" style={{ borderColor: highlightColor }}>
                                        <SelectValue placeholder="Select a size" style={{ color: highlightColor }} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={product.size}>{product.size}</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        {/* Quantity */}
                        <div>
                            <h3 style={{ color: highlightColor }} className="font-semibold mb-3">Quantity</h3>
                            <div className="flex items-center gap-3">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    style={{ borderColor: highlightColor, color: highlightColor }}
                                >
                                    <Minus className="w-4 h-4" />
                                </Button>
                                <span style={{ color: highlightColor }} className="w-12 text-center font-semibold">{quantity}</span>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setQuantity(quantity + 1)}
                                    style={{ borderColor: highlightColor, color: highlightColor }}
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
                                style={{ backgroundColor: highlightColor, color: "#fff" }}
                            >
                                Add to Cart
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={handleWishlist}
                                style={{ borderColor: highlightColor, color: isWishlisted ? "red" : highlightColor }}
                            >
                                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
