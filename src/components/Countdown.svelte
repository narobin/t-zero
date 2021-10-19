<script lang="ts">
  export let showClock = false;
  export let date: Date;

  interface TimeRemaining {
    days: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
  }

  let calcMillis = () => date.getTime() - Date.now();
  let millis = calcMillis();
  setInterval(() => millis = calcMillis(), 1e3);

  let days = (ms, clock) => (clock ? Math.floor : Math.ceil)(ms / 864e5);
  let hours = (ms) => Math.floor(ms % 864e5 / 36e5);
  let minutes = (ms) => Math.floor((ms % 36e5) / 6e4);
  let seconds = (ms) => Math.floor(ms % 6e4 / 1e3);
</script>

<div class="digit-flow">
  <div class="digit">
    <span class="title">Days</span> <span class="number">{days(millis, showClock)}</span>
  </div>
  {#if showClock}
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