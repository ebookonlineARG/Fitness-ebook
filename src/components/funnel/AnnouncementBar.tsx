import { useEffect, useState } from "react";
import { Flame } from "lucide-react";

function useCountdown() {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    const tick = () => setLeft(Math.max(0, end.getTime() - Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (left === null) return null;
  const total = Math.floor(left / 1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(Math.floor(total / 3600))}:${pad(Math.floor((total % 3600) / 60))}:${pad(total % 60)}`;
}

export function AnnouncementBar() {
  const countdown = useCountdown();

  return (
    <div className="sticky top-0 z-50 w-full border-b border-danger/40 bg-danger/15 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-3 py-2 text-center">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground sm:text-sm">
          <Flame className="size-4" />
          Oferta por tiempo limitado: 81% de descuento hasta hoy
        </span>
        <span className="rounded-md bg-background/70 px-2 py-0.5 font-mono text-xs font-bold text-foreground tabular-nums sm:text-sm">
          {countdown ?? "23:59:59"}
        </span>
      </div>
    </div>
  );
}
