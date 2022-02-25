<script lang="ts">
  import Countdown from '$lib/components/Countdown.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { onMount } from 'svelte/internal';
  import { TimeRemaining } from '$lib/models/TimeRemaining';

  interface Timer {
    name: string;
    date: number;
  }

  let timers: Timer[] = [];

  let showClock = false;
  let showModal = false;
  let editingName = '';
  let editingDate = '';
  let editingTime = '';
  let editIndex = -1;

  let editingRemaining: TimeRemaining = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  const updateEditingRemaining = () => {
    const ms = (new Date(`${editingDate}T${editingTime}`)).getTime() - Date.now();
    
    editingRemaining = {
      days: Math.floor(ms / 864e5),
      hours: Math.floor(ms % 864e5 / 36e5),
      minutes: Math.floor(ms % 36e5 / 6e4),
      seconds: Math.floor(ms % 6e4 / 1e3),
    };
  };
  setInterval(updateEditingRemaining, 1e3);

  const clearModal = () => {
    editingName = '';
    editingDate = '';
    editingTime = '';
  }
  const toggleModal = (state?: boolean, i = -1) => {
    clearModal();

    if (i > -1) {
      const date = new Date(timers[i].date);
      date.setHours(date.getHours() - date.getTimezoneOffset()/60);
      const datetime = date.toISOString().split('T');
      
      editingName = timers[i].name;
      editingDate = datetime[0];
      editingTime = datetime[1].substring(0,5);
      editIndex = i;
    }
    
    showModal = state || !showModal;
    if (!state)
      editIndex = -1;

    updateEditingRemaining();
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

  const startEditTimer = (i: number) => {
    toggleModal(true);

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

  let test = 'Lorem';
</script>

{#if showModal}
<div id="Filter">
  <div class="modal">
    <div class="header">
      <span class="title">{editIndex > -1 ? 'Edit' : 'Add'} Timer</span>
    </div>
    <div class="body">
      <input type="text" placeholder="Name" bind:value={editingName} />
      <input type="date" bind:value={editingDate} />
      <input type="time" bind:value={editingTime} />
    </div>
    <div class="footer">
      {#if editingRemaining.days}
        <span><b>{editingRemaining.days}</b> days <b>{editingRemaining.hours}</b> hours <b>{editingRemaining.minutes}</b> minutes <b>{editingRemaining.seconds}</b> seconds from now</span>
      {/if}
      <span class="flex-grow"></span>
      <button class="transparent" on:click={() => toggleModal()}>Cancel</button>
      <button on:click={() => createTimer(editingName, editingDate, editingTime)}>{editIndex > -1 ? 'Save' : 'Add'}</button>
    </div>
  </div>
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

    <!-- <button id="show-clock" on:click={toggleClock}>{showClock ? 'Hide' : 'Show'} Clock</button> -->
    <button id="show-add" on:click={() => toggleModal()}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
    </button>
  </header>
  
  <div class="countdown-flow">
    {#each timers.sort(({ date: dateA }, { date: dateB }) => dateA - dateB) as timer, index (timer)}
      <Countdown
        name={timer.name} date={timer.date} {showClock} {index}
        on:done={e => removeTimer(e.detail)}
        on:edit={e => toggleModal(true, e.detail)} 
      />
    {/each}
  </div>
</main>

<Footer />

<button id="Help">
  <a href="mailto:contact@narobin.com">Need Help?</a>
</button>

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

  #Help {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    a:hover { text-decoration: none; }
  }

  .modal {
    z-index: 99;
    position: absolute;
    background-color: $background--dark;
    margin: auto;
    border-radius: 2rem;
    width: clamp(20vw, 70ch, 80vw);
    padding: 1rem;
    
    .header {
      margin-bottom: 1rem;
      padding: 0.5rem;
    }

    .title { font-weight: bold; }

    .body { display: flex; }

    .footer {
      margin-top: 1rem;
      display: flex;
      align-items: center;
    }
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
    .modal { background-color: $background--light; }
  }
</style>