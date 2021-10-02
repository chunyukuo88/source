<script>
  import { navigate } from 'svelte-routing';
  import { user } from './stores/user';
  import { routes } from './routes';

  $: if (!$user) {
    navigate(routes.LOGIN);
  }
</script>

{#if $user}
    <slot />
{/if}
