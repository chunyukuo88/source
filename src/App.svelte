<script>
  import { Router, Route, Link } from 'svelte-routing';
  import { initializeApp } from 'firebase/app';
  import { onMount } from 'svelte';

  import Login from './pages/Login/Login.svelte';
  import Home from './pages/Home/Home.svelte';
  import About from './pages/About/About.svelte';
  import PrivateRoute from './PrivateRoute.svelte';
  import Admin from './pages/Admin/Admin.svelte';
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
