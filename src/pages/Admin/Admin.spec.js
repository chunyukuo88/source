import Admin from './Admin.svelte';
import { render, screen } from '@testing-library/svelte';
import '@testing-library/jest-dom';

it('The component displays properly.', ()=>{
    render(Admin);
    const page = screen.queryByTestId('admin-page');

    expect(page).toBeInTheDocument();
});