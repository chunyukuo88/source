<script>
    import { submissionHandler } from './utils';

    const recyclables = [
        { id: 1, category: 'automotive', name: 'motor oil'},
        { id: 2, category: 'automotive', name: 'car battery'},
        { id: 3, category: 'automotive', name: 'tires'},
        { id: 4, category: 'automotive', name: 'vehicle'},
    ];
    export let addressCity = '';
    export let addressState = '';
    export let addressStreet = '';
    export let addressZipCode = '';
    export let dba = '';
    export let phone = '';

    let selected;
    let recyclable = '';

    // TODO: https://recycle-7ae0b-default-rtdb.firebaseio.com/
</script>

<div data-testid='login-page'>
    <h3>Login</h3>
    <input bind:value={dba}
           data-testid='dba'
           type='text'
           name='dba'
           placeholder='Business name'/>
    <input bind:value={phone}
           data-testid='phone'
           type='tel'
           name='phone'
           placeholder='Phone'/>
    <select bind:value={selected} on:change="{() => recyclable = ''}">
        {#each recyclables as recyclable}
            <option value={recyclable}>
                {recyclable.category} - {recyclable.name}
            </option>
        {/each}
    </select>
    <input bind:value={addressCity}
           data-testid='addressCity'
           type='text'
           name='addressCity'
           placeholder='City'/>
    <input bind:value={addressState}
           data-testid='addressState'
           type='text'
           name='addressState'
           placeholder='OH'/>
    <input bind:value={addressStreet}
           data-testid='addressStreet'
           type='text'
           name='addressStreet'
           placeholder='City'/>
    <input bind:value={addressZipCode}
           data-testid='addressZipCode'
           type='addressState'
           name='addressZipCode'
           placeholder='Zip code'/>
    <button type='submit'
            data-testid='submit'
            name="submit"
            on:click|preventDefault={submissionHandler}>
        submit
    </button>
</div>

