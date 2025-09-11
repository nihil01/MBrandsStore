import { useState } from "react";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
}

interface ShoppingCartProps {
  items?: CartItem[];
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onUpdateQuantity?: (itemId: string, quantity: number) => void;
  onRemoveItem?: (itemId: string) => void;
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

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
      return;
    }
    
    setLocalItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
    onUpdateQuantity?.(itemId, newQuantity);
  };

  const removeItem = (itemId: string) => {
    setLocalItems(prev => prev.filter(item => item.id !== itemId));
    onRemoveItem?.(itemId);
  };

  const subtotal = localItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    onCheckout?.();
    console.log('Proceeding to checkout with items:', localItems);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" data-testid="button-cart-trigger">
          <ShoppingBag className="w-5 h-5" />
          {localItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {localItems.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-lg" data-testid="cart-sheet">
        <SheetHeader>
          <SheetTitle className="text-left" data-testid="cart-title">
            Shopping Cart ({localItems.reduce((sum, item) => sum + item.quantity, 0)})
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto py-6">
            {localItems.length === 0 ? (
              <div className="text-center py-12" data-testid="cart-empty">
                <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground">Add some products to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {localItems.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 border border-border rounded-lg" data-testid={`cart-item-${item.id}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                      data-testid={`cart-item-image-${item.id}`}
                    />
                    
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground" data-testid={`cart-item-name-${item.id}`}>
                        {item.name}
                      </h4>
                      {item.size && (
                        <p className="text-sm text-muted-foreground" data-testid={`cart-item-size-${item.id}`}>
                          Size: {item.size}
                        </p>
                      )}
                      <p className="text-sm font-semibold text-foreground" data-testid={`cart-item-price-${item.id}`}>
                        ${item.price.toFixed(2)}
                      </p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="w-8 h-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          data-testid={`button-decrease-${item.id}`}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        
                        <span className="w-8 text-center font-semibold" data-testid={`cart-item-quantity-${item.id}`}>
                          {item.quantity}
                        </span>
                        
                        <Button
                          size="icon"
                          variant="outline"
                          className="w-8 h-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          data-testid={`button-increase-${item.id}`}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <Button
                      size="icon"
                      variant="ghost"
                      className="w-8 h-8"
                      onClick={() => removeItem(item.id)}
                      data-testid={`button-remove-${item.id}`}
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
            <div className="border-t border-border pt-6">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span data-testid="cart-subtotal-label">Subtotal</span>
                  <span data-testid="cart-subtotal">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span data-testid="cart-shipping-label">Shipping</span>
                  <span data-testid="cart-shipping">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-semibold text-lg">
                  <span data-testid="cart-total-label">Total</span>
                  <span data-testid="cart-total">${total.toFixed(2)}</span>
                </div>
                
                <Button
                  onClick={handleCheckout}
                  className="w-full mt-6"
                  size="lg"
                  data-testid="button-checkout"
                >
                  Checkout
                </Button>
                
                {subtotal < 100 && (
                  <p className="text-sm text-muted-foreground text-center" data-testid="cart-free-shipping-notice">
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