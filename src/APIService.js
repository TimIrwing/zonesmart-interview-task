const CREATE_PATH = 'http://utss.su/api/auth/jwt/create/';
const VERIFY_PATH = 'http://utss.su/api/auth/jwt/verify/';
const REFRESH_PATH = 'http://utss.su/api/auth/jwt/refresh/';
const CHANNELS_PATH = 'http://utss.su/api/user_channel/';
const STORAGE = window.localStorage;
const ACCESS_NAME = 'access';
const REFRESH_NAME = 'refresh';

async function getJSON(url, options) {
  const defOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = await fetch(url, { ...defOptions, ...options });

  return response.json();
}

export async function setToken(email, password) {
  const { refresh, access, detail } = await getJSON(CREATE_PATH, {
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!access) throw new Error(detail);

  STORAGE.setItem(ACCESS_NAME, access);
  STORAGE.setItem(REFRESH_NAME, refresh);
}

export async function refreshToken() {
  const token = STORAGE.getItem(ACCESS_NAME);

  if (!token) throw new Error('No token available');

  const { code } = await getJSON(VERIFY_PATH, {
    body: JSON.stringify({ token }),
  });

  if (code === 'token_not_valid') {
    const refresh = STORAGE.getItem(REFRESH_NAME);

    const { access } = await getJSON(REFRESH_PATH, {
      body: JSON.stringify({ refresh }),
    });

    STORAGE.setItem(ACCESS_NAME, access);
  }
}


export async function getChannels() {
  await refreshToken();

  const res = await getJSON(CHANNELS_PATH, {
    method: 'GET',
    headers: {
      Authorization: `JWT ${STORAGE.getItem(ACCESS_NAME)}`,
    },
  });

  return res.results;
}
