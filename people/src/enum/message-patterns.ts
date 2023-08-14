export enum MessagePatterns {
  CREATE_PERSON = 'CREATE_PERSON',
  GET_PERSON = 'GET_PERSON',
  UPDATE_PERSON = 'UPDATE_PERSON',
  DELETE_PERSON = 'DELETE_PERSON',
  CHANGE_ROLE = 'CHANGE_ROLE',
}

export enum ServiceStatus {
  NOT_FOUND = 'NOT_FOUND',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  SUCCESS = 'SUCCESS',
}

export type ServiceResponse<T> = {
  status: ServiceStatus;
  message?: string;
  data?: T;
};

export type ServiceRequest<T> = {
  data: T;
};
