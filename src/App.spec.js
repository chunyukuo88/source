import App from './App.svelte';
import { routes } from './routes';
import { render, screen, fireEvent } from '@testing-library/svelte';
import '@testing-library/jest-dom';

const navigateTo = (path) => window.history.pushState({}, '', `${path}`);
const pathRequiresLoggedIn = (path) => (path === routes.PROFILE || path === routes.ADMIN);

describe('App.svelte', ()=>{
    describe('Layout:', ()=>{
       it.each`
            path              | linkLabel
            ${routes.HOME}    | ${'home'}
            ${routes.ABOUT}   | ${'about'}
            ${routes.PROFILE} | ${'profile'}
            ${routes.ADMIN}   | ${'admin'}
       `('There is a link to $linkLabel in the nav bar', ({ path, linkLabel})=>{
           navigateTo(routes.HOME);

           render(App);
           const navBarLink = screen.queryByRole('link', { name: linkLabel});

           expect(navBarLink).toBeInTheDocument();
       });
    });
    describe('Routing:', ()=>{
        describe('GIVEN: The user is not logged in, ', ()=>{
            describe('WHEN: Nav bar links lead to non-protected routes,', ()=>{
                it.each`
                    path              | linkLabel      | displayedPageId
                    ${routes.HOME}    | ${'home'}      |  ${'home-page'} 
                    ${routes.ABOUT}   | ${'about'}     |  ${'about-page'}
                    ${routes.PROFILE} | ${'profile'}   |  ${'login-page'}
                    ${routes.ADMIN}   | ${'admin'}     |  ${'login-page'}
                `('THEN: the user clicks $linkLabel and is taken to displayedPageId',
                async ({path, linkLabel, displayedPageId})=>{
                    navigateTo(routes.HOME);
                    render(App);
                    const navBarLink = screen.queryByRole('link', { name: linkLabel});

                    await fireEvent.click(navBarLink);
                    const expectedPage = screen.queryByTestId(displayedPageId);

                    expect(expectedPage).toBeInTheDocument();
                    (pathRequiresLoggedIn(path))
                        ? expect(window.location.pathname).toBe(routes.LOGIN)
                        : expect(window.location.pathname).toBe(path);
                });
            });
            describe('WHEN: The user is logged in,', ()=>{
                describe('WHEN: Nav bar links lead to both protected and non-protected routes,', ()=>{
                    it.each`
                    path              | linkText       | displayedPageId
                    ${routes.HOME}    | ${'home'}      |  ${'home-page'} 
                    ${routes.ABOUT}   | ${'about'}     |  ${'about-page'}
                    ${routes.PROFILE} | ${'profile'}   |  ${'profile-page'}
                    ${routes.ADMIN}   | ${'admin'}     |  ${'admin-page'}
                `('THEN: the user clicks $linkLabel and is routed to displayedPageId',
                    async ({path, linkText, displayedPageId})=>{


                        navigateTo(routes.HOME);
                        render(App);
                        const navBarLink = screen.queryByRole('link', { name: linkText});

                        await fireEvent.click(navBarLink);
                        const expectedPage = screen.queryByTestId(displayedPageId);

                        expect(expectedPage).toBeInTheDocument();
                        (pathRequiresLoggedIn(path))
                            ? expect(window.location.pathname).toBe(routes.LOGIN)
                            : expect(window.location.pathname).toBe(path);
                    });
                });
            });
        });
        describe('GIVEN: The user is logged in, ', ()=>{
            describe('WHEN: Nav bar links work properly,', ()=>{
                it.each`
                    pathName          | linkLabelText  | displayedPage
                    ${routes.HOME}    | ${'home'}      |  ${'home-page'}
                    ${routes.ABOUT}   | ${'about'}     |  ${'about-page'}
                    ${routes.PROFILE} | ${'profile'}   |  ${'profile-page'}
                    ${routes.ADMIN}   | ${'admin'}     |  ${'admin-page'}
                `('THEN: the user clicks $linkLabel and is routed to the $displayedPageId',
                async ({pathName, linkLabelText, displayedPage})=>{
                    navigateTo(routes.HOME);
                    render(App);
                    const navBarLink = screen.queryByRole('link', { name: linkLabelText});

                    await fireEvent.click(navBarLink);
                    const expectedPage = screen.queryByTestId(displayedPage);

                    expect(expectedPage).toBeInTheDocument();
                    expect(window.location.pathname).toBe(pathName);
                });
            });
        });
    });
});