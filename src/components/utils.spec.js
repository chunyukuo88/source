import { submissionHandler } from './utils';
import { initializeApp } from 'firebase';
// import { initializeApp } from 'firebase/app';
// import { getDatabase } from 'firebase/database';
import { firebaseConfig } from '../../config/config';

const mockFirebase = jest.genMockFromModule('firebase');
mockFirebase.initializeApp = jest.fn();

mockFirebase.database = jest.fn().mockReturnValue({
    ref: jest.fn().mockReturnThis(),
    on: jest.fn((eventType, callback) => callback(snapshot)),
    update: jest.fn(() => Promise.resolve(snapshot)),
    remove: jest.fn(() => Promise.resolve()),
    once: jest.fn(() => Promise.resolve(snapshot)),
});

mockFirebase.auth = jest.fn().mockReturnValue({
    currentUser: true,
    signOut() {
        return Promise.resolve();
    },
    signInWithEmailAndPassword(email, password) {
        return new Promise((resolve, reject) => {
            if (password === 'sign' || password === 'key') {
                resolve({ name: 'user' });
            }
            reject(Error('sign in error '));
        });
    },
    createUserWithEmailAndPassword(email, password) {
        return new Promise((resolve, reject) => {
            if (password === 'create' || password === 'key') {
                resolve({ name: 'createUser' });
            }
            reject(Error('create user error '));
        });
    },
});


const locationInfo = {
    addressCity: 'test',
    addressState: 'test',
    addressStreet: 'test',
    addressZipCode: 'test',
    dba: 'test',
    phone: 'test',
    selected: {
        name: 'test'
    },
};

describe('utils.js', ()=>{
    describe('submissionHandler()', ()=>{
        describe('submissionHandler()', ()=>{
        describe('WHEN: Invoked with a valid locationInfo object', ()=>{
               it('THEN: It writes the object to the database.', async ()=>{
                   const result = await submissionHandler(locationInfo);

                   expect(result).resolves.toEqual(true);
                   // expect(set).toHaveBeenCalledTimes(1);
                   // expect(set).toHaveBeenCalledWith();
               });
           });
        });
    });
});