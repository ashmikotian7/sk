import { useEffect, useRef, useState } from "react";

export function Typewriter({ text, speed = 18 }: { text: string; speed?: number }) {
  const [shown, setShown] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setStarted(true);
      },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started || shown >= text.length) return;
    const t = setTimeout(() => setShown((s) => Math.min(s + 2, text.length)), speed);
    return () => clearTimeout(t);
  }, [started, shown, text, speed]);

  return (
    <p
      ref={ref}
      className="whitespace-pre-line font-display text-lg leading-relaxed text-ivory/85 sm:text-xl md:text-2xl"
    >
      {text.slice(0, shown)}
      {shown < text.length && (
        <span className="ml-0.5 inline-block h-[1em] w-px translate-y-[0.15em] bg-wine align-middle" />
      )}
    </p>
  );
}
