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
              <div className="absolute -inset-x-4 -bottom-6 h-20 scale-y-[-1] overflow-hidden opacity-15 blur-sm sm:-inset-x-6 sm:-bottom-8 sm:h-24">
                <img src={config.portrait} alt="" aria-hidden className="w-full object-cover" />
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
  return (
    <section id="memories" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 md:py-36">
      <Reveal className="text-center md:text-left">
        <p className="label-xs text-wine">02 — Timeline</p>
        <h2 className="mt-4 font-display text-3xl leading-tight text-ivory sm:mt-6 sm:text-4xl md:text-5xl">
          {config.timelineTitle}
        </h2>
      </Reveal>
      <div className="mt-10 grid gap-6 sm:mt-16 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
        {config.memories.map((m, i) => (
          <Reveal key={m.title} className={i % 3 === 1 ? "lg:mt-8" : ""}>
            <TiltCard max={6}>
              <article className="tilt-3d glass-panel group h-full rounded-sm p-3.5 transition-all duration-500 hover:wine-glow sm:p-4">
                <div className="overflow-hidden rounded-sm">
                  <img
                    src={m.photo}
                    alt={m.title}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover opacity-90 transition-all duration-[1200ms] group-hover:scale-105 group-hover:opacity-100 sm:opacity-80"
                  />
                </div>
                <div className="px-1.5 pb-2 pt-4 sm:px-2 sm:pt-6">
                  <p className="label-xs text-ivory/35">{m.date}</p>
                  <h3 className="label-xs mt-2 text-wine sm:mt-3">{m.title}</h3>
                  <p className="mt-3 font-display text-base leading-snug text-ivory/75 sm:mt-4 sm:text-lg">
                    {m.text}
                  </p>
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
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24 md:py-36">
      <Reveal className="text-center">
        <p className="label-xs text-wine">03 — You</p>
        <h2 className="mt-4 font-display text-3xl text-ivory sm:mt-6 sm:text-4xl md:text-5xl">
          {config.thingsTitle}
        </h2>
      </Reveal>
      <div className="mt-10 flex flex-wrap justify-center gap-3 sm:mt-16 sm:gap-4">
        {config.things.map((t, i) => {
          const isExpanded = activeIdx === i;
          return (
            <Reveal key={t.label}>
              <button
                type="button"
                onClick={() => setActiveIdx((prev) => (prev === i ? null : i))}
                className={`glass-panel group block w-full max-w-xs cursor-pointer rounded-2xl px-5 py-3.5 text-left transition-all duration-700 hover:scale-[1.03] hover:wine-glow sm:w-auto sm:max-w-sm sm:rounded-full sm:px-6 sm:py-4 ${
                  isExpanded ? "scale-[1.03] rounded-2xl wine-glow bg-wine/20" : ""
                }`}
                style={{ animation: `float-slow ${8 + (i % 4)}s ease-in-out ${i * 0.4}s infinite` }}
              >
                <span className="font-display text-base text-ivory/90 sm:text-lg">{t.label}</span>
                <span
                  className={`grid transition-all duration-700 ${
                    isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr] group-hover:grid-rows-[1fr]"
                  }`}
                >
                  <span className="overflow-hidden">
                    <span className="block pt-2 text-xs text-ivory/60 sm:text-sm">{t.note}</span>
                  </span>
                </span>
              </button>
            </Reveal>
          );
        })}
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
        <p className="label-xs text-wine">04 — The wish</p>
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

/* ---------------------------------------------------------------- SECRET */
function Secret() {
  const [open, setOpen] = useState(false);
  return (
    <section id="surprise" className="px-4 py-16 text-center sm:px-6 sm:py-24 md:py-36">
      <Reveal>
        <button
          onClick={() => setOpen(true)}
          className="font-display text-lg italic text-ivory/45 underline decoration-wine/60 underline-offset-8 transition-colors duration-500 hover:text-ivory sm:text-xl"
        >
          {config.secretButton}
        </button>
      </Reveal>

      <div
        className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-auto px-4 py-8 transition-all duration-[1400ms] sm:px-6 sm:py-12 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        style={{ background: "oklch(0.07 0 0 / 97%)" }}
        onClick={() => setOpen(false)}
      >
        <div
          className="pointer-events-none absolute h-[24rem] w-[24rem] rounded-full blur-[110px] sm:h-[34rem] sm:w-[34rem] sm:blur-[150px]"
          style={{ background: "color-mix(in oklab, var(--wine) 55%, transparent)" }}
        />
        <div
          className={`relative my-auto max-w-xl transition-all duration-[1800ms] ${open ? "scale-100 blur-0" : "scale-90 blur-md"}`}
        >
          <div className="mx-auto mb-8 h-8 w-8 animate-pulse-heart sm:mb-12 sm:h-10 sm:w-10">
            <div className="relative h-full w-full rotate-45 border border-wine bg-wine/25 before:absolute before:-left-1/2 before:top-0 before:h-full before:w-full before:rounded-full before:border before:border-wine before:bg-wine/25 before:content-[''] after:absolute after:-top-1/2 after:left-0 after:h-full after:w-full after:rounded-full after:border after:border-wine after:bg-wine/25 after:content-['']" />
          </div>
          {config.secretLines.map((l) => (
            <p
              key={l}
              className="font-display text-2xl leading-snug text-ivory sm:text-4xl md:text-5xl"
            >
              {l}
            </p>
          ))}
          <p className="label-xs mt-8 text-wine sm:mt-12">{config.secretSign}</p>
          <p className="label-xs mt-10 text-ivory/25 sm:mt-16">Tap anywhere to close</p>
        </div>
      </div>
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
