<script>
    import { handleLogout } from '../../stores/user';
</script>

<div data-testid='admin-page'>
    <h3>admin</h3>
    <p>now you can admin things</p>
    <button on:click={handleLogout}>Logout</button>
</div>