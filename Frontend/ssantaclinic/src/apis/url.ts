export const DEV = false;

const PORT_WEB = ':3000';
const PORT_SERVER = ':8080';

const URL_LOCAL = 'http://localhost';
const URL_RELEASE = 'https://k7a201.p.ssafy.io';

export const API_BASE_URL =
  (DEV ? `${URL_LOCAL}${PORT_SERVER}` : URL_RELEASE) + '/api/';
