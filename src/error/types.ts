export type ApiError = {
  message: string;
  request?: unknown;
  response?: {
    status: number;
    data?: { message: string };
  };
};
