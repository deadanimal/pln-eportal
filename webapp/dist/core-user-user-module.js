(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["core-user-user-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/assets/assets.component.html":
/*!**********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/assets/assets.component.html ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header pb-6\">\n  <div class=\"container-fluid\">\n    <div class=\"header-body\">\n      <div class=\"row align-items-center py-4\">\n        <div class=\"col-lg-6 col-7\">\n          <h6 class=\"h2 text-dark d-inline-block mb-0\">Senarai Aset</h6>\n\n          <nav aria-label=\"breadcrumb\" class=\"d-none d-md-inline-block ml-md-4\">\n            <ol class=\"breadcrumb breadcrumb-links breadcrumb-dark\">\n              <li class=\"breadcrumb-item\">\n                <a href=\"javascript:void(0)\">\n                  <i class=\"fas fa-file-invoice text-dark\"></i>\n                </a>\n              </li>\n            </ol>\n          </nav>\n        </div>\n\n        <div class=\"col-lg-6 col-5 text-right\">\n          <a\n            class=\"btn btn-sm btn-neutral\"\n            (click)=\"openModal(createAsset, 'create', '')\"\n          >\n            Tambah\n          </a>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"container-fluid mt--6\">\n  <div class=\"row\">\n    <div class=\"col\">\n      <div class=\"card\">\n        <div class=\"card-header bg-secondary\">\n          <h3 class=\"m-0\">Senarai Aset</h3>\n        </div>\n        <div class=\"dataTables_wrapper py-4\">\n          <div class=\"row\">\n            <div class=\"col-sm-12 col-md-6\">\n              <div class=\"dataTables_length\" id=\"datatable_length\">\n                <label>\n                  Papar\n                  <select\n                    name=\"datatable_length\"\n                    aria-controls=\"datatable\"\n                    class=\"form-control form-control-sm\"\n                    (change)=\"entriesChange($event)\"\n                  >\n                    <option value=\"10\" [selected]=\"tableEntries == 5\">5</option>\n                    <option value=\"25\" [selected]=\"tableEntries == 10\">\n                      10\n                    </option>\n                    <option value=\"50\" [selected]=\"tableEntries == 15\">\n                      15\n                    </option>\n                    <option value=\"-1\" [selected]=\"tableEntries == -1\">\n                      Semua\n                    </option>\n                  </select>\n                  rekod\n                </label>\n              </div>\n            </div>\n            <div class=\"col-sm-12 col-md-6\">\n              <div id=\"datatable_filter\" class=\"dataTables_filter\">\n                <label>\n                  <input\n                    type=\"search\"\n                    class=\"form-control form-control-sm\"\n                    placeholder=\"Cari rekod\"\n                    aria-controls=\"datatable\"\n                    (keyup)=\"filterTable($event)\"\n                  />\n                </label>\n              </div>\n            </div>\n          </div>\n\n          <ngx-datatable\n            class=\"bootstrap selection-cell\"\n            [columnMode]=\"'force'\"\n            [headerHeight]=\"50\"\n            [footerHeight]=\"50\"\n            [rowHeight]=\"'auto'\"\n            [limit]=\"tableEntries != -1 ? tableEntries : undefined\"\n            [rows]=\"tableTemp\"\n            (activate)=\"onActivate($event)\"\n          >\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Nama</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.name }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Deskripsi</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.description }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>PIC</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.pic_id.full_name }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Tarikh Dicipta</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.created_date | date:'mediumDate' }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <!-- <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Status</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                <span\n                  *ngIf=\"row.status == 'AV'\"\n                  class=\"badge badge-pill badge-success\"\n                  >Aktif</span\n                >\n                <span\n                  *ngIf=\"row.status == 'NA'\"\n                  class=\"badge badge-pill badge-danger\"\n                  >Tidak aktif</span\n                >\n              </ng-template>\n            </ngx-datatable-column> -->\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Tindakan</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                <button\n                  class=\"btn btn-sm btn-primary\"\n                  (click)=\"openModal(editAsset, 'update', row)\"\n                >\n                  Sunting\n                </button>\n              </ng-template>\n            </ngx-datatable-column>\n          </ngx-datatable>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<ng-template #createAsset>\n  <div class=\"modal-header bg-default\">\n    <h6 class=\"modal-title text-white my-auto\" id=\"modal-title-default\">\n      Tambah\n    </h6>\n\n    <button\n      aria-label=\"Close\"\n      class=\"close\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      <span aria-hidden=\"true\" class=\"text-white my-auto\"> × </span>\n    </button>\n  </div>\n\n  <div class=\"modal-body\">\n    <form [formGroup]=\"assetFormGroup\">\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Nama</label>\n        <input\n          class=\"form-control\"\n          formControlName=\"name\"\n          placeholder=\"Nama\"\n          type=\"text\"\n        />\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Deskripsi</label>\n        <textarea\n          class=\"form-control\"\n          formControlName=\"description\"\n          placeholder=\"Deskripsi\"\n        ></textarea>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Jenis Aset</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"asset_type\"\n          placeholder=\"Sila pilih\"\n        >\n          <option value=\"OT\">Lain-lain</option>\n        </select>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">PIC</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"pic_id\"\n          placeholder=\"Sila pilih\"\n        >\n          <option value=\"\">Sila pilih</option>\n          <option *ngFor=\"let user of users\" [value]=\"user.id\">\n            {{ user.full_name }}\n          </option>\n        </select>\n      </div>\n      <!-- <div class=\"form-group\">\n        <label class=\"form-control-label\">Status</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"status\"\n          placeholder=\"Sila pilih\"\n        >\n          <option value=\"AV\">Aktif</option>\n          <option value=\"NA\">Tidak aktif</option>\n        </select>\n      </div> -->\n    </form>\n  </div>\n\n  <div class=\"modal-footer\">\n    <button class=\"btn btn-success\" type=\"button\" (click)=\"create()\">\n      Simpan\n    </button>\n\n    <button\n      class=\"btn btn-outline-danger ml-auto\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      Batal\n    </button>\n  </div>\n</ng-template>\n\n<ng-template #editAsset>\n  <div class=\"modal-header bg-default\">\n    <h6 class=\"modal-title text-white my-auto\" id=\"modal-title-default\">\n      Ubah Suai\n    </h6>\n\n    <button\n      aria-label=\"Close\"\n      class=\"close\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      <span aria-hidden=\"true\" class=\"text-white my-auto\"> × </span>\n    </button>\n  </div>\n\n  <div class=\"modal-body\">\n    <form [formGroup]=\"assetFormGroup\">\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Nama</label>\n        <input\n          class=\"form-control\"\n          formControlName=\"name\"\n          placeholder=\"Nama\"\n          type=\"text\"\n        />\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Deskripsi</label>\n        <textarea\n          class=\"form-control\"\n          formControlName=\"description\"\n          placeholder=\"Deskripsi\"\n        ></textarea>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Jenis Aset</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"asset_type\"\n          placeholder=\"Sila pilih\"\n        >\n          <option value=\"OT\">Lain-lain</option>\n        </select>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">PIC</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"pic_id\"\n          placeholder=\"Sila pilih\"\n        >\n          <option value=\"\">Sila pilih</option>\n          <option *ngFor=\"let user of users\" [value]=\"user.id\">\n            {{ user.full_name }}\n          </option>\n        </select>\n      </div>\n      <!-- <div class=\"form-group\">\n          <label class=\"form-control-label\">Status</label>\n          <select\n            class=\"form-control\"\n            formControlName=\"status\"\n            placeholder=\"Sila pilih\"\n          >\n            <option value=\"AV\">Aktif</option>\n            <option value=\"NA\">Tidak aktif</option>\n          </select>\n        </div> -->\n    </form>\n  </div>\n\n  <div class=\"modal-footer\">\n    <button class=\"btn btn-success\" type=\"button\" (click)=\"update()\">\n      Simpan\n    </button>\n\n    <button\n      class=\"btn btn-outline-danger ml-auto\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      Batal\n    </button>\n  </div>\n</ng-template>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/calendar/calendar.component.html":
/*!**************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/calendar/calendar.component.html ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header pb-6\">\n    <div class=\"container-fluid\">\n        <div class=\"header-body\">\n            <div class=\"row align-items-center py-4\">\n                <div class=\"col-lg-6 col-7\">\n                    <h6 class=\"h2 text-dark d-inline-block mb-0\"></h6>\n\n                    <nav aria-label=\"breadcrumb\" class=\" d-none d-md-inline-block ml-md-4\">\n                        <ol class=\"breadcrumb breadcrumb-links breadcrumb-dark\">\n                            <li class=\"breadcrumb-item\">\n                                <a href=\"javascript:void(0)\">\n                                    <i class=\"fas fa-align-left text-dark\"></i>\n                                </a>\n                            </li>\n                            <!-- <li class=\"breadcrumb-item\">\n                                <a href=\"javascript:void(0)\" class=\"text-dark\"> Finance </a>\n                            </li>\n                            <li aria-current=\"page\" class=\"breadcrumb-item active\">\n                                Fees Management\n                            </li> -->\n                        </ol>\n                    </nav>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div class=\"container-fluid mt--6\">\n    <div class=\"row\">\n        <div class=\"col\">\n            <div class=\"card\">\n                <div class=\"card-header bg-secondary\">\n                    <h3 clas=\"m-0\"></h3>\n                </div>\n                <div class=\"card-body\">\n                    <img src=\"assets/img/default/under-construction.png\" style=\"max-width: 30rem\" class=\"text-center mx-auto d-flex\">\n                    <p class=\"text-center\">Page under construction</p>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/dashboard/dashboard.component.html":
/*!****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/dashboard/dashboard.component.html ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header pb-6\">\n  <div class=\"container-fluid\">\n    <div class=\"header-body\">\n      <div class=\"row align-items-center py-4\">\n        <div class=\"col-lg-6 col-7\">\n          <h6 class=\"h2 text-dark d-inline-block mb-0\">Dashboard</h6>\n\n          <nav aria-label=\"breadcrumb\" class=\"d-none d-md-inline-block ml-md-4\">\n            <ol class=\"breadcrumb breadcrumb-links breadcrumb-dark\">\n              <li class=\"breadcrumb-item\">\n                <a href=\"javascript:void(0)\">\n                  <i class=\"fas fa-home text-dark\"> </i>\n                </a>\n              </li>\n            </ol>\n          </nav>\n        </div>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col-xl-3 col-md-6\">\n          <div class=\"card card-stats\">\n            <div class=\"card-body\">\n              <div class=\"row\">\n                <div class=\"col\">\n                  <h5 class=\"card-title text-uppercase text-muted mb-0\">\n                    Total User Registered\n                  </h5>\n\n                  <span class=\"h2 font-weight-bold mb-0\"> 378 </span>\n                </div>\n\n                <div class=\"col-auto\">\n                  <div\n                    class=\"icon icon-shape bg-gradient-red text-white rounded-circle shadow\"\n                  >\n                    <i class=\"ni ni-active-40\"> </i>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"col-xl-3 col-md-6\">\n          <div class=\"card card-stats\">\n            <div class=\"card-body\">\n              <div class=\"row\">\n                <div class=\"col\">\n                  <h5 class=\"card-title text-uppercase text-muted mb-0\">\n                    New tickets\n                  </h5>\n\n                  <span class=\"h2 font-weight-bold mb-0\"> 2,356 </span>\n                </div>\n\n                <div class=\"col-auto\">\n                  <div\n                    class=\"icon icon-shape bg-gradient-orange text-white rounded-circle shadow\"\n                  >\n                    <i class=\"ni ni-chart-pie-35\"> </i>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"col-xl-3 col-md-6\">\n          <div class=\"card card-stats\">\n            <div class=\"card-body\">\n              <div class=\"row\">\n                <div class=\"col\">\n                  <h5 class=\"card-title text-uppercase text-muted mb-0\">\n                    Sales\n                  </h5>\n\n                  <span class=\"h2 font-weight-bold mb-0\">RM 10,780.00 </span>\n                </div>\n\n                <div class=\"col-auto\">\n                  <div\n                    class=\"icon icon-shape bg-gradient-green text-white rounded-circle shadow\"\n                  >\n                    <i class=\"ni ni-money-coins\"> </i>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"col-xl-3 col-md-6\">\n          <div class=\"card card-stats\">\n            <div class=\"card-body\">\n              <div class=\"row\">\n                <div class=\"col\">\n                  <h5 class=\"card-title text-uppercase text-muted mb-0\">\n                    Total Refund (Cumulative)\n                  </h5>\n\n                  <span class=\"h2 font-weight-bold mb-0\"> RM 1,890.00 </span>\n                </div>\n\n                <div class=\"col-auto\">\n                  <div\n                    class=\"icon icon-shape bg-gradient-info text-white rounded-circle shadow\"\n                  >\n                    <i class=\"ni ni-chart-bar-32\"> </i>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"container-fluid mt--6\">\n  <div class=\"row\">\n    <div class=\"col-xl-8\">\n      <div class=\"card\">\n        <div class=\"card-header bg-secondary\">\n          <div class=\"row align-items-center\">\n            <div class=\"col\">\n              <h6 class=\"text-muted text-uppercase ls-1 mb-1\">Chart</h6>\n\n              <h5 class=\"h3 mb-0\">Module</h5>\n            </div>\n\n            <div class=\"col\">\n              <ul class=\"nav nav-pills justify-content-end\">\n                <li\n                  class=\"nav-item mr-2 mr-md-0\"\n                  data-toggle=\"chart\"\n                  data-target=\"#chart-sales\"\n                >\n                  <a\n                    href=\"javascript:void(0)\"\n                    class=\"nav-link py-2 px-3\"\n                    [ngClass]=\"{ active: clicked === true }\"\n                    data-toggle=\"tab\"\n                    (click)=\"clicked = true; clicked1 = false\"\n                  >\n                    <span class=\"d-none d-md-block\">Monthly</span>\n                    <span class=\"d-md-none\">M</span>\n                  </a>\n                </li>\n                <li\n                  class=\"nav-item\"\n                  data-toggle=\"chart\"\n                  data-target=\"#chart-sales\"\n                >\n                  <a\n                    href=\"javascript:void(0)\"\n                    class=\"nav-link py-2 px-3\"\n                    [ngClass]=\"{ active: clicked1 === true }\"\n                    data-toggle=\"tab\"\n                    (click)=\"clicked = false; clicked1 = true\"\n                  >\n                    <span class=\"d-none d-md-block\">Weekly</span>\n                    <span class=\"d-md-none\">W</span>\n                  </a>\n                </li>\n              </ul>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"card-body\">\n          <div class=\"chart\">\n            <div class=\"amchart\" id=\"chart-dashboard-1\"></div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"col-xl-4\">\n      <div class=\"card\">\n        <div class=\"card-header bg-secondary\">\n          <div class=\"row align-items-center\">\n            <div class=\"col\">\n              <h6 class=\"text-uppercase text-muted ls-1 mb-1\">Chart</h6>\n\n              <h5 class=\"h3 mb-0\">Trend</h5>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"card-body\">\n          <div class=\"chart\">\n            <div class=\"amchart\" id=\"chart-dashboard-2\"></div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/exhibits/exhibits-list/exhibits-list.component.html":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/exhibits/exhibits-list/exhibits-list.component.html ***!
  \*********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header pb-6\">\n  <div class=\"container-fluid\">\n    <div class=\"header-body\">\n      <div class=\"row align-items-center py-4\">\n        <div class=\"col-lg-6 col-7\">\n          <h6 class=\"h2 text-dark d-inline-block mb-0\">Senarai Pameran</h6>\n\n          <nav aria-label=\"breadcrumb\" class=\"d-none d-md-inline-block ml-md-4\">\n            <ol class=\"breadcrumb breadcrumb-links breadcrumb-dark\">\n              <li class=\"breadcrumb-item\">\n                <a href=\"javascript:void(0)\">\n                  <i class=\"fas fa-file-invoice text-dark\"></i>\n                </a>\n              </li>\n            </ol>\n          </nav>\n        </div>\n\n        <div class=\"col-lg-6 col-5 text-right\">\n          <a\n            class=\"btn btn-sm btn-neutral\"\n            (click)=\"openModal(createExhibit, 'create', '')\"\n          >\n            Tambah\n          </a>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"container-fluid mt--6\">\n  <div class=\"row\">\n    <div class=\"col\">\n      <div class=\"card\">\n        <div class=\"card-header bg-secondary\">\n          <h3 class=\"m-0\">Senarai Pameran</h3>\n        </div>\n        <div class=\"dataTables_wrapper py-4\">\n          <div class=\"row\">\n            <div class=\"col-sm-12 col-md-6\">\n              <div class=\"dataTables_length\" id=\"datatable_length\">\n                <label>\n                  Papar\n                  <select\n                    name=\"datatable_length\"\n                    aria-controls=\"datatable\"\n                    class=\"form-control form-control-sm\"\n                    (change)=\"entriesChange($event)\"\n                  >\n                    <option value=\"10\" [selected]=\"tableEntries == 5\">5</option>\n                    <option value=\"25\" [selected]=\"tableEntries == 10\">\n                      10\n                    </option>\n                    <option value=\"50\" [selected]=\"tableEntries == 15\">\n                      15\n                    </option>\n                    <option value=\"-1\" [selected]=\"tableEntries == -1\">\n                      Semua\n                    </option>\n                  </select>\n                  rekod\n                </label>\n              </div>\n            </div>\n            <div class=\"col-sm-12 col-md-6\">\n              <div id=\"datatable_filter\" class=\"dataTables_filter\">\n                <label>\n                  <input\n                    type=\"search\"\n                    class=\"form-control form-control-sm\"\n                    placeholder=\"Cari rekod\"\n                    aria-controls=\"datatable\"\n                    (keyup)=\"filterTable($event)\"\n                  />\n                </label>\n              </div>\n            </div>\n          </div>\n\n          <ngx-datatable\n            class=\"bootstrap selection-cell\"\n            [columnMode]=\"'force'\"\n            [headerHeight]=\"50\"\n            [footerHeight]=\"50\"\n            [rowHeight]=\"'auto'\"\n            [limit]=\"tableEntries != -1 ? tableEntries : undefined\"\n            [rows]=\"tableTemp\"\n            (activate)=\"onActivate($event)\"\n          >\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Zon</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                Zon {{ row.zone }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Nama</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.name }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Deskripsi</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.description }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Status</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                <span\n                  *ngIf=\"row.status == 'active'\"\n                  class=\"badge badge-pill badge-success\"\n                  >Aktif</span\n                >\n                <span\n                  *ngIf=\"row.status == 'inactive'\"\n                  class=\"badge badge-pill badge-danger\"\n                  >Tidak aktif</span\n                >\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Tindakan</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                <button\n                  class=\"btn btn-sm btn-default\"\n                  [routerLink]=\"['/exhibits/lists/' + row.id]\"\n                >\n                  Sunting\n                </button>\n                <button\n                  class=\"btn btn-sm btn-primary\"\n                  (click)=\"openModal(editExhibit, 'update', row)\"\n                >\n                  Sunting\n                </button>\n              </ng-template>\n            </ngx-datatable-column>\n          </ngx-datatable>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<ng-template #createExhibit>\n  <div class=\"modal-header bg-default\">\n    <h6 class=\"modal-title text-white my-auto\" id=\"modal-title-default\">\n      Tambah\n    </h6>\n\n    <button\n      aria-label=\"Close\"\n      class=\"close\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      <span aria-hidden=\"true\" class=\"text-white my-auto\"> × </span>\n    </button>\n  </div>\n\n  <div class=\"modal-body\">\n    <form [formGroup]=\"exhibitFormGroup\">\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Nama</label>\n        <input\n          class=\"form-control\"\n          formControlName=\"name\"\n          placeholder=\"Nama\"\n          type=\"text\"\n        />\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Deskripsi</label>\n        <textarea\n          class=\"form-control\"\n          formControlName=\"description\"\n          placeholder=\"Deskripsi\"\n        ></textarea>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Zon</label>\n            <select\n              class=\"form-control\"\n              formControlName=\"zone\"\n              placeholder=\"Sila pilih\"\n            >\n              <option value=\"\">Sila pilih</option>\n              <option *ngFor=\"let zone of zones\" [value]=\"zone.value\">\n                {{ zone.display_name }}\n              </option>\n            </select>\n          </div>\n        </div>\n\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Status</label>\n            <select\n              class=\"form-control\"\n              formControlName=\"status\"\n              placeholder=\"Sila pilih\"\n            >\n              <option value=\"\">Sila pilih</option>\n              <option *ngFor=\"let status of statuses\" [value]=\"status.value\">\n                {{ status.display_name }}\n              </option>\n            </select>\n          </div>\n        </div>\n\n        <!-- <div class=\"col\">\n          <label class=\"form-control-label\">Nombor</label>\n          <input class=\"form-control\" placeholder=\"Nombor\" type=\"text\" />\n        </div> -->\n      </div>\n\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">PIC</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"pic_id\"\n          placeholder=\"Sila pilih\"\n        >\n          <option value=\"\">Sila pilih</option>\n          <option *ngFor=\"let user of users\" [value]=\"user.id\">\n            {{ user.full_name }}\n          </option>\n        </select>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Aset</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"asset_id\"\n          placeholder=\"Sila pilih\"\n          multiple\n        >\n          <option value=\"\">Sila pilih</option>\n          <option *ngFor=\"let asset of assets\" [value]=\"asset.id\">\n            {{ asset.name }}\n          </option>\n        </select>\n      </div>\n    </form>\n  </div>\n\n  <div class=\"modal-footer\">\n    <button class=\"btn btn-success\" type=\"button\" (click)=\"closeModal()\">\n      Simpan\n    </button>\n\n    <button\n      class=\"btn btn-outline-danger ml-auto\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      Batal\n    </button>\n  </div>\n</ng-template>\n\n<ng-template #editExhibit>\n  <div class=\"modal-header bg-default\">\n    <h6 class=\"modal-title text-white my-auto\" id=\"modal-title-default\">\n      Ubah Suai\n    </h6>\n\n    <button\n      aria-label=\"Close\"\n      class=\"close\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      <span aria-hidden=\"true\" class=\"text-white my-auto\"> × </span>\n    </button>\n  </div>\n\n  <div class=\"modal-body\">\n    <form [formGroup]=\"exhibitFormGroup\">\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Nama</label>\n        <input\n          class=\"form-control\"\n          formControlName=\"name\"\n          placeholder=\"Nama\"\n          type=\"text\"\n        />\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Deskripsi</label>\n        <textarea\n          class=\"form-control\"\n          formControlName=\"description\"\n          placeholder=\"Deskripsi\"\n        ></textarea>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Zon</label>\n            <select\n              class=\"form-control\"\n              formControlName=\"zone\"\n              placeholder=\"Sila pilih\"\n            >\n              <option value=\"\">Sila pilih</option>\n              <option *ngFor=\"let zone of zones\" [value]=\"zone.value\">\n                {{ zone.display_name }}\n              </option>\n            </select>\n          </div>\n        </div>\n\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Status</label>\n            <select\n              class=\"form-control\"\n              formControlName=\"status\"\n              placeholder=\"Sila pilih\"\n            >\n              <option value=\"\">Sila pilih</option>\n              <option *ngFor=\"let status of statuses\" [value]=\"status.value\">\n                {{ status.display_name }}\n              </option>\n            </select>\n          </div>\n        </div>\n\n        <!-- <div class=\"col\">\n          <label class=\"form-control-label\">Nombor</label>\n          <input class=\"form-control\" placeholder=\"Nombor\" type=\"text\" />\n        </div> -->\n      </div>\n\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">PIC</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"pic_id\"\n          placeholder=\"Sila pilih\"\n        >\n          <option value=\"\">Sila pilih</option>\n          <option *ngFor=\"let user of users\" [value]=\"user.id\">\n            {{ user.full_name }}\n          </option>\n        </select>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Aset</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"asset_id\"\n          placeholder=\"Sila pilih\"\n          multiple\n        >\n          <option value=\"\">Sila pilih</option>\n          <option *ngFor=\"let asset of assets\" [value]=\"asset.id\">\n            {{ asset.name }}\n          </option>\n        </select>\n      </div>\n    </form>\n  </div>\n\n  <div class=\"modal-footer\">\n    <button class=\"btn btn-success\" type=\"button\" (click)=\"closeModal()\">\n      Simpan\n    </button>\n\n    <button\n      class=\"btn btn-outline-danger ml-auto\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      Batal\n    </button>\n  </div>\n</ng-template>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/facilities/facilities-application/facilities-application.component.html":
/*!*****************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/facilities/facilities-application/facilities-application.component.html ***!
  \*****************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header pb-6\">\n  <div class=\"container-fluid\">\n    <div class=\"header-body\">\n      <div class=\"row align-items-center py-4\">\n        <div class=\"col-lg-6 col-7\">\n          <h6 class=\"h2 text-dark d-inline-block mb-0\">Senarai Permohonan</h6>\n\n          <nav aria-label=\"breadcrumb\" class=\"d-none d-md-inline-block ml-md-4\">\n            <ol class=\"breadcrumb breadcrumb-links breadcrumb-dark\">\n              <li class=\"breadcrumb-item\">\n                <a href=\"javascript:void(0)\">\n                  <i class=\"fas fa-file-invoice text-dark\"></i>\n                </a>\n              </li>\n            </ol>\n          </nav>\n        </div>\n\n        <div class=\"col-lg-6 col-5 text-right\">\n          <a\n            class=\"btn btn-sm btn-neutral\"\n            (click)=\"openModal(createFacility, 'create', '')\"\n          >\n            Tambah\n          </a>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"container-fluid mt--6\">\n  <div class=\"row\">\n    <div class=\"col\">\n      <div class=\"card\">\n        <div class=\"card-header bg-secondary\">\n          <h3 class=\"m-0\">Senarai Permohonan</h3>\n        </div>\n        <div class=\"dataTables_wrapper py-4\">\n          <div class=\"row\">\n            <div class=\"col-sm-12 col-md-6\">\n              <div class=\"dataTables_length\" id=\"datatable_length\">\n                <label>\n                  Papar\n                  <select\n                    name=\"datatable_length\"\n                    aria-controls=\"datatable\"\n                    class=\"form-control form-control-sm\"\n                    (change)=\"entriesChange($event)\"\n                  >\n                    <option value=\"10\" [selected]=\"tableEntries == 5\">5</option>\n                    <option value=\"25\" [selected]=\"tableEntries == 10\">\n                      10\n                    </option>\n                    <option value=\"50\" [selected]=\"tableEntries == 15\">\n                      15\n                    </option>\n                    <option value=\"-1\" [selected]=\"tableEntries == -1\">\n                      Semua\n                    </option>\n                  </select>\n                  rekod\n                </label>\n              </div>\n            </div>\n            <div class=\"col-sm-12 col-md-6\">\n              <div id=\"datatable_filter\" class=\"dataTables_filter\">\n                <label>\n                  <input\n                    type=\"search\"\n                    class=\"form-control form-control-sm\"\n                    placeholder=\"Cari rekod\"\n                    aria-controls=\"datatable\"\n                    (keyup)=\"filterTable($event)\"\n                  />\n                </label>\n              </div>\n            </div>\n          </div>\n\n          <ngx-datatable\n            class=\"bootstrap selection-cell\"\n            [columnMode]=\"'force'\"\n            [headerHeight]=\"50\"\n            [footerHeight]=\"50\"\n            [rowHeight]=\"'auto'\"\n            [limit]=\"tableEntries != -1 ? tableEntries : undefined\"\n            [rows]=\"tableTemp\"\n            (activate)=\"onActivate($event)\"\n          >\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Tajuk</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.title }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Fasiliti</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.facility_id }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Nama Organisasi</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.organisation_name }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Tarikh Tempah</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.booking_date }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Masa Tempah</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.booking_time }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Status</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                <span\n                  *ngIf=\"row.status == 'AP'\"\n                  class=\"badge badge-pill badge-success\"\n                  >Diterima</span\n                >\n                <span\n                  *ngIf=\"row.status == 'IP'\"\n                  class=\"badge badge-pill badge-warning\"\n                  >Dalam proses</span\n                >\n                <span\n                  *ngIf=\"row.status == 'RJ'\"\n                  class=\"badge badge-pill badge-danger\"\n                  >Ditolak</span\n                >\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Tindakan</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                <button\n                  class=\"btn btn-sm btn-primary\"\n                  (click)=\"openModal(editFacility, 'update', row)\"\n                >\n                  Sunting\n                </button>\n              </ng-template>\n            </ngx-datatable-column>\n          </ngx-datatable>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<ng-template #createFacility>\n  <div class=\"modal-header bg-default\">\n    <h6 class=\"modal-title text-white my-auto\" id=\"modal-title-default\">\n      Tambah\n    </h6>\n\n    <button\n      aria-label=\"Close\"\n      class=\"close\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      <span aria-hidden=\"true\" class=\"text-white my-auto\"> × </span>\n    </button>\n  </div>\n\n  <div class=\"modal-body\">\n    <form [formGroup]=\"facilityFormGroup\">\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Tajuk</label>\n        <input\n          class=\"form-control\"\n          formControlName=\"title\"\n          placeholder=\"Tajuk\"\n          type=\"text\"\n        />\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Nama Pemohon</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"user_id\"\n          placeholder=\"Sila pilih\"\n        >\n          <option value=\"\">Sila pilih</option>\n          <option *ngFor=\"let asset of assets\" [value]=\"asset.id\">\n            {{ asset.name }}\n          </option>\n        </select>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Fasiliti</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"facility_id\"\n          placeholder=\"Sila pilih\"\n        >\n          <option value=\"\">Sila pilih</option>\n          <option *ngFor=\"let facility of facilities\" [value]=\"facility.id\">\n            {{ facility.name }}\n          </option>\n        </select>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Nama Organisasi</label>\n        <input\n          class=\"form-control\"\n          formControlName=\"organisation_name\"\n          placeholder=\"Nama Organisasi\"\n          type=\"text\"\n        />\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Kategori Organisasi</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"organisation_category\"\n          placeholder=\"Sila pilih\"\n        >\n          <option value=\"\">Sila pilih</option>\n          <option\n            *ngFor=\"let organisationcategory of organisationcategories\"\n            [value]=\"orgcategory.value\"\n          >\n            {{ organisationcategory.display_name }}\n          </option>\n        </select>\n      </div>\n      <div class=\"row\">\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Tarikh Tempah</label>\n            <input\n              class=\"form-control\"\n              formControlName=\"booking_date\"\n              placeholder=\"Sila pilih\"\n              type=\"date\"\n            />\n          </div>\n        </div>\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Masa Tempah</label>\n            <input\n              class=\"form-control\"\n              formControlName=\"booking_time\"\n              placeholder=\"Sila pilih\"\n              type=\"time\"\n            />\n          </div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Jumlah Harga (RM)</label>\n            <input\n              class=\"form-control\"\n              formControlName=\"total_price\"\n              placeholder=\"contoh: 500.00\"\n              type=\"number\"\n            />\n          </div>\n        </div>\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Bilangan orang</label>\n            <input\n              class=\"form-control\"\n              formControlName=\"number_of_people\"\n              placeholder=\"contoh: 300\"\n              type=\"number\"\n            />\n          </div>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">PIC</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"pic_id\"\n          placeholder=\"Sila pilih\"\n        >\n          <option value=\"\">Sila pilih</option>\n          <option *ngFor=\"let user of users\" [value]=\"user.id\">\n            {{ user.full_name }}\n          </option>\n        </select>\n      </div>\n    </form>\n  </div>\n\n  <div class=\"modal-footer\">\n    <button class=\"btn btn-success\" type=\"button\" (click)=\"create()\">\n      Simpan\n    </button>\n\n    <button\n      class=\"btn btn-outline-danger ml-auto\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      Batal\n    </button>\n  </div>\n</ng-template>\n\n<ng-template #editFacility>\n  <div class=\"modal-header bg-default\">\n    <h6 class=\"modal-title text-white my-auto\" id=\"modal-title-default\">\n      Ubah Suai\n    </h6>\n\n    <button\n      aria-label=\"Close\"\n      class=\"close\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      <span aria-hidden=\"true\" class=\"text-white my-auto\"> × </span>\n    </button>\n  </div>\n\n  <div class=\"modal-body\">\n    <form [formGroup]=\"facilityFormGroup\">\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Tajuk</label>\n        <input\n          class=\"form-control\"\n          formControlName=\"title\"\n          placeholder=\"Tajuk\"\n          type=\"text\"\n        />\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Nama Pemohon</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"user_id\"\n          placeholder=\"Sila pilih\"\n        >\n          <option value=\"\">Sila pilih</option>\n          <option *ngFor=\"let asset of assets\" [value]=\"asset.id\">\n            {{ asset.name }}\n          </option>\n        </select>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Fasiliti</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"facility_id\"\n          placeholder=\"Sila pilih\"\n        >\n          <option value=\"\">Sila pilih</option>\n          <option *ngFor=\"let facility of facilities\" [value]=\"facility.id\">\n            {{ facility.name }}\n          </option>\n        </select>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Nama Organisasi</label>\n        <input\n          class=\"form-control\"\n          formControlName=\"organisation_name\"\n          placeholder=\"Nama Organisasi\"\n          type=\"text\"\n        />\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Kategori Organisasi</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"organisation_category\"\n          placeholder=\"Sila pilih\"\n        >\n          <option value=\"\">Sila pilih</option>\n          <option\n            *ngFor=\"let organisationcategory of organisationcategories\"\n            [value]=\"orgcategory.value\"\n          >\n            {{ organisationcategory.display_name }}\n          </option>\n        </select>\n      </div>\n      <div class=\"row\">\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Tarikh Tempah</label>\n            <input\n              class=\"form-control\"\n              formControlName=\"booking_date\"\n              placeholder=\"Sila pilih\"\n              type=\"date\"\n            />\n          </div>\n        </div>\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Masa Tempah</label>\n            <input\n              class=\"form-control\"\n              formControlName=\"booking_time\"\n              placeholder=\"Sila pilih\"\n              type=\"time\"\n            />\n          </div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Jumlah Harga (RM)</label>\n            <input\n              class=\"form-control\"\n              formControlName=\"total_price\"\n              placeholder=\"contoh: 500.00\"\n              type=\"number\"\n            />\n          </div>\n        </div>\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Bilangan orang</label>\n            <input\n              class=\"form-control\"\n              formControlName=\"number_of_people\"\n              placeholder=\"contoh: 300\"\n              type=\"number\"\n            />\n          </div>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">PIC</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"pic_id\"\n          placeholder=\"Sila pilih\"\n        >\n          <option value=\"\">Sila pilih</option>\n          <option *ngFor=\"let user of users\" [value]=\"user.id\">\n            {{ user.full_name }}\n          </option>\n        </select>\n      </div>\n    </form>\n  </div>\n\n  <div class=\"modal-footer\">\n    <button class=\"btn btn-success\" type=\"button\" (click)=\"update()\">\n      Simpan\n    </button>\n\n    <button\n      class=\"btn btn-outline-danger ml-auto\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      Batal\n    </button>\n  </div>\n</ng-template>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/facilities/facilities-list/facilities-list.component.html":
/*!***************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/facilities/facilities-list/facilities-list.component.html ***!
  \***************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header pb-6\">\n  <div class=\"container-fluid\">\n    <div class=\"header-body\">\n      <div class=\"row align-items-center py-4\">\n        <div class=\"col-lg-6 col-7\">\n          <h6 class=\"h2 text-dark d-inline-block mb-0\">Senarai Fasiliti</h6>\n\n          <nav aria-label=\"breadcrumb\" class=\"d-none d-md-inline-block ml-md-4\">\n            <ol class=\"breadcrumb breadcrumb-links breadcrumb-dark\">\n              <li class=\"breadcrumb-item\">\n                <a href=\"javascript:void(0)\">\n                  <i class=\"fas fa-file-invoice text-dark\"></i>\n                </a>\n              </li>\n            </ol>\n          </nav>\n        </div>\n\n        <div class=\"col-lg-6 col-5 text-right\">\n          <a\n            class=\"btn btn-sm btn-neutral\"\n            (click)=\"openModal(createFacility, 'create', '')\"\n          >\n            Tambah\n          </a>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"container-fluid mt--6\">\n  <div class=\"row\">\n    <div class=\"col\">\n      <div class=\"card\">\n        <div class=\"card-header bg-secondary\">\n          <h3 class=\"m-0\">Senarai Fasiliti</h3>\n        </div>\n        <div class=\"dataTables_wrapper py-4\">\n          <div class=\"row\">\n            <div class=\"col-sm-12 col-md-6\">\n              <div class=\"dataTables_length\" id=\"datatable_length\">\n                <label>\n                  Papar\n                  <select\n                    name=\"datatable_length\"\n                    aria-controls=\"datatable\"\n                    class=\"form-control form-control-sm\"\n                    (change)=\"entriesChange($event)\"\n                  >\n                    <option value=\"10\" [selected]=\"tableEntries == 5\">5</option>\n                    <option value=\"25\" [selected]=\"tableEntries == 10\">\n                      10\n                    </option>\n                    <option value=\"50\" [selected]=\"tableEntries == 15\">\n                      15\n                    </option>\n                    <option value=\"-1\" [selected]=\"tableEntries == -1\">\n                      Semua\n                    </option>\n                  </select>\n                  rekod\n                </label>\n              </div>\n            </div>\n            <div class=\"col-sm-12 col-md-6\">\n              <div id=\"datatable_filter\" class=\"dataTables_filter\">\n                <label>\n                  <input\n                    type=\"search\"\n                    class=\"form-control form-control-sm\"\n                    placeholder=\"Cari rekod\"\n                    aria-controls=\"datatable\"\n                    (keyup)=\"filterTable($event)\"\n                  />\n                </label>\n              </div>\n            </div>\n          </div>\n\n          <ngx-datatable\n            class=\"bootstrap selection-cell\"\n            [columnMode]=\"'force'\"\n            [headerHeight]=\"50\"\n            [footerHeight]=\"50\"\n            [rowHeight]=\"'auto'\"\n            [limit]=\"tableEntries != -1 ? tableEntries : undefined\"\n            [rows]=\"tableTemp\"\n            (activate)=\"onActivate($event)\"\n          >\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Nama</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.name }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Deskripsi</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.description }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Kapasiti</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.max_capacity }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Saiz (m<sup>2</sup>)</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.size }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Harga (RM)</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.price }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <!-- <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Status</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                <span\n                  *ngIf=\"row.status == 'AV'\"\n                  class=\"badge badge-pill badge-success\"\n                  >Aktif</span\n                >\n                <span\n                  *ngIf=\"row.status == 'NA'\"\n                  class=\"badge badge-pill badge-danger\"\n                  >Tidak aktif</span\n                >\n              </ng-template>\n            </ngx-datatable-column> -->\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Tindakan</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                <button\n                  class=\"btn btn-sm btn-primary\"\n                  (click)=\"openModal(editFacility, 'update', row)\"\n                >\n                  Sunting\n                </button>\n              </ng-template>\n            </ngx-datatable-column>\n          </ngx-datatable>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<ng-template #createFacility>\n  <div class=\"modal-header bg-default\">\n    <h6 class=\"modal-title text-white my-auto\" id=\"modal-title-default\">\n      Tambah\n    </h6>\n\n    <button\n      aria-label=\"Close\"\n      class=\"close\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      <span aria-hidden=\"true\" class=\"text-white my-auto\"> × </span>\n    </button>\n  </div>\n\n  <div class=\"modal-body\">\n    <form [formGroup]=\"facilityFormGroup\">\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Nama Fasiliti</label>\n        <input\n          class=\"form-control\"\n          formControlName=\"name\"\n          placeholder=\"Nama Fasiliti\"\n          type=\"text\"\n        />\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Deskripsi</label>\n        <textarea\n          class=\"form-control\"\n          formControlName=\"description\"\n          placeholder=\"Deskripsi\"\n        ></textarea>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Jenis Fasiliti</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"facility_type\"\n          placeholder=\"Sila pilih\"\n        >\n          <option value=\"NA\">Tidak ada</option>\n        </select>\n      </div>\n      <div class=\"row\">\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Harga (RM)</label>\n            <input\n              class=\"form-control\"\n              formControlName=\"price\"\n              placeholder=\"contoh: 50.00\"\n              type=\"number\"\n            />\n          </div>\n        </div>\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Saiz (m<sup>2</sup>)</label>\n            <input\n              class=\"form-control\"\n              formControlName=\"size\"\n              placeholder=\"contoh: 5000\"\n              type=\"number\"\n            />\n          </div>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">PIC</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"pic_id\"\n          placeholder=\"Sila pilih\"\n        >\n          <option value=\"\">Sila pilih</option>\n          <option *ngFor=\"let user of users\" [value]=\"user.id\">\n            {{ user.full_name }}\n          </option>\n        </select>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Tempat</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"venue_id\"\n          placeholder=\"Sila pilih\"\n        >\n          <option value=\"\">Sila pilih</option>\n          <option *ngFor=\"let venue of venues\" [value]=\"venue.id\">\n            {{ venue.name }}\n          </option>\n        </select>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Asset</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"asset_id\"\n          placeholder=\"Sila pilih\"\n          multiple\n        >\n          <option value=\"\">Sila pilih</option>\n          <option *ngFor=\"let asset of assets\" [value]=\"asset.id\">\n            {{ asset.name }}\n          </option>\n        </select>\n      </div>\n    </form>\n  </div>\n\n  <div class=\"modal-footer\">\n    <button class=\"btn btn-success\" type=\"button\" (click)=\"create()\">\n      Simpan\n    </button>\n\n    <button\n      class=\"btn btn-outline-danger ml-auto\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      Batal\n    </button>\n  </div>\n</ng-template>\n\n<ng-template #editFacility>\n  <div class=\"modal-header bg-default\">\n    <h6 class=\"modal-title text-white my-auto\" id=\"modal-title-default\">\n      Ubah Suai\n    </h6>\n\n    <button\n      aria-label=\"Close\"\n      class=\"close\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      <span aria-hidden=\"true\" class=\"text-white my-auto\"> × </span>\n    </button>\n  </div>\n\n  <div class=\"modal-body\">\n    <form [formGroup]=\"facilityFormGroup\">\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Nama Fasiliti</label>\n        <input\n          class=\"form-control\"\n          formControlName=\"name\"\n          placeholder=\"Nama Fasiliti\"\n          type=\"text\"\n        />\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Deskripsi</label>\n        <textarea\n          class=\"form-control\"\n          formControlName=\"description\"\n          placeholder=\"Deskripsi\"\n        ></textarea>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Jenis Fasiliti</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"facility_type\"\n          placeholder=\"Sila pilih\"\n        >\n          <option value=\"NA\">Tidak ada</option>\n        </select>\n      </div>\n      <div class=\"row\">\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Harga (RM)</label>\n            <input\n              class=\"form-control\"\n              formControlName=\"price\"\n              placeholder=\"contoh: 50.00\"\n              type=\"number\"\n            />\n          </div>\n        </div>\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Saiz (m<sup>2</sup>)</label>\n            <input\n              class=\"form-control\"\n              formControlName=\"size\"\n              placeholder=\"contoh: 5000\"\n              type=\"number\"\n            />\n          </div>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">PIC</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"pic_id\"\n          placeholder=\"Sila pilih\"\n        >\n          <option value=\"\">Sila pilih</option>\n          <option *ngFor=\"let user of users\" [value]=\"user.id\">\n            {{ user.full_name }}\n          </option>\n        </select>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Tempat</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"venue_id\"\n          placeholder=\"Sila pilih\"\n        >\n          <option value=\"\">Sila pilih</option>\n          <option *ngFor=\"let venue of venues\" [value]=\"venue.id\">\n            {{ venue.name }}\n          </option>\n        </select>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Asset</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"asset_id\"\n          placeholder=\"Sila pilih\"\n          multiple\n        >\n          <option value=\"\">Sila pilih</option>\n          <option *ngFor=\"let asset of assets\" [value]=\"asset.id\">\n            {{ asset.name }}\n          </option>\n        </select>\n      </div>\n    </form>\n  </div>\n\n  <div class=\"modal-footer\">\n    <button class=\"btn btn-success\" type=\"button\" (click)=\"update()\">\n      Simpan\n    </button>\n\n    <button\n      class=\"btn btn-outline-danger ml-auto\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      Batal\n    </button>\n  </div>\n</ng-template>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/feedbacks/feedbacks-list/feedbacks-list.component.html":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/feedbacks/feedbacks-list/feedbacks-list.component.html ***!
  \************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header pb-6\">\n  <div class=\"container-fluid\">\n    <div class=\"header-body\">\n      <div class=\"row align-items-center py-4\">\n        <div class=\"col-lg-6 col-7\">\n          <h6 class=\"h2 text-dark d-inline-block mb-0\">Senarai Maklum Balas</h6>\n\n          <nav aria-label=\"breadcrumb\" class=\"d-none d-md-inline-block ml-md-4\">\n            <ol class=\"breadcrumb breadcrumb-links breadcrumb-dark\">\n              <li class=\"breadcrumb-item\">\n                <a href=\"javascript:void(0)\">\n                  <i class=\"fas fa-file-invoice text-dark\"></i>\n                </a>\n              </li>\n            </ol>\n          </nav>\n        </div>\n\n        <div class=\"col-lg-6 col-5 text-right\">\n          <a\n            class=\"btn btn-sm btn-neutral\"\n            (click)=\"openModal(createFeedback, 'create', '')\"\n          >\n            Tambah\n          </a>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"container-fluid mt--6\">\n  <div class=\"row\">\n    <div class=\"col\">\n      <div class=\"card\">\n        <div class=\"card-header bg-secondary\">\n          <h3 class=\"m-0\">Senarai Maklum Balas</h3>\n        </div>\n        <div class=\"dataTables_wrapper py-4\">\n          <div class=\"row\">\n            <div class=\"col-sm-12 col-md-6\">\n              <div class=\"dataTables_length\" id=\"datatable_length\">\n                <label>\n                  Papar\n                  <select\n                    name=\"datatable_length\"\n                    aria-controls=\"datatable\"\n                    class=\"form-control form-control-sm\"\n                    (change)=\"entriesChange($event)\"\n                  >\n                    <option value=\"10\" [selected]=\"tableEntries == 5\">5</option>\n                    <option value=\"25\" [selected]=\"tableEntries == 10\">\n                      10\n                    </option>\n                    <option value=\"50\" [selected]=\"tableEntries == 15\">\n                      15\n                    </option>\n                    <option value=\"-1\" [selected]=\"tableEntries == -1\">\n                      Semua\n                    </option>\n                  </select>\n                  rekod\n                </label>\n              </div>\n            </div>\n            <div class=\"col-sm-12 col-md-6\">\n              <div id=\"datatable_filter\" class=\"dataTables_filter\">\n                <label>\n                  <input\n                    type=\"search\"\n                    class=\"form-control form-control-sm\"\n                    placeholder=\"Cari rekod\"\n                    aria-controls=\"datatable\"\n                    (keyup)=\"filterTable($event)\"\n                  />\n                </label>\n              </div>\n            </div>\n          </div>\n\n          <ngx-datatable\n            class=\"bootstrap selection-cell\"\n            [columnMode]=\"'force'\"\n            [headerHeight]=\"50\"\n            [footerHeight]=\"50\"\n            [rowHeight]=\"'auto'\"\n            [limit]=\"tableEntries != -1 ? tableEntries : undefined\"\n            [rows]=\"tableTemp\"\n            (activate)=\"onActivate($event)\"\n          >\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Nama Penuh</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.user_id.full_name }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Komen</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.comment | slice: 0:200 }} ...\n              </ng-template>\n            </ngx-datatable-column>\n\n            <!-- <ngx-datatable-column>\n                  <ng-template ngx-datatable-header-template>\n                    <span>Status</span>\n                  </ng-template>\n                  <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                    <span\n                      *ngIf=\"row.status == 'AV'\"\n                      class=\"badge badge-pill badge-success\"\n                      >Aktif</span\n                    >\n                    <span\n                      *ngIf=\"row.status == 'NA'\"\n                      class=\"badge badge-pill badge-danger\"\n                      >Tidak aktif</span\n                    >\n                  </ng-template>\n                </ngx-datatable-column> -->\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Tindakan</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                <button\n                  class=\"btn btn-sm btn-primary\"\n                  (click)=\"openModal(editFeedback, 'update', row)\"\n                >\n                  Sunting\n                </button>\n              </ng-template>\n            </ngx-datatable-column>\n          </ngx-datatable>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<ng-template #createFeedback>\n  <div class=\"modal-header bg-default\">\n    <h6 class=\"modal-title text-white my-auto\" id=\"modal-title-default\">\n      Tambah\n    </h6>\n\n    <button\n      aria-label=\"Close\"\n      class=\"close\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      <span aria-hidden=\"true\" class=\"text-white my-auto\"> × </span>\n    </button>\n  </div>\n\n  <div class=\"modal-body\">\n    <form [formGroup]=\"feedbackFormGroup\">\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Nama Penuh</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"user_id\"\n          placeholder=\"Sila pilih\"\n        >\n          <option value=\"\">Sila pilih</option>\n          <option *ngFor=\"let user of users\" [value]=\"user.id\">\n            {{ user.full_name }}\n          </option>\n        </select>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Komen</label>\n        <textarea\n          rows=\"5\"\n          class=\"form-control\"\n          formControlName=\"comment\"\n          placeholder=\"Komen\"\n        ></textarea>\n      </div>\n      <!-- <div class=\"form-group\">\n            <label class=\"form-control-label\">Status</label>\n            <select\n              class=\"form-control\"\n              formControlName=\"status\"\n              placeholder=\"Sila pilih\"\n            >\n              <option value=\"AV\">Aktif</option>\n              <option value=\"NA\">Tidak aktif</option>\n            </select>\n          </div> -->\n    </form>\n  </div>\n\n  <div class=\"modal-footer\">\n    <button class=\"btn btn-success\" type=\"button\" (click)=\"create()\">\n      Simpan\n    </button>\n\n    <button\n      class=\"btn btn-outline-danger ml-auto\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      Batal\n    </button>\n  </div>\n</ng-template>\n\n<ng-template #editFeedback>\n  <div class=\"modal-header bg-default\">\n    <h6 class=\"modal-title text-white my-auto\" id=\"modal-title-default\">\n      Ubah Suai\n    </h6>\n\n    <button\n      aria-label=\"Close\"\n      class=\"close\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      <span aria-hidden=\"true\" class=\"text-white my-auto\"> × </span>\n    </button>\n  </div>\n\n  <div class=\"modal-body\">\n    <form [formGroup]=\"feedbackFormGroup\">\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Nama Penuh</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"user_id\"\n          placeholder=\"Sila pilih\"\n        >\n          <option value=\"\">Sila pilih</option>\n          <option *ngFor=\"let user of users\" [value]=\"user.id\">\n            {{ user.full_name }}\n          </option>\n        </select>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Komen</label>\n        <textarea\n          rows=\"5\"\n          class=\"form-control\"\n          formControlName=\"comment\"\n          placeholder=\"Komen\"\n        ></textarea>\n      </div>\n      <!-- <div class=\"form-group\">\n            <label class=\"form-control-label\">Status</label>\n            <select\n              class=\"form-control\"\n              formControlName=\"status\"\n              placeholder=\"Sila pilih\"\n            >\n              <option value=\"AV\">Aktif</option>\n              <option value=\"NA\">Tidak aktif</option>\n            </select>\n          </div> -->\n    </form>\n  </div>\n\n  <div class=\"modal-footer\">\n    <button class=\"btn btn-success\" type=\"button\" (click)=\"update()\">\n      Simpan\n    </button>\n\n    <button\n      class=\"btn btn-outline-danger ml-auto\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      Batal\n    </button>\n  </div>\n</ng-template>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/managements/users/users.component.html":
/*!********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/managements/users/users.component.html ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header pb-6\">\n  <div class=\"container-fluid\">\n    <div class=\"header-body\">\n      <div class=\"row align-items-center py-4\">\n        <div class=\"col-lg-6 col-7\">\n          <h6 class=\"h2 text-dark d-inline-block mb-0\">Senarai Pengguna</h6>\n\n          <nav aria-label=\"breadcrumb\" class=\"d-none d-md-inline-block ml-md-4\">\n            <ol class=\"breadcrumb breadcrumb-links breadcrumb-dark\">\n              <li class=\"breadcrumb-item\">\n                <a href=\"javascript:void(0)\">\n                  <i class=\"fas fa-file-invoice text-dark\"></i>\n                </a>\n              </li>\n            </ol>\n          </nav>\n        </div>\n\n        <div class=\"col-lg-6 col-5 text-right\">\n          <a\n            class=\"btn btn-sm btn-neutral\"\n            (click)=\"openModal(createUser, 'create', '')\"\n          >\n            Tambah\n          </a>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"container-fluid mt--6\">\n  <div class=\"row\">\n    <div class=\"col\">\n      <div class=\"card\">\n        <div class=\"card-header bg-secondary\">\n          <h3 class=\"m-0\">Senarai Pengguna</h3>\n        </div>\n        <div class=\"dataTables_wrapper py-4\">\n          <div class=\"row\">\n            <div class=\"col-sm-12 col-md-6\">\n              <div class=\"dataTables_length\" id=\"datatable_length\">\n                <label>\n                  Papar\n                  <select\n                    name=\"datatable_length\"\n                    aria-controls=\"datatable\"\n                    class=\"form-control form-control-sm\"\n                    (change)=\"entriesChange($event)\"\n                  >\n                    <option value=\"10\" [selected]=\"tableEntries == 5\">5</option>\n                    <option value=\"25\" [selected]=\"tableEntries == 10\">\n                      10\n                    </option>\n                    <option value=\"50\" [selected]=\"tableEntries == 15\">\n                      15\n                    </option>\n                    <option value=\"-1\" [selected]=\"tableEntries == -1\">\n                      Semua\n                    </option>\n                  </select>\n                  rekod\n                </label>\n              </div>\n            </div>\n            <div class=\"col-sm-12 col-md-6\">\n              <div id=\"datatable_filter\" class=\"dataTables_filter\">\n                <label>\n                  <input\n                    type=\"search\"\n                    class=\"form-control form-control-sm\"\n                    placeholder=\"Cari rekod\"\n                    aria-controls=\"datatable\"\n                    (keyup)=\"filterTable($event)\"\n                  />\n                </label>\n              </div>\n            </div>\n          </div>\n\n          <ngx-datatable\n            class=\"bootstrap selection-cell\"\n            [columnMode]=\"'force'\"\n            [headerHeight]=\"50\"\n            [footerHeight]=\"50\"\n            [rowHeight]=\"'auto'\"\n            [limit]=\"tableEntries != -1 ? tableEntries : undefined\"\n            [rows]=\"tableTemp\"\n            (activate)=\"onActivate($event)\"\n          >\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Nama Penuh</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.full_name }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Emel</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.email }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>No Telefon</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.phone }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Jenis Pengguna</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ getUserType(row.user_type) }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Status</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                <span\n                  *ngIf=\"row.is_active\"\n                  class=\"badge badge-pill badge-success\"\n                  >Aktif</span\n                >\n                <span\n                  *ngIf=\"!row.is_active\"\n                  class=\"badge badge-pill badge-danger\"\n                  >Tidak aktif</span\n                >\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Tindakan</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                <button\n                  class=\"btn btn-sm btn-primary\"\n                  (click)=\"openModal(editUser, 'update', row)\"\n                >\n                  Sunting\n                </button>\n              </ng-template>\n            </ngx-datatable-column>\n          </ngx-datatable>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<ng-template #createUser>\n  <div class=\"modal-header bg-default\">\n    <h6 class=\"modal-title text-white my-auto\" id=\"modal-title-default\">\n      Tambah\n    </h6>\n\n    <button\n      aria-label=\"Close\"\n      class=\"close\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      <span aria-hidden=\"true\" class=\"text-white my-auto\"> × </span>\n    </button>\n  </div>\n\n  <div class=\"modal-body\">\n    <div class=\"alert alert-info\" role=\"alert\">\n      <strong>Info!</strong> Tetapan password awal adalah planetarium@2020\n    </div>\n    <form [formGroup]=\"userFormGroup\">\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Nama Penuh</label>\n        <input\n          class=\"form-control\"\n          formControlName=\"full_name\"\n          placeholder=\"Nama Penuh\"\n          type=\"text\"\n        />\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Nama Pengguna</label>\n        <input\n          class=\"form-control\"\n          formControlName=\"username\"\n          placeholder=\"Nama Pengguna\"\n          type=\"email\"\n        />\n      </div>\n      <div class=\"row\">\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Emel</label>\n            <input\n              class=\"form-control\"\n              formControlName=\"email\"\n              placeholder=\"Emel\"\n              type=\"email\"\n            />\n          </div>\n        </div>\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">No Telefon</label>\n            <input\n              class=\"form-control\"\n              formControlName=\"phone\"\n              placeholder=\"No Telefon\"\n              type=\"tel\"\n            />\n          </div>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Alamat Surat Menyurat</label>\n        <input\n          class=\"form-control\"\n          formControlName=\"address\"\n          placeholder=\"Alamat Surat Menyurat\"\n          type=\"text\"\n        />\n      </div>\n      <div class=\"row\">\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Poskod</label>\n            <input\n              class=\"form-control\"\n              formControlName=\"postcode\"\n              placeholder=\"Poskod\"\n              type=\"number\"\n            />\n          </div>\n        </div>\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Bandar</label>\n            <input\n              class=\"form-control\"\n              formControlName=\"city\"\n              placeholder=\"Bandar\"\n              type=\"text\"\n            />\n          </div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Negeri</label>\n            <select\n              class=\"form-control\"\n              formControlName=\"state\"\n              placeholder=\"Sila pilih\"\n            >\n              <option value=\"\">Sila pilih</option>\n              <option value=\"01\">Johor</option>\n              <option value=\"02\">Kedah</option>\n              <option value=\"03\">Kelantan</option>\n              <option value=\"04\">Melaka</option>\n              <option value=\"05\">Negeri Sembilan</option>\n              <option value=\"06\">Pahang</option>\n              <option value=\"07\">Pulau Pinang</option>\n              <option value=\"08\">Perak</option>\n              <option value=\"09\">Perlis</option>\n              <option value=\"10\">Selangor</option>\n              <option value=\"11\">Terengganu</option>\n              <option value=\"12\">Sabah</option>\n              <option value=\"13\">Sarawak</option>\n              <option value=\"14\">Wilayah Persekutuan Kuala Lumpur</option>\n              <option value=\"15\">Wilayah Persekutuan Labuan</option>\n              <option value=\"16\">Wilayah Persekutuan Putrajaya</option>\n            </select>\n          </div>\n        </div>\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Negara</label>\n            <input\n              class=\"form-control\"\n              formControlName=\"country\"\n              placeholder=\"Negara\"\n              type=\"text\"\n            />\n          </div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Jenis Pengguna</label>\n            <select\n              class=\"form-control\"\n              formControlName=\"user_type\"\n              placeholder=\"Sila pilih\"\n            >\n              <option value=\"\">Sila pilih</option>\n              <option\n                *ngFor=\"let usertype of usertypes\"\n                [value]=\"usertype.value\"\n              >\n                {{ usertype.display_name }}\n              </option>\n            </select>\n          </div>\n        </div>\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Status</label>\n            <select\n              class=\"form-control\"\n              formControlName=\"is_active\"\n              placeholder=\"Sila pilih\"\n            >\n              <option value=\"true\">Aktif</option>\n              <option value=\"false\">Tidak aktif</option>\n            </select>\n          </div>\n        </div>\n      </div>\n    </form>\n  </div>\n\n  <div class=\"modal-footer\">\n    <button class=\"btn btn-success\" type=\"button\" (click)=\"create()\">\n      Simpan\n    </button>\n\n    <button\n      class=\"btn btn-outline-danger ml-auto\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      Batal\n    </button>\n  </div>\n</ng-template>\n\n<ng-template #editUser>\n  <div class=\"modal-header bg-default\">\n    <h6 class=\"modal-title text-white my-auto\" id=\"modal-title-default\">\n      Ubah Suai\n    </h6>\n\n    <button\n      aria-label=\"Close\"\n      class=\"close\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      <span aria-hidden=\"true\" class=\"text-white my-auto\"> × </span>\n    </button>\n  </div>\n\n  <div class=\"modal-body\">\n    <form [formGroup]=\"userFormGroup\">\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Nama Penuh</label>\n        <input\n          class=\"form-control\"\n          formControlName=\"full_name\"\n          placeholder=\"Nama Penuh\"\n          type=\"text\"\n        />\n      </div>\n      <div class=\"row\">\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Emel</label>\n            <input\n              class=\"form-control\"\n              formControlName=\"email\"\n              placeholder=\"Emel\"\n              type=\"email\"\n            />\n          </div>\n        </div>\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">No Telefon</label>\n            <input\n              class=\"form-control\"\n              formControlName=\"phone\"\n              placeholder=\"No Telefon\"\n              type=\"tel\"\n            />\n          </div>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Alamat Surat Menyurat</label>\n        <input\n          class=\"form-control\"\n          formControlName=\"address\"\n          placeholder=\"Alamat Surat Menyurat\"\n          type=\"text\"\n        />\n      </div>\n      <div class=\"row\">\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Poskod</label>\n            <input\n              class=\"form-control\"\n              formControlName=\"postcode\"\n              placeholder=\"Poskod\"\n              type=\"number\"\n            />\n          </div>\n        </div>\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Bandar</label>\n            <input\n              class=\"form-control\"\n              formControlName=\"city\"\n              placeholder=\"Bandar\"\n              type=\"text\"\n            />\n          </div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Negeri</label>\n            <select\n              class=\"form-control\"\n              formControlName=\"state\"\n              placeholder=\"Sila pilih\"\n            >\n              <option value=\"\">Sila pilih</option>\n              <option value=\"01\">Johor</option>\n              <option value=\"02\">Kedah</option>\n              <option value=\"03\">Kelantan</option>\n              <option value=\"04\">Melaka</option>\n              <option value=\"05\">Negeri Sembilan</option>\n              <option value=\"06\">Pahang</option>\n              <option value=\"07\">Pulau Pinang</option>\n              <option value=\"08\">Perak</option>\n              <option value=\"09\">Perlis</option>\n              <option value=\"10\">Selangor</option>\n              <option value=\"11\">Terengganu</option>\n              <option value=\"12\">Sabah</option>\n              <option value=\"13\">Sarawak</option>\n              <option value=\"14\">Wilayah Persekutuan Kuala Lumpur</option>\n              <option value=\"15\">Wilayah Persekutuan Labuan</option>\n              <option value=\"16\">Wilayah Persekutuan Putrajaya</option>\n            </select>\n          </div>\n        </div>\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Negara</label>\n            <input\n              class=\"form-control\"\n              formControlName=\"country\"\n              placeholder=\"Negara\"\n              type=\"text\"\n            />\n          </div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Jenis Pengguna</label>\n            <select\n              class=\"form-control\"\n              formControlName=\"user_type\"\n              placeholder=\"Sila pilih\"\n            >\n              <option value=\"\">Sila pilih</option>\n              <option\n                *ngFor=\"let usertype of usertypes\"\n                [value]=\"usertype.value\"\n              >\n                {{ usertype.display_name }}\n              </option>\n            </select>\n          </div>\n        </div>\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Status</label>\n            <select\n              class=\"form-control\"\n              formControlName=\"is_active\"\n              placeholder=\"Sila pilih\"\n            >\n              <option value=\"true\">Aktif</option>\n              <option value=\"false\">Tidak aktif</option>\n            </select>\n          </div>\n        </div>\n      </div>\n    </form>\n  </div>\n\n  <div class=\"modal-footer\">\n    <button class=\"btn btn-success\" type=\"button\" (click)=\"update()\">\n      Simpan\n    </button>\n\n    <button\n      class=\"btn btn-outline-danger ml-auto\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      Batal\n    </button>\n  </div>\n</ng-template>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/programs/programs-application/programs-application.component.html":
/*!***********************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/programs/programs-application/programs-application.component.html ***!
  \***********************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header pb-6\">\n  <div class=\"container-fluid\">\n    <div class=\"header-body\">\n      <div class=\"row align-items-center py-4\">\n        <div class=\"col-lg-6 col-7\">\n          <h6 class=\"h2 text-dark d-inline-block mb-0\">Senarai Permohonan</h6>\n\n          <nav aria-label=\"breadcrumb\" class=\"d-none d-md-inline-block ml-md-4\">\n            <ol class=\"breadcrumb breadcrumb-links breadcrumb-dark\">\n              <li class=\"breadcrumb-item\">\n                <a href=\"javascript:void(0)\">\n                  <i class=\"fas fa-file-invoice text-dark\"></i>\n                </a>\n              </li>\n            </ol>\n          </nav>\n        </div>\n\n        <div class=\"col-lg-6 col-5 text-right\">\n          <a\n            class=\"btn btn-sm btn-neutral\"\n            (click)=\"openModal(createProgramApp, 'create', '')\"\n          >\n            Tambah\n          </a>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"container-fluid mt--6\">\n  <div class=\"row\">\n    <div class=\"col\">\n      <div class=\"card\">\n        <div class=\"card-header bg-secondary\">\n          <h3 class=\"m-0\">Senarai Permohonan</h3>\n        </div>\n        <div class=\"dataTables_wrapper py-4\">\n          <div class=\"row\">\n            <div class=\"col-sm-12 col-md-6\">\n              <div class=\"dataTables_length\" id=\"datatable_length\">\n                <label>\n                  Papar\n                  <select\n                    name=\"datatable_length\"\n                    aria-controls=\"datatable\"\n                    class=\"form-control form-control-sm\"\n                    (change)=\"entriesChange($event)\"\n                  >\n                    <option value=\"10\" [selected]=\"tableEntries == 5\">5</option>\n                    <option value=\"25\" [selected]=\"tableEntries == 10\">\n                      10\n                    </option>\n                    <option value=\"50\" [selected]=\"tableEntries == 15\">\n                      15\n                    </option>\n                    <option value=\"-1\" [selected]=\"tableEntries == -1\">\n                      Semua\n                    </option>\n                  </select>\n                  rekod\n                </label>\n              </div>\n            </div>\n            <div class=\"col-sm-12 col-md-6\">\n              <div id=\"datatable_filter\" class=\"dataTables_filter\">\n                <label>\n                  <input\n                    type=\"search\"\n                    class=\"form-control form-control-sm\"\n                    placeholder=\"Cari rekod\"\n                    aria-controls=\"datatable\"\n                    (keyup)=\"filterTable($event)\"\n                  />\n                </label>\n              </div>\n            </div>\n          </div>\n\n          <ngx-datatable\n            class=\"bootstrap selection-cell\"\n            [columnMode]=\"'force'\"\n            [headerHeight]=\"50\"\n            [footerHeight]=\"50\"\n            [rowHeight]=\"'auto'\"\n            [limit]=\"tableEntries != -1 ? tableEntries : undefined\"\n            [rows]=\"tableTemp\"\n            (activate)=\"onActivate($event)\"\n          >\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Nama Pemohon</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.customer_id.full_name }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Tarikh Permohonan</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.created_date | date: \"mediumDate\" }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Tajuk Program</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.educational_program_id.title }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Status</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                <span\n                  *ngIf=\"row.status == 'AP'\"\n                  class=\"badge badge-pill badge-success\"\n                  >Diterima</span\n                >\n                <span\n                  *ngIf=\"row.status == 'RJ'\"\n                  class=\"badge badge-pill badge-danger\"\n                  >Ditolak</span\n                >\n                <span\n                  *ngIf=\"row.status == 'IP'\"\n                  class=\"badge badge-pill badge-warning\"\n                  >Dalam proses</span\n                >\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Tindakan</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                <button\n                  class=\"btn btn-sm btn-primary\"\n                  (click)=\"openModal(editProgramApp, 'update', row)\"\n                >\n                  Sunting\n                </button>\n              </ng-template>\n            </ngx-datatable-column>\n          </ngx-datatable>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<ng-template #createProgramApp>\n  <div class=\"modal-header bg-default\">\n    <h6 class=\"modal-title text-white my-auto\" id=\"modal-title-default\">\n      Tambah\n    </h6>\n\n    <button\n      aria-label=\"Close\"\n      class=\"close\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      <span aria-hidden=\"true\" class=\"text-white my-auto\"> × </span>\n    </button>\n  </div>\n\n  <div class=\"modal-body\">\n    <form [formGroup]=\"eduprogramappFormGroup\">\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Nama Penuh</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"customer_id\"\n          placeholder=\"Sila pilih\"\n        >\n          <option value=\"\">Sila pilih</option>\n          <option *ngFor=\"let user of users\" [value]=\"user.id\">\n            {{ user.full_name }}\n          </option>\n        </select>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Nama Organisasi</label>\n        <input\n          class=\"form-control\"\n          formControlName=\"organisation_name\"\n          placeholder=\"contoh: SK Convent Bukit Nenas\"\n        />\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Kategori Organisasi</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"organisation_category\"\n          placeholder=\"Sila pilih\"\n        >\n          <option value=\"\">Sila pilih</option>\n          <option\n            *ngFor=\"let organisationcategory of organisationcategories\"\n            [value]=\"organisationcategory.value\"\n          >\n            {{ organisationcategory.display_name }}\n          </option>\n        </select>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Bilangan Orang</label>\n        <input\n          class=\"form-control\"\n          formControlName=\"participant\"\n          placeholder=\"contoh: 30\"\n          type=\"number\"\n        />\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Program Pendidikan</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"educational_program_id\"\n          placeholder=\"Sila pilih\"\n          (change)=\"changeProgram()\"\n        >\n          <option value=\"\">Sila pilih</option>\n          <option *ngFor=\"let program of programs\" [value]=\"program.id\">\n            {{ program.title }}\n          </option>\n        </select>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Tarikh Dimohon</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"educational_program_date_id\"\n          placeholder=\"Sila pilih\"\n        >\n          <option value=\"\">Sila pilih</option>\n          <option\n            *ngFor=\"let programdate of selectedProgramDates\"\n            [value]=\"programdate.id\"\n          >\n            {{ programdate.program_date }}\n          </option>\n        </select>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Status</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"status\"\n          placeholder=\"Sila pilih\"\n        >\n          <option value=\"\">Sila pilih</option>\n          <option *ngFor=\"let status of statuses\" [value]=\"status.value\">\n            {{ status.display_name }}\n          </option>\n        </select>\n      </div>\n    </form>\n  </div>\n\n  <div class=\"modal-footer\">\n    <button class=\"btn btn-success\" type=\"button\" (click)=\"create()\">\n      Simpan\n    </button>\n\n    <button\n      class=\"btn btn-outline-danger ml-auto\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      Batal\n    </button>\n  </div>\n</ng-template>\n\n<ng-template #editProgramApp>\n  <div class=\"modal-header bg-default\">\n    <h6 class=\"modal-title text-white my-auto\" id=\"modal-title-default\">\n      Ubah Suai\n    </h6>\n\n    <button\n      aria-label=\"Close\"\n      class=\"close\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      <span aria-hidden=\"true\" class=\"text-white my-auto\"> × </span>\n    </button>\n  </div>\n\n  <div class=\"modal-body\">\n    <form [formGroup]=\"eduprogramappFormGroup\">\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Nama Penuh</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"customer_id\"\n          placeholder=\"Sila pilih\"\n        >\n          <option value=\"\">Sila pilih</option>\n          <option *ngFor=\"let user of users\" [value]=\"user.id\">\n            {{ user.full_name }}\n          </option>\n        </select>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Nama Organisasi</label>\n        <input\n          class=\"form-control\"\n          formControlName=\"organisation_name\"\n          placeholder=\"contoh: SK Convent Bukit Nenas\"\n        />\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Kategori Organisasi</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"organisation_category\"\n          placeholder=\"Sila pilih\"\n        >\n          <option value=\"\">Sila pilih</option>\n          <option\n            *ngFor=\"let organisationcategory of organisationcategories\"\n            [value]=\"organisationcategory.value\"\n          >\n            {{ organisationcategory.display_name }}\n          </option>\n        </select>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Bilangan Orang</label>\n        <input\n          class=\"form-control\"\n          formControlName=\"participant\"\n          placeholder=\"contoh: 30\"\n          type=\"number\"\n        />\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Program Pendidikan</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"educational_program_id\"\n          placeholder=\"Sila pilih\"\n          (change)=\"changeProgram()\"\n        >\n          <option value=\"\">Sila pilih</option>\n          <option *ngFor=\"let program of programs\" [value]=\"program.id\">\n            {{ program.title }}\n          </option>\n        </select>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Tarikh Dimohon</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"educational_program_date_id\"\n          placeholder=\"Sila pilih\"\n        >\n          <option value=\"\">Sila pilih</option>\n          <option\n            *ngFor=\"let programdate of selectedProgramDates\"\n            [value]=\"programdate.id\"\n          >\n            {{ programdate.program_date }}\n          </option>\n        </select>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Status</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"status\"\n          placeholder=\"Sila pilih\"\n        >\n          <option value=\"\">Sila pilih</option>\n          <option *ngFor=\"let status of statuses\" [value]=\"status.value\">\n            {{ status.display_name }}\n          </option>\n        </select>\n      </div>\n    </form>\n  </div>\n\n  <div class=\"modal-footer\">\n    <button class=\"btn btn-success\" type=\"button\" (click)=\"update()\">\n      Simpan\n    </button>\n\n    <button\n      class=\"btn btn-outline-danger ml-auto\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      Batal\n    </button>\n  </div>\n</ng-template>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/programs/programs-list/programs-list.component.html":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/programs/programs-list/programs-list.component.html ***!
  \*********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header pb-6\">\n  <div class=\"container-fluid\">\n    <div class=\"header-body\">\n      <div class=\"row align-items-center py-4\">\n        <div class=\"col-lg-6 col-7\">\n          <h6 class=\"h2 text-dark d-inline-block mb-0\">\n            Senarai Program Pendidikan\n          </h6>\n\n          <nav aria-label=\"breadcrumb\" class=\"d-none d-md-inline-block ml-md-4\">\n            <ol class=\"breadcrumb breadcrumb-links breadcrumb-dark\">\n              <li class=\"breadcrumb-item\">\n                <a href=\"javascript:void(0)\">\n                  <i class=\"fas fa-file-invoice text-dark\"></i>\n                </a>\n              </li>\n            </ol>\n          </nav>\n        </div>\n\n        <div class=\"col-lg-6 col-5 text-right\">\n          <a\n            class=\"btn btn-sm btn-neutral\"\n            (click)=\"openModal(createProgram, 'create', '')\"\n          >\n            Tambah\n          </a>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"container-fluid mt--6\">\n  <div class=\"row\">\n    <div class=\"col\">\n      <div class=\"card\">\n        <div class=\"card-header bg-secondary\">\n          <h3 class=\"m-0\">Senarai Program Pendidikan</h3>\n        </div>\n        <div class=\"dataTables_wrapper py-4\">\n          <div class=\"row\">\n            <div class=\"col-sm-12 col-md-6\">\n              <div class=\"dataTables_length\" id=\"datatable_length\">\n                <label>\n                  Papar\n                  <select\n                    name=\"datatable_length\"\n                    aria-controls=\"datatable\"\n                    class=\"form-control form-control-sm\"\n                    (change)=\"entriesChange($event)\"\n                  >\n                    <option value=\"10\" [selected]=\"tableEntries == 5\">5</option>\n                    <option value=\"25\" [selected]=\"tableEntries == 10\">\n                      10\n                    </option>\n                    <option value=\"50\" [selected]=\"tableEntries == 15\">\n                      15\n                    </option>\n                    <option value=\"-1\" [selected]=\"tableEntries == -1\">\n                      Semua\n                    </option>\n                  </select>\n                  rekod\n                </label>\n              </div>\n            </div>\n            <div class=\"col-sm-12 col-md-6\">\n              <div id=\"datatable_filter\" class=\"dataTables_filter\">\n                <label>\n                  <input\n                    type=\"search\"\n                    class=\"form-control form-control-sm\"\n                    placeholder=\"Cari rekod\"\n                    aria-controls=\"datatable\"\n                    (keyup)=\"filterTable($event)\"\n                  />\n                </label>\n              </div>\n            </div>\n          </div>\n\n          <ngx-datatable\n            class=\"bootstrap selection-cell\"\n            [columnMode]=\"'force'\"\n            [headerHeight]=\"50\"\n            [footerHeight]=\"50\"\n            [rowHeight]=\"'auto'\"\n            [limit]=\"tableEntries != -1 ? tableEntries : undefined\"\n            [rows]=\"tableTemp\"\n            (activate)=\"onActivate($event)\"\n          >\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Tajuk</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.title }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Deskripsi</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.description }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Jenis</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ getType(row.program_type) }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Kategori</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ getCategory(row.program_category) }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Status</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                <span\n                  *ngIf=\"row.status == 'AV'\"\n                  class=\"badge badge-pill badge-success\"\n                  >Aktif</span\n                >\n                <span\n                  *ngIf=\"row.status == 'NA'\"\n                  class=\"badge badge-pill badge-danger\"\n                  >Tidak aktif</span\n                >\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Tindakan</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                <button\n                  class=\"btn btn-sm btn-default\"\n                  (click)=\"openModal(programDate, 'createupdate', row)\"\n                >\n                  Tarikh\n                </button>\n                <button\n                  class=\"btn btn-sm btn-primary\"\n                  (click)=\"openModal(editProgram, 'update', row)\"\n                >\n                  Sunting\n                </button>\n              </ng-template>\n            </ngx-datatable-column>\n          </ngx-datatable>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<ng-template #createProgram>\n  <div class=\"modal-header bg-default\">\n    <h6 class=\"modal-title text-white my-auto\" id=\"modal-title-default\">\n      Tambah\n    </h6>\n\n    <button\n      aria-label=\"Close\"\n      class=\"close\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      <span aria-hidden=\"true\" class=\"text-white my-auto\"> × </span>\n    </button>\n  </div>\n\n  <div class=\"modal-body\">\n    <form [formGroup]=\"eduprogramFormGroup\">\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Tajuk</label>\n        <input\n          class=\"form-control\"\n          formControlName=\"title\"\n          placeholder=\"Tajuk\"\n          type=\"text\"\n        />\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Deskripsi</label>\n        <textarea\n          class=\"form-control\"\n          formControlName=\"description\"\n          placeholder=\"Deskripsi\"\n        ></textarea>\n      </div>\n      <div class=\"row\">\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Jenis</label>\n            <select\n              class=\"form-control\"\n              formControlName=\"program_type\"\n              placeholder=\"Sila pilih\"\n            >\n              <option value=\"\">Sila pilih</option>\n              <option\n                *ngFor=\"let programtype of programtypes\"\n                [value]=\"programtype.value\"\n              >\n                {{ programtype.display_name }}\n              </option>\n            </select>\n          </div>\n        </div>\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Kategori</label>\n            <select\n              class=\"form-control\"\n              formControlName=\"program_category\"\n              placeholder=\"Sila pilih\"\n            >\n              <option value=\"\">Sila pilih</option>\n              <option\n                *ngFor=\"let programcategory of programcategories\"\n                [value]=\"programcategory.value\"\n              >\n                {{ programcategory.display_name }}\n              </option>\n            </select>\n          </div>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Terbuka kepada</label>\n        <input\n          class=\"form-control\"\n          formControlName=\"program_opento\"\n          placeholder=\"contoh: Terbuka kepada pelajar 12 tahun\"\n          type=\"text\"\n        />\n      </div>\n      <div class=\"row\">\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Min peserta</label>\n            <input\n              class=\"form-control\"\n              formControlName=\"min_participant\"\n              placeholder=\"contoh: 0\"\n              type=\"number\"\n            />\n          </div>\n        </div>\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Max peserta</label>\n            <input\n              class=\"form-control\"\n              formControlName=\"max_participant\"\n              placeholder=\"contoh: 30\"\n              type=\"number\"\n            />\n          </div>\n        </div>\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Harga</label>\n            <input\n              class=\"form-control\"\n              formControlName=\"price\"\n              placeholder=\"contoh: 30\"\n              type=\"number\"\n            />\n          </div>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Tempat</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"venue_id\"\n          placeholder=\"Sila pilih\"\n          multiple\n        >\n          <option value=\"\">Sila pilih</option>\n          <option *ngFor=\"let venue of venues\" [value]=\"venue.id\">\n            {{ venue.name }}\n          </option>\n        </select>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Koordinator</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"coordinator_id\"\n          placeholder=\"Sila pilih\"\n          multiple\n        >\n          <option value=\"\">Sila pilih</option>\n          <option *ngFor=\"let user of users\" [value]=\"user.id\">\n            {{ user.full_name }}\n          </option>\n        </select>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Status</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"status\"\n          placeholder=\"Sila pilih\"\n        >\n          <option value=\"\">Sila pilih</option>\n          <option value=\"AV\">Aktif</option>\n          <option value=\"NA\">Tidak aktif</option>\n        </select>\n      </div>\n    </form>\n  </div>\n\n  <div class=\"modal-footer\">\n    <button class=\"btn btn-success\" type=\"button\" (click)=\"create()\">\n      Simpan\n    </button>\n\n    <button\n      class=\"btn btn-outline-danger ml-auto\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      Batal\n    </button>\n  </div>\n</ng-template>\n\n<ng-template #editProgram>\n  <div class=\"modal-header bg-default\">\n    <h6 class=\"modal-title text-white my-auto\" id=\"modal-title-default\">\n      Ubah Suai\n    </h6>\n\n    <button\n      aria-label=\"Close\"\n      class=\"close\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      <span aria-hidden=\"true\" class=\"text-white my-auto\"> × </span>\n    </button>\n  </div>\n\n  <div class=\"modal-body\">\n    <form [formGroup]=\"eduprogramFormGroup\">\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Tajuk</label>\n        <input\n          class=\"form-control\"\n          formControlName=\"title\"\n          placeholder=\"Tajuk\"\n          type=\"text\"\n        />\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Deskripsi</label>\n        <textarea\n          class=\"form-control\"\n          formControlName=\"description\"\n          placeholder=\"Deskripsi\"\n        ></textarea>\n      </div>\n      <div class=\"row\">\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Jenis</label>\n            <select\n              class=\"form-control\"\n              formControlName=\"program_type\"\n              placeholder=\"Sila pilih\"\n            >\n              <option value=\"\">Sila pilih</option>\n              <option\n                *ngFor=\"let programtype of programtypes\"\n                [value]=\"programtype.value\"\n              >\n                {{ programtype.display_name }}\n              </option>\n            </select>\n          </div>\n        </div>\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Kategori</label>\n            <select\n              class=\"form-control\"\n              formControlName=\"program_category\"\n              placeholder=\"Sila pilih\"\n            >\n              <option value=\"\">Sila pilih</option>\n              <option\n                *ngFor=\"let programcategory of programcategories\"\n                [value]=\"programcategory.value\"\n              >\n                {{ programcategory.display_name }}\n              </option>\n            </select>\n          </div>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Terbuka kepada</label>\n        <input\n          class=\"form-control\"\n          formControlName=\"program_opento\"\n          placeholder=\"contoh: Terbuka kepada pelajar 12 tahun\"\n          type=\"text\"\n        />\n      </div>\n      <div class=\"row\">\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Min peserta</label>\n            <input\n              class=\"form-control\"\n              formControlName=\"min_participant\"\n              placeholder=\"contoh: 0\"\n              type=\"number\"\n            />\n          </div>\n        </div>\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Max peserta</label>\n            <input\n              class=\"form-control\"\n              formControlName=\"max_participant\"\n              placeholder=\"contoh: 30\"\n              type=\"number\"\n            />\n          </div>\n        </div>\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Harga</label>\n            <input\n              class=\"form-control\"\n              formControlName=\"price\"\n              placeholder=\"contoh: 30\"\n              type=\"number\"\n            />\n          </div>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Tempat</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"venue_id\"\n          placeholder=\"Sila pilih\"\n          multiple\n        >\n          <option value=\"\">Sila pilih</option>\n          <option *ngFor=\"let venue of venues\" [value]=\"venue.id\">\n            {{ venue.name }}\n          </option>\n        </select>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Koordinator</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"coordinator_id\"\n          placeholder=\"Sila pilih\"\n          multiple\n        >\n          <option value=\"\">Sila pilih</option>\n          <option *ngFor=\"let user of users\" [value]=\"user.id\">\n            {{ user.full_name }}\n          </option>\n        </select>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Status</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"status\"\n          placeholder=\"Sila pilih\"\n        >\n          <option value=\"\">Sila pilih</option>\n          <option value=\"AV\">Aktif</option>\n          <option value=\"NA\">Tidak aktif</option>\n        </select>\n      </div>\n    </form>\n  </div>\n\n  <div class=\"modal-footer\">\n    <button class=\"btn btn-success\" type=\"button\" (click)=\"update()\">\n      Simpan\n    </button>\n\n    <button\n      class=\"btn btn-outline-danger ml-auto\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      Batal\n    </button>\n  </div>\n</ng-template>\n\n<ng-template #programDate>\n  <div class=\"modal-header bg-default\">\n    <h6 class=\"modal-title text-white my-auto\" id=\"modal-title-default\">\n      Tambah\n    </h6>\n\n    <button\n      aria-label=\"Close\"\n      class=\"close\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      <span aria-hidden=\"true\" class=\"text-white my-auto\"> × </span>\n    </button>\n  </div>\n\n  <div class=\"modal-body\">\n    <form [formGroup]=\"eduprogramdateFormGroup\">\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Pilih tarikh</label>\n        <input\n          type=\"date\"\n          placeholder=\"Pilih tarikh\"\n          class=\"form-control\"\n          formControlName=\"program_date\"\n        />\n        <!-- bsDatepicker\n          [bsConfig]=\"{\n            isAnimated: true,\n            containerClass: 'theme-default',\n            dateInputFormat: 'YYYY-MM-DD'\n          }\" -->\n      </div>\n    </form>\n\n    <table class=\"table\">\n      <thead>\n        <tr>\n          <td>No</td>\n          <td>Tarikh</td>\n          <td>Tindakan</td>\n        </tr>\n      </thead>\n\n      <tbody>\n        <tr *ngFor=\"let eduprogramdate of eduprogramdates; let i = index\">\n          <td>{{ i + 1 }}</td>\n          <td>{{ eduprogramdate.program_date }}</td>\n          <td><button class=\"btn btn-sm btn-primary\">Sunting</button></td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n\n  <div class=\"modal-footer\">\n    <button class=\"btn btn-success\" type=\"button\" (click)=\"createupdatedate()\">\n      Simpan\n    </button>\n\n    <button\n      class=\"btn btn-outline-danger ml-auto\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      Batal\n    </button>\n  </div>\n</ng-template>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/programs/programs-waiting-list/programs-waiting-list.component.html":
/*!*************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/programs/programs-waiting-list/programs-waiting-list.component.html ***!
  \*************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header pb-6\">\n    <div class=\"container-fluid\">\n        <div class=\"header-body\">\n            <div class=\"row align-items-center py-4\">\n                <div class=\"col-lg-6 col-7\">\n                    <h6 class=\"h2 text-dark d-inline-block mb-0\"></h6>\n\n                    <nav aria-label=\"breadcrumb\" class=\" d-none d-md-inline-block ml-md-4\">\n                        <ol class=\"breadcrumb breadcrumb-links breadcrumb-dark\">\n                            <li class=\"breadcrumb-item\">\n                                <a href=\"javascript:void(0)\">\n                                    <i class=\"fas fa-align-left text-dark\"></i>\n                                </a>\n                            </li>\n                            <!-- <li class=\"breadcrumb-item\">\n                                <a href=\"javascript:void(0)\" class=\"text-dark\"> Finance </a>\n                            </li>\n                            <li aria-current=\"page\" class=\"breadcrumb-item active\">\n                                Fees Management\n                            </li> -->\n                        </ol>\n                    </nav>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div class=\"container-fluid mt--6\">\n    <div class=\"row\">\n        <div class=\"col\">\n            <div class=\"card\">\n                <div class=\"card-header bg-secondary\">\n                    <h3 clas=\"m-0\"></h3>\n                </div>\n                <div class=\"card-body\">\n                    <img src=\"assets/img/default/under-construction.png\" style=\"max-width: 30rem\" class=\"text-center mx-auto d-flex\">\n                    <p class=\"text-center\">Page under construction</p>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/publications/publications-list/publications-list.component.html":
/*!*********************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/publications/publications-list/publications-list.component.html ***!
  \*********************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header pb-6\">\n  <div class=\"container-fluid\">\n    <div class=\"header-body\">\n      <div class=\"row align-items-center py-4\">\n        <div class=\"col-lg-6 col-7\">\n          <h6 class=\"h2 text-dark d-inline-block mb-0\">Senarai Penerbitan</h6>\n\n          <nav aria-label=\"breadcrumb\" class=\"d-none d-md-inline-block ml-md-4\">\n            <ol class=\"breadcrumb breadcrumb-links breadcrumb-dark\">\n              <li class=\"breadcrumb-item\">\n                <a href=\"javascript:void(0)\">\n                  <i class=\"fas fa-file-invoice text-dark\"></i>\n                </a>\n              </li>\n            </ol>\n          </nav>\n        </div>\n\n        <div class=\"col-lg-6 col-5 text-right\">\n          <a\n            class=\"btn btn-sm btn-neutral\"\n            (click)=\"openModal(createPublication, 'create', '')\"\n          >\n            Tambah\n          </a>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"container-fluid mt--6\">\n  <div class=\"row\">\n    <div class=\"col\">\n      <div class=\"card\">\n        <div class=\"card-header bg-secondary\">\n          <h3 class=\"m-0\">Senarai Penerbitan</h3>\n        </div>\n        <div class=\"dataTables_wrapper py-4\">\n          <div class=\"row\">\n            <div class=\"col-sm-12 col-md-6\">\n              <div class=\"dataTables_length\" id=\"datatable_length\">\n                <label>\n                  Papar\n                  <select\n                    name=\"datatable_length\"\n                    aria-controls=\"datatable\"\n                    class=\"form-control form-control-sm\"\n                    (change)=\"entriesChange($event)\"\n                  >\n                    <option value=\"10\" [selected]=\"tableEntries == 5\">5</option>\n                    <option value=\"25\" [selected]=\"tableEntries == 10\">\n                      10\n                    </option>\n                    <option value=\"50\" [selected]=\"tableEntries == 15\">\n                      15\n                    </option>\n                    <option value=\"-1\" [selected]=\"tableEntries == -1\">\n                      Semua\n                    </option>\n                  </select>\n                  rekod\n                </label>\n              </div>\n            </div>\n            <div class=\"col-sm-12 col-md-6\">\n              <div id=\"datatable_filter\" class=\"dataTables_filter\">\n                <label>\n                  <input\n                    type=\"search\"\n                    class=\"form-control form-control-sm\"\n                    placeholder=\"Cari rekod\"\n                    aria-controls=\"datatable\"\n                    (keyup)=\"filterTable($event)\"\n                  />\n                </label>\n              </div>\n            </div>\n          </div>\n\n          <ngx-datatable\n            class=\"bootstrap selection-cell\"\n            [columnMode]=\"'force'\"\n            [headerHeight]=\"50\"\n            [footerHeight]=\"50\"\n            [rowHeight]=\"'auto'\"\n            [limit]=\"tableEntries != -1 ? tableEntries : undefined\"\n            [rows]=\"tableTemp\"\n            (activate)=\"onActivate($event)\"\n          >\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Tajuk</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.title }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Abstrak</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.abstract }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Nama Penulis</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.publisher_name }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Tarikh Diterbit</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.published_date | date: \"mediumDate\" }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Tahun</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.year }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <!-- <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Status</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                <span\n                  *ngIf=\"row.status == 'AV'\"\n                  class=\"badge badge-pill badge-success\"\n                  >Aktif</span\n                >\n                <span\n                  *ngIf=\"row.status == 'NA'\"\n                  class=\"badge badge-pill badge-danger\"\n                  >Tidak aktif</span\n                >\n              </ng-template>\n            </ngx-datatable-column> -->\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Tindakan</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                <button\n                  class=\"btn btn-sm btn-primary\"\n                  (click)=\"openModal(editPublication, 'update', row)\"\n                >\n                  Sunting\n                </button>\n              </ng-template>\n            </ngx-datatable-column>\n          </ngx-datatable>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<ng-template #createPublication>\n  <div class=\"modal-header bg-default\">\n    <h6 class=\"modal-title text-white my-auto\" id=\"modal-title-default\">\n      Tambah\n    </h6>\n\n    <button\n      aria-label=\"Close\"\n      class=\"close\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      <span aria-hidden=\"true\" class=\"text-white my-auto\"> × </span>\n    </button>\n  </div>\n\n  <div class=\"modal-body\">\n    <form [formGroup]=\"publicationFormGroup\">\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Tajuk</label>\n        <input\n          class=\"form-control\"\n          formControlName=\"title\"\n          placeholder=\"Tajuk\"\n          type=\"text\"\n        />\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Abstrak</label>\n        <textarea\n          class=\"form-control\"\n          formControlName=\"abstract\"\n          placeholder=\"Abstrak\"\n        ></textarea>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Nama Penulis</label>\n        <input\n          class=\"form-control\"\n          formControlName=\"author_name\"\n          placeholder=\"Nama Penulis\"\n          type=\"text\"\n        />\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Nama Penerbit</label>\n        <input\n          class=\"form-control\"\n          formControlName=\"publisher_name\"\n          placeholder=\"Nama Penerbit\"\n          type=\"text\"\n        />\n      </div>\n      <div class=\"row\">\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Tarikh Diterbit</label>\n            <input\n              class=\"form-control\"\n              formControlName=\"published_date\"\n              placeholder=\"Sila pilih\"\n              type=\"date\"\n            />\n          </div>\n        </div>\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Edisi</label>\n            <input\n              class=\"form-control\"\n              formControlName=\"edition\"\n              placeholder=\"Sila pilih\"\n              type=\"text\"\n            />\n          </div>\n        </div>\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Tahun</label>\n            <input\n              class=\"form-control\"\n              formControlName=\"year\"\n              placeholder=\"Sila pilih\"\n              type=\"number\"\n            />\n          </div>\n        </div>\n      </div>\n      <!-- <div class=\"form-group\">\n        <label class=\"form-control-label\">Status</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"status\"\n          placeholder=\"Sila pilih\"\n        >\n          <option value=\"AV\">Aktif</option>\n          <option value=\"NA\">Tidak aktif</option>\n        </select>\n      </div> -->\n    </form>\n  </div>\n\n  <div class=\"modal-footer\">\n    <button class=\"btn btn-success\" type=\"button\" (click)=\"create()\">\n      Simpan\n    </button>\n\n    <button\n      class=\"btn btn-outline-danger ml-auto\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      Batal\n    </button>\n  </div>\n</ng-template>\n\n<ng-template #editPublication>\n  <div class=\"modal-header bg-default\">\n    <h6 class=\"modal-title text-white my-auto\" id=\"modal-title-default\">\n      Ubah Suai\n    </h6>\n\n    <button\n      aria-label=\"Close\"\n      class=\"close\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      <span aria-hidden=\"true\" class=\"text-white my-auto\"> × </span>\n    </button>\n  </div>\n\n  <div class=\"modal-body\">\n    <form [formGroup]=\"publicationFormGroup\">\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Tajuk</label>\n        <input\n          class=\"form-control\"\n          formControlName=\"title\"\n          placeholder=\"Tajuk\"\n          type=\"text\"\n        />\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Abstrak</label>\n        <textarea\n          class=\"form-control\"\n          formControlName=\"abstract\"\n          placeholder=\"Abstrak\"\n        ></textarea>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Nama Penulis</label>\n        <input\n          class=\"form-control\"\n          formControlName=\"author_name\"\n          placeholder=\"Nama Penulis\"\n          type=\"text\"\n        />\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Nama Penerbit</label>\n        <input\n          class=\"form-control\"\n          formControlName=\"publisher_name\"\n          placeholder=\"Nama Penerbit\"\n          type=\"text\"\n        />\n      </div>\n      <div class=\"row\">\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Tarikh Diterbit</label>\n            <input\n              class=\"form-control\"\n              formControlName=\"published_date\"\n              placeholder=\"Sila pilih\"\n              type=\"date\"\n            />\n          </div>\n        </div>\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Edisi</label>\n            <input\n              class=\"form-control\"\n              formControlName=\"edition\"\n              placeholder=\"Sila pilih\"\n              type=\"text\"\n            />\n          </div>\n        </div>\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Tahun</label>\n            <input\n              class=\"form-control\"\n              formControlName=\"year\"\n              placeholder=\"Sila pilih\"\n              type=\"number\"\n            />\n          </div>\n        </div>\n      </div>\n      <!-- <div class=\"form-group\">\n          <label class=\"form-control-label\">Status</label>\n          <select\n            class=\"form-control\"\n            formControlName=\"status\"\n            placeholder=\"Sila pilih\"\n          >\n            <option value=\"AV\">Aktif</option>\n            <option value=\"NA\">Tidak aktif</option>\n          </select>\n        </div> -->\n    </form>\n  </div>\n\n  <div class=\"modal-footer\">\n    <button class=\"btn btn-success\" type=\"button\" (click)=\"update()\">\n      Simpan\n    </button>\n\n    <button\n      class=\"btn btn-outline-danger ml-auto\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      Batal\n    </button>\n  </div>\n</ng-template>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/reports/reports-analysis/reports-analysis.component.html":
/*!**************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/reports/reports-analysis/reports-analysis.component.html ***!
  \**************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header pb-6\">\n    <div class=\"container-fluid\">\n        <div class=\"header-body\">\n            <div class=\"row align-items-center py-4\">\n                <div class=\"col-lg-6 col-7\">\n                    <h6 class=\"h2 text-dark d-inline-block mb-0\">Laporan Analisa</h6>\n\n                    <nav aria-label=\"breadcrumb\" class=\" d-none d-md-inline-block ml-md-4\">\n                        <ol class=\"breadcrumb breadcrumb-links breadcrumb-dark\">\n                            <li class=\" breadcrumb-item\">\n                                <a href=\"javascript:void(0)\"> <i class=\"fas fa-chart-bar text-dark\"> </i> </a>\n                            </li>\n                            <li aria-current=\"page\" class=\"breadcrumb-item active\">\n                                Analisa\n                            </li>\n                        </ol>\n                    </nav>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div class=\"container-fluid mt--6\">\n    <div class=\"row\">\n        <div class=\"col-md-12\">\n            <div class=\"card\">\n                <div class=\"card-header bg-secondary\">\n                    <h3 class=\"m-0\"></h3>\n                </div>\n                <div class=\"card-body\">\n                    <div class=\"row\">\n                        <div class=\"col-md-12 col-lg-5\">\n                            <div class=\"form-group\">\n                                <label class=\"form-control-label\">Jenis laporan</label>\n                                <select class=\"form-control custom-select\">\n                                    <option hidden selected>Please pick</option>\n                                    <option>Laporan 1</option>\n                                    <option>Laporan 2</option>\n                                    <option>Laporan 3</option>\n                                    <option>Laporan 4</option>\n                                </select>\n                            </div>\n                        </div>\n                        <div class=\"col-md-12 col-lg-5\">\n                            <div class=\"form-group\">\n                                <label class=\"form-control-label\">Jangka masa</label>\n                                <div class=\"input-group\">\n                                    <div class=\"input-group-prepend\">\n                                      <span class=\"input-group-text\"><i class=\"far fa-calendar-alt\"></i></span>\n                                    </div>\n                                    <input \n                                        type=\"text\"\n                                        class=\"form-control\"\n                                        bsDaterangepicker\n                                        [bsConfig]=\"bsDPConfig\"\n                                        placeholder=\"Date range\"\n                                        name=\"bsDaterangepicker\"\n                                    >\n                                  </div>\n                            </div>\n                        </div>\n                        <div class=\"col-md-12 col-lg-2 d-flex align-items-center\">\n                            <button class=\"btn btn-default\" type=\"button\">Cari</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-md-12 col-lg-6\">\n            <div class=\"card\">\n                <div class=\"card-header bg-secondary\">\n                    <h3 class=\"m-0\">Laporan 1</h3>\n                </div>\n                <div class=\"card-body\">\n                    <div class=\"chart\">\n                        <div class=\"amchart\" id=\"chartdiv\"></div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-md-12 col-lg-6\">\n            <div class=\"card\">\n                <div class=\"card-header bg-secondary\">\n                    <h3 class=\"m-0\">Laporan 2</h3>\n                </div>\n                <div class=\"card-body\">\n                    <div class=\"chart\">\n                        <div class=\"amchart\" id=\"chartdiv1\"></div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-md-12 col-lg-6\">\n            <div class=\"card\">\n                <div class=\"card-header bg-secondary\">\n                    <h3 class=\"m-0\">Laporan 3</h3>\n                </div>\n                <div class=\"card-body\">\n                    <div class=\"chart\">\n                        <div class=\"amchart\" id=\"chartdiv2\"></div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-md-12 col-lg-6\">\n            <div class=\"card\">\n                <div class=\"card-header bg-secondary\">\n                    <h3 class=\"m-0\">Laporan 4</h3>\n                </div>\n                <div class=\"card-body\">\n                    <div class=\"chart\">\n                        <div class=\"amchart\" id=\"chartdiv3\"></div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/reports/reports-operation/reports-operation.component.html":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/reports/reports-operation/reports-operation.component.html ***!
  \****************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header pb-6\">\n    <div class=\"container-fluid\">\n        <div class=\"header-body\">\n            <div class=\"row align-items-center py-4\">\n                <div class=\"col-lg-6 col-7\">\n                    <h6 class=\"h2 text-dark d-inline-block mb-0\"></h6>\n\n                    <nav aria-label=\"breadcrumb\" class=\" d-none d-md-inline-block ml-md-4\">\n                        <ol class=\"breadcrumb breadcrumb-links breadcrumb-dark\">\n                            <li class=\"breadcrumb-item\">\n                                <a href=\"javascript:void(0)\">\n                                    <i class=\"fas fa-align-left text-dark\"></i>\n                                </a>\n                            </li>\n                            <!-- <li class=\"breadcrumb-item\">\n                                <a href=\"javascript:void(0)\" class=\"text-dark\"> Finance </a>\n                            </li>\n                            <li aria-current=\"page\" class=\"breadcrumb-item active\">\n                                Fees Management\n                            </li> -->\n                        </ol>\n                    </nav>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div class=\"container-fluid mt--6\">\n    <div class=\"row\">\n        <div class=\"col\">\n            <div class=\"card\">\n                <div class=\"card-header bg-secondary\">\n                    <h3 clas=\"m-0\"></h3>\n                </div>\n                <div class=\"card-body\">\n                    <img src=\"assets/img/default/under-construction.png\" style=\"max-width: 30rem\" class=\"text-center mx-auto d-flex\">\n                    <p class=\"text-center\">Page under construction</p>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/reports/reports-ticket-sales/reports-ticket-sales.component.html":
/*!**********************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/reports/reports-ticket-sales/reports-ticket-sales.component.html ***!
  \**********************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header pb-6\">\n    <div class=\"container-fluid\">\n        <div class=\"header-body\">\n            <div class=\"row align-items-center py-4\">\n                <div class=\"col-lg-6 col-7\">\n                    <h6 class=\"h2 text-dark d-inline-block mb-0\"></h6>\n\n                    <nav aria-label=\"breadcrumb\" class=\" d-none d-md-inline-block ml-md-4\">\n                        <ol class=\"breadcrumb breadcrumb-links breadcrumb-dark\">\n                            <li class=\"breadcrumb-item\">\n                                <a href=\"javascript:void(0)\">\n                                    <i class=\"fas fa-align-left text-dark\"></i>\n                                </a>\n                            </li>\n                            <!-- <li class=\"breadcrumb-item\">\n                                <a href=\"javascript:void(0)\" class=\"text-dark\"> Finance </a>\n                            </li>\n                            <li aria-current=\"page\" class=\"breadcrumb-item active\">\n                                Fees Management\n                            </li> -->\n                        </ol>\n                    </nav>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div class=\"container-fluid mt--6\">\n    <div class=\"row\">\n        <div class=\"col\">\n            <div class=\"card\">\n                <div class=\"card-header bg-secondary\">\n                    <h3 clas=\"m-0\"></h3>\n                </div>\n                <div class=\"card-body\">\n                    <img src=\"assets/img/default/under-construction.png\" style=\"max-width: 30rem\" class=\"text-center mx-auto d-flex\">\n                    <p class=\"text-center\">Page under construction</p>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/shows/shows-list/shows-list.component.html":
/*!************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/shows/shows-list/shows-list.component.html ***!
  \************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header pb-6\">\n  <div class=\"container-fluid\">\n    <div class=\"header-body\">\n      <div class=\"row align-items-center py-4\">\n        <div class=\"col-lg-6 col-7\">\n          <h6 class=\"h2 text-dark d-inline-block mb-0\">Senarai Tayangan</h6>\n\n          <nav aria-label=\"breadcrumb\" class=\"d-none d-md-inline-block ml-md-4\">\n            <ol class=\"breadcrumb breadcrumb-links breadcrumb-dark\">\n              <li class=\"breadcrumb-item\">\n                <a href=\"javascript:void(0)\">\n                  <i class=\"fas fa-file-invoice text-dark\"></i>\n                </a>\n              </li>\n            </ol>\n          </nav>\n        </div>\n\n        <div class=\"col-lg-6 col-5 text-right\">\n          <a\n            class=\"btn btn-sm btn-neutral\"\n            (click)=\"openModal(createShow, 'create', '')\"\n          >\n            Tambah\n          </a>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"container-fluid mt--6\">\n  <div class=\"row\">\n    <div class=\"col\">\n      <div class=\"card\">\n        <div class=\"card-header bg-secondary\">\n          <h3 class=\"m-0\">Senarai Tayangan</h3>\n        </div>\n        <div class=\"dataTables_wrapper py-4\">\n          <div class=\"row\">\n            <div class=\"col-sm-12 col-md-6\">\n              <div class=\"dataTables_length\" id=\"datatable_length\">\n                <label>\n                  Papar\n                  <select\n                    name=\"datatable_length\"\n                    aria-controls=\"datatable\"\n                    class=\"form-control form-control-sm\"\n                    (change)=\"entriesChange($event)\"\n                  >\n                    <option value=\"10\" [selected]=\"tableEntries == 5\">5</option>\n                    <option value=\"25\" [selected]=\"tableEntries == 10\">\n                      10\n                    </option>\n                    <option value=\"50\" [selected]=\"tableEntries == 15\">\n                      15\n                    </option>\n                    <option value=\"-1\" [selected]=\"tableEntries == -1\">\n                      Semua\n                    </option>\n                  </select>\n                  rekod\n                </label>\n              </div>\n            </div>\n            <div class=\"col-sm-12 col-md-6\">\n              <div id=\"datatable_filter\" class=\"dataTables_filter\">\n                <label>\n                  <input\n                    type=\"search\"\n                    class=\"form-control form-control-sm\"\n                    placeholder=\"Cari rekod\"\n                    aria-controls=\"datatable\"\n                    (keyup)=\"filterTable($event)\"\n                  />\n                </label>\n              </div>\n            </div>\n          </div>\n\n          <ngx-datatable\n            class=\"bootstrap selection-cell\"\n            [columnMode]=\"'force'\"\n            [headerHeight]=\"50\"\n            [footerHeight]=\"50\"\n            [rowHeight]=\"'auto'\"\n            [limit]=\"tableEntries != -1 ? tableEntries : undefined\"\n            [rows]=\"tableTemp\"\n            (activate)=\"onActivate($event)\"\n          >\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Tajuk</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.title }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Deskripsi</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.description }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Status</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                <span\n                  *ngIf=\"row.status == 'AV'\"\n                  class=\"badge badge-pill badge-success\"\n                  >Aktif</span\n                >\n                <span\n                  *ngIf=\"row.status == 'NA'\"\n                  class=\"badge badge-pill badge-danger\"\n                  >Tidak aktif</span\n                >\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Tindakan</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                <button\n                  class=\"btn btn-sm btn-primary\"\n                  (click)=\"openModal(editShow, 'update', row)\"\n                >\n                  Sunting\n                </button>\n              </ng-template>\n            </ngx-datatable-column>\n          </ngx-datatable>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<ng-template #createShow>\n  <div class=\"modal-header bg-default\">\n    <h6 class=\"modal-title text-white my-auto\" id=\"modal-title-default\">\n      Tambah\n    </h6>\n\n    <button\n      aria-label=\"Close\"\n      class=\"close\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      <span aria-hidden=\"true\" class=\"text-white my-auto\"> × </span>\n    </button>\n  </div>\n\n  <div class=\"modal-body\">\n    <form [formGroup]=\"showingFormGroup\">\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Tajuk</label>\n        <input\n          class=\"form-control\"\n          formControlName=\"title\"\n          placeholder=\"Tajuk\"\n          type=\"text\"\n        />\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Deskripsi</label>\n        <textarea\n          class=\"form-control\"\n          formControlName=\"description\"\n          placeholder=\"Deskripsi\"\n        ></textarea>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Genre</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"genre\"\n          placeholder=\"Sila pilih\"\n        >\n          <option value=\"NA\">Tidak ada</option>\n        </select>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Bahasa</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"language\"\n          placeholder=\"Sila pilih\"\n        >\n          <option value=\"MY\">Bahasa Melayu</option>\n          <option value=\"EN\">English</option>\n        </select>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Durasi (jam)</label>\n        <input\n          class=\"form-control\"\n          formControlName=\"duration_hours\"\n          placeholder=\"contoh: 1\"\n          type=\"number\"\n        />\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Durasi (minit)</label>\n        <input\n          class=\"form-control\"\n          formControlName=\"duration_minutes\"\n          placeholder=\"contoh: 30\"\n          type=\"number\"\n        />\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Status</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"status\"\n          placeholder=\"Sila pilih\"\n        >\n          <option value=\"AV\">Aktif</option>\n          <option value=\"NA\">Tidak aktif</option>\n        </select>\n      </div>\n    </form>\n  </div>\n\n  <div class=\"modal-footer\">\n    <button class=\"btn btn-success\" type=\"button\" (click)=\"create()\">\n      Simpan\n    </button>\n\n    <button\n      class=\"btn btn-outline-danger ml-auto\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      Batal\n    </button>\n  </div>\n</ng-template>\n\n<ng-template #editShow>\n  <div class=\"modal-header bg-default\">\n    <h6 class=\"modal-title text-white my-auto\" id=\"modal-title-default\">\n      Ubah Suai\n    </h6>\n\n    <button\n      aria-label=\"Close\"\n      class=\"close\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      <span aria-hidden=\"true\" class=\"text-white my-auto\"> × </span>\n    </button>\n  </div>\n\n  <div class=\"modal-body\">\n    <form [formGroup]=\"showingFormGroup\">\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Tajuk</label>\n        <input\n          class=\"form-control\"\n          formControlName=\"title\"\n          placeholder=\"Tajuk\"\n          type=\"text\"\n        />\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Deskripsi</label>\n        <textarea\n          class=\"form-control\"\n          formControlName=\"description\"\n          placeholder=\"Deskripsi\"\n        ></textarea>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Genre</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"genre\"\n          placeholder=\"Sila pilih\"\n        >\n          <option value=\"NA\">Tidak ada</option>\n        </select>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Bahasa</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"language\"\n          placeholder=\"Sila pilih\"\n        >\n          <option value=\"MY\">Bahasa Melayu</option>\n          <option value=\"EN\">English</option>\n        </select>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Durasi (jam)</label>\n        <input\n          class=\"form-control\"\n          formControlName=\"duration_hours\"\n          placeholder=\"contoh: 1\"\n          type=\"number\"\n        />\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Durasi (minit)</label>\n        <input\n          class=\"form-control\"\n          formControlName=\"duration_minutes\"\n          placeholder=\"contoh: 30\"\n          type=\"number\"\n        />\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Status</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"status\"\n          placeholder=\"Sila pilih\"\n        >\n          <option value=\"AV\">Aktif</option>\n          <option value=\"NA\">Tidak aktif</option>\n        </select>\n      </div>\n    </form>\n  </div>\n\n  <div class=\"modal-footer\">\n    <button class=\"btn btn-success\" type=\"button\" (click)=\"update()\">\n      Simpan\n    </button>\n\n    <button\n      class=\"btn btn-outline-danger ml-auto\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      Batal\n    </button>\n  </div>\n</ng-template>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/shows/shows-schedule/shows-schedule.component.html":
/*!********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/shows/shows-schedule/shows-schedule.component.html ***!
  \********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header pb-6\">\n  <div class=\"container-fluid\">\n    <div class=\"header-body\">\n      <div class=\"row align-items-center py-4\">\n        <div class=\"col-lg-6 col-7\">\n          <h6 class=\"h2 text-dark d-inline-block mb-0\">Jadual Tayangan</h6>\n\n          <nav aria-label=\"breadcrumb\" class=\"d-none d-md-inline-block ml-md-4\">\n            <ol class=\"breadcrumb breadcrumb-links breadcrumb-dark\">\n              <li class=\"breadcrumb-item\">\n                <a href=\"javascript:void(0)\">\n                  <i class=\"fas fa-file-invoice text-dark\"></i>\n                </a>\n              </li>\n            </ol>\n          </nav>\n        </div>\n\n        <div class=\"col-lg-6 col-5 text-right\">\n          <a\n            class=\"btn btn-sm btn-neutral\"\n            (click)=\"openModal(createShow, 'create', '')\"\n          >\n            Tambah\n          </a>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"container-fluid mt--6\">\n  <div class=\"row\">\n    <div class=\"col\">\n      <div class=\"card\">\n        <div class=\"card-header bg-secondary\">\n          <!-- <h3 class=\"m-0\">Action Types</h3> -->\n        </div>\n        <div class=\"card-body\">\n          <div class=\"chart\">\n            <div class=\"amchart\" id=\"chart-show-schedule-1\"></div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"col\">\n      <div class=\"card\">\n        <div class=\"card-header bg-secondary\">\n          <h3 class=\"m-0\">Senarai</h3>\n        </div>\n        <div class=\"dataTables_wrapper py-4\">\n          <div class=\"row\">\n            <div class=\"col-sm-12 col-md-6\">\n              <div class=\"dataTables_length\" id=\"datatable_length\">\n                <label>\n                  Papar\n                  <select\n                    name=\"datatable_length\"\n                    aria-controls=\"datatable\"\n                    class=\"form-control form-control-sm\"\n                    (change)=\"entriesChange($event)\"\n                  >\n                    <option value=\"10\" [selected]=\"tableEntries == 5\">5</option>\n                    <option value=\"25\" [selected]=\"tableEntries == 10\">\n                      10\n                    </option>\n                    <option value=\"50\" [selected]=\"tableEntries == 15\">\n                      15\n                    </option>\n                    <option value=\"-1\" [selected]=\"tableEntries == -1\">\n                      Semua\n                    </option>\n                  </select>\n                  rekod\n                </label>\n              </div>\n            </div>\n            <div class=\"col-sm-12 col-md-6\">\n              <div id=\"datatable_filter\" class=\"dataTables_filter\">\n                <label>\n                  <input\n                    type=\"search\"\n                    class=\"form-control form-control-sm\"\n                    placeholder=\"Cari rekod\"\n                    aria-controls=\"datatable\"\n                    (keyup)=\"filterTable($event)\"\n                  />\n                </label>\n              </div>\n            </div>\n          </div>\n\n          <ngx-datatable\n            class=\"bootstrap selection-cell\"\n            [columnMode]=\"'force'\"\n            [headerHeight]=\"50\"\n            [footerHeight]=\"50\"\n            [rowHeight]=\"'auto'\"\n            [limit]=\"tableEntries != -1 ? tableEntries : undefined\"\n            [rows]=\"tableTemp\"\n            (activate)=\"onActivate($event)\"\n          >\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Tarikh</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.show_date }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Masa</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.show_time }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Tajuk</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.showing_id.title }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <!-- <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Status</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                <span\n                  *ngIf=\"row.status == 'active'\"\n                  class=\"badge badge-pill badge-success\"\n                  >Aktif</span\n                >\n                <span\n                  *ngIf=\"row.status == 'inactive'\"\n                  class=\"badge badge-pill badge-danger\"\n                  >Tidak aktif</span\n                >\n              </ng-template>\n            </ngx-datatable-column> -->\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Tindakan</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                <button\n                  class=\"btn btn-sm btn-primary\"\n                  (click)=\"openModal(editShow, 'update', row)\"\n                >\n                  Sunting\n                </button>\n              </ng-template>\n            </ngx-datatable-column>\n          </ngx-datatable>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<ng-template #createShow>\n  <div class=\"modal-header bg-default\">\n    <h6 class=\"modal-title text-white my-auto\" id=\"modal-title-default\">\n      Tambah\n    </h6>\n\n    <button\n      aria-label=\"Close\"\n      class=\"close\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      <span aria-hidden=\"true\" class=\"text-white my-auto\"> × </span>\n    </button>\n  </div>\n\n  <div class=\"modal-body\">\n    <form [formGroup]=\"showtimeFormGroup\">\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Tajuk</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"showing_id\"\n          placeholder=\"Sila pilih\"\n        >\n          <option value=\"\">Sila pilih</option>\n          <option *ngFor=\"let show of shows\" [value]=\"show.id\">\n            {{ show.title }}\n          </option>\n        </select>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Masa</label>\n            <input\n              class=\"form-control\"\n              formControlName=\"show_time\"\n              placeholder=\"Masa\"\n              type=\"time\"\n            />\n          </div>\n        </div>\n\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Tarikh</label>\n            <input\n              class=\"form-control\"\n              formControlName=\"show_date\"\n              placeholder=\"Tarikh\"\n              type=\"date\"\n            />\n          </div>\n        </div>\n      </div>\n\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Tempat</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"venue_id\"\n          placeholder=\"Sila pilih\"\n          multiple\n        >\n          <option value=\"\">Sila pilih</option>\n          <option *ngFor=\"let venue of venues\" [value]=\"venue.id\">\n            {{ venue.name }}\n          </option>\n        </select>\n      </div>\n    </form>\n  </div>\n\n  <div class=\"modal-footer\">\n    <button class=\"btn btn-success\" type=\"button\" (click)=\"create()\">\n      Simpan\n    </button>\n\n    <button\n      class=\"btn btn-outline-danger ml-auto\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      Batal\n    </button>\n  </div>\n</ng-template>\n\n<ng-template #editShow>\n  <div class=\"modal-header bg-default\">\n    <h6 class=\"modal-title text-white my-auto\" id=\"modal-title-default\">\n      Ubah Suai\n    </h6>\n\n    <button\n      aria-label=\"Close\"\n      class=\"close\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      <span aria-hidden=\"true\" class=\"text-white my-auto\"> × </span>\n    </button>\n  </div>\n\n  <div class=\"modal-body\">\n    <form [formGroup]=\"showtimeFormGroup\">\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Tajuk</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"showing_id\"\n          placeholder=\"Sila pilih\"\n        >\n          <option value=\"\">Sila pilih</option>\n          <option *ngFor=\"let show of shows\" [value]=\"show.id\">\n            {{ show.title }}\n          </option>\n        </select>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Masa</label>\n            <input\n              class=\"form-control\"\n              formControlName=\"show_time\"\n              placeholder=\"Masa\"\n              type=\"time\"\n            />\n          </div>\n        </div>\n\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Tarikh</label>\n            <input\n              class=\"form-control\"\n              formControlName=\"show_date\"\n              placeholder=\"Tarikh\"\n              type=\"date\"\n            />\n          </div>\n        </div>\n      </div>\n\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Tempat</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"venue_id\"\n          placeholder=\"Sila pilih\"\n          multiple\n        >\n          <option value=\"\">Sila pilih</option>\n          <option *ngFor=\"let venue of venues\" [value]=\"venue.id\">\n            {{ venue.name }}\n          </option>\n        </select>\n      </div>\n    </form>\n  </div>\n\n  <div class=\"modal-footer\">\n    <button class=\"btn btn-success\" type=\"button\" (click)=\"update()\">\n      Simpan\n    </button>\n\n    <button\n      class=\"btn btn-outline-danger ml-auto\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      Batal\n    </button>\n  </div>\n</ng-template>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/simulator-ride/simulator-ride-applications/simulator-ride-applications.component.html":
/*!*******************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/simulator-ride/simulator-ride-applications/simulator-ride-applications.component.html ***!
  \*******************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header pb-6\">\n  <div class=\"container-fluid\">\n    <div class=\"header-body\">\n      <div class=\"row align-items-center py-4\">\n        <div class=\"col-lg-6 col-7\">\n          <h6 class=\"h2 text-dark d-inline-block mb-0\">Senarai Tempahan</h6>\n\n          <nav aria-label=\"breadcrumb\" class=\"d-none d-md-inline-block ml-md-4\">\n            <ol class=\"breadcrumb breadcrumb-links breadcrumb-dark\">\n              <li class=\"breadcrumb-item\">\n                <a href=\"javascript:void(0)\">\n                  <i class=\"fas fa-file-invoice text-dark\"></i>\n                </a>\n              </li>\n            </ol>\n          </nav>\n        </div>\n\n        <div class=\"col-lg-6 col-5 text-right\">\n          <a\n            class=\"btn btn-sm btn-neutral\"\n            (click)=\"openModal(createSimulatorRide, 'create', '')\"\n          >\n            Tambah\n          </a>\n          <a\n            class=\"btn btn-sm btn-default\"\n            [routerLink]=\"['/simulator-ride/schedule']\"\n          >\n            Kembali\n          </a>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"container-fluid mt--6\">\n  <div class=\"row\">\n    <div class=\"col\">\n      <div class=\"card\">\n        <div class=\"card-header bg-secondary\">\n          <h3 class=\"m-0\">Senarai</h3>\n        </div>\n        <div class=\"dataTables_wrapper py-4\">\n          <div class=\"row\">\n            <div class=\"col-sm-12 col-md-6\">\n              <div class=\"dataTables_length\" id=\"datatable_length\">\n                <label>\n                  Papar\n                  <select\n                    name=\"datatable_length\"\n                    aria-controls=\"datatable\"\n                    class=\"form-control form-control-sm\"\n                    (change)=\"entriesChange($event)\"\n                  >\n                    <option value=\"10\" [selected]=\"tableEntries == 5\">5</option>\n                    <option value=\"25\" [selected]=\"tableEntries == 10\">\n                      10\n                    </option>\n                    <option value=\"50\" [selected]=\"tableEntries == 15\">\n                      15\n                    </option>\n                    <option value=\"-1\" [selected]=\"tableEntries == -1\">\n                      Semua\n                    </option>\n                  </select>\n                  rekod\n                </label>\n              </div>\n            </div>\n            <div class=\"col-sm-12 col-md-6\">\n              <div id=\"datatable_filter\" class=\"dataTables_filter\">\n                <label>\n                  <input\n                    type=\"search\"\n                    class=\"form-control form-control-sm\"\n                    placeholder=\"Cari rekod\"\n                    aria-controls=\"datatable\"\n                    (keyup)=\"filterTable($event)\"\n                  />\n                </label>\n              </div>\n            </div>\n          </div>\n\n          <ngx-datatable\n            class=\"bootstrap selection-cell\"\n            [columnMode]=\"'force'\"\n            [headerHeight]=\"50\"\n            [footerHeight]=\"50\"\n            [rowHeight]=\"'auto'\"\n            [limit]=\"tableEntries != -1 ? tableEntries : undefined\"\n            [rows]=\"tableTemp\"\n            (activate)=\"onActivate($event)\"\n          >\n            <ngx-datatable-column [width]=\"10\">\n              <ng-template ngx-datatable-header-template>\n                <span>No</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.no + 1 }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Jenis Tiket</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ getType(row.ticket_type) }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Kategori Tiket</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ getCategory(row.ticket_category) }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Pelanggan</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.user_id }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Tindakan</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                <button\n                  class=\"btn btn-sm btn-primary\"\n                  (click)=\"openModal(editSimulatorRide, 'update', row)\"\n                >\n                  Sunting\n                </button>\n              </ng-template>\n            </ngx-datatable-column>\n          </ngx-datatable>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<ng-template #createSimulatorRide>\n  <div class=\"modal-header bg-default\">\n    <h6 class=\"modal-title text-white my-auto\" id=\"modal-title-default\">\n      Tambah\n    </h6>\n\n    <button\n      aria-label=\"Close\"\n      class=\"close\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      <span aria-hidden=\"true\" class=\"text-white my-auto\"> × </span>\n    </button>\n  </div>\n\n  <div class=\"modal-body\">\n    <form [formGroup]=\"simridebookingFormGroup\">\n      <div class=\"row\">\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Masa</label>\n            <select\n              class=\"form-control\"\n              formControlName=\"simulator_ride_time_id\"\n              placeholder=\"Sila pilih\"\n              readonly=\"true\"\n            >\n              <option value=\"\">Sila pilih</option>\n              <option *ngFor=\"let time of times\" [value]=\"time.id\">\n                {{ time.day }}, {{ time.time }} {{ time.round }}\n              </option>\n            </select>\n          </div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Tarikh</label>\n            <input\n              class=\"form-control\"\n              formControlName=\"booking_date\"\n              placeholder=\"Sila pilih\"\n              type=\"date\"\n            />\n          </div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Warganegara</label><br />\n            <div class=\"custom-control custom-radio custom-control-inline\">\n              <input\n                type=\"radio\"\n                name=\"ticket_type\"\n                class=\"custom-control-input\"\n                value=\"CZ\"\n                id=\"CZ\"\n              />\n              <label class=\"custom-control-label\" for=\"CZ\">Warganegara</label>\n            </div>\n            <div class=\"custom-control custom-radio custom-control-inline\">\n              <input\n                type=\"radio\"\n                name=\"ticket_type\"\n                class=\"custom-control-input\"\n                value=\"NC\"\n                id=\"NC\"\n              />\n              <label class=\"custom-control-label\" for=\"NC\"\n                >Bukan Warganegara</label\n              >\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Jenis Tiket</label>\n            <select\n              class=\"form-control\"\n              formControlName=\"ticket_category\"\n              placeholder=\"Sila pilih\"\n            >\n              <option value=\"\">Sila pilih</option>\n              <option\n                *ngFor=\"let ticketcategory of ticketcategories\"\n                [value]=\"ticketcategory.value\"\n              >\n                {{ ticketcategory.display_name }}\n              </option>\n            </select>\n          </div>\n        </div>\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Jumlah Tiket</label>\n            <input\n              class=\"form-control\"\n              formControlName=\"ticket_quantity\"\n              placeholder=\"contoh: 3\"\n              type=\"number\"\n              readonly=\"true\"\n            />\n          </div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Harga</label>\n            <input\n              class=\"form-control\"\n              formControlName=\"price\"\n              placeholder=\"contoh: 3\"\n              type=\"number\"\n            />\n          </div>\n        </div>\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Jumlah Harga</label>\n            <input\n              class=\"form-control\"\n              formControlName=\"total_price\"\n              placeholder=\"contoh: 3\"\n              type=\"number\"\n            />\n          </div>\n        </div>\n      </div>\n    </form>\n  </div>\n\n  <div class=\"modal-footer\">\n    <button class=\"btn btn-success\" type=\"button\" (click)=\"closeModal()\">\n      Simpan\n    </button>\n\n    <button\n      class=\"btn btn-outline-danger ml-auto\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      Batal\n    </button>\n  </div>\n</ng-template>\n\n<ng-template #editSimulatorRide>\n  <div class=\"modal-header bg-default\">\n    <h6 class=\"modal-title text-white my-auto\" id=\"modal-title-default\">\n      Ubah Suai\n    </h6>\n\n    <button\n      aria-label=\"Close\"\n      class=\"close\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      <span aria-hidden=\"true\" class=\"text-white my-auto\"> × </span>\n    </button>\n  </div>\n\n  <div class=\"modal-body\">\n    <form [formGroup]=\"simridebookingFormGroup\">\n      <div class=\"row\">\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Masa</label>\n            <select\n              class=\"form-control\"\n              formControlName=\"simulator_ride_time_id\"\n              placeholder=\"Sila pilih\"\n              readonly=\"true\"\n            >\n              <option value=\"\">Sila pilih</option>\n              <option *ngFor=\"let time of times\" [value]=\"time.id\">\n                {{ time.day }}, {{ time.time }} {{ time.round }}\n              </option>\n            </select>\n          </div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Tarikh</label>\n            <input\n              class=\"form-control\"\n              formControlName=\"booking_date\"\n              placeholder=\"Sila pilih\"\n              type=\"date\"\n            />\n          </div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Warganegara</label><br />\n            <div class=\"custom-control custom-radio custom-control-inline\">\n              <input\n                type=\"radio\"\n                name=\"ticket_type\"\n                class=\"custom-control-input\"\n                value=\"CZ\"\n                id=\"CZ\"\n              />\n              <label class=\"custom-control-label\" for=\"CZ\">Warganegara</label>\n            </div>\n            <div class=\"custom-control custom-radio custom-control-inline\">\n              <input\n                type=\"radio\"\n                name=\"ticket_type\"\n                class=\"custom-control-input\"\n                value=\"NC\"\n                id=\"NC\"\n              />\n              <label class=\"custom-control-label\" for=\"NC\"\n                >Bukan Warganegara</label\n              >\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Jenis Tiket</label>\n            <select\n              class=\"form-control\"\n              formControlName=\"ticket_category\"\n              placeholder=\"Sila pilih\"\n            >\n              <option value=\"\">Sila pilih</option>\n              <option\n                *ngFor=\"let ticketcategory of ticketcategories\"\n                [value]=\"ticketcategory.value\"\n              >\n                {{ ticketcategory.display_name }}\n              </option>\n            </select>\n          </div>\n        </div>\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Jumlah Tiket</label>\n            <input\n              class=\"form-control\"\n              formControlName=\"ticket_quantity\"\n              placeholder=\"contoh: 3\"\n              type=\"number\"\n              readonly=\"true\"\n            />\n          </div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Harga</label>\n            <input\n              class=\"form-control\"\n              formControlName=\"price\"\n              placeholder=\"contoh: 3\"\n              type=\"number\"\n            />\n          </div>\n        </div>\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Jumlah Harga</label>\n            <input\n              class=\"form-control\"\n              formControlName=\"total_price\"\n              placeholder=\"contoh: 3\"\n              type=\"number\"\n            />\n          </div>\n        </div>\n      </div>\n    </form>\n  </div>\n\n  <div class=\"modal-footer\">\n    <button class=\"btn btn-success\" type=\"button\" (click)=\"closeModal()\">\n      Simpan\n    </button>\n\n    <button\n      class=\"btn btn-outline-danger ml-auto\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      Batal\n    </button>\n  </div>\n</ng-template>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/simulator-ride/simulator-ride-schedule/simulator-ride-schedule.component.html":
/*!***********************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/simulator-ride/simulator-ride-schedule/simulator-ride-schedule.component.html ***!
  \***********************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header pb-6\">\n  <div class=\"container-fluid\">\n    <div class=\"header-body\">\n      <div class=\"row align-items-center py-4\">\n        <div class=\"col-lg-6 col-7\">\n          <h6 class=\"h2 text-dark d-inline-block mb-0\">Senarai Jadual</h6>\n\n          <nav aria-label=\"breadcrumb\" class=\"d-none d-md-inline-block ml-md-4\">\n            <ol class=\"breadcrumb breadcrumb-links breadcrumb-dark\">\n              <li class=\"breadcrumb-item\">\n                <a href=\"javascript:void(0)\">\n                  <i class=\"fas fa-file-invoice text-dark\"></i>\n                </a>\n              </li>\n            </ol>\n          </nav>\n        </div>\n\n        <div class=\"col-lg-6 col-5 text-right\">\n          <a\n            class=\"btn btn-sm btn-neutral\"\n            (click)=\"openModal(createSimulatorRide, 'create', '')\"\n          >\n            Tambah\n          </a>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"container-fluid mt--6\">\n  <!-- <div class=\"row\">\n    <div class=\"col\">\n      <div class=\"card\">\n        <div class=\"card-header bg-secondary\">\n          <h3 class=\"m-0\">\n            Senarai Jadual (HARI: SABTU - KHAMIS / DAY: SATURDAY - THURSDAY)\n          </h3>\n        </div>\n        <div class=\"table-responsive\">\n          <table class=\"table table-bordered table-striped table-flush\">\n            <thead>\n              <tr>\n                <td>MASA / TIME</td>\n                <td>Pusingan 1 / Ride 1</td>\n                <td>Pusingan 2 / Ride 2</td>\n                <td>Pusingan 3 / Ride 3</td>\n                <td>Pusingan 4 / Ride 4</td>\n                <td>Pusingan 5 / Ride 5</td>\n              </tr>\n            </thead>\n\n            <tbody>\n              <tr></tr>\n            </tbody>\n          </table>\n        </div>\n        <div class=\"dataTables_wrapper py-4\">\n          <div class=\"row\">\n            <div class=\"col-sm-12 col-md-6\">\n              <div class=\"dataTables_length\" id=\"datatable_length\">\n                <label>\n                  Tunjuk\n                  <select\n                    name=\"datatable_length\"\n                    aria-controls=\"datatable\"\n                    class=\"form-control form-control-sm\"\n                    (change)=\"entriesChange($event)\"\n                  >\n                    <option value=\"10\" [selected]=\"tableEntries == 5\">5</option>\n                    <option value=\"25\" [selected]=\"tableEntries == 10\">\n                      10\n                    </option>\n                    <option value=\"50\" [selected]=\"tableEntries == 15\">\n                      15\n                    </option>\n                    <option value=\"-1\" [selected]=\"tableEntries == -1\">\n                      All\n                    </option>\n                  </select>\n                  rekod\n                </label>\n              </div>\n            </div>\n            <div class=\"col-sm-12 col-md-6\">\n              <div id=\"datatable_filter\" class=\"dataTables_filter\">\n                <label>\n                  <input\n                    type=\"search\"\n                    class=\"form-control form-control-sm\"\n                    placeholder=\"Cari rekod\"\n                    aria-controls=\"datatable\"\n                    (keyup)=\"filterTable($event)\"\n                  />\n                </label>\n              </div>\n            </div>\n          </div>\n\n          <ngx-datatable\n            class=\"bootstrap selection-cell\"\n            [columnMode]=\"'force'\"\n            [headerHeight]=\"50\"\n            [footerHeight]=\"50\"\n            [rowHeight]=\"'auto'\"\n            [limit]=\"tableEntries != -1 ? tableEntries : undefined\"\n            [rows]=\"tableTemp\"\n            (activate)=\"onActivate($event)\"\n          >\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Hari</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.day }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Masa</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.time }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Pusingan 1</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.start_time_1 }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Pusingan 2</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.start_time_2 }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Pusingan 3</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.start_time_3 }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Pusingan 4</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.start_time_4 }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Pusingan 5</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.start_time_5 }}\n              </ng-template>\n            </ngx-datatable-column>\n          </ngx-datatable>\n        </div>\n      </div>\n    </div>\n  </div> -->\n\n  <div class=\"row\">\n    <div class=\"col\">\n      <div class=\"card\">\n        <div class=\"card-header bg-secondary\">\n          <h3 class=\"m-0\">Senarai</h3>\n        </div>\n        <div class=\"dataTables_wrapper py-4\">\n          <div class=\"row\">\n            <div class=\"col-sm-12 col-md-6\">\n              <div class=\"dataTables_length\" id=\"datatable_length\">\n                <label>\n                  Papar\n                  <select\n                    name=\"datatable_length\"\n                    aria-controls=\"datatable\"\n                    class=\"form-control form-control-sm\"\n                    (change)=\"entriesChange($event)\"\n                  >\n                    <option value=\"10\" [selected]=\"entries == 5\">5</option>\n                    <option value=\"25\" [selected]=\"entries == 10\">10</option>\n                    <option value=\"50\" [selected]=\"entries == 15\">15</option>\n                    <option value=\"-1\" [selected]=\"entries == -1\">Semua</option>\n                  </select>\n                  rekod\n                </label>\n              </div>\n            </div>\n            <div class=\"col-sm-12 col-md-6\">\n              <div id=\"datatable_filter\" class=\"dataTables_filter\">\n                <label>\n                  <input\n                    type=\"search\"\n                    class=\"form-control form-control-sm\"\n                    placeholder=\"Cari rekod\"\n                    aria-controls=\"datatable\"\n                    (keyup)=\"filterTable($event)\"\n                  />\n                </label>\n              </div>\n            </div>\n          </div>\n\n          <ngx-datatable\n            class=\"bootstrap selection-cell\"\n            [columnMode]=\"'force'\"\n            [headerHeight]=\"50\"\n            [footerHeight]=\"50\"\n            [rowHeight]=\"'auto'\"\n            [limit]=\"entries != -1 ? entries : undefined\"\n            [rows]=\"temp\"\n            (activate)=\"onActivate($event)\"\n          >\n            <ngx-datatable-column [width]=\"10\">\n              <ng-template ngx-datatable-header-template>\n                <span>No</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.no + 1 }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Hari</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ getDay(row.day) }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Masa</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.time }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Pusingan</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ getRound(row.round) }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Tindakan</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                <button\n                  class=\"btn btn-sm btn-default\"\n                  [routerLink]=\"['/simulator-ride/schedule/' + row.id]\"\n                >\n                  Tempahan\n                </button>\n                <button\n                  class=\"btn btn-sm btn-primary\"\n                  (click)=\"openModal(editSimulatorRide, 'update', row)\"\n                >\n                  Sunting\n                </button>\n              </ng-template>\n            </ngx-datatable-column>\n          </ngx-datatable>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<ng-template #createSimulatorRide>\n  <div class=\"modal-header bg-default\">\n    <h6 class=\"modal-title text-white my-auto\" id=\"modal-title-default\">\n      Tambah\n    </h6>\n\n    <button\n      aria-label=\"Close\"\n      class=\"close\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      <span aria-hidden=\"true\" class=\"text-white my-auto\"> × </span>\n    </button>\n  </div>\n\n  <div class=\"modal-body\">\n    <form [formGroup]=\"simridetimeFormGroup\">\n      <div class=\"row\">\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Masa</label>\n            <input\n              class=\"form-control\"\n              formControlName=\"time\"\n              placeholder=\"Sila pilih\"\n              type=\"time\"\n            />\n          </div>\n        </div>\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Hari</label>\n            <select\n              class=\"form-control\"\n              formControlName=\"day\"\n              placeholder=\"Sila pilih\"\n            >\n              <option value=\"\">Sila pilih</option>\n              <option *ngFor=\"let day of days\" [value]=\"day.value\">\n                {{ day.display_name }}\n              </option>\n            </select>\n          </div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Pusingan</label>\n            <select\n              class=\"form-control\"\n              formControlName=\"round\"\n              placeholder=\"Sila pilih\"\n            >\n              <option value=\"\">Sila pilih</option>\n              <option *ngFor=\"let round of rounds\" [value]=\"round.value\">\n                {{ round.display_name }}\n              </option>\n            </select>\n          </div>\n        </div>\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Tempat</label>\n            <select\n              class=\"form-control\"\n              formControlName=\"venue_id\"\n              placeholder=\"Sila pilih\"\n            >\n              <option value=\"\">Sila pilih</option>\n              <option *ngFor=\"let venue of venues\" [value]=\"venue.id\">\n                {{ venue.name }}\n              </option>\n            </select>\n          </div>\n        </div>\n      </div>\n    </form>\n  </div>\n\n  <div class=\"modal-footer\">\n    <button class=\"btn btn-success\" type=\"button\" (click)=\"create()\">\n      Simpan\n    </button>\n\n    <button\n      class=\"btn btn-outline-danger ml-auto\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      Batal\n    </button>\n  </div>\n</ng-template>\n\n<ng-template #editSimulatorRide>\n  <div class=\"modal-header bg-default\">\n    <h6 class=\"modal-title text-white my-auto\" id=\"modal-title-default\">\n      Ubah Suai\n    </h6>\n\n    <button\n      aria-label=\"Close\"\n      class=\"close\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      <span aria-hidden=\"true\" class=\"text-white my-auto\"> × </span>\n    </button>\n  </div>\n\n  <div class=\"modal-body\">\n    <form [formGroup]=\"simridetimeFormGroup\">\n      <div class=\"row\">\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Masa</label>\n            <input\n              class=\"form-control\"\n              formControlName=\"time\"\n              placeholder=\"Sila pilih\"\n              type=\"time\"\n            />\n          </div>\n        </div>\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Hari</label>\n            <select\n              class=\"form-control\"\n              formControlName=\"day\"\n              placeholder=\"Sila pilih\"\n            >\n              <option value=\"\">Sila pilih</option>\n              <option *ngFor=\"let day of days\" [value]=\"day.value\">\n                {{ day.display_name }}\n              </option>\n            </select>\n          </div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Pusingan</label>\n            <select\n              class=\"form-control\"\n              formControlName=\"round\"\n              placeholder=\"Sila pilih\"\n            >\n              <option value=\"\">Sila pilih</option>\n              <option *ngFor=\"let round of rounds\" [value]=\"round.value\">\n                {{ round.display_name }}\n              </option>\n            </select>\n          </div>\n        </div>\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Tempat</label>\n            <select\n              class=\"form-control\"\n              formControlName=\"venue_id\"\n              placeholder=\"Sila pilih\"\n            >\n              <option value=\"\">Sila pilih</option>\n              <option *ngFor=\"let venue of venues\" [value]=\"venue.id\">\n                {{ venue.name }}\n              </option>\n            </select>\n          </div>\n        </div>\n      </div>\n    </form>\n  </div>\n\n  <div class=\"modal-footer\">\n    <button class=\"btn btn-success\" type=\"button\" (click)=\"update()\">\n      Simpan\n    </button>\n\n    <button\n      class=\"btn btn-outline-danger ml-auto\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      Batal\n    </button>\n  </div>\n</ng-template>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/surveys/surveys-answer/surveys-answer.component.html":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/surveys/surveys-answer/surveys-answer.component.html ***!
  \**********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header pb-6\">\n  <div class=\"container-fluid\">\n    <div class=\"header-body\">\n      <div class=\"row align-items-center py-4\">\n        <div class=\"col-lg-6 col-7\">\n          <h6 class=\"h2 text-dark d-inline-block mb-0\">Senarai Jawapan</h6>\n\n          <nav aria-label=\"breadcrumb\" class=\"d-none d-md-inline-block ml-md-4\">\n            <ol class=\"breadcrumb breadcrumb-links breadcrumb-dark\">\n              <li class=\"breadcrumb-item\">\n                <a href=\"javascript:void(0)\">\n                  <i class=\"fas fa-file-invoice text-dark\"></i>\n                </a>\n              </li>\n            </ol>\n          </nav>\n        </div>\n\n        <div class=\"col-lg-6 col-5 text-right\">\n          <a\n            class=\"btn btn-sm btn-neutral\"\n            (click)=\"openModal(createAnswer, 'create', '')\"\n          >\n            Tambah\n          </a>\n          <a class=\"btn btn-sm btn-default\" [routerLink]=\"['/surveys/list']\">\n            Kembali\n          </a>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"container-fluid mt--6\">\n  <div class=\"row\">\n    <div class=\"col\">\n      <div class=\"card\">\n        <div class=\"card-header bg-secondary\">\n          <h3 class=\"m-0\">Senarai Jawapan</h3>\n        </div>\n        <div class=\"dataTables_wrapper py-4\">\n          <div class=\"row\">\n            <div class=\"col-sm-12 col-md-6\">\n              <div class=\"dataTables_length\" id=\"datatable_length\">\n                <label>\n                  Papar\n                  <select\n                    name=\"datatable_length\"\n                    aria-controls=\"datatable\"\n                    class=\"form-control form-control-sm\"\n                    (change)=\"entriesChange($event)\"\n                  >\n                    <option value=\"10\" [selected]=\"tableEntries == 5\">5</option>\n                    <option value=\"25\" [selected]=\"tableEntries == 10\">\n                      10\n                    </option>\n                    <option value=\"50\" [selected]=\"tableEntries == 15\">\n                      15\n                    </option>\n                    <option value=\"-1\" [selected]=\"tableEntries == -1\">\n                      Semua\n                    </option>\n                  </select>\n                  rekod\n                </label>\n              </div>\n            </div>\n            <div class=\"col-sm-12 col-md-6\">\n              <div id=\"datatable_filter\" class=\"dataTables_filter\">\n                <label>\n                  <input\n                    type=\"search\"\n                    class=\"form-control form-control-sm\"\n                    placeholder=\"Cari rekod\"\n                    aria-controls=\"datatable\"\n                    (keyup)=\"filterTable($event)\"\n                  />\n                </label>\n              </div>\n            </div>\n          </div>\n\n          <ngx-datatable\n            class=\"bootstrap selection-cell\"\n            [columnMode]=\"'force'\"\n            [headerHeight]=\"50\"\n            [footerHeight]=\"50\"\n            [rowHeight]=\"'auto'\"\n            [limit]=\"tableEntries != -1 ? tableEntries : undefined\"\n            [rows]=\"tableTemp\"\n            (activate)=\"onActivate($event)\"\n          >\n            <ngx-datatable-column [width]=\"10\">\n              <ng-template ngx-datatable-header-template>\n                <span>No</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.no + 1 }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Soalan</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ surveyquestion.questionnaire_question }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Jawapan</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.answer }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Dijawab oleh</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ getUserOne(row.user_id) }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Tarikh Dijawab</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.created_date | date: \"mediumDate\" }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <!-- <ngx-datatable-column>\n                      <ng-template ngx-datatable-header-template>\n                        <span>Status</span>\n                      </ng-template>\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                        <span\n                          *ngIf=\"row.status == 'AV'\"\n                          class=\"badge badge-pill badge-success\"\n                          >Aktif</span\n                        >\n                        <span\n                          *ngIf=\"row.status == 'NA'\"\n                          class=\"badge badge-pill badge-danger\"\n                          >Tidak aktif</span\n                        >\n                      </ng-template>\n                    </ngx-datatable-column> -->\n\n            <!-- <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Tindakan</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                <button\n                  class=\"btn btn-sm btn-default\"\n                  [routerLink]=\"['/surveys/list/' + row.id]\"\n                >\n                  Jawapan\n                </button>\n                <button\n                  class=\"btn btn-sm btn-primary\"\n                  (click)=\"openModal(editAnswer, 'update', row)\"\n                >\n                  Sunting\n                </button>\n              </ng-template>\n            </ngx-datatable-column> -->\n          </ngx-datatable>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<ng-template #createAnswer>\n  <div class=\"modal-header bg-default\">\n    <h6 class=\"modal-title text-white my-auto\" id=\"modal-title-default\">\n      Tambah\n    </h6>\n\n    <button\n      aria-label=\"Close\"\n      class=\"close\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      <span aria-hidden=\"true\" class=\"text-white my-auto\"> × </span>\n    </button>\n  </div>\n\n  <div class=\"modal-body\">\n    <form [formGroup]=\"surveyanswerFormGroup\"></form>\n  </div>\n\n  <div class=\"modal-footer\">\n    <button class=\"btn btn-success\" type=\"button\" (click)=\"create()\">\n      Simpan\n    </button>\n\n    <button\n      class=\"btn btn-outline-danger ml-auto\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      Batal\n    </button>\n  </div>\n</ng-template>\n\n<ng-template #editAnswer>\n  <div class=\"modal-header bg-default\">\n    <h6 class=\"modal-title text-white my-auto\" id=\"modal-title-default\">\n      Ubah Suai\n    </h6>\n\n    <button\n      aria-label=\"Close\"\n      class=\"close\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      <span aria-hidden=\"true\" class=\"text-white my-auto\"> × </span>\n    </button>\n  </div>\n\n  <div class=\"modal-body\">\n    <form [formGroup]=\"surveyanswerFormGroup\"></form>\n  </div>\n\n  <div class=\"modal-footer\">\n    <button class=\"btn btn-success\" type=\"button\" (click)=\"update()\">\n      Simpan\n    </button>\n\n    <button\n      class=\"btn btn-outline-danger ml-auto\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      Batal\n    </button>\n  </div>\n</ng-template>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/surveys/surveys-list/surveys-list.component.html":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/surveys/surveys-list/surveys-list.component.html ***!
  \******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header pb-6\">\n  <div class=\"container-fluid\">\n    <div class=\"header-body\">\n      <div class=\"row align-items-center py-4\">\n        <div class=\"col-lg-6 col-7\">\n          <h6 class=\"h2 text-dark d-inline-block mb-0\">Senarai Soal Selidik</h6>\n\n          <nav aria-label=\"breadcrumb\" class=\"d-none d-md-inline-block ml-md-4\">\n            <ol class=\"breadcrumb breadcrumb-links breadcrumb-dark\">\n              <li class=\"breadcrumb-item\">\n                <a href=\"javascript:void(0)\">\n                  <i class=\"fas fa-file-invoice text-dark\"></i>\n                </a>\n              </li>\n            </ol>\n          </nav>\n        </div>\n\n        <div class=\"col-lg-6 col-5 text-right\">\n          <a\n            class=\"btn btn-sm btn-neutral\"\n            (click)=\"openModal(createSurvey, 'create', '')\"\n          >\n            Tambah\n          </a>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"container-fluid mt--6\">\n  <div class=\"row\">\n    <div class=\"col\">\n      <div class=\"card\">\n        <div class=\"card-header bg-secondary\">\n          <h3 class=\"m-0\">Senarai Soal Selidik</h3>\n        </div>\n        <div class=\"dataTables_wrapper py-4\">\n          <div class=\"row\">\n            <div class=\"col-sm-12 col-md-6\">\n              <div class=\"dataTables_length\" id=\"datatable_length\">\n                <label>\n                  Papar\n                  <select\n                    name=\"datatable_length\"\n                    aria-controls=\"datatable\"\n                    class=\"form-control form-control-sm\"\n                    (change)=\"entriesChange($event)\"\n                  >\n                    <option value=\"10\" [selected]=\"tableEntries == 5\">5</option>\n                    <option value=\"25\" [selected]=\"tableEntries == 10\">\n                      10\n                    </option>\n                    <option value=\"50\" [selected]=\"tableEntries == 15\">\n                      15\n                    </option>\n                    <option value=\"-1\" [selected]=\"tableEntries == -1\">\n                      Semua\n                    </option>\n                  </select>\n                  rekod\n                </label>\n              </div>\n            </div>\n            <div class=\"col-sm-12 col-md-6\">\n              <div id=\"datatable_filter\" class=\"dataTables_filter\">\n                <label>\n                  <input\n                    type=\"search\"\n                    class=\"form-control form-control-sm\"\n                    placeholder=\"Cari rekod\"\n                    aria-controls=\"datatable\"\n                    (keyup)=\"filterTable($event)\"\n                  />\n                </label>\n              </div>\n            </div>\n          </div>\n\n          <ngx-datatable\n            class=\"bootstrap selection-cell\"\n            [columnMode]=\"'force'\"\n            [headerHeight]=\"50\"\n            [footerHeight]=\"50\"\n            [rowHeight]=\"'auto'\"\n            [limit]=\"tableEntries != -1 ? tableEntries : undefined\"\n            [rows]=\"tableTemp\"\n            (activate)=\"onActivate($event)\"\n          >\n            <ngx-datatable-column [width]=\"10\">\n              <ng-template ngx-datatable-header-template>\n                <span>No</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.no + 1 }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Soalan</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.questionnaire_question }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Jenis</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ getType(row.questionnaire_type) }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Pilihan Jawapan</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.questionnaire_answer }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Modul</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ getModule(row.questionnaire_module) }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <!-- <ngx-datatable-column>\n                    <ng-template ngx-datatable-header-template>\n                      <span>Status</span>\n                    </ng-template>\n                    <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                      <span\n                        *ngIf=\"row.status == 'AV'\"\n                        class=\"badge badge-pill badge-success\"\n                        >Aktif</span\n                      >\n                      <span\n                        *ngIf=\"row.status == 'NA'\"\n                        class=\"badge badge-pill badge-danger\"\n                        >Tidak aktif</span\n                      >\n                    </ng-template>\n                  </ngx-datatable-column> -->\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Tindakan</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                <button\n                  class=\"btn btn-sm btn-default\"\n                  [routerLink]=\"['/surveys/list/' + row.id]\"\n                >\n                  Jawapan\n                </button>\n                <button\n                  class=\"btn btn-sm btn-primary\"\n                  (click)=\"openModal(editSurvey, 'update', row)\"\n                >\n                  Sunting\n                </button>\n              </ng-template>\n            </ngx-datatable-column>\n          </ngx-datatable>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<ng-template #createSurvey>\n  <div class=\"modal-header bg-default\">\n    <h6 class=\"modal-title text-white my-auto\" id=\"modal-title-default\">\n      Tambah\n    </h6>\n\n    <button\n      aria-label=\"Close\"\n      class=\"close\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      <span aria-hidden=\"true\" class=\"text-white my-auto\"> × </span>\n    </button>\n  </div>\n\n  <div class=\"modal-body\">\n    <form [formGroup]=\"surveyquestionFormGroup\">\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Soalan</label>\n        <input\n          type=\"text\"\n          class=\"form-control\"\n          formControlName=\"questionnaire_question\"\n          placeholder=\"Soalan\"\n        />\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Jawapan</label>\n        <input\n          type=\"text\"\n          class=\"form-control\"\n          formControlName=\"questionnaire_answer\"\n          placeholder=\"Jawapan\"\n        />\n        <small style=\"color: red\"\n          >Setiap jawapan yang baru perlu diakhiri dengan koma (contoh:\n          A,B,C)</small\n        >\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Jenis</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"questionnaire_type\"\n          placeholder=\"Sila pilih\"\n        >\n          <option value=\"\">Sila pilih</option>\n          <option\n            *ngFor=\"let questionnairetype of questionnairetypes\"\n            [value]=\"questionnairetype.value\"\n          >\n            {{ questionnairetype.display_name }}\n          </option>\n        </select>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Modul</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"questionnaire_module\"\n          placeholder=\"Sila pilih\"\n        >\n          <option value=\"\">Sila pilih</option>\n          <option\n            *ngFor=\"let questionnairemodule of questionnairemodules\"\n            [value]=\"questionnairemodule.value\"\n          >\n            {{ questionnairemodule.display_name }}\n          </option>\n        </select>\n      </div>\n      <!-- <div class=\"form-group\">\n              <label class=\"form-control-label\">Status</label>\n              <select\n                class=\"form-control\"\n                formControlName=\"status\"\n                placeholder=\"Sila pilih\"\n              >\n                <option value=\"AV\">Aktif</option>\n                <option value=\"NA\">Tidak aktif</option>\n              </select>\n            </div> -->\n    </form>\n  </div>\n\n  <div class=\"modal-footer\">\n    <button class=\"btn btn-success\" type=\"button\" (click)=\"create()\">\n      Simpan\n    </button>\n\n    <button\n      class=\"btn btn-outline-danger ml-auto\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      Batal\n    </button>\n  </div>\n</ng-template>\n\n<ng-template #editSurvey>\n  <div class=\"modal-header bg-default\">\n    <h6 class=\"modal-title text-white my-auto\" id=\"modal-title-default\">\n      Ubah Suai\n    </h6>\n\n    <button\n      aria-label=\"Close\"\n      class=\"close\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      <span aria-hidden=\"true\" class=\"text-white my-auto\"> × </span>\n    </button>\n  </div>\n\n  <div class=\"modal-body\">\n    <form [formGroup]=\"surveyquestionFormGroup\">\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Soalan</label>\n        <input\n          type=\"text\"\n          class=\"form-control\"\n          formControlName=\"questionnaire_question\"\n          placeholder=\"Soalan\"\n        />\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Jawapan</label>\n        <input\n          type=\"text\"\n          class=\"form-control\"\n          formControlName=\"questionnaire_answer\"\n          placeholder=\"Jawapan\"\n        />\n        <small style=\"color: red\"\n          >Setiap jawapan yang baru perlu diakhiri dengan koma (contoh:\n          A,B,C)</small\n        >\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Jenis</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"questionnaire_type\"\n          placeholder=\"Sila pilih\"\n        >\n          <option value=\"\">Sila pilih</option>\n          <option\n            *ngFor=\"let questionnairetype of questionnairetypes\"\n            [value]=\"questionnairetype.value\"\n          >\n            {{ questionnairetype.display_name }}\n          </option>\n        </select>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Modul</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"questionnaire_module\"\n          placeholder=\"Sila pilih\"\n        >\n          <option value=\"\">Sila pilih</option>\n          <option\n            *ngFor=\"let questionnairemodule of questionnairemodules\"\n            [value]=\"questionnairemodule.value\"\n          >\n            {{ questionnairemodule.display_name }}\n          </option>\n        </select>\n      </div>\n      <!-- <div class=\"form-group\">\n                <label class=\"form-control-label\">Status</label>\n                <select\n                  class=\"form-control\"\n                  formControlName=\"status\"\n                  placeholder=\"Sila pilih\"\n                >\n                  <option value=\"AV\">Aktif</option>\n                  <option value=\"NA\">Tidak aktif</option>\n                </select>\n              </div> -->\n    </form>\n  </div>\n\n  <div class=\"modal-footer\">\n    <button class=\"btn btn-success\" type=\"button\" (click)=\"update()\">\n      Simpan\n    </button>\n\n    <button\n      class=\"btn btn-outline-danger ml-auto\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      Batal\n    </button>\n  </div>\n</ng-template>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/tickets/tickets-price/tickets-price.component.html":
/*!********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/tickets/tickets-price/tickets-price.component.html ***!
  \********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header pb-6\">\n    <div class=\"container-fluid\">\n        <div class=\"header-body\">\n            <div class=\"row align-items-center py-4\">\n                <div class=\"col-lg-6 col-7\">\n                    <h6 class=\"h2 text-dark d-inline-block mb-0\"></h6>\n\n                    <nav aria-label=\"breadcrumb\" class=\" d-none d-md-inline-block ml-md-4\">\n                        <ol class=\"breadcrumb breadcrumb-links breadcrumb-dark\">\n                            <li class=\"breadcrumb-item\">\n                                <a href=\"javascript:void(0)\">\n                                    <i class=\"fas fa-align-left text-dark\"></i>\n                                </a>\n                            </li>\n                            <!-- <li class=\"breadcrumb-item\">\n                                <a href=\"javascript:void(0)\" class=\"text-dark\"> Finance </a>\n                            </li>\n                            <li aria-current=\"page\" class=\"breadcrumb-item active\">\n                                Fees Management\n                            </li> -->\n                        </ol>\n                    </nav>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div class=\"container-fluid mt--6\">\n    <div class=\"row\">\n        <div class=\"col\">\n            <div class=\"card\">\n                <div class=\"card-header bg-secondary\">\n                    <h3 clas=\"m-0\"></h3>\n                </div>\n                <div class=\"card-body\">\n                    <img src=\"assets/img/default/under-construction.png\" style=\"max-width: 30rem\" class=\"text-center mx-auto d-flex\">\n                    <p class=\"text-center\">Page under construction</p>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/virtual-libraries/virtual-libraries-list/virtual-libraries-list.component.html":
/*!************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/virtual-libraries/virtual-libraries-list/virtual-libraries-list.component.html ***!
  \************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header pb-6\">\n  <div class=\"container-fluid\">\n    <div class=\"header-body\">\n      <div class=\"row align-items-center py-4\">\n        <div class=\"col-lg-6 col-7\">\n          <h6 class=\"h2 text-dark d-inline-block mb-0\">\n            Senarai Perpustakaan Maya\n          </h6>\n\n          <nav aria-label=\"breadcrumb\" class=\"d-none d-md-inline-block ml-md-4\">\n            <ol class=\"breadcrumb breadcrumb-links breadcrumb-dark\">\n              <li class=\"breadcrumb-item\">\n                <a href=\"javascript:void(0)\">\n                  <i class=\"fas fa-file-invoice text-dark\"></i>\n                </a>\n              </li>\n            </ol>\n          </nav>\n        </div>\n\n        <div class=\"col-lg-6 col-5 text-right\">\n          <a\n            class=\"btn btn-sm btn-neutral\"\n            (click)=\"openModal(createVirtuallibrary, 'create', '')\"\n          >\n            Tambah\n          </a>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"container-fluid mt--6\">\n  <div class=\"row\">\n    <div class=\"col\">\n      <div class=\"card\">\n        <div class=\"card-header bg-secondary\">\n          <h3 class=\"m-0\">Senarai Perpustakaan Maya</h3>\n        </div>\n        <div class=\"dataTables_wrapper py-4\">\n          <div class=\"row\">\n            <div class=\"col-sm-12 col-md-6\">\n              <div class=\"dataTables_length\" id=\"datatable_length\">\n                <label>\n                  Papar\n                  <select\n                    name=\"datatable_length\"\n                    aria-controls=\"datatable\"\n                    class=\"form-control form-control-sm\"\n                    (change)=\"entriesChange($event)\"\n                  >\n                    <option value=\"10\" [selected]=\"tableEntries == 5\">5</option>\n                    <option value=\"25\" [selected]=\"tableEntries == 10\">\n                      10\n                    </option>\n                    <option value=\"50\" [selected]=\"tableEntries == 15\">\n                      15\n                    </option>\n                    <option value=\"-1\" [selected]=\"tableEntries == -1\">\n                      Semua\n                    </option>\n                  </select>\n                  rekod\n                </label>\n              </div>\n            </div>\n            <div class=\"col-sm-12 col-md-6\">\n              <div id=\"datatable_filter\" class=\"dataTables_filter\">\n                <label>\n                  <input\n                    type=\"search\"\n                    class=\"form-control form-control-sm\"\n                    placeholder=\"Cari rekod\"\n                    aria-controls=\"datatable\"\n                    (keyup)=\"filterTable($event)\"\n                  />\n                </label>\n              </div>\n            </div>\n          </div>\n\n          <ngx-datatable\n            class=\"bootstrap selection-cell\"\n            [columnMode]=\"'force'\"\n            [headerHeight]=\"50\"\n            [footerHeight]=\"50\"\n            [rowHeight]=\"'auto'\"\n            [limit]=\"tableEntries != -1 ? tableEntries : undefined\"\n            [rows]=\"tableTemp\"\n            (activate)=\"onActivate($event)\"\n          >\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Tajuk</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.title }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Abstrak</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.abstract }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Tahun</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.year }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <!-- <ngx-datatable-column>\n                <ng-template ngx-datatable-header-template>\n                  <span>Status</span>\n                </ng-template>\n                <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                  <span\n                    *ngIf=\"row.status == 'AV'\"\n                    class=\"badge badge-pill badge-success\"\n                    >Aktif</span\n                  >\n                  <span\n                    *ngIf=\"row.status == 'NA'\"\n                    class=\"badge badge-pill badge-danger\"\n                    >Tidak aktif</span\n                  >\n                </ng-template>\n              </ngx-datatable-column> -->\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Tindakan</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                <button\n                  class=\"btn btn-sm btn-primary\"\n                  (click)=\"openModal(editVirtuallibrary, 'update', row)\"\n                >\n                  Sunting\n                </button>\n              </ng-template>\n            </ngx-datatable-column>\n          </ngx-datatable>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<ng-template #createVirtuallibrary>\n  <div class=\"modal-header bg-default\">\n    <h6 class=\"modal-title text-white my-auto\" id=\"modal-title-default\">\n      Tambah\n    </h6>\n\n    <button\n      aria-label=\"Close\"\n      class=\"close\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      <span aria-hidden=\"true\" class=\"text-white my-auto\"> × </span>\n    </button>\n  </div>\n\n  <div class=\"modal-body\">\n    <form [formGroup]=\"virtuallibraryFormGroup\">\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Tajuk</label>\n        <input\n          class=\"form-control\"\n          formControlName=\"title\"\n          placeholder=\"Tajuk\"\n          type=\"text\"\n        />\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Abstrak</label>\n        <textarea\n          class=\"form-control\"\n          formControlName=\"abstract\"\n          placeholder=\"Abstrak\"\n        ></textarea>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Tahun</label>\n        <input\n          class=\"form-control\"\n          formControlName=\"year\"\n          placeholder=\"Sila pilih\"\n          type=\"number\"\n        />\n      </div>\n      <!-- <div class=\"form-group\">\n          <label class=\"form-control-label\">Status</label>\n          <select\n            class=\"form-control\"\n            formControlName=\"status\"\n            placeholder=\"Sila pilih\"\n          >\n            <option value=\"AV\">Aktif</option>\n            <option value=\"NA\">Tidak aktif</option>\n          </select>\n        </div> -->\n    </form>\n  </div>\n\n  <div class=\"modal-footer\">\n    <button class=\"btn btn-success\" type=\"button\" (click)=\"create()\">\n      Simpan\n    </button>\n\n    <button\n      class=\"btn btn-outline-danger ml-auto\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      Batal\n    </button>\n  </div>\n</ng-template>\n\n<ng-template #editVirtuallibrary>\n  <div class=\"modal-header bg-default\">\n    <h6 class=\"modal-title text-white my-auto\" id=\"modal-title-default\">\n      Ubah Suai\n    </h6>\n\n    <button\n      aria-label=\"Close\"\n      class=\"close\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      <span aria-hidden=\"true\" class=\"text-white my-auto\"> × </span>\n    </button>\n  </div>\n\n  <div class=\"modal-body\">\n    <form [formGroup]=\"virtuallibraryFormGroup\">\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Tajuk</label>\n        <input\n          class=\"form-control\"\n          formControlName=\"title\"\n          placeholder=\"Tajuk\"\n          type=\"text\"\n        />\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Abstrak</label>\n        <textarea\n          class=\"form-control\"\n          formControlName=\"abstract\"\n          placeholder=\"Abstrak\"\n        ></textarea>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Tahun</label>\n        <input\n          class=\"form-control\"\n          formControlName=\"year\"\n          placeholder=\"Sila pilih\"\n          type=\"number\"\n        />\n      </div>\n      <!-- <div class=\"form-group\">\n            <label class=\"form-control-label\">Status</label>\n            <select\n              class=\"form-control\"\n              formControlName=\"status\"\n              placeholder=\"Sila pilih\"\n            >\n              <option value=\"AV\">Aktif</option>\n              <option value=\"NA\">Tidak aktif</option>\n            </select>\n          </div> -->\n    </form>\n  </div>\n\n  <div class=\"modal-footer\">\n    <button class=\"btn btn-success\" type=\"button\" (click)=\"update()\">\n      Simpan\n    </button>\n\n    <button\n      class=\"btn btn-outline-danger ml-auto\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      Batal\n    </button>\n  </div>\n</ng-template>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/visits/visits-applications/visits-applications.component.html":
/*!*******************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/visits/visits-applications/visits-applications.component.html ***!
  \*******************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header pb-6\">\n  <div class=\"container-fluid\">\n    <div class=\"header-body\">\n      <div class=\"row align-items-center py-4\">\n        <div class=\"col-lg-6 col-7\">\n          <h6 class=\"h2 text-dark d-inline-block mb-0\">Senarai Permohonan</h6>\n\n          <nav aria-label=\"breadcrumb\" class=\"d-none d-md-inline-block ml-md-4\">\n            <ol class=\"breadcrumb breadcrumb-links breadcrumb-dark\">\n              <li class=\"breadcrumb-item\">\n                <a href=\"javascript:void(0)\">\n                  <i class=\"fas fa-file-invoice text-dark\"></i>\n                </a>\n              </li>\n            </ol>\n          </nav>\n        </div>\n\n        <div class=\"col-lg-6 col-5 text-right\">\n          <a\n            class=\"btn btn-sm btn-neutral\"\n            (click)=\"openModal(createVisit, 'create', '')\"\n          >\n            Tambah\n          </a>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"container-fluid mt--6\">\n  <div class=\"row\">\n    <div class=\"col\">\n      <div class=\"card\">\n        <div class=\"card-header bg-secondary\">\n          <h3 class=\"m-0\">Senarai Permohonan</h3>\n        </div>\n        <div class=\"dataTables_wrapper py-4\">\n          <div class=\"row\">\n            <div class=\"col-sm-12 col-md-6\">\n              <div class=\"dataTables_length\" id=\"datatable_length\">\n                <label>\n                  Papar\n                  <select\n                    name=\"datatable_length\"\n                    aria-controls=\"datatable\"\n                    class=\"form-control form-control-sm\"\n                    (change)=\"entriesChange($event)\"\n                  >\n                    <option value=\"10\" [selected]=\"tableEntries == 5\">5</option>\n                    <option value=\"25\" [selected]=\"tableEntries == 10\">\n                      10\n                    </option>\n                    <option value=\"50\" [selected]=\"tableEntries == 15\">\n                      15\n                    </option>\n                    <option value=\"-1\" [selected]=\"tableEntries == -1\">\n                      Semua\n                    </option>\n                  </select>\n                  rekod\n                </label>\n              </div>\n            </div>\n            <div class=\"col-sm-12 col-md-6\">\n              <div id=\"datatable_filter\" class=\"dataTables_filter\">\n                <label>\n                  <input\n                    type=\"search\"\n                    class=\"form-control form-control-sm\"\n                    placeholder=\"Cari rekod\"\n                    aria-controls=\"datatable\"\n                    (keyup)=\"filterTable($event)\"\n                  />\n                </label>\n              </div>\n            </div>\n          </div>\n\n          <ngx-datatable\n            class=\"bootstrap selection-cell\"\n            [columnMode]=\"'force'\"\n            [headerHeight]=\"50\"\n            [footerHeight]=\"50\"\n            [rowHeight]=\"'auto'\"\n            [limit]=\"tableEntries != -1 ? tableEntries : undefined\"\n            [rows]=\"tableTemp\"\n            (activate)=\"onActivate($event)\"\n          >\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Nama Pemohon</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.customer_id.full_name }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Nama Organisasi</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.organisation_name }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Bilangan Orang</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.total_participant }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Juru Iring</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ row.pic_id.full_name }}\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Status</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                <span\n                  *ngIf=\"row.status == 'AP'\"\n                  class=\"badge badge-pill badge-success\"\n                  >Diterima</span\n                >\n                <span\n                  *ngIf=\"row.status == 'IP'\"\n                  class=\"badge badge-pill badge-danger\"\n                  >Dalam proses</span\n                >\n                <span\n                  *ngIf=\"row.status == 'RJ'\"\n                  class=\"badge badge-pill badge-danger\"\n                  >Ditolak</span\n                >\n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column>\n              <ng-template ngx-datatable-header-template>\n                <span>Tindakan</span>\n              </ng-template>\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                <button\n                  class=\"btn btn-sm btn-primary\"\n                  (click)=\"openModal(editVisit, 'update', row)\"\n                >\n                  Sunting\n                </button>\n              </ng-template>\n            </ngx-datatable-column>\n          </ngx-datatable>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<ng-template #createVisit>\n  <div class=\"modal-header bg-default\">\n    <h6 class=\"modal-title text-white my-auto\" id=\"modal-title-default\">\n      Tambah\n    </h6>\n\n    <button\n      aria-label=\"Close\"\n      class=\"close\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      <span aria-hidden=\"true\" class=\"text-white my-auto\"> × </span>\n    </button>\n  </div>\n\n  <div class=\"modal-body\">\n    <form [formGroup]=\"visitappFormGroup\">\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Nama Pemohon</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"customer_id\"\n          placeholder=\"Sila pilih\"\n        >\n          <option *ngFor=\"let user of users\" [value]=\"user.id\">\n            {{ user.full_name }}\n          </option>\n        </select>\n      </div>\n      <div class=\"row\">\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Tarikh</label>\n            <input\n              type=\"date\"\n              class=\"form-control\"\n              formControlName=\"visit_date\"\n              placeholder=\"Pilih tarikh\"\n            />\n          </div>\n        </div>\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Masa</label>\n            <input\n              type=\"time\"\n              class=\"form-control\"\n              formControlName=\"visit_time\"\n              placeholder=\"Pilih masa\"\n            />\n          </div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Kategori Organisasi</label>\n            <select\n              class=\"form-control\"\n              formControlName=\"organisation_category\"\n              placeholder=\"Sila pilih\"\n            >\n              <option\n                *ngFor=\"let organisationcategory of organisationcategories\"\n                [value]=\"organisationcategory.value\"\n              >\n                {{ organisationcategory.display_name }}\n              </option>\n            </select>\n          </div>\n        </div>\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Bilangan orang</label>\n            <input\n              class=\"form-control\"\n              formControlName=\"total_participant\"\n              placeholder=\"Bilangan orang\"\n              type=\"number\"\n            />\n          </div>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Nama organisasi</label>\n        <input\n          class=\"form-control\"\n          formControlName=\"organisation_name\"\n          placeholder=\"Nama organisasi\"\n          type=\"text\"\n        />\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Juru Iring</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"pic_id\"\n          placeholder=\"Sila pilih\"\n        >\n          <option *ngFor=\"let user of users\" [value]=\"user.id\">\n            {{ user.full_name }}\n          </option>\n        </select>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Status</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"status\"\n          placeholder=\"Sila pilih\"\n        >\n          <option value=\"IP\">Baru</option>\n          <option value=\"AP\">Diterima</option>\n          <option value=\"RJ\">Ditolak</option>\n        </select>\n      </div>\n    </form>\n  </div>\n\n  <div class=\"modal-footer\">\n    <button class=\"btn btn-success\" type=\"button\" (click)=\"create()\">\n      Simpan\n    </button>\n\n    <button\n      class=\"btn btn-outline-danger ml-auto\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      Batal\n    </button>\n  </div>\n</ng-template>\n\n<ng-template #editVisit>\n  <div class=\"modal-header bg-default\">\n    <h6 class=\"modal-title text-white my-auto\" id=\"modal-title-default\">\n      Ubah Suai\n    </h6>\n\n    <button\n      aria-label=\"Close\"\n      class=\"close\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      <span aria-hidden=\"true\" class=\"text-white my-auto\"> × </span>\n    </button>\n  </div>\n\n  <div class=\"modal-body\">\n    <form [formGroup]=\"visitappFormGroup\">\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Nama Pemohon</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"customer_id\"\n          placeholder=\"Sila pilih\"\n        >\n          <option *ngFor=\"let user of users\" [value]=\"user.id\">\n            {{ user.full_name }}\n          </option>\n        </select>\n      </div>\n      <div class=\"row\">\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Tarikh</label>\n            <input\n              type=\"date\"\n              class=\"form-control\"\n              formControlName=\"visit_date\"\n              placeholder=\"Pilih tarikh\"\n            />\n          </div>\n        </div>\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Masa</label>\n            <input\n              type=\"time\"\n              class=\"form-control\"\n              formControlName=\"visit_time\"\n              placeholder=\"Pilih masa\"\n            />\n          </div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Kategori Organisasi</label>\n            <select\n              class=\"form-control\"\n              formControlName=\"organisation_category\"\n              placeholder=\"Sila pilih\"\n            >\n              <option\n                *ngFor=\"let organisationcategory of organisationcategories\"\n                [value]=\"organisationcategory.value\"\n              >\n                {{ organisationcategory.display_name }}\n              </option>\n            </select>\n          </div>\n        </div>\n        <div class=\"col\">\n          <div class=\"form-group\">\n            <label class=\"form-control-label\">Bilangan orang</label>\n            <input\n              class=\"form-control\"\n              formControlName=\"total_participant\"\n              placeholder=\"Bilangan orang\"\n              type=\"number\"\n            />\n          </div>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Nama organisasi</label>\n        <input\n          class=\"form-control\"\n          formControlName=\"organisation_name\"\n          placeholder=\"Nama organisasi\"\n          type=\"text\"\n        />\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Juru Iring</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"pic_id\"\n          placeholder=\"Sila pilih\"\n        >\n          <option *ngFor=\"let user of users\" [value]=\"user.id\">\n            {{ user.full_name }}\n          </option>\n        </select>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-control-label\">Status</label>\n        <select\n          class=\"form-control\"\n          formControlName=\"status\"\n          placeholder=\"Sila pilih\"\n        >\n          <option value=\"AP\">Diterima</option>\n          <option value=\"RJ\">Ditolak</option>\n        </select>\n      </div>\n    </form>\n  </div>\n\n  <div class=\"modal-footer\">\n    <button class=\"btn btn-success\" type=\"button\" (click)=\"update()\">\n      Simpan\n    </button>\n\n    <button\n      class=\"btn btn-outline-danger ml-auto\"\n      data-dismiss=\"modal\"\n      type=\"button\"\n      (click)=\"closeModal()\"\n    >\n      Batal\n    </button>\n  </div>\n</ng-template>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/visits/visits-schedule/visits-schedule.component.html":
/*!***********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/visits/visits-schedule/visits-schedule.component.html ***!
  \***********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header pb-6\">\n    <div class=\"container-fluid\">\n        <div class=\"header-body\">\n            <div class=\"row align-items-center py-4\">\n                <div class=\"col-lg-6 col-7\">\n                    <h6 class=\"h2 text-dark d-inline-block mb-0\"></h6>\n\n                    <nav aria-label=\"breadcrumb\" class=\" d-none d-md-inline-block ml-md-4\">\n                        <ol class=\"breadcrumb breadcrumb-links breadcrumb-dark\">\n                            <li class=\"breadcrumb-item\">\n                                <a href=\"javascript:void(0)\">\n                                    <i class=\"fas fa-align-left text-dark\"></i>\n                                </a>\n                            </li>\n                            <!-- <li class=\"breadcrumb-item\">\n                                <a href=\"javascript:void(0)\" class=\"text-dark\"> Finance </a>\n                            </li>\n                            <li aria-current=\"page\" class=\"breadcrumb-item active\">\n                                Fees Management\n                            </li> -->\n                        </ol>\n                    </nav>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div class=\"container-fluid mt--6\">\n    <div class=\"row\">\n        <div class=\"col\">\n            <div class=\"card\">\n                <div class=\"card-header bg-secondary\">\n                    <h3 clas=\"m-0\"></h3>\n                </div>\n                <div class=\"card-body\">\n                    <img src=\"assets/img/default/under-construction.png\" style=\"max-width: 30rem\" class=\"text-center mx-auto d-flex\">\n                    <p class=\"text-center\">Page under construction</p>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>");

/***/ }),

/***/ "./src/app/core/user/assets/assets.component.scss":
/*!********************************************************!*\
  !*** ./src/app/core/user/assets/assets.component.scss ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvcmUvdXNlci9hc3NldHMvYXNzZXRzLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/core/user/assets/assets.component.ts":
/*!******************************************************!*\
  !*** ./src/app/core/user/assets/assets.component.ts ***!
  \******************************************************/
/*! exports provided: SelectionType, AssetsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectionType", function() { return SelectionType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AssetsComponent", function() { return AssetsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm5/forms.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/__ivy_ngcc__/esm5/ngx-bootstrap.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var src_app_shared_services_assets_assets_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/shared/services/assets/assets.service */ "./src/app/shared/services/assets/assets.service.ts");
/* harmony import */ var src_app_shared_services_users_users_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/shared/services/users/users.service */ "./src/app/shared/services/users/users.service.ts");







var SelectionType;
(function (SelectionType) {
    SelectionType["single"] = "single";
    SelectionType["multi"] = "multi";
    SelectionType["multiClick"] = "multiClick";
    SelectionType["cell"] = "cell";
    SelectionType["checkbox"] = "checkbox";
})(SelectionType || (SelectionType = {}));
var AssetsComponent = /** @class */ (function () {
    function AssetsComponent(formBuilder, modalService, assetService, userService) {
        this.formBuilder = formBuilder;
        this.modalService = modalService;
        this.assetService = assetService;
        this.userService = userService;
        // Table
        this.tableEntries = 5;
        this.tableSelected = [];
        this.tableTemp = [];
        this.tableRows = [];
        this.SelectionType = SelectionType;
        this.modalConfig = {
            keyboard: true,
            class: "modal-dialog-centered",
        };
        // Dropdown
        this.users = [];
        this.getUser();
        this.assetFormGroup = this.formBuilder.group({
            id: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            name: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            description: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            asset_type: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            pic_id: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            image_url: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
        });
    }
    AssetsComponent.prototype.getUser = function () {
        var _this = this;
        this.userService.getAll().subscribe(function (res) {
            console.log("res", res);
            _this.users = res;
        }, function (err) {
            console.error("err", err);
        });
    };
    AssetsComponent.prototype.ngOnInit = function () {
        this.getData();
    };
    AssetsComponent.prototype.getData = function () {
        var _this = this;
        this.assetService.extended().subscribe(function (res) {
            _this.tableRows = res;
            _this.tableTemp = _this.tableRows.map(function (prop, key) {
                return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, prop), { no: key });
            });
        });
    };
    AssetsComponent.prototype.entriesChange = function ($event) {
        this.tableEntries = $event.target.value;
    };
    AssetsComponent.prototype.filterTable = function ($event) {
        var val = $event.target.value;
        this.tableTemp = this.tableRows.filter(function (d) {
            for (var key in d) {
                if (d[key]
                    .toString()
                    .toLowerCase()
                    .indexOf(val.toString().toLowerCase()) !== -1) {
                    return true;
                }
            }
            return false;
        });
    };
    AssetsComponent.prototype.onSelect = function (_a) {
        var _b;
        var selected = _a.selected;
        this.tableSelected.splice(0, this.tableSelected.length);
        (_b = this.tableSelected).push.apply(_b, selected);
    };
    AssetsComponent.prototype.onActivate = function (event) {
        this.tableActiveRow = event.row;
    };
    AssetsComponent.prototype.openModal = function (modalRef, process, row) {
        if (process == "create") {
            this.assetFormGroup.reset();
        }
        else if (process == "update") {
            this.assetFormGroup.patchValue(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, row), { pic_id: row.pic_id.id }));
        }
        this.modal = this.modalService.show(modalRef, this.modalConfig);
    };
    AssetsComponent.prototype.closeModal = function () {
        this.modal.hide();
    };
    AssetsComponent.prototype.create = function () {
        var _this = this;
        this.assetService.post(this.assetFormGroup.value).subscribe(function (res) {
            console.log("res", res);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Berjaya",
                text: "Data anda berjaya disimpan.",
                type: "success",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
            })
                .then(function (result) {
                if (result.value) {
                    _this.modal.hide();
                    _this.getData();
                }
            });
        }, function (err) {
            console.error("err", err);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Ralat",
                text: "Data anda tidak berjaya disimpan. Sila cuba lagi",
                type: "warning",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-warning",
            })
                .then(function (result) {
                if (result.value) {
                    // this.modal.hide();
                }
            });
        });
    };
    AssetsComponent.prototype.update = function () {
        var _this = this;
        this.assetService
            .update(this.assetFormGroup.value, this.assetFormGroup.value.id)
            .subscribe(function (res) {
            console.log("res", res);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Berjaya",
                text: "Data anda berjaya dikemaskini.",
                type: "success",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
            })
                .then(function (result) {
                if (result.value) {
                    _this.modal.hide();
                    _this.getData();
                }
            });
        }, function (err) {
            console.error("err", err);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Ralat",
                text: "Data anda tidak berjaya dikemaskini. Sila cuba lagi",
                type: "warning",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-warning",
            })
                .then(function (result) {
                if (result.value) {
                    // this.modal.hide();
                }
            });
        });
    };
    AssetsComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
        { type: ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__["BsModalService"] },
        { type: src_app_shared_services_assets_assets_service__WEBPACK_IMPORTED_MODULE_5__["AssetsService"] },
        { type: src_app_shared_services_users_users_service__WEBPACK_IMPORTED_MODULE_6__["UsersService"] }
    ]; };
    AssetsComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-assets",
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./assets.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/assets/assets.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./assets.component.scss */ "./src/app/core/user/assets/assets.component.scss")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__["BsModalService"],
            src_app_shared_services_assets_assets_service__WEBPACK_IMPORTED_MODULE_5__["AssetsService"],
            src_app_shared_services_users_users_service__WEBPACK_IMPORTED_MODULE_6__["UsersService"]])
    ], AssetsComponent);
    return AssetsComponent;
}());



/***/ }),

/***/ "./src/app/core/user/calendar/calendar.component.scss":
/*!************************************************************!*\
  !*** ./src/app/core/user/calendar/calendar.component.scss ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvcmUvdXNlci9jYWxlbmRhci9jYWxlbmRhci5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/core/user/calendar/calendar.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/core/user/calendar/calendar.component.ts ***!
  \**********************************************************/
/*! exports provided: CalendarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CalendarComponent", function() { return CalendarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");


var CalendarComponent = /** @class */ (function () {
    function CalendarComponent() {
    }
    CalendarComponent.prototype.ngOnInit = function () {
    };
    CalendarComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-calendar',
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./calendar.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/calendar/calendar.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./calendar.component.scss */ "./src/app/core/user/calendar/calendar.component.scss")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [])
    ], CalendarComponent);
    return CalendarComponent;
}());



/***/ }),

/***/ "./src/app/core/user/dashboard/dashboard.component.scss":
/*!**************************************************************!*\
  !*** ./src/app/core/user/dashboard/dashboard.component.scss ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvcmUvdXNlci9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/core/user/dashboard/dashboard.component.ts":
/*!************************************************************!*\
  !*** ./src/app/core/user/dashboard/dashboard.component.ts ***!
  \************************************************************/
/*! exports provided: DashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return DashboardComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @amcharts/amcharts4/core */ "./node_modules/@amcharts/amcharts4/core.js");
/* harmony import */ var _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @amcharts/amcharts4/charts */ "./node_modules/@amcharts/amcharts4/charts.js");
/* harmony import */ var _amcharts_amcharts4_themes_animated__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @amcharts/amcharts4/themes/animated */ "./node_modules/@amcharts/amcharts4/themes/animated.js");





_amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["useTheme"](_amcharts_amcharts4_themes_animated__WEBPACK_IMPORTED_MODULE_4__["default"]);
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(zone) {
        this.zone = zone;
        this.clicked = true;
        this.clicked1 = false;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.getCharts();
    };
    DashboardComponent.prototype.ngOnDestroy = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            if (_this.chart) {
                console.log('Chart disposed');
                _this.chart.dispose();
            }
            if (_this.chart1) {
                console.log('Chart disposed');
                _this.chart1.dispose();
            }
        });
    };
    DashboardComponent.prototype.getCharts = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.getChart();
            _this.getChart1();
        });
    };
    DashboardComponent.prototype.getChart = function () {
        var chart = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["create"]('chart-dashboard-1', _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__["XYChart"]);
        // chart.scrollbarX = new am4core.Scrollbar();
        // Add data
        chart.data = [
            {
                'module': 'eShow',
                'visits': 3025
            },
            {
                'module': 'eExhibit',
                'visits': 1882
            },
            {
                'module': 'eVisit',
                'visits': 1809
            },
            {
                'module': 'eProgram',
                'visits': 1322
            },
            {
                'module': 'eFacility',
                'visits': 1122
            },
            {
                'module': 'ePublication',
                'visits': 1114
            }
        ];
        // Create axes
        var categoryAxis = chart.xAxes.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__["CategoryAxis"]());
        categoryAxis.dataFields.category = 'module';
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 30;
        categoryAxis.renderer.labels.template.horizontalCenter = 'right';
        categoryAxis.renderer.labels.template.verticalCenter = 'middle';
        // categoryAxis.renderer.labels.template.rotation = 270;
        categoryAxis.tooltip.disabled = true;
        categoryAxis.renderer.minHeight = 110;
        var valueAxis = chart.yAxes.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__["ValueAxis"]());
        valueAxis.renderer.minWidth = 50;
        // Create series
        var series = chart.series.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__["ColumnSeries"]());
        series.sequencedInterpolation = true;
        series.dataFields.valueY = 'visits';
        series.dataFields.categoryX = 'module';
        series.tooltipText = '[{categoryX}: bold]{valueY}[/]';
        series.columns.template.strokeWidth = 0;
        series.tooltip.pointerOrientation = 'vertical';
        series.columns.template.column.cornerRadiusTopLeft = 10;
        series.columns.template.column.cornerRadiusTopRight = 10;
        series.columns.template.column.fillOpacity = 0.8;
        // on hover, make corner radiuses bigger
        var hoverState = series.columns.template.column.states.create('hover');
        hoverState.properties.cornerRadiusTopLeft = 0;
        hoverState.properties.cornerRadiusTopRight = 0;
        hoverState.properties.fillOpacity = 1;
        series.columns.template.adapter.add('fill', function (fill, target) {
            return chart.colors.getIndex(target.dataItem.index);
        });
        // Cursor
        chart.cursor = new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__["XYCursor"]();
        this.chart = chart;
    };
    DashboardComponent.prototype.getChart1 = function () {
        var chart = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["create"]('chart-dashboard-2', _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__["PieChart"]);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
        chart.data = [
            {
                item: 'Kanak-kanak',
                value: 491
            },
            {
                item: 'Pelajar',
                value: 5002
            },
            {
                item: 'Keluarga',
                value: 2000
            },
            {
                item: 'Lain-lain',
                value: 1600
            }
        ];
        chart.radius = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["percent"](70);
        chart.innerRadius = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["percent"](40);
        chart.startAngle = 180;
        chart.endAngle = 360;
        var series = chart.series.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__["PieSeries"]());
        series.dataFields.value = 'value';
        series.dataFields.category = 'item';
        series.ticks.template.disabled = true;
        series.labels.template.disabled = true;
        series.slices.template.cornerRadius = 10;
        series.slices.template.innerCornerRadius = 7;
        series.slices.template.draggable = true;
        series.slices.template.inert = true;
        series.alignLabels = false;
        series.hiddenState.properties.startAngle = 90;
        series.hiddenState.properties.endAngle = 90;
        //chart.legend = new am4charts.Legend();
        this.chart1 = chart;
    };
    DashboardComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] }
    ]; };
    DashboardComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-dashboard',
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./dashboard.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/dashboard/dashboard.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./dashboard.component.scss */ "./src/app/core/user/dashboard/dashboard.component.scss")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]])
    ], DashboardComponent);
    return DashboardComponent;
}());



/***/ }),

/***/ "./src/app/core/user/exhibits/exhibits-list/exhibits-list.component.scss":
/*!*******************************************************************************!*\
  !*** ./src/app/core/user/exhibits/exhibits-list/exhibits-list.component.scss ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvcmUvdXNlci9leGhpYml0cy9leGhpYml0cy1saXN0L2V4aGliaXRzLWxpc3QuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/core/user/exhibits/exhibits-list/exhibits-list.component.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/core/user/exhibits/exhibits-list/exhibits-list.component.ts ***!
  \*****************************************************************************/
/*! exports provided: SelectionType, ExhibitsListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectionType", function() { return SelectionType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExhibitsListComponent", function() { return ExhibitsListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm5/forms.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/__ivy_ngcc__/esm5/ngx-bootstrap.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var src_app_shared_services_exhibits_exhibits_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/shared/services/exhibits/exhibits.service */ "./src/app/shared/services/exhibits/exhibits.service.ts");
/* harmony import */ var src_app_shared_services_assets_assets_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/shared/services/assets/assets.service */ "./src/app/shared/services/assets/assets.service.ts");
/* harmony import */ var src_app_shared_services_users_users_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/shared/services/users/users.service */ "./src/app/shared/services/users/users.service.ts");








var SelectionType;
(function (SelectionType) {
    SelectionType["single"] = "single";
    SelectionType["multi"] = "multi";
    SelectionType["multiClick"] = "multiClick";
    SelectionType["cell"] = "cell";
    SelectionType["checkbox"] = "checkbox";
})(SelectionType || (SelectionType = {}));
var ExhibitsListComponent = /** @class */ (function () {
    function ExhibitsListComponent(formBuilder, modalService, exhibitService, assetService, userService) {
        this.formBuilder = formBuilder;
        this.modalService = modalService;
        this.exhibitService = exhibitService;
        this.assetService = assetService;
        this.userService = userService;
        // Table
        this.tableEntries = 5;
        this.tableSelected = [];
        this.tableTemp = [];
        this.tableRows = [];
        this.SelectionType = SelectionType;
        this.modalConfig = {
            keyboard: true,
            class: "modal-dialog-centered",
        };
        // Dropdown
        this.assets = [];
        this.statuses = [];
        this.users = [];
        this.zones = [];
        this.getAsset();
        this.getUser();
        this.exhibitFormGroup = this.formBuilder.group({
            id: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            name: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            description: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            // image_link: new FormControl(""),
            zone: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            pic_id: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            asset_id: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            // qrcode: new FormControl(""),
            status: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
        });
    }
    ExhibitsListComponent.prototype.getAsset = function () {
        var _this = this;
        this.assetService.get().subscribe(function (res) {
            console.log("res", res);
            _this.assets = res;
        }, function (err) {
            console.error("err", err);
        });
    };
    ExhibitsListComponent.prototype.getUser = function () {
        var _this = this;
        this.userService.getAll().subscribe(function (res) {
            console.log("res", res);
            _this.users = res;
        }, function (err) {
            console.error("err", err);
        });
    };
    ExhibitsListComponent.prototype.ngOnInit = function () {
        this.getData();
    };
    ExhibitsListComponent.prototype.getData = function () {
        // let fakeData = [
        //   { zone: "A", number: "1", item: "Lobi", status: "inactive" },
        //   {
        //     zone: "A",
        //     number: "2",
        //     item: "Bumi, Matahari dan Sistem Suria",
        //     status: "inactive",
        //   },
        //   { zone: "A", number: "3", item: "Terokai Angkasa", status: "active" },
        //   { zone: "A", number: "4", item: "Star Life Cycle", status: "active" },
        //   { zone: "A", number: "5", item: "Alam Semesta", status: "active" },
        //   { zone: "B", number: "6", item: "Lobi", status: "active" },
        //   {
        //     zone: "B",
        //     number: "7",
        //     item: "Bumi, Matahari dan Sistem Suria",
        //     status: "active",
        //   },
        //   { zone: "B", number: "8", item: "Terokai Angkasa", status: "active" },
        //   { zone: "B", number: "9", item: "Star Life Cycle", status: "active" },
        //   { zone: "B", number: "10", item: "Satelit", status: "active" },
        // ];
        var _this = this;
        // this.tableRows = [...fakeData];
        // this.tableTemp = this.tableRows.map((prop, key) => {
        //   return {
        //     ...prop,
        //     id: key,
        //   };
        // });
        this.exhibitService.get().subscribe(function (res) {
            console.log("res", res);
            _this.tableRows = res;
            _this.tableTemp = _this.tableRows.map(function (prop, key) {
                return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, prop), { id: key });
            });
        }, function (err) {
            console.error("err", err);
        });
    };
    ExhibitsListComponent.prototype.entriesChange = function ($event) {
        this.tableEntries = $event.target.value;
    };
    ExhibitsListComponent.prototype.filterTable = function ($event) {
        var val = $event.target.value;
        this.tableTemp = this.tableRows.filter(function (d) {
            for (var key in d) {
                if (d[key]
                    .toString()
                    .toLowerCase()
                    .indexOf(val.toString().toLowerCase()) !== -1) {
                    return true;
                }
            }
            return false;
        });
    };
    ExhibitsListComponent.prototype.onSelect = function (_a) {
        var _b;
        var selected = _a.selected;
        this.tableSelected.splice(0, this.tableSelected.length);
        (_b = this.tableSelected).push.apply(_b, selected);
    };
    ExhibitsListComponent.prototype.onActivate = function (event) {
        this.tableActiveRow = event.row;
    };
    ExhibitsListComponent.prototype.openModal = function (modalRef, process, row) {
        if (process == "create") {
            this.exhibitFormGroup.reset();
        }
        else if (process == "update") {
            this.exhibitFormGroup.patchValue(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, row), { asset_id: row.asset_id.id, pic_id: row.pic_id.id }));
        }
        this.modal = this.modalService.show(modalRef, this.modalConfig);
    };
    ExhibitsListComponent.prototype.closeModal = function () {
        this.modal.hide();
    };
    ExhibitsListComponent.prototype.create = function () {
        var _this = this;
        this.exhibitService.post(this.exhibitFormGroup.value).subscribe(function (res) {
            console.log("res", res);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Berjaya",
                text: "Data anda berjaya disimpan.",
                type: "success",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
            })
                .then(function (result) {
                if (result.value) {
                    _this.modal.hide();
                    _this.getData();
                }
            });
        }, function (err) {
            console.error("err", err);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Ralat",
                text: "Data anda tidak berjaya disimpan. Sila cuba lagi",
                type: "warning",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-warning",
            })
                .then(function (result) {
                if (result.value) {
                    // this.modal.hide();
                }
            });
        });
    };
    ExhibitsListComponent.prototype.update = function () {
        var _this = this;
        this.exhibitService
            .update(this.exhibitFormGroup.value, this.exhibitFormGroup.value.id)
            .subscribe(function (res) {
            console.log("res", res);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Berjaya",
                text: "Data anda berjaya dikemaskini.",
                type: "success",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
            })
                .then(function (result) {
                if (result.value) {
                    _this.modal.hide();
                    _this.getData();
                }
            });
        }, function (err) {
            console.error("err", err);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Ralat",
                text: "Data anda tidak berjaya dikemaskini. Sila cuba lagi",
                type: "warning",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-warning",
            })
                .then(function (result) {
                if (result.value) {
                    // this.modal.hide();
                }
            });
        });
    };
    ExhibitsListComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
        { type: ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__["BsModalService"] },
        { type: src_app_shared_services_exhibits_exhibits_service__WEBPACK_IMPORTED_MODULE_5__["ExhibitsService"] },
        { type: src_app_shared_services_assets_assets_service__WEBPACK_IMPORTED_MODULE_6__["AssetsService"] },
        { type: src_app_shared_services_users_users_service__WEBPACK_IMPORTED_MODULE_7__["UsersService"] }
    ]; };
    ExhibitsListComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-exhibits-list",
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./exhibits-list.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/exhibits/exhibits-list/exhibits-list.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./exhibits-list.component.scss */ "./src/app/core/user/exhibits/exhibits-list/exhibits-list.component.scss")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__["BsModalService"],
            src_app_shared_services_exhibits_exhibits_service__WEBPACK_IMPORTED_MODULE_5__["ExhibitsService"],
            src_app_shared_services_assets_assets_service__WEBPACK_IMPORTED_MODULE_6__["AssetsService"],
            src_app_shared_services_users_users_service__WEBPACK_IMPORTED_MODULE_7__["UsersService"]])
    ], ExhibitsListComponent);
    return ExhibitsListComponent;
}());



/***/ }),

/***/ "./src/app/core/user/facilities/facilities-application/facilities-application.component.scss":
/*!***************************************************************************************************!*\
  !*** ./src/app/core/user/facilities/facilities-application/facilities-application.component.scss ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvcmUvdXNlci9mYWNpbGl0aWVzL2ZhY2lsaXRpZXMtYXBwbGljYXRpb24vZmFjaWxpdGllcy1hcHBsaWNhdGlvbi5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/core/user/facilities/facilities-application/facilities-application.component.ts":
/*!*************************************************************************************************!*\
  !*** ./src/app/core/user/facilities/facilities-application/facilities-application.component.ts ***!
  \*************************************************************************************************/
/*! exports provided: SelectionType, FacilitiesApplicationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectionType", function() { return SelectionType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FacilitiesApplicationComponent", function() { return FacilitiesApplicationComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm5/forms.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/__ivy_ngcc__/esm5/ngx-bootstrap.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var src_app_shared_services_facility_bookings_facility_bookings_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/shared/services/facility-bookings/facility-bookings.service */ "./src/app/shared/services/facility-bookings/facility-bookings.service.ts");
/* harmony import */ var src_app_shared_services_facilities_facilities_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/shared/services/facilities/facilities.service */ "./src/app/shared/services/facilities/facilities.service.ts");
/* harmony import */ var src_app_shared_services_users_users_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/shared/services/users/users.service */ "./src/app/shared/services/users/users.service.ts");








var SelectionType;
(function (SelectionType) {
    SelectionType["single"] = "single";
    SelectionType["multi"] = "multi";
    SelectionType["multiClick"] = "multiClick";
    SelectionType["cell"] = "cell";
    SelectionType["checkbox"] = "checkbox";
})(SelectionType || (SelectionType = {}));
var FacilitiesApplicationComponent = /** @class */ (function () {
    function FacilitiesApplicationComponent(formBuilder, modalService, facilitybookingService, facilityService, userService) {
        this.formBuilder = formBuilder;
        this.modalService = modalService;
        this.facilitybookingService = facilitybookingService;
        this.facilityService = facilityService;
        this.userService = userService;
        // Table
        this.tableEntries = 5;
        this.tableSelected = [];
        this.tableTemp = [];
        this.tableRows = [];
        this.SelectionType = SelectionType;
        this.modalConfig = {
            keyboard: true,
            class: "modal-dialog-centered",
        };
        // Dropdown
        this.facilities = [];
        this.users = [];
        this.getFacility();
        this.getUser();
        this.facilityFormGroup = this.formBuilder.group({
            id: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            title: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            user_id: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            pic_id: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            facility_id: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            status: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            organisation_name: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            organisation_category: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            booking_date: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            booking_time: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            number_of_people: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            total_price: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
        });
    }
    FacilitiesApplicationComponent.prototype.getFacility = function () {
        var _this = this;
        this.facilityService.get().subscribe(function (res) {
            console.log("res", res);
            _this.facilities = res;
        }, function (err) {
            console.error("err", err);
        });
    };
    FacilitiesApplicationComponent.prototype.getUser = function () {
        var _this = this;
        this.userService.getAll().subscribe(function (res) {
            console.log("res", res);
            _this.users = res;
        }, function (err) {
            console.error("err", err);
        });
    };
    FacilitiesApplicationComponent.prototype.ngOnInit = function () {
        this.getData();
    };
    FacilitiesApplicationComponent.prototype.getData = function () {
        var _this = this;
        this.facilityService.extended().subscribe(function (res) {
            _this.tableRows = res;
            _this.tableTemp = _this.tableRows.map(function (prop, key) {
                return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, prop), { no: key });
            });
        });
    };
    FacilitiesApplicationComponent.prototype.entriesChange = function ($event) {
        this.tableEntries = $event.target.value;
    };
    FacilitiesApplicationComponent.prototype.filterTable = function ($event) {
        var val = $event.target.value;
        this.tableTemp = this.tableRows.filter(function (d) {
            for (var key in d) {
                if (d[key]
                    .toString()
                    .toLowerCase()
                    .indexOf(val.toString().toLowerCase()) !== -1) {
                    return true;
                }
            }
            return false;
        });
    };
    FacilitiesApplicationComponent.prototype.onSelect = function (_a) {
        var _b;
        var selected = _a.selected;
        this.tableSelected.splice(0, this.tableSelected.length);
        (_b = this.tableSelected).push.apply(_b, selected);
    };
    FacilitiesApplicationComponent.prototype.onActivate = function (event) {
        this.tableActiveRow = event.row;
    };
    FacilitiesApplicationComponent.prototype.openModal = function (modalRef, process, row) {
        if (process == "create") {
            this.facilityFormGroup.reset();
        }
        else if (process == "update") {
            this.facilityFormGroup.patchValue(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, row), { user_id: row.user_id.id, pic_id: row.pic_id.id, facility_id: row.facility_id.id }));
        }
        this.modal = this.modalService.show(modalRef, this.modalConfig);
    };
    FacilitiesApplicationComponent.prototype.closeModal = function () {
        this.modal.hide();
    };
    FacilitiesApplicationComponent.prototype.create = function () {
        var _this = this;
        this.facilitybookingService.post(this.facilityFormGroup.value).subscribe(function (res) {
            console.log("res", res);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Berjaya",
                text: "Data anda berjaya disimpan.",
                type: "success",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
            })
                .then(function (result) {
                if (result.value) {
                    _this.modal.hide();
                    _this.getData();
                }
            });
        }, function (err) {
            console.error("err", err);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Ralat",
                text: "Data anda tidak berjaya disimpan. Sila cuba lagi",
                type: "warning",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-warning",
            })
                .then(function (result) {
                if (result.value) {
                    // this.modal.hide();
                }
            });
        });
    };
    FacilitiesApplicationComponent.prototype.update = function () {
        var _this = this;
        this.facilitybookingService
            .update(this.facilityFormGroup.value, this.facilityFormGroup.value.id)
            .subscribe(function (res) {
            console.log("res", res);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Berjaya",
                text: "Data anda berjaya dikemaskini.",
                type: "success",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
            })
                .then(function (result) {
                if (result.value) {
                    _this.modal.hide();
                    _this.getData();
                }
            });
        }, function (err) {
            console.error("err", err);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Ralat",
                text: "Data anda tidak berjaya dikemaskini. Sila cuba lagi",
                type: "warning",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-warning",
            })
                .then(function (result) {
                if (result.value) {
                    // this.modal.hide();
                }
            });
        });
    };
    FacilitiesApplicationComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
        { type: ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__["BsModalService"] },
        { type: src_app_shared_services_facility_bookings_facility_bookings_service__WEBPACK_IMPORTED_MODULE_5__["FacilityBookingsService"] },
        { type: src_app_shared_services_facilities_facilities_service__WEBPACK_IMPORTED_MODULE_6__["FacilitiesService"] },
        { type: src_app_shared_services_users_users_service__WEBPACK_IMPORTED_MODULE_7__["UsersService"] }
    ]; };
    FacilitiesApplicationComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-facilities-application",
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./facilities-application.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/facilities/facilities-application/facilities-application.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./facilities-application.component.scss */ "./src/app/core/user/facilities/facilities-application/facilities-application.component.scss")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__["BsModalService"],
            src_app_shared_services_facility_bookings_facility_bookings_service__WEBPACK_IMPORTED_MODULE_5__["FacilityBookingsService"],
            src_app_shared_services_facilities_facilities_service__WEBPACK_IMPORTED_MODULE_6__["FacilitiesService"],
            src_app_shared_services_users_users_service__WEBPACK_IMPORTED_MODULE_7__["UsersService"]])
    ], FacilitiesApplicationComponent);
    return FacilitiesApplicationComponent;
}());



/***/ }),

/***/ "./src/app/core/user/facilities/facilities-list/facilities-list.component.scss":
/*!*************************************************************************************!*\
  !*** ./src/app/core/user/facilities/facilities-list/facilities-list.component.scss ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvcmUvdXNlci9mYWNpbGl0aWVzL2ZhY2lsaXRpZXMtbGlzdC9mYWNpbGl0aWVzLWxpc3QuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/core/user/facilities/facilities-list/facilities-list.component.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/core/user/facilities/facilities-list/facilities-list.component.ts ***!
  \***********************************************************************************/
/*! exports provided: SelectionType, FacilitiesListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectionType", function() { return SelectionType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FacilitiesListComponent", function() { return FacilitiesListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm5/forms.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/__ivy_ngcc__/esm5/ngx-bootstrap.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var src_app_shared_services_facilities_facilities_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/shared/services/facilities/facilities.service */ "./src/app/shared/services/facilities/facilities.service.ts");
/* harmony import */ var src_app_shared_services_assets_assets_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/shared/services/assets/assets.service */ "./src/app/shared/services/assets/assets.service.ts");
/* harmony import */ var src_app_shared_services_users_users_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/shared/services/users/users.service */ "./src/app/shared/services/users/users.service.ts");
/* harmony import */ var src_app_shared_services_venues_venues_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/shared/services/venues/venues.service */ "./src/app/shared/services/venues/venues.service.ts");









var SelectionType;
(function (SelectionType) {
    SelectionType["single"] = "single";
    SelectionType["multi"] = "multi";
    SelectionType["multiClick"] = "multiClick";
    SelectionType["cell"] = "cell";
    SelectionType["checkbox"] = "checkbox";
})(SelectionType || (SelectionType = {}));
var FacilitiesListComponent = /** @class */ (function () {
    function FacilitiesListComponent(formBuilder, modalService, facilityService, assetService, userService, venueService) {
        this.formBuilder = formBuilder;
        this.modalService = modalService;
        this.facilityService = facilityService;
        this.assetService = assetService;
        this.userService = userService;
        this.venueService = venueService;
        // Table
        this.tableEntries = 5;
        this.tableSelected = [];
        this.tableTemp = [];
        this.tableRows = [];
        this.SelectionType = SelectionType;
        this.modalConfig = {
            keyboard: true,
            class: "modal-dialog-centered",
        };
        // Dropdown
        this.assets = [];
        this.users = [];
        this.venues = [];
        this.getAsset();
        this.getUser();
        this.getVenue();
        this.showingFormGroup = this.formBuilder.group({
            id: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            name: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            description: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            facility_type: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            price: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            size: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            max_capacity: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            // image_link: new FormControl(""),
            // pdf_link: new FormControl(""),
            // promo_link: new FormControl(""),
            pic_id: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            asset_id: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            venue_id: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
        });
    }
    FacilitiesListComponent.prototype.getAsset = function () {
        var _this = this;
        this.assetService.get().subscribe(function (res) {
            console.log("res", res);
            _this.assets = res;
        }, function (err) {
            console.error("err", err);
        });
    };
    FacilitiesListComponent.prototype.getUser = function () {
        var _this = this;
        this.userService.getAll().subscribe(function (res) {
            console.log("res", res);
            _this.users = res;
        }, function (err) {
            console.error("err", err);
        });
    };
    FacilitiesListComponent.prototype.getVenue = function () {
        var _this = this;
        this.venueService.get().subscribe(function (res) {
            console.log("res", res);
            _this.venues = res;
        }, function (err) {
            console.error("err", err);
        });
    };
    FacilitiesListComponent.prototype.ngOnInit = function () {
        this.getData();
    };
    FacilitiesListComponent.prototype.getData = function () {
        var _this = this;
        this.facilityService.extended().subscribe(function (res) {
            _this.tableRows = res;
            _this.tableTemp = _this.tableRows.map(function (prop, key) {
                return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, prop), { no: key });
            });
        });
    };
    FacilitiesListComponent.prototype.entriesChange = function ($event) {
        this.tableEntries = $event.target.value;
    };
    FacilitiesListComponent.prototype.filterTable = function ($event) {
        var val = $event.target.value;
        this.tableTemp = this.tableRows.filter(function (d) {
            for (var key in d) {
                if (d[key]
                    .toString()
                    .toLowerCase()
                    .indexOf(val.toString().toLowerCase()) !== -1) {
                    return true;
                }
            }
            return false;
        });
    };
    FacilitiesListComponent.prototype.onSelect = function (_a) {
        var _b;
        var selected = _a.selected;
        this.tableSelected.splice(0, this.tableSelected.length);
        (_b = this.tableSelected).push.apply(_b, selected);
    };
    FacilitiesListComponent.prototype.onActivate = function (event) {
        this.tableActiveRow = event.row;
    };
    FacilitiesListComponent.prototype.openModal = function (modalRef, process, row) {
        if (process == "create") {
            this.showingFormGroup.reset();
        }
        else if (process == "update") {
            this.showingFormGroup.patchValue(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, row), { asset_id: row.asset_id.id, venue_id: row.venue_id.id, user_id: row.user_id.id }));
        }
        this.modal = this.modalService.show(modalRef, this.modalConfig);
    };
    FacilitiesListComponent.prototype.closeModal = function () {
        this.modal.hide();
    };
    FacilitiesListComponent.prototype.create = function () {
        var _this = this;
        this.facilityService.post(this.showingFormGroup.value).subscribe(function (res) {
            console.log("res", res);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Berjaya",
                text: "Data anda berjaya disimpan.",
                type: "success",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
            })
                .then(function (result) {
                if (result.value) {
                    _this.modal.hide();
                    _this.getData();
                }
            });
        }, function (err) {
            console.error("err", err);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Ralat",
                text: "Data anda tidak berjaya disimpan. Sila cuba lagi",
                type: "warning",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-warning",
            })
                .then(function (result) {
                if (result.value) {
                    // this.modal.hide();
                }
            });
        });
    };
    FacilitiesListComponent.prototype.update = function () {
        var _this = this;
        this.facilityService
            .update(this.showingFormGroup.value, this.showingFormGroup.value.id)
            .subscribe(function (res) {
            console.log("res", res);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Berjaya",
                text: "Data anda berjaya dikemaskini.",
                type: "success",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
            })
                .then(function (result) {
                if (result.value) {
                    _this.modal.hide();
                    _this.getData();
                }
            });
        }, function (err) {
            console.error("err", err);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Ralat",
                text: "Data anda tidak berjaya dikemaskini. Sila cuba lagi",
                type: "warning",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-warning",
            })
                .then(function (result) {
                if (result.value) {
                    // this.modal.hide();
                }
            });
        });
    };
    FacilitiesListComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
        { type: ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__["BsModalService"] },
        { type: src_app_shared_services_facilities_facilities_service__WEBPACK_IMPORTED_MODULE_5__["FacilitiesService"] },
        { type: src_app_shared_services_assets_assets_service__WEBPACK_IMPORTED_MODULE_6__["AssetsService"] },
        { type: src_app_shared_services_users_users_service__WEBPACK_IMPORTED_MODULE_7__["UsersService"] },
        { type: src_app_shared_services_venues_venues_service__WEBPACK_IMPORTED_MODULE_8__["VenuesService"] }
    ]; };
    FacilitiesListComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-facilities-list",
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./facilities-list.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/facilities/facilities-list/facilities-list.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./facilities-list.component.scss */ "./src/app/core/user/facilities/facilities-list/facilities-list.component.scss")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__["BsModalService"],
            src_app_shared_services_facilities_facilities_service__WEBPACK_IMPORTED_MODULE_5__["FacilitiesService"],
            src_app_shared_services_assets_assets_service__WEBPACK_IMPORTED_MODULE_6__["AssetsService"],
            src_app_shared_services_users_users_service__WEBPACK_IMPORTED_MODULE_7__["UsersService"],
            src_app_shared_services_venues_venues_service__WEBPACK_IMPORTED_MODULE_8__["VenuesService"]])
    ], FacilitiesListComponent);
    return FacilitiesListComponent;
}());



/***/ }),

/***/ "./src/app/core/user/feedbacks/feedbacks-list/feedbacks-list.component.scss":
/*!**********************************************************************************!*\
  !*** ./src/app/core/user/feedbacks/feedbacks-list/feedbacks-list.component.scss ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvcmUvdXNlci9mZWVkYmFja3MvZmVlZGJhY2tzLWxpc3QvZmVlZGJhY2tzLWxpc3QuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/core/user/feedbacks/feedbacks-list/feedbacks-list.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/core/user/feedbacks/feedbacks-list/feedbacks-list.component.ts ***!
  \********************************************************************************/
/*! exports provided: SelectionType, FeedbacksListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectionType", function() { return SelectionType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeedbacksListComponent", function() { return FeedbacksListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm5/forms.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/__ivy_ngcc__/esm5/ngx-bootstrap.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var src_app_shared_services_feedbacks_feedbacks_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/shared/services/feedbacks/feedbacks.service */ "./src/app/shared/services/feedbacks/feedbacks.service.ts");
/* harmony import */ var src_app_shared_services_users_users_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/shared/services/users/users.service */ "./src/app/shared/services/users/users.service.ts");







var SelectionType;
(function (SelectionType) {
    SelectionType["single"] = "single";
    SelectionType["multi"] = "multi";
    SelectionType["multiClick"] = "multiClick";
    SelectionType["cell"] = "cell";
    SelectionType["checkbox"] = "checkbox";
})(SelectionType || (SelectionType = {}));
var FeedbacksListComponent = /** @class */ (function () {
    function FeedbacksListComponent(formBuilder, modalService, feedbackService, userService) {
        this.formBuilder = formBuilder;
        this.modalService = modalService;
        this.feedbackService = feedbackService;
        this.userService = userService;
        // Table
        this.tableEntries = 5;
        this.tableSelected = [];
        this.tableTemp = [];
        this.tableRows = [];
        this.SelectionType = SelectionType;
        this.modalConfig = {
            keyboard: true,
            class: "modal-dialog-centered",
        };
        // Dropdown
        this.users = [];
        this.getUser();
        this.feedbackFormGroup = this.formBuilder.group({
            id: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            comment: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            user_id: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
        });
    }
    FeedbacksListComponent.prototype.getUser = function () {
        var _this = this;
        this.userService.getAll().subscribe(function (res) {
            console.log("res", res);
            _this.users = res;
        }, function (err) {
            console.error("err", err);
        });
    };
    FeedbacksListComponent.prototype.ngOnInit = function () {
        this.getData();
    };
    FeedbacksListComponent.prototype.getData = function () {
        var _this = this;
        this.feedbackService.extended().subscribe(function (res) {
            _this.tableRows = res;
            _this.tableTemp = _this.tableRows.map(function (prop, key) {
                return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, prop), { no: key });
            });
        });
    };
    FeedbacksListComponent.prototype.entriesChange = function ($event) {
        this.tableEntries = $event.target.value;
    };
    FeedbacksListComponent.prototype.filterTable = function ($event) {
        var val = $event.target.value;
        this.tableTemp = this.tableRows.filter(function (d) {
            for (var key in d) {
                if (d[key]
                    .toString()
                    .toLowerCase()
                    .indexOf(val.toString().toLowerCase()) !== -1) {
                    return true;
                }
            }
            return false;
        });
    };
    FeedbacksListComponent.prototype.onSelect = function (_a) {
        var _b;
        var selected = _a.selected;
        this.tableSelected.splice(0, this.tableSelected.length);
        (_b = this.tableSelected).push.apply(_b, selected);
    };
    FeedbacksListComponent.prototype.onActivate = function (event) {
        this.tableActiveRow = event.row;
    };
    FeedbacksListComponent.prototype.openModal = function (modalRef, process, row) {
        if (process == "create") {
            this.feedbackFormGroup.reset();
        }
        else if (process == "update") {
            this.feedbackFormGroup.patchValue(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, row), { user_id: row.user_id.id }));
        }
        this.modal = this.modalService.show(modalRef, this.modalConfig);
    };
    FeedbacksListComponent.prototype.closeModal = function () {
        this.modal.hide();
    };
    FeedbacksListComponent.prototype.create = function () {
        var _this = this;
        this.feedbackService.post(this.feedbackFormGroup.value).subscribe(function (res) {
            console.log("res", res);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Berjaya",
                text: "Data anda berjaya disimpan.",
                type: "success",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
            })
                .then(function (result) {
                if (result.value) {
                    _this.modal.hide();
                    _this.getData();
                }
            });
        }, function (err) {
            console.error("err", err);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Ralat",
                text: "Data anda tidak berjaya disimpan. Sila cuba lagi",
                type: "warning",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-warning",
            })
                .then(function (result) {
                if (result.value) {
                    // this.modal.hide();
                }
            });
        });
    };
    FeedbacksListComponent.prototype.update = function () {
        var _this = this;
        this.feedbackService
            .update(this.feedbackFormGroup.value, this.feedbackFormGroup.value.id)
            .subscribe(function (res) {
            console.log("res", res);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Berjaya",
                text: "Data anda berjaya dikemaskini.",
                type: "success",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
            })
                .then(function (result) {
                if (result.value) {
                    _this.modal.hide();
                    _this.getData();
                }
            });
        }, function (err) {
            console.error("err", err);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Ralat",
                text: "Data anda tidak berjaya dikemaskini. Sila cuba lagi",
                type: "warning",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-warning",
            })
                .then(function (result) {
                if (result.value) {
                    // this.modal.hide();
                }
            });
        });
    };
    FeedbacksListComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
        { type: ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__["BsModalService"] },
        { type: src_app_shared_services_feedbacks_feedbacks_service__WEBPACK_IMPORTED_MODULE_5__["FeedbacksService"] },
        { type: src_app_shared_services_users_users_service__WEBPACK_IMPORTED_MODULE_6__["UsersService"] }
    ]; };
    FeedbacksListComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-feedbacks-list",
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./feedbacks-list.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/feedbacks/feedbacks-list/feedbacks-list.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./feedbacks-list.component.scss */ "./src/app/core/user/feedbacks/feedbacks-list/feedbacks-list.component.scss")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__["BsModalService"],
            src_app_shared_services_feedbacks_feedbacks_service__WEBPACK_IMPORTED_MODULE_5__["FeedbacksService"],
            src_app_shared_services_users_users_service__WEBPACK_IMPORTED_MODULE_6__["UsersService"]])
    ], FeedbacksListComponent);
    return FeedbacksListComponent;
}());



/***/ }),

/***/ "./src/app/core/user/managements/users/users.component.scss":
/*!******************************************************************!*\
  !*** ./src/app/core/user/managements/users/users.component.scss ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvcmUvdXNlci9tYW5hZ2VtZW50cy91c2Vycy91c2Vycy5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/core/user/managements/users/users.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/core/user/managements/users/users.component.ts ***!
  \****************************************************************/
/*! exports provided: SelectionType, UsersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectionType", function() { return SelectionType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersComponent", function() { return UsersComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm5/forms.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/__ivy_ngcc__/esm5/ngx-bootstrap.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var src_app_shared_services_users_users_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/shared/services/users/users.service */ "./src/app/shared/services/users/users.service.ts");
/* harmony import */ var src_app_shared_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/shared/services/auth/auth.service */ "./src/app/shared/services/auth/auth.service.ts");







var SelectionType;
(function (SelectionType) {
    SelectionType["single"] = "single";
    SelectionType["multi"] = "multi";
    SelectionType["multiClick"] = "multiClick";
    SelectionType["cell"] = "cell";
    SelectionType["checkbox"] = "checkbox";
})(SelectionType || (SelectionType = {}));
var UsersComponent = /** @class */ (function () {
    function UsersComponent(formBuilder, modalService, userService, authService) {
        this.formBuilder = formBuilder;
        this.modalService = modalService;
        this.userService = userService;
        this.authService = authService;
        // Table
        this.tableEntries = 5;
        this.tableSelected = [];
        this.tableTemp = [];
        this.tableRows = [];
        this.SelectionType = SelectionType;
        this.modalConfig = {
            keyboard: true,
            class: "modal-dialog-centered",
        };
        // Dropdown
        this.usertypes = [
            {
                value: "SA",
                display_name: "Super Admin",
            },
            {
                value: "AD",
                display_name: "Admin",
            },
            {
                value: "AF",
                display_name: "Admin Finance",
            },
            {
                value: "AL",
                display_name: "Admin Lawatan",
            },
            {
                value: "AP",
                display_name: "Admin Pameran",
            },
            {
                value: "AG",
                display_name: "Admin Program",
            },
            {
                value: "HC",
                display_name: "Head Counter",
            },
            {
                value: "AM",
                display_name: "Admin Maklum Balas",
            },
            {
                value: "CS",
                display_name: "Customer",
            },
        ];
        this.userFormGroup = this.formBuilder.group({
            id: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            full_name: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            // nric: new FormControl(""),
            // nric_picture: new FormControl(""),
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            phone: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            // birth_date: new FormControl(""),
            // age: new FormControl(""),
            address: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            postcode: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            city: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            state: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            country: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            user_type: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            is_active: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](false),
            // gender_type: new FormControl(""),
            // race_type: new FormControl(""),
            username: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            password1: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            password2: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
        });
    }
    UsersComponent.prototype.ngOnInit = function () {
        this.getData();
    };
    UsersComponent.prototype.getData = function () {
        var _this = this;
        this.userService.getAll().subscribe(function (res) {
            _this.tableRows = res;
            _this.tableTemp = _this.tableRows.map(function (prop, key) {
                return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, prop), { no: key });
            });
        });
    };
    UsersComponent.prototype.entriesChange = function ($event) {
        this.tableEntries = $event.target.value;
    };
    UsersComponent.prototype.filterTable = function ($event) {
        var val = $event.target.value;
        this.tableTemp = this.tableRows.filter(function (d) {
            for (var key in d) {
                if (d[key]
                    .toString()
                    .toLowerCase()
                    .indexOf(val.toString().toLowerCase()) !== -1) {
                    return true;
                }
            }
            return false;
        });
    };
    UsersComponent.prototype.onSelect = function (_a) {
        var _b;
        var selected = _a.selected;
        this.tableSelected.splice(0, this.tableSelected.length);
        (_b = this.tableSelected).push.apply(_b, selected);
    };
    UsersComponent.prototype.onActivate = function (event) {
        this.tableActiveRow = event.row;
    };
    UsersComponent.prototype.openModal = function (modalRef, process, row) {
        if (process == "create") {
            this.userFormGroup.reset();
        }
        else if (process == "update") {
            this.userFormGroup.patchValue(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, row));
        }
        this.modal = this.modalService.show(modalRef, this.modalConfig);
    };
    UsersComponent.prototype.closeModal = function () {
        this.modal.hide();
    };
    UsersComponent.prototype.create = function () {
        var _this = this;
        this.userFormGroup.value.password1 = "planetarium@2020";
        this.userFormGroup.value.password2 = "planetarium@2020";
        this.authService.register(this.userFormGroup.value).subscribe(function (res) {
            console.log("res", res);
            if (res) {
                _this.userService
                    .update(res.user.pk, _this.userFormGroup.value)
                    .subscribe(function (res) {
                    console.log("res", res);
                    sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                        .fire({
                        title: "Berjaya",
                        text: "Data anda berjaya disimpan.",
                        type: "success",
                        buttonsStyling: false,
                        confirmButtonClass: "btn btn-success",
                    })
                        .then(function (result) {
                        if (result.value) {
                            _this.modal.hide();
                            _this.getData();
                        }
                    });
                }, function (err) {
                    console.error("err", err);
                    sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                        .fire({
                        title: "Ralat",
                        text: "Data anda tidak berjaya disimpan. Sila cuba lagi",
                        type: "warning",
                        buttonsStyling: false,
                        confirmButtonClass: "btn btn-warning",
                    })
                        .then(function (result) {
                        if (result.value) {
                            // this.modal.hide();
                        }
                    });
                });
            }
        }, function (err) {
            console.error("err", err);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Ralat",
                text: "Data anda tidak berjaya disimpan. Sila cuba lagi",
                type: "warning",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-warning",
            })
                .then(function (result) {
                if (result.value) {
                    // this.modal.hide();
                }
            });
        });
    };
    UsersComponent.prototype.update = function () {
        var _this = this;
        this.userService
            .update(this.userFormGroup.value, this.userFormGroup.value.id)
            .subscribe(function (res) {
            console.log("res", res);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Berjaya",
                text: "Data anda berjaya dikemaskini.",
                type: "success",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
            })
                .then(function (result) {
                if (result.value) {
                    _this.modal.hide();
                    _this.getData();
                }
            });
        }, function (err) {
            console.error("err", err);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Ralat",
                text: "Data anda tidak berjaya dikemaskini. Sila cuba lagi",
                type: "warning",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-warning",
            })
                .then(function (result) {
                if (result.value) {
                    // this.modal.hide();
                }
            });
        });
    };
    UsersComponent.prototype.getUserType = function (value) {
        var result = this.usertypes.find(function (obj) {
            return obj.value == value;
        });
        return result.display_name;
    };
    UsersComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
        { type: ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__["BsModalService"] },
        { type: src_app_shared_services_users_users_service__WEBPACK_IMPORTED_MODULE_5__["UsersService"] },
        { type: src_app_shared_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_6__["AuthService"] }
    ]; };
    UsersComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-users",
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./users.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/managements/users/users.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./users.component.scss */ "./src/app/core/user/managements/users/users.component.scss")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__["BsModalService"],
            src_app_shared_services_users_users_service__WEBPACK_IMPORTED_MODULE_5__["UsersService"],
            src_app_shared_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_6__["AuthService"]])
    ], UsersComponent);
    return UsersComponent;
}());



/***/ }),

/***/ "./src/app/core/user/programs/programs-application/programs-application.component.scss":
/*!*********************************************************************************************!*\
  !*** ./src/app/core/user/programs/programs-application/programs-application.component.scss ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvcmUvdXNlci9wcm9ncmFtcy9wcm9ncmFtcy1hcHBsaWNhdGlvbi9wcm9ncmFtcy1hcHBsaWNhdGlvbi5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/core/user/programs/programs-application/programs-application.component.ts":
/*!*******************************************************************************************!*\
  !*** ./src/app/core/user/programs/programs-application/programs-application.component.ts ***!
  \*******************************************************************************************/
/*! exports provided: SelectionType, ProgramsApplicationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectionType", function() { return SelectionType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProgramsApplicationComponent", function() { return ProgramsApplicationComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm5/forms.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/__ivy_ngcc__/esm5/ngx-bootstrap.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var src_app_shared_services_educational_program_applications_educational_program_applications_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/shared/services/educational-program-applications/educational-program-applications.service */ "./src/app/shared/services/educational-program-applications/educational-program-applications.service.ts");
/* harmony import */ var src_app_shared_services_educational_programs_educational_programs_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/shared/services/educational-programs/educational-programs.service */ "./src/app/shared/services/educational-programs/educational-programs.service.ts");
/* harmony import */ var src_app_shared_services_educational_program_dates_educational_program_dates_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/shared/services/educational-program-dates/educational-program-dates.service */ "./src/app/shared/services/educational-program-dates/educational-program-dates.service.ts");
/* harmony import */ var src_app_shared_services_users_users_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/shared/services/users/users.service */ "./src/app/shared/services/users/users.service.ts");









var SelectionType;
(function (SelectionType) {
    SelectionType["single"] = "single";
    SelectionType["multi"] = "multi";
    SelectionType["multiClick"] = "multiClick";
    SelectionType["cell"] = "cell";
    SelectionType["checkbox"] = "checkbox";
})(SelectionType || (SelectionType = {}));
var ProgramsApplicationComponent = /** @class */ (function () {
    function ProgramsApplicationComponent(formBuilder, modalService, eduprogramappService, eduprogramService, eduprogramdateService, userService) {
        this.formBuilder = formBuilder;
        this.modalService = modalService;
        this.eduprogramappService = eduprogramappService;
        this.eduprogramService = eduprogramService;
        this.eduprogramdateService = eduprogramdateService;
        this.userService = userService;
        // Table
        this.tableEntries = 5;
        this.tableSelected = [];
        this.tableTemp = [];
        this.tableRows = [];
        this.SelectionType = SelectionType;
        this.modalConfig = {
            keyboard: true,
            class: "modal-dialog-centered",
        };
        // Dropdown
        this.organisationcategories = [
            {
                value: "GV",
                display_name: "Government",
            },
            {
                value: "SC",
                display_name: "School",
            },
            {
                value: "UN",
                display_name: "University",
            },
            {
                value: "NA",
                display_name: "Not Available",
            },
        ];
        this.statuses = [
            {
                value: "AP",
                display_name: "Diterima",
            },
            {
                value: "IP",
                display_name: "Dalam proses",
            },
            {
                value: "RJ",
                display_name: "Ditolak",
            },
        ];
        this.programs = [];
        this.programdates = [];
        this.users = [];
        this.selectedProgramDates = [];
        this.getProgram();
        this.getProgramDate();
        this.getUser();
        this.eduprogramappFormGroup = this.formBuilder.group({
            id: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            organisation_name: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            organisation_category: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            customer_id: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            educational_program_id: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            educational_program_date_id: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            participant: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            status: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
        });
    }
    ProgramsApplicationComponent.prototype.getProgram = function () {
        var _this = this;
        this.eduprogramService.getAll().subscribe(function (res) {
            console.log("res", res);
            _this.programs = res;
        }, function (err) {
            console.error("err", err);
        });
    };
    ProgramsApplicationComponent.prototype.getProgramDate = function () {
        var _this = this;
        this.eduprogramdateService.getAll().subscribe(function (res) {
            console.log("res", res);
            _this.programdates = res;
        }, function (err) {
            console.error("err", err);
        });
    };
    ProgramsApplicationComponent.prototype.getUser = function () {
        var _this = this;
        this.userService.getAll().subscribe(function (res) {
            console.log("res", res);
            _this.users = res;
        }, function (err) {
            console.error("err", err);
        });
    };
    ProgramsApplicationComponent.prototype.ngOnInit = function () {
        // this.getCharts()
        this.getData();
    };
    ProgramsApplicationComponent.prototype.getData = function () {
        var _this = this;
        this.eduprogramappService.extended().subscribe(function (res) {
            console.log("res", res);
            _this.tableRows = res;
            _this.tableTemp = _this.tableRows.map(function (prop, key) {
                return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, prop), { no: key });
            });
        });
    };
    ProgramsApplicationComponent.prototype.entriesChange = function ($event) {
        this.tableEntries = $event.target.value;
    };
    ProgramsApplicationComponent.prototype.filterTable = function ($event) {
        var val = $event.target.value;
        this.tableTemp = this.tableRows.filter(function (d) {
            for (var key in d) {
                if (d[key]
                    .toString()
                    .toLowerCase()
                    .indexOf(val.toString().toLowerCase()) !== -1) {
                    return true;
                }
            }
            return false;
        });
    };
    ProgramsApplicationComponent.prototype.onSelect = function (_a) {
        var _b;
        var selected = _a.selected;
        this.tableSelected.splice(0, this.tableSelected.length);
        (_b = this.tableSelected).push.apply(_b, selected);
    };
    ProgramsApplicationComponent.prototype.onActivate = function (event) {
        this.tableActiveRow = event.row;
    };
    ProgramsApplicationComponent.prototype.openModal = function (modalRef, process, row) {
        if (process == "create") {
            this.eduprogramappFormGroup.reset();
        }
        else if (process == "update") {
            this.eduprogramappFormGroup.patchValue(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, row), { customer_id: row.customer_id.id, educational_program_id: row.educational_program_id.id, educational_program_date_id: row.educational_program_date_id.id }));
            this.changeProgram();
        }
        this.modal = this.modalService.show(modalRef, this.modalConfig);
    };
    ProgramsApplicationComponent.prototype.closeModal = function () {
        this.modal.hide();
    };
    ProgramsApplicationComponent.prototype.create = function () {
        var _this = this;
        this.eduprogramappService.post(this.eduprogramappFormGroup.value).subscribe(function (res) {
            console.log("res", res);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Berjaya",
                text: "Data anda berjaya disimpan.",
                type: "success",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
            })
                .then(function (result) {
                if (result.value) {
                    _this.modal.hide();
                    _this.getData();
                }
            });
        }, function (err) {
            console.error("err", err);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Ralat",
                text: "Data anda tidak berjaya disimpan. Sila cuba lagi",
                type: "warning",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-warning",
            })
                .then(function (result) {
                if (result.value) {
                    // this.modal.hide();
                }
            });
        });
    };
    ProgramsApplicationComponent.prototype.update = function () {
        var _this = this;
        this.eduprogramappService
            .update(this.eduprogramappFormGroup.value, this.eduprogramappFormGroup.value.id)
            .subscribe(function (res) {
            console.log("res", res);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Berjaya",
                text: "Data anda berjaya dikemaskini.",
                type: "success",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
            })
                .then(function (result) {
                if (result.value) {
                    _this.modal.hide();
                    _this.getData();
                }
            });
        }, function (err) {
            console.error("err", err);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Ralat",
                text: "Data anda tidak berjaya dikemaskini. Sila cuba lagi",
                type: "warning",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-warning",
            })
                .then(function (result) {
                if (result.value) {
                    // this.modal.hide();
                }
            });
        });
    };
    ProgramsApplicationComponent.prototype.changeProgram = function () {
        var _this = this;
        this.selectedProgramDates = this.programdates.filter(function (obj) {
            return (obj.program_id ==
                _this.eduprogramappFormGroup.value.educational_program_id);
        });
    };
    ProgramsApplicationComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
        { type: ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__["BsModalService"] },
        { type: src_app_shared_services_educational_program_applications_educational_program_applications_service__WEBPACK_IMPORTED_MODULE_5__["EducationalProgramApplicationsService"] },
        { type: src_app_shared_services_educational_programs_educational_programs_service__WEBPACK_IMPORTED_MODULE_6__["EducationalProgramsService"] },
        { type: src_app_shared_services_educational_program_dates_educational_program_dates_service__WEBPACK_IMPORTED_MODULE_7__["EducationalProgramDatesService"] },
        { type: src_app_shared_services_users_users_service__WEBPACK_IMPORTED_MODULE_8__["UsersService"] }
    ]; };
    ProgramsApplicationComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-programs-application",
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./programs-application.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/programs/programs-application/programs-application.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./programs-application.component.scss */ "./src/app/core/user/programs/programs-application/programs-application.component.scss")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__["BsModalService"],
            src_app_shared_services_educational_program_applications_educational_program_applications_service__WEBPACK_IMPORTED_MODULE_5__["EducationalProgramApplicationsService"],
            src_app_shared_services_educational_programs_educational_programs_service__WEBPACK_IMPORTED_MODULE_6__["EducationalProgramsService"],
            src_app_shared_services_educational_program_dates_educational_program_dates_service__WEBPACK_IMPORTED_MODULE_7__["EducationalProgramDatesService"],
            src_app_shared_services_users_users_service__WEBPACK_IMPORTED_MODULE_8__["UsersService"]])
    ], ProgramsApplicationComponent);
    return ProgramsApplicationComponent;
}());



/***/ }),

/***/ "./src/app/core/user/programs/programs-list/programs-list.component.scss":
/*!*******************************************************************************!*\
  !*** ./src/app/core/user/programs/programs-list/programs-list.component.scss ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvcmUvdXNlci9wcm9ncmFtcy9wcm9ncmFtcy1saXN0L3Byb2dyYW1zLWxpc3QuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/core/user/programs/programs-list/programs-list.component.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/core/user/programs/programs-list/programs-list.component.ts ***!
  \*****************************************************************************/
/*! exports provided: SelectionType, ProgramsListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectionType", function() { return SelectionType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProgramsListComponent", function() { return ProgramsListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm5/forms.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/__ivy_ngcc__/esm5/ngx-bootstrap.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var src_app_shared_services_educational_programs_educational_programs_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/shared/services/educational-programs/educational-programs.service */ "./src/app/shared/services/educational-programs/educational-programs.service.ts");
/* harmony import */ var src_app_shared_services_educational_program_dates_educational_program_dates_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/shared/services/educational-program-dates/educational-program-dates.service */ "./src/app/shared/services/educational-program-dates/educational-program-dates.service.ts");
/* harmony import */ var src_app_shared_services_users_users_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/shared/services/users/users.service */ "./src/app/shared/services/users/users.service.ts");
/* harmony import */ var src_app_shared_services_venues_venues_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/shared/services/venues/venues.service */ "./src/app/shared/services/venues/venues.service.ts");









var SelectionType;
(function (SelectionType) {
    SelectionType["single"] = "single";
    SelectionType["multi"] = "multi";
    SelectionType["multiClick"] = "multiClick";
    SelectionType["cell"] = "cell";
    SelectionType["checkbox"] = "checkbox";
})(SelectionType || (SelectionType = {}));
var ProgramsListComponent = /** @class */ (function () {
    function ProgramsListComponent(formBuilder, modalService, eduprogramService, eduprogramdateService, userService, venueService) {
        this.formBuilder = formBuilder;
        this.modalService = modalService;
        this.eduprogramService = eduprogramService;
        this.eduprogramdateService = eduprogramdateService;
        this.userService = userService;
        this.venueService = venueService;
        // Data
        this.eduprogramdates = [];
        // Table
        this.tableEntries = 5;
        this.tableSelected = [];
        this.tableTemp = [];
        this.tableRows = [];
        this.SelectionType = SelectionType;
        this.modalConfig = {
            keyboard: true,
            class: "modal-dialog-centered",
        };
        // Dropdown
        this.programtypes = [
            {
                value: "PL",
                display_name: "Public",
            },
            {
                value: "PV",
                display_name: "Private",
            },
        ];
        this.programcategories = [
            {
                value: "P1",
                display_name: "PROGRAM PEMBANGUNAN MURID/GURU",
            },
            {
                value: "P2",
                display_name: "PROGRAM PENCERAPAN",
            },
            {
                value: "P3",
                display_name: "PROGRAM KHAS",
            },
            {
                value: "P4",
                display_name: "PROGRAM KEBANGSAAN",
            },
            {
                value: "P5",
                display_name: "PROGRAM ANTARABANGSA",
            },
            {
                value: "P6",
                display_name: "PROGRAM/RAKAN KERJASAMA",
            },
            {
                value: "P7",
                display_name: "PROGRAM JANGKAUAN (6 ZON)",
            },
            {
                value: "P8",
                display_name: "SEMINAR, CERAMAH, PLANETARIUM TALKS",
            },
            {
                value: "NA",
                display_name: "Not Available",
            },
        ];
        this.users = [];
        this.venues = [];
        this.getUser();
        this.getVenue();
        this.eduprogramFormGroup = this.formBuilder.group({
            id: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            title: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            description: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            program_type: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            program_category: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            program_opento: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            min_participant: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            max_participant: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            price: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](0),
            // poster_link: new FormControl(""),
            // website_link: new FormControl(""),
            venue_id: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            coordinator_id: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            status: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
        });
        this.eduprogramdateFormGroup = this.formBuilder.group({
            id: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            program_date: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            program_id: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
        });
    }
    ProgramsListComponent.prototype.getUser = function () {
        var _this = this;
        this.userService.getAll().subscribe(function (res) {
            console.log("res", res);
            _this.users = res;
        }, function (err) {
            console.error("err", err);
        });
    };
    ProgramsListComponent.prototype.getVenue = function () {
        var _this = this;
        this.venueService.get().subscribe(function (res) {
            console.log("res", res);
            _this.venues = res;
        }, function (err) {
            console.error("err", err);
        });
    };
    ProgramsListComponent.prototype.ngOnInit = function () {
        this.getData();
    };
    ProgramsListComponent.prototype.getData = function () {
        var _this = this;
        this.eduprogramService.getAll().subscribe(function (res) {
            _this.tableRows = res;
            _this.tableTemp = _this.tableRows.map(function (prop, key) {
                return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, prop), { no: key });
            });
        });
    };
    ProgramsListComponent.prototype.entriesChange = function ($event) {
        this.tableEntries = $event.target.value;
    };
    ProgramsListComponent.prototype.filterTable = function ($event) {
        var val = $event.target.value;
        this.tableTemp = this.tableRows.filter(function (d) {
            for (var key in d) {
                if (d[key]
                    .toString()
                    .toLowerCase()
                    .indexOf(val.toString().toLowerCase()) !== -1) {
                    return true;
                }
            }
            return false;
        });
    };
    ProgramsListComponent.prototype.onSelect = function (_a) {
        var _b;
        var selected = _a.selected;
        this.tableSelected.splice(0, this.tableSelected.length);
        (_b = this.tableSelected).push.apply(_b, selected);
    };
    ProgramsListComponent.prototype.onActivate = function (event) {
        this.tableActiveRow = event.row;
    };
    ProgramsListComponent.prototype.openModal = function (modalRef, process, row) {
        var _this = this;
        if (process == "create") {
            this.eduprogramFormGroup.reset();
        }
        else if (process == "update") {
            this.eduprogramFormGroup.patchValue(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, row));
        }
        else if (process == "createupdate") {
            this.eduprogramdateService.filter("program_id=" + row.id).subscribe(function (res) {
                console.log("res", res);
                _this.eduprogramdates = res;
            }, function (err) {
                console.error("err", err);
            });
            this.eduprogramdateFormGroup.patchValue({
                program_id: row.id,
            });
        }
        this.modal = this.modalService.show(modalRef, this.modalConfig);
    };
    ProgramsListComponent.prototype.closeModal = function () {
        this.modal.hide();
    };
    ProgramsListComponent.prototype.create = function () {
        var _this = this;
        this.eduprogramService.create(this.eduprogramFormGroup.value).subscribe(function (res) {
            console.log("res", res);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Berjaya",
                text: "Data anda berjaya disimpan.",
                type: "success",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
            })
                .then(function (result) {
                if (result.value) {
                    _this.modal.hide();
                    _this.getData();
                }
            });
        }, function (err) {
            console.error("err", err);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Ralat",
                text: "Data anda tidak berjaya disimpan. Sila cuba lagi",
                type: "warning",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-warning",
            })
                .then(function (result) {
                if (result.value) {
                    // this.modal.hide();
                }
            });
        });
    };
    ProgramsListComponent.prototype.update = function () {
        var _this = this;
        this.eduprogramService
            .update(this.eduprogramFormGroup.value, this.eduprogramFormGroup.value.id)
            .subscribe(function (res) {
            console.log("res", res);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Berjaya",
                text: "Data anda berjaya dikemaskini.",
                type: "success",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
            })
                .then(function (result) {
                if (result.value) {
                    _this.modal.hide();
                    _this.getData();
                }
            });
        }, function (err) {
            console.error("err", err);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Ralat",
                text: "Data anda tidak berjaya dikemaskini. Sila cuba lagi",
                type: "warning",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-warning",
            })
                .then(function (result) {
                if (result.value) {
                    // this.modal.hide();
                }
            });
        });
    };
    ProgramsListComponent.prototype.createupdatedate = function () {
        var _this = this;
        this.eduprogramdateService
            .create(this.eduprogramdateFormGroup.value)
            .subscribe(function (res) {
            console.log("res", res);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Berjaya",
                text: "Data anda berjaya disimpan.",
                type: "success",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
            })
                .then(function (result) {
                if (result.value) {
                    _this.modal.hide();
                    _this.getData();
                }
            });
        }, function (err) {
            console.error("err", err);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Ralat",
                text: "Data anda tidak berjaya disimpan. Sila cuba lagi",
                type: "warning",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-warning",
            })
                .then(function (result) {
                if (result.value) {
                    // this.modal.hide();
                }
            });
        });
    };
    ProgramsListComponent.prototype.getType = function (value) {
        var result = this.programtypes.find(function (obj) {
            return obj.value == value;
        });
        return result.display_name;
    };
    ProgramsListComponent.prototype.getCategory = function (value) {
        var result = this.programcategories.find(function (obj) {
            return obj.value == value;
        });
        return result.display_name;
    };
    ProgramsListComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
        { type: ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__["BsModalService"] },
        { type: src_app_shared_services_educational_programs_educational_programs_service__WEBPACK_IMPORTED_MODULE_5__["EducationalProgramsService"] },
        { type: src_app_shared_services_educational_program_dates_educational_program_dates_service__WEBPACK_IMPORTED_MODULE_6__["EducationalProgramDatesService"] },
        { type: src_app_shared_services_users_users_service__WEBPACK_IMPORTED_MODULE_7__["UsersService"] },
        { type: src_app_shared_services_venues_venues_service__WEBPACK_IMPORTED_MODULE_8__["VenuesService"] }
    ]; };
    ProgramsListComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-programs-list",
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./programs-list.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/programs/programs-list/programs-list.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./programs-list.component.scss */ "./src/app/core/user/programs/programs-list/programs-list.component.scss")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__["BsModalService"],
            src_app_shared_services_educational_programs_educational_programs_service__WEBPACK_IMPORTED_MODULE_5__["EducationalProgramsService"],
            src_app_shared_services_educational_program_dates_educational_program_dates_service__WEBPACK_IMPORTED_MODULE_6__["EducationalProgramDatesService"],
            src_app_shared_services_users_users_service__WEBPACK_IMPORTED_MODULE_7__["UsersService"],
            src_app_shared_services_venues_venues_service__WEBPACK_IMPORTED_MODULE_8__["VenuesService"]])
    ], ProgramsListComponent);
    return ProgramsListComponent;
}());



/***/ }),

/***/ "./src/app/core/user/programs/programs-waiting-list/programs-waiting-list.component.scss":
/*!***********************************************************************************************!*\
  !*** ./src/app/core/user/programs/programs-waiting-list/programs-waiting-list.component.scss ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvcmUvdXNlci9wcm9ncmFtcy9wcm9ncmFtcy13YWl0aW5nLWxpc3QvcHJvZ3JhbXMtd2FpdGluZy1saXN0LmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/core/user/programs/programs-waiting-list/programs-waiting-list.component.ts":
/*!*********************************************************************************************!*\
  !*** ./src/app/core/user/programs/programs-waiting-list/programs-waiting-list.component.ts ***!
  \*********************************************************************************************/
/*! exports provided: ProgramsWaitingListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProgramsWaitingListComponent", function() { return ProgramsWaitingListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");


var ProgramsWaitingListComponent = /** @class */ (function () {
    function ProgramsWaitingListComponent() {
    }
    ProgramsWaitingListComponent.prototype.ngOnInit = function () {
    };
    ProgramsWaitingListComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-programs-waiting-list',
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./programs-waiting-list.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/programs/programs-waiting-list/programs-waiting-list.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./programs-waiting-list.component.scss */ "./src/app/core/user/programs/programs-waiting-list/programs-waiting-list.component.scss")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [])
    ], ProgramsWaitingListComponent);
    return ProgramsWaitingListComponent;
}());



/***/ }),

/***/ "./src/app/core/user/publications/publications-list/publications-list.component.scss":
/*!*******************************************************************************************!*\
  !*** ./src/app/core/user/publications/publications-list/publications-list.component.scss ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvcmUvdXNlci9wdWJsaWNhdGlvbnMvcHVibGljYXRpb25zLWxpc3QvcHVibGljYXRpb25zLWxpc3QuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/core/user/publications/publications-list/publications-list.component.ts":
/*!*****************************************************************************************!*\
  !*** ./src/app/core/user/publications/publications-list/publications-list.component.ts ***!
  \*****************************************************************************************/
/*! exports provided: SelectionType, PublicationsListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectionType", function() { return SelectionType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PublicationsListComponent", function() { return PublicationsListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm5/forms.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/__ivy_ngcc__/esm5/ngx-bootstrap.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var src_app_shared_services_publications_publications_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/shared/services/publications/publications.service */ "./src/app/shared/services/publications/publications.service.ts");






var SelectionType;
(function (SelectionType) {
    SelectionType["single"] = "single";
    SelectionType["multi"] = "multi";
    SelectionType["multiClick"] = "multiClick";
    SelectionType["cell"] = "cell";
    SelectionType["checkbox"] = "checkbox";
})(SelectionType || (SelectionType = {}));
var PublicationsListComponent = /** @class */ (function () {
    function PublicationsListComponent(formBuilder, modalService, publicationService) {
        this.formBuilder = formBuilder;
        this.modalService = modalService;
        this.publicationService = publicationService;
        // Table
        this.tableEntries = 5;
        this.tableSelected = [];
        this.tableTemp = [];
        this.tableRows = [];
        this.SelectionType = SelectionType;
        this.modalConfig = {
            keyboard: true,
            class: "modal-dialog-centered",
        };
        this.publicationFormGroup = this.formBuilder.group({
            id: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            title: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            abstract: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            author_name: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            publisher_name: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            published_date: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            // poster_link: new FormControl(""),
            // pdf_link: new FormControl(""),
            year: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            edition: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
        });
    }
    PublicationsListComponent.prototype.ngOnInit = function () {
        this.getData();
    };
    PublicationsListComponent.prototype.getData = function () {
        var _this = this;
        this.publicationService.get().subscribe(function (res) {
            _this.tableRows = res;
            _this.tableTemp = _this.tableRows.map(function (prop, key) {
                return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, prop), { no: key });
            });
        });
    };
    PublicationsListComponent.prototype.entriesChange = function ($event) {
        this.tableEntries = $event.target.value;
    };
    PublicationsListComponent.prototype.filterTable = function ($event) {
        var val = $event.target.value;
        this.tableTemp = this.tableRows.filter(function (d) {
            for (var key in d) {
                if (d[key]
                    .toString()
                    .toLowerCase()
                    .indexOf(val.toString().toLowerCase()) !== -1) {
                    return true;
                }
            }
            return false;
        });
    };
    PublicationsListComponent.prototype.onSelect = function (_a) {
        var _b;
        var selected = _a.selected;
        this.tableSelected.splice(0, this.tableSelected.length);
        (_b = this.tableSelected).push.apply(_b, selected);
    };
    PublicationsListComponent.prototype.onActivate = function (event) {
        this.tableActiveRow = event.row;
    };
    PublicationsListComponent.prototype.openModal = function (modalRef, process, row) {
        if (process == "create") {
            this.publicationFormGroup.reset();
        }
        else if (process == "update") {
            this.publicationFormGroup.patchValue(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, row));
        }
        this.modal = this.modalService.show(modalRef, this.modalConfig);
    };
    PublicationsListComponent.prototype.closeModal = function () {
        this.modal.hide();
    };
    PublicationsListComponent.prototype.create = function () {
        var _this = this;
        this.publicationService.post(this.publicationFormGroup.value).subscribe(function (res) {
            console.log("res", res);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Berjaya",
                text: "Data anda berjaya disimpan.",
                type: "success",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
            })
                .then(function (result) {
                if (result.value) {
                    _this.modal.hide();
                    _this.getData();
                }
            });
        }, function (err) {
            console.error("err", err);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Ralat",
                text: "Data anda tidak berjaya disimpan. Sila cuba lagi",
                type: "warning",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-warning",
            })
                .then(function (result) {
                if (result.value) {
                    // this.modal.hide();
                }
            });
        });
    };
    PublicationsListComponent.prototype.update = function () {
        var _this = this;
        this.publicationService
            .update(this.publicationFormGroup.value, this.publicationFormGroup.value.id)
            .subscribe(function (res) {
            console.log("res", res);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Berjaya",
                text: "Data anda berjaya dikemaskini.",
                type: "success",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
            })
                .then(function (result) {
                if (result.value) {
                    _this.modal.hide();
                    _this.getData();
                }
            });
        }, function (err) {
            console.error("err", err);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Ralat",
                text: "Data anda tidak berjaya dikemaskini. Sila cuba lagi",
                type: "warning",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-warning",
            })
                .then(function (result) {
                if (result.value) {
                    // this.modal.hide();
                }
            });
        });
    };
    PublicationsListComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
        { type: ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__["BsModalService"] },
        { type: src_app_shared_services_publications_publications_service__WEBPACK_IMPORTED_MODULE_5__["PublicationsService"] }
    ]; };
    PublicationsListComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-publications-list",
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./publications-list.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/publications/publications-list/publications-list.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./publications-list.component.scss */ "./src/app/core/user/publications/publications-list/publications-list.component.scss")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__["BsModalService"],
            src_app_shared_services_publications_publications_service__WEBPACK_IMPORTED_MODULE_5__["PublicationsService"]])
    ], PublicationsListComponent);
    return PublicationsListComponent;
}());



/***/ }),

/***/ "./src/app/core/user/reports/reports-analysis/reports-analysis.component.scss":
/*!************************************************************************************!*\
  !*** ./src/app/core/user/reports/reports-analysis/reports-analysis.component.scss ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvcmUvdXNlci9yZXBvcnRzL3JlcG9ydHMtYW5hbHlzaXMvcmVwb3J0cy1hbmFseXNpcy5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/core/user/reports/reports-analysis/reports-analysis.component.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/core/user/reports/reports-analysis/reports-analysis.component.ts ***!
  \**********************************************************************************/
/*! exports provided: ReportsAnalysisComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportsAnalysisComponent", function() { return ReportsAnalysisComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var src_app_shared_services_mocks_mocks_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/shared/services/mocks/mocks.service */ "./src/app/shared/services/mocks/mocks.service.ts");
/* harmony import */ var _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @amcharts/amcharts4/core */ "./node_modules/@amcharts/amcharts4/core.js");
/* harmony import */ var _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @amcharts/amcharts4/charts */ "./node_modules/@amcharts/amcharts4/charts.js");
/* harmony import */ var _amcharts_amcharts4_themes_animated__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @amcharts/amcharts4/themes/animated */ "./node_modules/@amcharts/amcharts4/themes/animated.js");






_amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_3__["useTheme"](_amcharts_amcharts4_themes_animated__WEBPACK_IMPORTED_MODULE_5__["default"]);
var ReportsAnalysisComponent = /** @class */ (function () {
    function ReportsAnalysisComponent(mockService, zone) {
        this.mockService = mockService;
        this.zone = zone;
        this.dataChart = [];
        this.dataChart2 = [];
        this.dataChart3 = [];
        // Datepicker
        this.bsDPConfig = {
            isAnimated: true,
            containerClass: 'theme-default'
        };
        this.getData();
    }
    ReportsAnalysisComponent.prototype.ngOnInit = function () {
    };
    ReportsAnalysisComponent.prototype.ngOnDestroy = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            if (_this.chart) {
                _this.chart.dispose();
            }
            if (_this.chart1) {
                _this.chart1.dispose();
            }
            if (_this.chart2) {
                _this.chart2.dispose();
            }
            if (_this.chart3) {
                _this.chart3.dispose();
            }
        });
    };
    ReportsAnalysisComponent.prototype.getData = function () {
        var _this = this;
        this.mockService.getAll('admin-report/report-data-1.json').subscribe(function (res) {
            // Success
            _this.dataChart = res;
        }, function () {
            // Unsuccess
        }, function () {
            // After
            _this.mockService.getAll('admin-report/report-data-2.json').subscribe(function (res) {
                // Success
                _this.dataChart2 = res;
            }, function () {
                // Unsuccess
            }, function () {
                // After
                _this.mockService.getAll('admin-report/report-data-3.json').subscribe(function (res) {
                    // Success
                    _this.dataChart3 = res;
                }, function () {
                    // Unsuccess
                }, function () {
                    // After
                    _this.getCharts();
                });
            });
        });
    };
    ReportsAnalysisComponent.prototype.getCharts = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.getChart();
            _this.getChart1();
            _this.getChart2();
            _this.getChart3();
        });
    };
    ReportsAnalysisComponent.prototype.getChart = function () {
        var chart = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_3__["create"]("chartdiv", _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_4__["XYChart"]);
        chart.paddingRight = 20;
        var data = this.dataChart;
        chart.data = data;
        chart.dateFormatter.inputDateFormat = "yyyy";
        var dateAxis = chart.xAxes.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_4__["DateAxis"]());
        dateAxis.renderer.minGridDistance = 50;
        dateAxis.baseInterval = { timeUnit: "year", count: 2 };
        var valueAxis = chart.yAxes.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_4__["ValueAxis"]());
        valueAxis.tooltip.disabled = true;
        var series = chart.series.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_4__["StepLineSeries"]());
        series.dataFields.dateX = "year";
        series.dataFields.valueY = "amount";
        series.tooltipText = "{valueY.amount}";
        series.strokeWidth = 3;
        chart.cursor = new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_4__["XYCursor"]();
        chart.cursor.xAxis = dateAxis;
        chart.cursor.fullWidthLineX = true;
        chart.cursor.lineX.strokeWidth = 0;
        chart.cursor.lineX.fill = chart.colors.getIndex(2);
        chart.cursor.lineX.fillOpacity = 0.1;
        chart.scrollbarX = new _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_3__["Scrollbar"]();
        this.chart = chart;
    };
    ReportsAnalysisComponent.prototype.getChart1 = function () {
        var chart = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_3__["create"]("chartdiv1", _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_4__["XYChart"]);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
        var data = [];
        var open = 100;
        var close = 250;
        for (var i = 1; i < 120; i++) {
            open += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 4);
            close = Math.round(open + Math.random() * 5 + i / 5 - (Math.random() < 0.5 ? 1 : -1) * Math.random() * 2);
            data.push({ date: new Date(2018, 0, i), open: open, close: close });
        }
        chart.data = data;
        var dateAxis = chart.xAxes.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_4__["DateAxis"]());
        var valueAxis = chart.yAxes.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_4__["ValueAxis"]());
        valueAxis.tooltip.disabled = true;
        var series = chart.series.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_4__["LineSeries"]());
        series.dataFields.dateX = "date";
        series.dataFields.openValueY = "open";
        series.dataFields.valueY = "close";
        series.tooltipText = "open: {openValueY.value} close: {valueY.value}";
        series.sequencedInterpolation = true;
        series.fillOpacity = 0.3;
        series.defaultState.transitionDuration = 1000;
        series.tensionX = 0.8;
        var series2 = chart.series.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_4__["LineSeries"]());
        series2.dataFields.dateX = "date";
        series2.dataFields.valueY = "open";
        series2.sequencedInterpolation = true;
        series2.defaultState.transitionDuration = 1500;
        series2.stroke = chart.colors.getIndex(6);
        series2.tensionX = 0.8;
        chart.cursor = new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_4__["XYCursor"]();
        chart.cursor.xAxis = dateAxis;
        chart.scrollbarX = new _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_3__["Scrollbar"]();
        this.chart1 = chart;
    };
    ReportsAnalysisComponent.prototype.getChart2 = function () {
        var chart = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_3__["create"]("chartdiv2", _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_4__["XYChart"]);
        // Add data
        chart.data = this.dataChart2;
        // Create axes
        var valueAxisX = chart.xAxes.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_4__["ValueAxis"]());
        valueAxisX.title.text = 'X Axis';
        valueAxisX.renderer.minGridDistance = 40;
        // Create value axis
        var valueAxisY = chart.yAxes.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_4__["ValueAxis"]());
        valueAxisY.title.text = 'Y Axis';
        // Create series
        var lineSeries = chart.series.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_4__["LineSeries"]());
        lineSeries.dataFields.valueY = "ay";
        lineSeries.dataFields.valueX = "ax";
        lineSeries.strokeOpacity = 0;
        var lineSeries2 = chart.series.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_4__["LineSeries"]());
        lineSeries2.dataFields.valueY = "by";
        lineSeries2.dataFields.valueX = "bx";
        lineSeries2.strokeOpacity = 0;
        // Add a bullet
        var bullet = lineSeries.bullets.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_4__["Bullet"]());
        // Add a triangle to act as am arrow
        var arrow = bullet.createChild(_amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_3__["Triangle"]);
        arrow.horizontalCenter = "middle";
        arrow.verticalCenter = "middle";
        arrow.strokeWidth = 0;
        arrow.fill = chart.colors.getIndex(0);
        arrow.direction = "top";
        arrow.width = 12;
        arrow.height = 12;
        // Add a bullet
        var bullet2 = lineSeries2.bullets.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_4__["Bullet"]());
        // Add a triangle to act as am arrow
        var arrow2 = bullet2.createChild(_amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_3__["Triangle"]);
        arrow2.horizontalCenter = "middle";
        arrow2.verticalCenter = "middle";
        arrow2.rotation = 180;
        arrow2.strokeWidth = 0;
        arrow2.fill = chart.colors.getIndex(3);
        arrow2.direction = "top";
        arrow2.width = 12;
        arrow2.height = 12;
        //add the trendlines
        var trend = chart.series.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_4__["LineSeries"]());
        trend.dataFields.valueY = "value2";
        trend.dataFields.valueX = "value";
        trend.strokeWidth = 2;
        trend.stroke = chart.colors.getIndex(0);
        trend.strokeOpacity = 0.7;
        trend.data = [
            { "value": 1, "value2": 2 },
            { "value": 12, "value2": 11 }
        ];
        var trend2 = chart.series.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_4__["LineSeries"]());
        trend2.dataFields.valueY = "value2";
        trend2.dataFields.valueX = "value";
        trend2.strokeWidth = 2;
        trend2.stroke = chart.colors.getIndex(3);
        trend2.strokeOpacity = 0.7;
        trend2.data = [
            { "value": 1, "value2": 1 },
            { "value": 12, "value2": 19 }
        ];
        //scrollbars
        chart.scrollbarX = new _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_3__["Scrollbar"]();
        chart.scrollbarY = new _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_3__["Scrollbar"]();
        this.chart2 = chart;
    };
    ReportsAnalysisComponent.prototype.getChart3 = function () {
        var chart = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_3__["create"]("chartdiv3", _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_4__["XYChart"]);
        // Add data
        chart.data = this.dataChart3;
        // Set input format for the dates
        chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";
        // Create axes
        var dateAxis = chart.xAxes.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_4__["DateAxis"]());
        var valueAxis = chart.yAxes.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_4__["ValueAxis"]());
        // Create series
        var series = chart.series.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_4__["LineSeries"]());
        series.dataFields.valueY = "value";
        series.dataFields.dateX = "date";
        series.tooltipText = "{value}";
        series.strokeWidth = 2;
        series.minBulletDistance = 15;
        // Drop-shaped tooltips
        series.tooltip.background.cornerRadius = 20;
        series.tooltip.background.strokeOpacity = 0;
        series.tooltip.pointerOrientation = "vertical";
        series.tooltip.label.minWidth = 40;
        series.tooltip.label.minHeight = 40;
        series.tooltip.label.textAlign = "middle";
        series.tooltip.label.textValign = "middle";
        // Make bullets grow on hover
        var bullet = series.bullets.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_4__["CircleBullet"]());
        bullet.circle.strokeWidth = 2;
        bullet.circle.radius = 4;
        bullet.circle.fill = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_3__["color"]("#fff");
        var bullethover = bullet.states.create("hover");
        bullethover.properties.scale = 1.3;
        // Make a panning cursor
        chart.cursor = new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_4__["XYCursor"]();
        chart.cursor.behavior = "panXY";
        chart.cursor.xAxis = dateAxis;
        chart.cursor.snapToSeries = series;
        // Create vertical scrollbar and place it before the value axis
        chart.scrollbarY = new _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_3__["Scrollbar"]();
        chart.scrollbarY.parent = chart.leftAxesContainer;
        chart.scrollbarY.toBack();
        // Create a horizontal scrollbar with previe and place it underneath the date axis
        var scrollbarX = new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_4__["XYChartScrollbar"]();
        scrollbarX.series.push(series);
        chart.scrollbarX = scrollbarX;
        chart.scrollbarX.parent = chart.bottomAxesContainer;
        dateAxis.start = 0.79;
        dateAxis.keepSelection = true;
        this.chart3 = chart;
    };
    ReportsAnalysisComponent.ctorParameters = function () { return [
        { type: src_app_shared_services_mocks_mocks_service__WEBPACK_IMPORTED_MODULE_2__["MocksService"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] }
    ]; };
    ReportsAnalysisComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-reports-analysis',
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./reports-analysis.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/reports/reports-analysis/reports-analysis.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./reports-analysis.component.scss */ "./src/app/core/user/reports/reports-analysis/reports-analysis.component.scss")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [src_app_shared_services_mocks_mocks_service__WEBPACK_IMPORTED_MODULE_2__["MocksService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]])
    ], ReportsAnalysisComponent);
    return ReportsAnalysisComponent;
}());



/***/ }),

/***/ "./src/app/core/user/reports/reports-operation/reports-operation.component.scss":
/*!**************************************************************************************!*\
  !*** ./src/app/core/user/reports/reports-operation/reports-operation.component.scss ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvcmUvdXNlci9yZXBvcnRzL3JlcG9ydHMtb3BlcmF0aW9uL3JlcG9ydHMtb3BlcmF0aW9uLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/core/user/reports/reports-operation/reports-operation.component.ts":
/*!************************************************************************************!*\
  !*** ./src/app/core/user/reports/reports-operation/reports-operation.component.ts ***!
  \************************************************************************************/
/*! exports provided: ReportsOperationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportsOperationComponent", function() { return ReportsOperationComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");


var ReportsOperationComponent = /** @class */ (function () {
    function ReportsOperationComponent() {
    }
    ReportsOperationComponent.prototype.ngOnInit = function () {
    };
    ReportsOperationComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-reports-operation',
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./reports-operation.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/reports/reports-operation/reports-operation.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./reports-operation.component.scss */ "./src/app/core/user/reports/reports-operation/reports-operation.component.scss")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [])
    ], ReportsOperationComponent);
    return ReportsOperationComponent;
}());



/***/ }),

/***/ "./src/app/core/user/reports/reports-ticket-sales/reports-ticket-sales.component.scss":
/*!********************************************************************************************!*\
  !*** ./src/app/core/user/reports/reports-ticket-sales/reports-ticket-sales.component.scss ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvcmUvdXNlci9yZXBvcnRzL3JlcG9ydHMtdGlja2V0LXNhbGVzL3JlcG9ydHMtdGlja2V0LXNhbGVzLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/core/user/reports/reports-ticket-sales/reports-ticket-sales.component.ts":
/*!******************************************************************************************!*\
  !*** ./src/app/core/user/reports/reports-ticket-sales/reports-ticket-sales.component.ts ***!
  \******************************************************************************************/
/*! exports provided: ReportsTicketSalesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportsTicketSalesComponent", function() { return ReportsTicketSalesComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");


var ReportsTicketSalesComponent = /** @class */ (function () {
    function ReportsTicketSalesComponent() {
    }
    ReportsTicketSalesComponent.prototype.ngOnInit = function () {
    };
    ReportsTicketSalesComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-reports-ticket-sales',
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./reports-ticket-sales.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/reports/reports-ticket-sales/reports-ticket-sales.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./reports-ticket-sales.component.scss */ "./src/app/core/user/reports/reports-ticket-sales/reports-ticket-sales.component.scss")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [])
    ], ReportsTicketSalesComponent);
    return ReportsTicketSalesComponent;
}());



/***/ }),

/***/ "./src/app/core/user/shows/shows-list/shows-list.component.scss":
/*!**********************************************************************!*\
  !*** ./src/app/core/user/shows/shows-list/shows-list.component.scss ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvcmUvdXNlci9zaG93cy9zaG93cy1saXN0L3Nob3dzLWxpc3QuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/core/user/shows/shows-list/shows-list.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/core/user/shows/shows-list/shows-list.component.ts ***!
  \********************************************************************/
/*! exports provided: SelectionType, ShowsListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectionType", function() { return SelectionType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShowsListComponent", function() { return ShowsListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm5/forms.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/__ivy_ngcc__/esm5/ngx-bootstrap.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var src_app_shared_services_showings_showings_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/shared/services/showings/showings.service */ "./src/app/shared/services/showings/showings.service.ts");
/* harmony import */ var _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @amcharts/amcharts4/core */ "./node_modules/@amcharts/amcharts4/core.js");
/* harmony import */ var _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @amcharts/amcharts4/charts */ "./node_modules/@amcharts/amcharts4/charts.js");
/* harmony import */ var _amcharts_amcharts4_themes_animated__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @amcharts/amcharts4/themes/animated */ "./node_modules/@amcharts/amcharts4/themes/animated.js");









_amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_6__["useTheme"](_amcharts_amcharts4_themes_animated__WEBPACK_IMPORTED_MODULE_8__["default"]);
var SelectionType;
(function (SelectionType) {
    SelectionType["single"] = "single";
    SelectionType["multi"] = "multi";
    SelectionType["multiClick"] = "multiClick";
    SelectionType["cell"] = "cell";
    SelectionType["checkbox"] = "checkbox";
})(SelectionType || (SelectionType = {}));
var ShowsListComponent = /** @class */ (function () {
    function ShowsListComponent(formBuilder, zone, modalService, showingService) {
        this.formBuilder = formBuilder;
        this.zone = zone;
        this.modalService = modalService;
        this.showingService = showingService;
        // Table
        this.tableEntries = 5;
        this.tableSelected = [];
        this.tableTemp = [];
        this.tableRows = [];
        this.SelectionType = SelectionType;
        this.modalConfig = {
            keyboard: true,
            class: "modal-dialog-centered",
        };
        this.showingFormGroup = this.formBuilder.group({
            id: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            title: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            description: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            genre: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            language: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            duration_hours: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            duration_minutes: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            poster_link: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            trailer_link: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            status: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
        });
    }
    ShowsListComponent.prototype.ngOnInit = function () {
        // this.getCharts()
        this.getData();
    };
    ShowsListComponent.prototype.ngOnDestroy = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            if (_this.chart) {
                console.log("Chart disposed");
                _this.chart.dispose();
            }
        });
    };
    ShowsListComponent.prototype.getData = function () {
        var _this = this;
        this.showingService.get().subscribe(function (res) {
            _this.tableRows = res;
            _this.tableTemp = _this.tableRows.map(function (prop, key) {
                return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, prop), { no: key });
            });
        });
    };
    ShowsListComponent.prototype.entriesChange = function ($event) {
        this.tableEntries = $event.target.value;
    };
    ShowsListComponent.prototype.filterTable = function ($event) {
        var val = $event.target.value;
        this.tableTemp = this.tableRows.filter(function (d) {
            for (var key in d) {
                if (d[key]
                    .toString()
                    .toLowerCase()
                    .indexOf(val.toString().toLowerCase()) !== -1) {
                    return true;
                }
            }
            return false;
        });
    };
    ShowsListComponent.prototype.onSelect = function (_a) {
        var _b;
        var selected = _a.selected;
        this.tableSelected.splice(0, this.tableSelected.length);
        (_b = this.tableSelected).push.apply(_b, selected);
    };
    ShowsListComponent.prototype.onActivate = function (event) {
        this.tableActiveRow = event.row;
    };
    ShowsListComponent.prototype.getCharts = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.getChart();
        });
    };
    ShowsListComponent.prototype.getChart = function () {
        var chart = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_6__["create"]("chart-show-schedule-1", _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_7__["XYChart"]);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
        chart.paddingRight = 30;
        chart.dateFormatter.inputDateFormat = "yyyy-MM-dd HH:mm";
        var colorSet = new _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_6__["ColorSet"]();
        colorSet.saturation = 0.4;
        chart.data = [
            {
                name: "Isnin",
                fromDate: "2020-01-01 08:00",
                toDate: "2020-01-01 10:00",
                color: colorSet.getIndex(0).brighten(0),
            },
            {
                name: "Selasa",
                fromDate: "2020-01-01 12:00",
                toDate: "2020-01-01 15:00",
                color: colorSet.getIndex(0).brighten(0.4),
            },
            {
                name: "Rabu",
                fromDate: "2020-01-01 15:30",
                toDate: "2020-01-01 21:30",
                color: colorSet.getIndex(0).brighten(0.8),
            },
            {
                name: "Khamis",
                fromDate: "2020-01-01 09:00",
                toDate: "2020-01-01 12:00",
                color: colorSet.getIndex(2).brighten(0),
            },
            {
                name: "Jumaat",
                fromDate: "2020-01-01 13:00",
                toDate: "2020-01-01 17:00",
                color: colorSet.getIndex(2).brighten(0.4),
            },
            {
                name: "Sabtu",
                fromDate: "2020-01-01 11:00",
                toDate: "2020-01-01 16:00",
                color: colorSet.getIndex(4).brighten(0),
            },
            {
                name: "Ahad",
                fromDate: "2020-01-01 16:00",
                toDate: "2020-01-01 19:00",
                color: colorSet.getIndex(4).brighten(0.4),
            },
        ];
        var categoryAxis = chart.yAxes.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_7__["CategoryAxis"]());
        categoryAxis.dataFields.category = "name";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.inversed = true;
        var dateAxis = chart.xAxes.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_7__["DateAxis"]());
        dateAxis.dateFormatter.dateFormat = "yyyy-MM-dd HH:mm";
        dateAxis.renderer.minGridDistance = 70;
        dateAxis.baseInterval = { count: 30, timeUnit: "minute" };
        dateAxis.max = new Date(2018, 0, 1, 24, 0, 0, 0).getTime();
        dateAxis.strictMinMax = true;
        dateAxis.renderer.tooltipLocation = 0;
        var series1 = chart.series.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_7__["ColumnSeries"]());
        series1.columns.template.width = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_6__["percent"](80);
        series1.columns.template.tooltipText = "{name}: {openDateX} - {dateX}";
        series1.dataFields.openDateX = "fromDate";
        series1.dataFields.dateX = "toDate";
        series1.dataFields.categoryY = "name";
        series1.columns.template.propertyFields.fill = "color"; // get color from data
        series1.columns.template.propertyFields.stroke = "color";
        series1.columns.template.strokeOpacity = 1;
        // chart.scrollbarX = new am4core.Scrollbar();
    };
    ShowsListComponent.prototype.openModal = function (modalRef, process, row) {
        if (process == "create") {
            this.showingFormGroup.reset();
        }
        else if (process == "update") {
            this.showingFormGroup.patchValue(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, row));
        }
        this.modal = this.modalService.show(modalRef, this.modalConfig);
    };
    ShowsListComponent.prototype.closeModal = function () {
        this.modal.hide();
    };
    ShowsListComponent.prototype.create = function () {
        var _this = this;
        this.showingService.post(this.showingFormGroup.value).subscribe(function (res) {
            console.log("res", res);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Berjaya",
                text: "Data anda berjaya disimpan.",
                type: "success",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
            })
                .then(function (result) {
                if (result.value) {
                    _this.modal.hide();
                    _this.getData();
                }
            });
        }, function (err) {
            console.error("err", err);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Ralat",
                text: "Data anda tidak berjaya disimpan. Sila cuba lagi",
                type: "warning",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-warning",
            })
                .then(function (result) {
                if (result.value) {
                    // this.modal.hide();
                }
            });
        });
    };
    ShowsListComponent.prototype.update = function () {
        var _this = this;
        this.showingService
            .update(this.showingFormGroup.value, this.showingFormGroup.value.id)
            .subscribe(function (res) {
            console.log("res", res);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Berjaya",
                text: "Data anda berjaya dikemaskini.",
                type: "success",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
            })
                .then(function (result) {
                if (result.value) {
                    _this.modal.hide();
                    _this.getData();
                }
            });
        }, function (err) {
            console.error("err", err);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Ralat",
                text: "Data anda tidak berjaya dikemaskini. Sila cuba lagi",
                type: "warning",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-warning",
            })
                .then(function (result) {
                if (result.value) {
                    // this.modal.hide();
                }
            });
        });
    };
    ShowsListComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] },
        { type: ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__["BsModalService"] },
        { type: src_app_shared_services_showings_showings_service__WEBPACK_IMPORTED_MODULE_5__["ShowingsService"] }
    ]; };
    ShowsListComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-shows-list",
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./shows-list.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/shows/shows-list/shows-list.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./shows-list.component.scss */ "./src/app/core/user/shows/shows-list/shows-list.component.scss")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"],
            ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__["BsModalService"],
            src_app_shared_services_showings_showings_service__WEBPACK_IMPORTED_MODULE_5__["ShowingsService"]])
    ], ShowsListComponent);
    return ShowsListComponent;
}());



/***/ }),

/***/ "./src/app/core/user/shows/shows-schedule/shows-schedule.component.scss":
/*!******************************************************************************!*\
  !*** ./src/app/core/user/shows/shows-schedule/shows-schedule.component.scss ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvcmUvdXNlci9zaG93cy9zaG93cy1zY2hlZHVsZS9zaG93cy1zY2hlZHVsZS5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/core/user/shows/shows-schedule/shows-schedule.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/core/user/shows/shows-schedule/shows-schedule.component.ts ***!
  \****************************************************************************/
/*! exports provided: SelectionType, ShowsScheduleComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectionType", function() { return SelectionType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShowsScheduleComponent", function() { return ShowsScheduleComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm5/forms.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/__ivy_ngcc__/esm5/ngx-bootstrap.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _shared_services_showtimes_showtimes_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../shared/services/showtimes/showtimes.service */ "./src/app/shared/services/showtimes/showtimes.service.ts");
/* harmony import */ var src_app_shared_services_showings_showings_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/shared/services/showings/showings.service */ "./src/app/shared/services/showings/showings.service.ts");
/* harmony import */ var src_app_shared_services_venues_venues_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/shared/services/venues/venues.service */ "./src/app/shared/services/venues/venues.service.ts");
/* harmony import */ var _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @amcharts/amcharts4/core */ "./node_modules/@amcharts/amcharts4/core.js");
/* harmony import */ var _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @amcharts/amcharts4/charts */ "./node_modules/@amcharts/amcharts4/charts.js");
/* harmony import */ var _amcharts_amcharts4_themes_animated__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @amcharts/amcharts4/themes/animated */ "./node_modules/@amcharts/amcharts4/themes/animated.js");











_amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_8__["useTheme"](_amcharts_amcharts4_themes_animated__WEBPACK_IMPORTED_MODULE_10__["default"]);
var SelectionType;
(function (SelectionType) {
    SelectionType["single"] = "single";
    SelectionType["multi"] = "multi";
    SelectionType["multiClick"] = "multiClick";
    SelectionType["cell"] = "cell";
    SelectionType["checkbox"] = "checkbox";
})(SelectionType || (SelectionType = {}));
var ShowsScheduleComponent = /** @class */ (function () {
    function ShowsScheduleComponent(formBuilder, zone, modalService, showtimeService, showingService, venueService) {
        this.formBuilder = formBuilder;
        this.zone = zone;
        this.modalService = modalService;
        this.showtimeService = showtimeService;
        this.showingService = showingService;
        this.venueService = venueService;
        // Table
        this.tableEntries = 5;
        this.tableSelected = [];
        this.tableTemp = [];
        this.tableRows = [];
        this.SelectionType = SelectionType;
        this.modalConfig = {
            keyboard: true,
            class: "modal-dialog-centered",
        };
        // Dropdown
        this.shows = [];
        this.venues = [];
        this.getShowing();
        this.getVenue();
        this.showtimeFormGroup = this.formBuilder.group({
            id: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            show_date: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            show_time: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            showing_id: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            venue_id: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
        });
    }
    ShowsScheduleComponent.prototype.getShowing = function () {
        var _this = this;
        this.showingService.get().subscribe(function (res) {
            console.log("res", res);
            _this.shows = res;
        }, function (err) {
            console.error("err", err);
        });
    };
    ShowsScheduleComponent.prototype.getVenue = function () {
        var _this = this;
        this.venueService.get().subscribe(function (res) {
            console.log("res", res);
            _this.venues = res;
        }, function (err) {
            console.error("err", err);
        });
    };
    ShowsScheduleComponent.prototype.ngOnInit = function () {
        this.getData();
    };
    ShowsScheduleComponent.prototype.ngOnDestroy = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            if (_this.chart) {
                console.log("Chart disposed");
                _this.chart.dispose();
            }
        });
    };
    ShowsScheduleComponent.prototype.getData = function () {
        var _this = this;
        this.showtimeService.extended().subscribe(function (res) {
            console.log("res", res);
            _this.tableRows = res;
            _this.getCharts();
            _this.tableTemp = _this.tableRows.map(function (prop, key) {
                return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, prop), { no: key });
            });
        }, function (err) {
            console.log("err", err);
        });
    };
    ShowsScheduleComponent.prototype.entriesChange = function ($event) {
        this.tableEntries = $event.target.value;
    };
    ShowsScheduleComponent.prototype.filterTable = function ($event) {
        var val = $event.target.value;
        this.tableTemp = this.tableRows.filter(function (d) {
            for (var key in d) {
                if (d[key]
                    .toString()
                    .toLowerCase()
                    .indexOf(val.toString().toLowerCase()) !== -1) {
                    return true;
                }
            }
            return false;
        });
    };
    ShowsScheduleComponent.prototype.onSelect = function (_a) {
        var _b;
        var selected = _a.selected;
        this.tableSelected.splice(0, this.tableSelected.length);
        (_b = this.tableSelected).push.apply(_b, selected);
    };
    ShowsScheduleComponent.prototype.onActivate = function (event) {
        this.tableActiveRow = event.row;
    };
    ShowsScheduleComponent.prototype.getCharts = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.getChart();
        });
    };
    ShowsScheduleComponent.prototype.getChart = function () {
        var chart = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_8__["create"]("chart-show-schedule-1", _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_9__["XYChart"]);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
        chart.paddingRight = 30;
        chart.dateFormatter.inputDateFormat = "yyyy-MM-dd HH:mm";
        var colorSet = new _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_8__["ColorSet"]();
        colorSet.saturation = 0.4;
        chart.data = this.generateData(colorSet);
        chart.dateFormatter.dateFormat = "yyyy-MM-dd HH:mm:ss";
        chart.dateFormatter.inputDateFormat = "yyyy-MM-dd HH:mm:ss";
        var categoryAxis = chart.yAxes.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_9__["CategoryAxis"]());
        categoryAxis.dataFields.category = "name";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.inversed = true;
        categoryAxis.renderer.minGridDistance = 10;
        var dateAxis = chart.xAxes.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_9__["DateAxis"]());
        dateAxis.dateFormatter.dateFormat = "yyyy-MM-dd HH:mm:ss";
        dateAxis.renderer.minGridDistance = 70;
        dateAxis.baseInterval = { count: 30, timeUnit: "minute" };
        // dateAxis.max = new Date(2018, 0, 1, 24, 0, 0, 0).getTime();
        // dateAxis.strictMinMax = true;
        dateAxis.renderer.tooltipLocation = 0;
        var series1 = chart.series.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_9__["ColumnSeries"]());
        series1.columns.template.width = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_8__["percent"](80);
        series1.columns.template.tooltipText = "{title}: {openDateX} - {dateX}";
        series1.dataFields.openDateX = "fromDate";
        series1.dataFields.dateX = "toDate";
        series1.dataFields.categoryY = "name";
        series1.columns.template.propertyFields.fill = "color"; // get color from data
        series1.columns.template.propertyFields.stroke = "color";
        series1.columns.template.strokeOpacity = 1;
        // chart.scrollbarX = new am4core.Scrollbar();
    };
    ShowsScheduleComponent.prototype.generateData = function (colorSet) {
        console.log("tableRows", this.tableRows);
        var arrayChart = [];
        for (var i = 0; i < this.tableRows.length; i++) {
            var days = ['Ahad', 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu'];
            var name = this.getDayName(this.tableRows[i].show_date);
            var dayIndex = days.indexOf(name);
            var array = {
                name: name,
                fromDate: this.tableRows[i].show_date + ' ' + this.tableRows[i].show_time,
                toDate: this.tableRows[i].show_date + ' ' + '16:00:00',
                color: colorSet.getIndex(dayIndex).brighten(0),
                title: this.tableRows[i].showing_id.title
            };
            arrayChart.push(array);
        }
        return arrayChart;
    };
    ShowsScheduleComponent.prototype.getDayName = function (dateString) {
        var days = ['Ahad', 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu'];
        var d = new Date(dateString);
        var dayName = days[d.getDay()];
        return dayName;
    };
    ShowsScheduleComponent.prototype.openModal = function (modalRef, process, row) {
        if (process == "create") {
            this.showtimeFormGroup.reset();
        }
        else if (process == "update") {
            this.showtimeFormGroup.patchValue(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, row), { showing_id: row.showing_id.id }));
        }
        this.modal = this.modalService.show(modalRef, this.modalConfig);
    };
    ShowsScheduleComponent.prototype.closeModal = function () {
        this.modal.hide();
    };
    ShowsScheduleComponent.prototype.create = function () {
        var _this = this;
        this.showtimeService.post(this.showtimeFormGroup.value).subscribe(function (res) {
            console.log("res", res);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Berjaya",
                text: "Data anda berjaya disimpan.",
                type: "success",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
            })
                .then(function (result) {
                if (result.value) {
                    _this.modal.hide();
                    _this.getData();
                }
            });
        }, function (err) {
            console.error("err", err);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Ralat",
                text: "Data anda tidak berjaya disimpan. Sila cuba lagi",
                type: "warning",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-warning",
            })
                .then(function (result) {
                if (result.value) {
                    // this.modal.hide();
                }
            });
        });
    };
    ShowsScheduleComponent.prototype.update = function () {
        var _this = this;
        this.showtimeService
            .update(this.showtimeFormGroup.value, this.showtimeFormGroup.value.id)
            .subscribe(function (res) {
            console.log("res", res);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Berjaya",
                text: "Data anda berjaya dikemaskini.",
                type: "success",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
            })
                .then(function (result) {
                if (result.value) {
                    _this.modal.hide();
                    _this.getData();
                }
            });
        }, function (err) {
            console.error("err", err);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Ralat",
                text: "Data anda tidak berjaya dikemaskini. Sila cuba lagi",
                type: "warning",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-warning",
            })
                .then(function (result) {
                if (result.value) {
                    // this.modal.hide();
                }
            });
        });
    };
    ShowsScheduleComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] },
        { type: ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__["BsModalService"] },
        { type: _shared_services_showtimes_showtimes_service__WEBPACK_IMPORTED_MODULE_5__["ShowtimesService"] },
        { type: src_app_shared_services_showings_showings_service__WEBPACK_IMPORTED_MODULE_6__["ShowingsService"] },
        { type: src_app_shared_services_venues_venues_service__WEBPACK_IMPORTED_MODULE_7__["VenuesService"] }
    ]; };
    ShowsScheduleComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-shows-schedule",
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./shows-schedule.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/shows/shows-schedule/shows-schedule.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./shows-schedule.component.scss */ "./src/app/core/user/shows/shows-schedule/shows-schedule.component.scss")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"],
            ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__["BsModalService"],
            _shared_services_showtimes_showtimes_service__WEBPACK_IMPORTED_MODULE_5__["ShowtimesService"],
            src_app_shared_services_showings_showings_service__WEBPACK_IMPORTED_MODULE_6__["ShowingsService"],
            src_app_shared_services_venues_venues_service__WEBPACK_IMPORTED_MODULE_7__["VenuesService"]])
    ], ShowsScheduleComponent);
    return ShowsScheduleComponent;
}());



/***/ }),

/***/ "./src/app/core/user/simulator-ride/simulator-ride-applications/simulator-ride-applications.component.scss":
/*!*****************************************************************************************************************!*\
  !*** ./src/app/core/user/simulator-ride/simulator-ride-applications/simulator-ride-applications.component.scss ***!
  \*****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvcmUvdXNlci9zaW11bGF0b3ItcmlkZS9zaW11bGF0b3ItcmlkZS1hcHBsaWNhdGlvbnMvc2ltdWxhdG9yLXJpZGUtYXBwbGljYXRpb25zLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/core/user/simulator-ride/simulator-ride-applications/simulator-ride-applications.component.ts":
/*!***************************************************************************************************************!*\
  !*** ./src/app/core/user/simulator-ride/simulator-ride-applications/simulator-ride-applications.component.ts ***!
  \***************************************************************************************************************/
/*! exports provided: SelectionType, SimulatorRideApplicationsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectionType", function() { return SelectionType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimulatorRideApplicationsComponent", function() { return SimulatorRideApplicationsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/__ivy_ngcc__/esm5/ngx-bootstrap.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var src_app_shared_services_simulator_ride_bookings_simulator_ride_bookings_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/shared/services/simulator-ride-bookings/simulator-ride-bookings.service */ "./src/app/shared/services/simulator-ride-bookings/simulator-ride-bookings.service.ts");
/* harmony import */ var src_app_shared_services_simulator_ride_times_simulator_ride_times_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/shared/services/simulator-ride-times/simulator-ride-times.service */ "./src/app/shared/services/simulator-ride-times/simulator-ride-times.service.ts");
/* harmony import */ var src_app_shared_services_users_users_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/shared/services/users/users.service */ "./src/app/shared/services/users/users.service.ts");









var SelectionType;
(function (SelectionType) {
    SelectionType["single"] = "single";
    SelectionType["multi"] = "multi";
    SelectionType["multiClick"] = "multiClick";
    SelectionType["cell"] = "cell";
    SelectionType["checkbox"] = "checkbox";
})(SelectionType || (SelectionType = {}));
var SimulatorRideApplicationsComponent = /** @class */ (function () {
    function SimulatorRideApplicationsComponent(formBuilder, modalService, route, simridebookingService, simridetiemService, userService) {
        this.formBuilder = formBuilder;
        this.modalService = modalService;
        this.route = route;
        this.simridebookingService = simridebookingService;
        this.simridetiemService = simridetiemService;
        this.userService = userService;
        // Table
        this.tableEntries = 5;
        this.tableSelected = [];
        this.tableTemp = [];
        this.tableRows = [];
        this.SelectionType = SelectionType;
        this.modalConfig = {
            keyboard: true,
            class: "modal-dialog-centered",
        };
        // Dropdown
        this.tickettypes = [
            {
                value: "CZ",
                display_name: "Warganegara",
            },
            {
                value: "NC",
                display_name: "Bukan Warganegara",
            },
        ];
        this.ticketcategories = [
            {
                value: "AD",
                display_name: "Dewasa",
            },
            {
                value: "KD",
                display_name: "Kanak-kanak",
            },
        ];
        this.times = [];
        this.users = [];
        this.simridebookingFormGroup = this.formBuilder.group({
            id: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            booking_date: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            simulator_ride_time_id: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](this.route.snapshot.params.id),
            ticket_type: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            ticket_category: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            ticket_quantity: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](1),
            price: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            total_price: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            user_id: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
        });
        this.getBooking();
        this.getTime();
        this.getUser();
    }
    SimulatorRideApplicationsComponent.prototype.getBooking = function () {
        var _this = this;
        this.simridebookingService
            .filter("simulator_ride_time_id=" +
            this.simridebookingFormGroup.value.simulator_ride_time_id)
            .subscribe(function (res) {
            console.log("res", res);
            _this.tableRows = res;
            _this.tableTemp = _this.tableRows.map(function (prop, key) {
                return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, prop), { no: key });
            });
        }, function (err) {
            console.error("err", err);
        });
    };
    SimulatorRideApplicationsComponent.prototype.getTime = function () {
        var _this = this;
        this.simridetiemService.get().subscribe(function (res) {
            console.log("res", res);
            _this.times = res;
        }, function (err) {
            console.error("err", err);
        });
    };
    SimulatorRideApplicationsComponent.prototype.getUser = function () {
        var _this = this;
        this.userService.getAll().subscribe(function (res) {
            console.log("res", res);
            _this.users = res;
        }, function (err) {
            console.error("err", err);
        });
    };
    SimulatorRideApplicationsComponent.prototype.ngOnInit = function () { };
    SimulatorRideApplicationsComponent.prototype.entriesChange = function ($event) {
        this.tableEntries = $event.target.value;
    };
    SimulatorRideApplicationsComponent.prototype.filterTable = function ($event) {
        var val = $event.target.value;
        this.tableTemp = this.tableRows.filter(function (d) {
            for (var key in d) {
                if (d[key]
                    .toString()
                    .toLowerCase()
                    .indexOf(val.toString().toLowerCase()) !== -1) {
                    return true;
                }
            }
            return false;
        });
    };
    SimulatorRideApplicationsComponent.prototype.onSelect = function (_a) {
        var _b;
        var selected = _a.selected;
        this.tableSelected.splice(0, this.tableSelected.length);
        (_b = this.tableSelected).push.apply(_b, selected);
    };
    SimulatorRideApplicationsComponent.prototype.onActivate = function (event) {
        this.tableActiveRow = event.row;
    };
    SimulatorRideApplicationsComponent.prototype.openModal = function (modalRef, process, row) {
        if (process == "create") {
            // this.simridebookingFormGroup.reset();
        }
        else if (process == "update") {
            this.simridebookingFormGroup.patchValue(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, row));
        }
        this.modal = this.modalService.show(modalRef, this.modalConfig);
    };
    SimulatorRideApplicationsComponent.prototype.closeModal = function () {
        this.modal.hide();
    };
    SimulatorRideApplicationsComponent.prototype.create = function () {
        var _this = this;
        this.simridebookingService
            .post(this.simridebookingFormGroup.value)
            .subscribe(function (res) {
            console.log("res", res);
            sweetalert2__WEBPACK_IMPORTED_MODULE_5___default.a
                .fire({
                title: "Berjaya",
                text: "Data anda berjaya disimpan.",
                type: "success",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
            })
                .then(function (result) {
                if (result.value) {
                    _this.modal.hide();
                    _this.getBooking();
                }
            });
        }, function (err) {
            console.error("err", err);
            sweetalert2__WEBPACK_IMPORTED_MODULE_5___default.a
                .fire({
                title: "Ralat",
                text: "Data anda tidak berjaya disimpan. Sila cuba lagi",
                type: "warning",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-warning",
            })
                .then(function (result) {
                if (result.value) {
                    // this.modal.hide();
                }
            });
        });
    };
    SimulatorRideApplicationsComponent.prototype.update = function () {
        var _this = this;
        this.simridebookingService
            .update(this.simridebookingFormGroup.value, this.simridebookingFormGroup.value.id)
            .subscribe(function (res) {
            console.log("res", res);
            sweetalert2__WEBPACK_IMPORTED_MODULE_5___default.a
                .fire({
                title: "Berjaya",
                text: "Data anda berjaya dikemaskini.",
                type: "success",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
            })
                .then(function (result) {
                if (result.value) {
                    _this.modal.hide();
                    _this.getBooking();
                }
            });
        }, function (err) {
            console.error("err", err);
            sweetalert2__WEBPACK_IMPORTED_MODULE_5___default.a
                .fire({
                title: "Ralat",
                text: "Data anda tidak berjaya dikemaskini. Sila cuba lagi",
                type: "warning",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-warning",
            })
                .then(function (result) {
                if (result.value) {
                    // this.modal.hide();
                }
            });
        });
    };
    SimulatorRideApplicationsComponent.prototype.getType = function (value) {
        var result = this.tickettypes.find(function (obj) {
            return obj.value == value;
        });
        return result.display_name;
    };
    SimulatorRideApplicationsComponent.prototype.getCategory = function (value) {
        var result = this.ticketcategories.find(function (obj) {
            return obj.value == value;
        });
        return result.display_name;
    };
    SimulatorRideApplicationsComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
        { type: ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__["BsModalService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: src_app_shared_services_simulator_ride_bookings_simulator_ride_bookings_service__WEBPACK_IMPORTED_MODULE_6__["SimulatorRideBookingsService"] },
        { type: src_app_shared_services_simulator_ride_times_simulator_ride_times_service__WEBPACK_IMPORTED_MODULE_7__["SimulatorRideTimesService"] },
        { type: src_app_shared_services_users_users_service__WEBPACK_IMPORTED_MODULE_8__["UsersService"] }
    ]; };
    SimulatorRideApplicationsComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-simulator-ride-applications",
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./simulator-ride-applications.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/simulator-ride/simulator-ride-applications/simulator-ride-applications.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./simulator-ride-applications.component.scss */ "./src/app/core/user/simulator-ride/simulator-ride-applications/simulator-ride-applications.component.scss")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__["BsModalService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            src_app_shared_services_simulator_ride_bookings_simulator_ride_bookings_service__WEBPACK_IMPORTED_MODULE_6__["SimulatorRideBookingsService"],
            src_app_shared_services_simulator_ride_times_simulator_ride_times_service__WEBPACK_IMPORTED_MODULE_7__["SimulatorRideTimesService"],
            src_app_shared_services_users_users_service__WEBPACK_IMPORTED_MODULE_8__["UsersService"]])
    ], SimulatorRideApplicationsComponent);
    return SimulatorRideApplicationsComponent;
}());



/***/ }),

/***/ "./src/app/core/user/simulator-ride/simulator-ride-schedule/simulator-ride-schedule.component.scss":
/*!*********************************************************************************************************!*\
  !*** ./src/app/core/user/simulator-ride/simulator-ride-schedule/simulator-ride-schedule.component.scss ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvcmUvdXNlci9zaW11bGF0b3ItcmlkZS9zaW11bGF0b3ItcmlkZS1zY2hlZHVsZS9zaW11bGF0b3ItcmlkZS1zY2hlZHVsZS5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/core/user/simulator-ride/simulator-ride-schedule/simulator-ride-schedule.component.ts":
/*!*******************************************************************************************************!*\
  !*** ./src/app/core/user/simulator-ride/simulator-ride-schedule/simulator-ride-schedule.component.ts ***!
  \*******************************************************************************************************/
/*! exports provided: SelectionType, SimulatorRideScheduleComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectionType", function() { return SelectionType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimulatorRideScheduleComponent", function() { return SimulatorRideScheduleComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm5/forms.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/__ivy_ngcc__/esm5/ngx-bootstrap.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var src_app_shared_services_simulator_ride_times_simulator_ride_times_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/shared/services/simulator-ride-times/simulator-ride-times.service */ "./src/app/shared/services/simulator-ride-times/simulator-ride-times.service.ts");
/* harmony import */ var src_app_shared_services_venues_venues_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/shared/services/venues/venues.service */ "./src/app/shared/services/venues/venues.service.ts");







var SelectionType;
(function (SelectionType) {
    SelectionType["single"] = "single";
    SelectionType["multi"] = "multi";
    SelectionType["multiClick"] = "multiClick";
    SelectionType["cell"] = "cell";
    SelectionType["checkbox"] = "checkbox";
})(SelectionType || (SelectionType = {}));
var SimulatorRideScheduleComponent = /** @class */ (function () {
    function SimulatorRideScheduleComponent(formBuilder, modalService, simridetimeService, venueService) {
        this.formBuilder = formBuilder;
        this.modalService = modalService;
        this.simridetimeService = simridetimeService;
        this.venueService = venueService;
        // Table
        this.tableEntries = 5;
        this.tableSelected = [];
        this.tableTemp = [];
        this.tableRows = [];
        this.SelectionType = SelectionType;
        this.entries = 5;
        this.selected = [];
        this.temp = [];
        this.rows = [];
        this.modalConfig = {
            keyboard: true,
            class: "modal-dialog-centered",
        };
        // Dropdown
        this.times = [
            {
                time: "10.00 AM",
            },
            {
                time: "11.00 AM",
            },
            {
                time: "12.00 PM",
            },
            {
                time: "01.00 PM",
            },
            {
                time: "02.00 PM",
            },
            {
                time: "03.00 PM",
            },
            {
                time: "04.00 PM",
            },
        ];
        this.days = [
            {
                value: "MON",
                display_name: "Isnin",
            },
            {
                value: "TUE",
                display_name: "Selasa",
            },
            {
                value: "WED",
                display_name: "Rabu",
            },
            {
                value: "THU",
                display_name: "Khamis",
            },
            {
                value: "FRI",
                display_name: "Jumaat",
            },
            {
                value: "SAT",
                display_name: "Sabtu",
            },
            {
                value: "SUN",
                display_name: "Ahad",
            },
        ];
        this.rounds = [
            {
                value: "P1",
                display_name: "Pusingan 1",
            },
            {
                value: "P2",
                display_name: "Pusingan 2",
            },
            {
                value: "P3",
                display_name: "Pusingan 3",
            },
            {
                value: "P4",
                display_name: "Pusingan 4",
            },
            {
                value: "P5",
                display_name: "Pusingan 5",
            },
        ];
        this.venues = [];
        this.getVenue();
        this.simridetimeFormGroup = this.formBuilder.group({
            id: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            time: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            venue_id: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            day: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            round: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
        });
    }
    SimulatorRideScheduleComponent.prototype.getVenue = function () {
        var _this = this;
        this.venueService.get().subscribe(function (res) {
            console.log("res", res);
            _this.venues = res;
        }, function (err) {
            console.error("err", err);
        });
    };
    SimulatorRideScheduleComponent.prototype.ngOnInit = function () {
        this.getData();
        this.getSimulatorRideTime();
    };
    SimulatorRideScheduleComponent.prototype.getData = function () {
        var fakeData = [
            {
                day: "Sabtu - Khamis",
                time: "10.00",
                start_time_1: "10.00 am",
                start_time_2: "10.10 am",
                start_time_3: "10.20 am",
                start_time_4: "10.30 am",
                start_time_5: "10.40 am",
            },
            {
                day: "Sabtu - Khamis",
                time: "11.00",
                start_time_1: "11.00 am",
                start_time_2: "11.10 am",
                start_time_3: "11.20 am",
                start_time_4: "11.30 am",
                start_time_5: "11.40 am",
            },
            {
                day: "Sabtu - Khamis",
                time: "12.00",
                start_time_1: "12.00 pm",
                start_time_2: "12.10 pm",
                start_time_3: "12.20 pm",
                start_time_4: "12.30 pm",
                start_time_5: "12.40 pm",
            },
            {
                day: "Sabtu - Khamis",
                time: "1.00",
                start_time_1: "REHAT / BREAK",
                start_time_2: "REHAT / BREAK",
                start_time_3: "REHAT / BREAK",
                start_time_4: "REHAT / BREAK",
                start_time_5: "REHAT / BREAK",
            },
            {
                day: "Sabtu - Khamis",
                time: "2.00",
                start_time_1: "2.00 pm",
                start_time_2: "2.10 pm",
                start_time_3: "2.20 pm",
                start_time_4: "2.30 pm",
                start_time_5: "2.40 pm",
            },
            {
                day: "Sabtu - Khamis",
                time: "3.00",
                start_time_1: "3.00 pm",
                start_time_2: "3.10 pm",
                start_time_3: "3.20 pm",
                start_time_4: "3.30 pm",
                start_time_5: "3.40 pm",
            },
            {
                day: "Sabtu - Khamis",
                time: "4.00",
                start_time_1: "4.00 pm",
                start_time_2: "4.10 pm",
                start_time_3: "4.20 pm",
                start_time_4: "4.30 pm",
                start_time_5: "4.40 pm",
            },
            {
                day: "JUMAAT",
                time: "10.00",
                start_time_1: "10.00 am",
                start_time_2: "10.10 am",
                start_time_3: "10.20 am",
                start_time_4: "10.30 am",
                start_time_5: "10.40 am",
            },
            {
                day: "JUMAAT",
                time: "11.00",
                start_time_1: "11.00 am",
                start_time_2: "11.10 am",
                start_time_3: "11.20 am",
                start_time_4: "11.30 am",
                start_time_5: "11.40 am",
            },
            {
                day: "JUMAAT",
                time: "12.00",
                start_time_1: "REHAT / BREAK",
                start_time_2: "REHAT / BREAK",
                start_time_3: "REHAT / BREAK",
                start_time_4: "REHAT / BREAK",
                start_time_5: "REHAT / BREAK",
            },
            {
                day: "JUMAAT",
                time: "1.00",
                start_time_1: "REHAT / BREAK",
                start_time_2: "REHAT / BREAK",
                start_time_3: "REHAT / BREAK",
                start_time_4: "REHAT / BREAK",
                start_time_5: "REHAT / BREAK",
            },
            {
                day: "JUMAAT",
                time: "10.00",
                start_time_1: "REHAT / BREAK",
                start_time_2: "REHAT / BREAK",
                start_time_3: "REHAT / BREAK",
                start_time_4: "REHAT / BREAK",
                start_time_5: "REHAT / BREAK",
            },
            {
                day: "JUMAAT",
                time: "3.00",
                start_time_1: "3.00 pm",
                start_time_2: "3.10 pm",
                start_time_3: "3.20 pm",
                start_time_4: "3.30 pm",
                start_time_5: "3.40 pm",
            },
            {
                day: "JUMAAT",
                time: "4.00",
                start_time_1: "4.00 pm",
                start_time_2: "4.10 pm",
                start_time_3: "4.20 pm",
                start_time_4: "4.30 pm",
                start_time_5: "4.40 pm",
            },
        ];
        this.tableRows = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spreadArrays"])(fakeData);
        this.tableTemp = this.tableRows.map(function (prop, key) {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, prop), { no: key });
        });
    };
    SimulatorRideScheduleComponent.prototype.getSimulatorRideTime = function () {
        var _this = this;
        this.simridetimeService.get().subscribe(function (res) {
            console.log("res", res);
            _this.rows = res;
            _this.temp = _this.rows.map(function (prop, key) {
                return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, prop), { no: key });
            });
        }, function (err) {
            console.error("err", err);
        });
    };
    SimulatorRideScheduleComponent.prototype.entriesChange = function ($event) {
        this.tableEntries = $event.target.value;
    };
    SimulatorRideScheduleComponent.prototype.filterTable = function ($event) {
        var val = $event.target.value;
        this.tableTemp = this.tableRows.filter(function (d) {
            for (var key in d) {
                if (d[key]
                    .toString()
                    .toLowerCase()
                    .indexOf(val.toString().toLowerCase()) !== -1) {
                    return true;
                }
            }
            return false;
        });
    };
    SimulatorRideScheduleComponent.prototype.onSelect = function (_a) {
        var _b;
        var selected = _a.selected;
        this.tableSelected.splice(0, this.tableSelected.length);
        (_b = this.tableSelected).push.apply(_b, selected);
    };
    SimulatorRideScheduleComponent.prototype.onActivate = function (event) {
        this.tableActiveRow = event.row;
    };
    SimulatorRideScheduleComponent.prototype.openModal = function (modalRef, process, row) {
        if (process == "create") {
            this.simridetimeFormGroup.reset();
        }
        else if (process == "update") {
            this.simridetimeFormGroup.patchValue(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, row));
        }
        this.modal = this.modalService.show(modalRef, this.modalConfig);
    };
    SimulatorRideScheduleComponent.prototype.closeModal = function () {
        this.modal.hide();
    };
    SimulatorRideScheduleComponent.prototype.create = function () {
        var _this = this;
        this.simridetimeService.post(this.simridetimeFormGroup.value).subscribe(function (res) {
            console.log("res", res);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Berjaya",
                text: "Data anda berjaya disimpan.",
                type: "success",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
            })
                .then(function (result) {
                if (result.value) {
                    _this.modal.hide();
                    _this.getSimulatorRideTime();
                }
            });
        }, function (err) {
            console.error("err", err);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Ralat",
                text: "Data anda tidak berjaya disimpan. Sila cuba lagi",
                type: "warning",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-warning",
            })
                .then(function (result) {
                if (result.value) {
                    // this.modal.hide();
                }
            });
        });
    };
    SimulatorRideScheduleComponent.prototype.update = function () {
        var _this = this;
        this.simridetimeService
            .update(this.simridetimeFormGroup.value, this.simridetimeFormGroup.value.id)
            .subscribe(function (res) {
            console.log("res", res);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Berjaya",
                text: "Data anda berjaya dikemaskini.",
                type: "success",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
            })
                .then(function (result) {
                if (result.value) {
                    _this.modal.hide();
                    _this.getSimulatorRideTime();
                }
            });
        }, function (err) {
            console.error("err", err);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Ralat",
                text: "Data anda tidak berjaya dikemaskini. Sila cuba lagi",
                type: "warning",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-warning",
            })
                .then(function (result) {
                if (result.value) {
                    // this.modal.hide();
                }
            });
        });
    };
    SimulatorRideScheduleComponent.prototype.getDay = function (value) {
        var result = this.days.find(function (obj) {
            return obj.value == value;
        });
        return result.display_name;
    };
    SimulatorRideScheduleComponent.prototype.getRound = function (value) {
        var result = this.rounds.find(function (obj) {
            return obj.value == value;
        });
        return result.display_name;
    };
    SimulatorRideScheduleComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
        { type: ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__["BsModalService"] },
        { type: src_app_shared_services_simulator_ride_times_simulator_ride_times_service__WEBPACK_IMPORTED_MODULE_5__["SimulatorRideTimesService"] },
        { type: src_app_shared_services_venues_venues_service__WEBPACK_IMPORTED_MODULE_6__["VenuesService"] }
    ]; };
    SimulatorRideScheduleComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-simulator-ride-schedule",
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./simulator-ride-schedule.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/simulator-ride/simulator-ride-schedule/simulator-ride-schedule.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./simulator-ride-schedule.component.scss */ "./src/app/core/user/simulator-ride/simulator-ride-schedule/simulator-ride-schedule.component.scss")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__["BsModalService"],
            src_app_shared_services_simulator_ride_times_simulator_ride_times_service__WEBPACK_IMPORTED_MODULE_5__["SimulatorRideTimesService"],
            src_app_shared_services_venues_venues_service__WEBPACK_IMPORTED_MODULE_6__["VenuesService"]])
    ], SimulatorRideScheduleComponent);
    return SimulatorRideScheduleComponent;
}());



/***/ }),

/***/ "./src/app/core/user/surveys/surveys-answer/surveys-answer.component.scss":
/*!********************************************************************************!*\
  !*** ./src/app/core/user/surveys/surveys-answer/surveys-answer.component.scss ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvcmUvdXNlci9zdXJ2ZXlzL3N1cnZleXMtYW5zd2VyL3N1cnZleXMtYW5zd2VyLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/core/user/surveys/surveys-answer/surveys-answer.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/core/user/surveys/surveys-answer/surveys-answer.component.ts ***!
  \******************************************************************************/
/*! exports provided: SelectionType, SurveysAnswerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectionType", function() { return SelectionType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SurveysAnswerComponent", function() { return SurveysAnswerComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/__ivy_ngcc__/esm5/ngx-bootstrap.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var src_app_shared_services_survey_answers_survey_answers_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/shared/services/survey-answers/survey-answers.service */ "./src/app/shared/services/survey-answers/survey-answers.service.ts");
/* harmony import */ var src_app_shared_services_survey_questions_survey_questions_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/shared/services/survey-questions/survey-questions.service */ "./src/app/shared/services/survey-questions/survey-questions.service.ts");
/* harmony import */ var src_app_shared_services_users_users_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/shared/services/users/users.service */ "./src/app/shared/services/users/users.service.ts");









var SelectionType;
(function (SelectionType) {
    SelectionType["single"] = "single";
    SelectionType["multi"] = "multi";
    SelectionType["multiClick"] = "multiClick";
    SelectionType["cell"] = "cell";
    SelectionType["checkbox"] = "checkbox";
})(SelectionType || (SelectionType = {}));
var SurveysAnswerComponent = /** @class */ (function () {
    function SurveysAnswerComponent(formBuilder, modalService, route, surveyanswerService, surveyquestionService, userService) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.modalService = modalService;
        this.route = route;
        this.surveyanswerService = surveyanswerService;
        this.surveyquestionService = surveyquestionService;
        this.userService = userService;
        // Table
        this.tableEntries = 5;
        this.tableSelected = [];
        this.tableTemp = [];
        this.tableRows = [];
        this.SelectionType = SelectionType;
        this.modalConfig = {
            keyboard: true,
            class: "modal-dialog-centered",
        };
        // Dropdown
        this.questionnairetypes = [
            {
                value: "CB",
                display_name: "Checkbox",
            },
            {
                value: "SL",
                display_name: "Selection",
            },
            {
                value: "TB",
                display_name: "Textbox",
            },
            {
                value: "NA",
                display_name: "Not Available",
            },
        ];
        this.questionnairemodules = [
            {
                value: "M01",
                display_name: "Tayangan",
            },
            {
                value: "M02",
                display_name: "Pameran",
            },
            {
                value: "M03",
                display_name: "Program Pendidikan",
            },
            {
                value: "M04",
                display_name: "Perpustakaan Maya",
            },
            {
                value: "M05",
                display_name: "Kembara Simulasi",
            },
            {
                value: "M06",
                display_name: "Lawatan",
            },
            {
                value: "M07",
                display_name: "Penerbitan",
            },
            {
                value: "M08",
                display_name: "Fasiliti",
            },
            {
                value: "NAV",
                display_name: "Not Available",
            },
        ];
        // Data
        this.surveyquestion = {
            id: "",
            questionnaire_question: "",
            questionnaire_type: "",
            questionnaire_answer: "",
            questionnaire_module: "",
        };
        this.users = [];
        this.surveyanswerFormGroup = this.formBuilder.group({
            id: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            question: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            answer: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            survey_question_id: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            user_id: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
        });
        this.surveyanswerFormGroup.value.survey_question_id = this.route.snapshot.params.id;
        this.surveyquestionService
            .filter("id=" + this.surveyanswerFormGroup.value.survey_question_id)
            .subscribe(function (res) {
            console.log("res", res);
            _this.surveyquestion = res[0];
        }, function (err) {
            console.error("err", err);
        });
        this.getUser();
    }
    SurveysAnswerComponent.prototype.getUser = function () {
        var _this = this;
        this.userService.getAll().subscribe(function (res) {
            console.log("res", res);
            _this.users = res;
        }, function (err) {
            console.error("err", err);
        });
    };
    SurveysAnswerComponent.prototype.ngOnInit = function () {
        this.getData();
    };
    SurveysAnswerComponent.prototype.getData = function () {
        var _this = this;
        this.surveyanswerService
            .filter("survey_question_id=" +
            this.surveyanswerFormGroup.value.survey_question_id)
            .subscribe(function (res) {
            _this.tableRows = res;
            _this.tableTemp = _this.tableRows.map(function (prop, key) {
                return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, prop), { no: key });
            });
        });
    };
    SurveysAnswerComponent.prototype.entriesChange = function ($event) {
        this.tableEntries = $event.target.value;
    };
    SurveysAnswerComponent.prototype.filterTable = function ($event) {
        var val = $event.target.value;
        this.tableTemp = this.tableRows.filter(function (d) {
            for (var key in d) {
                if (d[key]
                    .toString()
                    .toLowerCase()
                    .indexOf(val.toString().toLowerCase()) !== -1) {
                    return true;
                }
            }
            return false;
        });
    };
    SurveysAnswerComponent.prototype.onSelect = function (_a) {
        var _b;
        var selected = _a.selected;
        this.tableSelected.splice(0, this.tableSelected.length);
        (_b = this.tableSelected).push.apply(_b, selected);
    };
    SurveysAnswerComponent.prototype.onActivate = function (event) {
        this.tableActiveRow = event.row;
    };
    SurveysAnswerComponent.prototype.openModal = function (modalRef, process, row) {
        if (process == "create") {
            this.surveyanswerFormGroup.reset();
        }
        else if (process == "update") {
            this.surveyanswerFormGroup.patchValue(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, row));
        }
        this.modal = this.modalService.show(modalRef, this.modalConfig);
    };
    SurveysAnswerComponent.prototype.closeModal = function () {
        this.modal.hide();
    };
    SurveysAnswerComponent.prototype.create = function () {
        var _this = this;
        this.surveyanswerService.post(this.surveyanswerFormGroup.value).subscribe(function (res) {
            console.log("res", res);
            sweetalert2__WEBPACK_IMPORTED_MODULE_5___default.a
                .fire({
                title: "Berjaya",
                text: "Data anda berjaya disimpan.",
                type: "success",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
            })
                .then(function (result) {
                if (result.value) {
                    _this.modal.hide();
                    _this.getData();
                }
            });
        }, function (err) {
            console.error("err", err);
            sweetalert2__WEBPACK_IMPORTED_MODULE_5___default.a
                .fire({
                title: "Ralat",
                text: "Data anda tidak berjaya disimpan. Sila cuba lagi",
                type: "warning",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-warning",
            })
                .then(function (result) {
                if (result.value) {
                    // this.modal.hide();
                }
            });
        });
    };
    SurveysAnswerComponent.prototype.update = function () {
        var _this = this;
        this.surveyanswerService
            .update(this.surveyanswerFormGroup.value, this.surveyanswerFormGroup.value.id)
            .subscribe(function (res) {
            console.log("res", res);
            sweetalert2__WEBPACK_IMPORTED_MODULE_5___default.a
                .fire({
                title: "Berjaya",
                text: "Data anda berjaya dikemaskini.",
                type: "success",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
            })
                .then(function (result) {
                if (result.value) {
                    _this.modal.hide();
                    _this.getData();
                }
            });
        }, function (err) {
            console.error("err", err);
            sweetalert2__WEBPACK_IMPORTED_MODULE_5___default.a
                .fire({
                title: "Ralat",
                text: "Data anda tidak berjaya dikemaskini. Sila cuba lagi",
                type: "warning",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-warning",
            })
                .then(function (result) {
                if (result.value) {
                    // this.modal.hide();
                }
            });
        });
    };
    SurveysAnswerComponent.prototype.getType = function (value) {
        var result = this.questionnairetypes.find(function (obj) {
            return obj.value == value;
        });
        return result.display_name;
    };
    SurveysAnswerComponent.prototype.getModule = function (value) {
        var result = this.questionnairemodules.find(function (obj) {
            return obj.value == value;
        });
        return result.display_name;
    };
    SurveysAnswerComponent.prototype.getUserOne = function (user_id) {
        var user = this.users.find(function (obj) {
            return obj.id == user_id;
        });
        return user.full_name;
    };
    SurveysAnswerComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
        { type: ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__["BsModalService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: src_app_shared_services_survey_answers_survey_answers_service__WEBPACK_IMPORTED_MODULE_6__["SurveyAnswersService"] },
        { type: src_app_shared_services_survey_questions_survey_questions_service__WEBPACK_IMPORTED_MODULE_7__["SurveyQuestionsService"] },
        { type: src_app_shared_services_users_users_service__WEBPACK_IMPORTED_MODULE_8__["UsersService"] }
    ]; };
    SurveysAnswerComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-surveys-answer",
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./surveys-answer.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/surveys/surveys-answer/surveys-answer.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./surveys-answer.component.scss */ "./src/app/core/user/surveys/surveys-answer/surveys-answer.component.scss")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__["BsModalService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            src_app_shared_services_survey_answers_survey_answers_service__WEBPACK_IMPORTED_MODULE_6__["SurveyAnswersService"],
            src_app_shared_services_survey_questions_survey_questions_service__WEBPACK_IMPORTED_MODULE_7__["SurveyQuestionsService"],
            src_app_shared_services_users_users_service__WEBPACK_IMPORTED_MODULE_8__["UsersService"]])
    ], SurveysAnswerComponent);
    return SurveysAnswerComponent;
}());



/***/ }),

/***/ "./src/app/core/user/surveys/surveys-list/surveys-list.component.scss":
/*!****************************************************************************!*\
  !*** ./src/app/core/user/surveys/surveys-list/surveys-list.component.scss ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvcmUvdXNlci9zdXJ2ZXlzL3N1cnZleXMtbGlzdC9zdXJ2ZXlzLWxpc3QuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/core/user/surveys/surveys-list/surveys-list.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/core/user/surveys/surveys-list/surveys-list.component.ts ***!
  \**************************************************************************/
/*! exports provided: SelectionType, SurveysListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectionType", function() { return SelectionType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SurveysListComponent", function() { return SurveysListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm5/forms.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/__ivy_ngcc__/esm5/ngx-bootstrap.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var src_app_shared_services_survey_questions_survey_questions_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/shared/services/survey-questions/survey-questions.service */ "./src/app/shared/services/survey-questions/survey-questions.service.ts");






var SelectionType;
(function (SelectionType) {
    SelectionType["single"] = "single";
    SelectionType["multi"] = "multi";
    SelectionType["multiClick"] = "multiClick";
    SelectionType["cell"] = "cell";
    SelectionType["checkbox"] = "checkbox";
})(SelectionType || (SelectionType = {}));
var SurveysListComponent = /** @class */ (function () {
    function SurveysListComponent(formBuilder, modalService, surveyquestionService) {
        this.formBuilder = formBuilder;
        this.modalService = modalService;
        this.surveyquestionService = surveyquestionService;
        // Table
        this.tableEntries = 5;
        this.tableSelected = [];
        this.tableTemp = [];
        this.tableRows = [];
        this.SelectionType = SelectionType;
        this.modalConfig = {
            keyboard: true,
            class: "modal-dialog-centered",
        };
        // Dropdown
        this.questionnairetypes = [
            {
                value: "CB",
                display_name: "Checkbox",
            },
            {
                value: "SL",
                display_name: "Selection",
            },
            {
                value: "TB",
                display_name: "Textbox",
            },
            {
                value: "RB",
                display_name: "Radiobox",
            },
            {
                value: "NA",
                display_name: "Not Available",
            },
        ];
        this.questionnairemodules = [
            {
                value: "M01",
                display_name: "Tayangan",
            },
            {
                value: "M02",
                display_name: "Pameran",
            },
            {
                value: "M03",
                display_name: "Program Pendidikan",
            },
            {
                value: "M04",
                display_name: "Perpustakaan Maya",
            },
            {
                value: "M05",
                display_name: "Kembara Simulasi",
            },
            {
                value: "M06",
                display_name: "Lawatan",
            },
            {
                value: "M07",
                display_name: "Penerbitan",
            },
            {
                value: "M08",
                display_name: "Fasiliti",
            },
            {
                value: "NAV",
                display_name: "Not Available",
            },
        ];
        this.surveyquestionFormGroup = this.formBuilder.group({
            id: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            questionnaire_question: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            questionnaire_type: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            questionnaire_answer: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]([]),
            questionnaire_module: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
        });
    }
    SurveysListComponent.prototype.ngOnInit = function () {
        this.getData();
    };
    SurveysListComponent.prototype.getData = function () {
        var _this = this;
        this.surveyquestionService.get().subscribe(function (res) {
            console.log("res", res);
            _this.tableRows = res;
            _this.tableTemp = _this.tableRows.map(function (prop, key) {
                return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, prop), { no: key });
            });
        });
    };
    SurveysListComponent.prototype.entriesChange = function ($event) {
        this.tableEntries = $event.target.value;
    };
    SurveysListComponent.prototype.filterTable = function ($event) {
        var val = $event.target.value;
        this.tableTemp = this.tableRows.filter(function (d) {
            for (var key in d) {
                if (d[key]
                    .toString()
                    .toLowerCase()
                    .indexOf(val.toString().toLowerCase()) !== -1) {
                    return true;
                }
            }
            return false;
        });
    };
    SurveysListComponent.prototype.onSelect = function (_a) {
        var _b;
        var selected = _a.selected;
        this.tableSelected.splice(0, this.tableSelected.length);
        (_b = this.tableSelected).push.apply(_b, selected);
    };
    SurveysListComponent.prototype.onActivate = function (event) {
        this.tableActiveRow = event.row;
    };
    SurveysListComponent.prototype.openModal = function (modalRef, process, row) {
        if (process == "create") {
            this.surveyquestionFormGroup.reset();
        }
        else if (process == "update") {
            this.surveyquestionFormGroup.patchValue(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, row));
        }
        this.modal = this.modalService.show(modalRef, this.modalConfig);
    };
    SurveysListComponent.prototype.closeModal = function () {
        this.modal.hide();
    };
    SurveysListComponent.prototype.create = function () {
        var _this = this;
        this.surveyquestionFormGroup.patchValue({
            questionnaire_answer: this.surveyquestionFormGroup.value.questionnaire_answer
                .replace(", ", ",")
                .split(","),
        });
        this.surveyquestionService
            .post(this.surveyquestionFormGroup.value)
            .subscribe(function (res) {
            console.log("res", res);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Berjaya",
                text: "Data anda berjaya disimpan.",
                type: "success",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
            })
                .then(function (result) {
                if (result.value) {
                    _this.modal.hide();
                    _this.getData();
                }
            });
        }, function (err) {
            console.error("err", err);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Ralat",
                text: "Data anda tidak berjaya disimpan. Sila cuba lagi",
                type: "warning",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-warning",
            })
                .then(function (result) {
                if (result.value) {
                    // this.modal.hide();
                }
            });
        });
    };
    SurveysListComponent.prototype.update = function () {
        var _this = this;
        this.surveyquestionFormGroup.patchValue({
            questionnaire_answer: this.surveyquestionFormGroup.value.questionnaire_answer
                .replace(", ", ",")
                .split(","),
        });
        this.surveyquestionService
            .update(this.surveyquestionFormGroup.value, this.surveyquestionFormGroup.value.id)
            .subscribe(function (res) {
            console.log("res", res);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Berjaya",
                text: "Data anda berjaya dikemaskini.",
                type: "success",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
            })
                .then(function (result) {
                if (result.value) {
                    _this.modal.hide();
                    _this.getData();
                }
            });
        }, function (err) {
            console.error("err", err);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Ralat",
                text: "Data anda tidak berjaya dikemaskini. Sila cuba lagi",
                type: "warning",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-warning",
            })
                .then(function (result) {
                if (result.value) {
                    // this.modal.hide();
                }
            });
        });
    };
    SurveysListComponent.prototype.getType = function (value) {
        var result = this.questionnairetypes.find(function (obj) {
            return obj.value == value;
        });
        return result.display_name;
    };
    SurveysListComponent.prototype.getModule = function (value) {
        var result = this.questionnairemodules.find(function (obj) {
            return obj.value == value;
        });
        return result.display_name;
    };
    SurveysListComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
        { type: ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__["BsModalService"] },
        { type: src_app_shared_services_survey_questions_survey_questions_service__WEBPACK_IMPORTED_MODULE_5__["SurveyQuestionsService"] }
    ]; };
    SurveysListComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-surveys-list",
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./surveys-list.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/surveys/surveys-list/surveys-list.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./surveys-list.component.scss */ "./src/app/core/user/surveys/surveys-list/surveys-list.component.scss")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__["BsModalService"],
            src_app_shared_services_survey_questions_survey_questions_service__WEBPACK_IMPORTED_MODULE_5__["SurveyQuestionsService"]])
    ], SurveysListComponent);
    return SurveysListComponent;
}());



/***/ }),

/***/ "./src/app/core/user/tickets/tickets-price/tickets-price.component.scss":
/*!******************************************************************************!*\
  !*** ./src/app/core/user/tickets/tickets-price/tickets-price.component.scss ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvcmUvdXNlci90aWNrZXRzL3RpY2tldHMtcHJpY2UvdGlja2V0cy1wcmljZS5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/core/user/tickets/tickets-price/tickets-price.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/core/user/tickets/tickets-price/tickets-price.component.ts ***!
  \****************************************************************************/
/*! exports provided: TicketsPriceComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TicketsPriceComponent", function() { return TicketsPriceComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");


var TicketsPriceComponent = /** @class */ (function () {
    function TicketsPriceComponent() {
    }
    TicketsPriceComponent.prototype.ngOnInit = function () {
    };
    TicketsPriceComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-tickets-price',
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./tickets-price.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/tickets/tickets-price/tickets-price.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./tickets-price.component.scss */ "./src/app/core/user/tickets/tickets-price/tickets-price.component.scss")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [])
    ], TicketsPriceComponent);
    return TicketsPriceComponent;
}());



/***/ }),

/***/ "./src/app/core/user/user.module.ts":
/*!******************************************!*\
  !*** ./src/app/core/user/user.module.ts ***!
  \******************************************/
/*! exports provided: UserModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserModule", function() { return UserModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/common.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/__ivy_ngcc__/esm5/ngx-bootstrap.js");
/* harmony import */ var ngx_bootstrap_datepicker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-bootstrap/datepicker */ "./node_modules/ngx-bootstrap/__ivy_ngcc__/datepicker/fesm5/ngx-bootstrap-datepicker.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm5/forms.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/__ivy_ngcc__/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var _ngx_loading_bar_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-loading-bar/core */ "./node_modules/@ngx-loading-bar/core/__ivy_ngcc__/fesm5/ngx-loading-bar-core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var _user_routing__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./user.routing */ "./src/app/core/user/user.routing.ts");
/* harmony import */ var _calendar_calendar_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./calendar/calendar.component */ "./src/app/core/user/calendar/calendar.component.ts");
/* harmony import */ var _exhibits_exhibits_list_exhibits_list_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./exhibits/exhibits-list/exhibits-list.component */ "./src/app/core/user/exhibits/exhibits-list/exhibits-list.component.ts");
/* harmony import */ var _facilities_facilities_application_facilities_application_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./facilities/facilities-application/facilities-application.component */ "./src/app/core/user/facilities/facilities-application/facilities-application.component.ts");
/* harmony import */ var _facilities_facilities_list_facilities_list_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./facilities/facilities-list/facilities-list.component */ "./src/app/core/user/facilities/facilities-list/facilities-list.component.ts");
/* harmony import */ var _programs_programs_application_programs_application_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./programs/programs-application/programs-application.component */ "./src/app/core/user/programs/programs-application/programs-application.component.ts");
/* harmony import */ var _programs_programs_list_programs_list_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./programs/programs-list/programs-list.component */ "./src/app/core/user/programs/programs-list/programs-list.component.ts");
/* harmony import */ var _programs_programs_waiting_list_programs_waiting_list_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./programs/programs-waiting-list/programs-waiting-list.component */ "./src/app/core/user/programs/programs-waiting-list/programs-waiting-list.component.ts");
/* harmony import */ var _publications_publications_list_publications_list_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./publications/publications-list/publications-list.component */ "./src/app/core/user/publications/publications-list/publications-list.component.ts");
/* harmony import */ var _reports_reports_operation_reports_operation_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./reports/reports-operation/reports-operation.component */ "./src/app/core/user/reports/reports-operation/reports-operation.component.ts");
/* harmony import */ var _reports_reports_analysis_reports_analysis_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./reports/reports-analysis/reports-analysis.component */ "./src/app/core/user/reports/reports-analysis/reports-analysis.component.ts");
/* harmony import */ var _reports_reports_ticket_sales_reports_ticket_sales_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./reports/reports-ticket-sales/reports-ticket-sales.component */ "./src/app/core/user/reports/reports-ticket-sales/reports-ticket-sales.component.ts");
/* harmony import */ var _shows_shows_schedule_shows_schedule_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./shows/shows-schedule/shows-schedule.component */ "./src/app/core/user/shows/shows-schedule/shows-schedule.component.ts");
/* harmony import */ var _shows_shows_list_shows_list_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./shows/shows-list/shows-list.component */ "./src/app/core/user/shows/shows-list/shows-list.component.ts");
/* harmony import */ var _simulator_ride_simulator_ride_schedule_simulator_ride_schedule_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./simulator-ride/simulator-ride-schedule/simulator-ride-schedule.component */ "./src/app/core/user/simulator-ride/simulator-ride-schedule/simulator-ride-schedule.component.ts");
/* harmony import */ var _simulator_ride_simulator_ride_applications_simulator_ride_applications_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./simulator-ride/simulator-ride-applications/simulator-ride-applications.component */ "./src/app/core/user/simulator-ride/simulator-ride-applications/simulator-ride-applications.component.ts");
/* harmony import */ var _tickets_tickets_price_tickets_price_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./tickets/tickets-price/tickets-price.component */ "./src/app/core/user/tickets/tickets-price/tickets-price.component.ts");
/* harmony import */ var _visits_visits_applications_visits_applications_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./visits/visits-applications/visits-applications.component */ "./src/app/core/user/visits/visits-applications/visits-applications.component.ts");
/* harmony import */ var _visits_visits_schedule_visits_schedule_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./visits/visits-schedule/visits-schedule.component */ "./src/app/core/user/visits/visits-schedule/visits-schedule.component.ts");
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./dashboard/dashboard.component */ "./src/app/core/user/dashboard/dashboard.component.ts");
/* harmony import */ var _virtual_libraries_virtual_libraries_list_virtual_libraries_list_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./virtual-libraries/virtual-libraries-list/virtual-libraries-list.component */ "./src/app/core/user/virtual-libraries/virtual-libraries-list/virtual-libraries-list.component.ts");
/* harmony import */ var _feedbacks_feedbacks_list_feedbacks_list_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./feedbacks/feedbacks-list/feedbacks-list.component */ "./src/app/core/user/feedbacks/feedbacks-list/feedbacks-list.component.ts");
/* harmony import */ var _surveys_surveys_list_surveys_list_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./surveys/surveys-list/surveys-list.component */ "./src/app/core/user/surveys/surveys-list/surveys-list.component.ts");
/* harmony import */ var _surveys_surveys_answer_surveys_answer_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./surveys/surveys-answer/surveys-answer.component */ "./src/app/core/user/surveys/surveys-answer/surveys-answer.component.ts");
/* harmony import */ var _assets_assets_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./assets/assets.component */ "./src/app/core/user/assets/assets.component.ts");
/* harmony import */ var _managements_users_users_component__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./managements/users/users.component */ "./src/app/core/user/managements/users/users.component.ts");



































var UserModule = /** @class */ (function () {
    function UserModule() {
    }
    UserModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _calendar_calendar_component__WEBPACK_IMPORTED_MODULE_10__["CalendarComponent"],
                _exhibits_exhibits_list_exhibits_list_component__WEBPACK_IMPORTED_MODULE_11__["ExhibitsListComponent"],
                _facilities_facilities_list_facilities_list_component__WEBPACK_IMPORTED_MODULE_13__["FacilitiesListComponent"],
                _facilities_facilities_application_facilities_application_component__WEBPACK_IMPORTED_MODULE_12__["FacilitiesApplicationComponent"],
                _publications_publications_list_publications_list_component__WEBPACK_IMPORTED_MODULE_17__["PublicationsListComponent"],
                _programs_programs_application_programs_application_component__WEBPACK_IMPORTED_MODULE_14__["ProgramsApplicationComponent"],
                _programs_programs_list_programs_list_component__WEBPACK_IMPORTED_MODULE_15__["ProgramsListComponent"],
                _programs_programs_waiting_list_programs_waiting_list_component__WEBPACK_IMPORTED_MODULE_16__["ProgramsWaitingListComponent"],
                _reports_reports_operation_reports_operation_component__WEBPACK_IMPORTED_MODULE_18__["ReportsOperationComponent"],
                _reports_reports_analysis_reports_analysis_component__WEBPACK_IMPORTED_MODULE_19__["ReportsAnalysisComponent"],
                _reports_reports_ticket_sales_reports_ticket_sales_component__WEBPACK_IMPORTED_MODULE_20__["ReportsTicketSalesComponent"],
                _shows_shows_schedule_shows_schedule_component__WEBPACK_IMPORTED_MODULE_21__["ShowsScheduleComponent"],
                _shows_shows_list_shows_list_component__WEBPACK_IMPORTED_MODULE_22__["ShowsListComponent"],
                _simulator_ride_simulator_ride_schedule_simulator_ride_schedule_component__WEBPACK_IMPORTED_MODULE_23__["SimulatorRideScheduleComponent"],
                _simulator_ride_simulator_ride_applications_simulator_ride_applications_component__WEBPACK_IMPORTED_MODULE_24__["SimulatorRideApplicationsComponent"],
                _tickets_tickets_price_tickets_price_component__WEBPACK_IMPORTED_MODULE_25__["TicketsPriceComponent"],
                _visits_visits_applications_visits_applications_component__WEBPACK_IMPORTED_MODULE_26__["VisitsApplicationsComponent"],
                _visits_visits_schedule_visits_schedule_component__WEBPACK_IMPORTED_MODULE_27__["VisitsScheduleComponent"],
                _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_28__["DashboardComponent"],
                _virtual_libraries_virtual_libraries_list_virtual_libraries_list_component__WEBPACK_IMPORTED_MODULE_29__["VirtualLibrariesListComponent"],
                _feedbacks_feedbacks_list_feedbacks_list_component__WEBPACK_IMPORTED_MODULE_30__["FeedbacksListComponent"],
                _surveys_surveys_list_surveys_list_component__WEBPACK_IMPORTED_MODULE_31__["SurveysListComponent"],
                _surveys_surveys_answer_surveys_answer_component__WEBPACK_IMPORTED_MODULE_32__["SurveysAnswerComponent"],
                _assets_assets_component__WEBPACK_IMPORTED_MODULE_33__["AssetsComponent"],
                _managements_users_users_component__WEBPACK_IMPORTED_MODULE_34__["UsersComponent"],
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__["AccordionModule"].forRoot(),
                ngx_bootstrap_datepicker__WEBPACK_IMPORTED_MODULE_4__["BsDatepickerModule"].forRoot(),
                ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__["BsDropdownModule"].forRoot(),
                ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__["ModalModule"].forRoot(),
                ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__["ProgressbarModule"].forRoot(),
                ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__["TabsModule"].forRoot(),
                ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__["TooltipModule"].forRoot(),
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
                _ngx_loading_bar_core__WEBPACK_IMPORTED_MODULE_7__["LoadingBarModule"],
                _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__["NgxDatatableModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_8__["RouterModule"].forChild(_user_routing__WEBPACK_IMPORTED_MODULE_9__["UserRoutes"]),
            ],
        })
    ], UserModule);
    return UserModule;
}());



/***/ }),

/***/ "./src/app/core/user/user.routing.ts":
/*!*******************************************!*\
  !*** ./src/app/core/user/user.routing.ts ***!
  \*******************************************/
/*! exports provided: UserRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserRoutes", function() { return UserRoutes; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _assets_assets_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/assets.component */ "./src/app/core/user/assets/assets.component.ts");
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dashboard/dashboard.component */ "./src/app/core/user/dashboard/dashboard.component.ts");
/* harmony import */ var _exhibits_exhibits_list_exhibits_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./exhibits/exhibits-list/exhibits-list.component */ "./src/app/core/user/exhibits/exhibits-list/exhibits-list.component.ts");
/* harmony import */ var _facilities_facilities_application_facilities_application_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./facilities/facilities-application/facilities-application.component */ "./src/app/core/user/facilities/facilities-application/facilities-application.component.ts");
/* harmony import */ var _facilities_facilities_list_facilities_list_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./facilities/facilities-list/facilities-list.component */ "./src/app/core/user/facilities/facilities-list/facilities-list.component.ts");
/* harmony import */ var _feedbacks_feedbacks_list_feedbacks_list_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./feedbacks/feedbacks-list/feedbacks-list.component */ "./src/app/core/user/feedbacks/feedbacks-list/feedbacks-list.component.ts");
/* harmony import */ var _managements_users_users_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./managements/users/users.component */ "./src/app/core/user/managements/users/users.component.ts");
/* harmony import */ var _programs_programs_application_programs_application_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./programs/programs-application/programs-application.component */ "./src/app/core/user/programs/programs-application/programs-application.component.ts");
/* harmony import */ var _programs_programs_list_programs_list_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./programs/programs-list/programs-list.component */ "./src/app/core/user/programs/programs-list/programs-list.component.ts");
/* harmony import */ var _publications_publications_list_publications_list_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./publications/publications-list/publications-list.component */ "./src/app/core/user/publications/publications-list/publications-list.component.ts");
/* harmony import */ var _reports_reports_analysis_reports_analysis_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./reports/reports-analysis/reports-analysis.component */ "./src/app/core/user/reports/reports-analysis/reports-analysis.component.ts");
/* harmony import */ var _reports_reports_operation_reports_operation_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./reports/reports-operation/reports-operation.component */ "./src/app/core/user/reports/reports-operation/reports-operation.component.ts");
/* harmony import */ var _reports_reports_ticket_sales_reports_ticket_sales_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./reports/reports-ticket-sales/reports-ticket-sales.component */ "./src/app/core/user/reports/reports-ticket-sales/reports-ticket-sales.component.ts");
/* harmony import */ var _shows_shows_list_shows_list_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./shows/shows-list/shows-list.component */ "./src/app/core/user/shows/shows-list/shows-list.component.ts");
/* harmony import */ var _shows_shows_schedule_shows_schedule_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./shows/shows-schedule/shows-schedule.component */ "./src/app/core/user/shows/shows-schedule/shows-schedule.component.ts");
/* harmony import */ var _simulator_ride_simulator_ride_applications_simulator_ride_applications_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./simulator-ride/simulator-ride-applications/simulator-ride-applications.component */ "./src/app/core/user/simulator-ride/simulator-ride-applications/simulator-ride-applications.component.ts");
/* harmony import */ var _simulator_ride_simulator_ride_schedule_simulator_ride_schedule_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./simulator-ride/simulator-ride-schedule/simulator-ride-schedule.component */ "./src/app/core/user/simulator-ride/simulator-ride-schedule/simulator-ride-schedule.component.ts");
/* harmony import */ var _surveys_surveys_answer_surveys_answer_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./surveys/surveys-answer/surveys-answer.component */ "./src/app/core/user/surveys/surveys-answer/surveys-answer.component.ts");
/* harmony import */ var _surveys_surveys_list_surveys_list_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./surveys/surveys-list/surveys-list.component */ "./src/app/core/user/surveys/surveys-list/surveys-list.component.ts");
/* harmony import */ var _tickets_tickets_price_tickets_price_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./tickets/tickets-price/tickets-price.component */ "./src/app/core/user/tickets/tickets-price/tickets-price.component.ts");
/* harmony import */ var _virtual_libraries_virtual_libraries_list_virtual_libraries_list_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./virtual-libraries/virtual-libraries-list/virtual-libraries-list.component */ "./src/app/core/user/virtual-libraries/virtual-libraries-list/virtual-libraries-list.component.ts");
/* harmony import */ var _visits_visits_applications_visits_applications_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./visits/visits-applications/visits-applications.component */ "./src/app/core/user/visits/visits-applications/visits-applications.component.ts");
/* harmony import */ var _visits_visits_schedule_visits_schedule_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./visits/visits-schedule/visits-schedule.component */ "./src/app/core/user/visits/visits-schedule/visits-schedule.component.ts");
























var UserRoutes = [
    {
        path: "",
        children: [
            // {
            //   path: "calendar",
            //   component: CalendarComponent,
            // },
            {
                path: "dashboard",
                component: _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_2__["DashboardComponent"],
            },
            {
                path: "exhibits",
                children: [
                    {
                        path: "list",
                        component: _exhibits_exhibits_list_exhibits_list_component__WEBPACK_IMPORTED_MODULE_3__["ExhibitsListComponent"],
                    },
                ],
            },
            {
                path: "facilities",
                children: [
                    {
                        path: "applications",
                        component: _facilities_facilities_application_facilities_application_component__WEBPACK_IMPORTED_MODULE_4__["FacilitiesApplicationComponent"],
                    },
                    {
                        path: "list",
                        component: _facilities_facilities_list_facilities_list_component__WEBPACK_IMPORTED_MODULE_5__["FacilitiesListComponent"],
                    },
                ],
            },
            {
                path: "programs",
                children: [
                    {
                        path: "applications",
                        component: _programs_programs_application_programs_application_component__WEBPACK_IMPORTED_MODULE_8__["ProgramsApplicationComponent"],
                    },
                    {
                        path: "list",
                        component: _programs_programs_list_programs_list_component__WEBPACK_IMPORTED_MODULE_9__["ProgramsListComponent"],
                    },
                ],
            },
            {
                path: "publications",
                children: [
                    {
                        path: "list",
                        component: _publications_publications_list_publications_list_component__WEBPACK_IMPORTED_MODULE_10__["PublicationsListComponent"],
                    },
                ],
            },
            {
                path: "virtual-libraries",
                children: [
                    {
                        path: "list",
                        component: _virtual_libraries_virtual_libraries_list_virtual_libraries_list_component__WEBPACK_IMPORTED_MODULE_21__["VirtualLibrariesListComponent"],
                    },
                ],
            },
            {
                path: "reports",
                children: [
                    {
                        path: "analysis",
                        component: _reports_reports_analysis_reports_analysis_component__WEBPACK_IMPORTED_MODULE_11__["ReportsAnalysisComponent"],
                    },
                    {
                        path: "operation",
                        component: _reports_reports_operation_reports_operation_component__WEBPACK_IMPORTED_MODULE_12__["ReportsOperationComponent"],
                    },
                    {
                        path: "ticket-sales",
                        component: _reports_reports_ticket_sales_reports_ticket_sales_component__WEBPACK_IMPORTED_MODULE_13__["ReportsTicketSalesComponent"],
                    },
                ],
            },
            {
                path: "shows",
                children: [
                    {
                        path: "list",
                        component: _shows_shows_list_shows_list_component__WEBPACK_IMPORTED_MODULE_14__["ShowsListComponent"],
                    },
                    {
                        path: "schedule",
                        component: _shows_shows_schedule_shows_schedule_component__WEBPACK_IMPORTED_MODULE_15__["ShowsScheduleComponent"],
                    },
                ],
            },
            {
                path: "simulator-ride",
                children: [
                    {
                        path: "schedule/:id",
                        component: _simulator_ride_simulator_ride_applications_simulator_ride_applications_component__WEBPACK_IMPORTED_MODULE_16__["SimulatorRideApplicationsComponent"],
                    },
                    {
                        path: "schedule",
                        component: _simulator_ride_simulator_ride_schedule_simulator_ride_schedule_component__WEBPACK_IMPORTED_MODULE_17__["SimulatorRideScheduleComponent"],
                    },
                ],
            },
            {
                path: "surveys",
                children: [
                    {
                        path: "list",
                        component: _surveys_surveys_list_surveys_list_component__WEBPACK_IMPORTED_MODULE_19__["SurveysListComponent"],
                    },
                    {
                        path: "list/:id",
                        component: _surveys_surveys_answer_surveys_answer_component__WEBPACK_IMPORTED_MODULE_18__["SurveysAnswerComponent"]
                    }
                ],
            },
            {
                path: "feedbacks",
                children: [
                    {
                        path: "list",
                        component: _feedbacks_feedbacks_list_feedbacks_list_component__WEBPACK_IMPORTED_MODULE_6__["FeedbacksListComponent"],
                    },
                ],
            },
            {
                path: "assets",
                children: [
                    {
                        path: "list",
                        component: _assets_assets_component__WEBPACK_IMPORTED_MODULE_1__["AssetsComponent"],
                    },
                ],
            },
            {
                path: "tickets",
                children: [
                    {
                        path: "prices",
                        component: _tickets_tickets_price_tickets_price_component__WEBPACK_IMPORTED_MODULE_20__["TicketsPriceComponent"],
                    },
                ],
            },
            {
                path: "visits",
                children: [
                    {
                        path: "applications",
                        component: _visits_visits_applications_visits_applications_component__WEBPACK_IMPORTED_MODULE_22__["VisitsApplicationsComponent"],
                    },
                    {
                        path: "schedule",
                        component: _visits_visits_schedule_visits_schedule_component__WEBPACK_IMPORTED_MODULE_23__["VisitsScheduleComponent"],
                    },
                ],
            },
            {
                path: "managements",
                children: [
                    {
                        path: "users",
                        component: _managements_users_users_component__WEBPACK_IMPORTED_MODULE_7__["UsersComponent"],
                    },
                ],
            },
        ],
    },
];


/***/ }),

/***/ "./src/app/core/user/virtual-libraries/virtual-libraries-list/virtual-libraries-list.component.scss":
/*!**********************************************************************************************************!*\
  !*** ./src/app/core/user/virtual-libraries/virtual-libraries-list/virtual-libraries-list.component.scss ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvcmUvdXNlci92aXJ0dWFsLWxpYnJhcmllcy92aXJ0dWFsLWxpYnJhcmllcy1saXN0L3ZpcnR1YWwtbGlicmFyaWVzLWxpc3QuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/core/user/virtual-libraries/virtual-libraries-list/virtual-libraries-list.component.ts":
/*!********************************************************************************************************!*\
  !*** ./src/app/core/user/virtual-libraries/virtual-libraries-list/virtual-libraries-list.component.ts ***!
  \********************************************************************************************************/
/*! exports provided: SelectionType, VirtualLibrariesListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectionType", function() { return SelectionType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VirtualLibrariesListComponent", function() { return VirtualLibrariesListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm5/forms.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/__ivy_ngcc__/esm5/ngx-bootstrap.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var src_app_shared_services_virtual_libraries_virtual_libraries_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/shared/services/virtual-libraries/virtual-libraries.service */ "./src/app/shared/services/virtual-libraries/virtual-libraries.service.ts");






var SelectionType;
(function (SelectionType) {
    SelectionType["single"] = "single";
    SelectionType["multi"] = "multi";
    SelectionType["multiClick"] = "multiClick";
    SelectionType["cell"] = "cell";
    SelectionType["checkbox"] = "checkbox";
})(SelectionType || (SelectionType = {}));
var VirtualLibrariesListComponent = /** @class */ (function () {
    function VirtualLibrariesListComponent(formBuilder, modalService, virtuallibraryService) {
        this.formBuilder = formBuilder;
        this.modalService = modalService;
        this.virtuallibraryService = virtuallibraryService;
        // Table
        this.tableEntries = 5;
        this.tableSelected = [];
        this.tableTemp = [];
        this.tableRows = [];
        this.SelectionType = SelectionType;
        this.modalConfig = {
            keyboard: true,
            class: "modal-dialog-centered",
        };
        this.virtuallibraryFormGroup = this.formBuilder.group({
            id: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            title: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            abstract: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            year: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
        });
    }
    VirtualLibrariesListComponent.prototype.ngOnInit = function () {
        this.getData();
    };
    VirtualLibrariesListComponent.prototype.getData = function () {
        var _this = this;
        this.virtuallibraryService.get().subscribe(function (res) {
            _this.tableRows = res;
            _this.tableTemp = _this.tableRows.map(function (prop, key) {
                return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, prop), { no: key });
            });
        });
    };
    VirtualLibrariesListComponent.prototype.entriesChange = function ($event) {
        this.tableEntries = $event.target.value;
    };
    VirtualLibrariesListComponent.prototype.filterTable = function ($event) {
        var val = $event.target.value;
        this.tableTemp = this.tableRows.filter(function (d) {
            for (var key in d) {
                if (d[key]
                    .toString()
                    .toLowerCase()
                    .indexOf(val.toString().toLowerCase()) !== -1) {
                    return true;
                }
            }
            return false;
        });
    };
    VirtualLibrariesListComponent.prototype.onSelect = function (_a) {
        var _b;
        var selected = _a.selected;
        this.tableSelected.splice(0, this.tableSelected.length);
        (_b = this.tableSelected).push.apply(_b, selected);
    };
    VirtualLibrariesListComponent.prototype.onActivate = function (event) {
        this.tableActiveRow = event.row;
    };
    VirtualLibrariesListComponent.prototype.openModal = function (modalRef, process, row) {
        if (process == "create") {
            this.virtuallibraryFormGroup.reset();
        }
        else if (process == "update") {
            this.virtuallibraryFormGroup.patchValue(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, row));
        }
        this.modal = this.modalService.show(modalRef, this.modalConfig);
    };
    VirtualLibrariesListComponent.prototype.closeModal = function () {
        this.modal.hide();
    };
    VirtualLibrariesListComponent.prototype.create = function () {
        var _this = this;
        this.virtuallibraryService
            .post(this.virtuallibraryFormGroup.value)
            .subscribe(function (res) {
            console.log("res", res);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Berjaya",
                text: "Data anda berjaya disimpan.",
                type: "success",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
            })
                .then(function (result) {
                if (result.value) {
                    _this.modal.hide();
                    _this.getData();
                }
            });
        }, function (err) {
            console.error("err", err);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Ralat",
                text: "Data anda tidak berjaya disimpan. Sila cuba lagi",
                type: "warning",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-warning",
            })
                .then(function (result) {
                if (result.value) {
                    // this.modal.hide();
                }
            });
        });
    };
    VirtualLibrariesListComponent.prototype.update = function () {
        var _this = this;
        this.virtuallibraryService
            .update(this.virtuallibraryFormGroup.value, this.virtuallibraryFormGroup.value.id)
            .subscribe(function (res) {
            console.log("res", res);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Berjaya",
                text: "Data anda berjaya dikemaskini.",
                type: "success",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
            })
                .then(function (result) {
                if (result.value) {
                    _this.modal.hide();
                    _this.getData();
                }
            });
        }, function (err) {
            console.error("err", err);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Ralat",
                text: "Data anda tidak berjaya dikemaskini. Sila cuba lagi",
                type: "warning",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-warning",
            })
                .then(function (result) {
                if (result.value) {
                    // this.modal.hide();
                }
            });
        });
    };
    VirtualLibrariesListComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
        { type: ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__["BsModalService"] },
        { type: src_app_shared_services_virtual_libraries_virtual_libraries_service__WEBPACK_IMPORTED_MODULE_5__["VirtualLibrariesService"] }
    ]; };
    VirtualLibrariesListComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-virtual-libraries-list",
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./virtual-libraries-list.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/virtual-libraries/virtual-libraries-list/virtual-libraries-list.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./virtual-libraries-list.component.scss */ "./src/app/core/user/virtual-libraries/virtual-libraries-list/virtual-libraries-list.component.scss")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__["BsModalService"],
            src_app_shared_services_virtual_libraries_virtual_libraries_service__WEBPACK_IMPORTED_MODULE_5__["VirtualLibrariesService"]])
    ], VirtualLibrariesListComponent);
    return VirtualLibrariesListComponent;
}());



/***/ }),

/***/ "./src/app/core/user/visits/visits-applications/visits-applications.component.scss":
/*!*****************************************************************************************!*\
  !*** ./src/app/core/user/visits/visits-applications/visits-applications.component.scss ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvcmUvdXNlci92aXNpdHMvdmlzaXRzLWFwcGxpY2F0aW9ucy92aXNpdHMtYXBwbGljYXRpb25zLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/core/user/visits/visits-applications/visits-applications.component.ts":
/*!***************************************************************************************!*\
  !*** ./src/app/core/user/visits/visits-applications/visits-applications.component.ts ***!
  \***************************************************************************************/
/*! exports provided: SelectionType, VisitsApplicationsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectionType", function() { return SelectionType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VisitsApplicationsComponent", function() { return VisitsApplicationsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm5/forms.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/__ivy_ngcc__/esm5/ngx-bootstrap.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var src_app_shared_services_users_users_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/shared/services/users/users.service */ "./src/app/shared/services/users/users.service.ts");
/* harmony import */ var src_app_shared_services_visit_applications_visit_applications_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/shared/services/visit-applications/visit-applications.service */ "./src/app/shared/services/visit-applications/visit-applications.service.ts");







var SelectionType;
(function (SelectionType) {
    SelectionType["single"] = "single";
    SelectionType["multi"] = "multi";
    SelectionType["multiClick"] = "multiClick";
    SelectionType["cell"] = "cell";
    SelectionType["checkbox"] = "checkbox";
})(SelectionType || (SelectionType = {}));
var VisitsApplicationsComponent = /** @class */ (function () {
    function VisitsApplicationsComponent(formBuilder, modalService, userService, visitappService) {
        this.formBuilder = formBuilder;
        this.modalService = modalService;
        this.userService = userService;
        this.visitappService = visitappService;
        // Table
        this.tableEntries = 5;
        this.tableSelected = [];
        this.tableTemp = [];
        this.tableRows = [];
        this.SelectionType = SelectionType;
        this.modalConfig = {
            keyboard: true,
            class: "modal-dialog-centered",
        };
        // Dropdown
        this.users = [];
        this.organisationcategories = [
            {
                value: "GV",
                display_name: "Government",
            },
            {
                value: "SC",
                display_name: "School",
            },
            {
                value: "UN",
                display_name: "University",
            },
            {
                value: "NA",
                display_name: "Not Available",
            },
        ];
        this.getUser();
        this.visitappFormGroup = this.formBuilder.group({
            id: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            title: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            description: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            organisation_name: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            organisation_category: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            visit_date: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            visit_time: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            total_participant: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            customer_id: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            pic_id: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
            status: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](""),
        });
    }
    VisitsApplicationsComponent.prototype.getUser = function () {
        var _this = this;
        this.userService.getAll().subscribe(function (res) {
            // console.log("res", res);
            _this.users = res;
        }, function (err) {
            console.error("err", err);
        });
    };
    VisitsApplicationsComponent.prototype.ngOnInit = function () {
        this.getData();
    };
    VisitsApplicationsComponent.prototype.getData = function () {
        var _this = this;
        this.visitappService.extended().subscribe(function (res) {
            _this.tableRows = res;
            _this.tableTemp = _this.tableRows.map(function (prop, key) {
                return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, prop), { no: key });
            });
        });
    };
    VisitsApplicationsComponent.prototype.entriesChange = function ($event) {
        this.tableEntries = $event.target.value;
    };
    VisitsApplicationsComponent.prototype.filterTable = function ($event) {
        var val = $event.target.value;
        this.tableTemp = this.tableRows.filter(function (d) {
            for (var key in d) {
                if (d[key]
                    .toString()
                    .toLowerCase()
                    .indexOf(val.toString().toLowerCase()) !== -1) {
                    return true;
                }
            }
            return false;
        });
    };
    VisitsApplicationsComponent.prototype.onSelect = function (_a) {
        var _b;
        var selected = _a.selected;
        this.tableSelected.splice(0, this.tableSelected.length);
        (_b = this.tableSelected).push.apply(_b, selected);
    };
    VisitsApplicationsComponent.prototype.onActivate = function (event) {
        this.tableActiveRow = event.row;
    };
    VisitsApplicationsComponent.prototype.openModal = function (modalRef, process, row) {
        if (process == "create") {
            this.visitappFormGroup.reset();
        }
        else if (process == "update") {
            this.visitappFormGroup.patchValue(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, row), { customer_id: row.customer_id.id, pic_id: row.pic_id.id }));
        }
        this.modal = this.modalService.show(modalRef, this.modalConfig);
    };
    VisitsApplicationsComponent.prototype.closeModal = function () {
        this.modal.hide();
    };
    VisitsApplicationsComponent.prototype.create = function () {
        var _this = this;
        this.visitappService.post(this.visitappFormGroup.value).subscribe(function (res) {
            // console.log("res", res);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Berjaya",
                text: "Data anda berjaya disimpan.",
                type: "success",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
            })
                .then(function (result) {
                if (result.value) {
                    _this.modal.hide();
                    _this.getData();
                }
            });
        }, function (err) {
            console.error("err", err);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Ralat",
                text: "Data anda tidak berjaya disimpan. Sila cuba lagi",
                type: "warning",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-warning",
            })
                .then(function (result) {
                if (result.value) {
                    // this.modal.hide();
                }
            });
        });
    };
    VisitsApplicationsComponent.prototype.update = function () {
        var _this = this;
        this.visitappService
            .update(this.visitappFormGroup.value, this.visitappFormGroup.value.id)
            .subscribe(function (res) {
            // console.log("res", res);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Berjaya",
                text: "Data anda berjaya dikemaskini.",
                type: "success",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
            })
                .then(function (result) {
                if (result.value) {
                    _this.modal.hide();
                    _this.getData();
                }
            });
        }, function (err) {
            console.error("err", err);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a
                .fire({
                title: "Ralat",
                text: "Data anda tidak berjaya dikemaskini. Sila cuba lagi",
                type: "warning",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-warning",
            })
                .then(function (result) {
                if (result.value) {
                    // this.modal.hide();
                }
            });
        });
    };
    VisitsApplicationsComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
        { type: ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__["BsModalService"] },
        { type: src_app_shared_services_users_users_service__WEBPACK_IMPORTED_MODULE_5__["UsersService"] },
        { type: src_app_shared_services_visit_applications_visit_applications_service__WEBPACK_IMPORTED_MODULE_6__["VisitApplicationsService"] }
    ]; };
    VisitsApplicationsComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-visits-applications",
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./visits-applications.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/visits/visits-applications/visits-applications.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./visits-applications.component.scss */ "./src/app/core/user/visits/visits-applications/visits-applications.component.scss")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__["BsModalService"],
            src_app_shared_services_users_users_service__WEBPACK_IMPORTED_MODULE_5__["UsersService"],
            src_app_shared_services_visit_applications_visit_applications_service__WEBPACK_IMPORTED_MODULE_6__["VisitApplicationsService"]])
    ], VisitsApplicationsComponent);
    return VisitsApplicationsComponent;
}());



/***/ }),

/***/ "./src/app/core/user/visits/visits-schedule/visits-schedule.component.scss":
/*!*********************************************************************************!*\
  !*** ./src/app/core/user/visits/visits-schedule/visits-schedule.component.scss ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvcmUvdXNlci92aXNpdHMvdmlzaXRzLXNjaGVkdWxlL3Zpc2l0cy1zY2hlZHVsZS5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/core/user/visits/visits-schedule/visits-schedule.component.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/core/user/visits/visits-schedule/visits-schedule.component.ts ***!
  \*******************************************************************************/
/*! exports provided: VisitsScheduleComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VisitsScheduleComponent", function() { return VisitsScheduleComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");


var VisitsScheduleComponent = /** @class */ (function () {
    function VisitsScheduleComponent() {
    }
    VisitsScheduleComponent.prototype.ngOnInit = function () {
    };
    VisitsScheduleComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-visits-schedule',
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./visits-schedule.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/core/user/visits/visits-schedule/visits-schedule.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./visits-schedule.component.scss */ "./src/app/core/user/visits/visits-schedule/visits-schedule.component.scss")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [])
    ], VisitsScheduleComponent);
    return VisitsScheduleComponent;
}());



/***/ }),

/***/ "./src/app/shared/services/assets/assets.service.ts":
/*!**********************************************************!*\
  !*** ./src/app/shared/services/assets/assets.service.ts ***!
  \**********************************************************/
/*! exports provided: AssetsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AssetsService", function() { return AssetsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");





var AssetsService = /** @class */ (function () {
    function AssetsService(http) {
        this.http = http;
        // URL
        this.url = src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].baseUrl + 'v1/assets/';
        // Data
        this.assets = [];
    }
    AssetsService.prototype.post = function (body) {
        return this.http.post(this.url, body).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log('Asset: ', res);
        }));
    };
    AssetsService.prototype.get = function () {
        var _this = this;
        return this.http.get(this.url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            _this.assets = res;
            console.log('Assets: ', res);
        }));
    };
    AssetsService.prototype.update = function (body, id) {
        var urlPatch = this.url + id + '/';
        return this.http.patch(urlPatch, body).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log('Asset: ', res);
        }));
    };
    AssetsService.prototype.delete = function (id) {
        var urlDelete = this.url + id + '/';
        return this.http.delete(urlDelete).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log('Asset: ', res);
        }));
    };
    AssetsService.prototype.extended = function () {
        var _this = this;
        return this.http.get(this.url + 'extended').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            _this.assets = res;
            console.log('Assets: ', res);
        }));
    };
    AssetsService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }
    ]; };
    AssetsService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]])
    ], AssetsService);
    return AssetsService;
}());



/***/ }),

/***/ "./src/app/shared/services/educational-program-applications/educational-program-applications.service.ts":
/*!**************************************************************************************************************!*\
  !*** ./src/app/shared/services/educational-program-applications/educational-program-applications.service.ts ***!
  \**************************************************************************************************************/
/*! exports provided: EducationalProgramApplicationsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EducationalProgramApplicationsService", function() { return EducationalProgramApplicationsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");





var EducationalProgramApplicationsService = /** @class */ (function () {
    function EducationalProgramApplicationsService(http) {
        this.http = http;
        // URL
        this.url = src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].baseUrl + 'v1/educational-program-applications/';
        // Data
        this.educationalProgramApplications = [];
    }
    EducationalProgramApplicationsService.prototype.post = function (body) {
        return this.http.post(this.url, body).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log('Educational program application: ', res);
        }));
    };
    EducationalProgramApplicationsService.prototype.get = function () {
        var _this = this;
        return this.http.get(this.url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            _this.educationalProgramApplications = res;
            console.log('Educational program applications: ', res);
        }));
    };
    EducationalProgramApplicationsService.prototype.update = function (body, id) {
        var urlPatch = this.url + id + '/';
        return this.http.patch(urlPatch, body).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log('Educational program application: ', res);
        }));
    };
    EducationalProgramApplicationsService.prototype.delete = function (id) {
        var urlDelete = this.url + id + '/';
        return this.http.delete(urlDelete).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log('Educational program application: ', res);
        }));
    };
    EducationalProgramApplicationsService.prototype.extended = function () {
        var _this = this;
        return this.http.get(this.url + 'extended').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            _this.educationalProgramApplications = res;
            console.log('Educational program applications: ', res);
        }));
    };
    EducationalProgramApplicationsService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }
    ]; };
    EducationalProgramApplicationsService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]])
    ], EducationalProgramApplicationsService);
    return EducationalProgramApplicationsService;
}());



/***/ }),

/***/ "./src/app/shared/services/educational-program-dates/educational-program-dates.service.ts":
/*!************************************************************************************************!*\
  !*** ./src/app/shared/services/educational-program-dates/educational-program-dates.service.ts ***!
  \************************************************************************************************/
/*! exports provided: EducationalProgramDatesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EducationalProgramDatesService", function() { return EducationalProgramDatesService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");





var EducationalProgramDatesService = /** @class */ (function () {
    function EducationalProgramDatesService(http) {
        this.http = http;
        // URL
        this.url = src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].baseUrl + "v1/educational-program-dates/";
        this.programdates = [];
        this.programdatesFiltered = [];
    }
    EducationalProgramDatesService.prototype.create = function (body) {
        return this.http.post(this.url, body).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log("Educational program date: ", res);
        }));
    };
    EducationalProgramDatesService.prototype.getAll = function () {
        var _this = this;
        return this.http.get(this.url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            _this.programdates = res;
            console.log("Educational program dates: ", _this.programdates);
        }));
    };
    EducationalProgramDatesService.prototype.getOne = function (id) {
        var _this = this;
        var urlID = this.url + id + "/";
        return this.http.get(urlID).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            _this.programdate = res;
            console.log("Educational program date: ", _this.programdate);
        }));
    };
    EducationalProgramDatesService.prototype.update = function (body, id) {
        var _this = this;
        var urlPatch = this.url + id + "/";
        return this.http.patch(urlPatch, body).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            _this.programdate = res;
            console.log("Educational program dates: ", _this.programdate);
        }));
    };
    EducationalProgramDatesService.prototype.delete = function (id) {
        var urlDelete = this.url + id + "/";
        return this.http.delete(urlDelete).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log("Educational prgoram: ", res);
        }));
    };
    EducationalProgramDatesService.prototype.filter = function (field) {
        var _this = this;
        var urlFilter = this.url + "?" + field;
        return this.http.get(urlFilter).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            _this.programdatesFiltered;
            console.log("Educational programs", _this.programdatesFiltered);
        }));
    };
    EducationalProgramDatesService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }
    ]; };
    EducationalProgramDatesService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: "root",
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]])
    ], EducationalProgramDatesService);
    return EducationalProgramDatesService;
}());



/***/ }),

/***/ "./src/app/shared/services/educational-programs/educational-programs.service.ts":
/*!**************************************************************************************!*\
  !*** ./src/app/shared/services/educational-programs/educational-programs.service.ts ***!
  \**************************************************************************************/
/*! exports provided: EducationalProgramsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EducationalProgramsService", function() { return EducationalProgramsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");





var EducationalProgramsService = /** @class */ (function () {
    function EducationalProgramsService(http) {
        this.http = http;
        // URL
        this.url = src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].baseUrl + 'v1/educational-programs/';
        this.programs = [];
        this.programsFiltered = [];
    }
    EducationalProgramsService.prototype.create = function (body) {
        return this.http.post(this.url, body).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log('Educational program: ', res);
        }));
    };
    EducationalProgramsService.prototype.getAll = function () {
        var _this = this;
        return this.http.get(this.url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            _this.programs = res;
            console.log('Educational programs: ', _this.programs);
        }));
    };
    EducationalProgramsService.prototype.getOne = function (id) {
        var _this = this;
        var urlID = this.url + id + '/';
        return this.http.get(urlID).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            _this.program = res;
            console.log('Educational program: ', _this.program);
        }));
    };
    EducationalProgramsService.prototype.update = function (body, id) {
        var _this = this;
        var urlPatch = this.url + id + '/';
        return this.http.patch(urlPatch, body).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            _this.program = res;
            console.log('Educational program: ', _this.program);
        }));
    };
    EducationalProgramsService.prototype.delete = function (id) {
        var urlDelete = this.url + id + '/';
        return this.http.delete(urlDelete).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log('Educational prgoram: ', res);
        }));
    };
    EducationalProgramsService.prototype.filter = function (field) {
        var _this = this;
        var urlFilter = this.url + '?' + field + '/';
        return this.http.get(urlFilter).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            _this.programsFiltered;
            console.log('Educational programs', _this.programsFiltered);
        }));
    };
    EducationalProgramsService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }
    ]; };
    EducationalProgramsService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]])
    ], EducationalProgramsService);
    return EducationalProgramsService;
}());



/***/ }),

/***/ "./src/app/shared/services/exhibits/exhibits.service.ts":
/*!**************************************************************!*\
  !*** ./src/app/shared/services/exhibits/exhibits.service.ts ***!
  \**************************************************************/
/*! exports provided: ExhibitsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExhibitsService", function() { return ExhibitsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");





var ExhibitsService = /** @class */ (function () {
    function ExhibitsService(http) {
        this.http = http;
        // URL
        this.url = src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].baseUrl + 'v1/exhibits/';
        // Data
        this.exhibits = [];
    }
    ExhibitsService.prototype.post = function (body) {
        return this.http.post(this.url, body).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log('Exhibit: ', res);
        }));
    };
    ExhibitsService.prototype.get = function () {
        var _this = this;
        return this.http.get(this.url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            _this.exhibits = res;
            console.log('Exhibits: ', res);
        }));
    };
    ExhibitsService.prototype.update = function (body, id) {
        var urlPatch = this.url + id + '/';
        return this.http.patch(urlPatch, body).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log('Exhibit: ', res);
        }));
    };
    ExhibitsService.prototype.delete = function (id) {
        var urlDelete = this.url + id + '/';
        return this.http.delete(urlDelete).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log('Exhibit: ', res);
        }));
    };
    ExhibitsService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }
    ]; };
    ExhibitsService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]])
    ], ExhibitsService);
    return ExhibitsService;
}());



/***/ }),

/***/ "./src/app/shared/services/facilities/facilities.service.ts":
/*!******************************************************************!*\
  !*** ./src/app/shared/services/facilities/facilities.service.ts ***!
  \******************************************************************/
/*! exports provided: FacilitiesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FacilitiesService", function() { return FacilitiesService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");





var FacilitiesService = /** @class */ (function () {
    function FacilitiesService(http) {
        this.http = http;
        // URL
        this.url = src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].baseUrl + 'v1/facilities/';
        // Data
        this.facilities = [];
    }
    FacilitiesService.prototype.post = function (body) {
        return this.http.post(this.url, body).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log('Facility: ', res);
        }));
    };
    FacilitiesService.prototype.get = function () {
        var _this = this;
        return this.http.get(this.url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            _this.facilities = res;
            console.log('Facilities: ', res);
        }));
    };
    FacilitiesService.prototype.update = function (body, id) {
        var urlPatch = this.url + id + '/';
        return this.http.patch(urlPatch, body).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log('Facility: ', res);
        }));
    };
    FacilitiesService.prototype.delete = function (id) {
        var urlDelete = this.url + id + '/';
        return this.http.delete(urlDelete).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log('Facility: ', res);
        }));
    };
    FacilitiesService.prototype.extended = function () {
        var _this = this;
        return this.http.get(this.url + 'extended').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            _this.facilities = res;
            console.log('Facilities: ', res);
        }));
    };
    FacilitiesService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }
    ]; };
    FacilitiesService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]])
    ], FacilitiesService);
    return FacilitiesService;
}());



/***/ }),

/***/ "./src/app/shared/services/facility-bookings/facility-bookings.service.ts":
/*!********************************************************************************!*\
  !*** ./src/app/shared/services/facility-bookings/facility-bookings.service.ts ***!
  \********************************************************************************/
/*! exports provided: FacilityBookingsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FacilityBookingsService", function() { return FacilityBookingsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");





var FacilityBookingsService = /** @class */ (function () {
    function FacilityBookingsService(http) {
        this.http = http;
        // URL
        this.url = src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].baseUrl + 'v1/facility-bookings/';
        // Data
        this.facilityBookings = [];
    }
    FacilityBookingsService.prototype.post = function (body) {
        return this.http.post(this.url, body).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log('Facility booking: ', res);
        }));
    };
    FacilityBookingsService.prototype.get = function () {
        var _this = this;
        return this.http.get(this.url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            _this.facilityBookings = res;
            console.log('Facility bookings: ', res);
        }));
    };
    FacilityBookingsService.prototype.update = function (body, id) {
        var urlPatch = this.url + id + '/';
        return this.http.patch(urlPatch, body).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log('Facility booking: ', res);
        }));
    };
    FacilityBookingsService.prototype.delete = function (id) {
        var urlDelete = this.url + id + '/';
        return this.http.delete(urlDelete).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log('Facility booking: ', res);
        }));
    };
    FacilityBookingsService.prototype.extended = function () {
        return this.http.get(this.url + 'extended').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log('Facility bookings: ', res);
        }));
    };
    FacilityBookingsService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }
    ]; };
    FacilityBookingsService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]])
    ], FacilityBookingsService);
    return FacilityBookingsService;
}());



/***/ }),

/***/ "./src/app/shared/services/feedbacks/feedbacks.service.ts":
/*!****************************************************************!*\
  !*** ./src/app/shared/services/feedbacks/feedbacks.service.ts ***!
  \****************************************************************/
/*! exports provided: FeedbacksService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeedbacksService", function() { return FeedbacksService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");





var FeedbacksService = /** @class */ (function () {
    function FeedbacksService(http) {
        this.http = http;
        // URL
        this.url = src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].baseUrl + "v1/feedbacks/";
        // Data
        this.feedbacks = [];
    }
    FeedbacksService.prototype.post = function (body) {
        return this.http.post(this.url, body).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log("Feedback: ", res);
        }));
    };
    FeedbacksService.prototype.get = function () {
        var _this = this;
        return this.http.get(this.url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            _this.feedbacks = res;
            console.log("Feedbacks: ", res);
        }));
    };
    FeedbacksService.prototype.update = function (body, id) {
        var urlPatch = this.url + id + "/";
        return this.http.patch(urlPatch, body).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log("Feedback: ", res);
        }));
    };
    FeedbacksService.prototype.delete = function (id) {
        var urlDelete = this.url + id + "/";
        return this.http.delete(urlDelete).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log("Feedback: ", res);
        }));
    };
    FeedbacksService.prototype.extended = function () {
        var _this = this;
        return this.http.get(this.url + 'extended').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            _this.feedbacks = res;
            console.log("Feedbacks: ", res);
        }));
    };
    FeedbacksService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }
    ]; };
    FeedbacksService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: "root",
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]])
    ], FeedbacksService);
    return FeedbacksService;
}());



/***/ }),

/***/ "./src/app/shared/services/publications/publications.service.ts":
/*!**********************************************************************!*\
  !*** ./src/app/shared/services/publications/publications.service.ts ***!
  \**********************************************************************/
/*! exports provided: PublicationsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PublicationsService", function() { return PublicationsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");





var PublicationsService = /** @class */ (function () {
    function PublicationsService(http) {
        this.http = http;
        // URL
        this.url = src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].baseUrl + 'v1/publications/';
        // Data
        this.publications = [];
    }
    PublicationsService.prototype.post = function (body) {
        return this.http.post(this.url, body).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log('Publication: ', res);
        }));
    };
    PublicationsService.prototype.get = function () {
        var _this = this;
        return this.http.get(this.url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            _this.publications = res;
            console.log('Publications: ', res);
        }));
    };
    PublicationsService.prototype.update = function (body, id) {
        var urlPatch = this.url + id + '/';
        return this.http.patch(urlPatch, body).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log('Publication: ', res);
        }));
    };
    PublicationsService.prototype.delete = function (id) {
        var urlDelete = this.url + id + '/';
        return this.http.delete(urlDelete).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log('Publication: ', res);
        }));
    };
    PublicationsService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }
    ]; };
    PublicationsService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]])
    ], PublicationsService);
    return PublicationsService;
}());



/***/ }),

/***/ "./src/app/shared/services/showings/showings.service.ts":
/*!**************************************************************!*\
  !*** ./src/app/shared/services/showings/showings.service.ts ***!
  \**************************************************************/
/*! exports provided: ShowingsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShowingsService", function() { return ShowingsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");





var ShowingsService = /** @class */ (function () {
    function ShowingsService(http) {
        this.http = http;
        // URL
        this.url = src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].baseUrl + "v1/showings/";
        // Data
        this.showings = [];
    }
    ShowingsService.prototype.post = function (body) {
        return this.http.post(this.url, body).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log("Showing: ", res);
        }));
    };
    ShowingsService.prototype.get = function () {
        var _this = this;
        return this.http.get(this.url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            _this.showings = res;
            console.log("Showings: ", res);
        }));
    };
    ShowingsService.prototype.update = function (body, id) {
        var urlPatch = this.url + id + "/";
        return this.http.patch(urlPatch, body).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log("Showing: ", res);
        }));
    };
    ShowingsService.prototype.delete = function (id) {
        var urlDelete = this.url + id + "/";
        return this.http.delete(urlDelete).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log("Showing: ", res);
        }));
    };
    ShowingsService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }
    ]; };
    ShowingsService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: "root",
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]])
    ], ShowingsService);
    return ShowingsService;
}());



/***/ }),

/***/ "./src/app/shared/services/showtimes/showtimes.service.ts":
/*!****************************************************************!*\
  !*** ./src/app/shared/services/showtimes/showtimes.service.ts ***!
  \****************************************************************/
/*! exports provided: ShowtimesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShowtimesService", function() { return ShowtimesService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");





var ShowtimesService = /** @class */ (function () {
    function ShowtimesService(http) {
        this.http = http;
        // URL
        this.url = src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].baseUrl + 'v1/show-times/';
        // Data
        this.showtimes = [];
    }
    ShowtimesService.prototype.post = function (body) {
        return this.http.post(this.url, body).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log('Showtime: ', res);
        }));
    };
    ShowtimesService.prototype.get = function () {
        var _this = this;
        return this.http.get(this.url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            _this.showtimes = res;
            console.log('Showtimes: ', res);
        }));
    };
    ShowtimesService.prototype.update = function (body, id) {
        var urlPatch = this.url + id + '/';
        return this.http.patch(urlPatch, body).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log('Showtime: ', res);
        }));
    };
    ShowtimesService.prototype.delete = function (id) {
        var urlDelete = this.url + id + '/';
        return this.http.delete(urlDelete).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log('Showtime: ', res);
        }));
    };
    ShowtimesService.prototype.extended = function () {
        var _this = this;
        return this.http.get(this.url + 'extended').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            _this.showtimes = res;
            console.log('Showtimes: ', res);
        }));
    };
    ShowtimesService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }
    ]; };
    ShowtimesService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]])
    ], ShowtimesService);
    return ShowtimesService;
}());



/***/ }),

/***/ "./src/app/shared/services/simulator-ride-bookings/simulator-ride-bookings.service.ts":
/*!********************************************************************************************!*\
  !*** ./src/app/shared/services/simulator-ride-bookings/simulator-ride-bookings.service.ts ***!
  \********************************************************************************************/
/*! exports provided: SimulatorRideBookingsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimulatorRideBookingsService", function() { return SimulatorRideBookingsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");





var SimulatorRideBookingsService = /** @class */ (function () {
    function SimulatorRideBookingsService(http) {
        this.http = http;
        // URL
        this.url = src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].baseUrl + "v1/simulator-ride-bookings/";
        // Data
        this.simulatorridebookings = [];
    }
    SimulatorRideBookingsService.prototype.post = function (body) {
        return this.http.post(this.url, body).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log("SimulatorRideBooking: ", res);
        }));
    };
    SimulatorRideBookingsService.prototype.get = function () {
        var _this = this;
        return this.http.get(this.url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            _this.simulatorridebookings = res;
            console.log("SimulatorRideBookings: ", res);
        }));
    };
    SimulatorRideBookingsService.prototype.update = function (body, id) {
        var urlPatch = this.url + id + "/";
        return this.http.patch(urlPatch, body).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log("SimulatorRideBooking: ", res);
        }));
    };
    SimulatorRideBookingsService.prototype.delete = function (id) {
        var urlDelete = this.url + id + "/";
        return this.http.delete(urlDelete).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log("SimulatorRideBooking: ", res);
        }));
    };
    SimulatorRideBookingsService.prototype.filter = function (field) {
        var urlFilter = this.url + '?' + field;
        console.log(urlFilter);
        return this.http.get(urlFilter).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log("SimulatorRideBookings: ", res);
        }));
    };
    SimulatorRideBookingsService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }
    ]; };
    SimulatorRideBookingsService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: "root",
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]])
    ], SimulatorRideBookingsService);
    return SimulatorRideBookingsService;
}());



/***/ }),

/***/ "./src/app/shared/services/simulator-ride-times/simulator-ride-times.service.ts":
/*!**************************************************************************************!*\
  !*** ./src/app/shared/services/simulator-ride-times/simulator-ride-times.service.ts ***!
  \**************************************************************************************/
/*! exports provided: SimulatorRideTimesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimulatorRideTimesService", function() { return SimulatorRideTimesService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");





var SimulatorRideTimesService = /** @class */ (function () {
    function SimulatorRideTimesService(http) {
        this.http = http;
        // URL
        this.url = src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].baseUrl + "v1/simulator-ride-times/";
        // Data
        this.simulatorridetimes = [];
    }
    SimulatorRideTimesService.prototype.post = function (body) {
        return this.http.post(this.url, body).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log("SimulatorRideTime: ", res);
        }));
    };
    SimulatorRideTimesService.prototype.get = function () {
        var _this = this;
        return this.http.get(this.url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            _this.simulatorridetimes = res;
            console.log("SimulatorRideTimes: ", res);
        }));
    };
    SimulatorRideTimesService.prototype.update = function (body, id) {
        var urlPatch = this.url + id + "/";
        return this.http.patch(urlPatch, body).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log("SimulatorRideTime: ", res);
        }));
    };
    SimulatorRideTimesService.prototype.delete = function (id) {
        var urlDelete = this.url + id + "/";
        return this.http.delete(urlDelete).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log("SimulatorRideTime: ", res);
        }));
    };
    SimulatorRideTimesService.prototype.filter = function (field) {
        var urlFilter = this.url + '?' + field;
        return this.http.get(urlFilter).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log("SimulatorRideTimes: ", res);
        }));
    };
    SimulatorRideTimesService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }
    ]; };
    SimulatorRideTimesService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: "root",
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]])
    ], SimulatorRideTimesService);
    return SimulatorRideTimesService;
}());



/***/ }),

/***/ "./src/app/shared/services/survey-answers/survey-answers.service.ts":
/*!**************************************************************************!*\
  !*** ./src/app/shared/services/survey-answers/survey-answers.service.ts ***!
  \**************************************************************************/
/*! exports provided: SurveyAnswersService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SurveyAnswersService", function() { return SurveyAnswersService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");





var SurveyAnswersService = /** @class */ (function () {
    function SurveyAnswersService(http) {
        this.http = http;
        // URL
        this.url = src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].baseUrl + "v1/survey-answers/";
        // Data
        this.surveyAnswers = [];
    }
    SurveyAnswersService.prototype.post = function (body) {
        return this.http.post(this.url, body).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log("Survey answer: ", res);
        }));
    };
    SurveyAnswersService.prototype.get = function () {
        var _this = this;
        return this.http.get(this.url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            _this.surveyAnswers = res;
            console.log("Survey answers: ", res);
        }));
    };
    SurveyAnswersService.prototype.update = function (body, id) {
        var urlPatch = this.url + id + "/";
        return this.http.patch(urlPatch, body).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log("Survey answer: ", res);
        }));
    };
    SurveyAnswersService.prototype.delete = function (id) {
        var urlDelete = this.url + id + "/";
        return this.http.delete(urlDelete).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log("Survey answer: ", res);
        }));
    };
    SurveyAnswersService.prototype.filter = function (field) {
        var urlFilter = this.url + "?" + field;
        return this.http.get(urlFilter).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log("Survey answer", res);
        }));
    };
    SurveyAnswersService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }
    ]; };
    SurveyAnswersService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: "root",
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]])
    ], SurveyAnswersService);
    return SurveyAnswersService;
}());



/***/ }),

/***/ "./src/app/shared/services/survey-questions/survey-questions.service.ts":
/*!******************************************************************************!*\
  !*** ./src/app/shared/services/survey-questions/survey-questions.service.ts ***!
  \******************************************************************************/
/*! exports provided: SurveyQuestionsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SurveyQuestionsService", function() { return SurveyQuestionsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");





var SurveyQuestionsService = /** @class */ (function () {
    function SurveyQuestionsService(http) {
        this.http = http;
        // URL
        this.url = src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].baseUrl + 'v1/survey-questions/';
        // Data
        this.surveyQuestions = [];
    }
    SurveyQuestionsService.prototype.post = function (body) {
        return this.http.post(this.url, body).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log('Survey question: ', res);
        }));
    };
    SurveyQuestionsService.prototype.get = function () {
        var _this = this;
        return this.http.get(this.url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            _this.surveyQuestions = res;
            console.log('Survey questions: ', res);
        }));
    };
    SurveyQuestionsService.prototype.update = function (body, id) {
        var urlPatch = this.url + id + '/';
        return this.http.patch(urlPatch, body).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log('Survey question: ', res);
        }));
    };
    SurveyQuestionsService.prototype.delete = function (id) {
        var urlDelete = this.url + id + '/';
        return this.http.delete(urlDelete).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log('Survey question: ', res);
        }));
    };
    SurveyQuestionsService.prototype.filter = function (field) {
        var urlFilter = this.url + "?" + field;
        return this.http.get(urlFilter).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log("Survey question", res);
        }));
    };
    SurveyQuestionsService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }
    ]; };
    SurveyQuestionsService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]])
    ], SurveyQuestionsService);
    return SurveyQuestionsService;
}());



/***/ }),

/***/ "./src/app/shared/services/venues/venues.service.ts":
/*!**********************************************************!*\
  !*** ./src/app/shared/services/venues/venues.service.ts ***!
  \**********************************************************/
/*! exports provided: VenuesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VenuesService", function() { return VenuesService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");





var VenuesService = /** @class */ (function () {
    function VenuesService(http) {
        this.http = http;
        // URL
        this.url = src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].baseUrl + 'v1/venues/';
        // Data
        this.venues = [];
    }
    VenuesService.prototype.post = function (body) {
        return this.http.post(this.url, body).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log('Venue: ', res);
        }));
    };
    VenuesService.prototype.get = function () {
        var _this = this;
        return this.http.get(this.url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            _this.venues = res;
            console.log('Venues: ', res);
        }));
    };
    VenuesService.prototype.update = function (body, id) {
        var urlPatch = this.url + id + '/';
        return this.http.patch(urlPatch, body).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log('Venue: ', res);
        }));
    };
    VenuesService.prototype.delete = function (id) {
        var urlDelete = this.url + id + '/';
        return this.http.delete(urlDelete).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log('Venue: ', res);
        }));
    };
    VenuesService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }
    ]; };
    VenuesService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]])
    ], VenuesService);
    return VenuesService;
}());



/***/ }),

/***/ "./src/app/shared/services/virtual-libraries/virtual-libraries.service.ts":
/*!********************************************************************************!*\
  !*** ./src/app/shared/services/virtual-libraries/virtual-libraries.service.ts ***!
  \********************************************************************************/
/*! exports provided: VirtualLibrariesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VirtualLibrariesService", function() { return VirtualLibrariesService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");





var VirtualLibrariesService = /** @class */ (function () {
    function VirtualLibrariesService(http) {
        this.http = http;
        // URL
        this.url = src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].baseUrl + "v1/virtual-libraries/";
        // Data
        this.virtuallibraries = [];
    }
    VirtualLibrariesService.prototype.post = function (body) {
        return this.http.post(this.url, body).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log("Virtual library: ", res);
        }));
    };
    VirtualLibrariesService.prototype.get = function () {
        var _this = this;
        return this.http.get(this.url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            _this.virtuallibraries = res;
            console.log("Virtual libraries: ", res);
        }));
    };
    VirtualLibrariesService.prototype.update = function (body, id) {
        var urlPatch = this.url + id + "/";
        return this.http.patch(urlPatch, body).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log("Virtual library: ", res);
        }));
    };
    VirtualLibrariesService.prototype.delete = function (id) {
        var urlDelete = this.url + id + "/";
        return this.http.delete(urlDelete).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log("Virtual library: ", res);
        }));
    };
    VirtualLibrariesService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }
    ]; };
    VirtualLibrariesService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: "root",
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]])
    ], VirtualLibrariesService);
    return VirtualLibrariesService;
}());



/***/ }),

/***/ "./src/app/shared/services/visit-applications/visit-applications.service.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/shared/services/visit-applications/visit-applications.service.ts ***!
  \**********************************************************************************/
/*! exports provided: VisitApplicationsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VisitApplicationsService", function() { return VisitApplicationsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");





var VisitApplicationsService = /** @class */ (function () {
    function VisitApplicationsService(http) {
        this.http = http;
        // URL
        this.url = src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].baseUrl + "v1/visit-applications/";
        // Data
        this.visitApplications = [];
    }
    VisitApplicationsService.prototype.post = function (body) {
        return this.http.post(this.url, body).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log("Visit application: ", res);
        }));
    };
    VisitApplicationsService.prototype.get = function () {
        var _this = this;
        return this.http.get(this.url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            _this.visitApplications = res;
            console.log("Visit applications: ", res);
        }));
    };
    VisitApplicationsService.prototype.update = function (body, id) {
        var urlPatch = this.url + id + "/";
        return this.http.patch(urlPatch, body).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log("Visit application: ", res);
        }));
    };
    VisitApplicationsService.prototype.delete = function (id) {
        var urlDelete = this.url + id + "/";
        return this.http.delete(urlDelete).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            console.log("Visit application: ", res);
        }));
    };
    VisitApplicationsService.prototype.extended = function () {
        var _this = this;
        return this.http.get(this.url + 'extended').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            _this.visitApplications = res;
            console.log("Visit applications: ", res);
        }));
    };
    VisitApplicationsService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }
    ]; };
    VisitApplicationsService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: "root",
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]])
    ], VisitApplicationsService);
    return VisitApplicationsService;
}());



/***/ })

}]);
//# sourceMappingURL=core-user-user-module.js.map