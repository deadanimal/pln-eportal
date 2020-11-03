import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { ShowingsService } from "src/app/shared/services/showings/showings.service";
import { ShowbookingsService } from "src/app/shared/services/showbookings/showbookings.service";
import { SimulatorRideBookingsService } from "src/app/shared/services/simulator-ride-bookings/simulator-ride-bookings.service";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.scss"],
})
export class PaymentComponent implements OnInit {
  // Data
  module: string = "";
  user_id: string = "";
  time_id: string = "";
  showings = [];
  shows = [];
  simulatorrides = [];
  totalprice: number = 0;

  // Dropdown
  simulatorridedays = [
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
  simulatorriderounds = [
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
  ticketcategories = [
    {
      value: "AD",
      display_name: "Dewasa",
    },
    {
      value: "KD",
      display_name: "Kanak-kanak",
    },
    {
      value: "OF",
      display_name: "Warga emas",
    },
    {
      value: "SD",
      display_name: "Pelajar",
    },
    {
      value: "OK",
      display_name: "OKU",
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private showingService: ShowingsService,
    private showbookingService: ShowbookingsService,
    private simulatorridebookingService: SimulatorRideBookingsService
  ) {
    this.module = this.route.snapshot.paramMap.get("module");
    this.user_id = this.route.snapshot.paramMap.get("user_id");
    this.time_id = this.route.snapshot.paramMap.get("time_id");

    if (this.module && this.user_id && this.time_id) this.getBookingDetail();
  }

  getBookingDetail() {
    if (this.module == "shows") {
      this.showbookingService
        .extended("showtime_id=" + this.time_id + "&user_id=" + this.user_id)
        .subscribe(
          (res) => {
            console.log("res", res);
            this.showings = res;
            this.getShowingDetail();

            for (let showing of this.showings) {
              this.totalprice += +showing.total_price;
            }
          },
          (err) => {
            console.error("err", err);
          }
        );
    } else if (this.module == "simulator-ride") {
      this.simulatorridebookingService
        .extended(
          "simulator_ride_time_id=" + this.time_id + "&user_id=" + this.user_id
        )
        .subscribe(
          (res) => {
            console.log("res", res);
            this.simulatorrides = res;

            for (let simulatorride of this.simulatorrides) {
              this.totalprice += +simulatorride.total_price;
            }
          },
          (err) => {
            console.error("err", err);
          }
        );
    }
  }

  getShowingDetail() {
    this.showingService.filter("id=" + this.showings[0].show_id.id).subscribe(
      (res) => {
        console.log("res", res);
        this.shows = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  ngOnInit() {}

  getSimulatorRideDay(value: string) {
    let result = this.simulatorridedays.find((obj) => {
      return obj.value == value;
    });
    if (result) return result.display_name;
  }

  getSimulatorRideRound(value: string) {
    let result = this.simulatorriderounds.find((obj) => {
      return obj.value == value;
    });
    if (result) return result.display_name;
  }

  getTicketCategory(value: string) {
    let result = this.ticketcategories.find((obj) => {
      return obj.value == value;
    });
    if (result) return result.display_name;
  }
}
