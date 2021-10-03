<script>
    import { handleLogout } from '../../stores/user';
    import { user } from '../../stores/user';
</script>

<div data-testid='profile-page'>
    <h3 data-testid="welcome">welcome, {$user.email}</h3>
    <button on:click={handleLogout}>logout</button>
</div>