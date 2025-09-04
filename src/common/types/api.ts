export type APISuccessResponse<T> = {
  message: string;
  data: T;
};

export type ApiError = {
  message: string;
  status?: number;
  info?: unknown;
};
