<script>
  import { navigate } from 'svelte-routing';
  import { user } from './stores';
  import { routes } from './routes';

  $: if (!$user) {
    navigate(routes.LOGIN);
  }
</script>

{#if $user}
    <slot />
{/if}
