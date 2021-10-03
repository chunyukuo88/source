import { darkMode, setToDarkMode, setToLightMode } from "./darkMode";
import { get } from 'svelte/store';


describe('darkMode.js', ()=>{
  beforeEach(() => darkMode.set(false));

  describe('setToDarkMode()', ()=>{
    it('sets the darkMode store to `true` when invoked.', ()=>{
      setToDarkMode();

      expect(get(darkMode)).toEqual(true);
    });
  });
  describe('setToLightMode()', ()=>{
    it('sets the darkMode store to `false` when invoked.', ()=>{
      setToDarkMode();

      expect(get(darkMode)).toEqual(true);

      setToLightMode();

      expect(get(darkMode)).toEqual(false);
    });
  });
});