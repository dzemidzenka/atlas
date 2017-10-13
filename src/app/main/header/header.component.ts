import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../providers/auth.service';
import { ReduxService } from '../../providers/redux.service';
import { ACTION, VIEW, DASHBOARD_THEME, COUNTRY, IUserModel } from '../../models/models';


@Component({
  selector: 'atlas-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  constructor(
    private _authService: AuthService,
    private _reduxService: ReduxService,
  ) { }

  VIEW = Object.values(VIEW);
  COUNTRY = Object.values(COUNTRY);

  @Output() sidebarToggle = new EventEmitter<void>();


  user: any;
  userMenu = [
    { title: 'Profile' },
    { title: 'Logout', target: 'logout' }
  ];


  items = [
    {
      label: 'INTL', icon: 'fa-check',
      items: [
        [
          {
            label: 'Manage',
            items: [
              { label: 'Customer Relationships', routerLink: 'intl/manage/intl-customer_relationships' },
              { label: 'Product Configuration', routerLink: 'intl/manage/intl-product_configuration' },
              { label: 'Shipping', routerLink: 'intl/manage/intl-shipping' },
              { label: 'Warehouse Picking Order', routerLink: 'intl/manage/intl-warehouse_picking_order' },
              { label: 'Users', routerLink: 'intl/manage/intl-users' },
              { label: 'Localization', routerLink: 'intl/manage/intl-localization' },
              { label: 'Subscriptions', routerLink: 'intl/manage/intl-subscriptions' },
            ]
          },

        ],
        [
          {
            label: 'Inventory',
            items: [
              { label: 'Constrained Materials', routerLink: 'intl/inventory/intl-constrained' },
              { label: 'Set Inventory', routerLink: 'intl/inventory/intl-set_inventory' },
              { label: 'Shipping', routerLink: 'intl/inventory/intl-shipping' },
              { label: 'Billing/Extras', routerLink: 'intl/inventory/intl-billing' },
              { label: 'Sub To Sub', routerLink: 'intl/inventory/intl-sub_to_sub' },
            ]
          },

        ],
        [
          {
            label: 'Reports',
            items: [
              { label: 'Orders Report', routerLink: 'intl/reports/intl-orders_report' },
              { label: 'Inventory Report', routerLink: 'intl/reports/intl-inventory_report' },
              { label: 'Customer Relationships Report', routerLink: 'intl/reports/intl-customer_relationships_report' },
            ]
          }
        ],
      ],
    },

    {
      label: 'CRM', icon: 'fa-check',
      items: [
        [
          {
            label: 'Apps',
            items: [
              { label: 'Contacts', routerLink: 'crm/crm-contacts' },
              { label: 'Accounts', routerLink: 'crm/crm-accounts' },
              { label: 'Sales Reps', routerLink: 'crm/crm-salesreps' },
              { label: 'Apperian', routerLink: 'crm/crm-apperian' },
              { label: 'Contract Pricing Requests', routerLink: 'crm/crm-pricing_requests' },
              { label: 'Event Requests', routerLink: 'crm/crm-event_requests' },
              { label: 'International Event Requests', routerLink: 'crm/crm-intl_event_requests' },
              { label: 'Permissions', routerLink: 'crm/crm-permissions' },
              { label: 'Configurations', routerLink: 'crm/crm-configurations' },
            ]
          },
        ],
      ],
    },
  ];




  state$ = this._reduxService.state$.map(state => Object.assign({
    country: state.country,
    isLoggedIn: state.isLoggedIn,
    user: state.user,
    notifications: state.notifications
  }));


  clearNotifications() {
    this._reduxService.actionClearNotifications();
  }

  switchView(view: VIEW) {
    this._reduxService.actionDashboard(view);
  }

  logOut() {
    this._authService.logOut();
  }


  menuClick(event) {
    if (event.target === 'logout') {
      this._authService.logOut();
    }
  }

  onSidebarToggle() {
    this.sidebarToggle.emit();
  }

  megaMenuClick(event) {
    console.log('MEGA', event);
  }
}
