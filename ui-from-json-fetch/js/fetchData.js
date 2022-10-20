async function fetchData(url) {
  const response = await fetch(url, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export { fetchData };
