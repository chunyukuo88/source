<script>
    import { submissionHandler, inputsAreTooShort, recyclables } from './utils';
    import { createLocationInfo } from '../utils/locationUtils';

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
    <select data-testid='dropdown' bind:value={locationInfo.selected}>
        {#each recyclables as recyclable}
            <option value={recyclable}>{recyclable.name}</option>
        {/each}
    </select>
    <p id='user-selection'>Your selection: {locationInfo.selected.name}</p>
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
        <p>test</p>
        <button name='disabled-submit-button' disabled>
            form incomplete
        </button>
    {:else}
        <button name='enabled-submit-button'
                on:click|preventDefault={()=>submissionHandler(locationInfo)}
        >
            submit
        </button>
    {/if}
</div>

