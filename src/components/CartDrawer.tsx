import { X, Minus, Plus, ShoppingBag, Trash2, Package, Truck, Shield, CreditCard, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';

const CartDrawer = () => {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalPrice, totalItems, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  if (!isCartOpen) return null;

  const calculateItemTotal = (price: string, quantity: number) => {
    const numPrice = parseFloat(price.replace(/[$,]/g, ''));
    return (numPrice * quantity).toLocaleString('en-US', { minimumFractionDigits: 2 });
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[60]"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-lg bg-card border-l border-border z-[60] flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-gradient-to-r from-card to-secondary/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold">Shopping Cart</h2>
              <p className="text-muted-foreground text-sm">{totalItems} {totalItems === 1 ? 'item' : 'items'} in cart</p>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-3 hover:bg-muted rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
              <div className="w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center mb-6">
                <ShoppingBag className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground mb-8 max-w-xs">
                Looks like you haven't added any components to your build yet. Start exploring our products!
              </p>
              <a href="#products" className="hidden md:flex">
                <Button variant="hero" size="lg" onClick={() => setIsCartOpen(false)}>
                  Browse Products
                </Button>
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="group bg-secondary/30 hover:bg-secondary/50 border border-border rounded-2xl overflow-hidden transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Product Header */}
                  <div className="flex gap-4 p-4">
                    <div className="relative w-28 h-28 rounded-xl overflow-hidden flex-shrink-0 border border-border">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-primary/90 text-primary-foreground text-[10px] font-bold rounded-md uppercase">
                        {item.category}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <h4 className="font-display font-bold text-lg text-foreground truncate mb-1">
                          {item.name}
                        </h4>
                        <p className="text-muted-foreground text-sm mb-2">
                          SKU: {item.id.toUpperCase().slice(0, 8)}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-primary font-display font-bold text-xl">
                            {item.price}
                          </span>
                          <span className="text-muted-foreground text-sm">each</span>
                        </div>
                      </div>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="self-start p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Quantity & Subtotal */}
                  <div className="flex items-center justify-between px-4 py-3 bg-muted/30 border-t border-border">
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground text-sm mr-2">Qty:</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-9 h-9 flex items-center justify-center bg-secondary hover:bg-primary hover:text-primary-foreground rounded-lg transition-all duration-200 border border-border"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <div className="w-14 h-9 flex items-center justify-center bg-card border border-border rounded-lg font-display font-bold text-lg">
                        {item.quantity}
                      </div>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-9 h-9 flex items-center justify-center bg-secondary hover:bg-primary hover:text-primary-foreground rounded-lg transition-all duration-200 border border-border"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-muted-foreground text-xs">Subtotal</p>
                      <p className="font-display font-bold text-lg text-accent">
                        ${calculateItemTotal(item.price, item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={clearCart}
                className="w-full py-3 text-muted-foreground hover:text-destructive text-sm transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Clear All Items
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border bg-gradient-to-t from-secondary/30 to-card">
            <div className="flex items-center justify-around py-3 border-b border-border text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-primary" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-primary" />
                <span>2-Year Warranty</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Package className="w-4 h-4 text-primary" />
                <span>Easy Returns</span>
              </div>
            </div>

            {/* Totals */}
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
                  <span className="text-foreground">${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-primary font-medium">FREE</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Estimated Tax</span>
                  <span className="text-foreground">${(totalPrice * 0.08).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

              <div className="h-px bg-border" />

              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-lg">Total</span>
                <span className="font-display font-bold text-2xl text-primary">
                  ${(totalPrice * 1.08).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>

              <Button
                variant="hero"
                className="w-full h-14 text-lg"
                size="lg"
                onClick={() => setShowCheckout(true)}
              >
                Proceed to Checkout
              </Button>

              <button
                onClick={() => setIsCartOpen(false)}
                className="w-full text-center text-muted-foreground hover:text-primary text-sm transition-colors py-2"
              >
                ← Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-[70] bg-black/70 flex items-center justify-center px-4">
          <div className="bg-background rounded-2xl p-6 w-full max-w-md h-[90vh] overflow-auto relative">
            <button
              onClick={() => setShowCheckout(false)}
              className="absolute top-4 right-4 text-foreground p-2 hover:bg-muted rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold mb-4 text-center">Checkout</h2>

            {/* Payment Methods */}
            <div className="space-y-4">
              <Button variant="outline" size="lg" className="w-full flex items-center justify-start gap-2">
                <CreditCard className="w-5 h-5" />
                Pay with Credit Card
              </Button>
              <Button variant="outline" size="lg" className="w-full flex items-center justify-start gap-2">
                <Wallet className="w-5 h-5" />
                Pay with Wallet / GCash / PayPal
              </Button>
            </div>

            {/* Order Summary */}
            <div className="mt-6 p-4 border border-border rounded-xl space-y-2">
              <h3 className="font-semibold text-lg">Order Summary</h3>
              {items.map(item => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name} x{item.quantity}</span>
                  <span>${calculateItemTotal(item.price, item.quantity)}</span>
                </div>
              ))}
              <div className="h-px bg-border my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${(totalPrice * 1.08).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            <Button variant="hero" className="w-full mt-6 h-14 text-lg">
              Complete Payment
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default CartDrawer;
