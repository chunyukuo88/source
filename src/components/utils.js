import { getDatabase, ref, set } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../config/config';

initializeApp(firebaseConfig)

const baseUrl = (id) => `/locations/${id}`;

export function submissionHandler(locationInfo){
    // TODO: do try/catch for this.
    const database = getDatabase();
    const { id } = locationInfo;
    const url = baseUrl(id);
    set(ref(database, url), locationInfo);
    console.log(`submissionHandler(): ${url}`);

};

export const inputsAreTooShort = (locationInfo) => {
    return (
        locationInfo.addressCity.length < 3
        || locationInfo.addressState.length < 2
        || locationInfo.addressStreet.length < 5
        || locationInfo.addressZipCode.length < 5
        || locationInfo.dba.length < 5
        || locationInfo.phone.length < 10
    );
};

export class LocationInfo {
    id = '';
    constructor(locationId) {
        this.id = locationId;
    }
    addressCity = '';
    addressState = '';
    addressStreet = '';
    addressZipCode = '';
    dba = '';
    phone = '';
    note = '';
    selected = {
        name: 'none'
    };
};