<script lang="ts">
  import { link, querystring } from "svelte-spa-router";
  import { onMount } from "svelte";

  import { fontDownloadCss } from "@/helper/download";
  import { getGlyphs, getGlyphsByFont } from "@/helper/views";
  import Load from "@/components/Load.svelte";
  import Glyph from "@/components/Glyph.svelte";

  export let params = {} as {
    font: string;
  };

  let error = "";
  let chars: HTMLDivElement;
  let mounted = false;
  let glyphs = [] as string[];
  let customGlyphs = [] as string[];
  let customUnicodes = "";
  let fontUrl = "";
  let loaded = false;

  const loadFont = (fontFamily: string) => {
    chars.style.fontFamily = fontFamily;
    glyphs = getGlyphsByFont(fontFamily);
  };

  const triggerLoad = (l: boolean, m: boolean) => {
    if (l && m) {
      loaded = false;
      loadFont(params.font);
    }
  };

  const queryCheck = async (font: string, qString: string) => {
    const searchParams = new URLSearchParams(qString);
    const css = searchParams.get("css") ?? "";

    try {
      fontUrl = fontDownloadCss(font, css);
    } catch (err) {
      error = err;
    }
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
  $: triggerLoad(loaded, mounted);

  onMount(() => {
    mounted = true;
  });
</script>

<Load
  {fontUrl}
  load={() => {
    loaded = true;
    error = "";
  }}
  error={(err) => (error = err)}
/>

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
    <summary>Custom Unicode Range</summary>
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

    <div
      class="bg-white w-full text-5xl text-center h-full flex flex-wrap justify-center gap-1"
    >
      {#each customGlyphs as glyph, i}
        <Glyph {glyph} />
      {/each}
    </div>
  </details>
</div>

<hr class="w-full h-1 bg-indigo-500 mb-2" />

<div
  bind:this={chars}
  class="bg-white w-full text-5xl text-center h-full flex flex-wrap justify-center gap-1"
>
  {#each glyphs as glyph, i}
    <Glyph {glyph} />
  {/each}
</div>
