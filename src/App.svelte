<script>
  import SignInPage from './pages/LoginPage.svelte';
  import Homepage from "./pages/Homepage.svelte";
  import About from "./pages/About.svelte";

  let path = window.location.pathname;
</script>

<div class="container">
  <nav>
    <a href="/">Home</a>
    <a href="/login">Log In</a>
  </nav>
  {#if path === '/'}
    <Homepage/>
  {:else if path === '/login'}
    <SignInPage />
  {:else}
    <About />
  {/if}
</div>