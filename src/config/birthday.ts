/**
 * ============================================================
 *  EDIT EVERYTHING HERE — this is the only file you need.
 * ============================================================
 */

import portrait from "@/assets/portrait.jpg";
import mem1 from "@/assets/mem1.jpg";
import mem2 from "@/assets/mem2.jpg";
import mem3 from "@/assets/mem3.jpg";
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
  portrait: portrait,
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
    mem7, mem8, mem9, mem10, mem11, portrait,
  ],

  /* ---- THINGS I LOVE ---- */
  thingsTitle: "Things that make you, you.",
  things: [
    { label: "Your laugh", note: "The one that starts a chain reaction." },
    { label: "Your energy", note: "Rooms change temperature when you walk in." },
    { label: "Your random talks", note: "No topic, no point, no regrets." },
    { label: "Your kindness", note: "Quiet, constant, never advertised." },
    { label: "Your chaos", note: "Beautifully unorganised. Never boring." },
    { label: "Your expressions", note: "A whole language of their own." },
    { label: "Your presence", note: "Comfort, without effort." },
    {
      label: "The way you make ordinary moments memorable",
      note: "That is the real talent.",
    },
  ],

  /* ---- WISH ---- */
  wishTitle: "Make a wish, SK.",
  wishButton: "MAKE A WISH",
  wishReveal: "May this year be your favourite chapter yet.",

  /* ---- SECRET SURPRISE ---- */
  secretButton: "There's one more thing...",
  secretLines: ["If memories were photographs,", "I'd keep the whole album."],
  secretSign: "Happy Birthday, SK ❤",

  /* ---- FINAL ---- */
  finalTitle: "Happy Birthday, SK.",
  finalLines: [
    "Here's to more laughs.",
    "More adventures.",
    "More food.",
    "More gossip.",
    "More unforgettable moments.",
  ],
  finalSign: "— always your friend.",
  replayLabel: "REPLAY THE EXPERIENCE",

  /* ---- MUSIC: replace with your own file URL (put one in /public) ---- */
  musicUrl: "/music.mp3",
};

export type Config = typeof config;
