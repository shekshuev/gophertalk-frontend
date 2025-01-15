export async function performLogin({ userName, password }) {
  const rawResponse = await fetch(`${import.meta.env.VITE_APP_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ user_name: userName, password: password })
  });
  const response = await rawResponse.json();
  if (rawResponse.ok) {
    return response;
  } else {
    throw new Error(response.error);
  }
}

export async function performRegister({
  userName,
  password,
  passwordConfirm,
  firstName,
  lastName
}) {
  const rawResponse = await fetch(`${import.meta.env.VITE_APP_API_URL}/auth/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user_name: userName,
      password: password,
      password_confirm: passwordConfirm,
      first_name: firstName,
      last_name: lastName
    })
  });
  const response = await rawResponse.json();
  if (rawResponse.ok) {
    return response;
  } else {
    throw new Error(response.error);
  }
}

export class AuthService {}
