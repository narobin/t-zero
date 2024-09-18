<script lang="ts">
    import Timer from "$lib/components/Timer.svelte";

    export let data;
</script>

<section>
    <Timer name={data.name} date={data.date} />
</section>

<style lang="scss">
    section {
      margin-top: 30dvh;
    }
</style>
