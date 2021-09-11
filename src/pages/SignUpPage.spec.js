import SignUpPage from "./SignUpPage.svelte";
import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

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
        const crappyPassword = 'crappyPassword';

        await userEvent.type(passwordInput1, crappyPassword);
        await userEvent.type(passwordInput2, crappyPassword);

        expect(btn).toBeEnabled();
      });
    });
  });
});
