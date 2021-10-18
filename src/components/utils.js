import { getDatabase, ref, set } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../config/config';

initializeApp(firebaseConfig)

const baseUrl = 'https://recycle-7ae0b-default-rtdb.firebaseio.com/';

export function submissionHandler(locationInfo){
    const database = getDatabase();
    set(ref(database, '/'), locationInfo);
    console.log('submissionHandler()');
};

