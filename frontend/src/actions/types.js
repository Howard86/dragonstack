const typeForm = (name, options = []) => {
  let DEFAULT = {
    FETCH: `${name}_FETCH`,
    FETCH_ERROR: `${name}_FETCH_ERROR`,
    FETCH_SUCCESS: `${name}_FETCH_SUCCESS`,
  };

  if (options.length > 0) {
    options.forEach(option => {
      let key = `FETCH_${option[0]}_${option[1]}`;
      let value = `${name}_${key}`;
      DEFAULT[key] = value;
    });
  }

  return DEFAULT;
};

// const GENERATION = {
//   FETCH: 'GENERATION_FETCH',
//   FETCH_ERROR: 'GENERATION_FETCH_ERROR',
//   FETCH_SUCCESS: 'GENERATION_FETCH_SUCCESS',
// };

// const DRAGON = {
//   FETCH: 'DRAGON_FETCH',
//   FETCH_ERROR: 'DRAGON_FETCH_ERROR',
//   FETCH_SUCCESS: 'DRAGON_FETCH_SUCCESS',
// };

// const ACCOUNT = {
//   FETCH: 'ACCOUNT_FETCH',
//   FETCH_ERROR: 'ACCOUNT_FETCH_ERROR',
//   FETCH_SUCCESS: 'ACCOUNT_FETCH_SUCCESS',
//   FETCH_LOGOUT_SUCCESS: 'ACCOUNT_FETCH_LOGOUT_SUCCESS',
//   // FETCH_LOGIN_SUCCESS: 'ACCOUNT_FETCH_LOGIN_SUCCESS',
//   FETCH_AUTHENTICATED_SUCCESS: 'ACCOUNT_FETCH_AUTHENTICATED_SUCCESS',
// };

const GENERATION = typeForm('GENERATION');
const DRAGON = typeForm('DRAGON');
const ACCOUNT = typeForm('ACCOUNT', [
  ['LOGOUT', 'SUCCESS'],
  ['AUTHENTICATED', 'SUCCESS'],
]);
const ACCOUNT_DRAGONS = typeForm('ACCOUNT_DRAGON');
const ACCOUNT_INFO = typeForm('ACCOUNT_INFO');
const PUBLIC_DRAGONS = typeForm('PUBLIC_DRAGONS');

export {
  GENERATION,
  DRAGON,
  ACCOUNT,
  ACCOUNT_DRAGONS,
  ACCOUNT_INFO,
  PUBLIC_DRAGONS,
};
