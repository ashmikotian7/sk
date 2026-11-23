/**
 * ============================================================
 *  EDIT EVERYTHING HERE — this is the only file you need.
 * ============================================================
 */

import portrait from "@/assets/portrait.jpg";
import mem1 from "@/assets/mem1.jpg";
import mem2 from "@/assets/mem2.jpg";
import mem3 from "@/assets/mem3.jpg";
import sk1 from "@/assets/sk1.jpeg";
import sk4 from "@/assets/sk4.jpeg";
import sk5 from "@/assets/sk5.jpeg";
import sk6 from "@/assets/sk6.jpeg";
import sk7 from "@/assets/sk7.jpeg";
import sk8 from "@/assets/sk8.jpeg";
import sk9 from "@/assets/sk9.jpeg";  
import mem4 from "@/assets/mem4.jpg";
import mem5 from "@/assets/mem5.jpg";
import mem6 from "@/assets/mem6.jpg";
import mem7 from "@/assets/mem7.jpg";
import mem8 from "@/assets/mem8.jpg";
import mem9 from "@/assets/mem9.jpg";
import mem10 from "@/assets/mem10.jpg";
import mem11 from "@/assets/mem11.jpg";

export const config = {
  /* ---- BASICS ---- */
  name: "SK",
  birthdayDate: "03 December 2004", // shown in the hero and final

  /* ---- MAIN PORTRAIT (replace the import above to change) ---- */
  portrait: sk1,
  portraitCaption: "The girl behind all the memories.",
  portraitSubCaption: "SK — effortlessly herself.",

  /* ---- HERO ---- */
  heroTitle: "For SK.",
  heroLines: ["Some people become memories.", "Some become a part of your story."],
  enterLabel: "ENTER HER WORLD",

  /* ---- PERSONAL MESSAGE (typewriter reveal) ---- */
  messageTitle: "A little something for you.",
  message: `To SK,

Another year, another collection of moments waiting to become memories.

From random conversations to uncontrollable laughter, from little gossip sessions to the moments that somehow became unforgettable — I'm grateful for every chapter we've shared.

Some friendships don't need a grand beginning. They simply grow quietly, naturally, and beautifully.

Happy Birthday, SK.

I hope this year gives you more reasons to smile, more places to explore, more memories to collect, and countless moments that make you say, 'I'm really glad I lived this.'

Stay exactly as wonderfully you as you are.`,

  /* ---- MEMORY GALLERY (photos only — displayed as a masonry wall) ---- */
  timelineTitle: "Little moments. Big memories.",
  memories: [
    mem1, mem2, mem3, mem4, mem5, mem6,
    mem7, mem8, mem9, mem10, mem11, sk4, sk5, sk6, sk7, sk8, sk9
  ],

  /* ---- REFLECTIONS (Grounded, natural reflections on real friendship) ---- */
  reflectionsTitle: "The quiet realities of our friendship.",
  reflectionsSubtitle: "Not grand speeches — just how things genuinely are.",
  reflections: [
    {
      tag: "THE CORRIDORS",
      title: "Making ordinary college days bearable",
      description:
        "Between long lectures, classroom benches, and waiting for the day to end — laughing through the chaos with you made every single day lighter.",
    },
    {
      tag: "UNFILTERED TALKS",
      title: "The best conversations had no script",
      description:
        "Spontaneous tea breaks, roaming around without a destination, and jumping from small gossip to big life dreams without missing a beat.",
    },
    {
      tag: "GENUINE EASE",
      title: "Zero pretension, always",
      description:
        "The comfort of never having to put on a front or filter your thoughts — just being completely, comfortably yourself.",
    },
    {
      tag: "THROUGH IT ALL",
      title: "A friend who stays constant",
      description:
        "Years move on, semesters change, and life gets busier, but having someone whose warmth never wavers is something I deeply cherish.",
    },
  ],

  /* ---- WISH ---- */
  wishTitle: "Make a wish, SK.",
  wishButton: "MAKE A WISH",
  wishReveal: "May this year be your favourite chapter yet.",

  /* ---- BIRTHDAY TOAST (Heartfelt, open-air note — no artificial popups or gimmicks) ---- */
  toastTag: "A quiet dedication",
  toastTitle: "Here's to you, SK.",
  toastLines: [
    "To surviving another year of madness and coming out even brighter.",
    "To dreaming big, laughing loud, and never losing your kind heart.",
    "May your 21st year give you everything you've quietly worked for.",
  ],
  toastSign: "Always cheering for you. Happy Birthday, SK ❤",

  /* ---- FINAL ---- */
  finalTitle: "Happy Birthday, SK.",
  finalLines: [
    "May this year bring you peace, unforgettable adventures,",
    "and people who cherish your presence as much as you deserve.",
  ],
  finalSign: "— always your friend.",
  replayLabel: "REPLAY THE EXPERIENCE",

  /* ---- MUSIC: replace with your own file URL (put one in /public) ---- */
  musicUrl: "/music.mp3",
};

export type Config = typeof config;
