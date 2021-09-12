import axios from 'axios';

export const sendFormDataToBackend = (username, email, password) => {
  axios.post("/api/1.0/users", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username, email, password})
  });
};
