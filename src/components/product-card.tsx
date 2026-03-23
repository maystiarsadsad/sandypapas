'use client';

import { Product } from '@/types';
import { formatCOP } from '@/lib/data';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <button
      onClick={() => onSelect(product)}
      className="card-glass rounded-2xl overflow-hidden text-left group cursor-pointer w-full"
    >
      {/* Image placeholder */}
      <div className="relative h-44 md:h-52 overflow-hidden bg-brand-dark-surface">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl opacity-40 group-hover:scale-110 transition-transform duration-500">
            {product.category_id === 'papas-especiales' ? '🍟' :
             product.category_id === 'picadas' ? '🥘' :
             product.category_id === 'hamburguesas' ? '🍔' :
             product.category_id === 'salchipapas' ? '🌭' :
             product.category_id === 'bebidas' ? '🥤' : '➕'}
          </span>
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-transparent to-transparent" />
        {/* Price badge */}
        <div className="absolute bottom-3 right-3">
          <span className="bg-brand-red text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg shadow-brand-red/30">
            {formatCOP(product.price)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-base text-white group-hover:text-brand-orange transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-brand-muted mt-1 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
      </div>
    </button>
  );
}
