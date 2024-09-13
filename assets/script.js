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
const touches = dom.selectAll(".touch");
const stopBt = dom.select("#piano > p");
const keys = ["q", "s", "d", "f", "g", "h", "j", "k", "l", "m", "p"];
const sounds = await loadSounds(keys);
let sound;

/**
 * @param {String[]} sounds
 */
async function loadSounds(audios) {
  try {
    const prms = await Promise.all(
      audios.map((a) => Promise.resolve(new Audio(`./sounds/${a}.wav`)))
    );
    const sounds = {};
    audios.forEach((a, i) => (sounds[a] = prms[i]));
    return sounds;
  } catch (err) {
    return dom.error(err);
  }
}
/**
 * @param {KeyboardEvent} e
 */
function activeTouch(e) {
  const key = e.key.toLowerCase();
  if (keys.includes(key)) {
    const touch = dom.select(`[data-key=${key}]`);
    dom.modClass(touch, "active");
  } else if (key === " ") {
    dom.modClass(stopBt, "active");
  }
}
/**
 * @param {KeyboardEvent} e
 */
async function playSound(e) {
  try {
    const key = e.key.toLowerCase();
    if (!keys.includes(key)) return;

    touches.forEach((t) => dom.modClass(t, "active", "del"));
    if (sound === sounds[key]) {
      sound.load();
      await sound.play();
      return;
    }
    sound = sounds[key];
    await sound.play();
  } catch (err) {
    return dom.error(err);
  }
}
/**
 * @param {KeyboardEvent} e
 */
function stop(e) {
  const key = e.key.toLowerCase();
  if (key !== " ") return;

  const soundsTab = Object.values(sounds);
  for (let i = 0; i < soundsTab.length; i++) {
    soundsTab[i].load();
  }
  dom.modClass(stopBt, "active", "del");
}

addEventListener("keydown", activeTouch);
addEventListener("keyup", playSound);
addEventListener("keyup", stop);
