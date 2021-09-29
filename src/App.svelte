<script>
  import { Router, Route, Link } from 'svelte-navigator';
  import Login from './Login.svelte';
  import PrivateRoute from './PrivateRoute.svelte';
  import { user } from './stores';
  import { initializeApp } from 'firebase/app';
  import { onMount } from 'svelte';
  import { firebaseConfig } from '../config/config';
  import { getAuth, signOut } from 'firebase/auth';


  onMount(()=> initializeApp(firebaseConfig));

  function handleLogout() {
    const auth = getAuth();
    signOut(auth).then(() => {
    }).catch((error) => {
      console.log('An error happened.\nError:\n', error);
    });
    $user = null;
  }
</script>

<Router>
    <header>
        <h1>recycle things!</h1>
        <nav>
            <Link to='/'>home</Link>
            <Link to='about'>about</Link>
            <Link to='profile'>profile</Link>
            <Link to='admin'>admin</Link>
        </nav>
    </header>

    <main>
        <Route path='login'>
            <Login />
        </Route>

        <Route path='/'>
            <h3>Home</h3>
            <p>this is the homepage</p>
        </Route>

        <Route path='about'>
            <h3>About</h3>
            <p>this is the about page</p>
        </Route>

        <PrivateRoute path='admin' let:location>
            <h3>admin</h3>
            <p>now you can admin things</p>
            <button on:click={handleLogout}>Logout</button>
        </PrivateRoute>

        <PrivateRoute path='profile' let:location>
            <h3>welcome, {$user.email}</h3>
            <button on:click={handleLogout}>logout</button>
        </PrivateRoute>
    </main>
</Router>
