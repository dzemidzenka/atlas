import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  // {
  //   title: 'Dashboard',
  //   icon: 'nb-home',
  //   link: '/us',
  //   home: true,
  // },
  {
    title: 'Atlas',
    icon: 'nb-keypad',
    children: [
      {
        title: 'Manage',
        icon: 'nb-list',
        children: [
          {
            title: 'Customer Relationships',
            link: 'us/atlas/manage/customer_relationships',
          },
          {
            title: 'Product Configuration',
            link: 'us/atlas/manage/product_configuration',
          },
          {
            title: 'Shipping',
            link: 'us/atlas/manage/shipping',
          },
          {
            title: 'Warehouse Picking Order',
            link: 'us/atlas/manage/warehouse_picking_order',
          },
          {
            title: 'Users',
            link: 'us/atlas/manage/users',
          },
          {
            title: 'Localization',
            link: 'us/atlas/manage/localization',
          },
          {
            title: 'Subscriptions',
            link: 'us/atlas/manage/subscriptions',
          },
        ],
      },
      {
        title: 'Inventory',
        icon: 'nb-keypad',
        link: '/us/atlas/inventory',
        children: [
          {
            title: 'Contrained Materials',
            link: 'us/atlas/inventory/contrained_materials',
          },
          {
            title: 'Set Inventory',
            link: 'us/atlas/inventory/set_inventory',
          },
          {
            title: 'Set Shipping',
            link: 'us/atlas/inventory/set_shipping',
          },
          {
            title: 'Billing Extras',
            link: 'us/atlas/inventory/billing_extras',
          },
          {
            title: 'Sub To Sub Request',
            link: 'us/atlas/inventory/sub_to_sub_request',
          },
        ],
      },
      {
        title: 'Reports',
        icon: 'nb-gear',
        link: '/us/atlas/reports',
        children: [{
          title: 'Orders',
          link: 'us/atlas/reports/orders',
        }, {
          title: 'Inventory',
          link: 'us/atlas/reports/inventory',
        }, {
          title: 'Customer Relationships',
          link: 'us/atlas/reports/customer_relationships',
        },
        ],
      },
    ]
  },


  {
    title: 'SAP',
    icon: 'nb-keypad',
    children: [
      {
        title: 'Report1',
        icon: 'nb-location',
        link: 'us/sap/app1',
      },
      {
        title: 'Report2',
        icon: 'nb-bar-chart',
        link: 'us/sap/app2',
      },
      {
        title: 'Report3',
        icon: 'nb-title',
        link: 'us/sap/app3',
      },
    ]
  },

  // {
  //   title: 'Maps',
  //   icon: 'nb-location',
  //   children: [
  //     {
  //       title: 'Google Maps',
  //       link: '/pages/maps/gmaps',
  //     },
  //     {
  //       title: 'Leaflet Maps',
  //       link: '/pages/maps/leaflet',
  //     },
  //     {
  //       title: 'Bubble Maps',
  //       link: '/pages/maps/bubble',
  //     },
  //   ],
  // },
  // {
  //   title: 'Charts',
  //   icon: 'nb-bar-chart',
  //   children: [
  //     {
  //       title: 'Echarts',
  //       link: '/pages/charts/echarts',
  //     },
  //     {
  //       title: 'Charts.js',
  //       link: '/pages/charts/chartjs',
  //     },
  //     {
  //       title: 'D3',
  //       link: '/pages/charts/d3',
  //     },
  //   ],
  // },
  // {
  //   title: 'Editors',
  //   icon: 'nb-title',
  //   children: [
  //     {
  //       title: 'TinyMCE',
  //       link: '/pages/editors/tinymce',
  //     },
  //     {
  //       title: 'CKEditor',
  //       link: '/pages/editors/ckeditor',
  //     },
  //   ],
  // },
  // {
  //   title: 'Tables',
  //   icon: 'nb-tables',
  //   children: [
  //     {
  //       title: 'Smart Table',
  //       link: '/pages/tables/smart-table',
  //     },
  //   ],
  // },
  // {
  //   title: 'Auth',
  //   icon: 'nb-locked',
  //   children: [
  //     {
  //       title: 'Login',
  //       link: '/auth/login',
  //     },
  //     {
  //       title: 'Register',
  //       link: '/auth/register',
  //     },
  //     {
  //       title: 'Request Password',
  //       link: '/auth/request-password',
  //     },
  //     {
  //       title: 'Reset Password',
  //       link: '/auth/reset-password',
  //     },
  //   ],
  // },
];
