import common from './environment.common';

const apiUrl = 'http://atlasglobal-dev.nuvasive.com/api/';


export const environment = {
  production: true,
  apiUrl: apiUrl,
  logInUrl: apiUrl + 'token',
  users: {
    tenants: apiUrl + 'V1/en-us/users/tenants?q=names',
    users: 'http://de.atlasglobal-dev.nuvasive.com/api/V1/en-us/users',
    claims: apiUrl + 'V1/en-us/users/claims?q=[claimtypes,rolenames]'
  },
  ...common
};
