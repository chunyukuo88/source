<script>
    import { sendFormDataToBackend } from './utils';

    let disabled;
    let username, email, password, confirmPw;

    $: disabled = (password && confirmPw)
      ? (password !== confirmPw )
      : true;

    const submit = () => {
      sendFormDataToBackend(username, email, password);
      alert('Form data has been submitted');
      _resetFormValues();
    }

    function _resetFormValues(){
      username = '';
      email = '';
      password = '';
      confirmPw = '';
    }
</script>

<h1>sign up</h1>
<label for="username">username</label>
<input id="username"
       bind:value={username}/>

<label for="email">email</label>
<input id="email"
       bind:value={email}/>

<label for="password">password</label>
<input type="password"
       id="password"
       bind:value={password}/>

<label for="confirmPw">re-type password</label>
<input type="password"
       id="confirmPw"
       bind:value={confirmPw}/>

<button {disabled} on:click|preventDefault={submit}>
    sign up
</button>
