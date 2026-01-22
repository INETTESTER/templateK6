import { check } from 'k6';

export function error_check(response) {
  check(response, {
    '200 OK': (r) => r.status === 200,
    '201 Created': (r) => r.status === 201,
    '204 No Content': (r) => r.status === 204,
    '400 Bad Request': (r) => r.status === 400,
    '401 Unauthorized': (r) => r.status === 401,
    '403 Forbidden': (r) => r.status === 403,
    '404 Not Found': (r) => r.status === 404,
    '429 Too Many Requests': (r) => r.status === 429,
    '500 Internal Server Error': (r) => r.status === 500,
    '502 Bad Gateway': (r) => r.status === 502,
    '503 Service Unavailable': (r) => r.status === 503,
    '504 Gateway Timeout': (r) => r.status === 504,
  });
}