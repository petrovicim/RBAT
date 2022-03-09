// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  base: 'http://localhost:3001/api/v1',
  assets_types: '/asset_types/',
  assets: '/assets/',
  entity_types: '/entity_types/',
  entities: '/entities/',
  QR_path: 'http://192.168.210.127:8443',
  history: '/history',
  groups: '/groups/',
  auth: '/auth',
  users: '/users/',
  sign_up: '/sign_up',
  sign_in: '/sign_in',
  sign_out: '/sign_out',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
