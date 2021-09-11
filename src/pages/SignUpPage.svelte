<script>
    let disabled = true;
    let password, confirmPw;

    $: disabled = (password && confirmPw)
      ? (password !== confirmPw )
      : true;
</script>

<h1>sign up</h1>
<label for="username">username</label><input id="username"/>
<label for="email">email</label><input id="email"/>
<label for="password">
    password
</label>
<input type="password"
       id="password"
       on:input={event => password = event.target.value}/>
<label for="repeat-password">
    re-type password
</label>
<input type="password"
       id="repeat-password"
       on:input={event => confirmPw = event.target.value}/>
<button {disabled}>
    sign up
</button>
