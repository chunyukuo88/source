import Login from './Login.svelte';
import { render, screen } from '@testing-library/svelte';
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';
import { routes } from '../../routes';
import { navigate } from 'svelte-routing';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

jest.mock('firebase/auth');
jest.mock('svelte-routing');

describe('Login.svelte', ()=>{
   describe('GIVEN: The user has entered VALID username and password, ', ()=>{
      describe('WHEN: The user clicks the submit button, ', ()=>{
         // it('THEN: The user store is updated, ', async ()=>{
            //
         // });
         it('AND: The user is routed to the Admin page, ', async ()=>{
            navigate.mockImplementation(jest.fn());
            getAuth.mockImplementation(jest.fn());
            const getMockUserCredentials = () => ({
               user: {},
            });
            signInWithEmailAndPassword.mockImplementation(getMockUserCredentials);
            render(Login);
            const userNameInputBox = screen.queryByTestId('username');
            const passwordInputBox = screen.queryByTestId('password');
            const submissionButton = screen.queryByTestId('submit');

            await userEvent.type(userNameInputBox, 'validUserName');
            await userEvent.type(passwordInputBox, 'validPassword');
            await userEvent.click(submissionButton);

            expect(navigate).toHaveBeenCalled();
         });
      });
   });
   describe('GIVEN: The user has entered INVALID username and password, ', ()=>{
      describe('WHEN: The user clicks the submit button, ', ()=>{
         it('THEN: An error message is displayed, ', ()=>{
            //
         });
      });
   });
});

it('', ()=>{
   render(Login);
   const loginPage = screen.getByTestId('login-page');

   expect(loginPage).toBeInTheDocument();
});

