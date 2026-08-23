import { useRef, type ReactNode } from "react";

/** Lightweight 3D tilt on pointer move — no 3D engine required. */
export function TiltCard({
  children,
  className = "",
  max = 8,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      style={{ perspective: "1200px" }}
      onPointerMove={(e) => {
        const el = ref.current?.firstElementChild as HTMLElement | null;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `rotateY(${px * max * 2}deg) rotateX(${-py * max * 2}deg) translateZ(14px)`;
      }}
      onPointerLeave={() => {
        const el = ref.current?.firstElementChild as HTMLElement | null;
        if (el) el.style.transform = "";
      }}
      className={className}
    >
      {children}
    </div>
  );
}
