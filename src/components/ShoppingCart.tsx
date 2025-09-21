import { useState, useEffect } from "react";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { CartItem } from "@/App.tsx";
import { useLanguage } from "@/components/LanguageContext";

interface ShoppingCartProps {
    items?: CartItem[];
    isOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    onUpdateQuantity?: (itemId: number, quantity: number) => void;
    onRemoveItem?: (itemId: number) => void;
    onCheckout?: () => void;
}

export default function ShoppingCart({
                                         items = [],
                                         isOpen = false,
                                         onOpenChange,
                                         onUpdateQuantity,
                                         onRemoveItem,
                                         onCheckout,
                                     }: ShoppingCartProps) {
    const [localItems, setLocalItems] = useState(items);
    const { t } = useLanguage();

    // Sync with props if items change
    useEffect(() => {
        setLocalItems(items);
    }, [items]);

    const updateQuantity = (itemId: number, newQuantity: number) => {
        if (newQuantity <= 0) {
            removeItem(itemId);
            return;
        }

        setLocalItems(prev =>
            prev.map(item => item.id === itemId ? { ...item, quantity: newQuantity } : item)
        );

        onUpdateQuantity?.(itemId, newQuantity);
    };

    const removeItem = (itemId: number) => {
        setLocalItems(prev => prev.filter(item => item.id !== itemId));
        onRemoveItem?.(itemId);
    };

    const subtotal = localItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 100 ? 0 : 10;
    const total = subtotal + shipping;

    const handleCheckout = () => {
        onCheckout?.();
        console.log('Proceeding to checkout with items:', localItems);
    };

    const totalItemCount = localItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <Sheet open={isOpen} onOpenChange={onOpenChange}>
            <SheetContent className="w-full sm:w-96 bg-white border-l border-gray-200">
                <SheetHeader className="pb-4 border-b border-gray-200">
                    <SheetTitle className="flex items-center text-lg font-semibold text-gray-900">
                        <ShoppingBag className="h-5 w-5 mr-2" />
                        {t('cart.title')} ({totalItemCount})
                    </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col h-full">
                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto py-4">
                        {localItems.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-64 text-center">
                                <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {t('cart.empty')}
                                </h3>
                                <p className="text-gray-600">
                                    {t('cart.emptyDescription')}
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {localItems.map((item) => {
                                    const imageArray = Array.isArray(item.images)
                                        ? item.images
                                        : item.images?.replace("[", "").replace("]", "").trim().split(",") || [];
                                    const imageUrl = imageArray[0]?.trim() || "/placeholder-image.jpg";

                                    return (
                                        <div key={`${item.id}-${item.size}`} className="flex gap-4 p-3 bg-gray-50 rounded-lg">
                                            <div className="flex-shrink-0">
                                                <img
                                                    src={imageUrl}
                                                    alt={item.name}
                                                    className="w-16 h-16 object-cover rounded-md bg-white"
                                                />
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-medium text-gray-900 truncate text-sm">
                                                    {item.name}
                                                </h4>

                                                {item.size && (
                                                    <p className="text-xs text-gray-600 mt-1">
                                                        {t('cart.size')}: {item.size}
                                                    </p>
                                                )}

                                                <p className="font-semibold text-gray-900 text-sm mt-1">
                                                    ${item.price.toFixed(2)}
                                                </p>

                                                {/* Quantity Controls */}
                                                <div className="flex items-center justify-between mt-2">
                                                    <div className="flex items-center space-x-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="h-7 w-7 p-0 border-gray-300 hover:bg-gray-100"
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        >
                                                            <Minus className="h-3 w-3" />
                                                        </Button>

                                                        <span className="font-medium text-sm min-w-[1.5rem] text-center">
                             {item.quantity}
                           </span>

                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="h-7 w-7 p-0 border-gray-300 hover:bg-gray-100"
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        >
                                                            <Plus className="h-3 w-3" />
                                                        </Button>
                                                    </div>

                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-7 w-7 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                                                        onClick={() => removeItem(item.id)}
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Cart Summary */}
                    {localItems.length > 0 && (
                        <div className="border-t border-gray-200 pt-4 mt-4 space-y-4">
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">{t('cart.subtotal')}</span>
                                    <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
                                </div>

                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">{t('cart.shipping')}</span>
                                    <span className="font-medium text-gray-900">
                   {shipping === 0 ? t('cart.free') : `$${shipping.toFixed(2)}`}
                 </span>
                                </div>

                                <Separator className="bg-gray-200" />

                                <div className="flex justify-between">
                                    <span className="font-semibold text-gray-900">{t('cart.total')}</span>
                                    <span className="font-bold text-lg text-gray-900">${total.toFixed(2)}</span>
                                </div>

                                {subtotal < 100 && (
                                    <p className="text-xs text-center text-gray-600 bg-gray-50 p-2 rounded">
                                        {t('cart.freeShipping')} ${(100 - subtotal).toFixed(2)} {t('cart.freeShippingMore')}
                                    </p>
                                )}
                            </div>

                            <Button
                                onClick={handleCheckout}
                                className="w-full bg-black text-white hover:bg-gray-800 font-medium py-3 rounded-md transition-colors"
                            >
                                {t('cart.checkout')}
                            </Button>
                        </div>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}