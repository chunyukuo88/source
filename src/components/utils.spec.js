import { submissionHandler, inputsAreTooShort } from './utils';
import { getDatabase, ref, set } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { createLocationInfo } from '../utils/locationUtils';

jest.mock('firebase/app');
jest.mock('firebase/database');

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
        describe('WHEN: Invoked with a valid locationInfo object', ()=>{
           it('THEN: It writes the object to the database.', async ()=>{
               initializeApp.mockImplementation(jest.fn());
               const mockDatabase = {};
               getDatabase.mockImplementation(jest.fn().mockReturnValue(mockDatabase));
               ref.mockImplementation(jest.fn().mockReturnValue({}));
               set.mockImplementation(jest.fn());

               await submissionHandler(locationInfo);

               expect(set).toHaveBeenCalledTimes(1);
               expect(set).toHaveBeenCalledWith({}, locationInfo);
           });
       });
        describe('WHEN: Invoked with an invalid locationInfo object', ()=>{
           it('THEN: It throws an error.', async ()=>{
               window.alert = () => {};
               const spy = jest.spyOn(window, 'alert');
               const mockDatabase = {};
               getDatabase.mockImplementation(jest.fn().mockReturnValue(mockDatabase));
               ref.mockImplementation(jest.fn().mockReturnValue({}));
               const mockError = new Error('database error');
               set.mockImplementationOnce(()=> {
                   throw mockError;
               });

               await submissionHandler(locationInfo);

               expect(spy).toBeCalledWith(mockError);
           });
       });
    });
    describe('inputsAreTooShort()', ()=>{
        describe('WHEN: Invoked with a valid locationInfo object', ()=>{
            describe('AND: One of the inputs is too short', ()=>{
                it('THEN: It returns true.', ()=>{
                    const locationInfo = createLocationInfo();

                    const result = inputsAreTooShort(locationInfo);

                    expect(result).toEqual(true);
                });
            });
            describe('AND: One all inputs are of sufficient length', ()=>{
                it('THEN: It returns false.', ()=>{
                    const locationInfo = {
                        addressCity: 'Columbus',
                        addressState: 'OH',
                        addressStreet: '123 Main Street',
                        addressZipCode: '43082',
                        dba: 'Recycling Store',
                        phone: '614-123-4567',
                    };

                    const result = inputsAreTooShort(locationInfo);

                    expect(result).toEqual(false);
                });
            });
        });
    });
});