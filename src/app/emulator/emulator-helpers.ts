import * as http from 'http';

import { EmulatorInfo } from './emulator-info';

/**
 * Returns the HTTP response status code.
 * @see: https://firebase.google.com/docs/emulator-suite/connect_firestore#clear_your_database_between_tests
 */
export function clearDatabase(projectId: string) {
  const options: http.RequestOptions = {
    host: EmulatorInfo.host,
    path: `/emulator/v1/projects/${projectId}/databases/(default)/documents`,
    method: 'DELETE',
    port: EmulatorInfo.firestore.port,
  };

  return new Promise<number | undefined>((resolve, reject) => {
    const req = http.request(options, (res) => {
      resolve(res.statusCode);
      res.destroy();
    });

    req.end();

    req.on('error', (error) => {
      reject(error);
    });
  });
}

/**
 *  * Returns the HTTP response status code.
 * @see: https://firebase.google.com/docs/reference/rest/auth#section-auth-emulator-clearaccounts
 */
export function clearUserAccounts(projectId: string) {
  const options: http.RequestOptions = {
    host: EmulatorInfo.host,
    path: `/emulator/v1/projects/${projectId}/accounts`,
    method: 'DELETE',
    port: EmulatorInfo.auth.port,
  };

  return new Promise<number | undefined>((resolve, reject) => {
    const req = http.request(options, (res) => {
      resolve(res.statusCode);
      res.destroy();
    });

    req.end();

    req.on('error', (error) => {
      reject(error);
    });
  });
}
