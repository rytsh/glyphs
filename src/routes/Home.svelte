<script lang="ts">
  import { push } from "svelte-spa-router";

  let error = "";
  let loading = false;

  const submitForm = async (
    e: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }
  ) => {
    error = "";
    loading = true;

    const form = e.currentTarget;
    const fontNameFrom = (form.elements.namedItem("font") as HTMLInputElement)
      .value;
    const fontURLForm = (
      form.elements.namedItem("font-url") as HTMLInputElement
    ).value;

    let redirectURL = `/fonts/${fontNameFrom}`;
    if (fontURLForm) {
      redirectURL += `?url=${fontURLForm}`;
    }

    push(redirectURL);

    loading = false;
  };
</script>

<div
  class="p-4 flex justify-evenly border-b-4 border-t-4 border-indigo-500 flex-wrap gap-5"
>
  <div class="flex items-center">
    <span class="font-mono text-6xl">Glyphs</span>
  </div>
  <form on:submit|preventDefault|stopPropagation={submitForm}>
    <label>
      <span class="text-sm font-bold block mb-2">Font Family</span>
      <input
        type="text"
        name="font"
        autocomplete="off"
        placeholder="Noto Sans"
        class="mb-4 form-input p-1"
      />
    </label>
    <label>
      <span class="text-sm font-bold block mb-2">URL</span>
      <input
        type="text"
        name="font-url"
        autocomplete="off"
        placeholder="Optional custom URL"
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
