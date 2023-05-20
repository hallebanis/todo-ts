interface HttpError extends Error {
  code: number;
  stack?: string;
  message: string;
  cause?: string;
}
export default HttpError;
