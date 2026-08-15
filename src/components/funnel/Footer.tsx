export function Footer() {
  return (
    <footer className="border-t border-border px-4 py-10 text-center text-xs text-muted-foreground">
      <p className="mx-auto max-w-2xl">
        Este material es educativo y no reemplaza el consejo de un profesional de la salud. Los
        resultados varían según cada persona.
      </p>
      <p className="mt-3">© {new Date().getFullYear()} Pack Definitivo Pérdida de Peso · Argentina</p>
    </footer>
  );
}
