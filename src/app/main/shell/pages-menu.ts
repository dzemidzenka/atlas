import { NbMenuItem } from '@nebular/theme';
import { VIEW } from '../../models/models';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    target: VIEW.DASHBOARD
  },
  {
    title: 'Favorites',
    target: VIEW.FAVORITE
  },
  {
    title: 'Recent',
    target: VIEW.RECENT
  },
  {
    title: 'User',
    icon: 'nb-keypad',
    children: [
      {
        title: 'Profile',
        icon: 'nb-keypad',
        target: 'profile'
      },
      {
        title: 'Logout',
        icon: 'nb-keypad',
        target: 'logout'
      }
    ]
  }
];
