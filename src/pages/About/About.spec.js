import About from './About.svelte';
import { render, screen } from '@testing-library/svelte';
import '@testing-library/jest-dom';

it('displays properly', ()=>{
    render(About);
    const page = screen.queryByTestId('about-page');

    expect(page).toBeInTheDocument();
});