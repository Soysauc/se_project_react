const baseUrl = 'http://localhost:3001';
// const headers = {
//   'Content-Type': 'application/json',
// };

const handleServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
};
function req(url, options) {
  return fetch(url, options).then(handleServerResponse);
}

const getItems = (token) => {
  return req(`${baseUrl}/items`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'authorization': `Bearer ${token}`,
    },
  });
};

const addItem = async (name, imageUrl, weather, token) => {
  return req(`${baseUrl}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  });
};

const deleteItem = (id, token) => {
  return req(`${baseUrl}/items/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'authorization': `Bearer ${token}`,
    },
  });
};

export { getItems, addItem, deleteItem };
