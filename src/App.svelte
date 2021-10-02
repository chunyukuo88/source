<script>
  import { Router, Route, Link } from 'svelte-routing';
  import Login from './pages/Login/Login.svelte';
  import PrivateRoute from './PrivateRoute.svelte';
  import { user } from './stores';
  import { initializeApp } from 'firebase/app';
  import { onMount } from 'svelte';
  import { firebaseConfig } from '../config/config';
  import { routes } from './routes';
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
            <Link to={routes.HOME}>home</Link>
            <Link to={routes.ABOUT}>about</Link>
            <Link to={routes.PROFILE}>profile</Link>
            <Link to={routes.ADMIN}>admin</Link>
        </nav>
    </header>

    <main>
        <Route path={routes.LOGIN}>
            <Login />
        </Route>

        <Route path={routes.HOME}>
            <div data-testid='home-page'>
                <h3>Home</h3>
                <p>this is the homepage</p>
            </div>
        </Route>

        <Route path={routes.ABOUT}>
            <div data-testid='about-page'>
                <h3 data-testId='about page'>About</h3>
                <p>this is the about page</p>
            </div>
        </Route>

        <PrivateRoute path={routes.ADMIN} let:location>
            <div data-testid='admin-page'>
                <h3>admin</h3>
                <p>now you can admin things</p>
                <button on:click={handleLogout}>Logout</button>
            </div>
        </PrivateRoute>

        <PrivateRoute path={routes.PROFILE} let:location>
            <div data-testid='profile-page'>
                <h3>welcome, {$user.email}</h3>
                <button on:click={handleLogout}>logout</button>
            </div>
        </PrivateRoute>
    </main>
</Router>
