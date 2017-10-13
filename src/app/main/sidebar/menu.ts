// import { NbMenuItem } from '@nebular/theme';
import { VIEW } from '../../models/models';

// export const MENU_ITEMS: NbMenuItem[] = [
  export const MENU_ITEMS = [
    // {
  //   title: 'Dashboard',
  //   target: VIEW.DASHBOARD
  // },
  // {
  //   title: 'Favorites',
  //   target: VIEW.FAVORITE
  // },
  // {
  //   title: 'Recent',
  //   target: VIEW.RECENT
  // },
  {
    title: 'User',
    icon: 'nb-keypad',
    children: [
      {
        title: 'Profile',
        target: 'profile'
      },
      {
        title: 'Logout',
        target: 'logout'
      }
    ]
  }
];
