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
    path: '/dashboard',
    title: 'Dashboard',
    type: 'link',
    icontype: 'fas fa-desktop text-primary'
  },
  {
    path: '/shows',
    title: 'Tayangan',
    type: 'sub',
    icontype: 'fas fa-film text-primary',
    collapse: 'shows',
    isCollapsed: true,
    children: [
      { path: 'schedule', title: 'Jadual', type: 'link' },
      { path: 'list', title: 'Senarai', type: 'link' }
    ]
  },
  {
    path: '/simulator-ride',
    title: 'Kembaran Simulasi',
    type: 'sub',
    icontype: 'fas fa-space-shuttle text-primary',
    collapse: 'simulator-ride',
    isCollapsed: true,
    children: [
      { path: 'schedule', title: 'Jadual', type: 'link' },
      // { path: 'applications', title: 'Permohonan', type: 'link' }
    ]
  },
  {
    path: '/exhibits',
    title: 'Pameran',
    type: 'sub',
    icontype: 'fas fa-person-booth text-primary',
    collapse: 'exhibits',
    isCollapsed: true,
    children: [
      { path: 'list', title: 'Senarai', type: 'link' }
    ]
  },
  {
    path: '/visits',
    title: 'Lawatan',
    type: 'sub',
    icontype: 'fas fa-binoculars text-primary',
    collapse: 'visits',
    isCollapsed: true,
    children: [
      { path: 'applications', title: 'Permohonan', type: 'link' },
      { path: 'schedule', title: 'Jadual Penutupan', type: 'link' }
    ]
  },
  {
    path: '/programs',
    title: 'Program Pendidikan',
    type: 'sub',
    icontype: 'fas fa-book-reader text-primary',
    collapse: 'programs',
    isCollapsed: true,
    children: [
      { path: 'list', title: 'Senarai', type: 'link' },
      { path: 'applications', title: 'Permohonan', type: 'link' },
      { path: 'waiting-list', title: 'Senarai Menunggu', type: 'link' }
    ]
  },
  {
    path: '/facilities',
    title: 'Fasiliti',
    type: 'sub',
    icontype: 'fas fa-university text-primary',
    collapse: 'facilities',
    isCollapsed: true,
    children: [
      { path: 'list', title: 'Senarai', type: 'link' },
      { path: 'applications', title: 'Permohonan', type: 'link' }
    ]
  },
  {
    path: '/publications',
    title: 'Penerbitan',
    type: 'sub',
    icontype: 'fas fa-book-open text-primary',
    collapse: 'publications',
    isCollapsed: true,
    children: [
      { path: 'list', title: 'Senarai', type: 'link' }
    ]
  },
  {
    path: '/tickets',
    title: 'Tiket',
    type: 'sub',
    icontype: 'fas fa-ticket-alt text-primary',
    collapse: 'tickets',
    isCollapsed: true,
    children: [
      { path: 'prices', title: 'Harga', type: 'link' }
    ]
  },
  {
    path: '/surveys',
    title: 'Maklum Balas',
    type: 'sub',
    icontype: 'fas fa-poll-h text-primary',
    collapse: 'surveys',
    isCollapsed: true,
    children: [
      { path: 'forms', title: 'Senarai Borang', type: 'link' }
    ]
  },
  {
    path: '/reports',
    title: 'Laporan',
    type: 'sub',
    icontype: 'far fa-file-alt text-primary',
    collapse: 'reports',
    isCollapsed: true,
    children: [
      { path: 'operation', title: 'Operasi', type: 'link' },
      { path: 'analysis', title: 'Analisa', type: 'link' },
      { path: 'ticket-sales', title: 'Penjualan Tiket', type: 'link' }
    ]
  },
  {
    path: '/calendar',
    title: 'Kalendar',
    type: 'link',
    icontype: 'fas fa-calendar-alt text-primary'
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