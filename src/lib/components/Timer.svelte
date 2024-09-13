<script lang="ts">
    import {derived} from "svelte/store";
    import {time} from "$lib/stores/time";
    import {getTimer} from "$lib/helpers/getTimes";

    export let name = "";
    export let date = 0;

    const remaining = derived(
        time,
        ($time) => getTimer(date - $time),
    );

    const pad = (x: number) => x.toString().padStart(2, "0");
</script>

<div class="timer">
    <h1 class="name">{name}</h1>
    <p class="countdown">{pad($remaining.days)}:{pad($remaining.hours)}:{pad($remaining.minutes)}:{pad($remaining.seconds)}</p>
</div>

<style lang="scss">
    .timer {
      text-align: center;

      h1 {
        font-size: 4rem;
      }

      .countdown {
        padding: 0.5em 1em;
        background-color: $secondary-color;
        border-radius: 5rem;
        margin-bottom: 5rem;
        display: inline-block;
        font-size: 2rem;
      }
    }
</style>
