<script>
  // import { useNavigate, useLocation } from 'svelte-navigator';
  import { navigate } from 'svelte-routing';
  import { routes } from './routes';
  import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
  import { user } from './stores';

  // const navigate = useNavigate();
  // const location = useLocation();

  let username;
  let password;

  async function handleSubmit(event) {
    event.preventDefault();
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, username, password);
    console.log(userCredential);
    $user = userCredential.user;
    // const from = $location.state?.from || "/admin";
    navigate(routes.ADMIN);
  }
</script>

<div data-testid="ha">
    <h3>Login</h3>
    <form on:submit={handleSubmit}>
        <input
                bind:value={username}
                type="text"
                name="username"
                placeholder="Username"
        />
        <br />
        <input
                bind:value={password}
                type="password"
                name="password"
                placeholder="Password"
        />
        <br />
        <button type="submit">Login</button>
    </form>
</div>
