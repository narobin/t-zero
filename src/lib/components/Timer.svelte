<script lang="ts">
    import {time} from "$lib/stores/time";
    import {getTimer} from "$lib/helpers/getTimes";

    export let name = "";
    export let date = 0;
    export let uuid = "";

    $: href = `/timer/${uuid}`

    $: remaining = getTimer(date - $time)

    const pad = (x: number) => x.toString().padStart(2, "0");
</script>

<div class="timer-container">
    <div class="timer">
        <h1 class="name">{name}</h1>
        <div class="actions">
            {#if uuid}
                <a {href}>link</a>
            {/if}
        </div>
        <p class="countdown">{pad($remaining.days)}:{pad($remaining.hours)}:{pad($remaining.minutes)}:{pad($remaining.seconds)}</p>
    </div>
</div>

<style lang="scss">
    .timer-container {
      container-type: inline-size;
      padding: 1rem;
    }

    .timer {
      text-align: center;
      display: grid;
      place-items: center;

      h1 {
        font-size: 4rem;
        margin: 0;
        padding: 0;
      }

      .countdown {
        padding: 0.5em 1em;
        background-color: $secondary-color;
        border-radius: 5rem;
        display: inline-block;
        font-size: 2rem;
      }
    }

    @container (max-height: 200px) {
      .timer {
        grid-template-columns: 1fr auto auto;
        text-align: left !important;
        padding: 0 2rem;
        align-items: baseline;
        h1 {
          margin: 0;
          padding: 0;
        }
      }

    }

    :global(.timer-container ~ .timer-container) {
        border-top: 2px solid $secondary-color;
    }
</style>
