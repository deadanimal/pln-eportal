import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { JwtService } from "src/app/shared/jwt/jwt.service";
import { PaymentTicketsService } from "src/app/shared/services/payment-tickets/payment-tickets.service";
import { RedirectService } from "src/app/shared/services/redirect/redirect.service";
import { ShowingsService } from "src/app/shared/services/showings/showings.service";
import { ShowbookingsService } from "src/app/shared/services/showbookings/showbookings.service";
import { SimulatorRideBookingsService } from "src/app/shared/services/simulator-ride-bookings/simulator-ride-bookings.service";
import { UsersService } from "src/app/shared/services/users/users.service";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.scss"],
})
export class PaymentComponent implements OnInit {
  // Data
  htmlEncoded: any;
  module: string = "";
  user_id: string = "";
  time_id: string = "";
  showings = [];
  shows = [];
  simulatorrides = [];
  totalprice: number = 0;
  fpx_confirm: any;

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

  // FormGroup
  paymentdetailFormGroup: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private jwtService: JwtService,
    private paymentticketService: PaymentTicketsService,
    private redirectService: RedirectService,
    private showingService: ShowingsService,
    private showbookingService: ShowbookingsService,
    private simulatorridebookingService: SimulatorRideBookingsService,
    private userService: UsersService
  ) {
    this.getUser();

    this.paymentdetailFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      full_name: new FormControl(""),
      email: new FormControl(""),
      phone: new FormControl(""),
      payment_method: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
    });

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
            this.getFPXConfirm();
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
            this.getFPXConfirm();
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

  getUser() {
    if (this.jwtService.getToken("accessToken")) {
      this.userService.get(this.authService.decodedToken().user_id).subscribe(
        (res) => {
          // console.log("res", res);
          this.paymentdetailFormGroup.patchValue({
            ...res,
            id: "",
          });
        },
        (err) => {
          console.error("err", err);
        }
      );
    }
  }

  ngOnInit() {}

  selectPaymentMethod(payment_method: string) {
    this.paymentdetailFormGroup.patchValue({
      payment_method,
    });
  }

  getFPXConfirm() {
    let body = {
      fpx_txnAmount: this.totalprice.toFixed(2),
    };
    this.paymentticketService.fpx_confirm(body).subscribe(
      (res) => {
        console.log("res", res);
        this.fpx_confirm = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  submitPayment() {
    this.redirectService.post(this.fpx_confirm, "https://uat.mepsfpx.com.my/FPXMain/seller2DReceiver.jsp");
  }

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
