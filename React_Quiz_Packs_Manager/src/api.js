export const api = async (url, options = {}) => {
  const res = await fetch(`http://localhost:3000${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  let data;

  try {
    data = await res.json();
  } catch {
    data = {};
  }

  if (!res.ok) {
    throw new Error(data.error || "API error");
  }

  return data;
};
