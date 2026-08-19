import { useEffect } from "react";
import { trackScrollDepth, trackSectionView } from "@/lib/tracking";

/** Fires SectionView once per section (via data-section) and ScrollDepth milestones. */
export function useFunnelTracking() {
  useEffect(() => {
    const seenSections = new Set<string>();
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const name = entry.target.getAttribute("data-section");
          if (!entry.isIntersecting || !name || seenSections.has(name)) continue;
          seenSections.add(name);
          trackSectionView(name);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.35 },
    );
    nodes.forEach((node) => observer.observe(node));

    const milestones = [25, 50, 75, 100];
    const reached = new Set<number>();
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const percent = Math.min(100, Math.round((window.scrollY / scrollable) * 100));
      for (const milestone of milestones) {
        if (percent >= milestone && !reached.has(milestone)) {
          reached.add(milestone);
          trackScrollDepth(milestone);
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
}
