export enum fetchStates {
  fetching = 'fetching',
  error = 'error',
  success = 'success',
}

export interface ActionProps {
  type: string;
  message?: string;
  authenticated?: boolean;
  info?: any;
  dragon?: any;
  generation?: any;
  dragons?: any;
}
