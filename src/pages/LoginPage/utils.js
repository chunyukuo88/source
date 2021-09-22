import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { setLoginSuccess } from '../../stores/authStore';

export async function submitLoginInfo(email, password) {
  const auth = getAuth();
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  setLoginSuccess(userCredential);
};