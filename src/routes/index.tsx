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
  { id: "memories", label: "MEMORIES" },
  { id: "sk", label: "SK" },
  { id: "wish", label: "WISH" },
  { id: "surprise", label: "SURPRISE" },
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
    <main className="relative min-h-screen bg-background text-foreground">
      <Atmosphere />
      <Gate entered={entered} onEnter={() => setEntered(true)} />

      <div
        className={`relative z-10 transition-all duration-[1400ms] ${
          entered ? "opacity-100 blur-0" : "pointer-events-none h-screen overflow-hidden opacity-0 blur-xl"
        }`}
      >
        <FloatingNav active={active} />
        <MusicButton />
        <Portrait />
        <Message />
        <Timeline />
        <Things />
        <Cake />
        <Secret />
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
      className={`fixed inset-0 z-30 flex flex-col items-center justify-center px-6 text-center transition-all duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        entered ? "pointer-events-none scale-110 opacity-0 blur-2xl" : "opacity-100"
      }`}
      style={{ background: "oklch(0.08 0 0)" }}
    >
      <div
        className="pointer-events-none absolute h-[30rem] w-[30rem] rounded-full blur-[130px]"
        style={{ background: "color-mix(in oklab, var(--wine) 55%, transparent)" }}
      />
      <div className="relative">
        <p className="label-xs mb-8 text-ivory/40">A private digital memory</p>
        <h1 className="font-display text-6xl leading-none tracking-tight text-ivory sm:text-8xl md:text-9xl">
          {config.heroTitle}
        </h1>
        <p className="label-xs mx-auto mt-8 max-w-md text-wine/80">
          {config.birthdayDate}
        </p>
        <div className="mx-auto mt-10 max-w-md space-y-1 text-sm text-ivory/55 sm:text-base">
          {config.heroLines.map((l) => (
            <p key={l} className="font-display italic">
              {l}
            </p>
          ))}
        </div>
        <button
          onClick={onEnter}
          className="label-xs group mt-14 inline-flex items-center gap-3 border border-ivory/20 px-8 py-4 text-ivory/70 transition-all duration-500 hover:border-wine hover:bg-wine/20 hover:text-ivory"
        >
          {config.enterLabel}
          <span className="h-px w-6 bg-wine transition-all duration-500 group-hover:w-10" />
        </button>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- NAV */
function FloatingNav({ active }: { active: string }) {
  return (
    <nav className="fixed left-1/2 top-6 z-40 -translate-x-1/2">
      <ul className="glass-panel flex items-center gap-1 rounded-full px-2 py-2">
        {SECTIONS.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={`label-xs block rounded-full px-3 py-2 transition-colors duration-500 sm:px-4 ${
                active === s.id ? "bg-wine/30 text-ivory" : "text-ivory/45 hover:text-ivory/80"
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
            void el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
          }
        }}
        className={`glass-panel fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full text-ivory/70 transition-all duration-500 hover:text-ivory ${
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
    <section id="sk" className="mx-auto max-w-6xl px-6 py-32 md:py-48">
      <div className="grid items-center gap-16 md:grid-cols-2">
        <Reveal>
          <TiltCard max={7}>
            <div className="tilt-3d animate-float-slow relative mx-auto max-w-sm">
              <div className="glass-panel wine-glow overflow-hidden rounded-sm p-3">
                <div className="overflow-hidden rounded-sm border border-wine/50">
                  <img
                    src={config.portrait}
                    alt={`Portrait of ${config.name}`}
                    className="aspect-[3/4] w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="absolute -inset-x-6 -bottom-8 h-24 scale-y-[-1] overflow-hidden opacity-15 blur-sm">
                <img src={config.portrait} alt="" aria-hidden className="w-full object-cover" />
              </div>
            </div>
          </TiltCard>
        </Reveal>
        <Reveal>
          <p className="label-xs text-wine">The centrepiece</p>
          <h2 className="mt-6 font-display text-4xl leading-tight text-ivory sm:text-5xl">
            {config.portraitCaption}
          </h2>
          <p className="mt-6 font-display text-lg italic text-ivory/50">
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
    <section className="mx-auto max-w-3xl px-6 py-24 md:py-40">
      <Reveal>
        <p className="label-xs text-wine">01 — Letter</p>
        <h2 className="mt-6 font-display text-4xl text-ivory sm:text-5xl">{config.messageTitle}</h2>
        <div className="glass-panel mt-12 rounded-sm p-8 sm:p-12">
          <Typewriter text={config.message} />
        </div>
      </Reveal>
    </section>
  );
}

/* -------------------------------------------------------------- TIMELINE */
function Timeline() {
  return (
    <section id="memories" className="mx-auto max-w-6xl px-6 py-24 md:py-40">
      <Reveal>
        <p className="label-xs text-wine">02 — Timeline</p>
        <h2 className="mt-6 max-w-xl font-display text-4xl leading-tight text-ivory sm:text-5xl">
          {config.timelineTitle}
        </h2>
      </Reveal>
      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {config.memories.map((m, i) => (
          <Reveal key={m.title} className={i % 2 ? "md:mt-10" : ""}>
            <TiltCard max={6}>
              <article className="tilt-3d glass-panel group h-full rounded-sm p-4 hover:wine-glow">
                <div className="overflow-hidden rounded-sm">
                  <img
                    src={m.photo}
                    alt={m.title}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover opacity-80 transition-all duration-[1200ms] group-hover:scale-105 group-hover:opacity-100"
                  />
                </div>
                <div className="px-2 pb-2 pt-6">
                  <p className="label-xs text-ivory/35">{m.date}</p>
                  <h3 className="label-xs mt-3 text-wine">{m.title}</h3>
                  <p className="mt-4 font-display text-lg leading-snug text-ivory/75">{m.text}</p>
                </div>
              </article>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- THINGS */
function Things() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24 md:py-40">
      <Reveal>
        <p className="label-xs text-wine">03 — You</p>
        <h2 className="mt-6 font-display text-4xl text-ivory sm:text-5xl">{config.thingsTitle}</h2>
      </Reveal>
      <div className="mt-16 flex flex-wrap justify-center gap-4">
        {config.things.map((t, i) => (
          <Reveal key={t.label}>
            <div
              className="glass-panel group max-w-xs cursor-default rounded-full px-6 py-4 transition-all duration-700 hover:scale-[1.04] hover:rounded-2xl hover:wine-glow"
              style={{ animation: `float-slow ${8 + (i % 4)}s ease-in-out ${i * 0.4}s infinite` }}
            >
              <span className="font-display text-lg text-ivory/85">{t.label}</span>
              <span className="grid grid-rows-[0fr] transition-all duration-700 group-hover:grid-rows-[1fr]">
                <span className="overflow-hidden">
                  <span className="block pt-2 text-sm text-ivory/50">{t.note}</span>
                </span>
              </span>
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
    <section id="wish" className="relative mx-auto max-w-4xl px-6 py-24 text-center md:py-40">
      <Reveal>
        <p className="label-xs text-wine">04 — The wish</p>
        <h2 className="mt-6 font-display text-4xl text-ivory sm:text-6xl">{config.wishTitle}</h2>
      </Reveal>

      <div
        className={`relative mx-auto mt-20 h-64 w-64 transition-all duration-[1600ms] ${
          wished ? "scale-110" : ""
        }`}
        style={{ perspective: "900px" }}
      >
        {/* candle */}
        <div className="absolute left-1/2 top-6 z-10 -translate-x-1/2">
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
          <div className="mx-auto mt-1 h-16 w-1.5 rounded-full bg-ivory/80" />
        </div>
        {/* tiers */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2" style={{ transformStyle: "preserve-3d" }}>
          <div className="mx-auto h-16 w-32 rounded-[6px] bg-[oklch(0.18_0.01_350)] shadow-[inset_0_10px_20px_-10px_oklch(1_0_0/25%)] ring-1 ring-ivory/10">
            <div className="mx-auto h-2 w-full rounded-t-[6px] bg-ivory/80" />
            <div className="mt-6 h-1 w-full bg-wine/70" />
          </div>
          <div className="mx-auto -mt-1 h-20 w-48 rounded-[6px] bg-[oklch(0.15_0.01_350)] shadow-[inset_0_12px_24px_-12px_oklch(1_0_0/20%)] ring-1 ring-ivory/10">
            <div className="mx-auto h-2.5 w-full rounded-t-[6px] bg-ivory/70" />
            <div className="mt-8 h-1 w-full bg-wine/60" />
          </div>
          <div className="mx-auto mt-2 h-3 w-56 rounded-full bg-ivory/5 blur-[6px]" />
        </div>
        {wished &&
          Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              className="absolute bottom-24 block h-1 w-1 rounded-full bg-wine"
              style={{
                left: `${20 + i * 5}%`,
                animation: `drift ${5 + (i % 4)}s linear ${i * 0.25}s infinite`,
              }}
            />
          ))}
      </div>

      <button
        onClick={() => setWished(true)}
        className="label-xs mt-16 inline-flex items-center gap-3 border border-ivory/20 px-8 py-4 text-ivory/70 transition-all duration-500 hover:border-wine hover:bg-wine/20 hover:text-ivory"
      >
        <Sparkles className="h-3.5 w-3.5" />
        {config.wishButton}
      </button>

      <p
        className={`mx-auto mt-12 max-w-lg font-display text-2xl italic text-ivory/80 transition-all duration-[1600ms] ${
          wished ? "translate-y-0 opacity-100 blur-0" : "translate-y-4 opacity-0 blur-sm"
        }`}
      >
        {config.wishReveal}
      </p>
    </section>
  );
}

/* ---------------------------------------------------------------- SECRET */
function Secret() {
  const [open, setOpen] = useState(false);
  return (
    <section id="surprise" className="px-6 py-24 text-center md:py-40">
      <Reveal>
        <button
          onClick={() => setOpen(true)}
          className="font-display text-xl italic text-ivory/45 underline decoration-wine/60 underline-offset-8 transition-colors duration-500 hover:text-ivory"
        >
          {config.secretButton}
        </button>
      </Reveal>

      <div
        className={`fixed inset-0 z-50 flex items-center justify-center px-6 transition-all duration-[1400ms] ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        style={{ background: "oklch(0.07 0 0 / 97%)" }}
        onClick={() => setOpen(false)}
      >
        <div
          className="pointer-events-none absolute h-[34rem] w-[34rem] rounded-full blur-[150px]"
          style={{ background: "color-mix(in oklab, var(--wine) 55%, transparent)" }}
        />
        <div className={`relative transition-all duration-[1800ms] ${open ? "scale-100 blur-0" : "scale-90 blur-md"}`}>
          <div className="mx-auto mb-12 h-10 w-10 animate-pulse-heart">
            <div className="relative h-full w-full rotate-45 border border-wine bg-wine/25 before:absolute before:-left-1/2 before:top-0 before:h-full before:w-full before:rounded-full before:border before:border-wine before:bg-wine/25 before:content-[''] after:absolute after:-top-1/2 after:left-0 after:h-full after:w-full after:rounded-full after:border after:border-wine after:bg-wine/25 after:content-['']" />
          </div>
          {config.secretLines.map((l) => (
            <p key={l} className="font-display text-3xl leading-snug text-ivory sm:text-5xl">
              {l}
            </p>
          ))}
          <p className="label-xs mt-12 text-wine">{config.secretSign}</p>
          <p className="label-xs mt-16 text-ivory/25">Tap anywhere to close</p>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- FINAL */
function Final({ onReplay }: { onReplay: () => void }) {
  return (
    <footer className="relative px-6 pb-28 pt-24 text-center md:pt-40">
      <Reveal>
        <Heart className="mx-auto mb-10 h-4 w-4 text-wine" />
        <h2 className="font-display text-5xl leading-none text-ivory sm:text-7xl">
          {config.finalTitle}
        </h2>
        <div className="mx-auto mt-12 space-y-1 font-display text-lg italic text-ivory/55">
          {config.finalLines.map((l) => (
            <p key={l}>{l}</p>
          ))}
        </div>
        <p className="label-xs mt-14 text-ivory/40">{config.finalSign}</p>
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setTimeout(onReplay, 600);
          }}
          className="label-xs mt-16 inline-flex items-center gap-3 border border-ivory/20 px-8 py-4 text-ivory/70 transition-all duration-500 hover:border-wine hover:bg-wine/20 hover:text-ivory"
        >
          {config.replayLabel}
        </button>
        <p className="label-xs mt-16 text-ivory/20">{config.birthdayDate}</p>
      </Reveal>
    </footer>
  );
}
