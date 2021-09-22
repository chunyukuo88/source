import { submitLoginInfo } from './utils';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { authStore, setLoginSuccess } from '../../stores/authStore';

jest.mock('firebase/auth');
jest.mock('../../stores/authStore');

describe('submitLoginCreds()', ()=>{
  describe('WHEN: Given an valid auth object, email, and password,', ()=>{
    const expectedResponse = {};
    expectedResponse.user = {};

    beforeEach(()=>{
      getAuth.mockImplementation(() => {});
      setLoginSuccess.mockImplementation(jest.fn());
      signInWithEmailAndPassword.mockImplementation(() => expectedResponse);
    });
    afterEach(()=>{
      jest.clearAllMocks();
    });
    it('THEN: It signs the user in.', async ()=>{
      const auth = getAuth();
      const [ email, password ] = [ 'test@test.com', 'password' ];

      await submitLoginInfo(email, password);

      expect(signInWithEmailAndPassword).toBeCalledWith(auth, email, password);
    });
    it('AND: It updates the global state with the user credentials.', async ()=>{
      const auth = getAuth();
      const [ email, password ] = [ 'test@test.com', 'password' ];

      await submitLoginInfo(email, password);

      expect(setLoginSuccess).toBeCalledWith(expectedResponse);
    });
  });
});