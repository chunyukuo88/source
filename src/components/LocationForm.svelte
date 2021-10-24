<script>
    import { submissionHandler,
        inputsAreTooShort
    } from './utils';
    import { createLocationInfo } from '../utils/LocationInfo';

    // TODO: Figure out how to organize this and where best to put it.
    const recyclables = [
        { id: 1, category: 'automotive', name: 'motor oil'},
        { id: 2, category: 'automotive', name: 'car battery'},
        { id: 3, category: 'automotive', name: 'tires'},
        { id: 4, category: 'automotive', name: 'vehicle'},
    ];

    let locationInfo = createLocationInfo();

    $: isDisabled = (inputsAreTooShort(locationInfo)) && true;
</script>

<div data-testid='login-page'>
    <h3>Login</h3>
    <input bind:value={locationInfo.dba}
           data-testid='dba'
           type='text'
           name='dba'
           placeholder='Business name'/>
    <input bind:value={locationInfo.phone}
           data-testid='phone'
           type='tel'
           name='phone'
           placeholder='Phone'/>
    <select data-testid="dropdown" bind:value={locationInfo.selected}>
        {#each recyclables as recyclable}
            <option value={recyclable}>{recyclable.name}</option>
        {/each}
    </select>
    <p id="user-selection">Your selection: {locationInfo.selected.name}</p>
    <input bind:value={locationInfo.addressCity}
           data-testid='addressCity'
           type='text'
           name='addressCity'
           placeholder='City'/>
    <input bind:value={locationInfo.addressState}
           data-testid='addressState'
           type='text'
           name='addressState'
           placeholder='OH'/>
    <input bind:value={locationInfo.addressStreet}
           data-testid='addressStreet'
           type='text'
           name='addressStreet'
           placeholder='City'/>
    <input bind:value={locationInfo.addressZipCode}
           data-testid='addressZipCode'
           type='addressState'
           name='addressZipCode'
           placeholder='Zip code'/>
    <input bind:value={locationInfo.note}
           data-testid='note'
           type='note'
           name='note'
           placeholder='Note'/>
    {#if isDisabled}
        <button name="submit" disabled>submit</button>
    {:else}
        <button name="submit"
                on:click|preventDefault={()=>submissionHandler(locationInfo)}>
            submit
        </button>
    {/if}
</div>

