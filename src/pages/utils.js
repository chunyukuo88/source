export async function sendFormDataToBackend (username, email, password) {
  const request = _buildRequest(username, email, password);
  await fetch(tempUrl, request);
};

const tempUrl = "/api/1.0/users";

export const _buildRequest = (username, email, password) => ({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ username, email, password }),
});
