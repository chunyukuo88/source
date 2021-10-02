<script>
  import { handleSubmit } from '../../stores/user';
  let username;
  let password;
</script>

<div data-testid='login-page'>
    <h3>Login</h3>
    <input bind:value={username}
           data-testid='username'
           type='text'
           name='username'
           placeholder='Username'/>
    <input bind:value={password}
           data-testid='password'
           type='password'
           name='password'
           placeholder='Password'/>
    <button type='submit'
            data-testid='submit'
            on:click|preventDefault={() => handleSubmit(username, password)}>
        Login
    </button>
</div>
