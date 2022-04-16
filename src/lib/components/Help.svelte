<script lang="ts">
  let open = false;
  let showShareCopied = false;

  const toggle = () => open = !open;

  const openLink = (url: string) => window.open(url, '_blank');
  const copyToClipboard = (text: string) => navigator.clipboard.writeText(text);

  const copyShareToClipboard = () => {
    showShareCopied = true;
    copyToClipboard('https://narobin.com/tzero');
    setTimeout(() => showShareCopied = false, 1e3);
  }
</script>

<div class="help">
  {#if open} 
  <div class="help-menu">
    <header>Hi there! How can I help you today?</header>
    {#if !showShareCopied}
    <button class="transparent-hover" on:click={copyShareToClipboard}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-share"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg><span>Share T-Zero</span>
    </button>
    {:else}
    <span class="help-tip">Copied Link!</span>
    {/if}
    <button class="transparent-hover" on:click={() => openLink('https://notapplicablerobin.com')}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg><span>About the Creator</span>
    </button>
    <button class="transparent-hover" on:click={() => openLink('https://github.com/Nazrilof/t-zero')}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg><span>View the Source</span>
    </button>
    <!-- <button class="transparent-hover">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg><span>Get Help</span>
    </button> -->
  </div>
  {/if}
  <button class="help-button" on:click={toggle}>
    {#if open}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    {:else}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><g transform="matrix(1.98163,0,0,1.98163,-11.7845,-11.7774)"><path d="M9.09,9C9.511,7.802 10.65,6.996 11.92,6.996C13.566,6.996 14.92,8.35 14.92,9.996C14.92,9.997 14.92,9.999 14.92,10C14.92,12 11.92,13 11.92,13" /></g><g transform="matrix(1.98163,0,0,1.98163,-11.7845,-11.7774)"><path d="M12,17L12.01,17"/></g></svg>
    {/if}
  </button>
</div>

<style lang="scss">
  .help {
    position: fixed;
    bottom: 1rem;
    right: 1rem;

    display: flex;
    flex-direction: column;
    align-items: flex-end;

    width: max(10vw, 23ch);
    max-width: 90vw;
  }

  .help-button {
    border: 2px solid $primary;
    padding: .7rem;
    @include theme-background();
    @include theme-text();
    &:hover { background-color: $primary-hover; }
  }

  .help-tip {
    border-radius: .5rem;
    padding: .5rem;
    margin-top: .1rem;
    text-align: center;
    font-weight: bold;
    font-size: .85rem;
    @include theme-background-hover();
  }

  .help-menu {
    margin-bottom: .75rem;
    padding: 1rem;
    border: 2px solid $primary;
    border-radius: 1rem;
    @include theme-background();
    display: flex;
    flex-direction: column;
    align-items: stretch;

    header { 
      margin-bottom: 1rem;
      font-weight: bold;
    }
    footer { margin-top: 1rem; }

    button {
      border-radius: .5rem;
      padding: .5rem;
      margin-top: .1rem;
    }
  }
</style>