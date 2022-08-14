<script lang="ts">
  import { loadStyle } from "@/helper/download";

  export let fontUrl = "";

  export let load: () => void;
  export let error: (err: any) => void;

  const click = (url: string) => {
    loadStyle(url)
      .then(() => {
        load();
      })
      .catch((err) => {
        error(err);
      });
  };

  $: click(fontUrl);
</script>
