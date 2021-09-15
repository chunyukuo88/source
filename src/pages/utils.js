
export async function sendFormDataToBackend (username, email, password) {
  const request = buildRequest(username, email, password);
  const response = await fetch(tempUrl, request);
  console.log(response);
  return response;
};

const tempUrl = "/api/1.0/users";

const buildRequest = (username, email, password) => ({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ username, email, password }),
});
