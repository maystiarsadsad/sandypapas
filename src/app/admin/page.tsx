'use client';

import { useState } from 'react';
import { products, categories, addOns, formatCOP } from '@/lib/data';
import { Order, OrderStatus } from '@/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

// Mock orders for demo
const mockOrders: Order[] = [
  {
    id: 'ord-001',
    total: 46000,
    status: 'pendiente',
    customer_name: 'Carlos Pérez',
    address: 'Cra 15 #45-23, Barrio Centro',
    note: 'Sin cebolla por favor',
    payment_method: 'nequi',
    created_at: new Date(Date.now() - 5 * 60000).toISOString(),
  },
  {
    id: 'ord-002',
    total: 28000,
    status: 'preparando',
    customer_name: 'Maria López',
    address: 'Cll 20 #10-15, Barrio Norte',
    note: '',
    payment_method: 'efectivo',
    created_at: new Date(Date.now() - 15 * 60000).toISOString(),
  },
  {
    id: 'ord-003',
    total: 55000,
    status: 'en_camino',
    customer_name: 'Juan Rodriguez',
    address: 'Av. Principal #78-90',
    note: 'Dejar en portería',
    payment_method: 'daviplata',
    created_at: new Date(Date.now() - 30 * 60000).toISOString(),
  },
  {
    id: 'ord-004',
    total: 20000,
    status: 'entregado',
    customer_name: 'Ana García',
    address: 'Cra 8 #12-34',
    note: '',
    payment_method: 'tarjeta',
    created_at: new Date(Date.now() - 60 * 60000).toISOString(),
  },
];

const statusConfig: Record<OrderStatus, { label: string; color: string; icon: string }> = {
  pendiente: { label: 'Pendiente', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', icon: '⏳' },
  preparando: { label: 'Preparando', color: 'bg-brand-orange/20 text-brand-orange border-brand-orange/30', icon: '👨‍🍳' },
  en_camino: { label: 'En Camino', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', icon: '🛵' },
  entregado: { label: 'Entregado', color: 'bg-green-500/20 text-green-400 border-green-500/30', icon: '✅' },
};

const statusFlow: OrderStatus[] = ['pendiente', 'preparando', 'en_camino', 'entregado'];

type AdminTab = 'orders' | 'products' | 'categories';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('orders');
  const [orders, setOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');

  const advanceStatus = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        const currentIndex = statusFlow.indexOf(o.status);
        if (currentIndex < statusFlow.length - 1) {
          return { ...o, status: statusFlow[currentIndex + 1] };
        }
        return o;
      })
    );
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tabs: { id: AdminTab; label: string; icon: string }[] = [
    { id: 'orders', label: 'Pedidos', icon: '📋' },
    { id: 'products', label: 'Productos', icon: '🍟' },
    { id: 'categories', label: 'Categorías', icon: '📂' },
  ];

  function timeAgo(dateStr: string) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'ahora';
    if (mins < 60) return `hace ${mins} min`;
    const hours = Math.floor(mins / 60);
    return `hace ${hours}h`;
  }

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 bg-brand-dark/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-2xl group-hover:animate-float">🍟</span>
              <span className="text-xl font-bold text-gradient">Sandy Papas</span>
            </Link>
            <Badge className="bg-brand-red/20 text-brand-red border-brand-red/30 text-xs">
              Admin
            </Badge>
          </div>
          <Link
            href="/"
            className="text-sm text-brand-muted hover:text-white transition-colors"
          >
            ← Volver al menú
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer
                ${activeTab === tab.id
                  ? 'bg-brand-red text-white shadow-lg shadow-brand-red/30'
                  : 'bg-brand-dark-surface text-brand-muted hover:text-white'
                }
              `}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Pedidos en curso</h2>
              <div className="flex gap-2 text-sm">
                {statusFlow.map((s) => {
                  const count = orders.filter((o) => o.status === s).length;
                  const cfg = statusConfig[s];
                  return (
                    <span
                      key={s}
                      className={`px-3 py-1 rounded-full ${cfg.color} border text-xs font-medium`}
                    >
                      {cfg.icon} {count}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {orders.map((order) => {
                const cfg = statusConfig[order.status];
                const canAdvance = order.status !== 'entregado';
                return (
                  <div
                    key={order.id}
                    className="bg-brand-dark-card rounded-2xl p-5 border border-white/5 space-y-4 animate-slide-up"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-white">{order.customer_name}</h3>
                        <p className="text-xs text-brand-muted mt-0.5">{timeAgo(order.created_at)}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full ${cfg.color} border text-xs font-semibold`}>
                        {cfg.icon} {cfg.label}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <span className="text-brand-muted">📍</span>
                        <span className="text-white/80">{order.address}</span>
                      </div>
                      {order.note && (
                        <div className="flex items-start gap-2">
                          <span className="text-brand-muted">📝</span>
                          <span className="text-white/80">{order.note}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <span className="text-brand-muted">💰</span>
                        <span className="text-brand-amber font-bold">{formatCOP(order.total)}</span>
                        <span className="text-brand-muted text-xs">({order.payment_method})</span>
                      </div>
                    </div>

                    {canAdvance && (
                      <>
                        <Separator className="bg-white/5" />
                        <Button
                          onClick={() => advanceStatus(order.id)}
                          size="sm"
                          className="w-full bg-brand-dark-surface hover:bg-brand-red/20 text-white text-xs font-semibold cursor-pointer"
                        >
                          Avanzar a: {statusConfig[statusFlow[statusFlow.indexOf(order.status) + 1]].icon}{' '}
                          {statusConfig[statusFlow[statusFlow.indexOf(order.status) + 1]].label}
                        </Button>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Productos</h2>
              <Button className="bg-brand-red hover:bg-brand-red/90 text-white font-semibold cursor-pointer">
                + Agregar Producto
              </Button>
            </div>

            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar producto..."
              className="bg-brand-dark-surface border-white/10 text-white placeholder:text-brand-muted/50 max-w-sm"
            />

            <div className="bg-brand-dark-card rounded-2xl border border-white/5 overflow-hidden">
              <div className="grid grid-cols-12 gap-4 p-4 text-xs font-semibold text-brand-muted uppercase tracking-wider border-b border-white/5">
                <div className="col-span-5">Producto</div>
                <div className="col-span-2">Categoría</div>
                <div className="col-span-2">Precio</div>
                <div className="col-span-1">Estado</div>
                <div className="col-span-2 text-right">Acciones</div>
              </div>

              {filteredProducts.map((product) => {
                const cat = categories.find((c) => c.id === product.category_id);
                return (
                  <div
                    key={product.id}
                    className="grid grid-cols-12 gap-4 p-4 items-center border-b border-white/5 last:border-b-0 hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="col-span-5">
                      <h4 className="font-medium text-white text-sm">{product.name}</h4>
                      <p className="text-xs text-brand-muted line-clamp-1">{product.description}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-xs text-brand-muted">
                        {cat?.icon} {cat?.name}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-sm font-semibold text-brand-amber">
                        {formatCOP(product.price)}
                      </span>
                    </div>
                    <div className="col-span-1">
                      <span
                        className={`w-2.5 h-2.5 rounded-full inline-block ${
                          product.active ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      />
                    </div>
                    <div className="col-span-2 flex justify-end gap-2">
                      <button className="text-xs text-brand-muted hover:text-white transition-colors cursor-pointer px-2 py-1 rounded-lg hover:bg-white/5">
                        Editar
                      </button>
                      <button className="text-xs text-brand-muted hover:text-brand-red transition-colors cursor-pointer px-2 py-1 rounded-lg hover:bg-brand-red/10">
                        Eliminar
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Categorías</h2>
              <Button className="bg-brand-red hover:bg-brand-red/90 text-white font-semibold cursor-pointer">
                + Agregar Categoría
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {categories
                .filter((c) => c.id !== 'all')
                .map((cat) => {
                  const count = products.filter((p) => p.category_id === cat.id).length;
                  return (
                    <div
                      key={cat.id}
                      className="bg-brand-dark-card rounded-2xl p-5 border border-white/5 hover:border-brand-orange/20 transition-all group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl group-hover:scale-110 transition-transform">
                            {cat.icon}
                          </span>
                          <div>
                            <h3 className="font-bold text-white">{cat.name}</h3>
                            <p className="text-xs text-brand-muted">{count} productos</p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <button className="p-2 rounded-lg text-brand-muted hover:text-white hover:bg-white/5 transition-colors cursor-pointer">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Add-ons section */}
            <Separator className="bg-white/5 my-4" />
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Adiciones</h2>
              <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold cursor-pointer">
                + Agregar Adición
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {addOns.map((addon) => (
                <div
                  key={addon.id}
                  className="bg-brand-dark-card rounded-xl p-4 border border-white/5 flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-medium text-white text-sm">{addon.name}</h4>
                    <span className="text-xs text-brand-amber font-semibold">
                      {formatCOP(addon.price)}
                    </span>
                  </div>
                  <button className="p-2 rounded-lg text-brand-muted hover:text-white hover:bg-white/5 transition-colors cursor-pointer">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
