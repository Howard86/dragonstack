type FetchStatesType =
  | 'none'
  | 'init'
  | 'fetching'
  | 'error'
  | 'success'
  | 'notFound';
interface StateWise {
  status: FetchStatesType;
  message?: string;
}

interface ApiDefaultResponse {
  type: string;
  message?: string;
}

// TODO: remove ok response
interface OkResponse {
  ok: boolean;
}
