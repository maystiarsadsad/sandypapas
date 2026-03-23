'use client';

import { useState, useMemo } from 'react';
import { Product } from '@/types';
import { products, categories } from '@/lib/data';
import Header from '@/components/header';
import Footer from '@/components/footer';
import CategoryTabs from '@/components/category-tabs';
import ProductCard from '@/components/product-card';
import ProductDetailDialog from '@/components/product-detail-dialog';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    if (selectedCategory === 'all') return products.filter((p) => p.active);
    return products.filter((p) => p.active && p.category_id === selectedCategory);
  }, [selectedCategory]);

  const categoryName = categories.find((c) => c.id === selectedCategory)?.name ?? 'Todos';

  return (
    <>
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden py-16 md:py-24">
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-brand-red/10 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-brand-orange/10 blur-[100px] pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 md:px-8 text-center">
            <span className="text-6xl md:text-8xl animate-float inline-block mb-6">🍟</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
              Las papas más{' '}
              <span className="text-gradient">brutales</span>
              <br />
              de la ciudad
            </h1>
            <p className="text-brand-muted text-lg md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed">
              Papas cargadas, salchipapas, hamburguesas y mucho más. 
              Pide ahora y recibe en minutos 🔥
            </p>
          </div>
        </section>

        {/* Category tabs */}
        <section className="max-w-7xl mx-auto px-4 md:px-8">
          <CategoryTabs selected={selectedCategory} onSelect={setSelectedCategory} />
        </section>

        {/* Products grid */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">
              {categoryName}
              <span className="text-brand-muted text-sm font-normal ml-2">
                ({filtered.length} {filtered.length === 1 ? 'producto' : 'productos'})
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((product, i) => (
              <div
                key={product.id}
                className="animate-slide-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <ProductCard
                  product={product}
                  onSelect={setSelectedProduct}
                />
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <span className="text-6xl">😅</span>
              <p className="text-brand-muted mt-4 text-lg">No hay productos en esta categoría</p>
            </div>
          )}
        </section>
      </main>

      <Footer />

      {/* Product detail dialog */}
      <ProductDetailDialog
        product={selectedProduct}
        open={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}
