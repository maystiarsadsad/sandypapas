import { Category, Product, AddOn } from '@/types';

// ── Categories ──────────────────────────────────────────────

export const categories: Category[] = [
  { id: 'all', name: 'Todos', icon: '🔥' },
  { id: 'papas-especiales', name: 'Papas Especiales', icon: '🍟' },
  { id: 'picadas', name: 'Picadas', icon: '🥘' },
  { id: 'hamburguesas', name: 'Hamburguesas', icon: '🍔' },
  { id: 'salchipapas', name: 'Salchipapas', icon: '🌭' },
  { id: 'bebidas', name: 'Bebidas', icon: '🥤' },
  { id: 'adiciones', name: 'Adiciones', icon: '➕' },
];

// ── Products ────────────────────────────────────────────────

export const products: Product[] = [
  // Papas Especiales
  {
    id: 'p1',
    name: 'Sandy Papas Clásicas',
    description: 'Papas fritas doradas con queso gratinado, tocineta crocante y salsa especial de la casa.',
    price: 18000,
    category_id: 'papas-especiales',
    image_url: '/images/papas-clasicas.jpg',
    active: true,
  },
  {
    id: 'p2',
    name: 'Papas Loaded BBQ',
    description: 'Papas fritas cubiertas con carne desmechada, cheddar fundido, salsa BBQ y cebolla crispy.',
    price: 22000,
    category_id: 'papas-especiales',
    image_url: '/images/papas-bbq.jpg',
    active: true,
  },
  {
    id: 'p3',
    name: 'Papas Mexicanas',
    description: 'Papas con chili con carne, jalapeños, guacamole, crema agria y queso nacho.',
    price: 24000,
    category_id: 'papas-especiales',
    image_url: '/images/papas-mexicanas.jpg',
    active: true,
  },
  {
    id: 'p4',
    name: 'Papas Hawaianas',
    description: 'Papas fritas con pollo desmenuzado, piña caramelizada, queso mozzarella y salsa teriyaki.',
    price: 21000,
    category_id: 'papas-especiales',
    image_url: '/images/papas-hawaianas.jpg',
    active: true,
  },

  // Picadas
  {
    id: 'p5',
    name: 'Picada Sandy Mix',
    description: 'Mix de papas, yuca, plátano maduro, chorizo, chicharrón, pollo y carne. Para 2-3 personas.',
    price: 38000,
    category_id: 'picadas',
    image_url: '/images/picada-mix.jpg',
    active: true,
  },
  {
    id: 'p6',
    name: 'Picada Familiar',
    description: 'Generosa porción de papas, yuca, maduro, costillas BBQ, chicharrón y chorizo. Para 4-5 personas.',
    price: 55000,
    category_id: 'picadas',
    image_url: '/images/picada-familiar.jpg',
    active: true,
  },

  // Hamburguesas
  {
    id: 'p7',
    name: 'Sandy Burger Clásica',
    description: 'Carne 150g, queso americano, lechuga, tomate, cebolla caramelizada y salsa especial. Con papas.',
    price: 20000,
    category_id: 'hamburguesas',
    image_url: '/images/burger-clasica.jpg',
    active: true,
  },
  {
    id: 'p8',
    name: 'Doble Smash Burger',
    description: 'Doble carne smash 200g, doble queso cheddar, pickle, cebolla crispy y salsa Sandy.',
    price: 28000,
    category_id: 'hamburguesas',
    image_url: '/images/burger-doble.jpg',
    active: true,
  },
  {
    id: 'p9',
    name: 'Burger Pollo Crispy',
    description: 'Pechuga apanada crocante, coleslaw, queso suizo y salsa ranch. Con papas.',
    price: 22000,
    category_id: 'hamburguesas',
    image_url: '/images/burger-pollo.jpg',
    active: true,
  },

  // Salchipapas
  {
    id: 'p10',
    name: 'Salchipapa Sencilla',
    description: 'Papas fritas con salchicha americana y salsas a elección.',
    price: 12000,
    category_id: 'salchipapas',
    image_url: '/images/salchipapa-sencilla.jpg',
    active: true,
  },
  {
    id: 'p11',
    name: 'Salchipapa Super',
    description: 'Papas fritas con doble salchicha, queso gratinado, maíz tierno y salsas.',
    price: 16000,
    category_id: 'salchipapas',
    image_url: '/images/salchipapa-super.jpg',
    active: true,
  },
  {
    id: 'p12',
    name: 'Salchipapa Ranchera',
    description: 'Papas con chorizo ranchero, queso cheddar fundido, cebolla y salsa BBQ.',
    price: 18000,
    category_id: 'salchipapas',
    image_url: '/images/salchipapa-ranchera.jpg',
    active: true,
  },

  // Bebidas
  {
    id: 'p13',
    name: 'Coca-Cola',
    description: 'Coca-Cola personal bien fría. 400ml.',
    price: 4000,
    category_id: 'bebidas',
    image_url: '/images/coca-cola.jpg',
    active: true,
  },
  {
    id: 'p14',
    name: 'Limonada Natural',
    description: 'Limonada recién preparada con hierbabuena. 500ml.',
    price: 5000,
    category_id: 'bebidas',
    image_url: '/images/limonada.jpg',
    active: true,
  },
  {
    id: 'p15',
    name: 'Malteada de Vainilla',
    description: 'Malteada cremosa de vainilla con helado artesanal. 400ml.',
    price: 9000,
    category_id: 'bebidas',
    image_url: '/images/malteada.jpg',
    active: true,
  },

  // Adiciones
  {
    id: 'p16',
    name: 'Porción extra de Papas',
    description: 'Porción adicional de papas fritas doradas.',
    price: 5000,
    category_id: 'adiciones',
    image_url: '/images/extra-papas.jpg',
    active: true,
  },
  {
    id: 'p17',
    name: 'Queso Gratinado Extra',
    description: 'Porción extra de queso cheddar gratinado.',
    price: 4000,
    category_id: 'adiciones',
    image_url: '/images/extra-queso.jpg',
    active: true,
  },
];

// ── Add-ons (toppings/extras) ───────────────────────────────

export const addOns: AddOn[] = [
  { id: 'a1', name: 'Queso Cheddar Extra', price: 3000 },
  { id: 'a2', name: 'Tocineta', price: 4000 },
  { id: 'a3', name: 'Huevo Frito', price: 2500 },
  { id: 'a4', name: 'Guacamole', price: 3500 },
  { id: 'a5', name: 'Carne Extra', price: 6000 },
  { id: 'a6', name: 'Chorizo', price: 4000 },
  { id: 'a7', name: 'Jalapeños', price: 2000 },
  { id: 'a8', name: 'Cebolla Crispy', price: 2000 },
];

// ── Sauces ──────────────────────────────────────────────────

export const sauces: string[] = [
  'Ketchup',
  'Mayonesa',
  'Mostaza',
  'BBQ',
  'Salsa Rosada',
  'Salsa de Ajo',
  'Salsa Picante',
  'Salsa Tártara',
  'Guacamole',
  'Honey Mustard',
];

// ── Helper ──────────────────────────────────────────────────

export function formatCOP(amount: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
