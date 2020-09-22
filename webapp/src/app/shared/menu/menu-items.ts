export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    isCollapsed?: boolean;
    isCollapsing?: any;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    type?: string;
    collapse?: string;
    children?: ChildrenItems2[];
    isCollapsed?: boolean;
}
export interface ChildrenItems2 {
    path?: string;
    title?: string;
    type?: string;
}
//Menu Items
export const ROUTES: RouteInfo[] = [
  {
    path: '/admin/dashboard',
    title: 'Dashboard',
    type: 'link',
    icontype: 'fas fa-desktop text-warning'
  },
  {
    path: '/admin/showing',
    title: 'Showing',
    type: 'sub',
    icontype: 'fas fa-film text-green',
    collapse: 'showing',
    isCollapsed: true,
    children: [
      { path: 'showtime', title: 'Showtime', type: 'link' },
      { path: 'database', title: 'Database', type: 'link' }
    ]
  },
  {
    path: '/admin/ticketing',
    title: 'Ticketing',
    type: 'link',
    icontype: 'fas fa-ticket-alt text-pink'
  },
  {
    path: '/admin/management',
    title: 'Management',
    type: 'sub',
    icontype: 'fas fa-cogs text-purple',
    collapse: 'management',
    isCollapsed: true,
    children: [
      { path: 'user', title: 'User', type: 'link' }
    ]
  },
  {
    path: '/admin/educational-program',
    title: 'Educational Program',
    type: 'sub',
    icontype: 'fas fa-book-reader text-green',
    collapse: 'program',
    isCollapsed: true,
    children: [
      { path: 'database', title: 'Database', type: 'link' }
    ]
  },
  {
    path: '/admin/visit',
    title: 'Visit',
    type: 'sub',
    icontype: 'fas fa-users text-orange',
    collapse: 'visit',
    isCollapsed: true,
    children: [
      { path: 'application', title: 'Application', type: 'link' }
    ]
  },
  {
    path: '/admin/report',
    title: 'Report',
    type: 'link',
    icontype: 'far fa-file-alt text-yellow'
  },
  {
    path: '/admin/analytics',
    title: 'Analytics',
    type: 'link',
    icontype: 'far fa-chart-bar text-blue'
  }
];

/*
{
  path: '',
  title: '',
  type: 'link',
  icontype: ''
}
*/