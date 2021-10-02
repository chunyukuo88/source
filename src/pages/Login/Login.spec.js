import Login from './Login.svelte';
import { handleSubmit } from '../../stores/user';
import { fireEvent, render, screen } from '@testing-library/svelte';
import '@testing-library/jest-dom';

jest.mock('../../stores/user');

describe('Login.svelte', ()=>{
   describe('GIVEN: The user has entered username and password, ', ()=>{
      describe('WHEN: The user clicks the submit button, ', ()=>{
         it('THEN: The submission handler is invoked with the username and password', async ()=>{
            handleSubmit.mockImplementation(jest.fn());

            render(Login);
            let username = screen.getByTestId('username');
            let password = screen.getByTestId('password');
            const submissionButton = screen.getByTestId('submit');

            await fireEvent.input(username, 'some username');
            await fireEvent.input(password, 'some password');
            username = screen.getByTestId('username');
            password = screen.getByTestId('password');
            await fireEvent.click(submissionButton);

            expect(handleSubmit).toHaveBeenCalledWith(username.value, password.value);
         });
      });
   });
});

