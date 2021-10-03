import Profile from './Profile.svelte';
import { user, handleLogout } from '../../stores/user';
import { render, screen, fireEvent } from '@testing-library/svelte';
import '@testing-library/jest-dom';

const testEmail = 'test@test.com';

beforeEach(()=>{
   user.set({
       email: testEmail,
   });
});

afterEach(()=>{
   user.set(null);
});

describe('WHEN: The user clicks the logout button', ()=>{
    it('THEN: The handleLogout function is invoked.', ()=>{
        render(Profile);
        const welcome = screen.queryByTestId('welcome');
        const expectedContent = `welcome, ${testEmail}`;

        expect(welcome).toBeInTheDocument();
        expect(welcome).toHaveTextContent(expectedContent);
    });
});