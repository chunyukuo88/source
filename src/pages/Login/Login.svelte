<script>
  import { navigate } from 'svelte-routing';
  import { routes } from '../../routes';
  import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
  import { user } from '../../stores';

  let username;
  let password;

  async function handleSubmit(event) {
    event.preventDefault();
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, username, password);
    $user = userCredential.user;
    navigate(routes.ADMIN);
  }
</script>

<div data-testid='login-page'>
    <h3>Login</h3>
        <div data-testid='username'>
            <input bind:value={username} type='text' name='username' placeholder='Username'/>
        </div>
        <div data-testid='password'>
            <input bind:value={password} type='password' name='password' placeholder='Password'/>
        </div>
        <button type='submit' data-testid='submit' on:click={handleSubmit}>Login</button>
</div>
