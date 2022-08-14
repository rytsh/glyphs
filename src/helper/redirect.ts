import { push } from "svelte-spa-router";

const redirect = (font: string, css: string, file: string) => {
  let redirectURL = `/fonts/${font}`;

  if (css && file) {
    redirectURL += `?css=${css}&file=${file}`;
  } else if (file) {
    redirectURL += `?file=${file}`;
  } else if (css) {
    redirectURL += `?css=${css}`;
  }

  push(redirectURL);
};

export { redirect };

