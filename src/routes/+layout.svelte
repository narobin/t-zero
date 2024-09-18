<script lang="ts">

    import Auth from "$lib/components/Auth.svelte";
</script>

<header>

    <h1>t-zero</h1>

    <Auth/>

</header>

<main>
    <slot/>
</main>

<style lang="scss">

    :global(body) {
      margin: 0;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;

      display: grid;
      grid-template-rows: auto 1fr;
      min-height: 100dvh;
      box-sizing: border-box;

      background-color: $primary-color;
    }

    :global(body, button, input, select, textarea) {
      font-family: 'Libre Baskerville', serif;
    }

    header {
      padding: 1rem;
      color: $bg-color;
      display: flex;
      gap: 0.5rem;
      align-items: baseline;
      h1 {
        flex-grow: 1;
        margin: 0;
        padding: 0;
      }
    }

    main {
      background-color: $bg-color;
      padding: 1rem;
      border-radius: 1rem 0 0 0;
      margin-left: 1rem;
    }
</style>
