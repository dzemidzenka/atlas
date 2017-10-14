export enum ACTION {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  ROUTE = 'ROUTE',
  LANGUAGE = 'LANGUAGE',
  COUNTRY = 'COUNTRY',
  FAVORITE_TOGGLE = 'FAVORITE_TOGGLE',
  NOTIFICATION = 'NOTIFICATION',
  NOTIFICATION_CLEAR = 'NOTIFICATION_CLEAR',
}

// valid 2char country codes at https://www.iso.org/obp/ui/#search
export enum COUNTRY {
  US = 'us',
  DE = 'de',
  RU = 'ru',
  FR = 'fr',
  IT = 'it',
  GB = 'gb',
  JP = 'jp'
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



export const TOASTER_DURATION = 2000;
export const MAX_OF_FAVORITES = 5;




export interface IActionModel {
  op: ACTION;
  user?: IUserModel;
  url?: string;
  urlParams?: Array<string>;
  queryParams?: Array<string>;
  country?: COUNTRY;
  language?: LANGUAGE;
  menuItem?: IMenuModel;
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
  country: COUNTRY;
  language: LANGUAGE;
  view: VIEW;
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
  languageDefault: LANGUAGE;
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
  iFrameUrl: string;
}
