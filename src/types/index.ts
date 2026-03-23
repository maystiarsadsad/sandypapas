// ── Database models ──────────────────────────────────────────

export interface Category {
  id: string;
  name: string;
  icon: string;         // emoji for display
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;        // COP
  category_id: string;
  image_url: string;
  active: boolean;
}

export interface AddOn {
  id: string;
  name: string;
  price: number;        // COP
}

export interface ProductAddOn {
  id: string;
  product_id: string;
  add_on_id: string;
}

// ── Orders ───────────────────────────────────────────────────

export type OrderStatus = 'pendiente' | 'preparando' | 'en_camino' | 'entregado';

export type PaymentMethod = 'efectivo' | 'nequi' | 'daviplata' | 'tarjeta';

export interface Order {
  id: string;
  total: number;
  status: OrderStatus;
  customer_name: string;
  address: string;
  note: string;
  payment_method: PaymentMethod;
  created_at: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
  add_ons: OrderItemAddOn[];
  sauces: string[];
}

export interface OrderItemAddOn {
  id: string;
  order_item_id: string;
  add_on_id: string;
  add_on_name: string;
  price: number;
}

// ── Cart ────────────────────────────────────────────────────

export interface CartItem {
  id: string;           // unique cart item id
  productId: string;
  name: string;
  quantity: number;
  basePrice: number;
  addOns: { id: string; name: string; price: number }[];
  sauces: string[];
  image_url: string;
}

// ── Auth ────────────────────────────────────────────────────

export type UserRole = 'admin' | 'empleado' | 'repartidor';

export interface AppUser {
  id: string;
  email: string;
  role: UserRole;
}
