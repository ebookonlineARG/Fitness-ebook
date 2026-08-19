import type { ReactNode } from "react";

/** Wrapper that labels a funnel block so scroll/visibility tracking can identify it. */
export function TrackedSection({ id, children }: { id: string; children: ReactNode }) {
  return <div data-section={id}>{children}</div>;
}
