import { Component, OnInit, TemplateRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatStepper } from "@angular/material/stepper";
import { NavigationExtras, Router } from "@angular/router";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import swal from "sweetalert2";

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { SimulatorRideBookingsService } from "src/app/shared/services/simulator-ride-bookings/simulator-ride-bookings.service";
import { SimulatorRideTimesService } from "src/app/shared/services/simulator-ride-times/simulator-ride-times.service";
import { W3csService } from "src/app/shared/services/w3cs/w3cs.service";

@Component({
  selector: "app-simulator-ride-book",
  templateUrl: "./simulator-ride-book.component.html",
  styleUrls: ["./simulator-ride-book.component.scss"],
})
export class SimulatorRideBookComponent implements OnInit {
  // CSS class
  fontSize: string;

  // Data
  bookingtimes = ["10", "11", "15", "16"];
  existbookings = [];
  simridetimes = [];
  acceptedbookings = [];
  today: Date = new Date();
  threemonth: Date = new Date();
  totalticket: number = 0;
  totalexistticket: number = 1;

  // Dropdown
  days = [
    {
      value: "SUN",
      display_name: "Ahad",
    },
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
  ];
  times = [];

  // FormGroup
  zeroFormGroup: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  // Modal
  safetyModal: BsModalRef;
  default = {
    keyboard: true,
    class: "modal-dialog",
    backdrop: false,
    ignoreBackdropClick: true,
  };

  constructor(
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private router: Router,
    private authService: AuthService,
    private simulatorridebookingService: SimulatorRideBookingsService,
    private simulatorridetimeService: SimulatorRideTimesService,
    private w3cService: W3csService
  ) {
    // minDate - to set the min date starting day after tomorrow
    this.today.setDate(this.today.getDate() + 1);
    // maxDate - to set the max date on 3 months starting today
    this.threemonth.setMonth(this.threemonth.getMonth() + 3);

    this.getExistBooking();
    this.getSimRideTime();

    this.zeroFormGroup = this.formBuilder.group({
      accept: [false, Validators.compose([Validators.requiredTrue])],
    });
    this.firstFormGroup = this.formBuilder.group({
      date: ["", Validators.required],
      time: ["", Validators.required],
    });
    this.secondFormGroup = this.formBuilder.group({
      citizen: [true, Validators.required],
      adult: [0, Validators.required],
      children: [0, Validators.required],
      // senior: [0, Validators.required],
      // oku: [0, Validators.required],
      total: [0, Validators.required],
    });
  }

  getExistBooking() {
    this.simulatorridebookingService.get().subscribe(
      (res) => {
        console.log("res", res);
        this.existbookings = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  getSimRideTime() {
    this.simulatorridetimeService.get().subscribe(
      (res) => {
        console.log("res", res);
        this.simridetimes = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  ngOnInit() {
    this.w3cService.currentFontSize.subscribe(
      (fontSize) => (this.fontSize = fontSize)
    );
  }

  citizenChange() {
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalticket =
      this.totalexistticket +
      this.secondFormGroup.value.adult +
      this.secondFormGroup.value.children;

    if (this.secondFormGroup.value.citizen) {
      this.secondFormGroup.value.total =
        this.secondFormGroup.value.adult * 12 +
        this.secondFormGroup.value.children * 8;
    } else {
      this.secondFormGroup.value.total =
        this.secondFormGroup.value.adult * 24 +
        this.secondFormGroup.value.children * 16;
    }
  }

  makePayment() {
    var totalTicket =
      this.secondFormGroup.value.adult + this.secondFormGroup.value.children;
    var simulatorRideTimeId = this.firstFormGroup.value.time.split("_").pop();
    var ticketType = this.secondFormGroup.value.citizen ? "CZ" : "NC";

    var adultTicket = this.secondFormGroup.value.adult;
    var childrenTicket = this.secondFormGroup.value.children;

    for (let i = 0; i < totalTicket; i++) {
      if (adultTicket > 0) {
        var ticketCategory = "AD";
        var price = this.secondFormGroup.value.citizen ? 12 : 24;
        var totalPrice = this.secondFormGroup.value.citizen ? 12 : 24;
        adultTicket--;
      } else if (childrenTicket > 0) {
        var ticketCategory = "KD";
        var price = this.secondFormGroup.value.citizen ? 8 : 16;
        var totalPrice = this.secondFormGroup.value.citizen ? 8 : 16;
        childrenTicket--;
      }

      let objPost = {
        booking_date: this.formatDate(this.firstFormGroup.value.date),
        ticket_type: ticketType,
        ticket_category: ticketCategory,
        ticket_quantity: 1,
        price: price,
        total_price: totalPrice,
        simulator_ride_time_id: simulatorRideTimeId,
        user_id: this.authService.decodedToken().user_id,
      };

      this.simulatorridebookingService.post(objPost).subscribe(
        (res) => {
          /* stuck disini untuk membuat bayaran FPX */
          // console.log("res", res);
          this.acceptedbookings.push(res);
        },
        (err) => {
          console.log("err", err);
        },
        () => {
          // to update the status of simulator ride booking from SRB01 to 
          for (let i = 0; i < this.acceptedbookings.length; i++) {
            let obj = {
              status: "SRB02",
            };
            this.simulatorridebookingService
              .update(obj, this.acceptedbookings[i].id)
              .subscribe(
                (res) => {
                  console.log("res", res);
                },
                (err) => {
                  console.error("err", err);
                }
              );

            if (i === this.acceptedbookings.length - 1) {
              this.router.navigate([
                "/payment",
                "simulator-ride",
                this.authService.decodedToken().user_id,
                simulatorRideTimeId,
              ]);
            }
          }
        }
      );
    }

    // let booking = {
    //   ...this.firstFormGroup.value,
    //   ...this.secondFormGroup.value,
    // };
    // let navigationExtras: NavigationExtras = {
    //   state: {
    //     booking,
    //   },
    // };
    // this.router.navigate(["/payment"], navigationExtras);
  }

  openSafetyModal(modalSafety: TemplateRef<any>) {
    this.safetyModal = this.modalService.show(modalSafety, this.default);
  }

  changeDate(value: Date): void {
    if (value) {
      var selectedDate = new Date(value);

      this.times = this.simridetimes.filter((obj) => {
        var today = new Date();
        var time =
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds();
        if (this.formatDate(today) == this.formatDate(selectedDate))
          return (
            obj.day == this.days[selectedDate.getDay()].value && obj.time > time
          );
        else return obj.day == this.days[selectedDate.getDay()].value;
      });

      /* this.simulatorridetimeService
        .filter("day=" + this.days[selectedDate.getDay()].value)
        .subscribe(
          (res) => {
            console.log("res", res);
            if (res) {
              this.times = res;
            }
          },
          (err) => {
            console.error("err", err);
          }
        ); */
    }
  }

  // To check if existing booking dont mix up with new booking
  checkExistBooking(stepper: MatStepper) {
    // stepper.next(); to got next step
    let currentDateBooking = this.formatDate(this.firstFormGroup.value.date);
    let currentTimeBooking = this.firstFormGroup.value.time.split("_")[1];

    let result = this.existbookings.filter((obj) => {
      return (
        obj.booking_date == currentDateBooking &&
        obj.simulator_ride_time_id == currentTimeBooking
      );
    });

    if (result) {
      if (result.length == 0) {
        this.totalexistticket = 0;
        // this.totalTicket = 0;
        this.secondFormGroup.patchValue({
          adult: 0,
          children: 0,
        });
        stepper.next();
      } else if (result.length == 1) {
        // this.totalTicket = 0;
        this.secondFormGroup.patchValue({
          adult: 0,
          children: 0,
        });
        swal
          .fire({
            icon: "info",
            title: "Tempahan Kembara Simulasi",
            text:
              "Tarikh dan waktu tempahan yang anda pilih hanya berbaki 1 kerusi sahaja. Adakah anda ingin meneruskan tempahan?",
            buttonsStyling: false,
            showCancelButton: true,
            confirmButtonText: "Ya",
            customClass: {
              confirmButton: "btn btn-info",
              cancelButton: "btn btn-danger",
            },
            cancelButtonText: "Tidak",
          })
          .then((result) => {
            if (result.value) {
              stepper.next();
            }
          });
      } else if (result.length == 2) {
        swal.fire({
          icon: "info",
          title: "Tempahan Kembara Simulasi",
          text:
            "Harap maaf, tarikh ATAU waktu tempahan anda sudah ditempah oleh orang lain. Sila pilih tarikh ATAU waktu yang berbeza untuk menempah. Terima kasih.",
          buttonsStyling: false,
          confirmButtonText: "Tutup",
          customClass: {
            confirmButton: "btn btn-info",
          },
        });
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
}
