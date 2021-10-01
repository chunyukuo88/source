import Login from './Login.svelte';
import { useNavigate, useLocation } from 'svelte-navigator';
import { render, screen, fireEvent } from '@testing-library/svelte';
import '@testing-library/jest-dom';

jest.mock('svelte-navigator');

it('', ()=>{
   useNavigate.mockImplementation(jest.fn());
   useLocation.mockImplementation(()=>({
      state: {
         from: {}
      }
   }));
   render(Login);
   const loginPage = screen.getByTestId('ha');

   expect(loginPage).toBeInTheDocument();
});