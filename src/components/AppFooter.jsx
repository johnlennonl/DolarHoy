export default function AppFooter() {
  return (
    <footer className="mt-16 mb-6 text-center text-sm opacity-70">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>Datos vía <span className="font-medium">DolarApi</span> — {new Date().getFullYear()}</p>
        <p className="opacity-80">Hecho con ❤️ en Venezuela</p>
      </div>
    </footer>
  );
}
