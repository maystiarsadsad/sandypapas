Actúa como un desarrollador senior fullstack experto en React, Next.js, TailwindCSS, shadcn/ui y Supabase.

Quiero que construyas una aplicación web completa, funcional y lista para producción llamada **“Sandy Papas”**, un sistema de pedidos para un local de comida rápida especializado en papas preparadas, salchipapas, hamburguesas y combos.

## 🧠 CONTEXTO DEL NEGOCIO

* Menú fijo con posibilidad de agregar productos desde un panel admin
* Venta en local y domicilios cercanos
* Clientes NO requieren login
* Empleados SÍ requieren login con roles

---

## 👥 ROLES DEL SISTEMA

Implementa autenticación con Supabase:

* admin: acceso total
* empleado: ver y gestionar pedidos
* repartidor: ver pedidos asignados

---

## ⚙️ STACK TECNOLÓGICO

* Next.js (App Router)
* React
* TailwindCSS
* shadcn/ui
* Supabase (Auth + Database + Storage)

---

## 🎨 DISEÑO (IMPORTANTE)

Estilo: callejero, moderno, tipo app de comida rápida

Colores:

* #F21905 (primary)
* #F28907
* #F2B807
* #F2CB05
* #F2BDD6
* fondo oscuro (#0f0f0f)

UI:

* Cards modernas
* Botones llamativos
* Animaciones suaves
* Diseño completamente responsive (mobile-first)

---

## 📱 FUNCIONALIDADES CLIENTE

1. Ver menú

2. Filtrar por categorías:

   * Papas especiales
   * Picadas
   * Hamburguesas
   * Salchipapas
   * Bebidas
   * Adiciones

3. Ver detalle de producto (modal o página):

   * seleccionar cantidad
   * seleccionar salsas
   * agregar adiciones (checkbox con precio)

4. Carrito:

   * agregar/eliminar productos
   * ver total dinámico

5. Checkout:

   * nombre
   * dirección
   * notas del pedido
   * método de pago

6. Crear pedido en base de datos

7. Opcional:

   * favoritos
   * volver a pedir

---

## 🧩 FUNCIONALIDADES ADMIN

* CRUD de productos
* CRUD de categorías
* CRUD de adiciones
* Ver pedidos en tiempo real
* Cambiar estado del pedido:
  (pendiente, preparando, en camino, entregado)

---

## 🗄️ BASE DE DATOS (SUPABASE)

Tablas:

products:

* id
* name
* description
* price
* category_id
* image_url
* active

categories:

* id
* name

add_ons:

* id
* name
* price

product_add_ons:

* id
* product_id
* add_on_id

orders:

* id
* total
* status
* customer_name
* address
* note
* created_at

order_items:

* id
* order_id
* product_id
* quantity
* price

order_item_add_ons:

* id
* order_item_id
* add_on_id

users:

* id
* email
* role

---

## 🧱 ESTRUCTURA DEL PROYECTO

Genera esta estructura:

src/

* app/

  * page.tsx (menú)
  * product/[id]
  * cart/
  * checkout/
  * admin/
  * login/

* components/

  * product-card
  * category-tabs
  * cart-sheet
  * add-ons-selector

* lib/

  * supabase client
  * auth helpers

* types/

---

## 🎨 ESTILOS

Configura Tailwind con los colores definidos.

Define clases reutilizables:

* product-card
* btn-primary
* category-tab
* modal-content
* cart-item

Usa shadcn/ui:

* Card
* Button
* Dialog
* Sheet
* Tabs
* Checkbox
* Select

---

## 🧠 LÓGICA CLAVE

El carrito debe soportar:

* productos con adiciones
* selección de salsas
* cálculo dinámico de precio

Ejemplo estructura:

{
productId,
name,
quantity,
basePrice,
addOns: [],
sauces: []
}

---

## 🚀 ENTREGABLE

Genera:

1. Código completo del proyecto
2. Componentes reutilizables
3. Configuración de Supabase
4. Esquema SQL
5. UI funcional
6. Flujo completo de compra
7. Panel admin básico

---

## ⚠️ IMPORTANTE

* Código limpio y modular
* Buenas prácticas
* Tipado con TypeScript
* Responsive
* Listo para escalar

---

Empieza generando:

1. Configuración del proyecto
2. Tailwind + shadcn setup
3. Página principal (menú) funcional