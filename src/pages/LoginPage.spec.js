import LoginPage from "./LoginPage.svelte";
import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { sendFormDataToBackend } from './utils';

jest.mock('./utils');

describe("LoginPage.svelte", ()=>{
  const lamePassword = 'lamePassword';

  describe("Layout rendering", ()=>{
    it("displays a login header.", () => {
      render(LoginPage);
      const header = screen.getByRole("heading", { name: "log in" });

      expect(header).toBeInTheDocument();
    });
    it("has username input.", () => {
      render(LoginPage);
      const input = screen.getByLabelText("username");

      expect(input).toBeInTheDocument();
    });
    it("has email input.", () => {
      render(LoginPage);
      const input = screen.getByLabelText("email");

      expect(input).toBeInTheDocument();
    });
    it("has a password input.", () => {
      render(LoginPage);
      const input = screen.getByLabelText("password");

      expect(input).toBeInTheDocument();
    });
    it('has a sign in button', ()=> {
      render(LoginPage);
      const input = screen.getByRole('button', { name: 'sign in'});

      expect(input).toBeInTheDocument();
    });
  });
  describe("Form initialization", ()=>{
    it('The password input is of "password" type', ()=>{
      render(LoginPage);
      const input = screen.getByLabelText('password');
      expect(input.type).toBe('password');
    });
    it('The button is initially disabled.', ()=>{
      render(LoginPage);
      const btn = screen.getByRole('button', { name: 'sign in'});
      expect(btn).toBeDisabled();
    });
  });
  describe('Interacting with the form', ()=>{
    describe('WHEN: both password fields have the same input', ()=>{
      it('THEN: The sign in button is enabled', async ()=>{
        render(LoginPage);
        const passwordInput1 = screen.getByLabelText('password');
        const passwordInput2 = screen.getByLabelText('re-type password');
        const btn = screen.getByRole('button', { name: 'sign in'});
        const lamePassword = 'lamePassword';

        await userEvent.type(passwordInput1, lamePassword);
        await userEvent.type(passwordInput2, lamePassword);

        expect(btn).toBeEnabled();
      });
    });
    describe('WHEN: the password fields have different input', ()=>{
      it('THEN: The sign in button is disabled', async ()=>{
        render(LoginPage);
        const passwordInput1 = screen.getByLabelText('password');
        const passwordInput2 = screen.getByLabelText('re-type password');
        const btn = screen.getByRole('button', { name: 'sign in'});

        await userEvent.type(passwordInput1, 'qwer');
        await userEvent.type(passwordInput2, 'asdf');

        expect(btn).toBeDisabled();
      });
    });
    describe('GIVEN: username, email, and matching passwords,', ()=>{
      describe('WHEN: The submission button is clicked,', ()=>{
        it('THEN: The four values are POSTed to the back end.', async ()=>{
          sendFormDataToBackend.mockImplementation(jest.fn());
          render(LoginPage);
          const username = screen.getByLabelText('username');
          const email = screen.getByLabelText('email');
          const passwordInput1 = screen.getByLabelText('password');
          const passwordInput2 = screen.getByLabelText('re-type password');
          const btn = screen.getByRole('button', { name: 'sign in'});

          await userEvent.type(username, 'username');
          await userEvent.type(email, 'test@test.com');
          await userEvent.type(passwordInput1, lamePassword);
          await userEvent.type(passwordInput2, lamePassword);
          await userEvent.click(btn);

          expect(sendFormDataToBackend).toBeCalledWith('username', 'test@test.com', lamePassword);
        });
        it('AND: The user is notified, and the form is cleared.', async ()=>{
          const spy = jest.spyOn(window, 'alert').mockImplementation(jest.fn());
          render(LoginPage);
          const username = screen.getByLabelText('username');
          const email = screen.getByLabelText('email');
          const passwordInput1 = screen.getByLabelText('password');
          const passwordInput2 = screen.getByLabelText('re-type password');
          const btn = screen.getByRole('button', { name: 'sign in'});

          await userEvent.type(username, 'some username');
          await userEvent.type(email, 'some email address');
          await userEvent.type(passwordInput1, lamePassword);
          await userEvent.type(passwordInput2, lamePassword);
          await userEvent.click(btn);

          expect(spy).toBeCalled();
          expect(username.value).toEqual('');
          expect(email.value).toEqual('');
          expect(passwordInput1.value).toEqual('');
          expect(passwordInput2.value).toEqual('');
        });
      });
    });
  });
});
