<script lang="ts">
  import Countdown from '../components/Countdown.svelte';
  import { page } from '$app/stores'
  import { goto } from '$app/navigation';
  import { validate_each_argument } from 'svelte/internal';

  interface Timer {
    name: string;
    date: Date;
  }

  let timers: Timer[] = [];

  $page.query.forEach((millis, name) => timers.push({ name, date: new Date(Number(millis)) }));

  timers = timers
    .filter(val => val && val.name && val.date)
    .sort(({ date: dateA }, { date: dateB }) => dateA.getTime() - dateB.getTime());

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

  function addTimer() {
    let timer = { name: newName, date: new Date(`${newDate}T${newTime}`) }
    showAdd = false;
    clearAdd();

    timers.push(timer)
    timers = timers;

    $page.query.append(timer.name, timer.date.getTime().toString())
    goto(`?${$page.query.toString()}`)
  }

  function removeTimer(i: number) {
    $page.query.delete(timers.splice(i, 1)[0].name);
  }
</script>

<header>
  <img src="icon.svg" alt="T-0 Logo" />
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
  {#each timers as { name, date }, i}
  <div class="countdown">
    <span class="title">{name}</span>
    <Countdown date={date} showClock={showClock} index={i} on:done={e => removeTimer(e.detail)} /><br>
  </div>
  {/each}
</div>

<style>
  * {
    font-family: 'Inter', sans-serif;
  }

  .countdown-flow {
    display: flex;
    align-items: stretch;
    flex-wrap: wrap;
  }

  .countdown {
    text-align: center;
    padding: 1rem;
    border: solid 1px lightgray;
    border-radius: 1rem;
    flex-grow: 1;
    flex-basis: 0;
  }

  .countdown .title {
    font-size: 2rem;
    display: block;
    margin-bottom: .5rem;
  }

  .countdown + .countdown {
    margin-left: 1rem;
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
    border: 2px solid rgb(73, 73, 245);
    color: rgb(73, 73, 245);
    font-weight: bold;
    background: white;
    border-radius: 1000rem;
    padding: .5rem .8rem;
  }
  button:hover {
    color: white;
    background: rgb(73, 73, 245);
    cursor: pointer;
  }

  input {
    outline: none;
    border: 2px solid black;
    color: black;
    font-weight: bold;
    background: white;
    border-radius: 1000rem;
    padding: .5rem .8rem;
  }
  input:hover {
    background: hsla(240, 90%, 80%, 50%);
    cursor: text;
  }
  input:focus {
    background: hsla(240, 90%, 62%, 90%);
    color: white;
  }
</style>