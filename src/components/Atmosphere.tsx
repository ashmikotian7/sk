import { useEffect, useRef, useState } from "react";

/** Ambient layer: wine light that follows the cursor, fog, drifting particles. */
export function Atmosphere() {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(18);

  useEffect(() => {
    const updateCount = () => setCount(window.innerWidth < 768 ? 8 : 22);
    updateCount();
    window.addEventListener("resize", updateCount);

    const onMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      el.style.setProperty("--mx", `${e.clientX}px`);
      el.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("resize", updateCount);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div ref={ref} className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-70 transition-opacity duration-1000"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx, 50%) var(--my, 40%), color-mix(in oklab, var(--wine) 30%, transparent), transparent 70%)",
        }}
      />
      <div
        className="absolute -left-40 top-1/4 h-[36rem] w-[36rem] rounded-full blur-[140px]"
        style={{ background: "color-mix(in oklab, var(--wine) 35%, transparent)" }}
      />
      <div
        className="absolute -right-52 bottom-0 h-[40rem] w-[40rem] rounded-full blur-[160px]"
        style={{ background: "color-mix(in oklab, var(--wine-deep) 60%, transparent)" }}
      />
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="absolute block rounded-full bg-ivory"
          style={{
            left: `${(i * 37) % 100}%`,
            top: `${(i * 61) % 100}%`,
            width: `${1 + (i % 3)}px`,
            height: `${1 + (i % 3)}px`,
            opacity: 0.25,
            animation: `drift ${14 + (i % 7) * 3}s linear ${i * 0.8}s infinite`,
          }}
        />
      ))}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 50%, transparent 40%, oklch(0.08 0 0 / 85%) 100%)",
        }}
      />
    </div>
  );
}
