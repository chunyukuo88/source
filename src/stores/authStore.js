import { writable } from 'svelte/store';

export const authStore = writable({
  isLoggedIn: false,
  user: null,
});

export const setLoginSuccess = (userCredential) => {
  authStore.set({
    isLoggedIn: true,
    user: userCredential.user,
  });
};
