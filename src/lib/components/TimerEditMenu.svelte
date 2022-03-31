<script lang="ts">
  import { timers } from "$lib/stores/timers";

  import { onMount } from "svelte";
  import { createEventDispatcher } from 'svelte';

  export let editingID: string = null;

  const dispatch = createEventDispatcher();

  // TODO: make this into a store
  let editingName;
  let editingDate;
  let editingTime;

  // TODO: Make this into a derived store
  let editingRemaining = editingName + editingDate;

  const closeMenu = () => dispatch('close');

  // TODO: Implement create timer method
  const saveTimer = (id, name, date, time) => {
    timers.add({
      name,
      date: new Date(`${date}T${time}Z`).getTime()
    });
    closeMenu();
  }

  onMount(() => {
    if (editingID)
      timers.subscribeTimer(editingID, timer => {
        editingName = timer.name;
        editingDate = new Date(timer.date).toISOString().split('T')[0];
        editingTime = new Date(timer.date).toISOString().split('T')[1];
      });
  })
</script>

{editingID}

<div class="modal">
  <div class="header">
    <span class="title">{editingID ? 'Edit' : 'Add'} Timer</span>
  </div>
  <div class="body">
    <!-- TODO: Validation for inputs -->
    <input type="text" placeholder="Name" bind:value={editingName} />
    <input type="date" bind:value={editingDate} />
    <input type="time" bind:value={editingTime} />
  </div>
  <div class="footer">
    {#if editingRemaining.days}
      <span><b>{editingRemaining.days}</b> days <b>{editingRemaining.hours}</b> hours <b>{editingRemaining.minutes}</b> minutes <b>{editingRemaining.seconds}</b> seconds from now</span>
    {/if}
    <span class="flex-grow"></span>
    <button class="transparent" on:click={() => closeMenu()}>Cancel</button>
    <button on:click={() => saveTimer(editingID, editingName, editingDate, editingTime)}>{editingID ? 'Save' : 'Add'}</button>
  </div>
</div>

<style lang="scss">
  .modal {
    z-index: 99;
    position: absolute;
    background-color: $background-dark-theme;
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
</style>