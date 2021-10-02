import { writable } from 'svelte/store';
import {routes} from "../routes";
import { navigate } from 'svelte-routing';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export const user = writable(null);

export async function handleSubmit(username, password) {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, username, password);
    user.set(userCredential.user);
    navigate(routes.ADMIN);
}