import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sandy Papas | Comida Rápida 🍟",
  description:
    "Las mejores papas preparadas, salchipapas, hamburguesas y combos de la ciudad. Pide online y recibe en tu puerta.",
  keywords: ["papas fritas", "comida rápida", "hamburguesas", "salchipapas", "domicilios"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-brand-dark">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
