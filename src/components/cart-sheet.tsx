'use client';

import { useCart } from '@/lib/cart-context';
import { formatCOP } from '@/lib/data';
import { useRouter } from 'next/navigation';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function CartSheet() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, clearCart } = useCart();
  const router = useRouter();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative p-3 rounded-full bg-brand-dark-surface hover:bg-brand-dark-card transition-colors cursor-pointer group">
          <svg
            className="w-6 h-6 text-white group-hover:text-brand-orange transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
            />
          </svg>
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-brand-red text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-count-up shadow-lg shadow-brand-red/40">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent className="bg-brand-dark border-l border-white/10 text-white w-full sm:max-w-md p-0 flex flex-col">
        <SheetHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-white text-xl font-bold flex items-center gap-2">
              🛒 Tu Pedido
              {totalItems > 0 && (
                <Badge className="bg-brand-red text-white ml-2">{totalItems}</Badge>
              )}
            </SheetTitle>
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-brand-muted hover:text-brand-red transition-colors cursor-pointer"
              >
                Vaciar
              </button>
            )}
          </div>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-brand-muted">
            <span className="text-6xl">🍟</span>
            <p className="text-lg font-medium">Tu carrito está vacío</p>
            <p className="text-sm">¡Agrega algo delicioso!</p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-6">
              <div className="space-y-4 py-4">
                {items.map((item) => {
                  const addOnsTotal = item.addOns.reduce((s, a) => s + a.price, 0);
                  const itemTotal = (item.basePrice + addOnsTotal) * item.quantity;

                  return (
                    <div
                      key={item.id}
                      className="bg-brand-dark-card rounded-xl p-4 space-y-3 animate-slide-up border border-white/5"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm text-white">{item.name}</h4>
                          {item.sauces.length > 0 && (
                            <p className="text-xs text-brand-muted mt-1">
                              Salsas: {item.sauces.join(', ')}
                            </p>
                          )}
                          {item.addOns.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {item.addOns.map((a) => (
                                <span
                                  key={a.id}
                                  className="text-[10px] px-2 py-0.5 rounded-full bg-brand-amber/15 text-brand-amber"
                                >
                                  +{a.name}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-brand-muted hover:text-brand-red transition-colors p-1 cursor-pointer"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 rounded-full bg-brand-dark-surface text-white text-sm flex items-center justify-center hover:bg-brand-red/20 transition-colors cursor-pointer"
                          >
                            −
                          </button>
                          <span className="text-sm font-bold w-5 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 rounded-full bg-brand-dark-surface text-white text-sm flex items-center justify-center hover:bg-brand-red/20 transition-colors cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-bold text-brand-orange text-sm">
                          {formatCOP(itemTotal)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>

            <div className="p-6 pt-0 space-y-4">
              <Separator className="bg-white/10" />
              <div className="flex justify-between items-center">
                <span className="text-brand-muted text-sm">Total</span>
                <span className="text-2xl font-bold text-gradient">{formatCOP(totalPrice)}</span>
              </div>
              <Button
                onClick={() => router.push('/checkout')}
                className="w-full bg-brand-red hover:bg-brand-red/90 text-white font-bold text-base py-6 rounded-xl shadow-lg shadow-brand-red/30 transition-all duration-300 hover:shadow-brand-red/50 hover:scale-[1.02] cursor-pointer"
              >
                Ir a Pagar 🔥
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
