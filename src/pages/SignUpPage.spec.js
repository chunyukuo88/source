import SignUpPage from "./SignUpPage.svelte";
import { render, screen } from "@testing-library/svelte";
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
  });
  describe("Other functionality", ()=>{
    it('The password input is of "password" type', ()=>{
      render(SignUpPage);
      const input = screen.getByLabelText('password');
      expect(input.type).toBe('password');
    });
  });
});
