<script>
  import LoginPage from './pages/LoginPage.svelte';
  import Homepage from "./pages/Homepage.svelte";
  import About from "./pages/About.svelte";
  import BlogPage from "./pages/Blog.svelte";
  import { Router, Route, Link } from 'svelte-routing';

  let path = window.location.pathname;
</script>

<Router url={window.location.pathname}>
  <div class="container">
    <nav>
      <Link to="/">home</Link>
      <Link to="/login">log in</Link>
      <Link to="/blog">blog</Link>
      <Link to="/about">about</Link>
    </nav>
    <Route path="/"><Homepage/></Route>
    <Route path="/login"><LoginPage/></Route>
    <Route path="/blog"><BlogPage/></Route>
    <Route path="/about"><About/></Route>
  </div>
</Router>
