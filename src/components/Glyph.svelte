<script lang="ts">
  export let glyph = "";

  let copied = false;
</script>

<span
  class={`${
    copied ? "hover:bg-green-500" : "hover:bg-yellow-200"
  } border border-black p-2 w-20 h-20 cursor-pointer leading-tight`}
  title="click to copy clipboard"
  on:click={() => {
    copied = true;
    setTimeout(() => {
      copied = false;
    }, 500);
    navigator.clipboard.writeText(glyph);
  }}
>
  {glyph}
</span>
