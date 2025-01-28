export async function getAllPosts({ limit, offset, replyToId, ownerId, search }, accessToken) {
  const params = { limit: limit, offset: offset };
  if (+replyToId > 0) {
    params.reply_to_id = replyToId;
  }
  if (+ownerId > 0) {
    params.owner_id = ownerId;
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

export async function viewPost(id, accessToken) {
  await performPostAction(id, "POST", "view", accessToken);
}

export async function likePost(id, accessToken) {
  await performPostAction(id, "POST", "like", accessToken);
}

export async function dislikePost(id, accessToken) {
  await performPostAction(id, "DELETE", "like", accessToken);
}

async function performPostAction(id, method, action, accessToken) {
  await fetch(`${import.meta.env.VITE_APP_API_URL}/posts/${id}/${action}`, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  });
}

export async function makePost({ text, replyToId }, accessToken) {
  const rawResponse = await fetch(`${import.meta.env.VITE_APP_API_URL}/posts`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify({ text, reply_to_id: replyToId })
  });
  const response = await rawResponse.json();
  if (rawResponse.ok) {
    return response;
  } else {
    throw new Error(response.error);
  }
}
