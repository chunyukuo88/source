import { writable } from 'svelte/store';

export const authStore = writable({
  isLoggedIn: false,
  user: null, // firebase.UserInfo
});