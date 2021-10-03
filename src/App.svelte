<script>
  import { Router, Route, Link } from 'svelte-routing';
  import { initializeApp } from 'firebase/app';
  import { onMount } from 'svelte';

  import About from './pages/About/About.svelte';
  import Admin from './pages/Admin/Admin.svelte';
  import DarkModeButton from './DarkModeButton.svelte';
  import Home from './pages/Home/Home.svelte';
  import Login from './pages/Login/Login.svelte';
  import PrivateRoute from './PrivateRoute.svelte';
  import Profile from './pages/Profile/Profile.svelte';
  
  import { firebaseConfig } from '../config/config';
  import { routes } from './routes';

  onMount(()=> initializeApp(firebaseConfig));
</script>

<Router>
    <header>
        <h1>recycle things!</h1>
        <nav>
            <Link to={routes.HOME}>home</Link>
            <Link to={routes.ABOUT}>about</Link>
            <Link to={routes.PROFILE}>profile</Link>
            <Link to={routes.ADMIN}>admin</Link>
            <DarkModeButton>
                Dark Mode
            </DarkModeButton>
        </nav>
    </header>
    <main>
        <Route path={routes.LOGIN}>
            <Login />
        </Route>
        <Route path={routes.HOME}>
            <Home />
        </Route>
        <Route path={routes.ABOUT}>
            <About />
        </Route>
        <PrivateRoute path={routes.ADMIN} let:location>
            <Admin />
        </PrivateRoute>
        <PrivateRoute path={routes.PROFILE} let:location>
            <Profile/>
        </PrivateRoute>
    </main>
</Router>

<style>
    :global(body) {
        background-color: #f2eee2;
        color: #0084f6;
        transition: background-color 0.3s
    }
    :global(body.dark-mode) {
        background-color: #1d3040;
        color: #bfc2c7;
    }
</style>