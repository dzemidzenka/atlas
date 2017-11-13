// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import common from './environment.common';

const apiUrl = 'http://atlasglobal-dev.nuvasive.com/api/';

export const environment = {
  production: false,
  apiUrl: apiUrl,
  logInUrl: apiUrl + 'token',
  users: {
    tenants: apiUrl + 'V1/en-us/users/tenants?q=names',
    users: 'http://de.atlasglobal-dev.nuvasive.com/api/V1/en-us/users',
    claims: apiUrl + 'V1/en-us/users/claims?q=[claimtypes,rolenames]'
  },
  ...common
};
