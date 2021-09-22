<script>
  import LoginPage from './pages/LoginPage/LoginPage.svelte';
  import Homepage from './pages/Homepage.svelte';
  import About from './pages/About.svelte';
  import AdminPage from './pages/AdminPage/AdminPage.svelte';
  import BlogPage from './pages/Blog.svelte';
  import { Router, Route, Link } from 'svelte-routing';
  import { initializeApp } from 'firebase/app';
  import { onMount } from 'svelte';

  let path = window.location.pathname;

  const firebaseConfig = {
    apiKey: "AIzaSyAkn-EgoWA1BNFgaGCSfmj_44T2wVFea80",
    authDomain: "recycle-7ae0b.firebaseapp.com",
    projectId: "recycle-7ae0b",
    storageBucket: "recycle-7ae0b.appspot.com",
    messagingSenderId: "404648080932",
    appId: "1:404648080932:web:5a11bc3d65d8a2e9550ab1",
    measurementId: "G-JDV4JW27NQ"
  };

  onMount(()=>{
    initializeApp(firebaseConfig);
  });
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
    <Route path="/admin"><AdminPage/></Route>
  </div>
</Router>
