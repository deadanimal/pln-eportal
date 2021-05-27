import { Component, OnInit, TemplateRef } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { environment } from "src/environments/environment";
import swal from "sweetalert2";

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { BankListsService } from "src/app/shared/services/bank-lists/bank-lists.service";
import { RefundsService } from "src/app/shared/services/refunds/refunds.service";
import { SimulatorRideBookingsService } from "src/app/shared/services/simulator-ride-bookings/simulator-ride-bookings.service";
import { SimulatorRideTimesService } from "src/app/shared/services/simulator-ride-times/simulator-ride-times.service";
import { UsersService } from "src/app/shared/services/users/users.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-simulator-ride-applications",
  templateUrl: "./simulator-ride-applications.component.html",
  styleUrls: ["./simulator-ride-applications.component.scss"],
})
export class SimulatorRideApplicationsComponent implements OnInit {
  // Data
  banklists = [];
  generateTicketURL =
    environment.baseUrl + "v1/simulator-ride-bookings/generate_ticket/?id=";

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
    ignoreBackdropClick: true,
  };

  // FormGroup
  refundFormGroup: FormGroup;
  simridebookingFormGroup: FormGroup;

  // Dropdown
  days = [
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
  rounds = [
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
  statuses = [
    {
      value: "SRB01",
      display_name: "Diterima",
    },
    {
      value: "SRB02",
      display_name: "Menunggu Pembayaran",
    },
    {
      value: "SRB03",
      display_name: "Bayaran Diterima",
    },
    {
      value: "SRB04",
      display_name: "Bayaran Ditolak",
    },
    {
      value: "SRB05",
      display_name: "Bayaran Balik",
    },
  ];
  tickettypes = [
    {
      value: "CZ",
      display_name: "Warganegara",
    },
    {
      value: "NC",
      display_name: "Bukan Warganegara",
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
  ];
  times = [];
  users = [];

  constructor(
    public formBuilder: FormBuilder,
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private banklistService: BankListsService,
    private refundService: RefundsService,
    private simridebookingService: SimulatorRideBookingsService,
    private simridetiemService: SimulatorRideTimesService,
    private userService: UsersService
  ) {
    this.simridebookingFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      booking_date: new FormControl(""),
      simulator_ride_time_id: new FormControl(""),
      ticket_type: new FormControl(""),
      ticket_category: new FormControl(""),
      ticket_quantity: new FormControl(1),
      price: new FormControl(""),
      total_price: new FormControl(""),
      user_id: new FormControl(""),
      // status: new FormControl(""),
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
      simulator_ride_booking_id: new FormControl(""),
      // facility_booking_id: new FormControl(""),
    });

    this.getData();
    this.getTime();
    this.getUser();
    this.getBankList();
  }

  getData() {
    this.simridebookingService.extended("").subscribe(
      (res) => {
        // console.log("res", res);
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
      }
    );
  }

  getTime() {
    this.simridetiemService.get().subscribe(
      (res) => {
        // console.log("res", res);
        this.times = res;
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

  ngOnInit() {}

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

  openBooking() {
    this.router.navigate(["/simulator-ride/bookings"]).then(() => {
      window.location.reload();
    });
  }

  openModal(modalRef: TemplateRef<any>, process: string, row) {
    if (process == "create") {
      this.simridebookingFormGroup.reset();
    } else if (process == "update") {
      this.simridebookingFormGroup.patchValue({
        ...row,
        simulator_ride_time_id: row.simulator_ride_time_id
          ? row.simulator_ride_time_id.id
          : "",
        user_id: row.user_id ? row.user_id.id : "",
      });
    } else if (process == "refund") {
      this.refundFormGroup.patchValue({
        simulator_ride_booking_id: row.id,
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
    this.simridebookingService
      .post(this.simridebookingFormGroup.value)
      .subscribe(
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
    this.simridebookingService
      .update(
        this.simridebookingFormGroup.value,
        this.simridebookingFormGroup.value.id
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
          this.simridebookingService.delete(row.id).subscribe(
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

  refund() {
    this.refundService.post(this.refundFormGroup.value).subscribe(
      (res) => {
        // console.log("res", res);

        let obj = {
          status: "SRB05",
        };
        this.simridebookingService
          .update(obj, this.refundFormGroup.value.simulator_ride_booking_id)
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

  displayPrintTicket(status: string) {
    var statuses = ["SRB03", "SRB05"];
    if (~statuses.indexOf(status)) return true;
    else return false;
  }

  getType(value: string) {
    let result = this.tickettypes.find((obj) => {
      return obj.value == value;
    });
    return result.display_name;
  }

  getCategory(value: string) {
    let result = this.ticketcategories.find((obj) => {
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

  getDay(value: string) {
    let result = this.days.find((obj) => {
      return obj.value == value;
    });
    return result.display_name;
  }

  getRound(value: string) {
    let result = this.rounds.find((obj) => {
      return obj.value == value;
    });
    return result.display_name;
  }
}
