<script>
  import Router from "svelte-spa-router";

  import Home from "@/routes/Home.svelte";
  import NotFound from "@/routes/NotFound.svelte";
  import Glyphs from "@/routes/Glyphs.svelte";

  const routes = {
    // Exact path
    "/": Home,

    // Wildcard parameter
    "/fonts/:font": Glyphs,

    // Catch-all
    // This is optional, but if present it must be the last
    "*": NotFound,
  };
</script>

<div class="bg-gray-100 h-full">
  <div class="border-black h-full">
    <Router {routes} />
  </div>
</div>
