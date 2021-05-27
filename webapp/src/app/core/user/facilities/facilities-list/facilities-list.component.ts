import { Component, OnInit, TemplateRef } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import swal from "sweetalert2";

import { FacilitiesService } from "src/app/shared/services/facilities/facilities.service";
import { FacilityImagesService } from "src/app/shared/services/facility-images/facility-images.service";
import { FacilityPricesService } from "src/app/shared/services/facility-prices/facility-prices.service";
import { FacilitySubcategoriesService } from "src/app/shared/services/facility-subcategories/facility-subcategories.service";
// import { AssetsService } from "src/app/shared/services/assets/assets.service";
import { UsersService } from "src/app/shared/services/users/users.service";
import { VenuesService } from "src/app/shared/services/venues/venues.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-facilities-list",
  templateUrl: "./facilities-list.component.html",
  styleUrls: ["./facilities-list.component.scss"],
})
export class FacilitiesListComponent implements OnInit {
  // Data
  facilityimages = [];
  facilityprices = [];

  // Table
  tableEntries: number = 5;
  tableSelected: any[] = [];
  tableTemp = [];
  tableActiveRow: any;
  tableRows: any[] = [];
  SelectionType = SelectionType;

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog modal-lg",
    ignoreBackdropClick: true,
  };

  // FormGroup
  facilityFormGroup: FormGroup;
  facilityimageFormGroup: FormGroup;
  facilitypriceFormGroup: FormGroup;

  // Dropdown
  // assets = [];
  users = [];
  venues = [];
  facilitycategories = [
    {
      value: "TA",
      display_name: "Teater Angkasa",
    },
    {
      value: "GP",
      display_name: "Galeri Pameran",
    },
    {
      value: "TT",
      display_name: "Teatret",
    },
    {
      value: "BC",
      display_name: "Bilik Centaurus",
    },
    {
      value: "KR",
      display_name: "Kawasan Rekreasi",
    },
    {
      value: "SM",
      display_name: "Stesen Mikrosatelit",
    },
    {
      value: "NA",
      display_name: "Tiada",
    },
  ];
  facilitysubcategories = [];
  facilitydays = [
    {
      value: "HALF",
      display_name: "Separuh Hari",
    },
    {
      value: "FULL",
      display_name: "Satu Hari",
    },
    {
      value: "NONE",
      display_name: "Tiada",
    },
  ];

  // Quill
  modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ["clean"], // remove formatting button

      ["link"], // link and image, video
    ],
  };

  constructor(
    public formBuilder: FormBuilder,
    private modalService: BsModalService,
    private facilityService: FacilitiesService,
    private facilityimageService: FacilityImagesService,
    private facilitypriceService: FacilityPricesService,
    private facilitysubcategoryService: FacilitySubcategoriesService,
    // private assetService: AssetsService,
    private userService: UsersService,
    private venueService: VenuesService
  ) {
    // this.getAsset();
    this.getUser();
    this.getVenue();
    this.getFacilitySubcategory();

    this.facilityFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      name_en: new FormControl(""),
      name_ms: new FormControl(""),
      description_en: new FormControl(""),
      description_ms: new FormControl(""),
      facility_category: new FormControl(""),
      facility_subcategory: new FormControl(""),
      area_size: new FormControl(""),
      max_capacity: new FormControl(""),
      have_price: new FormControl(false),
      // pdf_link: new FormControl(""),
      // promo_link: new FormControl(""),
      pic_id: new FormControl(""),
      // asset_id: new FormControl(""),
      venue_id: new FormControl(""),
      equipment_name_en: new FormControl(""),
      equipment_name_ms: new FormControl(""),
      equipment_description_en: new FormControl(""),
      equipment_description_ms: new FormControl(""),
    });

    this.facilityimageFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      facility_image: new FormControl(""),
      facility_id: new FormControl(""),
    });

    this.facilitypriceFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      facility_description_en: new FormControl(""),
      facility_description_ms: new FormControl(""),
      facility_price_half: new FormControl(0),
      facility_price_full: new FormControl(0),
      equipment: new FormControl(""),
      // facility_days: new FormControl("NONE"),
      facility_id: new FormControl(""),
    });
  }

  /* getAsset() {
    this.assetService.get().subscribe(
      (res) => {
        // console.log("res", res);
        this.assets = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
  } */

  getUser() {
    this.userService.getAll().subscribe(
      (res) => {
        // console.log("res", res);
        res.forEach((obj) => {
          if (obj.user_type != "CS") this.users.push(obj);
        });
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  getVenue() {
    this.venueService.get().subscribe(
      (res) => {
        // console.log("res", res);
        this.venues = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  getFacilitySubcategory() {
    this.facilitysubcategoryService.filter("status=true").subscribe(
      (res) => {
        // console.log("res", res);
        this.facilitysubcategories = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.facilityService.extended().subscribe((res) => {
      this.tableRows = res;
      this.tableTemp = this.tableRows.map((prop, key) => {
        return {
          ...prop,
          no: key,
        };
      });
    });
  }

  entriesChange($event) {
    this.tableEntries = $event.target.value;
  }

  filterTable($event) {
    let val = $event.target.value;
    this.tableTemp = this.tableRows.filter(function (d) {
      for (var key in d) {
        if (
          d[key]
            .toString()
            .toLowerCase()
            .indexOf(val.toString().toLowerCase()) !== -1
        ) {
          return true;
        }
      }
      return false;
    });
  }

  onSelect({ selected }) {
    this.tableSelected.splice(0, this.tableSelected.length);
    this.tableSelected.push(...selected);
  }

  onActivate(event) {
    this.tableActiveRow = event.row;
  }

  emptyFacilityFormGroup() {
    this.facilityFormGroup.patchValue({
      // name_en: "",
      // name_ms: "",
      // description_en: "",
      // description_ms: "",
      // facility_category: "",
      // facility_subcategory: "",
      area_size: "",
      max_capacity: 0,
      // have_price: "",
      // pic_id: "",
      // venue_id: "",
      equipment_name_en: "",
      equipment_name_ms: "",
      equipment_description_en: "",
      equipment_description_ms: "",
    });
  }

  emptyFacilityPriceFormGroup() {
    this.facilitypriceFormGroup.patchValue({
      facility_description_en: "",
      facility_description_ms: "",
      facility_price_half: 0,
      facility_price_full: 0,
      equipment: "",
      // facility_days: "NONE",
      facility_id: "",
    });
  }

  openModal(modalRef: TemplateRef<any>, process: string, row) {
    if (process == "create") {
      // this.facilityFormGroup.reset();
      this.emptyFacilityFormGroup();
    } else if (process == "update") {
      this.facilityFormGroup.patchValue({
        ...row,
        // asset_id: row.asset_id.id,
        venue_id: row.venue_id ? row.venue_id.id : null,
        pic_id: row.pic_id ? row.pic_id.id : null,
        facility_subcategory: row.facility_subcategory
          ? row.facility_subcategory.id
          : "",
      });
    } else if (process == "createupdateprice") {
      // this.facilitypriceFormGroup.reset();
      this.emptyFacilityPriceFormGroup();
      this.facilitypriceService.filter("facility_id=" + row.id).subscribe(
        (res) => {
          // console.log("res", res);
          this.facilityprices = res;
        },
        (err) => {
          console.error("err", err);
        }
      );
      this.facilitypriceFormGroup.patchValue({
        facility_id: row.id,
      });
    } else if (process == "upload") {
      this.facilityimageService.filter("facility_id=" + row.id).subscribe(
        (res) => {
          // console.log("res", res);
          this.facilityimages = res;
        },
        (err) => {
          console.error("err", err);
        }
      );
      this.facilityimageFormGroup.patchValue({
        facility_id: row.id,
      });
    }
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
  }

  create() {
    this.facilityService.post(this.facilityFormGroup.value).subscribe(
      (res) => {
        // console.log("res", res);
        swal
          .fire({
            title: "Berjaya",
            text: "Data anda berjaya disimpan.",
            icon: "success",
            buttonsStyling: false,
            customClass: {
              confirmButton: "btn btn-success",
            },
          })
          .then((result) => {
            if (result.value) {
              this.modal.hide();
              this.getData();
            }
          });
      },
      (err) => {
        console.error("err", err);
        swal
          .fire({
            title: "Ralat",
            text: "Data anda tidak berjaya disimpan. Sila cuba lagi",
            icon: "warning",
            buttonsStyling: false,
            customClass: {
              confirmButton: "btn btn-warning",
            },
          })
          .then((result) => {
            if (result.value) {
              // this.modal.hide();
            }
          });
      }
    );
  }

  update() {
    this.facilityService
      .update(this.facilityFormGroup.value, this.facilityFormGroup.value.id)
      .subscribe(
        (res) => {
          // console.log("res", res);
          swal
            .fire({
              title: "Berjaya",
              text: "Data anda berjaya dikemaskini.",
              icon: "success",
              buttonsStyling: false,
              customClass: {
                confirmButton: "btn btn-success",
              },
            })
            .then((result) => {
              if (result.value) {
                this.modal.hide();
                this.getData();
              }
            });
        },
        (err) => {
          console.error("err", err);
          swal
            .fire({
              title: "Ralat",
              text: "Data anda tidak berjaya dikemaskini. Sila cuba lagi",
              icon: "warning",
              buttonsStyling: false,
              customClass: {
                confirmButton: "btn btn-warning",
              },
            })
            .then((result) => {
              if (result.value) {
                // this.modal.hide();
              }
            });
        }
      );
  }

  delete(row) {
    swal
      .fire({
        title: "Buang data",
        text: "Adakah anda ingin membuang data ini?",
        icon: "warning",
        showCancelButton: true,
        buttonsStyling: false,
        customClass: {
          confirmButton: "btn btn-danger",
          cancelButton: "btn btn-secondary",
        },
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
      })
      .then((result) => {
        if (result.value) {
          this.facilityService.delete(row.id).subscribe(
            (res) => {
              // console.log("res", res);
              swal.fire({
                title: "Proses Buang berjaya",
                text: "Data anda berjaya dibuang.",
                icon: "success",
                buttonsStyling: false,
                customClass: {
                  confirmButton: "btn btn-success",
                },
              });
              this.getData();
            },
            (err) => {
              console.error("err", err);
              swal.fire({
                title: "Proses Buang tidak berjaya",
                text: "Data anda tidak berjaya dibuang. Sila cuba lagi.",
                icon: "warning",
                buttonsStyling: false,
                customClass: {
                  confirmButton: "btn btn-warning",
                },
              });
            }
          );
        }
      });
  }

  createupdateprice(process: string) {
    if (process == "create") this.createprice();
    if (process == "update") this.updateprice();
  }

  createprice() {
    this.facilitypriceService.post(this.facilitypriceFormGroup.value).subscribe(
      (res) => {
        // console.log("res", res);
        swal
          .fire({
            title: "Berjaya",
            text: "Data anda berjaya disimpan.",
            icon: "success",
            buttonsStyling: false,
            customClass: {
              confirmButton: "btn btn-success",
            },
          })
          .then((result) => {
            if (result.value) {
              this.modal.hide();
              this.getData();
            }
          });
      },
      (err) => {
        console.error("err", err);
        swal
          .fire({
            title: "Ralat",
            text: "Data anda tidak berjaya disimpan. Sila cuba lagi",
            icon: "warning",
            buttonsStyling: false,
            customClass: {
              confirmButton: "btn btn-warning",
            },
          })
          .then((result) => {
            if (result.value) {
              // this.modal.hide();
            }
          });
      }
    );
  }

  updateprice() {
    this.facilitypriceService
      .update(
        this.facilitypriceFormGroup.value,
        this.facilitypriceFormGroup.value.id
      )
      .subscribe(
        (res) => {
          // console.log("res", res);
          swal
            .fire({
              title: "Berjaya",
              text: "Data anda berjaya dikemaskini.",
              icon: "success",
              buttonsStyling: false,
              customClass: {
                confirmButton: "btn btn-success",
              },
            })
            .then((result) => {
              if (result.value) {
                this.modal.hide();
                this.getData();
              }
            });
        },
        (err) => {
          console.error("err", err);
          swal
            .fire({
              title: "Ralat",
              text: "Data anda tidak berjaya dikemaskini. Sila cuba lagi",
              icon: "warning",
              buttonsStyling: false,
              customClass: {
                confirmButton: "btn btn-warning",
              },
            })
            .then((result) => {
              if (result.value) {
                // this.modal.hide();
              }
            });
        }
      );
  }

  deleteprice(row) {
    swal
      .fire({
        title: "Buang data",
        text: "Adakah anda ingin membuang data ini?",
        icon: "warning",
        showCancelButton: true,
        buttonsStyling: false,
        customClass: {
          confirmButton: "btn btn-danger",
          cancelButton: "btn btn-secondary",
        },
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
      })
      .then((result) => {
        if (result.value) {
          this.facilitypriceService.delete(row.id).subscribe(
            (res) => {
              // console.log("res", res);
              swal.fire({
                title: "Proses Buang berjaya",
                text: "Data anda berjaya dibuang.",
                icon: "success",
                buttonsStyling: false,
                customClass: {
                  confirmButton: "btn btn-success",
                },
              });
              this.modal.hide();
              this.getData();
            },
            (err) => {
              console.error("err", err);
              swal.fire({
                title: "Proses Buang tidak berjaya",
                text: "Data anda tidak berjaya dibuang. Sila cuba lagi.",
                icon: "warning",
                buttonsStyling: false,
                customClass: {
                  confirmButton: "btn btn-warning",
                },
              });
            }
          );
        }
      });
  }

  // Image Process
  onChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.facilityimageFormGroup.get("facility_image").setValue(file);
    }
  }

  uploadimage() {
    const formData = new FormData();
    formData.append(
      "facility_image",
      this.facilityimageFormGroup.get("facility_image").value
    );
    formData.append(
      "facility_id",
      this.facilityimageFormGroup.value.facility_id
    );

    this.facilityimageService.post(formData).subscribe(
      (res) => {
        // console.log("res", res);
        swal
          .fire({
            title: "Berjaya",
            text: "Data anda berjaya disimpan.",
            icon: "success",
            buttonsStyling: false,
            customClass: {
              confirmButton: "btn btn-success",
            },
          })
          .then((result) => {
            if (result.value) {
              this.modal.hide();
              this.getData();
            }
          });
      },
      (err) => {
        console.error("err", err);
        swal
          .fire({
            title: "Ralat",
            text: "Data anda tidak berjaya disimpan. Sila cuba lagi",
            icon: "warning",
            buttonsStyling: false,
            customClass: {
              confirmButton: "btn btn-warning",
            },
          })
          .then((result) => {
            if (result.value) {
              // this.modal.hide();
            }
          });
      }
    );
  }

  deleteimage(image) {
    this.facilityimageService.delete(image.id).subscribe(
      (res) => {
        // console.log("res", res);
        swal
          .fire({
            title: "Berjaya",
            text: "Data anda berjaya dibuang.",
            icon: "success",
            buttonsStyling: false,
            customClass: {
              confirmButton: "btn btn-success",
            },
          })
          .then((result) => {
            if (result.value) {
              this.modal.hide();
              this.getData();
            }
          });
      },
      (err) => {
        console.error("err", err);
        swal
          .fire({
            title: "Ralat",
            text: "Data anda tidak berjaya dibuang. Sila cuba lagi",
            icon: "warning",
            buttonsStyling: false,
            customClass: {
              confirmButton: "btn btn-warning",
            },
          })
          .then((result) => {
            if (result.value) {
              // this.modal.hide();
            }
          });
      }
    );
  }

  getFacilityCategory(value: string) {
    let result = this.facilitycategories.find((obj) => {
      return obj.value == value;
    });
    return result.display_name;
  }

  getFacilityDay(value: string) {
    let result = this.facilitydays.find((obj) => {
      return obj.value == value;
    });
    return result.display_name;
  }
}
