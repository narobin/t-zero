<script lang="ts">
    import {auth} from "$lib/stores/auth";

    let email = "";

    const register = () => auth.register(email);
    const login = () => auth.login(email);
</script>

{#if $auth.isLoggedIn}
    yay, you're logged in
{:else}
    <input type="email" bind:value={email} placeholder="email" />

    <button on:click={register}>register</button>
    <button on:click={login}>log in</button>

{/if}

<style lang="scss">

</style>
