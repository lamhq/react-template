export type ApiError = {
  message: string;
  request?: unknown;
  response?: {
    status: number;
  };
};
