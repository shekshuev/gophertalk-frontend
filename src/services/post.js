export async function getAllPosts({ limit, offset, replyToId, search }, accessToken) {
  const params = { limit: limit, offset: offset };
  if (+replyToId > 0) {
    params.reply_to_id = replyToId;
  }
  if (search && ("" + search).length > 0) {
    params.search = search;
  }

  const queryString = new URLSearchParams(params).toString();
  const rawResponse = await fetch(`${import.meta.env.VITE_APP_API_URL}/posts?${queryString}`, {
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
