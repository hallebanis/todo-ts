import HttpErrorModel from '../models/HttpErrorModel';

const httpCodes = {
  BAD_REQUEST: new HttpErrorModel('Bad Request', 'Bad Request', 400),
  UNAUTORIZED: new HttpErrorModel('unauthorized', 'unauthorized', 401),
  FORBIDDEN: new HttpErrorModel('Forbidden', 'Forbidden', 403),
  NOT_FOUND: new HttpErrorModel('not found', 'not found', 404),
  INVALID_TOKEN: new HttpErrorModel('invalid token', 'invalid token', 498),
  UNPROCESSABLE: new HttpErrorModel(
    'Unprocessable Content',
    'Unprocessable Content ',
    422
  ),
  SERVICE_UNAVAILMABLE: new HttpErrorModel(
    'server',
    'Service Unavailable',
    503
  ),
};
export default httpCodes;
