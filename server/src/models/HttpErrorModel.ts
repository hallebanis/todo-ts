import HttpError from "../interfaces/HttpError";

class HttpErrorModel implements HttpError {
  name: string;
  cause: string | undefined;
  message: string;
  code: number;
  privateStack: string | undefined;
  constructor(
    name: string,
    message: string,
    code: number,
    cause: string | undefined = undefined,
    privateStack: string | undefined = undefined
  ) {
    this.name = name;
    this.code = code;
    this.message = message;
    if (cause) this.cause = cause;
    if (privateStack) this.stack = privateStack;
  }
  get stack(): string | undefined {
    return this.privateStack;
  }

  set stack(value: string | undefined) {
    this.privateStack = value;
  }
}

export default HttpErrorModel;
