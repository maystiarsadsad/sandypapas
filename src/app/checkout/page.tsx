'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cart-context';
import { formatCOP } from '@/lib/data';
import { PaymentMethod } from '@/types';
import { useRouter } from 'next/navigation';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const paymentMethods: { id: PaymentMethod; label: string; icon: string }[] = [
  { id: 'efectivo', label: 'Efectivo', icon: '💵' },
  { id: 'nequi', label: 'Nequi', icon: '📱' },
  { id: 'daviplata', label: 'Daviplata', icon: '📲' },
  { id: 'tarjeta', label: 'Tarjeta', icon: '💳' },
];

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('efectivo');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !address.trim() || items.length === 0) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setOrderPlaced(true);
    clearCart();

    // Redirect after 3 seconds
    setTimeout(() => router.push('/'), 3000);
  };

  if (orderPlaced) {
    return (
      <>
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-md animate-slide-up">
            <span className="text-8xl block mb-6">🎉</span>
            <h1 className="text-3xl font-black text-white mb-3">¡Pedido Realizado!</h1>
            <p className="text-brand-muted text-lg mb-2">
              Tu pedido ha sido recibido y está siendo preparado.
            </p>
            <p className="text-brand-amber font-semibold">
              Te redirigiremos al menú en unos segundos...
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center animate-slide-up">
            <span className="text-6xl block mb-4">🛒</span>
            <h1 className="text-2xl font-bold text-white mb-2">Tu carrito está vacío</h1>
            <p className="text-brand-muted mb-6">Agrega productos antes de hacer checkout</p>
            <Button
              onClick={() => router.push('/')}
              className="bg-brand-red hover:bg-brand-red/90 text-white font-bold cursor-pointer"
            >
              Ver Menú 🍟
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 md:px-8 py-8">
        <h1 className="text-3xl font-black text-white mb-8 flex items-center gap-3">
          <span className="text-3xl">📋</span> Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">
            {/* Customer info */}
            <div className="bg-brand-dark-card rounded-2xl p-6 border border-white/5 space-y-5">
              <h2 className="font-bold text-white text-lg">Datos del pedido</h2>

              <div className="space-y-2">
                <Label htmlFor="name" className="text-brand-muted text-sm">
                  Nombre *
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="¿Cómo te llamas?"
                  required
                  className="bg-brand-dark-surface border-white/10 text-white placeholder:text-brand-muted/50 focus:border-brand-red"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-brand-muted text-sm">
                  Dirección de entrega *
                </Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Calle, barrio, referencias..."
                  required
                  className="bg-brand-dark-surface border-white/10 text-white placeholder:text-brand-muted/50 focus:border-brand-red"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="note" className="text-brand-muted text-sm">
                  Notas del pedido (opcional)
                </Label>
                <Textarea
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Sin cebolla, salsa aparte, etc."
                  rows={3}
                  className="bg-brand-dark-surface border-white/10 text-white placeholder:text-brand-muted/50 focus:border-brand-red resize-none"
                />
              </div>
            </div>

            {/* Payment */}
            <div className="bg-brand-dark-card rounded-2xl p-6 border border-white/5 space-y-4">
              <h2 className="font-bold text-white text-lg">Método de pago</h2>
              <div className="grid grid-cols-2 gap-3">
                {paymentMethods.map((pm) => (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setPaymentMethod(pm.id)}
                    className={`
                      p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer
                      ${paymentMethod === pm.id
                        ? 'border-brand-red bg-brand-red/10 shadow-lg shadow-brand-red/10'
                        : 'border-white/10 bg-brand-dark-surface hover:border-white/20'
                      }
                    `}
                  >
                    <span className="text-2xl block mb-1">{pm.icon}</span>
                    <span className="text-sm font-medium text-white">{pm.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || !name.trim() || !address.trim()}
              className="w-full bg-brand-red hover:bg-brand-red/90 text-white font-bold text-base py-6 rounded-xl shadow-lg shadow-brand-red/30 transition-all duration-300 hover:shadow-brand-red/50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Procesando...
                </span>
              ) : (
                `Confirmar Pedido — ${formatCOP(totalPrice)}`
              )}
            </Button>
          </form>

          {/* Order summary */}
          <div className="lg:col-span-2">
            <div className="bg-brand-dark-card rounded-2xl p-6 border border-white/5 sticky top-24 space-y-4">
              <h2 className="font-bold text-white text-lg">Resumen</h2>

              <div className="space-y-3">
                {items.map((item) => {
                  const addOnsTotal = item.addOns.reduce((s, a) => s + a.price, 0);
                  const itemTotal = (item.basePrice + addOnsTotal) * item.quantity;
                  return (
                    <div key={item.id} className="flex justify-between items-start text-sm">
                      <div className="flex-1">
                        <span className="text-white font-medium">
                          {item.quantity}x {item.name}
                        </span>
                        {item.addOns.length > 0 && (
                          <p className="text-brand-muted text-xs mt-0.5">
                            +{item.addOns.map((a) => a.name).join(', ')}
                          </p>
                        )}
                      </div>
                      <span className="text-brand-muted whitespace-nowrap ml-3">
                        {formatCOP(itemTotal)}
                      </span>
                    </div>
                  );
                })}
              </div>

              <Separator className="bg-white/10" />

              <div className="flex justify-between items-center">
                <span className="text-brand-muted font-medium">Total</span>
                <span className="text-2xl font-black text-gradient">{formatCOP(totalPrice)}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
