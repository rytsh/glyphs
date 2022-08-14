import { UnicodeRange } from "@japont/unicode-range";

const unicodeRange = (fontFamily: string) => {
  const range = [] as string[];
  for (const f of document.fonts.values()) {
    if (f.family == fontFamily) {
      range.push(f.unicodeRange);
    }
  }

  if (range.length) {
    return range.join(",").replaceAll(" ", "").split(",");
  }

  throw new Error("Font not found");
};

const getGlyphs = (fontFamily: string) => {
  const glyphs: string[] = [];
  const range = unicodeRange(fontFamily);

  UnicodeRange.parse(range).forEach((i) => {
    // console.log(i.toString(16));
    glyphs.push(String.fromCodePoint(i));
  });

  return glyphs;
};


export { getGlyphs };
