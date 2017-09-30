export enum ACTION {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  ROUTE = 'ROUTE',
}

export enum COUNTRY {
  US = 'us',
  DE = 'de',
  RU = 'ru',
}

export interface IActionModel {
  op: ACTION;
  user?: string;
  urlParams: Array<string>;
  country?: string;
}


export interface IStateModel {
  action: IActionModel;
  urlParams: Array<string>;
  user: string;
  country: string;
  menu: Array<IMenuModel>;
}


export interface IUserModel {
  id: number;
  nameFirst: string;
  nameLast: string;
  countryDefault: string;
  countries: Array<string>;
}

export interface IMenuModel {
  id: number;
  active: boolean;
  name: string;
  allowedCountries: Array<string>;
  isComponent: boolean;
  routerPath: string;
  urlParams: Array<string>;
}
