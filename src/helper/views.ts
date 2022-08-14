import { UnicodeRange } from "@japont/unicode-range";

const unicodeRange = (fontFamily: string) => {
  const range = [] as string[];
  for (const f of document.fonts.values()) {
    if (f.family == fontFamily) {
      if (f.unicodeRange == "U+0-10FFFF") {
        range.push("U+0020-00FF");
        continue;
      }

      range.push(f.unicodeRange);
    }
  }

  if (range.length) {
    return range.join(",").replaceAll(" ", "").split(",");
  }

  throw new Error("Font not found");
};

const getGlyphsByFont = (fontFamily: string) => {
  const range = unicodeRange(fontFamily);

  return getGlyphs(range);
};

const getGlyphs = (range: string[]) => {
  const glyphs: string[] = [];

  UnicodeRange.parse(range).forEach((i) => {
    const v = String.fromCodePoint(i);
    if (v) glyphs.push(v);
  });

  return glyphs;
};

export { getGlyphsByFont, getGlyphs };
