import Home from './Home.svelte';
import {render, screen} from '@testing-library/svelte';
import '@testing-library/jest-dom';

it('The component displays properly.', ()=>{
   render(Home);
   const page = screen.queryByTestId('home-page');

   expect(page).toBeInTheDocument();
});