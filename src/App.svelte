<script>
  import { Router, Route, Link } from "svelte-navigator";
  import Login from "./Login.svelte";
  import PrivateRoute from "./PrivateRoute.svelte";
  import { user } from "./stores";
  import { initializeApp } from 'firebase/app';
  import { onMount } from 'svelte';

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

  function handleLogout() {
    $user = null;
  }
</script>

<Router>
    <header>
        <h1>History</h1>

        <nav>
            <Link to="/">Home</Link>
            <Link to="about">About</Link>
            <Link to="profile">Profile</Link>
        </nav>
    </header>

    <main>
        <Route path="login">
            <Login />
        </Route>

        <Route path="/">
            <h3>Home</h3>
            <p>Home sweet home...</p>
        </Route>

        <Route path="about">
            <h3>About</h3>
            <p>That's what it's all about!</p>
        </Route>

        <PrivateRoute path="profile" let:location>
            <h3>Welcome {$user.username}</h3>
            <button on:click={handleLogout}>Logout</button>
        </PrivateRoute>
    </main>
</Router>
