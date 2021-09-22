<script>
    import { submitLoginInfo } from './utils';
    import { navigate } from 'svelte-routing';

    let disabled;
    let username, email, password, confirmPw;

    $: disabled = (password && confirmPw) ? (password !== confirmPw ) : true;

    function _resetFormValues(){
      username = ''; email = ''; password = ''; confirmPw = '';
    }

    async function clickHandler(email, password) {
        try {
          await submitLoginInfo(email, password);
          _resetFormValues();
          navigate('/admin');
        } catch (error) {
          const { code, message } = error;
          console.log(`${code}\n${message}`);
        }
    }
</script>

<div data-testid="login page">
    <h1>log in</h1>

    <label for="username">username</label>
    <input id="username" bind:value={username}/>

    <label for="email">email</label>
    <input id="email" bind:value={email}/>

    <label for="password">password</label>
    <input type="password" id="password" bind:value={password}/>

    <label for="confirmPw">re-type password</label>
    <input type="password" id="confirmPw" bind:value={confirmPw}/>

    <button {disabled}
            on:click|preventDefault={()=>clickHandler(email, password)}>
        sign in
    </button>
</div>
