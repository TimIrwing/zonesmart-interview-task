export async function getJSON(url, options) {
  const defOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = await fetch(url, { ...defOptions, ...options });

  return response.json();
}

export async function refreshToken() {
  const storage = window.localStorage;
  const token = storage.getItem('access');

  const { code } = await getJSON('http://utss.su/api/auth/jwt/verify/', {
    body: JSON.stringify({ token }),
  });

  if (code === 'token_not_valid') {
    const refresh = storage.getItem('refresh');

    const { access } = await getJSON('http://utss.su/api/auth/jwt/refresh/', {
      body: JSON.stringify({ refresh }),
    });

    storage.setItem('access', access);
  }
}
