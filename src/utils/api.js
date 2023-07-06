const baseUrl = 'http://localhost:3001';
// const headers = {
//   'Content-Type': 'application/json',
// };
function req(url, options) {
  return fetch(url, options).then(handleServerResponse);
}

const handleServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
};

const getItems = () => {
  return req(`${baseUrl}/items`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

const addItem = async (name, imageUrl, weather) => {
  return req(`${baseUrl}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  });
};

const deleteItem = (_id) => {
  return req(`${baseUrl}/items/${_id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
};
const addCardLike = (_id) => {
  return req(`${baseUrl}/items/${_id}/likes`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

const removeCardLike = (_id) => {
  return req(`${baseUrl}/items/${_id}/likes`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export { getItems, addItem, deleteItem, addCardLike, removeCardLike };
