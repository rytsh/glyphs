const fontDownloadCss = (font: string, css = "") => {
  let fontURL = css;

  if (fontURL == "") {
    // https://fonts.googleapis.com/css2?family=Noto+Sans+Old+Turkic&display=swap
    fontURL = `https://fonts.googleapis.com/css2?family=${font.replaceAll(
      " ",
      "+"
    )}&display=swap`;
  }

  return fontURL;
};

const removeLink = (src: string) => {
  const links = document.head.getElementsByTagName("link") as HTMLCollectionOf<HTMLLinkElement>;
  for (const link of links) {
    if (link.href == src) {
      link.remove();
    }
  }
};

const loadStyle = (src: string) => {
  const links = document.head.getElementsByTagName("link") as HTMLCollectionOf<HTMLLinkElement>;
  for (const link of links) {
    if (link.href == src) {
      return Promise.resolve();
    }
  }

  return new Promise((resolve, reject) => {
    const link = document.createElement("link");
    link.href = src;
    link.rel = "stylesheet";

    link.onload = () => resolve(link);
    link.onerror = () => {
      removeLink(src);
      reject(new Error(`Style load error for ${src}`));
    };

    document.head.append(link);
  });
};

export { fontDownloadCss, loadStyle };
