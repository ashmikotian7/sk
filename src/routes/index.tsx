import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Heart, Music, Pause, Sparkles } from "lucide-react";
import { config } from "@/config/birthday";
import { Atmosphere } from "@/components/Atmosphere";
import { TiltCard } from "@/components/TiltCard";
import { Typewriter } from "@/components/Typewriter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `For ${config.name} — A Cinematic Birthday Experience` },
      {
        name: "description",
        content: `A private, cinematic digital birthday world made for ${config.name} — memories, wishes and one secret surprise.`,
      },
      { property: "og:title", content: `For ${config.name}.` },
      {
        property: "og:description",
        content: "Some people become memories. Some become a part of your story.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Experience,
});

const SECTIONS = [
  { id: "home", label: "HOME" },
  { id: "sk", label: "SK" },
  { id: "memories", label: "MEMORIES" },
  { id: "wish", label: "WISH" },
];

function Experience() {
  const [entered, setEntered] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    if (!entered) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [entered]);

  return (
    <main className="relative min-h-screen max-w-full overflow-x-hidden bg-background text-foreground">
      <Atmosphere />
      <Gate entered={entered} onEnter={() => setEntered(true)} />

      <div
        className={`relative z-10 transition-all duration-[1400ms] ${
          entered
            ? "opacity-100 blur-0"
            : "pointer-events-none h-screen overflow-hidden opacity-0 blur-xl"
        }`}
      >
        <FloatingNav active={active} />
        <MusicButton />
        <Portrait />
        <Message />
        <Timeline />
        <Cake />
        <Toast />
        <Final onReplay={() => setEntered(false)} />
      </div>
    </main>
  );
}

/* ------------------------------------------------------------------ HERO */
function Gate({ entered, onEnter }: { entered: boolean; onEnter: () => void }) {
  return (
    <section
      id="home"
      className={`fixed inset-0 z-30 flex flex-col items-center justify-center overflow-y-auto px-4 py-8 text-center transition-all duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-6 sm:py-12 ${
        entered ? "pointer-events-none scale-110 opacity-0 blur-2xl" : "opacity-100"
      }`}
      style={{ background: "oklch(0.08 0 0)" }}
    >
      <div
        className="pointer-events-none absolute h-[20rem] w-[20rem] rounded-full blur-[100px] sm:h-[30rem] sm:w-[30rem] sm:blur-[130px]"
        style={{ background: "color-mix(in oklab, var(--wine) 55%, transparent)" }}
      />
      <div className="relative my-auto flex max-w-2xl flex-col items-center py-4">
        <p className="label-xs mb-4 text-ivory/40 sm:mb-8">A private digital memory</p>
        <h1 className="font-display text-4xl leading-tight tracking-tight text-ivory sm:text-7xl md:text-8xl lg:text-9xl">
          {config.heroTitle}
        </h1>
        <p className="label-xs mx-auto mt-4 max-w-md text-wine/80 sm:mt-8">{config.birthdayDate}</p>
        <div className="mx-auto mt-6 max-w-md space-y-1 text-xs text-ivory/55 sm:mt-10 sm:text-base">
          {config.heroLines.map((l) => (
            <p key={l} className="font-display italic">
              {l}
            </p>
          ))}
        </div>
        <button
          onClick={onEnter}
          className="label-xs group mt-8 inline-flex items-center gap-3 border border-ivory/20 px-6 py-3.5 text-ivory/70 transition-all duration-500 hover:border-wine hover:bg-wine/20 hover:text-ivory sm:mt-14 sm:px-8 sm:py-4"
        >
          {config.enterLabel}
          <span className="h-px w-4 bg-wine transition-all duration-500 group-hover:w-8 sm:w-6 sm:group-hover:w-10" />
        </button>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- NAV */
function FloatingNav({ active }: { active: string }) {
  return (
    <nav className="fixed left-1/2 top-3 z-40 max-w-[calc(100vw-1.5rem)] -translate-x-1/2 sm:top-6">
      <ul className="glass-panel no-scrollbar flex max-w-full items-center gap-0.5 overflow-x-auto rounded-full p-1 sm:gap-1 sm:p-1.5">
        {SECTIONS.map((s) => (
          <li key={s.id} className="shrink-0">
            <a
              href={`#${s.id}`}
              className={`label-xs block rounded-full px-2.5 py-1.5 text-[0.58rem] tracking-[0.16em] transition-colors duration-500 sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.25em] ${
                active === s.id ? "bg-wine/40 text-ivory" : "text-ivory/45 hover:text-ivory/80"
              }`}
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ----------------------------------------------------------------- MUSIC */
function MusicButton() {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  return (
    <>
      {/* Replace config.musicUrl with your own track (drop a file in /public). */}
      <audio ref={audio} src={config.musicUrl} loop preload="none" />
      <button
        aria-label={playing ? "Pause music" : "Play music"}
        onClick={() => {
          const el = audio.current;
          if (!el) return;
          if (playing) {
            el.pause();
            setPlaying(false);
          } else {
            void el
              .play()
              .then(() => setPlaying(true))
              .catch(() => setPlaying(false));
          }
        }}
        className={`glass-panel fixed bottom-4 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full text-ivory/70 transition-all duration-500 hover:text-ivory sm:bottom-6 sm:right-6 sm:h-12 sm:w-12 ${
          playing ? "wine-glow" : ""
        }`}
      >
        {playing ? <Pause className="h-4 w-4" /> : <Music className="h-4 w-4" />}
      </button>
    </>
  );
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) setSeen(true);
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        seen ? "translate-y-0 opacity-100 blur-0" : "translate-y-10 opacity-0 blur-sm"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------- PORTRAIT */
function Portrait() {
  return (
    <section id="sk" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 md:py-36 lg:py-48">
      <div className="grid items-center gap-10 sm:gap-14 md:grid-cols-2 md:gap-16">
        <Reveal>
          <TiltCard max={7}>
            <div className="tilt-3d animate-float-slow relative mx-auto max-w-[280px] sm:max-w-sm">
              <div className="glass-panel wine-glow overflow-hidden rounded-sm p-2.5 sm:p-3">
                <div className="overflow-hidden rounded-sm border border-wine/50">
                  <img
                    src={config.portrait}
                    alt={`Portrait of ${config.name}`}
                    className="aspect-[3/4] w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="absolute -inset-x-4 -bottom-6 h-20 scale-y-[-1] overflow-hidden opacity-50 blur-sm sm:-inset-x-6 sm:-bottom-8 sm:h-24">
                <img src={config.portrait} alt={`Portrait of ${config.name}`} className="w-full object-cover" />
              </div>
            </div>
          </TiltCard>
        </Reveal>
        <Reveal className="text-center md:text-left">
          <p className="label-xs text-wine">The centrepiece</p>
          <h2 className="mt-4 font-display text-3xl leading-tight text-ivory sm:mt-6 sm:text-4xl md:text-5xl">
            {config.portraitCaption}
          </h2>
          <p className="mt-4 font-display text-base italic text-ivory/50 sm:mt-6 sm:text-lg">
            {config.portraitSubCaption}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- MESSAGE */
function Message() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 md:py-36">
      <Reveal className="text-center md:text-left">
        <p className="label-xs text-wine">01 — Letter</p>
        <h2 className="mt-4 font-display text-3xl text-ivory sm:mt-6 sm:text-4xl md:text-5xl">
          {config.messageTitle}
        </h2>
        <div className="glass-panel mt-8 rounded-sm p-5 text-left sm:mt-12 sm:p-8 md:p-12">
          <Typewriter text={config.message} />
        </div>
      </Reveal>
    </section>
  );
}

/* -------------------------------------------------------------- TIMELINE */
function Timeline() {
  const [hovered, setHovered] = useState<number | null>(null);

  // Stagger rotations for a scattered polaroid feel
  const rotations = [-3, 2, -1.5, 3, -2.5, 1, -2, 2.5, -1, 3, -3, 1.5];

  return (
    <section id="memories" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 md:py-36">
      <Reveal className="text-center">
        <p className="label-xs text-wine">02 — Memories</p>
        <h2 className="mt-4 font-display text-3xl leading-tight text-ivory sm:mt-6 sm:text-4xl md:text-5xl">
          {config.timelineTitle}
        </h2>
        <p className="mt-4 font-display text-base italic text-ivory/40 sm:text-lg">
          Every frame, a feeling.
        </p>
      </Reveal>

      {/* Masonry-style polaroid wall */}
      <div className="mt-12 columns-2 gap-4 sm:mt-16 sm:columns-3 sm:gap-5 lg:columns-4 lg:gap-6">
        {config.memories.map((photo, i) => (
          <Reveal key={i} className="mb-4 break-inside-avoid sm:mb-5">
            <div
              className="group relative cursor-pointer"
              style={{
                transform: hovered === i ? "rotate(0deg) scale(1.05)" : `rotate(${rotations[i % rotations.length]}deg)`,
                transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
                zIndex: hovered === i ? 20 : 1,
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Polaroid frame */}
              <div
                className="relative overflow-hidden rounded-sm shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-shadow duration-500 group-hover:shadow-[0_16px_48px_rgba(var(--wine-rgb,120,20,40),0.4)]"
                style={{ background: "oklch(0.14 0.01 350)" }}
              >
                {/* Top photo area */}
                <div className="overflow-hidden p-2 pb-0 sm:p-3 sm:pb-0">
                  <img
                    src={photo}
                    alt={`Memory ${i + 1}`}
                    loading="lazy"
                    className="w-full object-cover transition-all duration-[1400ms] group-hover:scale-105"
                    style={{ display: "block" }}
                  />
                </div>
                {/* Polaroid bottom strip — just a subtle glow line */}
                <div className="flex items-center justify-center py-3 sm:py-4">
                  <div className="h-px w-8 bg-wine/40 transition-all duration-500 group-hover:w-16 group-hover:bg-wine/80" />
                </div>
                {/* Wine glow overlay on hover */}
                <div className="absolute inset-0 rounded-sm border border-wine/0 transition-all duration-500 group-hover:border-wine/30 group-hover:shadow-[inset_0_0_30px_rgba(120,20,40,0.15)]" />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ CAKE */
function Cake() {
  const [wished, setWished] = useState(false);
  return (
    <section
      id="wish"
      className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-24 md:py-36"
    >
      <Reveal>
        <p className="label-xs text-wine">03 — The wish</p>
        <h2 className="mt-4 font-display text-3xl text-ivory sm:mt-6 sm:text-5xl md:text-6xl">
          {config.wishTitle}
        </h2>
      </Reveal>

      <div
        className={`relative mx-auto mt-12 h-52 w-52 transition-all duration-[1600ms] sm:mt-20 sm:h-64 sm:w-64 ${
          wished ? "scale-105 sm:scale-110" : ""
        }`}
        style={{ perspective: "900px" }}
      >
        {/* candle */}
        <div className="absolute left-1/2 top-4 z-10 -translate-x-1/2 sm:top-6">
          <div
            className={`mx-auto h-5 w-3 origin-bottom rounded-full animate-flicker ${
              wished ? "scale-150" : ""
            }`}
            style={{
              background:
                "radial-gradient(circle at 50% 70%, var(--ivory), color-mix(in oklab, var(--wine) 80%, transparent))",
              boxShadow: wished
                ? "0 0 90px 30px color-mix(in oklab, var(--wine) 70%, transparent)"
                : "0 0 40px 10px color-mix(in oklab, var(--wine) 45%, transparent)",
              transition: "box-shadow 1.2s ease, transform 1.2s ease",
            }}
          />
          <div className="mx-auto mt-1 h-14 w-1.5 rounded-full bg-ivory/80 sm:h-16" />
        </div>
        {/* tiers */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 sm:bottom-10"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="mx-auto h-14 w-28 rounded-[6px] bg-[oklch(0.18_0.01_350)] shadow-[inset_0_10px_20px_-10px_oklch(1_0_0/25%)] ring-1 ring-ivory/10 sm:h-16 sm:w-32">
            <div className="mx-auto h-2 w-full rounded-t-[6px] bg-ivory/80" />
            <div className="mt-5 h-1 w-full bg-wine/70 sm:mt-6" />
          </div>
          <div className="mx-auto -mt-1 h-16 w-40 rounded-[6px] bg-[oklch(0.15_0.01_350)] shadow-[inset_0_12px_24px_-12px_oklch(1_0_0/20%)] ring-1 ring-ivory/10 sm:h-20 sm:w-48">
            <div className="mx-auto h-2.5 w-full rounded-t-[6px] bg-ivory/70" />
            <div className="mt-6 h-1 w-full bg-wine/60 sm:mt-8" />
          </div>
          <div className="mx-auto mt-2 h-3 w-48 rounded-full bg-ivory/5 blur-[6px] sm:w-56" />
        </div>
        {wished &&
          Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              className="absolute bottom-20 block h-1 w-1 rounded-full bg-wine sm:bottom-24"
              style={{
                left: `${20 + i * 5}%`,
                animation: `drift ${5 + (i % 4)}s linear ${i * 0.25}s infinite`,
              }}
            />
          ))}
      </div>

      <button
        onClick={() => setWished(true)}
        className="label-xs mt-12 inline-flex items-center gap-3 border border-ivory/20 px-6 py-3.5 text-ivory/70 transition-all duration-500 hover:border-wine hover:bg-wine/20 hover:text-ivory sm:mt-16 sm:px-8 sm:py-4"
      >
        <Sparkles className="h-3.5 w-3.5" />
        {config.wishButton}
      </button>

      <p
        className={`mx-auto mt-8 max-w-lg font-display text-xl italic text-ivory/80 transition-all duration-[1600ms] sm:mt-12 sm:text-2xl ${
          wished ? "translate-y-0 opacity-100 blur-0" : "translate-y-4 opacity-0 blur-sm"
        }`}
      >
        {config.wishReveal}
      </p>
    </section>
  );
}

/* ------------------------------------------------------------------ TOAST */
function Toast() {
  return (
    <section className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-24 md:py-32">
      <Reveal>
        <div className="glass-panel relative mx-auto max-w-2xl rounded-sm border border-wine/20 p-8 wine-glow sm:p-12 md:p-16">
          <p className="label-xs text-wine">{config.toastTag}</p>
          <h2 className="mt-4 font-display text-3xl text-ivory sm:text-4xl md:text-5xl">
            {config.toastTitle}
          </h2>

          <div className="mx-auto my-8 h-px w-16 bg-wine/40" />

          <div className="space-y-4">
            {config.toastLines.map((line, i) => (
              <p
                key={i}
                className="font-display text-lg italic leading-relaxed text-ivory/80 sm:text-xl md:text-2xl"
              >
                {line}
              </p>
            ))}
          </div>

          <p className="label-xs mt-10 tracking-widest text-wine/90">{config.toastSign}</p>
        </div>
      </Reveal>
    </section>
  );
}

/* ----------------------------------------------------------------- FINAL */
function Final({ onReplay }: { onReplay: () => void }) {
  return (
    <footer className="relative px-4 pb-20 pt-16 text-center sm:px-6 sm:pb-28 sm:pt-24 md:pt-36">
      <Reveal>
        <Heart className="mx-auto mb-6 h-4 w-4 text-wine sm:mb-10" />
        <h2 className="font-display text-3xl leading-tight text-ivory sm:text-5xl md:text-7xl">
          {config.finalTitle}
        </h2>
        <div className="mx-auto mt-8 space-y-1 font-display text-base italic text-ivory/55 sm:mt-12 sm:text-lg">
          {config.finalLines.map((l) => (
            <p key={l}>{l}</p>
          ))}
        </div>
        <p className="label-xs mt-10 text-ivory/40 sm:mt-14">{config.finalSign}</p>
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setTimeout(onReplay, 600);
          }}
          className="label-xs mt-10 inline-flex items-center gap-3 border border-ivory/20 px-6 py-3.5 text-ivory/70 transition-all duration-500 hover:border-wine hover:bg-wine/20 hover:text-ivory sm:mt-16 sm:px-8 sm:py-4"
        >
          {config.replayLabel}
        </button>
        <p className="label-xs mt-12 text-ivory/20 sm:mt-16">{config.birthdayDate}</p>
      </Reveal>
    </footer>
  );
}
