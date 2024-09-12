import {
  NumberFuncs,
  StringFuncs,
  DateFuncs,
  Dom,
  Fetch,
} from "./scripts/Funcs.js";

// utils
export const numFn = new NumberFuncs();
export const strFn = new StringFuncs();
export const dateFn = new DateFuncs();
export const dom = new Dom();
export const fetchFn = new Fetch();

dom.setCopyright();

// app
const piano = dom.select("#piano");
const keys = ["q", "s", "d", "f", "g", "h", "j", "k", "l", "m", "p"];
const audios = await Promise.all(
  keys.map(
    (k) =>
      new Promise((res) => {
        const audio = new Audio(`./sounds/${k}.mp3`);
        audio.load();
        res(audio);
      })
  )
);
const sounds = {};
keys.forEach((k, i) => (sounds[k] = audios[i]));

/**
 * @param {HTMLElement} elem
 */
function activeTouch(elem) {
  dom.modClass(elem, "active");
  setTimeout(() => dom.modClass(elem, "active", "del"), 100);
}
/**
 * @param {KeyboardEvent|PointerEvent} e
 */
async function playSound(e) {
  const key =
    e instanceof PointerEvent ? e.target.dataset.key : e.key.toLowerCase();
  if (!keys.includes(key)) return;

  const touch = dom.select(`[data-key=${key}]`);
  activeTouch(touch);
  await sounds[key].play();
}

addEventListener("keydown", playSound);
piano.addEventListener("click", playSound);
