export async function getUserById(id, accessToken) {
  const rawResponse = await fetch(`${import.meta.env.VITE_APP_API_URL}/users/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  });
  const response = await rawResponse.json();
  if (rawResponse.ok) {
    return response;
  } else {
    throw new Error(response.error);
  }
}

export async function updateUser(
  id,
  { userName, password, passwordConfirm, firstName, lastName },
  accessToken
) {
  const rawResponse = await fetch(`${import.meta.env.VITE_APP_API_URL}/users/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
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

export async function deleteUser(id, accessToken) {
  const rawResponse = await fetch(`${import.meta.env.VITE_APP_API_URL}/users/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  });
  if (!rawResponse.ok) {
    throw new Error(response.error);
  }
}
