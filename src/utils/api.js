const baseUrl = 'http://localhost:3001';
const headers = {
  'Content-Type': 'application/json',
};

const handleServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
};

const getItems = async () => {
  const res = await fetch(`${baseUrl}/items`, {
    method: 'GET',
    headers: headers,
  });
  // res.json().then(console.log);
  return handleServerResponse(res);
};

const addItem = async (name, imageUrl, weather) => {
  const res = await fetch(`${baseUrl}/items`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  });
  return handleServerResponse(res);
};

const deleteItem = async (id) => {
  const res = await fetch(`${baseUrl}/items/${id}`, {
    method: 'DELETE',
    headers: headers,
  });
  return handleServerResponse(res);
};

export { getItems, addItem, deleteItem };
