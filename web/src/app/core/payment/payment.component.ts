import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { BankListsService } from "src/app/shared/services/bank-lists/bank-lists.service";
import { FpxTransactionsService } from "src/app/shared/services/fpx-transactions/fpx-transactions.service";
import { JwtService } from "src/app/shared/jwt/jwt.service";
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
  shows = [];
  showings$: Observable<any>;
  simulatorrides$: Observable<any>;
  totalprice: number = 0;
  fpx_confirm: any;
  banklists = [];
  banklistfromdb = [];
  banklistfromfpx = [];

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
  fpxtransactionFormGroup: FormGroup; // Request Message - AR

  constructor(
    public formBuilder: FormBuilder,
    public translate: TranslateService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private banklistService: BankListsService,
    private fpxtransactionService: FpxTransactionsService,
    private jwtService: JwtService,
    private redirectService: RedirectService,
    private showingService: ShowingsService,
    private showbookingService: ShowbookingsService,
    private simulatorridebookingService: SimulatorRideBookingsService,
    private userService: UsersService
  ) {
    this.getUser();
    this.getBankList();

    this.paymentdetailFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      full_name: new FormControl(""),
      email: new FormControl(""),
      phone: new FormControl(""),
      payment_method: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      bank_selected: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
    });

    this.fpxtransactionFormGroup = this.formBuilder.group({
      fpx_msgType: new FormControl(""),
      fpx_msgToken: new FormControl(""),
      fpx_sellerExId: new FormControl(""),
      fpx_sellerExOrderNo: new FormControl(""),
      fpx_sellerTxnTime: new FormControl(""),
      fpx_sellerOrderNo: new FormControl(""),
      fpx_sellerId: new FormControl(""),
      fpx_sellerBankCode: new FormControl(""),
      fpx_txnCurrency: new FormControl(""),
      fpx_txnAmount: new FormControl(0),
      fpx_buyerEmail: new FormControl(""),
      fpx_checkSum: new FormControl(""),
      fpx_buyerName: new FormControl(""),
      fpx_buyerBankId: new FormControl(""),
      fpx_buyerBankBranch: new FormControl(""),
      fpx_buyerAccNo: new FormControl(""),
      fpx_buyerId: new FormControl(""),
      fpx_makerName: new FormControl(""),
      fpx_buyerIban: new FormControl(""),
      fpx_productDesc: new FormControl(""),
      fpx_version: new FormControl(""),
      fpx_eaccountNum: new FormControl(""),
      fpx_ebuyerId: new FormControl(""),
    });
  }

  getBookingDetail() {
    if (this.module == "shows") {
      this.showings$ = this.showbookingService.extended(
        "showtime_id=" + this.time_id + "&user_id=" + this.user_id
      );
      this.showings$.subscribe(
        (res) => {
          if (res) this.getShowingDetail(res);
          for (let i = 0; i < res.length; i++) {
            this.totalprice += +res[i].total_price;
          }
        },
        (err) => {
          console.error("err", err);
        }
      );
    } else if (this.module == "simulator-ride") {
      this.simulatorrides$ = this.simulatorridebookingService.extended(
        "simulator_ride_time_id=" + this.time_id + "&user_id=" + this.user_id
      );
      this.simulatorrides$.subscribe(
        (res) => {
          for (let i = 0; i < res.length; i++) {
            this.totalprice += +res[i].total_price;
          }
        },
        (err) => {
          console.error("err", err);
        }
      );
    }
  }

  getShowingDetail(res) {
    this.showingService.filter("id=" + res[0].show_id.id).subscribe(
      (res) => {
        // console.log("res", res);
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

  getBankList() {
    this.banklistService.get().subscribe(
      (res) => {
        // console.log("res", res);
        this.banklistfromdb = res;
      },
      (err) => {
        console.error("err", err);
      },
      () => {
        this.fpxtransactionService.fpx_get_bank_list().subscribe(
          (res) => {
            // console.log("res", res);
            this.banklistfromfpx = Object.entries(res);
          },
          (err) => {
            console.error("err", err);
          },
          () => {
            // to filter the active bank from FPX and DB
            this.banklistfromdb.filter((obj_db) => {
              this.banklistfromfpx.filter((obj_fpx) => {
                // obj_fpx[0] : Bank ID
                // obj_fpx[1] : Bank Active
                if (obj_db.bank_id == obj_fpx[0] && obj_fpx[1] == "A") {
                  this.banklists.push(obj_db);
                }
              });
            });
          }
        );
      }
    );
  }

  ngOnInit() {
    this.module = this.route.snapshot.paramMap.get("module");
    this.user_id = this.route.snapshot.paramMap.get("user_id");
    this.time_id = this.route.snapshot.paramMap.get("time_id");

    if (this.module && this.user_id && this.time_id) this.getBookingDetail();
  }

  selectPaymentMethod(payment_method: string) {
    this.paymentdetailFormGroup.patchValue({
      payment_method,
    });
  }

  submitPayment() {
    let body = {
      fpx_buyerBankId: this.paymentdetailFormGroup.value.bank_selected,
      fpx_buyerEmail:
        this.paymentdetailFormGroup.value.email.length <= 50
          ? this.paymentdetailFormGroup.value.email
          : "",
      fpx_buyerName:
        this.paymentdetailFormGroup.value.full_name.length <= 40
          ? this.paymentdetailFormGroup.value.full_name
          : "",
      fpx_txnAmount: this.totalprice.toFixed(2),
    };
    this.fpxtransactionService.fpx_confirm(body).subscribe(
      (res) => {
        // console.log("res", res);
        this.fpxtransactionFormGroup.patchValue({
          ...res,
        });
      },
      (err) => {
        console.error("err", err);
      },
      () => {
        this.fpxtransactionService
          .post(this.fpxtransactionFormGroup.value)
          .subscribe(
            (res) => {
              // console.log("res", res);
            },
            (err) => {
              console.error("err", err);
            },
            () => {
              this.redirectService.post(
                this.fpxtransactionFormGroup.value,
                "https://uat.mepsfpx.com.my/FPXMain/seller2DReceiver.jsp"
              );
            }
          );
      }
    );
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
