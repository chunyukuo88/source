<script>
    import { sendFormDataToBackend } from './utils';
    import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
    import { authStore } from '../stores/authStore';

    let disabled;
    let username, email, password, confirmPw;

    $: disabled = (password && confirmPw)
      ? (password !== confirmPw )
      : true;

    const auth = getAuth();
    function login (auth, email, password) {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            authStore.set({
              isLoggedIn: true,
              user: userCredential.user,
            });
            console.log(authStore);
          })
          .catch((error) => {
            const { code, message } = error;
            console.log(`${code}\n${message}`);
          });
    }

</script>

<div data-testid="login page">
    <h1>log in</h1>
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

    <button {disabled}
            on:click|preventDefault={()=>login(auth, email, password)}>
        sign in
    </button>
</div>
