/**
 * ============================================================
 *  EDIT EVERYTHING HERE — this is the only file you need.
 * ============================================================
 */

import portrait from "@/assets/portrait.png.asset.json";
import sk4 from "@/assets/sk4.jpg.asset.json";
import sk5 from "@/assets/sk5.jpg.asset.json";
import sk7 from "@/assets/sk7.jpg.asset.json";
import sk8 from "@/assets/sk8.jpg.asset.json";
import sk9 from "@/assets/sk9.jpg.asset.json";

export const config = {
  /* ---- BASICS ---- */
  name: "SK",
  birthdayDate: "23 August", // shown small in the footer

  /* ---- MAIN PORTRAIT (replace the import above to change) ---- */
  portrait: portrait.url,
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

  /* ---- MEMORY TIMELINE (swap photo / date / text freely) ---- */
  timelineTitle: "Little moments. Big memories.",
  memories: [
    {
      title: "THE FIRST HELLO",
      date: "Chapter one",
      text: "Two people who didn't know that one day they'd have so many stories.",
      photo: sk5.url,
    },
    {
      title: "THE RANDOM CONVERSATIONS",
      date: "Every other night",
      text: "Some conversations were completely unnecessary. Somehow, they became the best ones.",
      photo: sk9.url,
    },
    {
      title: "THE LAUGHTER",
      date: "Always",
      text: "Some laughs simply cannot be explained.",
      photo: sk8.url,
    },
    {
      title: "THE GOSSIP",
      date: "Classified",
      text: "Important discussions. Extremely important discussions.",
      photo: sk7.url,
    },
    {
      title: "THE ADVENTURES",
      date: "Whenever we could",
      text: "Places, food, chaos, and memories.",
      photo: sk4.url,
    },
    {
      title: "TODAY",
      date: "Right now",
      text: "Still collecting stories.",
      photo: portrait.url,
    },
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
