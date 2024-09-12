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

// pages
const page = document.body.dataset.page;

if (page) {
  import(`./${page}/app.js`)
    .then((m) => m.default())
    .catch(dom.error);
}
