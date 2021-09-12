import SignUpPage from "./SignUpPage.svelte";
import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { sendFormDataToBackend } from './utils';

jest.mock('./utils');

describe("SignUpPage.svelte", ()=>{
  describe("Layout rendering", ()=>{
    it("displays a signup header.", () => {
      render(SignUpPage);
      const header = screen.getByRole("heading", { name: "sign up" });

      expect(header).toBeInTheDocument();
    });
    it("has username input.", () => {
      render(SignUpPage);
      const input = screen.getByLabelText("username");

      expect(input).toBeInTheDocument();
    });
    it("has email input.", () => {
      render(SignUpPage);
      const input = screen.getByLabelText("email");

      expect(input).toBeInTheDocument();
    });
    it("has a password input.", () => {
      render(SignUpPage);
      const input = screen.getByLabelText("password");

      expect(input).toBeInTheDocument();
    });
    it("has a second password input.", () => {
      render(SignUpPage);
      const input = screen.getByLabelText("re-type password");

      expect(input).toBeInTheDocument();
    });
    it('has a sign up button', ()=> {
      render(SignUpPage);
      const input = screen.getByRole('button', { name: 'sign up'});

      expect(input).toBeInTheDocument();
    });
  });
  describe("Form initialization", ()=>{
    it('The password input is of "password" type', ()=>{
      render(SignUpPage);
      const input = screen.getByLabelText('password');
      expect(input.type).toBe('password');
    });
    it('The button is initially disabled.', ()=>{
      render(SignUpPage);
      const btn = screen.getByRole('button', { name: 'sign up'});
      expect(btn).toBeDisabled();
    });
  });
  describe('Interacting with the form', ()=>{
    describe('WHEN: both password fields have the same input', ()=>{
      it('THEN: The sign up button is enabled', async ()=>{
        render(SignUpPage);
        const passwordInput1 = screen.getByLabelText('password');
        const passwordInput2 = screen.getByLabelText('re-type password');
        const btn = screen.getByRole('button', { name: 'sign up'});
        const lamePassword = 'lamePassword';

        await userEvent.type(passwordInput1, lamePassword);
        await userEvent.type(passwordInput2, lamePassword);

        expect(btn).toBeEnabled();
      });
    });
    describe('WHEN: the password fields have different input', ()=>{
      it('THEN: The sign up button is disabled', async ()=>{
        render(SignUpPage);
        const passwordInput1 = screen.getByLabelText('password');
        const passwordInput2 = screen.getByLabelText('re-type password');
        const btn = screen.getByRole('button', { name: 'sign up'});

        await userEvent.type(passwordInput1, 'qwer');
        await userEvent.type(passwordInput2, 'asdf');

        expect(btn).toBeDisabled();
      });
    });
    describe('GIVEN: username, email, and matching passwords,', ()=>{
      describe('WHEN: The submission button is clicked,', ()=>{
        it('THEN: The four values are POSTed to the back end.', async ()=>{
          sendFormDataToBackend.mockImplementation(jest.fn());
          render(SignUpPage);
          const username = screen.getByLabelText('username');
          const email = screen.getByLabelText('email');
          const passwordInput1 = screen.getByLabelText('password');
          const passwordInput2 = screen.getByLabelText('re-type password');
          const btn = screen.getByRole('button', { name: 'sign up'});
          const lamePassword = 'lamePassword';

          await userEvent.type(username, 'username');
          await userEvent.type(email, 'test@test.com');
          await userEvent.type(passwordInput1, lamePassword);
          await userEvent.type(passwordInput2, lamePassword);
          await userEvent.click(btn);

          expect(sendFormDataToBackend).toBeCalledWith('username', 'test@test.com', lamePassword);
        });
        it('AND: The user is notified, and the form is cleared.', async ()=>{
          sendFormDataToBackend.mockImplementation(jest.fn());
          const spy = jest.spyOn(window, 'alert').mockImplementation(jest.fn());
          render(SignUpPage);
          const username = screen.getByLabelText('username');
          const email = screen.getByLabelText('email');
          const passwordInput1 = screen.getByLabelText('password');
          const passwordInput2 = screen.getByLabelText('re-type password');
          const btn = screen.getByRole('button', { name: 'sign up'});
          const lamePassword = 'lamePassword';

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
