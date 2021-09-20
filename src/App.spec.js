import { render, screen, fireEvent } from '@testing-library/svelte';
import '@testing-library/jest-dom'
import App from './App.svelte';

const navigateTo = (path) => window.history.pushState({}, "", `${path}`);

describe('Routing', () => {
  describe('WHEN: The user is at the login page ("/login") of the site,', ()=>{
    beforeEach(()=>{
      navigateTo('/login');
    });
    it('THEN: The login page is displayed', () => {
      render(App);
      const loginPage = screen.queryByTestId('login page');

      expect(loginPage).toBeInTheDocument();
    });
    it('AND: The main page is NOT displayed', () => {
      render(App);
      const homepage = screen.queryByTestId('homepage');

      expect(homepage).not.toBeInTheDocument();
    });
  });
  describe('WHEN: The user is at the index ("/") of the site,', ()=>{
    beforeEach(()=>{
      navigateTo('/');
    });
    it('THEN: The homepage is displayed', () => {
      render(App);
      const homepage = screen.queryByTestId('homepage');

      expect(homepage).toBeInTheDocument();
    });
    it('AND: The login page is NOT displayed', () => {
      render(App);
      const loginPage = screen.queryByTestId('login page');

      expect(loginPage).not.toBeInTheDocument();
    });
  });
  describe('WHEN: The user is at the about page ("/about") of the site,', ()=>{
    beforeEach(()=>{
      navigateTo('/about');
    });
    it('THEN: The about is displayed', () => {
      render(App);
      const aboutPage = screen.queryByTestId('about-page');

      expect(aboutPage).toBeInTheDocument();
    });
    it('AND: The login page is NOT displayed', () => {
      render(App);
      const loginPage = screen.queryByTestId('login page');

      expect(loginPage).not.toBeInTheDocument();
    });
  });
  it.each`
    path        | queryName
    ${'/'}      | ${'home'}
    ${'/login'} | ${'log in'}
    ${'/blog'}  | ${'blog'}
    ${'/about'}  | ${'about'}
  `
  ('There is a link to the $queryName in the NavBar', ({ path, queryName})=>{
    navigateTo(path);

    render(App);
    const link = screen.queryByRole('link', { name: queryName });

    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe(path);
  });
  describe('The user clicks on nav bar links, they are taken to the pages they expect.', ()=>{
    it.each`
      linkLabel   |   displayedPage     |   URL
      ${'log in'} |   ${'login page'}   |   ${'/login'}
      ${'home'}   |   ${'homepage'}     |   ${'/'}
      ${'blog'}   |   ${'blog page'}    |   ${'/blog'}
      ${'about'}  |   ${'about page'}   |   ${'/about'}
    `('WHEN: The user is taken to $displayedPage after clicking $linkLabel.',
      async ({linkLabel, displayedPage, URL}) => {
      navigateTo('/');
      render(App);
      const navBarLink = screen.queryByRole('link', { name: linkLabel});

      await fireEvent.click(navBarLink);
      const expectedPage = screen.queryByTestId(displayedPage);

      expect(expectedPage).toBeInTheDocument();
      expect(window.location.pathname).toBe(URL);
    });
  });
});