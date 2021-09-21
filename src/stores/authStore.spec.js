import { setLoginSuccess, authStore } from './authStore';

describe('setLoginSuccess()', ()=>{
  describe('WHEN: given a `userCredential` object,', ()=>{
    it('THEN: It updates the store with the login success object.', ()=>{
      const userCredential = {
        user: {}
      };
      const expectedArgs = {
        isLoggedIn: true,
        user: userCredential.user,
      }
      const spy = jest.spyOn(authStore, 'set');

      setLoginSuccess(userCredential);

      expect(spy).toBeCalledWith(expectedArgs);
    });
  });
});
