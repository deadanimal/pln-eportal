import { Component, OnInit, TemplateRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatStepper } from "@angular/material/stepper";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { CartsService } from "src/app/shared/services/carts/carts.service";
import { ShowingsService } from "src/app/shared/services/showings/showings.service";
import { ShowtimesService } from "src/app/shared/services/showtimes/showtimes.service";
import { ShowbookingsService } from "src/app/shared/services/showbookings/showbookings.service";
import { W3csService } from "src/app/shared/services/w3cs/w3cs.service";

import { Seats } from "src/assets/json/seats";

@Component({
  selector: "app-shows-book",
  templateUrl: "./shows-book.component.html",
  styleUrls: ["./shows-book.component.scss"],
})
export class ShowsBookComponent implements OnInit {
  // CSS class
  fontSize: string;
  themeColor: string;
  
  // Data
  existbookings = [];
  schoolMinimum: boolean = true;
  selectedexistbookings = [];
  show: any;
  showings = [];
  showtimes = [];
  acceptedbookings = [];
  today: Date = new Date();
  totalticket: number = 0;
  totalSeat: number = 0;
  user_obj: any;

  seats = Seats;
  selectedSeats = [];
  enabledShowingDates = [];
  column: number = 32;
  row: number = 10;
  ticketcategories = [
    {
      value: "AD",
      display_name: "Adult",
      formcontrol: "adult",
      price_citizen: 6.0,
      price_noncitizen: 12.0,
    },
    {
      value: "KD",
      display_name: "Kid",
      formcontrol: "children",
      price_citizen: 4.0,
      price_noncitizen: 8.0,
    },
    {
      value: "OF",
      display_name: "Old Folk",
      formcontrol: "senior",
      price_citizen: 0.0,
      price_noncitizen: 0.0,
    },
    {
      value: "SD",
      display_name: "Student",
      formcontrol: "school",
      price_citizen: 4.0,
      price_noncitizen: 8.0,
    },
    {
      value: "OK",
      display_name: "OKU",
      formcontrol: "oku",
      price_citizen: 0.0,
      price_noncitizen: 0.0,
    },
  ];

  // FormGroup
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog",
  };

  constructor(
    private formBuilder: FormBuilder,
    public modalService: BsModalService,
    public translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private cartService: CartsService,
    private showingService: ShowingsService,
    private showtimeService: ShowtimesService,
    private showbookingService: ShowbookingsService,
    private w3cService: W3csService
  ) {
    this.today.setDate(this.today.getDate() + 1);

    this.getExistBooking();

    this.user_obj = this.authService.decodedToken();
    // this.route.queryParams.subscribe((params) => {
    //   if (this.router.getCurrentNavigation().extras.state)
    //     this.show = this.router.getCurrentNavigation().extras.state.show;
    // });

    this.firstFormGroup = this.formBuilder.group({
      date: ["", Validators.required],
      time: ["", Validators.required],
    });
    this.secondFormGroup = this.formBuilder.group({
      citizen: [true, Validators.required],
      adult: [0, Validators.required],
      children: [0, Validators.required],
      school: [0, Validators.required],
      senior: [0, Validators.required],
      oku: [0, Validators.required],
      total: [0, Validators.required],
    });

    this.getShowing();
    this.getEnableShowtime();
  }

  getExistBooking() {
    this.showbookingService.get().subscribe(
      (res) => {
        // console.log("res", res);
        this.existbookings = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  getShowing() {
    if (this.route.snapshot.paramMap.get("id")) {
      let filterField = "id=" + this.route.snapshot.paramMap.get("id");
      this.showingService.filter(filterField).subscribe(
        (res) => {
          // console.log("res", res);
          this.showings = res;
        },
        (err) => {
          console.error("err", err);
        }
      );
    }
  }

  getShowtime(event) {
    this.firstFormGroup.value.date = event;
    if (this.firstFormGroup.value.date) {
      // change from Thu Oct 01 2020 11:43:59 GMT+0800 (Malaysia Time) to 2020-10-01
      let selectedDate = this.firstFormGroup.value.date;
      let year = selectedDate.getFullYear();
      let month = selectedDate.getMonth() + 1;
      let day =
        selectedDate.getDate() < 10
          ? "0" + selectedDate.getDate()
          : selectedDate.getDate();
      let formatDate = year + "-" + month + "-" + day;
      let filterField =
        "showing_id=" +
        this.route.snapshot.paramMap.get("id") +
        "&show_date=" +
        formatDate;
      this.showtimeService.filter(filterField).subscribe(
        (res) => {
          // console.log("res", res);
          this.showtimes = res;
        },
        (err) => {
          console.error("err", err);
        }
      );
    }
  }

  getEnableShowtime() {
    let filterField = "showing_id=" + this.route.snapshot.paramMap.get("id");
    this.showtimeService.filter(filterField).subscribe(
      (res) => {
        // console.log("res", res);
        for (let i = 0; i < res.length; i++) {
          let date = new Date(res[i].show_date);
          this.enabledShowingDates.push(date);
        }
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  ngOnInit() {
    this.w3cService.currentFontSize.subscribe((fontSize) => {
      this.fontSize = fontSize;
      console.log("fontSize", this.fontSize);
    });

    this.w3cService.currentThemeColor.subscribe(
      (themeColor) => (this.themeColor = themeColor)
    );
  }

  citizenChange() {
    this.calculateTotal();
  }

  calculateTotal() {
    // to check either school have minimum 30 or not
    if (
      this.secondFormGroup.value.school == 0 ||
      this.secondFormGroup.value.school >= 30
    ) {
      this.schoolMinimum = false;
    } else {
      this.schoolMinimum = true;
    }

    this.totalticket =
      this.secondFormGroup.value.adult +
      this.secondFormGroup.value.children +
      this.secondFormGroup.value.school +
      this.secondFormGroup.value.senior +
      this.secondFormGroup.value.oku;

    if (this.secondFormGroup.value.citizen) {
      this.secondFormGroup.value.total =
        this.secondFormGroup.value.adult * 6 +
        this.secondFormGroup.value.children * 4 +
        this.secondFormGroup.value.school * 4;
    } else {
      this.secondFormGroup.value.total =
        this.secondFormGroup.value.adult * 12 +
        this.secondFormGroup.value.children * 8 +
        this.secondFormGroup.value.school * 8;
    }
  }

  makePayment() {
    var totalTicket =
      this.secondFormGroup.value.adult +
      this.secondFormGroup.value.children +
      this.secondFormGroup.value.school +
      this.secondFormGroup.value.senior +
      this.secondFormGroup.value.oku;
    var showtimeId = this.firstFormGroup.value.time.split("_").pop();
    var ticketType = this.secondFormGroup.value.citizen ? "CZ" : "NC";

    var adultTicket = this.secondFormGroup.value.adult;
    var childrenTicket = this.secondFormGroup.value.children;
    var schoolTicket = this.secondFormGroup.value.school;
    var seniorTicket = this.secondFormGroup.value.senior;
    var okuTicket = this.secondFormGroup.value.oku;

    for (let i = 0; i < totalTicket; i++) {
      if (adultTicket > 0) {
        var ticketCategory = "AD";
        adultTicket--;
      } else if (childrenTicket > 0) {
        var ticketCategory = "KD";
        childrenTicket--;
      } else if (schoolTicket > 0) {
        var ticketCategory = "SD";
        schoolTicket--;
      } else if (seniorTicket > 0) {
        var ticketCategory = "OF";
        seniorTicket--;
      } else if (okuTicket > 0) {
        var ticketCategory = "OK";
        okuTicket--;
      }

      let selectedTicket = this.ticketcategories.find((obj) => {
        return obj.value == ticketCategory;
      });

      var price = this.secondFormGroup.value.citizen
        ? selectedTicket.price_citizen
        : selectedTicket.price_noncitizen;
      var totalPrice = this.secondFormGroup.value.citizen
        ? selectedTicket.price_citizen
        : selectedTicket.price_noncitizen;

      let objPost = {
        ticket_type: ticketType,
        ticket_category: ticketCategory,
        ticket_quantity: 1,
        price: price,
        total_price: totalPrice,
        showtime_id: showtimeId,
        user_id: this.authService.decodedToken().user_id,
        show_id: this.route.snapshot.paramMap.get("id"),
        ticket_seat: this.selectedSeats[i].name,
      };

      this.showbookingService.post(objPost).subscribe(
        (res) => {
          /* stuck disini untuk membuat bayaran FPX */
          // console.log("res", res);
          this.acceptedbookings.push(res);
        },
        (err) => {
          console.error("err", err);
        },
        () => {
          if (i === totalTicket - 1) {
            // make a condition here
            // if totalTicket < 30 = no voucher = status - SB02
            // else totalTicket >= 30 = voucher = status - SB01
            if (totalTicket < 30) this.updateStatusToSB02();
            else this.maintainStatusSB01();
          }
        }
      );
    }

    /* for (let value in this.secondFormGroup.value) {
      if (
        value == "adult" ||
        value == "children" ||
        value == "school" ||
        value == "senior" ||
        value == "oku"
      ) {
        let selectedTicket = this.ticketcategories.find((obj) => {
          return obj.formcontrol == value;
        });
        let calculateTicketPrice = 0.0;
        if (this.secondFormGroup.value.citizen) {
          if (value == "adult" || value == "children" || value == "school") {
            calculateTicketPrice =
              this.secondFormGroup.value[value] * selectedTicket.price_citizen;
          }
        } else {
          if (value == "adult" || value == "children" || value == "school") {
            calculateTicketPrice =
              this.secondFormGroup.value[value] *
              selectedTicket.price_noncitizen;
          }
        }

        let createArray = {
          ticket_type: this.secondFormGroup.value.citizen ? "CZ" : "NC",
          ticket_category: selectedTicket.value,
          ticket_quantity: this.secondFormGroup.value[value],
          price: this.secondFormGroup.value.citizen
            ? selectedTicket.price_citizen
            : selectedTicket.price_noncitizen,
          total_price: calculateTicketPrice,
          showtime_id: this.firstFormGroup.value.time,
          show_id: this.route.snapshot.paramMap.get("id"),
          user_id: this.user_obj.user_id,
        };

        console.log("createArray", createArray);

        // this.showbookingService.post(createArray).subscribe(
        //   (res) => {
        //     console.log("res", res);
        //   },
        //   (err) => {
        //     console.error("err", err);
        //   }
        // );
      }
    } */
  }

  // to maintain the status of showing booking SB01 only
  maintainStatusSB01() {
    let showing_cart = [];
    for (let i = 0; i < this.acceptedbookings.length; i++) {
      showing_cart.push(this.acceptedbookings[i].id);
      if (i === this.acceptedbookings.length - 1) {
        this.addToCart(showing_cart);
      }
    }
  }

  // to update the status of showing booking from SB01 to SB02
  updateStatusToSB02() {
    let showing_cart = [];
    for (let i = 0; i < this.acceptedbookings.length; i++) {
      showing_cart.push(this.acceptedbookings[i].id);
      let obj = {
        status: "SB02",
      };
      this.showbookingService
        .update(obj, this.acceptedbookings[i].id)
        .subscribe(
          (res) => {
            // console.log("res", res);
          },
          (err) => {
            console.error("err", err);
          },
          () => {
            if (i === this.acceptedbookings.length - 1) {
              this.addToCart(showing_cart);
            }
          }
        );
    }
  }

  // add to cart function
  addToCart(showing_cart) {
    let obj = {
      user: this.authService.decodedToken().user_id,
      show_booking_id: showing_cart,
      simulator_ride_booking_id: [],
    };
    this.cartService.post(obj).subscribe(
      (res) => {
        // console.log("res", res);
      },
      (err) => {
        console.error("err", err);
      },
      () => {
        this.cartService
          .filter(
            "cart_status=CR&user=" + this.authService.decodedToken().user_id
          )
          .subscribe(
            (res) => {
              this.w3cService.changeAddToCartCount(res.length);
            },
            (err) => {
              console.error("err", err);
            },
            () => {
              this.toastr.info(
                this.translate.instant("TambahKeTroliBerjaya"),
                "Info"
              );
              this.router.navigate(["/checkout"]);
            }
          );
        // this.router.navigate([
        //   "/payment",
        //   "shows",
        //   this.authService.decodedToken().user_id,
        //   showtimeId,
        // ]);
      }
    );
  }

  arrayOne(n: number): any[] {
    return Array(n);
  }

  getSeat(row: number, column: number) {
    let result = this.seats[row].columns.find((value) => {
      return value.column === column;
    });
    if (result) return result.name;
  }

  getColor(row: number, column: number) {
    let result = this.seats[row].columns.find((value) => {
      return value.column === column;
    });
    if (result) return result.color;
  }

  click2ndStep() {
    this.totalSeat =
      this.secondFormGroup.value.adult +
      this.secondFormGroup.value.children +
      this.secondFormGroup.value.school +
      this.secondFormGroup.value.senior +
      this.secondFormGroup.value.oku;
  }

  selectSeat(row: number, column: number) {
    let result = this.seats[row].columns.find((value) => {
      return value.column === column;
    });

    if (result.name) {
      // check if the new selected try to click booked seat
      let existbooking = this.selectedexistbookings.filter((obj) => {
        return obj.ticket_seat == result.name;
      });

      if (existbooking.length == 0) {
        if (this.selectedSeats.length < this.totalSeat) {
          // to check if the seat is already exist in selection
          let existSeats = this.selectedSeats.find((obj) => {
            return obj.name == result.name;
          });

          if (!existSeats) {
            let array = {
              row,
              column,
              name: result.name,
            };
            this.selectedSeats.push(array);
          }
        } else {
          this.toastr.error(
            this.translate.instant("RalatMoreThanChosenSeat"),
            this.translate.instant("Ralat")
          );
        }
      } else {
        this.toastr.error(
          this.translate.instant("RalatBookPeopleSeat"),
          this.translate.instant("Ralat")
        );
      }
    }
  }

  emptySeats() {
    this.selectedSeats.splice(0, this.selectedSeats.length);
  }

  getSelectedSeat(row: number, column: number) {
    // let selectedStyle = {
    //   backgroundColor: "red",
    //   color: "white",
    //   borderRadius: "10px",
    // };
    let selectedStyle = "btn-danger";
    for (let i = 0; i < this.selectedSeats.length; i++) {
      if (
        this.selectedSeats[i].row === row &&
        this.selectedSeats[i].column === column
      ) {
        return selectedStyle;
      }
    }
  }

  // To check if existing booking dont mix up with new booking
  checkExistBooking(stepper: MatStepper) {
    // stepper.next(); to got next step
    let currentDateBooking = this.formatDate(this.firstFormGroup.value.date);
    let currentTimeBooking = this.firstFormGroup.value.time.split("_")[1];

    let result = this.existbookings.filter((obj) => {
      return obj.showtime_id == currentTimeBooking;
    });
    this.selectedexistbookings = result;

    // block seat if the seat have been book by other user

    stepper.next();
  }

  disableSeat(row: number, column: number) {
    if (this.selectedexistbookings.length > 0) {
      let result = this.seats[row].columns.find((value) => {
        return value.column === column;
      });
      if (result) {
        let existbooking = this.selectedexistbookings.filter((obj) => {
          return obj.ticket_seat == result.name;
        });

        if (existbooking.length > 0) return true;
        else return false;
      }
    }
  }

  formatDate(date) {
    let selectedDate = date;
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

    return formatDate;
  }

  openModal(template: TemplateRef<any>) {
    this.modal = this.modalService.show(template, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
  }
}
