<script>
  import LoginPage from './pages/LoginPage/LoginPage.svelte';
  import Homepage from './pages/Homepage.svelte';
  import About from './pages/About.svelte';
  import AdminPage from './pages/AdminPage/AdminPage.svelte';
  import BlogPage from './pages/Blog.svelte';
  import { Router, Route, Link } from 'svelte-routing';
  import { initializeApp } from 'firebase/app';
  import { onMount } from 'svelte';
  import { routes } from './pages/routes';

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
      <Link to={routes.HOME}>home</Link>
      <Link to={routes.LOGIN}>log in</Link>
      <Link to={routes.BLOG}>blog</Link>
      <Link to={routes.ABOUT}>about</Link>
    </nav>
    <Route path={routes.HOME}><Homepage/></Route>
    <Route path={routes.LOGIN}><LoginPage/></Route>
    <Route path={routes.BLOG}><BlogPage/></Route>
    <Route path={routes.ABOUT}><About/></Route>
    <Route path={routes.ADMIN}><AdminPage/></Route>
  </div>
</Router>
