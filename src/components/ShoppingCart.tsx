import { useState, useEffect } from "react";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { CartItem } from "@/App.tsx";

interface ShoppingCartProps {
    items?: CartItem[];
    isOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    onUpdateQuantity?: (itemId: number, quantity: number) => void;
    onRemoveItem?: (itemId: number) => void;
    onCheckout?: () => void;
    highlightColor: string;
}

export default function ShoppingCart({
                                         items = [],
                                         isOpen = false,
                                         onOpenChange,
                                         onUpdateQuantity,
                                         onRemoveItem,
                                         onCheckout,
                                         highlightColor,
                                     }: ShoppingCartProps) {
    const [localItems, setLocalItems] = useState<CartItem[]>(items);

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

    return (
        <Sheet open={isOpen} onOpenChange={onOpenChange}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative" style={{ color: highlightColor }}>
                    <ShoppingBag className="w-5 h-5" />
                    {localItems.length > 0 && (
                        <span className="absolute -top-1 -right-1 text-xs rounded-full w-5 h-5 flex items-center justify-center" style={{ backgroundColor: highlightColor, color: "#fff" }}>
                            {localItems.reduce((sum, item) => sum + item.quantity, 0)}
                        </span>
                    )}
                </Button>
            </SheetTrigger>

            <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                    <SheetTitle className="text-left" style={{ color: highlightColor }}>
                        Shopping Cart ({localItems.reduce((sum, item) => sum + item.quantity, 0)})
                    </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col h-full">
                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto py-6">
                        {localItems.length === 0 ? (
                            <div className="text-center py-12">
                                <ShoppingBag className="w-16 h-16 mx-auto mb-4" style={{ color: highlightColor }} />
                                <h3 className="text-lg font-semibold mb-2" style={{ color: highlightColor }}>Your cart is empty</h3>
                                <p className="text-sm" style={{ color: highlightColor, opacity: 0.7 }}>Add some products to get started</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {localItems.map((item) => (
                                    <div key={item.id} className="flex gap-4 p-4 rounded-lg border" style={{ borderColor: highlightColor }}>
                                        <img
                                            src={item.images?.[0] ?? ""}
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded-md"
                                        />

                                        <div className="flex-1">
                                            <h4 className="font-semibold mb-1" style={{ color: highlightColor }}>{item.name}</h4>
                                            {item.size && (
                                                <p className="text-sm mb-1" style={{ color: highlightColor, opacity: 0.7 }}>
                                                    Size: {item.size}
                                                </p>
                                            )}
                                            <p className="text-sm font-semibold" style={{ color: highlightColor }}>
                                                ${item.price.toFixed(2)}
                                            </p>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-2 mt-2">
                                                <Button
                                                    size="icon"
                                                    variant="outline"
                                                    className="w-8 h-8"
                                                    style={{ borderColor: highlightColor, color: highlightColor }}
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </Button>

                                                <span className="w-8 text-center font-semibold" style={{ color: highlightColor }}>
                                                    {item.quantity}
                                                </span>

                                                <Button
                                                    size="icon"
                                                    variant="outline"
                                                    className="w-8 h-8"
                                                    style={{ borderColor: highlightColor, color: highlightColor }}
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </Button>
                                            </div>
                                        </div>

                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="w-8 h-8"
                                            style={{ color: highlightColor }}
                                            onClick={() => removeItem(item.id)}
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Cart Summary */}
                    {localItems.length > 0 && (
                        <div className="border-t pt-6" style={{ borderColor: highlightColor }}>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span style={{ color: highlightColor }}>Subtotal</span>
                                    <span style={{ color: highlightColor }}>${subtotal.toFixed(2)}</span>
                                </div>

                                <div className="flex justify-between text-sm">
                                    <span style={{ color: highlightColor }}>Shipping</span>
                                    <span style={{ color: highlightColor }}>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                                </div>

                                <Separator style={{ borderColor: highlightColor }} />

                                <div className="flex justify-between font-semibold text-lg">
                                    <span style={{ color: highlightColor }}>Total</span>
                                    <span style={{ color: highlightColor }}>${total.toFixed(2)}</span>
                                </div>

                                <Button
                                    onClick={handleCheckout}
                                    className="w-full mt-6"
                                    size="lg"
                                    style={{ backgroundColor: highlightColor, color: "#fff" }}
                                >
                                    Checkout
                                </Button>

                                {subtotal < 100 && (
                                    <p className="text-sm text-center" style={{ color: highlightColor, opacity: 0.7 }}>
                                        Add ${(100 - subtotal).toFixed(2)} more for free shipping
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}
