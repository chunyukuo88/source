import { writable } from 'svelte/store';

export const darkMode = writable(false);

export function setToDarkMode(){
  darkMode.set(true);
}

export function setToLightMode(){
  darkMode.set(false);
}