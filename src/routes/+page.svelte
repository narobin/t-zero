<script lang="ts">
    import {auth} from "$lib/stores/auth";
    import Timer from "$lib/components/Timer.svelte";

    let name = "";
    let datetime = "";
    $: date = new Date(datetime).getTime();

    let dialog: HTMLDialogElement;

    let timers: { name: string, date: number, uuid: string }[] = [];

    $: sortedTimers = timers.sort((a, b) => a.date - b.date);

    const createTimer = async () => {
        if (!name || !datetime)
            return;

        const uuid = crypto.randomUUID();

        timers = [{ name, date, uuid }, ...timers];

        await fetch(`/api/timers/${uuid}`, {
            method: "PUT",
            body: JSON.stringify({
                name,
                date,
            })
        });

        name = "";
        datetime = "";
        dialog.close();
    }

    const openDialog = () => dialog.showModal();
</script>

{#if $auth.isLoggedIn}
    <dialog bind:this={dialog}>
        <input type="text" placeholder="name" bind:value={name} />
        <input type="datetime-local" bind:value={datetime} />
        <button on:click={() => dialog.close()}>cancel</button>
        <button on:click={createTimer}>submit</button>
    </dialog>

{:else}
    <h2>Please register or log in</h2>
{/if}

{#each timers as timer}
    <Timer name={timer.name} date={timer.date} uuid={timer.uuid} />
{/each}

<button id="Create" on:click={openDialog}>+</button>

<style lang="scss">
  #Create {
    display: block;
    margin: auto;
    font-weight: bold;
    font-size: 2rem;
    border-radius: 100%;
    padding: 0.3em 0.65em;
  }
</style>
