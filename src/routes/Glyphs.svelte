<script lang="ts">
  import { link, querystring } from "svelte-spa-router";
  import { onMount } from "svelte";

  import { fontDownloadCss, fontDownloadFile } from "@/helper/download";
  import { getGlyphs, getGlyphsByFont } from "@/helper/views";
  import Glyph from "@/components/Glyph.svelte";

  export let params = {} as {
    font: string;
  };

  let error = "";
  let divListGlyphs: HTMLDivElement;
  let divListGlyphsCustom: HTMLDivElement;
  let mounted = false;
  let glyphs = [] as string[];
  let customGlyphs = [] as string[];
  let customUnicodes = "";

  let qStringOld = "";
  let fontOld = "";

  const changeFont = (fontFamily: string, mounted: boolean) => {
    if (!mounted) {
      return;
    }

    divListGlyphs.style.fontFamily = `'${fontFamily}'`;
    divListGlyphsCustom.style.fontFamily = `'${fontFamily}'`;
  };

  const loadFont = (fontFamily: string) => {
    // set font types
    glyphs = getGlyphsByFont(fontFamily);
  };

  const queryCheck = async (font: string, qString: string) => {
    const qStringOldCheck = qStringOld;
    qStringOld = qString;

    const fontOldCheck = fontOld;
    fontOld = font;

    if (fontOldCheck != "") {
      if (qString == "" && qStringOldCheck != "") {
        return;
      }

      if (qStringOldCheck != qString && fontOldCheck == font) {
        return;
      }
    }

    error = "";

    const searchParams = new URLSearchParams(qString);
    const css = searchParams.get("css") ?? "";
    const file = searchParams.get("file") ?? "";

    if (file == "") {
      fontDownloadCss(font, css)
        .then(() => loadFont(font))
        .catch((e) => {
          error = e;
        });

      return;
    }

    fontDownloadFile(font, file)
      .then(() => loadFont(font))
      .catch((e) => {
        error = e;
      });
  };

  const customView = (unicodes: string) => {
    unicodes = unicodes.replaceAll(" ", "");
    if (unicodes == "") {
      customGlyphs = [];
      return;
    }

    try {
      customGlyphs = getGlyphs(unicodes.split(","));
    } catch (error) {
      customGlyphs = [];
    }
  };

  $: customView(customUnicodes);
  $: queryCheck(params.font, $querystring);
  $: changeFont(params.font, mounted);

  onMount(() => {
    mounted = true;
  });
</script>

<div
  class="text-2xl p-2 bg-white border-b-2 border-indigo-500 mb-4 flex justify-between"
>
  <div>
    <a
      href="/"
      use:link
      class="text-indigo-500 border-r border-r-black hover:text-red-500 pr-2"
      >Home</a
    >
    <span>{glyphs.length} total glyphs</span>
  </div>
  <span>{params.font}</span>
</div>

{#if error}
  <div
    class="border border-black bg-yellow-200 w-full text-center text-lg mb-2"
  >
    {error}
  </div>
{/if}

<div class="mb-2 p-2">
  <details>
    <summary class="cursor-pointer hover:bg-yellow-200"
      >Custom Unicode Range</summary
    >
    <label>
      <span class="text-sm font-bold block mb-2">Unicodes</span>
      <input
        type="text"
        name="unicodes"
        autocomplete="off"
        placeholder="U+10C00-10C48, U+0000-00FF, U+0131"
        class="mb-4 form-input p-1"
        bind:value={customUnicodes}
      />
    </label>

    <div bind:this={divListGlyphsCustom} class="glyphs-list">
      {#each customGlyphs as glyph, i}
        <Glyph {glyph} class="glyphs" />
      {/each}
    </div>
  </details>
</div>

<hr class="w-full h-1 bg-indigo-500 mb-2" />

<div bind:this={divListGlyphs} class="glyphs-list">
  {#each glyphs as glyph, i}
    <Glyph {glyph} class="glyphs" />
  {/each}
</div>
