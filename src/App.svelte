<script>
  import SignInPage from './pages/SignInPage.svelte';
  import Homepage from "./pages/Homepage.svelte";
  import About from "./pages/About.svelte";

  let path = window.location.pathname;
</script>

{#if path === '/'}
  <Homepage/>
{:else if path === '/sign-in'}
  <SignInPage />
{:else}
  <About />
{/if}
