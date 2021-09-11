<script>
    let disabled = true;
    let pw1, pw2;

    const evaluatePwEquality1 = (event) => {
      pw1 = event.target.value;
      if (pw1 === pw2) disabled = false;
    };
    const evaluatePwEquality2 = (event) => {
      pw2 = event.target.value;
      if (pw1 === pw2) disabled = false;
    };
</script>

<h1>sign up</h1>
<label for="username">username</label><input id="username"/>
<label for="email">email</label><input id="email"/>
<label for="password">
    password
</label>
<input type="password"
       id="password"
       bind:value={pw1}
       on:input={evaluatePwEquality1}/>
<label for="repeat-password">
    re-type password
</label>
<input type="password"
       id="repeat-password"
       bind:value={pw2}
       on:input={evaluatePwEquality2}/>
<button {disabled}>
    sign up
</button>
