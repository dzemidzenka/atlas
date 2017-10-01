export enum ACTION {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  ROUTE = 'ROUTE',
  LANGUAGE = 'LANGUAGE',
  MENU_VIEW_TCODE = 'MENU_VIEW_TCODE',
  MENU_FAVORITE_ADD = 'MENU_FAVORITE_ADD',
  MENU_FAVORITE_REMOVE = 'MENU_FAVORITE_REMOVE',
}


export enum COUNTRY {
  US = 'us',
  DE = 'de',
  RU = 'ru',
}


export enum LANGUAGE {
  ENSLISH = 'ENSLISH',
  GERMAN = 'GERMAN',
  RUSSIAN = 'RUSSIAN',
}

export enum VIEW {
  DASHBOARD = 'dashboard',
  FAVORITE = 'favorite',
  RECENT = 'recent',
}

export interface IActionModel {
  op: ACTION;
  user?: IUserModel;
  url?: string;
  urlParams?: Array<string>;
  queryParams?: Array<string>;
  country?: string;
  language?: LANGUAGE;
  menuItem?: IMenuModel;
}


export interface IStateModel {
  action: IActionModel;
  url: string;
  urlParams: Array<string>;
  queryParams: Array<string>;
  user: IUserModel;
  country: string;
  language: LANGUAGE;
  view: VIEW;
  menu: Array<IMenuModel>;
  menuRecent: Array<string>;
  menuViewTcode: boolean;
}


export interface IUserModel {
  id: number;
  nameFirst: string;
  nameLast: string;
  nameDisplay: string;
  countryDefault: string;
  allowedCountries: Array<string>;
}


export interface IMenuModel {
  id: number;
  active: boolean;
  name: string;
  isComponent: boolean;
  routerPath: string;
  urlParams: Array<string>;
  tcode: string;
  isFavorite: boolean;
}
