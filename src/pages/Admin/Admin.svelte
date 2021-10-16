<script>
    import { handleLogout } from '../../stores/user';
    import LocationForm from "../../components/LocationForm.svelte";
</script>

<div data-testid='admin-page'>
    <h3>admin</h3>
    <LocationForm/>
    <button on:click={handleLogout}>Logout</button>
</div>