export interface RouteInfo {
  path: string;
  title: string;
  type: string;
  icontype: string;
  collapse?: string;
  isCollapsed?: boolean;
  isCollapsing?: any;
  children?: ChildrenItems[];
  role?: Array<any>;
}

export interface ChildrenItems {
  path: string;
  title: string;
  type?: string;
  collapse?: string;
  children?: ChildrenItems2[];
  isCollapsed?: boolean;
  role?: Array<any>;
}
export interface ChildrenItems2 {
  path?: string;
  title?: string;
  type?: string;
}

/*
  List of All Roles

  DR - Director - Pengarah
  SA - Super Admin - Super Admin
  FA - Finance Admin - Pentadbir Kewangan
  TA - Technical Admin - Pentadbir Teknikal
  TC - Ticket Counter Admin - Pentadbir Kaunter Tiket
  VA - Visit Admin - Pentadbir Lawatan
  EP - Educational Program Admin - Pentadbir Program Pendidikan
  EA - Exhibition Admin - Pentadbir Pameran
  PK - Publishing & Kutubkhanah Admin - Pentadbir Penerbitan & Kutubkhanah
  SV - Survey Admin - Pentadbir Maklum Balas / Soal Selidik
  CS - Customer - Pelanggan
*/

// Menu Items
export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    type: "link",
    icontype: "fas fa-desktop text-primary",
    role: ["DR", "SA", "FA", "TA", "TC", "VA", "EP", "EA", "PK", "SV"],
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
    role: ["DR", "SA", "FA", "TA"],
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
    role: ["DR", "SA", "FA", "TA"],
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
    role: ["DR", "SA", "VA"],
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
    role: ["DR", "SA", "EP"],
  },
  {
    path: "/facilities",
    title: "Fasiliti",
    type: "sub",
    icontype: "fas fa-building text-primary",
    collapse: "facilities",
    isCollapsed: true,
    children: [
      { path: "subcategory", title: "Subkategori", type: "link" },
      { path: "list", title: "Senarai", type: "link" },
      { path: "applications", title: "Permohonan", type: "link" },
    ],
    role: ["DR", "SA", "FA", "TA"],
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
    role: ["DR", "SA", "PK"],
  },
  {
    path: "/publications",
    title: "Penerbitan",
    type: "link",
    icontype: "fas fa-book text-primary",
    role: ["DR", "SA", "PK"],
  },
  {
    path: "/exhibits",
    title: "Pameran",
    type: "link",
    icontype: "fas fa-person-booth text-primary",
    role: ["DR", "SA", "EA"],
  },
  {
    path: "/surveys",
    title: "Soal Selidik",
    type: "link",
    icontype: "fas fa-poll-h text-primary",
    role: ["DR", "SA", "SV"],
  },
  {
    path: "/feedbacks",
    title: "Maklum Balas",
    type: "link",
    icontype: "fas fa-comments text-primary",
    role: ["DR", "SA", "SV"],
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
    path: "/transactions",
    title: "Transaksi",
    type: "sub",
    icontype: "fas fa-cash-register text-primary",
    collapse: "transactions",
    isCollapsed: true,
    children: [
      {
        path: "ticket-prices",
        title: "Harga Tiket",
        type: "link",
      },
      {
        path: "refunds",
        title: "Bayaran Balik",
        type: "link",
      },
      {
        path: "vouchers",
        title: "Baucar",
        type: "link",
      },
      {
        path: "carts",
        title: "Troli",
        type: "link",
      },
      {
        path: "invoices",
        title: "Invois",
        type: "link",
      },
      {
        path: "receipts",
        title: "Resit",
        type: "link",
      },
    ],
    role: ["DR", "SA", "FA", "TA"],
  },
  {
    path: "/analytics",
    title: "Analitik",
    type: "sub",
    icontype: "fas fa-chart-bar text-primary",
    collapse: "reports",
    isCollapsed: true,
    children: [
      /* {
        path: "total-ticket-sales-shows",
        title: "Jumlah Jualan Tiket Tayangan",
        type: "link",
      },
      {
        path: "total-ticket-sales-simulator-rides",
        title: "Jumlah Jualan Tiket Kembara Simulasi",
        type: "link",
      }, */
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
    role: ["DR", "SA", "FA", "TA", "TC", "VA", "EP", "EA", "PK", "SV"],
  },
  {
    path: "/reports",
    title: "Laporan",
    type: "sub",
    icontype: "fas fa-file text-primary",
    collapse: "reports",
    isCollapsed: true,
    children: [
      {
        path: "daily-operatings",
        title: "Laporan Harian Operasi",
        type: "link",
      },
    ],
    role: ["DR", "SA", "FA", "TA", "TC", "VA", "EP", "EA", "PK", "SV"],
  },
  {
    path: "/fpxs",
    title: "FPX",
    type: "sub",
    icontype: "fas fa-university text-primary",
    collapse: "fpxs",
    isCollapsed: true,
    children: [
      { path: "list", title: "Transaksi FPX", type: "link" },
      { path: "bank-list", title: "Senarai Bank", type: "link" },
      { path: "response-code-list", title: "Kod Respon", type: "link" },
    ],
    role: ["DR", "SA", "FA", "TA"],
  },
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
        path: "sub-modules",
        title: "Sub Modul",
        type: "link",
      },
      {
        path: "venues",
        title: "Tempat",
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
      {
        path: "close-booking",
        title: "Penutupan Tempahan",
        type: "link",
      },
      {
        path: "calendar",
        title: "Kalendar",
        type: "link",
      },
    ],
    role: ["SA", "PK"],
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
      { path: "customers", title: "Pelanggan", type: "link" },
      { path: "supervisors", title: "Penyelia", type: "link" },
      { path: "email-templates", title: "Templat Emel", type: "link" },
    ],
    role: ["SA"],
  },
];
