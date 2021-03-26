import { Component, OnInit, TemplateRef } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import swal from "sweetalert2";

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { BankListsService } from "src/app/shared/services/bank-lists/bank-lists.service";
import { CartsService } from "src/app/shared/services/carts/carts.service";
import { RefundsService } from "src/app/shared/services/refunds/refunds.service";
import { EmailTemplatesService } from "src/app/shared/services/email-templates/email-templates.service";
import { FacilityBookingsService } from "src/app/shared/services/facility-bookings/facility-bookings.service";
import { FacilityPricesService } from "src/app/shared/services/facility-prices/facility-prices.service";
import { FacilitiesService } from "src/app/shared/services/facilities/facilities.service";
import { UsersService } from "src/app/shared/services/users/users.service";
import { VouchersService } from "src/app/shared/services/vouchers/vouchers.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-facilities-application",
  templateUrl: "./facilities-application.component.html",
  styleUrls: ["./facilities-application.component.scss"],
})
export class FacilitiesApplicationComponent implements OnInit {
  // Data
  banklists = [];
  facilityprices = [];
  pics = [];
  vouchers = [];

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
    class: "modal-dialog",
  };

  // FormGroup
  facilityFormGroup: FormGroup;
  refundFormGroup: FormGroup;

  // Dropdown
  facilities = [];
  users = [];
  organisationcategories = [
    {
      value: "GV",
      display_name: "Kerajaan",
    },
    {
      value: "SC",
      display_name: "Sekolah",
    },
    {
      value: "UN",
      display_name: "Universiti",
    },
    {
      value: "NA",
      display_name: "Tiada",
    },
  ];
  bookingdays = [
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
  statuses = [
    {
      value: "FB01",
      display_name: "Dalam proses",
    },
    {
      value: "FB02",
      display_name: "Diterima",
    },
    {
      value: "FB03",
      display_name: "Ditolak",
    },
    {
      value: "FB04",
      display_name: "Menunggu Pembayaran",
    },
    {
      value: "FB05",
      display_name: "Bayaran Diterima",
    },
    {
      value: "FB06",
      display_name: "Bayaran Ditolak",
    },
    {
      value: "FB07",
      display_name: "Bayaran Balik",
    },
  ];

  constructor(
    public formBuilder: FormBuilder,
    private modalService: BsModalService,
    private authService: AuthService,
    private banklistService: BankListsService,
    private cartService: CartsService,
    private refundService: RefundsService,
    private emailtemplateService: EmailTemplatesService,
    private facilitybookingService: FacilityBookingsService,
    private facilitypriceService: FacilityPricesService,
    private facilityService: FacilitiesService,
    private userService: UsersService,
    private voucherService: VouchersService
  ) {
    this.getData();
    this.getFacility();
    this.getUser();
    this.getBankList();
    this.getVoucher();
    this.getPrice();

    this.facilityFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      title: new FormControl(""),
      user_id: new FormControl(""),
      pic_id: new FormControl(""),
      facility_id: new FormControl(""),
      status: new FormControl(""),
      organisation_name: new FormControl(""),
      organisation_category: new FormControl(""),
      booking_date: new FormControl(""),
      booking_days: new FormControl(""),
      number_of_people: new FormControl(""),
      total_price: new FormControl(0.0),
      want_equipment: new FormControl(""),
    });

    this.refundFormGroup = this.formBuilder.group({
      // refund_running_no: new FormControl(""),
      refund_type: new FormControl(""),
      description: new FormControl(""),
      amount: new FormControl(0),
      acc_number: new FormControl(""),
      bank_id: new FormControl(""),
      remarks: new FormControl(""),
      incharge_id: new FormControl(""),
      incharge_datetime: new FormControl(""),
      user: new FormControl({ disabled: true }),
      status: new FormControl("RC"),
      // pic_verification_id: new FormControl(""),
      // pic_verification_datetime: new FormControl(""),
      // show_booking_id: new FormControl(""),
      // simulator_ride_booking_id: new FormControl(""),
      facility_booking_id: new FormControl(""),
    });
  }

  getFacility() {
    this.facilityService.get().subscribe(
      (res) => {
        // console.log("res", res);
        this.facilities = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  getUser() {
    this.userService.getAll().subscribe(
      (res) => {
        // console.log("res", res);
        res.forEach((obj) => {
          if (obj.user_type == "CS") this.users.push(obj);
          else this.pics.push(obj);
        });
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  getBankList() {
    this.banklistService.get().subscribe(
      (res) => {
        // console.log("res", res);
        this.banklists = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  getVoucher() {
    this.voucherService.filter("status=NU").subscribe(
      (res) => {
        // console.log("res", res);
        this.vouchers = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  getPrice() {
    this.facilitypriceService.get().subscribe(
      (res) => {
        // console.log("res", res);
        this.facilityprices = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  ngOnInit() {}

  getData() {
    this.facilitybookingService.extended().subscribe((res) => {
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

  openModal(modalRef: TemplateRef<any>, process: string, row) {
    if (process == "create") {
      this.facilityFormGroup.reset();
    } else if (process == "update") {
      this.facilityFormGroup.patchValue({
        ...row,
        user_id: row.user_id.id,
        pic_id: row.pic_id != null ? row.pic_id.id : null,
        facility_id: row.facility_id.id,
      });
    } else if (process == "refund") {
      this.refundFormGroup.patchValue({
        facility_booking_id: row.id,
        amount: row.total_price,
        user: row.user_id.id,
        incharge_id: this.authService.decodedToken().user_id,
      });
    }
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
  }

  create() {
    this.facilityFormGroup.value.title = "";
    this.facilityFormGroup.value.status = "FB01";

    this.facilitybookingService.post(this.facilityFormGroup.value).subscribe(
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
      },
      () => {
        this.sendmail(this.facilityFormGroup.value);
      }
    );
  }

  update() {
    this.facilitybookingService
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
          this.facilitybookingService.delete(row.id).subscribe(
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

  verify(row) {
    swal
      .fire({
        title: "Pengesahan Tempahan Fasiliti",
        html:
          '<input type="text" id="voucher_code" class="swal2-input" placeholder="Masukkan baucar sekiranya perlu">',
        text: "Adakah anda ingin meluluskan permohonan tempahan fasiliti ini?",
        icon: "warning",
        // showCancelButton: true,
        buttonsStyling: false,
        showDenyButton: true,
        customClass: {
          confirmButton: "btn btn-success",
          // cancelButton: "btn btn-danger",
          denyButton: "btn btn-danger",
        },
        confirmButtonText: "Ya",
        denyButtonText: "Tidak",
        // cancelButtonText: "Tidak",
        showCloseButton: true,
        preDeny: () => {
          // to user reject the facility booking application
          return true;
        },
        preConfirm: () => {
          // to user accept the facility booking application
          // user can either enter voucher code if want
          const voucher_code = (<HTMLInputElement>(
            swal.getPopup().querySelector("#voucher_code")
          )).value;

          let result = this.vouchers.find((obj) => {
            return (
              obj.voucher_code == voucher_code && obj.user == row.user_id.id
            );
          });

          if (!voucher_code) return true;
          else {
            if (result)
              return { voucher_code: voucher_code, voucher_id: result.id };
            else
              swal.showValidationMessage(
                "Kod baucar yang anda masukkan tidak sah. Sila cuba lagi"
              );
          }
        },
      })
      .then((result) => {
        if (result.isConfirmed == true) {
          // to accept the facility booking application
          let objUpdate = {
            status: "FB02",
          };
          this.facilitybookingService.update(objUpdate, row.id).subscribe(
            (res) => {
              // console.log("res", res);
            },
            (err) => {
              console.error("err", err);
            },
            () => {
              this.getData();

              let objMail = {
                status: "FB02",
                user_id: row.user_id.id,
              };

              this.sendmail(objMail);

              let facility_cart = [];
              facility_cart.push(row.id);
              this.addToCart(facility_cart, row.user_id.id, result.value);
            }
          );
        } else if (result.isDenied == true) {
          // to reject the facility booking application
          let objUpdate = {
            status: "FB03",
          };
          this.facilitybookingService.update(objUpdate, row.id).subscribe(
            (res) => {
              // console.log("res", res);
            },
            (err) => {
              console.error("err", err);
            },
            () => {
              this.getData();

              this.sweetAlertWarning(
                "Ditolak",
                "Anda telah menolak permohonan tempahan fasiliti ini."
              );

              let objMail = {
                status: "FB03",
                user_id: row.user_id.id,
              };

              this.sendmail(objMail);
            }
          );
        }
      });
  }

  sendmail(row) {
    let user = this.users.filter((obj) => {
      return obj.id == row.user_id;
    });
    var obj;
    if (row.status == "FB01") {
      obj = {
        code: "EMEL03",
        to: user[0].email,
        context: null,
      };
    } else if (row.status == "FB02") {
      obj = {
        code: "EMEL04",
        to: user[0].email,
        context: null,
      };
    } else if (row.status == "FB03") {
      obj = {
        code: "EMEL05",
        to: user[0].email,
        context: null,
      };
    } else if (row.status == "FB04") {
      obj = {
        code: "EMEL12",
        to: user[0].email,
        context: JSON.stringify({
          voucher_code: row.voucher_code,
        }),
      };
    }

    this.emailtemplateService.sending_mail(obj).subscribe(
      (res) => {
        // console.log("res", res);
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  refund() {
    this.refundService.post(this.refundFormGroup.value).subscribe(
      (res) => {
        // console.log("res", res);

        let obj = {
          status: "FB07",
        };
        this.facilitybookingService
          .update(obj, this.refundFormGroup.value.facility_booking_id)
          .subscribe(
            (res) => {
              // console.log("res", res);
            },
            (err) => {
              console.error("err", err);
            }
          );

        swal
          .fire({
            title: "Berjaya",
            text: "Bayaran balik anda berjaya disimpan.",
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
            text: "Bayaran balik anda tidak berjaya disimpan. Sila cuba lagi",
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

  // to return the total price of the facility booking
  changeRadioEquipment() {
    let result = this.facilityprices.find((obj) => {
      let facility_id = this.facilityFormGroup.value.facility_id;
      let want_equipment = this.facilityFormGroup.value.want_equipment;

      return obj.facility_id == facility_id && obj.equipment == want_equipment;
    });

    if (result) {
      let booking_days = this.facilityFormGroup.value.booking_days;

      if (booking_days == "FULL")
        this.facilityFormGroup.patchValue({
          total_price: result.facility_price_full,
        });
      else if (booking_days == "HALF")
        this.facilityFormGroup.patchValue({
          total_price: result.facility_price_half,
        });
      else if (booking_days == "NONE")
        this.facilityFormGroup.patchValue({
          total_price: 0,
        });
    } else {
      this.facilityFormGroup.patchValue({
        total_price: 0,
      });
    }
  }

  // add to cart function
  addToCart(facility_cart, user_id: string, voucher) {
    let obj = {
      user: user_id,
      show_booking_id: [],
      simulator_ride_booking_id: [],
      facility_booking_id: facility_cart,
    };
    this.cartService.post(obj).subscribe(
      (res) => {
        // console.log("res", res);
      },
      (err) => {
        console.error("err", err);
      },
      () => {
        // to update the voucher status if used
        if (typeof voucher == "object") {
          // let obj = {
          //   status: "AU",
          // };
          this.voucherService.update(obj, voucher.voucher_id).subscribe(
            (res) => {
              // console.log("res", res);
            },
            (err) => {
              console.error("err", err);
            },
            () => {
              this.updateStatusToFB04(facility_cart[0], user_id);
            }
          );
        } else {
          this.updateStatusToFB04(facility_cart[0], user_id);
        }
      }
    );
  }

  updateStatusToFB04(facility_id, user_id) {
    let obj = {
      status: "FB04",
    };
    this.facilitybookingService.update(obj, facility_id).subscribe(
      (res) => {
        // console.log("res", res);
      },
      (err) => {
        console.error("err", err);
      },
      () => {
        this.getData();

        this.sweetAlertSuccess(
          "Diterima",
          "Anda telah menerima permohonan tempahan fasiliti ini."
        );

        let objMail = {
          status: "FB04",
          user_id: user_id,
        };
        this.sendmail(objMail);
      }
    );
  }

  sweetAlertSuccess(title, text) {
    swal.fire({
      title,
      text,
      icon: "success",
      buttonsStyling: false,
      customClass: {
        confirmButton: "btn btn-success",
      },
    });
  }

  sweetAlertWarning(title, text) {
    swal.fire({
      title,
      text,
      icon: "warning",
      buttonsStyling: false,
      customClass: {
        confirmButton: "btn btn-warning",
      },
    });
  }

  getOrganisationCategory(value: string) {
    let result = this.organisationcategories.find((obj) => {
      return obj.value == value;
    });
    return result.display_name;
  }

  getBookingDay(value: string) {
    let result = this.bookingdays.find((obj) => {
      return obj.value == value;
    });
    return result.display_name;
  }

  getStatus(value: string) {
    let result = this.statuses.find((obj) => {
      return obj.value == value;
    });
    return result.display_name;
  }
}
