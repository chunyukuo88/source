import { getDatabase, ref, set } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../config/config';

initializeApp(firebaseConfig)

export const recyclables = [
    { id: 1, category: 'automotive', name: 'motor oil'},
    { id: 2, category: 'automotive', name: 'car battery'},
    { id: 3, category: 'automotive', name: 'tires'},
    { id: 4, category: 'automotive', name: 'vehicle'},
];

export async function submissionHandler(locationInfo){
    try {
        const database = getDatabase();
        const { id } = locationInfo;
        const url = `/locations/${id}`;
        set(ref(database, url), locationInfo);
    } catch (e) {
        alert(e);
    }
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