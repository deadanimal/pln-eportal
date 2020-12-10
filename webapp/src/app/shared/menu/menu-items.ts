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
    path: "/dashboard",
    title: "Dashboard",
    type: "link",
    icontype: "fas fa-desktop text-primary",
  },
  {
    path: "/shows",
    title: "Tayangan",
    type: "sub",
    icontype: "fas fa-film text-primary",
    collapse: "shows",
    isCollapsed: true,
    children: [
      { path: "list", title: "Senarai", type: "link" },
      { path: "schedule", title: "Jadual", type: "link" },
      { path: "applications", title: "Permohonan", type: "link" },
    ],
  },
  {
    path: "/simulator-ride",
    title: "Kembara Simulasi",
    type: "sub",
    icontype: "fas fa-space-shuttle text-primary",
    collapse: "simulator-ride",
    isCollapsed: true,
    children: [
      { path: "schedule", title: "Jadual", type: "link" },
      { path: "applications", title: "Permohonan", type: "link" },
    ],
  },
  {
    path: "/exhibits",
    title: "Pameran",
    type: "sub",
    icontype: "fas fa-person-booth text-primary",
    collapse: "exhibits",
    isCollapsed: true,
    children: [{ path: "list", title: "Senarai", type: "link" }],
  },
  {
    path: "/visits",
    title: "Lawatan",
    type: "sub",
    icontype: "fas fa-binoculars text-primary",
    collapse: "visits",
    isCollapsed: true,
    children: [
      { path: "list", title: "Senarai", type: "link" },
      { path: "applications", title: "Permohonan", type: "link" },
      // { path: "schedule", title: "Jadual Penutupan", type: "link" },
    ],
  },
  {
    path: "/programs",
    title: "Program Pendidikan",
    type: "sub",
    icontype: "fas fa-book-reader text-primary",
    collapse: "programs",
    isCollapsed: true,
    children: [
      { path: "list", title: "Senarai", type: "link" },
      { path: "applications", title: "Permohonan", type: "link" },
      // { path: 'waiting-list', title: 'Senarai Menunggu', type: 'link' }
    ],
  },
  {
    path: "/facilities",
    title: "Fasiliti",
    type: "sub",
    icontype: "fas fa-university text-primary",
    collapse: "facilities",
    isCollapsed: true,
    children: [
      { path: "subcategory", title: "Subkategori", type: "link" },
      { path: "list", title: "Senarai", type: "link" },
      { path: "applications", title: "Permohonan", type: "link" },
    ],
  },
  {
    path: "/publications",
    title: "Penerbitan",
    type: "sub",
    icontype: "fas fa-book text-primary",
    collapse: "publications",
    isCollapsed: true,
    children: [{ path: "list", title: "Senarai", type: "link" }],
  },
  {
    path: "/virtual-libraries",
    title: "Kutubkhanah Mini",
    type: "sub",
    icontype: "fas fa-book-open text-primary",
    collapse: "virtual-libraries",
    isCollapsed: true,
    children: [
      { path: "list", title: "Kategori", type: "link" },
      { path: "articles", title: "Artikel Terkini", type: "link" },
      { path: "collections", title: "Koleksi", type: "link" },
    ],
  },
  // {
  //   path: "/tickets",
  //   title: "Tiket",
  //   type: "sub",
  //   icontype: "fas fa-ticket-alt text-primary",
  //   collapse: "tickets",
  //   isCollapsed: true,
  //   children: [{ path: "prices", title: "Harga", type: "link" }],
  // },
  {
    path: "/surveys",
    title: "Soal Selidik",
    type: "sub",
    icontype: "fas fa-poll-h text-primary",
    collapse: "surveys",
    isCollapsed: true,
    children: [{ path: "list", title: "Senarai", type: "link" }],
  },
  {
    path: "/feedbacks",
    title: "Maklum Balas",
    type: "sub",
    icontype: "fas fa-comments text-primary",
    collapse: "feedbacks",
    isCollapsed: true,
    children: [{ path: "list", title: "Senarai", type: "link" }],
  },
  // {
  //   path: "/assets",
  //   title: "Aset",
  //   type: "sub",
  //   icontype: "fas fa-box text-primary",
  //   collapse: "assets",
  //   isCollapsed: true,
  //   children: [{ path: "list", title: "Senarai", type: "link" }],
  // },
  {
    path: "/venues",
    title: "Tempat",
    type: "sub",
    icontype: "fas fa-monument text-primary",
    collapse: "assets",
    isCollapsed: true,
    children: [{ path: "list", title: "Senarai", type: "link" }],
  },
  {
    path: "/analytics",
    title: "Analitik",
    type: "sub",
    icontype: "fas fa-chart-bar text-primary",
    collapse: "reports",
    isCollapsed: true,
    children: [
      {
        path: "total-ticket-sales-shows",
        title: "Jumlah Jualan Tiket Tayangan",
        type: "link",
      },
      {
        path: "total-ticket-sales-simulator-rides",
        title: "Jumlah Jualan Tiket Kembara Simulasi",
        type: "link",
      },
      {
        path: "total-downloads-pdf-publication",
        title: "Bilangan muat-turun (PDF) penerbitan",
        type: "link",
      },
      {
        path: "total-downloads-pdf-virtual-library",
        title: "Bilangan muat-turun (PDF) kutubkhanah mini",
        type: "link",
      },
      {
        path: "number-of-visitors",
        title: "Bilangan Pengunjung",
        type: "link",
      },
      {
        path: "number-of-facility-bookings",
        title: "Bilangan Tempahan Fasiliti",
        type: "link",
      },
      {
        path: "number-of-program-participants",
        title: "Bilangan Peserta Program",
        type: "link",
      },
      {
        path: "daily-sales-quotes",
        title: "Kutipan Jualan Harian",
        type: "link",
      },
    ],
  },
  {
    path: "/reports",
    title: "Laporan",
    type: "sub",
    icontype: "fas fa-file text-primary",
    collapse: "reports",
    isCollapsed: true,
    children: [
      { path: "operation", title: "Operasi", type: "link" },
      { path: "analysis", title: "Analisa", type: "link" },
      { path: "ticket-sales", title: "Penjualan Tiket", type: "link" },
    ],
  },
  // {
  //   path: '/calendar',
  //   title: 'Kalendar',
  //   type: 'link',
  //   icontype: 'fas fa-calendar-alt text-primary'
  // }
  {
    path: "/cms",
    title: "Pentadbiran CMS",
    type: "sub",
    icontype: "fas fa-cog text-primary",
    collapse: "cms",
    isCollapsed: true,
    children: [
      {
        path: "modules",
        title: "Modul",
        type: "link",
      },
      {
        path: "whatisinterestings",
        title: "Apa Yang Menarik",
        type: "link",
      },
      {
        path: "dynamic-contents",
        title: "Kandungan Dinamik",
        type: "link",
      },
      {
        path: "banners",
        title: "Banner",
        type: "link",
      },
      {
        path: "employee-directories",
        title: "Direktori Pegawai",
        type: "link",
      },
      {
        path: "faqs",
        title: "FAQ",
        type: "link",
      },
      {
        path: "ratings",
        title: "Nilai Perkhidmatan Kami",
        type: "link",
      },
      {
        path: "quick-links",
        title: "Pautan Pantas",
        type: "link",
      },
      {
        path: "announcements",
        title: "Pengumuman",
        type: "link",
      },
      { path: "partners", title: "Rakan Kerjasama", type: "link" },
    ],
  },
  {
    path: "/managements",
    title: "Pentadbiran",
    type: "sub",
    icontype: "fas fa-cogs text-primary",
    collapse: "managements",
    isCollapsed: true,
    children: [
      { path: "users", title: "Pengguna", type: "link" },
      { path: "email-templates", title: "Templat Emel", type: "link" },
    ],
  },
];
