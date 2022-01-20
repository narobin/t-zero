<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let showClock = false;
  export let date: number;
  export let index: number;
  export let name: string;
  
  interface TimeRemaining {
    days: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
  }
  
  const calcMillis = () => (new Date(date)).getTime() - Date.now();

  let millis = calcMillis();
  let isComplete = false;

  const dispatch = createEventDispatcher();
  
  const clockThreshold = 3*863e5;

  const days = (ms) => (showClock || millis < clockThreshold ? Math.floor : Math.ceil)(ms / 864e5);
  const hours = (ms) => Math.floor(ms % 864e5 / 36e5);
  const minutes = (ms) => Math.floor((ms % 36e5) / 6e4);
  const seconds = (ms) => Math.floor(ms % 6e4 / 1e3);

  let interval = setInterval(() => {
    if (millis < 1e3) {
      clearInterval(interval);
      isComplete = true;
    }
    millis = calcMillis()
  }, 1e2);
</script>

<div class="countdown">
  <span class="title">{name}</span>
  {#if !isComplete}
  <div class="digit-flow">
    <div class="digit">
      <span class="title">Days</span> <span class="number">{days(millis)}</span>
    </div>
    {#if showClock || millis < clockThreshold}
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
  {:else}
  <span class="complete">Complete</span>
  {/if}
  <div class="buttons">
    <button on:click={() => dispatch('edit', index)}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
    </button>
    <button on:click={() => dispatch('done', index)}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
    </button>
  </div>
</div>

<style lang="scss">
  @import '../../_theme';

  .countdown {
    position: relative;
    text-align: center;
    padding: 1rem;
    padding-bottom: 2rem;
    border: 2px solid $primary-hover;
    border-radius: 1rem;
    flex-grow: 1;
    flex-basis: 0;

    .title {
      font-size: 2rem;
      display: block;
      margin-bottom: .5rem;
    }

    .complete {
      font-weight: bold;
      font-size: 1.5rem;
      display: inline-block;
      margin-top: 1rem;
    }

    .digit {
      display: flex;
      flex-direction: column;
   
      .title {
        font-size: .8rem;
        color: lighten($text--light, 50%);
      }
      .number {
        font-weight: bold;
        font-size: 1.5rem;
      }
      & + .digit { margin-left: 1rem; }
    }

    .digit-flow {
      display: flex;
      justify-content: center;
    }

    &:hover .buttons {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      display: grid;
      grid-template-columns: 6ch;
      grid-template-rows: repeat(2, 1fr);
      border-left: 2px solid $primary-hover;
      background: $background--dark;
      border-radius: 0 1rem 1rem 0;
      button {
        background: transparent;
        cursor: pointer;
        border: none;
        color: $primary-hover;
        &:hover { color: $primary; }
      }
    }
    .buttons { display: none; }
  }

  @media (prefers-color-scheme: light) {
    .buttons { background: $background--light; }
  }
</style>