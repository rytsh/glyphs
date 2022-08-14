<script lang="ts">
  import { redirect } from "@/helper/redirect";

  export let font = "";
  export let css = "";
  export let file = "";

  let className = "";
  export { className as class };

  const select = () => redirect(font, css, file);
</script>

<div
  class={`${className} border border-b bg-slate-50 p-2 example-box hover:border-black`}
>
  <label class="p-2 min-w-[21rem] flex">
    <span class="w-28">Font Family</span>
    <input bind:value={font} class="form-input-example flex-1" />
  </label>
  <label class="p-2 min-w-[21rem] flex">
    <span class="w-28">StyleSheet Link</span>
    <input bind:value={css} class="form-input-example flex-1" />
  </label>
  <label class="p-2 min-w-[21rem] flex">
    <span class="w-28">File Link</span>
    <input bind:value={file} class="form-input-example flex-1" />
  </label>
  <button
    class="block w-full border border-gray-500 bg-white hover:bg-green-500"
    on:click={select}
  >
    Select
  </button>
</div>
