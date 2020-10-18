import { Component, OnInit, TemplateRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NavigationExtras, Router } from "@angular/router";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { SimulatorRideBookingsService } from "src/app/shared/services/simulator-ride-bookings/simulator-ride-bookings.service";
import { SimulatorRideTimesService } from "src/app/shared/services/simulator-ride-times/simulator-ride-times.service";

@Component({
  selector: "app-simulator-ride-book",
  templateUrl: "./simulator-ride-book.component.html",
  styleUrls: ["./simulator-ride-book.component.scss"],
})
export class SimulatorRideBookComponent implements OnInit {
  // FormGroup
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  // Modal
  safetyModal: BsModalRef;
  default = {
    keyboard: true,
    class: "modal-dialog-centered",
  };

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

  constructor(
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private router: Router,
    private authService: AuthService,
    private simulatorridebookingService: SimulatorRideBookingsService,
    private simulatorridetimeService: SimulatorRideTimesService
  ) {
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

  ngOnInit() {}

  citizenChange() {
    this.calculateTotal();
  }

  calculateTotal() {
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

    for (let i = 0; i < totalTicket; i++) {
      var adultTicket = this.secondFormGroup.value.adult;
      var childrenTicket = this.secondFormGroup.value.children;
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
          console.log("res", res);
        },
        (err) => {
          console.log("err", err);
        }
      );
    }

    let booking = {
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value,
    };
    let navigationExtras: NavigationExtras = {
      state: {
        booking,
      },
    };
    this.router.navigate(["/payment"], navigationExtras);
  }

  openSafetyModal(modalSafety: TemplateRef<any>) {
    this.safetyModal = this.modalService.show(modalSafety, this.default);
  }

  changeDate(value: Date): void {
    if (value) {
      var selectedDate = new Date(value);

      this.simulatorridetimeService
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
        );
    }
  }
}
