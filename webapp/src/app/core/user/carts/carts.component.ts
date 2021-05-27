import { Component, OnInit, TemplateRef } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { LoadingBarService } from "@ngx-loading-bar/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import swal from "sweetalert2";

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { CartsService } from "src/app/shared/services/carts/carts.service";
import { InvoiceReceiptsService } from "src/app/shared/services/invoice-receipts/invoice-receipts.service";
import { VouchersService } from "src/app/shared/services/vouchers/vouchers.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-carts",
  templateUrl: "./carts.component.html",
  styleUrls: ["./carts.component.scss"],
})
export class CartsComponent implements OnInit {
  // Data
  btn_submit_invoice: boolean = false;
  carts = [];
  summarycarts = [];
  totalprice: number = 0;
  vouchers = [];
  voucher_id: string = "";
  voucher_code: string = "";
  voucher_amount: number = 0;
  voucher_status: string = "";
  done_voucher_verify: boolean = false;

  // Price
  total_price_before_voucher: number = 0;
  total_voucher: number = 0;
  total_price_after_voucher: number = 0;

  // Dropdown
  statuses = [
    {
      value: "CM",
      display_name: "Completed",
    },
    {
      value: "AB",
      display_name: "Abandoned",
    },
    {
      value: "CR",
      display_name: "Created",
    },
    {
      value: "PD",
      display_name: "Pending",
    },
  ];
  bookingdays = [
    {
      value: "HALF",
      display_name_en: "Half Day",
      display_name_ms: "Separuh Hari",
    },
    {
      value: "FULL",
      display_name_en: "Full Day",
      display_name_ms: "Satu Hari",
    },
    {
      value: "NONE",
      display_name_en: "None",
      display_name_ms: "Tiada",
    },
  ];
  simulatorridedays = [
    {
      value: "MON",
      display_name_en: "Monday",
      display_name_ms: "Isnin",
    },
    {
      value: "TUE",
      display_name_en: "Tuesday",
      display_name_ms: "Selasa",
    },
    {
      value: "WED",
      display_name_en: "Wednesday",
      display_name_ms: "Rabu",
    },
    {
      value: "THU",
      display_name_en: "Thursday",
      display_name_ms: "Khamis",
    },
    {
      value: "FRI",
      display_name_en: "Friday",
      display_name_ms: "Jumaat",
    },
    {
      value: "SAT",
      display_name_en: "Saturday",
      display_name_ms: "Sabtu",
    },
    {
      value: "SUN",
      display_name_en: "Sunday",
      display_name_ms: "Ahad",
    },
  ];
  simulatorriderounds = [
    {
      value: "P1",
      display_name_en: "Round 1",
      display_name_ms: "Pusingan 1",
    },
    {
      value: "P2",
      display_name_en: "Round 2",
      display_name_ms: "Pusingan 2",
    },
    {
      value: "P3",
      display_name_en: "Round 3",
      display_name_ms: "Pusingan 3",
    },
    {
      value: "P4",
      display_name_en: "Round 4",
      display_name_ms: "Pusingan 4",
    },
    {
      value: "P5",
      display_name_en: "Round 5",
      display_name_ms: "Pusingan 5",
    },
  ];
  ticketcategories = [
    {
      value: "AD",
      display_name_en: "Adult",
      display_name_ms: "Dewasa",
    },
    {
      value: "KD",
      display_name_en: "Children",
      display_name_ms: "Kanak-kanak",
    },
    {
      value: "OF",
      display_name_en: "Senior citizen",
      display_name_ms: "Warga emas",
    },
    {
      value: "SD",
      display_name_en: "Student",
      display_name_ms: "Pelajar",
    },
    {
      value: "OK",
      display_name_en: "OKU",
      display_name_ms: "OKU",
    },
  ];
  wantequipments = [
    {
      value: "WITH",
      display_name_en: "With Equipment",
      display_name_ms: "Dengan Peralatan",
    },
    {
      value: "WOUT",
      display_name_en: "Without Equipment",
      display_name_ms: "Tanpa Peralatan",
    },
    {
      value: "NA",
      display_name_en: "Not Available",
      display_name_ms: "Tiada",
    },
  ];

  // FormGroup
  cartFormGroup: FormGroup;

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog",
    ignoreBackdropClick: true,
  };

  // Table
  tableEntries: number = 5;
  tableSelected: any[] = [];
  tableTemp = [];
  tableActiveRow: any;
  tableRows: any[] = [];
  SelectionType = SelectionType;

  constructor(
    public formBuilder: FormBuilder,
    private loadingBar: LoadingBarService,
    private modalService: BsModalService,
    private authService: AuthService,
    private cartService: CartsService,
    private invoicereceiptService: InvoiceReceiptsService,
    private voucherService: VouchersService
  ) {
    this.cartFormGroup = this.formBuilder.group({
      id: new FormControl("", Validators.compose([Validators.required])),
    });

    this.getVoucher();
  }

  getVoucher() {
    // status=NU&
    this.voucherService.get().subscribe(
      (res) => {
        // console.log("res", res);
        this.vouchers = res;
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
    this.loadingBar.start();
    this.cartService.extended("").subscribe(
      (res) => {
        this.tableRows = res;
        this.tableTemp = this.tableRows.map((prop, key) => {
          return {
            ...prop,
            no: key,
          };
        });
      },
      (err) => {
        console.error("err", err);
      },
      () => {
        this.loadingBar.complete();
      }
    );
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
    this.resetInvoice();

    this.tableSelected.splice(0, this.tableSelected.length);
    this.tableSelected.push(...selected);

    this.carts = this.tableSelected;
    this.getBookingDetail();
  }

  onActivate(event) {
    this.tableActiveRow = event.row;
  }

  openModal(modalRef: TemplateRef<any>, process: string, row) {
    if (process == "create") {
      this.cartFormGroup.reset();
    } else if (process == "update") {
      this.cartFormGroup.patchValue({
        ...row,
      });
    }
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
  }

  create() {
    this.cartService.post(this.cartFormGroup.value).subscribe(
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
    this.cartService
      .update(this.cartFormGroup.value, this.cartFormGroup.value.id)
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
          this.cartService.delete(row.id).subscribe(
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

  getBookingDetail() {
    for (let i = 0; i < this.carts.length; i++) {
      // to check if show_booking_id have a value
      if (this.carts[i].show_booking_id.length > 0) {
        this.summarycarts.push(
          this.summaryShowing(this.carts[i].show_booking_id)
        );
      }
      // to check if simulator_ride_booking_id have a value
      else if (this.carts[i].simulator_ride_booking_id.length > 0) {
        this.summarycarts.push(
          this.summarySimulatorRide(this.carts[i].simulator_ride_booking_id)
        );
      }
      // to check if facility_booking_id have a value
      else if (this.carts[i].facility_booking_id.length > 0) {
        this.summarycarts.push(
          this.summaryFacility(this.carts[i].facility_booking_id)
        );
      }

      // to calculate total price of all carts
      if (i === this.carts.length - 1) {
        this.calculateTotalPriceAllCart();
      }
    }
  }

  summaryShowing(show_booking_id) {
    let array = [];
    for (let i = 0; i < show_booking_id.length; i++) {
      let obj = {
        ticket_category_en: this.getTicketCategory(
          show_booking_id[i].ticket_category,
          "en"
        ),
        ticket_category_ms: this.getTicketCategory(
          show_booking_id[i].ticket_category,
          "ms"
        ),
        ticket_seat: show_booking_id[i].ticket_seat,
        showing_title_en: show_booking_id[i].show_id.title_en,
        showing_title_ms: show_booking_id[i].show_id.title_ms,
        showing_duration_hours: show_booking_id[i].show_id.duration_hours,
        showing_duration_minutes: show_booking_id[i].show_id.duration_minutes,
        showtime_show_date: show_booking_id[i].showtime_id.show_date,
        showtime_show_time: show_booking_id[i].showtime_id.show_time,
        total_price: +show_booking_id[i].total_price,
        type: "showing",
        showing_poster_link: show_booking_id[i].show_id.poster_link,
      };
      array.push(obj);
    }
    return array;
  }

  summarySimulatorRide(simulator_ride_booking_id) {
    let array = [];
    for (let i = 0; i < simulator_ride_booking_id.length; i++) {
      let obj = {
        ticket_category_en: this.getTicketCategory(
          simulator_ride_booking_id[i].ticket_category,
          "en"
        ),
        ticket_category_ms: this.getTicketCategory(
          simulator_ride_booking_id[i].ticket_category,
          "ms"
        ),
        simulator_ride_time:
          simulator_ride_booking_id[i].simulator_ride_time_id.time,
        simulator_ride_day_en: this.getSimulatorRideDay(
          simulator_ride_booking_id[i].simulator_ride_time_id.day,
          "en"
        ),
        simulator_ride_day_ms: this.getSimulatorRideDay(
          simulator_ride_booking_id[i].simulator_ride_time_id.day,
          "ms"
        ),
        simulator_ride_round_en: this.getSimulatorRideRound(
          simulator_ride_booking_id[i].simulator_ride_time_id.round,
          "en"
        ),
        simulator_ride_round_ms: this.getSimulatorRideRound(
          simulator_ride_booking_id[i].simulator_ride_time_id.round,
          "ms"
        ),
        total_price: +simulator_ride_booking_id[i].total_price,
        type: "simulator-ride",
      };
      array.push(obj);
    }
    return array;
  }

  summaryFacility(facility_booking_id) {
    let array = [];
    for (let i = 0; i < facility_booking_id.length; i++) {
      let obj = {
        facility_name_en: facility_booking_id[i].facility_id.name_en,
        facility_name_ms: facility_booking_id[i].facility_id.name_ms,
        booking_date: facility_booking_id[i].booking_date,
        booking_days_en: this.getBookingDay(
          facility_booking_id[i].booking_days,
          "en"
        ),
        booking_days_ms: this.getBookingDay(
          facility_booking_id[i].booking_days,
          "ms"
        ),
        want_equipment_en: this.getWantEquipment(
          facility_booking_id[i].want_equipment,
          "en"
        ),
        want_equipment_ms: this.getWantEquipment(
          facility_booking_id[i].want_equipment,
          "ms"
        ),
        total_price: +facility_booking_id[i].total_price,
        type: "facility",
      };
      array.push(obj);
    }
    return array;
  }

  calculateTotalPriceAllCart() {
    this.totalprice = 0;
    for (let i = 0; i < this.summarycarts.length; i++) {
      for (let j = 0; j < this.summarycarts[i].length; j++) {
        this.totalprice += +this.summarycarts[i][j].total_price;
        this.total_price_before_voucher = this.totalprice;
      }
    }
  }

  checkVoucherCode() {
    this.voucher_code = this.voucher_code.toUpperCase();
    this.voucher_status = "";
    this.done_voucher_verify = false;
    this.totalprice = this.total_price_before_voucher;
    if (this.carts.length > 0) {
      if (this.voucher_code.length == 10 && !this.done_voucher_verify) {
        let result = this.vouchers.find((obj) => {
          return obj.voucher_code == this.voucher_code;
        });
        // to check if the voucher is valid
        if (result) {
          var currentDate = new Date();
          var validityDate = new Date(result.validity_until);
          if (validityDate.getTime() > currentDate.getTime()) {
            // voucher is valid
            if (result.status == "NU") {
              this.voucher_id = result.id;
              this.voucher_code = result.voucher_code;
              this.total_voucher = result.voucher_amount;
              this.voucher_amount = result.voucher_amount;

              // to update total price after voucher inserted
              this.totalprice = this.totalprice - this.total_voucher;
              this.total_price_after_voucher = this.totalprice;

              // to update done_voucher_verify to true
              this.done_voucher_verify = true;
              this.voucher_status = "NU";
            }
            // voucher is already used
            else if (result.status == "AU") {
              this.voucher_status = "AU";
            }
          } else {
            // voucher is already used
            if (result.status == "AU") {
              this.voucher_status = "AU";
            }
            // voucher is expired
            else {
              this.voucher_status = "EX";
            }
          }
        }
        this.total_price_after_voucher = this.totalprice;
      } else {
        this.total_price_after_voucher = this.totalprice;
      }
      this.btn_submit_invoice = true;
    }
  }

  /* resetVoucherCode() {
    this.voucher_id = "";
    this.voucher_code = "";
    this.voucher_amount = 0;
    this.voucher_status = "";
    this.done_voucher_verify = false;

    this.total_voucher = 0;

    this.calculateTotalPriceAllCart();
    this.checkVoucherCode();
  } */

  submitInvoice() {
    // trigger checkVoucherCode even the voucher is not inserted
    this.checkVoucherCode();

    // to create new invoice if the invoice still not exist in the database
    let cart_id = [];
    this.carts.forEach((obj) => {
      cart_id.push(obj.id);
    });
    if (cart_id.length > 0) {
      let obj = {
        invoice_created_datetime: this.getCurrentDateTime(),
        user: this.authService.decodedToken().user_id,
        cart_id: cart_id,
        total_price_before_voucher: this.total_price_before_voucher.toFixed(2),
        total_voucher: this.total_voucher,
        total_price_after_voucher: this.total_price_after_voucher.toFixed(2),
        voucher_id: this.voucher_id,
      };
      this.invoicereceiptService.post(obj).subscribe(
        (res) => {
          // console.log("res", res);
        },
        (err) => {
          console.error("err", err);
        },
        () => {
          // to update the status code of voucher if the voucher code is used
          if (this.voucher_id) {
            let obj = {
              status: "AU",
            };
            this.voucherService.update(obj, this.voucher_id).subscribe(
              (res) => {
                // console.log("res", res);
              },
              (err) => {
                console.error("err", err);
              },
              () => {
                this.updateCartStatusToPD();
              }
            );
          } else {
            this.updateCartStatusToPD();
          }
        }
      );
    }
  }

  updateCartStatusToPD() {
    for (let i = 0; i < this.carts.length; i++) {
      let obj = {
        cart_status: "PD",
      };
      this.cartService.update(obj, this.carts[i].id).subscribe(
        (res) => {
          // console.log("res", res);
        },
        (err) => {
          console.error("err", err);
        },
        () => {
          if (i === this.carts.length - 1) {
            swal
              .fire({
                title: "Berjaya",
                text: "Troli anda berjaya dimasukkan ke dalam invois.",
                icon: "success",
                buttonsStyling: false,
                customClass: {
                  confirmButton: "btn btn-success",
                },
              })
              .then((result) => {
                if (result.value) {
                  this.getData();
                  this.resetInvoice();
                }
              });
          }
        }
      );
    }
  }

  resetInvoice() {
    this.totalprice = 0;
    this.total_price_before_voucher = 0;
    this.total_voucher = 0;
    this.total_price_after_voucher = 0;

    this.voucher_id = "";
    this.voucher_code = "";
    this.voucher_amount = 0;
    this.voucher_status = "";
    this.done_voucher_verify = false;

    this.btn_submit_invoice = false;

    this.summarycarts = [];
    this.tableSelected = [];
  }

  getCurrentDateTime() {
    let selectedDate = new Date();
    let year = selectedDate.getFullYear();
    let month =
      selectedDate.getMonth() + 1 < 10
        ? "0" + (selectedDate.getMonth() + 1)
        : selectedDate.getMonth() + 1;
    let day =
      selectedDate.getDate() < 10
        ? "0" + selectedDate.getDate()
        : selectedDate.getDate();
    let formatDate = year + "-" + month + "-" + day;

    let hour =
      selectedDate.getHours() < 10
        ? "0" + selectedDate.getHours()
        : selectedDate.getHours();
    let minute =
      selectedDate.getMinutes() < 10
        ? "0" + selectedDate.getMinutes()
        : selectedDate.getMinutes();
    let second =
      selectedDate.getSeconds() < 10
        ? "0" + selectedDate.getSeconds()
        : selectedDate.getSeconds();
    let formatTime = hour + ":" + minute + ":" + second;

    return formatDate + "T" + formatTime + "Z";
  }

  getStatus(value: string) {
    let result = this.statuses.find((obj) => {
      return obj.value == value;
    });
    return result.display_name;
  }

  getBookingDay(value: string, lang: string) {
    let result = this.bookingdays.find((obj) => {
      return obj.value == value;
    });
    if (result && lang == "en") return result.display_name_en;
    if (result && lang == "ms") return result.display_name_ms;
  }

  getSimulatorRideDay(value: string, lang: string) {
    let result = this.simulatorridedays.find((obj) => {
      return obj.value == value;
    });
    if (result && lang == "en") return result.display_name_en;
    if (result && lang == "ms") return result.display_name_ms;
  }

  getSimulatorRideRound(value: string, lang: string) {
    let result = this.simulatorriderounds.find((obj) => {
      return obj.value == value;
    });
    if (result && lang == "en") return result.display_name_en;
    if (result && lang == "ms") return result.display_name_ms;
  }

  getTicketCategory(value: string, lang: string) {
    let result = this.ticketcategories.find((obj) => {
      return obj.value == value;
    });
    if (result && lang == "en") return result.display_name_en;
    if (result && lang == "ms") return result.display_name_ms;
  }

  getWantEquipment(value: string, lang: string) {
    let result = this.wantequipments.find((obj) => {
      return obj.value == value;
    });
    if (result && lang == "en") return result.display_name_en;
    if (result && lang == "ms") return result.display_name_ms;
  }
}
