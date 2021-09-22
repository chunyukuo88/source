import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { setLoginSuccess } from '../../stores/authStore';
import { navigate } from 'svelte-routing';
import { routes } from '../routes';

export async function submitLoginInfo(email, password) {
  const auth = getAuth();
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  setLoginSuccess(userCredential);
};

export function navigateToAdminPage(){
  navigate(routes.ADMIN);
};