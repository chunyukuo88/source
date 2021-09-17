import { render, screen } from '@testing-library/svelte';
import '@testing-library/jest-dom'
import App from './App.svelte';

describe('Routing', () => {
  describe('WHEN: The user is at the sign-in page ("/sign-in") of the site,', ()=>{
    it('AND: The sign-in page is displayed', () => {
      window.history.pushState({}, "Sign-in page", '/sign-in');

      render(App);
      const signInPage = screen.queryByTestId('sign-in page');

      expect(signInPage).toBeInTheDocument();
    });
  });
  describe('WHEN: The user is at the index ("/") of the site,', ()=>{
    it('THEN: The homepage is displayed', () => {
      render(App);
      const homepage = screen.queryByTestId('homepage');

      expect(homepage).toBeInTheDocument();
    });
    it('AND: The sign-in page is NOT displayed', () => {
      render(App);
      const signInPage = screen.queryByTestId('sign-in page');

      expect(signInPage).not.toBeInTheDocument();
    });
  });

});