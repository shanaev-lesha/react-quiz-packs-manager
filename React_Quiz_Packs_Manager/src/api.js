export const api = async (url, options = {}) => {
  const res = await fetch(`http://localhost:3000${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "API error");
  }

  return data;
};
