import Profile from './Profile.svelte';
import { user } from '../../stores/user';
import { render, screen } from '@testing-library/svelte';
import '@testing-library/jest-dom';

const testEmail = 'test@test.com';

describe('WHEN: The user clicks the logout button', ()=>{
    it('THEN: The handleLogout function is invoked.', ()=>{
        user.set({
            email: testEmail,
        });
        render(Profile);
        const welcome = screen.queryByTestId('welcome');
        const expectedContent = `welcome, ${testEmail}`;

        expect(welcome.tagName).toBe('H3');
        expect(welcome).toBeInTheDocument();
        expect(welcome).toHaveTextContent(expectedContent);
    });
});
describe('WHEN: There is no user in the store user clicks the logout button', ()=>{
    it('THEN: The handleLogout function is invoked.', ()=>{
        user.set(null);
        const { debug } = render(Profile);
        // debug();
        const welcome = screen.queryByTestId('welcome');
        const expectedContent = `welcome, undefined`;

        expect(welcome.tagName).toBe('H3');
        expect(welcome).toBeInTheDocument();
        expect(welcome).toHaveTextContent(expectedContent);
    });
});
