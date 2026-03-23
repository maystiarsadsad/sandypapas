'use client';

import { useState, useMemo } from 'react';
import { Product, AddOn } from '@/types';
import { addOns, sauces, formatCOP } from '@/lib/data';
import { useCart } from '@/lib/cart-context';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

interface ProductDetailDialogProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

export default function ProductDetailDialog({ product, open, onClose }: ProductDetailDialogProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const [selectedSauces, setSelectedSauces] = useState<string[]>([]);

  const addOnsTotal = useMemo(
    () => selectedAddOns.reduce((sum, a) => sum + a.price, 0),
    [selectedAddOns]
  );

  const unitPrice = product ? product.price + addOnsTotal : 0;
  const totalPrice = unitPrice * quantity;

  const toggleAddOn = (addon: AddOn) => {
    setSelectedAddOns((prev) =>
      prev.some((a) => a.id === addon.id)
        ? prev.filter((a) => a.id !== addon.id)
        : [...prev, addon]
    );
  };

  const toggleSauce = (sauce: string) => {
    setSelectedSauces((prev) =>
      prev.includes(sauce)
        ? prev.filter((s) => s !== sauce)
        : prev.length < 3
          ? [...prev, sauce]
          : prev
    );
  };

  const handleAddToCart = () => {
    if (!product) return;
    addItem({
      productId: product.id,
      name: product.name,
      quantity,
      basePrice: product.price,
      addOns: selectedAddOns.map((a) => ({ id: a.id, name: a.name, price: a.price })),
      sauces: selectedSauces,
      image_url: product.image_url,
    });
    // Reset and close
    setQuantity(1);
    setSelectedAddOns([]);
    setSelectedSauces([]);
    onClose();
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setQuantity(1);
      setSelectedAddOns([]);
      setSelectedSauces([]);
      onClose();
    }
  };

  if (!product) return null;

  const emoji =
    product.category_id === 'papas-especiales' ? '🍟' :
    product.category_id === 'picadas' ? '🥘' :
    product.category_id === 'hamburguesas' ? '🍔' :
    product.category_id === 'salchipapas' ? '🌭' :
    product.category_id === 'bebidas' ? '🥤' : '➕';

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-brand-dark-card border-white/10 text-white max-w-lg max-h-[90vh] overflow-y-auto p-0">
        {/* Hero image */}
        <div className="relative h-48 bg-gradient-to-br from-brand-dark-surface to-brand-dark flex items-center justify-center">
          <span className="text-8xl animate-float">{emoji}</span>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-card via-transparent to-transparent" />
        </div>

        <div className="px-6 pb-6 space-y-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">{product.name}</DialogTitle>
            <p className="text-brand-muted text-sm leading-relaxed mt-1">{product.description}</p>
            <p className="text-brand-orange font-bold text-xl mt-2">{formatCOP(product.price)}</p>
          </DialogHeader>

          {/* Quantity */}
          <div>
            <h4 className="text-sm font-semibold text-brand-muted mb-3">CANTIDAD</h4>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-full bg-brand-dark-surface text-white font-bold text-lg flex items-center justify-center hover:bg-brand-red/20 transition-colors cursor-pointer"
              >
                −
              </button>
              <span className="text-2xl font-bold w-8 text-center animate-count-up" key={quantity}>
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-full bg-brand-dark-surface text-white font-bold text-lg flex items-center justify-center hover:bg-brand-red/20 transition-colors cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          {/* Sauces */}
          <div>
            <h4 className="text-sm font-semibold text-brand-muted mb-3">
              SALSAS <span className="text-xs font-normal">(máx. 3)</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {sauces.map((sauce) => {
                const isSelected = selectedSauces.includes(sauce);
                return (
                  <button
                    key={sauce}
                    onClick={() => toggleSauce(sauce)}
                    className={`
                      px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer
                      ${isSelected
                        ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/20'
                        : 'bg-brand-dark-surface text-brand-muted hover:text-white hover:bg-brand-dark-surface/80'
                      }
                    `}
                  >
                    {sauce}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Add-ons */}
          <div>
            <h4 className="text-sm font-semibold text-brand-muted mb-3">ADICIONES</h4>
            <div className="space-y-2">
              {addOns.map((addon) => {
                const isSelected = selectedAddOns.some((a) => a.id === addon.id);
                return (
                  <button
                    key={addon.id}
                    onClick={() => toggleAddOn(addon)}
                    className={`
                      w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 cursor-pointer
                      ${isSelected
                        ? 'bg-brand-red/15 border border-brand-red/40'
                        : 'bg-brand-dark-surface border border-transparent hover:border-white/10'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={isSelected}
                        className="border-brand-muted data-[state=checked]:bg-brand-red data-[state=checked]:border-brand-red"
                      />
                      <span className="text-sm text-white">{addon.name}</span>
                    </div>
                    <Badge variant="secondary" className="bg-brand-dark text-brand-amber text-xs font-semibold">
                      +{formatCOP(addon.price)}
                    </Badge>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Add to cart */}
          <Button
            onClick={handleAddToCart}
            className="w-full bg-brand-red hover:bg-brand-red/90 text-white font-bold text-base py-6 rounded-xl shadow-lg shadow-brand-red/30 transition-all duration-300 hover:shadow-brand-red/50 hover:scale-[1.02] cursor-pointer"
          >
            Agregar al carrito — {formatCOP(totalPrice)}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
