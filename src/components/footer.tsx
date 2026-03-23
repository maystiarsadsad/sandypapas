export default function Footer() {
  return (
    <footer className="bg-brand-dark-light border-t border-white/5 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍟</span>
            <span className="font-bold text-gradient text-lg">Sandy Papas</span>
          </div>
          <p className="text-brand-muted text-sm text-center">
            La mejor comida rápida de la ciudad 🔥 Papas, hamburguesas y más
          </p>
          <p className="text-brand-muted text-xs">
            © {new Date().getFullYear()} Sandy Papas
          </p>
        </div>
      </div>
    </footer>
  );
}
