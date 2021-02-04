import {
  Component,
  OnInit,
  NgZone,
  OnDestroy,
  TemplateRef,
} from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import swal from "sweetalert2";

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { BankListsService } from "src/app/shared/services/bank-lists/bank-lists.service";
import { RefundsService } from "src/app/shared/services/refunds/refunds.service";
import { ShowingsService } from "src/app/shared/services/showings/showings.service";
import { ShowbookingsService } from "src/app/shared/services/showbookings/showbookings.service";
import { UsersService } from "src/app/shared/services/users/users.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-shows-applications-detail",
  templateUrl: "./shows-applications-detail.component.html",
  styleUrls: ["./shows-applications-detail.component.scss"],
})
export class ShowsApplicationsDetailComponent implements OnInit {
  // Data
  banklists = [];
  showtime_id: string = "";
  showings = [];
  users = [];

  // Dropdown
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
  statuses = [
    {
      value: "SB01",
      display_name: "Dalam proses",
    },
    {
      value: "SB02",
      display_name: "Diterima",
    },
    {
      value: "SB03",
      display_name: "Ditolak",
    },
    {
      value: "SB04",
      display_name: "Menunggu Pembayaran",
    },
    {
      value: "SB05",
      display_name: "Bayaran Diterima",
    },
    {
      value: "SB06",
      display_name: "Bayaran Ditolak",
    },
    {
      value: "SB07",
      display_name: "Bayaran Balik",
    },
  ];

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
  refundFormGroup: FormGroup;
  showbookingFormGroup: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private banklistService: BankListsService,
    private refundService: RefundsService,
    private showingService: ShowingsService,
    private showbookingService: ShowbookingsService,
    private userService: UsersService
  ) {
    this.showtime_id = this.route.snapshot.paramMap.get("showtime_id");
    if (this.showtime_id) this.getData();
    this.getShowing();
    this.getUser();
    this.getBankList();

    this.showbookingFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      ticket_type: new FormControl(""),
      ticket_category: new FormControl(""),
      ticket_quantity: new FormControl(1),
      price: new FormControl(0.0),
      total_price: new FormControl(0.0),
      show_id: new FormControl(""),
      showtime_id: new FormControl(this.showtime_id),
      user_id: new FormControl(""),
      status: new FormControl(""),
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
      show_booking_id: new FormControl(""),
      // simulator_ride_booking_id: new FormControl(""),
      // facility_booking_id: new FormControl(""),
    });
  }

  getShowing() {
    this.showingService.filter("status=AV").subscribe(
      (res) => {
        // console.log("res", res);
        this.showings = res;
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

  getData() {
    this.showbookingService
      .extended("showtime_id=" + this.showtime_id)
      .subscribe((res) => {
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
      this.showbookingFormGroup.reset();
    } else if (process == "update") {
      this.showbookingFormGroup.patchValue({
        ...row,
        show_id: row.show_id.id,
        showtime_id: row.showtime_id.id,
        user_id: row.user_id.id,
      });
    } else if (process == "refund") {
      this.refundFormGroup.patchValue({
        show_booking_id: row.id,
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
    this.showbookingService.post(this.showbookingFormGroup.value).subscribe(
      (res) => {
        console.log("res", res);
        swal
          .fire({
            title: "Berjaya",
            text: "Data anda berjaya disimpan.",
            type: "success",
            buttonsStyling: false,
            confirmButtonClass: "btn btn-success",
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
            type: "warning",
            buttonsStyling: false,
            confirmButtonClass: "btn btn-warning",
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
    this.showbookingService
      .update(
        this.showbookingFormGroup.value,
        this.showbookingFormGroup.value.id
      )
      .subscribe(
        (res) => {
          console.log("res", res);
          swal
            .fire({
              title: "Berjaya",
              text: "Data anda berjaya dikemaskini.",
              type: "success",
              buttonsStyling: false,
              confirmButtonClass: "btn btn-success",
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
              type: "warning",
              buttonsStyling: false,
              confirmButtonClass: "btn btn-warning",
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
        type: "warning",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonClass: "btn btn-danger",
        confirmButtonText: "Ya",
        cancelButtonClass: "btn btn-secondary",
        cancelButtonText: "Tidak",
      })
      .then((result) => {
        if (result.value) {
          this.showbookingService.delete(row.id).subscribe(
            (res) => {
              console.log("res", res);
              swal.fire({
                title: "Proses Buang berjaya",
                text: "Data anda berjaya dibuang.",
                type: "success",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
              });
              this.getData();
            },
            (err) => {
              console.error("err", err);
              swal.fire({
                title: "Proses Buang tidak berjaya",
                text: "Data anda tidak berjaya dibuang. Sila cuba lagi.",
                type: "warning",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-warning",
              });
            }
          );
        }
      });
  }

  refund() {
    this.refundService.post(this.refundFormGroup.value).subscribe(
      (res) => {
        console.log("res", res);

        let obj = {
          status: "SB07",
        };
        this.showbookingService
          .update(obj, this.refundFormGroup.value.show_booking_id)
          .subscribe(
            (res) => {
              console.log("res", res);
            },
            (err) => {
              console.error("err", err);
            }
          );

        swal
          .fire({
            title: "Berjaya",
            text: "Bayaran balik anda berjaya disimpan.",
            type: "success",
            buttonsStyling: false,
            confirmButtonClass: "btn btn-success",
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
            type: "warning",
            buttonsStyling: false,
            confirmButtonClass: "btn btn-warning",
          })
          .then((result) => {
            if (result.value) {
              // this.modal.hide();
            }
          });
      }
    );
  }

  getTicketType(value: string) {
    let result = this.tickettypes.find((obj) => {
      return obj.value == value;
    });
    return result.display_name;
  }

  getTicketCategory(value: string) {
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
}
