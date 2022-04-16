<script lang="ts">
  import type { Timer } from '$lib/models/Timer';
  import type { TimeRemaining } from '$lib/models/TimeRemaining';

  import Countdown from '$lib/components/Countdown.svelte';
  import Help from '$lib/components/Help.svelte';
  import TimerEditMenu from '$lib/components/TimerEditMenu.svelte';
  import { onMount } from 'svelte/internal';
  import { timers } from '$lib/stores/timers';

  let timersValue = [];
  let showClock = false;

  enum ModalMode {
    Off,
    Edit,
  }

  let modalMode = ModalMode.Off;
  let editingID: string = null;

  const openEditModal = (id: string = null) => {
    editingID = id;
    modalMode = ModalMode.Edit;
  }

  const closeEditModal = () => {
    modalMode = ModalMode.Off;
    editingID = null;
  }

  onMount(() => {
    timers.subscribe(timers => timersValue = timers || []);
  });
</script>

{#if modalMode !== ModalMode.Off}
<div id="Filter">
  {#if modalMode === ModalMode.Edit }
    <TimerEditMenu on:close={() => closeEditModal()} {editingID} />
  {/if}
</div>
{/if}

<main>
  <header>
    <img id="Logo" src="icon.svg" alt="T-0 Logo" />
    <span class="flex-grow"></span>

    <div class="radio-group">
      <input type="radio" bind:group={showClock} name="showClock" id="showClockFalse" value={false}>
      <label for="showClockFalse">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
      </label>
      
      <input type="radio" bind:group={showClock} name="showClock" id="showClockTrue" value={true}>
      <label for="showClockTrue">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      </label>
    </div>

    <button id="show-add" on:click={() => openEditModal()}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
    </button>
  </header>
  
  {#if timersValue?.length}
  <div class="countdown-flow">
    {#each timersValue.sort((a, b) => a.date - b.date) as timer, index (timer)}
      <Countdown 
        name={timer.name} 
        date={timer.date}
        id={timer.id}
        {showClock}
        on:edit={e => openEditModal(e.detail)}
      />
    {/each}
  </div>
  {:else}
    <div class="timers-hint">
      <h2>Try Creating a Timer</h2>
      <p>Press the plus button to get started</p>
    </div>
  {/if}
</main>

<Help />

<style lang="scss">
  main {
    flex-grow: 1;
    padding: 1rem;
  }

  .countdown-flow {
    display: grid;
    grid: auto-flow / repeat(4, 1fr);
    grid-gap: 1rem;
  }

  .timers-hint {
    opacity: 0.3;
    text-align: center;
    h2 { padding-top: 5rem; }
  }

  #Filter {
    z-index: 98;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba($color: #000000, $alpha: 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  header {
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 1rem;
  }

  header img { height: 3rem; }

  .flex-grow { flex-grow: 1; }

  #show-add { margin-left: 1ch; }

  @media screen and (max-width: 1000px) {
    .countdown-flow { grid-template-columns: repeat(3, 1fr); }
  }
  @media screen and (max-width: 700px) {
    .countdown-flow { grid-template-columns: repeat(2, 1fr); }
  }
  @media screen and (max-width: 400px) {
    .countdown-flow { grid-template-columns: 1fr; }
  }
  
  @media (prefers-color-scheme: light) {
    #Logo { filter: invert(100%); }
    .modal { background-color: $background-light-theme; }
  }
</style>