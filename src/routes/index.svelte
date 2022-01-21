<script lang="ts">
  import Countdown from '$lib/components/Countdown.svelte';
  import Selector from '$lib/components/Selector.svelte';
  import { page } from '$app/stores'
  import { goto } from '$app/navigation';
  import { onMount, validate_each_argument } from 'svelte/internal';

  interface Timer {
    name: string;
    date: number;
  }

  let timers: Timer[] = [];

  let showClock = false;
  let showModal = false;
  let newName = '';
  let newDate = '';
  let newTime = '';
  let editIndex = -1;

  const toggleClock = () => showClock = !showClock;
  const clearModal = () => {
    newName = '';
    newDate = '';
    newTime = '';
  }
  const toggleModal = (state?: boolean) => {
    clearModal();
    showModal = state || !showModal;
    if (!state)
      editIndex = -1;
  };

  const saveTimers = () => {
    localStorage.setItem('timers', timers.map(({ name, date }) => `${name}=${date}`).join(','))
  }

  const createTimer = (name: string, date: string, time: string) => {
    if (editIndex > -1)
      removeTimer(editIndex);

    editIndex = -1;

    let timer = { name, date: (new Date(`${date}T${time}`)).getTime() }
    timers.push(timer)
    timers = timers;
    
    showModal = false;
    clearModal();
    saveTimers();
  }

  const starteditTimer = (i: number) => {
    toggleModal(true);
    const date = new Date(timers[i].date);
    date.setHours(date.getHours() - date.getTimezoneOffset()/60);
    const datetime = date.toISOString().split('T');
    console.log(datetime);
    
    newName = timers[i].name;
    newDate = datetime[0];
    newTime = datetime[1].substring(0,5);
    editIndex = i;
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

{#if showModal}
<div id="Filter">
  <div class="modal">
    <div class="header">
      <span class="title">{editIndex > -1 ? 'Edit' : 'Add'} Timer</span>
      <span class="flex-grow"></span>
      <button on:click={() => toggleModal()}>×</button>
    </div>
    <div class="body">
      <input type="text" placeholder="Name" bind:value={newName} />
      <input type="date" bind:value={newDate} />
      <input type="time" bind:value={newTime} />
      <span class="flex-grow"></span>
      <button type="button" on:click={() => createTimer(newName, newDate, newTime)}>{editIndex > -1 ? 'Save' : 'Add'}</button>
    </div>
  </div>
</div>
{/if}

<main>
  <header>
    <img id="Logo" src="icon.svg" alt="T-0 Logo" />
    <span class="flex-grow"></span>
    <button id="show-clock" on:click={toggleClock}>{showClock ? 'Hide' : 'Show'} Clock</button>
    <button id="show-add" on:click={() => toggleModal()}>+</button>
    <Selector />
  </header>
  
  <div class="countdown-flow">
    {#each timers.sort(({ date: dateA }, { date: dateB }) => dateA - dateB) as timer, index (timer)}
      <Countdown
        name={timer.name} date={timer.date} {showClock} {index}
        on:done={e => removeTimer(e.detail)}
        on:edit={e => starteditTimer(e.detail)} 
      />
    {/each}
  </div>
</main>

<footer>
  <center>
    T-Zero™ by <a href="https://narobin.com" target="_blank">Noah Robinson</a>.
    View code on <a href="https://github.com/nazrilof/t-zero" target="_blank">GitHub</a>.
  </center>
  <a href="mailto:contact@narobin.com" >Need Help?</a>
</footer>

<style lang="scss">
  * {
    font-family: 'Inter', sans-serif;
  }

  main {
    flex-grow: 1;
    padding: 1em;
  }

  footer {
    padding: 1em;
    display: flex;
    center { flex-grow: 1; }
  }

  a {
    text-decoration: none;
    font-weight: bold;
    &:hover { text-decoration: underline .12em; }
  }

  .countdown-flow {
    display: grid;
    grid: auto-flow / repeat(4, 1fr);
    grid-gap: 1rem;
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
    width: clamp(20vw, 70ch, 80vw);

    &>* {
      padding: 1rem;
    }
    
    .header {
      border-bottom: 1px solid $primary;
      display: flex;
      align-items: center;
    }

    .title {
      font-weight: bold;
    }

    .body {
      display: flex;
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

  #show-add { margin-left: 1ch; }

  button {
    outline: none;
    border: 2px solid $primary;
    color: $primary;
    font-weight: bold;
    background: transparent;
    border-radius: 1000rem;
    padding: .5rem .8rem;
  }
  button:hover {
    color: white;
    background: $primary-hover;
    border-color: $primary-hover;
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

    & + input { margin-left: .5ch; }

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