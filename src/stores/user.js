import { writable } from 'svelte/store';
import {routes} from "../routes";
import { navigate } from 'svelte-routing';
import {getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth';

export const user = writable(null);

export async function handleSubmit(username, password) {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, username, password);
    user.set(userCredential.user);
    navigate(routes.ADMIN);
}

export function handleLogout() {
    const auth = getAuth();
    signOut(auth)
        .then(() => {})
        .catch((error) => {
            console.log('An error happened.\nError:\n', error);
        });
    user.set(null);
    navigate(routes.HOME);
}