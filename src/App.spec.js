import { render, screen, fireEvent } from '@testing-library/svelte';
import '@testing-library/jest-dom'
import { routes } from './pages/routes';
import App from './App.svelte';

const navigateTo = (path) => window.history.pushState({}, "", `${path}`);

describe('Routing', () => {
  describe('WHEN: The user is at the login page ("/login") of the site,', ()=>{
    beforeEach(()=>{
      navigateTo(routes.LOGIN);
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
      navigateTo(routes.HOME);
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
      navigateTo(routes.ABOUT);
    });
    it('THEN: The about is displayed', () => {
      render(App);
      const aboutPage = screen.queryByTestId('about page');

      expect(aboutPage).toBeInTheDocument();
    });
    it('AND: The login page is NOT displayed', () => {
      render(App);
      const loginPage = screen.queryByTestId('login page');

      expect(loginPage).not.toBeInTheDocument();
    });
  });
  it.each`
    path            | queryName
    ${routes.HOME}  | ${'home'}
    ${routes.LOGIN} | ${'log in'}
    ${routes.BLOG}  | ${'blog'}
    ${routes.ABOUT} | ${'about'}
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
      ${'log in'} |   ${'login page'}   |   ${routes.LOGIN}
      ${'home'}   |   ${'homepage'}     |   ${routes.HOME}
      ${'blog'}   |   ${'blog page'}    |   ${routes.BLOG}
      ${'about'}  |   ${'about page'}   |   ${routes.ABOUT}
    `('WHEN: The user is taken to $displayedPage after clicking $linkLabel.',
      async ({linkLabel, displayedPage, URL}) => {
      navigateTo(routes.HOME);
      render(App);
      const navBarLink = screen.queryByRole('link', { name: linkLabel});

      await fireEvent.click(navBarLink);
      const expectedPage = screen.queryByTestId(displayedPage);

      expect(expectedPage).toBeInTheDocument();
      expect(window.location.pathname).toBe(URL);
    });
  });
});