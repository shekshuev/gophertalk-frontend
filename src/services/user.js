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
