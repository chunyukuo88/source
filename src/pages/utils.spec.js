import { sendFormDataToBackend } from "./utils";
import { setupServer } from 'msw/node';
import { rest } from 'msw';

describe('GIVEN: Valid params', ()=>{
  describe('WHEN: This function is invoked', ()=>{
    it('THEN: The params are POSTed to the back end.', async ()=>{
      const [username, email, password] = ['name', 'email', 'pw'];
      const expectedRequestBody = JSON.stringify({
        username: username,
        email: email,
        password: password
      });

      let requestBody;
      const server = setupServer(
        rest.post("/api/1.0/users", (req, res, context)=>{
          requestBody = req.body;
          return res(context.status(200));
        })
      );
      server.listen();

      await sendFormDataToBackend(username, email, password);

      await server.close();

      expect(requestBody.body).toEqual(expectedRequestBody);
    });
  });
});
