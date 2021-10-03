import { writable } from 'svelte/store';
import { routes } from '../routes';
import { navigate } from 'svelte-routing';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const user = writable(null);

export async function handleSubmit(username, password) {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, username, password);
    user.set(userCredential.user);
    navigate(routes.ADMIN);
}

export async function handleLogout() {
    const auth = getAuth();
    try {
        await signOut(auth);
        user.set(null);
        navigate(routes.HOME);
    } catch (e) {
        console.log('An error happened.\nError:\n', e);
        alert('Unexpected error; please refresh the page.');
    }
}