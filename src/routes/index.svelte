<script lang="ts">
  import Countdown from '../components/Countdown.svelte';
  import { page } from '$app/stores'
  import { goto } from '$app/navigation';
  import { onMount, validate_each_argument } from 'svelte/internal';

  interface Timer {
    name: string;
    date: number;
  }

  let timers: Timer[] = [];

  let showClock = false;
  let showAdd = false;
  let newName = '';
  let newDate = '';
  let newTime = '';

  const toggleClock = () => showClock = !showClock;
  const clearAdd = () => {
    newName = '';
    newDate = '';
    newTime = '';
  }
  const toggleAdd = () => {
    clearAdd();
    showAdd = !showAdd;
  };

  const saveTimers = () => {
    localStorage.setItem('timers', timers.map(({ name, date }) => `${name}=${date}`).join(','))
  }

  const addTimer = () => {
    let timer = { name: newName, date: (new Date(`${newDate}T${newTime}`)).getTime() }
    timers.push(timer)
    timers = timers;
    
    showAdd = false;
    clearAdd();
    saveTimers();
  }

  const updateTimer = (i: number) => {
    timers[i].name = prompt('Enter new name') || timers[i].name;
    timers[i].date = (new Date(prompt('Enter new date')).getTime() || timers[i].date);
    saveTimers();
  }

  const removeTimer = (i: number) => {
    timers.splice(i, 1);
    timers = timers;
    saveTimers();
  };

  onMount(() => {
    timers = localStorage.getItem('timers')
      ?.split(',')
      .filter(a => a)
      .map(timer => {
        const [ name, millis ] = timer.split('=');
        // Error checking (both defined, types, etc.)
        return { name, date: Number(millis) };
      })
      .filter(val => val && val.name && val.date) || [];
  });
</script>

<header>
  <img id="Logo" src="icon.svg" alt="T-0 Logo" />
  <span class="flex-grow"></span>
  <button id="show-clock" on:click={toggleClock}>{showClock ? 'Hide' : 'Show'} Clock</button>
  {#if showAdd}
  <div id="add-timer">
    <input type="text" placeholder="Name" bind:value={newName} />
    <input type="date" bind:value={newDate} />
    <input type="time" bind:value={newTime} />
    <button type="button" on:click={addTimer}>Add</button>
  </div>
  {/if}
  <button id="show-add" on:click={toggleAdd}>{showAdd ? 'Cancel' : '+'}</button>
</header>

<div class="countdown-flow">
  {#each timers.sort(({ date: dateA }, { date: dateB }) => dateA - dateB) as { name, date }, index}
    <Countdown
      {name} {date} {showClock} {index}
      on:done={e => removeTimer(e.detail)}
      on:update={e => updateTimer(e.detail)} 
    />
  {/each}
</div>

<style lang="scss">
  @import '../_theme';

  :global(body) { background-color: $background--dark; }
  :global(a), :global(input), :global(input::placeholder), :global(body) { color: $text--dark; }

  * {
    font-family: 'Inter', sans-serif;
  }

  .countdown-flow {
    display: grid;
    grid: auto-flow / repeat(4, 1fr);
    grid-gap: 1rem;
    /* align-items: stretch;
    flex-wrap: wrap; */
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

  .modal {
    z-index: 99;
    position: absolute;
    background-color: $background--dark;
    margin: auto;
    border-radius: 2rem;

    &>* {
      padding: 1rem;
    }
    
    .title {
      border-bottom: 1px solid $primary;
    }
  }

  @media screen and (max-width: 1000px) {
    .countdown-flow { grid-template-columns: repeat(3, 1fr); }
  }
  @media screen and (max-width: 700px) {
    .countdown-flow { grid-template-columns: repeat(2, 1fr); }
  }
  @media screen and (max-width: 400px) {
    .countdown-flow { grid-template-columns: 1fr; }
  }


  header {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 1rem 0;
  }

  header img { height: 3rem; }

  .flex-grow { flex-grow: 1; }

  #add-timer { margin-left: 4ch; }
  #show-add { margin-left: 1ch; }

  button {
    outline: none;
    border: 2px solid $primary-hover;
    color: $primary-hover;
    font-weight: bold;
    background: transparent;
    border-radius: 1000rem;
    padding: .5rem .8rem;
  }
  button:hover {
    color: white;
    background: $primary-hover;
    cursor: pointer;
  }

  input {
    outline: none;
    border: 2px solid $primary;
    // color: $text;
    font-weight: bold;
    background: transparent;
    border-radius: 1000rem;
    padding: .5rem .8rem;

    &::placeholder {
      // color: $text;
      opacity: 1;
    }

    &:hover {
      background: $primary-hover;
      border-color: $primary-hover;
      cursor: pointer;
    }
    
    &:focus {
      background: $primary;
      border-color: $primary;
      // color: $text;
      &::placeholder { opacity: 0.8; }
    }
  }

  @media (prefers-color-scheme: light) {
    :global(body) { background-color: $background--light; }
    :global(a), :global(input), :global(input::placeholder), :global(body) { color: $text--light; }
    #Logo { filter: invert(100%); }
    .modal { background-color: $background--light; }
  }
</style>