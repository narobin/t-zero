<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let showClock = false;
  export let date: Date;
  export let index: Number;
  
  interface TimeRemaining {
    days: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
  }
  
  const calcMillis = () => date.getTime() - Date.now();

  let millis = calcMillis();

  const dispatch = createEventDispatcher();
  
  const days = (ms) => (showClock || millis < 863e5 ? Math.floor : Math.ceil)(ms / 864e5);
  const hours = (ms) => Math.floor(ms % 864e5 / 36e5);
  const minutes = (ms) => Math.floor((ms % 36e5) / 6e4);
  const seconds = (ms) => Math.floor(ms % 6e4 / 1e3);

  let interval = setInterval(() => {
    if (millis < 1e3) {
      clearInterval(interval);
      setTimeout(() => dispatch('done', index), 3e3);
    }
    millis = calcMillis()
  }, 1e2);
</script>

<div class="digit-flow">
  <div class="digit">
    <span class="title">Days</span> <span class="number">{days(millis)}</span>
  </div>
  {#if showClock || millis < 863e5}
  <div class="digit">
    <span class="title">Hours</span> <span class="number">{hours(millis)}</span>
  </div>
  <div class="digit">
    <span class="title">Minutes</span> <span class="number">{minutes(millis)}</span>
  </div>
  <div class="digit">
    <span class="title">Seconds</span> <span class="number">{seconds(millis)}</span>
  </div>
  {/if}
</div>

<style>
  .digit {
    display: flex;
    flex-direction: column;
  }

  .digit .title {
    font-size: .8rem;
    color: lightgray;
  }

  .digit .number {
    font-weight: bold;
    font-size: 1.5rem;
  }

  .digit + .digit { margin-left: 1rem; }

  .digit-flow {
    display: flex;
    justify-content: center;
  }
</style>