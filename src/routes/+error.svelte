<script lang="ts">
    import {page} from '$app/stores';
</script>

<div class="error">
    <p class="code">Error {$page.status}</p>
    <h1>{$page?.error.message}</h1>

</div>

<style lang="scss">
    .error {
      text-align: center;
      .code {
        padding: 0.5em 1em;
        background-color: $error-color;
        border-radius: 5rem;
        margin-bottom: 5rem;
        display: inline-block;
        font-size: 1.5rem;
        color: $bg-color;
      }
    }
</style>
