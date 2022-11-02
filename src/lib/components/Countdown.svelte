<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { time } from '$lib/stores/time';

  export let showClock = false;
  export let date: number;
  export let index: number;
  export let name: string;

  $: dateMillis = (new Date(date)).getTime()
  $: millis = dateMillis - $time;
  $: isComplete = millis < 0;

  const dispatch = createEventDispatcher();
  
  const clockThreshold = 3*863e5;

  $: days = (showClock || millis < clockThreshold ? Math.floor : Math.ceil)(millis / 864e5);
  $: hours = Math.floor(millis % 864e5 / 36e5);
  $: minutes = Math.floor(millis % 36e5 / 6e4);
  $: seconds = Math.floor(millis % 6e4 / 1e3);
</script>

<div class="countdown">
  <div class="title">{name}</div>
  {#if !isComplete}
  <div class="digit-flow">
    <div class="digit">
      <span class="title">Days</span> <span class="number">{days}</span>
    </div>
    {#if showClock || millis < clockThreshold}
    <div class="digit">
      <span class="title">Hours</span> <span class="number">{hours}</span>
    </div>
    <div class="digit">
      <span class="title">Minutes</span> <span class="number">{minutes}</span>
    </div>
    <div class="digit">
      <span class="title">Seconds</span> <span class="number">{seconds}</span>
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
  .countdown {
    position: relative;
    text-align: center;
    padding: 1rem;
    padding-bottom: 2rem;
    border: 2px solid $primary;
    border-radius: 1rem;
    flex-grow: 1;
    flex-basis: 0;
    display: flex;
    flex-direction: column;

    .title {
      font-size: 2rem;
      display: block;
      font-weight: bold;
      margin-bottom: .5rem;
      flex-grow: 1;
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
        color: lighten($text-light-theme, 60%);
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
      top: .5rem;
      right: .5rem;
      display: flex;
      background: $primary;
      border-radius: 1rem;
      height: 1rem;
      padding: 0.5rem;
      button {
        background: transparent;
        display: block;
        cursor: pointer;
        border: none;
        padding: 0;
        @include theme-text();
        svg { height: 100%; }
      }
      button ~ button { margin-left: 0.25rem; }
    }
    .buttons { display: none; }
  }

  @media (prefers-color-scheme: light) {
    .buttons { background: $background-light-theme; }
  }
</style>