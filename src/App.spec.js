import App from './App.svelte';
import { routes } from './routes';
import { render, screen, fireEvent } from '@testing-library/svelte';
import '@testing-library/jest-dom';

const navigateTo = (path) => window.history.pushState({}, '', `${path}`);

describe('App.svelte', ()=>{
    describe('Routing:', ()=>{
        describe('WHEN: Nav bar links work properly,', ()=>{
            it.each`
                  $navLabel   |   displayedPage     |   URL
                  ${'about'}  |   ${'about page'}   |   ${routes.ABOUT}
                  ${'log in'} |   ${'login page'}   |   ${routes.PROFILE}
                  ${'blog'}   |   ${'blog page'}    |   ${routes.ADMIN}
            `('THEN: the user clicks $navLabel and is taken to $displayedPage',
            async ({navLabel, displayedPage, URL})=>{
                navigateTo(routes.HOME);
                render(App);
                const navBarLink = screen.queryByRole('link', { name: navLabel });

                await fireEvent.click(navBarLink);
                const expectedPage = screen.queryByTestId(displayedPage);

                expect(expectedPage).toBeInTheDocument();
                expect(window.location.pathname).toBe(URL);
            });
        });
    });
});