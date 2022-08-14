const removeLink = (src: string) => {
  const links = document.head.getElementsByTagName("link") as HTMLCollectionOf<HTMLLinkElement>;
  for (const link of links) {
    if (link.href == src) {
      link.remove();
    }
  }
};

const fontDownloadCss = (font: string, css = "") => {
  let fontURL = css;

  if (fontURL == "") {
    // https://fonts.googleapis.com/css2?family=Noto+Sans+Old+Turkic&display=swap
    fontURL = `https://fonts.googleapis.com/css2?family=${font.replaceAll(
      " ",
      "+"
    )}&display=swap`;
  }

  const links = document.head.getElementsByTagName("link") as HTMLCollectionOf<HTMLLinkElement>;
  for (const link of links) {
    if (link.href == fontURL) {
      return Promise.resolve();
    }
  }

  return new Promise((resolve, reject) => {
    const link = document.createElement("link");
    link.href = fontURL;
    link.rel = "stylesheet";

    link.onload = () => resolve(link);
    link.onerror = () => {
      removeLink(fontURL);
      reject(new Error(`Style load error for ${fontURL}`));
    };

    document.head.append(link);
  });
};

const fontDownloadFile = (font: string, file: string) => {
  if (file == "") {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const fontFace = new FontFace(font, `url(${file})`);
    fontFace.load().catch((e) => {
      reject(e);
    });

    // wait for font to be loaded
    fontFace.loaded.then((v) => {
      document.fonts.add(v);
      resolve(v);
    });
  });
};

export { fontDownloadCss, fontDownloadFile };
