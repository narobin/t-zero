<script lang="ts">
    import Timer from "$lib/components/Timer.svelte";

    export let data;
</script>

<div class="timer">
    <Timer name={data.name} date={data.date} />
</div>

<style lang="scss">
    .timer {
      display: grid;
      place-items: center;
      height: 100%;
    }
</style>
