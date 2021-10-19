<script lang="ts">
  import Countdown from '../components/Countdown.svelte';

  interface Timer {
    name: string;
    date: Date;
  }

  let timers: Timer[] = [
    { name: 'B-Day', date: new Date('2022-02-28 00:00') },
    { name: 'Graduation', date: new Date('2022-05-22 18:00') },
    { name: 'DC Trip', date: new Date('2022-05-27 03:30') },
    { name: 'Boulder/Seattle', date: new Date('2022-03-26 00:00') },
  ];

  timers = timers.sort(({ date: dateA }, { date: dateB }) => dateA.getTime() - dateB.getTime());

  let showClock = false;

  function toggleClock() {
    showClock = !showClock;
  }
</script>

<h1>T-0</h1>

<button on:click={toggleClock}>{showClock ? 'Hide' : 'Show'} Clock</button><br>

<div class="countdown-flow">
  {#each timers as { name, date }, i}
  <div class="countdown">
    <span class="title">{name}</span>
    <Countdown date={date} showClock={showClock} /><br>
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
</style>