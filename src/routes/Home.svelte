<script lang="ts">
  import Example from "@/components/Example.svelte";
  import { redirect } from "@/helper/redirect";

  const submitForm = async (
    e: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }
  ) => {
    const form = e.currentTarget;
    const fontNameFrom = (form.elements.namedItem("font") as HTMLInputElement)
      .value;
    const fontCssForm = (
      form.elements.namedItem("css-link") as HTMLInputElement
    ).value;

    const fontLinkForm = (
      form.elements.namedItem("font-link") as HTMLInputElement
    ).value;

    redirect(fontNameFrom, fontCssForm, fontLinkForm);
  };
</script>

<div
  class="p-4 flex justify-evenly border-b-4 border-t-4 border-indigo-500 flex-wrap gap-5 flex-col sm:flex-row"
>
  <div class="flex items-center justify-center flex-1">
    <span class="font-mono text-6xl">Glyphs</span>
  </div>
  <form on:submit|preventDefault|stopPropagation={submitForm} class="flex-1">
    <label>
      <span class="text-sm font-bold block mb-2">Font Family</span>
      <input
        type="text"
        name="font"
        autocomplete="off"
        placeholder="Noto Emoji"
        class="mb-4 form-input p-1"
      />
    </label>
    <label>
      <span class="text-sm font-bold block mb-2">[Stylesheet Link]</span>
      <input
        type="text"
        name="css-link"
        autocomplete="off"
        placeholder="Optional custom stylesheet"
        class="mb-4 form-input p-1"
      />
    </label>
    <label>
      <span class="text-sm font-bold block mb-2">[Font Link]</span>
      <input
        type="text"
        name="font-link"
        autocomplete="off"
        placeholder="Optional font file link"
        class="mb-4 form-input p-1"
      />
    </label>
    <button
      type="submit"
      value="create"
      class="block border border-black bg-white text-black hover:bg-green-400 hover:text-white font-bold py-1 px-3 w-full"
    >
      Glyphs
    </button>
  </form>
</div>

<div
  class="border-t border-b border-black bg-yellow-200 w-full text-center my-2"
>
  Some font links cannot work because of CORS policy, enable CORS extension in
  browser to use them.
</div>

<span class="border-b border-dashed border-black text-2xl block px-2 py-1">
  Examples
</span>
<div class="p-4 flex flex-wrap gap-2">
  <Example class="flex-1 md:flex-initial" font="Noto Emoji" />
  <Example class="flex-1 md:flex-initial" font="Noto Sans Old Turkic" />
  <Example
    class="flex-1 md:flex-initial"
    font="Eternal UI 2"
    file="https://get.fontspace.co/download/font/Yzewq/OGVlMTI0ZDgzOTdmNDc3MTljNzUzYmIwZWVkZTM5ZmMudHRm/EternalUi2Bold-Yzewq.ttf"
  />
</div>
