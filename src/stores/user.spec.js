import { get } from 'svelte/store';
import { user, handleLogout, handleSubmit } from './user';
import { navigate } from 'svelte-routing';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { routes } from '../routes';

jest.mock('firebase/auth');
jest.mock('svelte-routing');

// TODO: Consult this for reference:
// https://github.com/dirv/svelte-testing-demo/blob/main/spec/stores/user.spec.js

const [ username, password ] = [ 'username', 'password' ];
const home = routes.HOME;

describe('stores/user.js', ()=>{
    describe('handleSubmit()', ()=>{
        describe('WHEN: Invoked with valid username and password,', ()=>{
            it('THEN: The user store is set with the userCredential data.', async ()=>{
                getAuth.mockImplementation(()=>{});
                signInWithEmailAndPassword.mockImplementation(() => ({
                    user: {},
                }));
                expect(get(user)).toBeNull();

                await handleSubmit(username, password);

                expect(get(user)).toEqual({});
            });
            it('AND: The user is routed to the admin page.', async ()=>{
                getAuth.mockImplementation(()=>{});
                signInWithEmailAndPassword.mockImplementation(() => ({
                    user: {},
                }));
                navigate.mockImplementation(jest.fn());

                await handleSubmit(username, password);

                expect(navigate).toHaveBeenCalledWith(routes.ADMIN);
            });
        });
    });
    describe('handleLogout()', ()=>{
        describe('GIVEN: The user store is NOT null,', ()=>{
            describe('WHEN: When this function is invoked,', ()=>{
                it('THEN: It sets the user store back to null', async ()=>{
                    getAuth.mockImplementation(()=>{});
                    signInWithEmailAndPassword.mockImplementation(() => ({
                        user: {},
                    }));
                    signOut.mockImplementation(jest.fn());
                    expect(get(user)).toBeNull();

                    await handleSubmit(username, password);

                    expect(get(user)).toEqual({});

                    await handleLogout();

                    expect(get(user)).toBeNull();
                });
                it(`AND: The 'navigate' utility function is invoked with ${home}`, async ()=>{
                    getAuth.mockImplementation(()=>{});
                    signInWithEmailAndPassword.mockImplementation(() => ({
                        user: {},
                    }));
                    signOut.mockImplementation(jest.fn());

                    await handleLogout();

                    expect(navigate).toHaveBeenCalledWith(home);
                });
            });
        });
        describe('WHEN: The function is invoked but there is an unexpected error,', ()=>{
           it('THEN: The error is logged in the console.', async ()=>{
               signOut.mockImplementation(() => {
                   throw new Error('error');
               });
               const log = jest.spyOn(console, 'log');

               await handleLogout();

               expect(log).toBeCalledTimes(1);
           });
           it('AND: An alert is fired.', async ()=>{
               signOut.mockImplementation(() => {
                   throw new Error('error');
               });
               const alert = jest.spyOn(window, 'alert');

               await handleLogout();

               expect(alert).toBeCalledTimes(1);
           });
        });
    });
});
