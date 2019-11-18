const CREATE_PATH = 'http://utss.su/api/auth/jwt/create/';
const VERIFY_PATH = 'http://utss.su/api/auth/jwt/verify/';
const REFRESH_PATH = 'http://utss.su/api/auth/jwt/refresh/';
const CHANNELS_PATH = 'http://utss.su/api/user_channel/';
const CATEGORY_PATH = 'http://utss.su/api/ebay/product/category/';
const STORAGE = window.localStorage;
const TOKEN_INVALID = 'token_not_valid';
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

async function refreshToken() {
  const token = STORAGE.getItem(ACCESS_NAME);

  if (!token) throw new Error('No token available');

  const { code } = await getJSON(VERIFY_PATH, {
    body: JSON.stringify({ token }),
  });

  if (code === TOKEN_INVALID) {
    const refresh = STORAGE.getItem(REFRESH_NAME);

    const { access } = await getJSON(REFRESH_PATH, {
      body: JSON.stringify({ refresh }),
    });

    if (access) {
      STORAGE.setItem(ACCESS_NAME, access);
    } else {
      throw new Error('Refresh failed');
    }
  }
}

function encodeParams(obj) {
  return Object.entries(obj).map(
    (pair) => pair.map(encodeURIComponent).join('='),
  ).join('&');
}

async function getListArray(options) {
  const STEP = 100;
  const params = {
    limit: STEP,
    offset: 0,
    ...options,
  };

  const result = [];
  let response;
  do {
    //  eslint-disable-next-line no-await-in-loop
    response = await getJSON(`${CATEGORY_PATH}?${encodeParams(params)}`, {
      method: 'GET',
      headers: {
        Authorization: `JWT ${STORAGE.getItem(ACCESS_NAME)}`,
      },
    });

    if (response.code === TOKEN_INVALID) {
      //  eslint-disable-next-line no-await-in-loop
      await refreshToken();
    } else {
      result.push(...response.results);
      params.offset += STEP;
    }
  } while (response.count > params.offset);

  return result;
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

export async function getCategoryList(options) {
  const params = {
    ...{
      level: 1,
      parent_id: '',
      is_leaf: '',
      variations_supported: '',
    },
    ...options,
  };

  return getListArray(params);
}
