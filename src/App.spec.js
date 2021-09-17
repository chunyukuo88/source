import { render, screen } from '@testing-library/svelte';
import '@testing-library/jest-dom'
import App from './App.svelte';

describe('Routing', () => {
  describe('WHEN: The user is at the sign-in page ("/sign-in") of the site,', ()=>{
    beforeEach(()=>{
      window.history.pushState({}, "", '/sign-in');
    });
    it('THEN: The sign-in page is displayed', () => {
      render(App);
      const signInPage = screen.queryByTestId('sign-in page');

      expect(signInPage).toBeInTheDocument();
    });
    it('AND: The main page is NOT displayed', () => {
      render(App);
      const homepage = screen.queryByTestId('homepage');

      expect(homepage).not.toBeInTheDocument();
    });
  });
  describe('WHEN: The user is at the index ("/") of the site,', ()=>{
    beforeEach(()=>{
      window.history.pushState({}, "", '/');
    });
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
  describe('WHEN: The user is at the about page ("/about") of the site,', ()=>{
    beforeEach(()=>{
      window.history.pushState({}, "", '/about');
    });
    it('THEN: The about is displayed', () => {
      render(App);
      const aboutPage = screen.queryByTestId('about-page');

      expect(aboutPage).toBeInTheDocument();
    });
    it('AND: The sign-in page is NOT displayed', () => {
      render(App);
      const signInPage = screen.queryByTestId('sign-in page');

      expect(signInPage).not.toBeInTheDocument();
    });
  });
});