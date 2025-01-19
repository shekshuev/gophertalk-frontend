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

export async function getPostById(id, accessToken) {
  const rawResponse = await fetch(`${import.meta.env.VITE_APP_API_URL}/posts/${id}`, {
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

export function viewPost(id, accessToken) {
  performPostAction(id, "POST", "view", accessToken);
}

export function likePost(id, accessToken) {
  performPostAction(id, "POST", "like", accessToken);
}

export function dislikePost(id, accessToken) {
  performPostAction(id, "DELETE", "like", accessToken);
}

function performPostAction(id, method, action, accessToken) {
  fetch(`${import.meta.env.VITE_APP_API_URL}/posts/${id}/${action}`, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  });
}
