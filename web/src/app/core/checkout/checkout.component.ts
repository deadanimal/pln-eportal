import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import swal from "sweetalert2";

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { CartsService } from "src/app/shared/services/carts/carts.service";
import { FacilityBookingsService } from "src/app/shared/services/facility-bookings/facility-bookings.service";
import { InvoiceReceiptsService } from "src/app/shared/services/invoice-receipts/invoice-receipts.service";
import { ShowbookingsService } from "src/app/shared/services/showbookings/showbookings.service";
import { SimulatorRideBookingsService } from "src/app/shared/services/simulator-ride-bookings/simulator-ride-bookings.service";
import { VouchersService } from "src/app/shared/services/vouchers/vouchers.service";
import { W3csService } from "src/app/shared/services/w3cs/w3cs.service";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"],
})
export class CheckoutComponent implements OnInit {
  // CSS class
  fontSize: string;
  themeColor: string;

  // Data
  user_id: string = "";
  carts = [];
  summarycarts = [];
  vouchers = [];
  voucher_id: string = "";
  voucher_code: string = "";
  voucher_amount: any;
  voucher_status: string = "";
  done_voucher_verify: boolean = false;
  totalprice: number = 0;
  queryParams: any;

  // Price
  total_price_before_voucher: number = 0;
  total_voucher: number = 0;
  total_price_after_voucher: number = 0;

  // Dropdown
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

  constructor(
    public formBuilder: FormBuilder,
    public translate: TranslateService,
    private router: Router,
    private authService: AuthService,
    private cartService: CartsService,
    private facilitybookingService: FacilityBookingsService,
    private invoicereceiptService: InvoiceReceiptsService,
    private showbookingService: ShowbookingsService,
    private simulatorridebookingService: SimulatorRideBookingsService,
    private voucherService: VouchersService,
    private w3cService: W3csService
  ) {
    this.getCart();
    this.getVoucher();
  }

  getVoucher() {
    // status=NU&
    this.voucherService
      .filter("user=" + this.authService.decodedToken().user_id)
      .subscribe(
        (res) => {
          // console.log("res", res);
          this.vouchers = res;
        },
        (err) => {
          console.error("err", err);
        }
      );
  }

  // to get cart detail
  getCart() {
    this.cartService
      .extended(
        "cart_status=CR&user=" + this.authService.decodedToken().user_id
      )
      .subscribe(
        (res) => {
          // console.log("res", res);
          this.w3cService.changeAddToCartCount(res.length);
          this.carts = res;
          this.getBookingDetail();
        },
        (err) => {
          console.error("err", err);
        }
      );
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

  calculatoPriceEachCart(summarycarts) {
    let total_price = 0;
    for (let i = 0; i < summarycarts.length; i++) {
      total_price += +summarycarts[i].total_price;
    }
    return total_price.toFixed(2);
  }

  calculateTotalPriceAllCart() {
    for (let i = 0; i < this.summarycarts.length; i++) {
      for (let j = 0; j < this.summarycarts[i].length; j++) {
        this.totalprice += +this.summarycarts[i][j].total_price;
        this.total_price_before_voucher = this.totalprice;
      }
    }
  }

  // to delete many2manyfield and other table that linked with many2manyfield
  clickDeleteCart(cart) {
    let child_array: any;
    let child_type: string;
    if (cart.show_booking_id.length > 0) {
      child_array = cart.show_booking_id;
      child_type = "showing";
    } else if (cart.simulator_ride_booking_id.length > 0) {
      child_array = cart.simulator_ride_booking_id;
      child_type = "simulator-ride";
    } else if (cart.facility_booking_id.length > 0) {
      child_array = cart.facility_booking_id;
      child_type = "facility";
    }

    swal
      .fire({
        icon: "info",
        title: this.translate.instant("BuangItem"),
        text: this.translate.instant("BuangItemDeskripsi"),
        buttonsStyling: false,
        showCancelButton: true,
        confirmButtonText: this.translate.instant("Ya"),
        customClass: {
          confirmButton: "btn btn-danger",
          cancelButton: "btn btn-light",
        },
        cancelButtonText: this.translate.instant("Tidak"),
      })
      .then((result) => {
        if (result.value) {
          this.cartService.delete(cart.id).subscribe(
            (res) => {
              // console.log("res", res);
            },
            (err) => {
              console.error("error", err);
            },
            () => {
              for (let i = 0; i < child_array.length; i++) {
                if (child_type == "showing") {
                  this.showbookingService.delete(child_array[i].id).subscribe(
                    (res) => {
                      // console.log("res", res);
                    },
                    (err) => {
                      console.error("err", err);
                    },
                    () => {
                      if (i === child_array.length - 1) {
                        location.reload();
                      }
                    }
                  );
                } else if (child_type == "simulator-ride") {
                  this.simulatorridebookingService
                    .delete(child_array[i].id)
                    .subscribe(
                      (res) => {
                        // console.log("res", res);
                      },
                      (err) => {
                        console.error("err", err);
                      },
                      () => {
                        if (i === child_array.length - 1) {
                          location.reload();
                        }
                      }
                    );
                } else if (child_type == "facility") {
                  this.facilitybookingService
                    .delete(child_array[i].id)
                    .subscribe(
                      (res) => {
                        // console.log("res", res);
                      },
                      (err) => {
                        console.error("err", err);
                      },
                      () => {
                        if (i === child_array.length - 1) {
                          location.reload();
                        }
                      }
                    );
                }
              }
            }
          );
        }
      });
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
        var currentDate = new Date();
        var validityDate = new Date(result.validity_until);
        if (validityDate.getTime() > currentDate.getTime()) {
          // voucher is valid
          if (result.status == "NU") {
            this.voucher_id = result.id;
            this.voucher_code = result.voucher_code;
            this.total_voucher = result.voucher_amount;
            this.voucher_amount = { value: this.total_voucher };

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
      } else {
        this.total_price_after_voucher = this.totalprice;
      }
    }
  }

  clickMakePayment() {
    // trigger checkVoucherCode even the voucher is not inserted
    this.checkVoucherCode();

    // to check if invoice is existing and status is IC - Invoice Created
    this.invoicereceiptService
      .filter("status=IC&user=" + this.authService.decodedToken().user_id)
      .subscribe(
        (res) => {
          // console.log("res", res);
          if (res.length > 0) {
            res.forEach((obj, index) => {
              this.invoicereceiptService.delete(obj.id).subscribe(
                (res) => {
                  // console.log("res", res);
                },
                (err) => {
                  console.error("err", err);
                },
                () => {
                  if (index === res.length - 1) {
                    // to create new invoice after deleted old invoice which status is IC on table invoice_receipt
                    let cart_id = [];
                    this.carts.forEach((obj) => {
                      cart_id.push(obj.id);
                    });
                    if (cart_id.length > 0) {
                      let obj = {
                        invoice_created_datetime: this.getCurrentDateTime(),
                        user: this.authService.decodedToken().user_id,
                        cart_id: cart_id,
                        total_price_before_voucher: this.total_price_before_voucher.toFixed(
                          2
                        ),
                        total_voucher: this.total_voucher.toFixed(2),
                        total_price_after_voucher: this.total_price_after_voucher.toFixed(
                          2
                        ),
                        voucher_id: this.voucher_id,
                      };
                      this.invoicereceiptService.post(obj).subscribe(
                        (res) => {
                          // console.log("res", res);
                          this.queryParams = res.id;
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
                            this.voucherService
                              .update(obj, this.voucher_id)
                              .subscribe(
                                (res) => {
                                  // console.log("res", res);
                                },
                                (err) => {
                                  console.error("err", err);
                                },
                                () => {
                                  this.router.navigate(["/payment"], {
                                    queryParams: { id: this.queryParams },
                                  });
                                }
                              );
                          } else {
                            this.router.navigate(["/payment"], {
                              queryParams: { id: this.queryParams },
                            });
                          }
                        }
                      );
                    }
                  }
                }
              );
            });
          }
          // to create new invoice if the invoice still not exist in the database
          else {
            let cart_id = [];
            this.carts.forEach((obj) => {
              cart_id.push(obj.id);
            });
            if (cart_id.length > 0) {
              let obj = {
                invoice_created_datetime: this.getCurrentDateTime(),
                user: this.authService.decodedToken().user_id,
                cart_id: cart_id,
                total_price_before_voucher: this.total_price_before_voucher.toFixed(
                  2
                ),
                total_voucher: this.total_voucher,
                total_price_after_voucher: this.total_price_after_voucher.toFixed(
                  2
                ),
                voucher_id: this.voucher_id,
              };
              this.invoicereceiptService.post(obj).subscribe(
                (res) => {
                  // console.log("res", res);
                  this.queryParams = res.id;
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
                        this.router.navigate(["/payment"], {
                          queryParams: { id: this.queryParams },
                        });
                      }
                    );
                  } else {
                    this.router.navigate(["/payment"], {
                      queryParams: { id: this.queryParams },
                    });
                  }
                }
              );
            }
          }
        },
        (err) => {
          console.error("err", err);
        }
      );
  }

  ngOnInit() {
    this.user_id = this.authService.decodedToken().user_id;

    this.w3cService.currentFontSize.subscribe((fontSize) => {
      this.fontSize = fontSize;
    });

    this.w3cService.currentThemeColor.subscribe(
      (themeColor) => (this.themeColor = themeColor)
    );
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
