import { sendFormDataToBackend, _buildRequest } from "./utils";

describe('GIVEN: Valid params', ()=>{
  describe('WHEN: This function is invoked', ()=>{
    it('THEN: The params are POSTed to the back end.', async ()=>{
      global.fetch = jest.fn();
      const [username, email, password] = ['name', 'email', 'pw'];
      const calledRequest = _buildRequest(username, email, password);
      const url = expect.any(String);

      await sendFormDataToBackend(username, email, password);

      expect(fetch).toBeCalledWith(url, calledRequest);
    });
  });
});
