<script>
  import LoginPage from './pages/LoginPage.svelte';
  import Homepage from "./pages/Homepage.svelte";
  import About from "./pages/About.svelte";
  import BlogPage from "./pages/Blog.svelte";
  let path = window.location.pathname;

  const navBarHandler = (event) => {
    path = event.target.attributes.href.value;
    window.history.pushState({}, '', path);
  }
</script>

<div class="container">
  <nav>
    <a href="/" on:click={navBarHandler}>home</a>
    <a href="/login" on:click={navBarHandler}>log in</a>
    <a href="/blog" on:click={navBarHandler}>blog</a>
  </nav>
  {#if path === '/'}
    <Homepage/>
  {:else if path === '/login'}
    <LoginPage />
  {:else if path === '/blog'}
    <BlogPage />
  {:else}
    <About />
  {/if}
</div>