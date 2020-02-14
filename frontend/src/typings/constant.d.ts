enum FetchStates {
  NONE = '',
  INIT = 'init',
  FETCHING = 'fetching',
  ERROR = 'error',
  SUCCESS = 'success',
  NOTFOUND = 'notFound',
}

interface StateWise {
  status: FetchStates;
  message?: string;
}

interface ApiDefaultResponse {
  type: string;
  message?: string;
}
