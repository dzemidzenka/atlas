export enum ACTION {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  ROUTE = 'ROUTE',
  LANGUAGE = 'LANGUAGE',
  FAVORITE_TOGGLE = 'FAVORITE_TOGGLE',
  NOTIFICATION = 'NOTIFICATION',
  NOTIFICATION_CLEAR = 'NOTIFICATION_CLEAR',
  DASHBOARD_THEME = 'DASHBOARD_THEME'
}


export enum COUNTRY {
  US = 'us',
  DE = 'de',
  RU = 'ru',
}


export enum LANGUAGE {
  EN = 'en',
  DE = 'de',
  RU = 'ru',
}

export enum VIEW {
  DASHBOARD = 'dashboard',
  FAVORITE = 'favorites',
  RECENT = 'recent',
}

export enum DASHBOARD_THEME {
  TILES = 'TILES',
  STICKY_NOTES = 'STICKY_NOTES',
}



export const TOASTER_DURATION = 2000;
export const MAX_OF_FAVORITES = 5;



export interface IActionModel {
  op: ACTION;
  user?: IUserModel;
  url?: string;
  urlParams?: Array<string>;
  queryParams?: Array<string>;
  country?: string;
  language?: LANGUAGE;
  menuItem?: IMenuModel;
  dashboard_theme?: DASHBOARD_THEME;
  notifications?: Array<INotificationModel>;
}


export interface IStateModel {
  action: IActionModel;
  url: string;
  urlParams: Array<string>;
  queryParams: Array<string>;
  isComponent: boolean;
  isLoggedIn: boolean;
  user: IUserModel;
  country: string;
  language: LANGUAGE;
  view: VIEW;
  theme: DASHBOARD_THEME;
  menu: Array<IMenuModel>;
  menuItemCurrent: IMenuModel;
  menuRecent: Array<IMenuModel>;
  notifications: Array<INotificationModel>;
}


export interface INotificationModel {
  message: string;
  date: number;
  doNotKeep?: boolean;
}

export interface IUserModel {
  id: number;
  email: string;
  nameFirst: string;
  nameLast: string;
  nameDisplay: string;
  countryDefault: COUNTRY;
  allowedCountries: Array<string>;
  defaultLanguage: LANGUAGE;
}


export interface IMenuModel {
  id: number;
  active: boolean;
  description: string;
  help: string;
  isComponent: boolean;
  isFavorite: boolean;
  routerPath: string;
  urlParams: Array<string>;
  tcode: string;
}
