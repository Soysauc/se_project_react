const baseUrl = 'http://localhost:3001';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else if (res.status === 401) {
    throw new Error('Invalid credentials');
  } else if (res.status === 409) {
    throw new Error('User exists');
  }
};
async function req(url, options) {
  const res = await fetch(url, options);
  return checkResponse(res);
}

export const signup = ({ name, avatar, email, password }) => {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(checkResponse);
};

export const signin = ({ email, password }) => {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(checkResponse)
    .then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        return data;
      }
    });
};
export const updateUser = (name, avatar, token) => {
  return req(`${baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  });
};
export const getUser = (token) => {
  return req(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`,
    },
  }).then((data) => {
    return data;
  });
};

// export const checkToken = (token) => {
//   return fetch(`${baseUrl}/user/me`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       'authorization': `Bearer ${token}`,
//     },
//   })
//     .then(checkResponse)
//     .then((data) => {
//       return data;
//     });
// };
