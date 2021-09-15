import axios from "axios";

export const sendFormDataToBackend = (username, email, password) => {
  const request = buildRequest(username, email, password);
  axios.post(tempUrl, request);
};

const tempUrl = "/api/1.0/users";

const buildRequest = (username, email, password) => ({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ username, email, password }),
});
