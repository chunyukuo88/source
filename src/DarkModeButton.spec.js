import DarkModeButton from "./DarkModeButton.svelte";
import { render, screen, fireEvent } from '@testing-library/svelte';
import '@testing-library/jest-dom';

describe('DarkModeButton.svelte', ()=>{
  describe('Interaction', ()=>{
    describe('WHEN: This button is clicked, ', ()=>{
      it('THEN: It toggles the dark mode', ()=>{
        const spy = jest.spyOn(window.document.body.classList, 'toggle');
        render(DarkModeButton);
        const button = screen.getByRole('button');

        fireEvent.click(button);

        expect(spy).toHaveBeenCalledTimes(1);
      });
    });
  });
});