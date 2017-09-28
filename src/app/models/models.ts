export enum ACTION {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  ROUTE = 'ROUTE',
}


export interface IActionModel {
  op: ACTION;
  user?: string;
  country?: string;
  component?: string;
  folder?: string;
}


export interface IStateModel {
  actions: Array<IActionModel>;
  user: string;
  country: string;
  component: string;
  folder: string;
}


export interface IUserModel {
  id: number;
  nameFirst: string;
  nameLast: string;
  country: string;
}

