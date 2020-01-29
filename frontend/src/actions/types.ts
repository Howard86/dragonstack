interface TypeProps {
  FETCH: string;
  FETCH_ERROR: string;
  FETCH_SUCCESS: string;
  FETCH_LOGOUT_SUCCESS?: string;
  FETCH_AUTHENTICATED_SUCCESS?: string;
}

const typeForm = (name: string, extra = false): TypeProps =>
  extra
    ? {
        FETCH: `${name}_FETCH`,
        FETCH_ERROR: `${name}_FETCH_ERROR`,
        FETCH_SUCCESS: `${name}_FETCH_SUCCESS`,
        FETCH_LOGOUT_SUCCESS: `${name}_FETCH_LOGOUT_SUCCESS`,
        FETCH_AUTHENTICATED_SUCCESS: `${name}_FETCH_AUTHENTICATED_SUCCESS`,
      }
    : {
        FETCH: `${name}_FETCH`,
        FETCH_ERROR: `${name}_FETCH_ERROR`,
        FETCH_SUCCESS: `${name}_FETCH_SUCCESS`,
      };

// enum ACCOUNT {
//   FETCH = 'ACCOUNT_FETCH',
//   FETCH_ERROR = 'ACCOUNT_FETCH_ERROR',
//   FETCH_SUCCESS = 'ACCOUNT_FETCH_SUCCESS',
//   FETCH_LOGOUT_SUCCESS = 'ACCOUNT_FETCH_LOGOUT_SUCCESS',
//   FETCH_AUTHENTICATED_SUCCESS = 'ACCOUNT_FETCH_AUTHENTICATED_SUCCESS',
// }

const ACCOUNT: TypeProps = typeForm('ACCOUNT', true);
const GENERATION: TypeProps = typeForm('GENERATION');
const DRAGON: TypeProps = typeForm('DRAGON');
const ACCOUNT_DRAGONS: TypeProps = typeForm('ACCOUNT_DRAGON');
const ACCOUNT_INFO: TypeProps = typeForm('ACCOUNT_INFO');
const PUBLIC_DRAGONS: TypeProps = typeForm('PUBLIC_DRAGONS');

export {
  GENERATION,
  DRAGON,
  ACCOUNT,
  ACCOUNT_DRAGONS,
  ACCOUNT_INFO,
  PUBLIC_DRAGONS,
};
