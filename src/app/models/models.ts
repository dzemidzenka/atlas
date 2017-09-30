export enum ACTION {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  ROUTE = 'ROUTE',
  LANGUAGE = 'LANGUAGE',
  MENU_VIEW_TCODE = 'MENU_VIEW_TCODE',
  MENU_VIEW_FAVORITE = 'MENU_FAVORITE_VIEW',
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

export interface IActionModel {
  op: ACTION;
  user?: IUserModel;
  urlParams?: Array<string>;
  country?: string;
  language?: LANGUAGE;
}


export interface IStateModel {
  action: IActionModel;
  urlParams: Array<string>;
  user: IUserModel;
  country: string;
  language: LANGUAGE;
  menu: Array<IMenuModel>;
  menuTcodeView: boolean;
}


export interface IUserModel {
  id: number;
  nameFirst: string;
  nameLast: string;
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
  favorite: boolean;
}
