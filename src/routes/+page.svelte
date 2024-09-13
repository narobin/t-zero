<script lang="ts">
    let name = "";
    let date = 0;
    let lastUUID = "";

    const createTimer = () => {
        const uuid = crypto.randomUUID();

        fetch(`/api/timer/${uuid}`, {
            method: "PUT",
            body: JSON.stringify({
                name,
                date,
            })
        });

        name = "";
        date = 0;
        lastUUID = uuid;
    }
</script>

<input type="text" placeholder="name" bind:value={name} />
<input type="number" placeholder="date" bind:value={date} />

<button on:click={createTimer}>submit</button>

<p>Last UUID: {lastUUID}</p>
