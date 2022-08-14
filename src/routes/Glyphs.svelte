<script lang="ts">
  import { link, querystring } from "svelte-spa-router";
  import { onMount } from "svelte";

  import { fontDownloadURL } from "@/helper/download";
  import { getGlyphs } from "@/helper/views";
  import Load from "@/components/Load.svelte";
  import Glyph from "@/components/Glyph.svelte";

  export let params = {} as {
    font: string;
  };

  let error = "";
  let chars: HTMLDivElement;
  let mounted = false;
  let glyphs = [] as string[];
  let fontUrl = "";
  let loaded = false;

  const loadFont = (fontFamily: string) => {
    chars.style.fontFamily = fontFamily;
    glyphs = getGlyphs(fontFamily);
  };

  const triggerLoad = (l: boolean, m: boolean) => {
    if (l && m) {
      loaded = false;
      loadFont(params.font);
    }
  };

  const queryCheck = async (font: string, qString: string) => {
    const searchParams = new URLSearchParams(qString);
    const url = searchParams.get("url") ?? "";

    try {
      fontUrl = fontDownloadURL(font, url);
    } catch (err) {
      error = err;
    }
  };

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
    <span>Total glyphs is {glyphs.length}</span>
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

<div
  bind:this={chars}
  class="bg-white w-full text-5xl text-center h-full flex flex-wrap justify-center gap-1"
>
  {#each glyphs as glyph, i}
    <Glyph {glyph} />
  {/each}
</div>
