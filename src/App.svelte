<script>
  import SignInPage from './pages/SignInPage.svelte';
  import Homepage from "./pages/Homepage.svelte";
</script>

<Homepage/>
{#if window.location.pathname === '/sign-in'}
  <SignInPage />
{/if}
