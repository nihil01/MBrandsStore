import React, { useState } from "react";
import {Eye, Heart, Plus} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Slider from "react-slick";
import {useLanguage} from "@/components/LanguageContext.tsx";

interface ProductCardProps {
    id: number;
    highlightColor: string;
    name: string;
    price: number;
    originalPrice?: number;
    category: string;
    images: string;
    isNew?: boolean;
    onSale?: boolean;
    onAddToCart?: (productId: number) => void;
    onQuickView?: (productId: number) => void;
    onWishlist?: (productId: number) => void;
}

    export default function ProductCard({
                                            id,
                                            name,
                                            price,
                                            originalPrice,
                                            images,
                                            category,
                                            isNew = false,
                                            onSale = false,
                                            onAddToCart,
                                            onQuickView,
                                        }: ProductCardProps) {
        const [isHovered, setIsHovered] = useState(false);
        const {t} = useLanguage();

        const sliderSettings = {
            dots: true,
            infinite: true,
            speed: 250,
            autoplay: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
        };

        const imageArray = Array.isArray(images)
            ? images
            : images?.replace("[", "").replace("]", "").trim().split(",") || [];

        const handleAddToCart = () => {
            onAddToCart?.(id);
        };

        const handleQuickView = () => {
            console.log("QUICK VIEW")
            onQuickView?.(id);
        };


    return (
        <Card
            className="group relative overflow-hidden border-gray-200 hover:border-gray-300 transition-all duration-300 bg-white hover:shadow-lg"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <CardContent className="p-0">
                {/* Image Container */}
                <div className="relative aspect-square bg-gray-50 overflow-hidden">
                    {imageArray.length > 1 ? (
                        <Slider {...sliderSettings}>
                            {imageArray.map((src, index) => (
                                <div key={index} className="relative aspect-square">
                                    <img
                                        src={src.trim()}
                                        alt={`${name} - ${index + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <img
                            src={imageArray[0]?.trim() || "/placeholder-image.jpg"}
                            alt={name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                        />
                    )}

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {isNew && (
                            <Badge className="bg-black text-white text-xs font-medium px-2 py-1 rounded-sm">
                                {t('product.new')}
                            </Badge>
                        )}
                        {onSale && (
                            <Badge className="bg-red-600 text-white text-xs font-medium px-2 py-1 rounded-sm">
                                {t('product.sale')}
                            </Badge>
                        )}
                    </div>


                    {/* Add to Cart Overlay */}
                    <div
                        className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 transition-all duration-300 ${
                            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                        }`}
                    >

                        {/* Quick View Button */}
                        <Button
                            className="w-full bg-white text-black hover:bg-gray-100 font-medium py-2 px-4 rounded-sm transition-all duration-200 transform hover:scale-105"
                            onClick={handleQuickView}
                            style={{transitionDelay: '50ms'}}
                        >
                            <Eye className="h-4 w-4"/>
                        </Button>

                        <Button
                            onClick={handleAddToCart}
                            className="w-full bg-white text-black hover:bg-gray-100 font-medium py-2 px-4 rounded-sm transition-all duration-200 transform hover:scale-105"
                        >
                            <Plus className="h-4 w-4 mr-2"/>
                            {t('product.addToCart')}
                        </Button>
                    </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                    {/* Category */}
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1 font-medium">
                        {category}
                    </p>

                    {/* Product Name */}
                    <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem]">
                        {name}
                    </h3>

                    {/* Price */}
                    <div className="flex items-center gap-2">
       <span className="text-lg font-bold text-gray-900">
         ${price.toFixed(2)}
       </span>
                        {originalPrice && originalPrice > price && (
                            <span className="text-sm text-gray-500 line-through">
           ${originalPrice.toFixed(2)}
         </span>
                        )}
                    </div>

                    {/* Mobile Add to Cart (visible on small screens) */}
                    <Button
                        onClick={handleAddToCart}
                        className="w-full mt-3 bg-black text-white hover:bg-gray-800 font-medium py-2 px-4 rounded-sm transition-colors sm:hidden"
                    >
                        <Plus className="h-4 w-4 mr-2"/>
                        {t('product.addToCart')}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
