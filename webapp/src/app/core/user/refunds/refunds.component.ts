import { Component, OnInit, TemplateRef } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import swal from "sweetalert2";

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { BankListsService } from "src/app/shared/services/bank-lists/bank-lists.service";
import { CartsService } from "src/app/shared/services/carts/carts.service";
import { InvoiceReceiptsService } from "src/app/shared/services/invoice-receipts/invoice-receipts.service";
import { RefundsService } from "src/app/shared/services/refunds/refunds.service";
import { SupervisorsService } from "src/app/shared/services/supervisors/supervisors.service";
import { UsersService } from "src/app/shared/services/users/users.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-refunds",
  templateUrl: "./refunds.component.html",
  styleUrls: ["./refunds.component.scss"],
})
export class RefundsComponent implements OnInit {
  // Data
  banklists = [];
  carts = [];
  invoicereceipts = [];
  supervisors = [];
  users = []; // user_type = CS - Customer
  incharges = []; // user_type != CS - Customer
  picverifications = []; // user_type != CS - Customer
  infobooking = [];

  // Dropdown
  refundtypes = [
    {
      value: "T",
      display_name: "Tiket",
    },
    {
      value: "M",
      display_name: "Duit",
    },
  ];
  statuses = [
    {
      value: "RC",
      display_name: "Bayaran Balik Dibuat",
    },
    {
      value: "RA",
      display_name: "Bayaran Balik Diluluskan",
    },
    {
      value: "RR",
      display_name: "Bayaran Balik Ditolak",
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
  organisationcategories = [
    {
      value: "GV",
      display_name: "Kerajaan",
    },
    {
      value: "SC",
      display_name: "Sekolah",
    },
    {
      value: "UN",
      display_name: "Universiti",
    },
    {
      value: "NA",
      display_name: "Tiada",
    },
  ];
  bookingdays = [
    {
      value: "HALF",
      display_name: "Separuh Hari",
    },
    {
      value: "FULL",
      display_name: "Satu Hari",
    },
    {
      value: "NONE",
      display_name: "Tiada",
    },
  ];
  wantequipments = [
    {
      value: "WITH",
      display_name: "Dengan Peralatan",
    },
    {
      value: "WOUT",
      display_name: "Tanpa Peralatan",
    },
    {
      value: "NA",
      display_name: "Tiada",
    },
  ];

  // FormGroup
  refundFormGroup: FormGroup;

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
    private modalService: BsModalService,
    private authService: AuthService,
    private banklistService: BankListsService,
    private cartService: CartsService,
    private invoicereceiptService: InvoiceReceiptsService,
    private refundService: RefundsService,
    private supervisorService: SupervisorsService,
    private userService: UsersService
  ) {
    this.getData();
    this.getUser();
    this.getBankList();
    this.getSupervisor();

    this.refundFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      refund_type: new FormControl(""),
      description: new FormControl(""),
      amount: new FormControl(0),
      acc_number: new FormControl(""),
      bank_id: new FormControl(""),
      remarks: new FormControl(""),
      incharge_id: new FormControl(""),
      // incharge_datetime: new FormControl(""),
      user: new FormControl(""),
      // status: new FormControl(""),
      pic_verification_id: new FormControl(""),
      // pic_verification_datetime: new FormControl(""),
    });
  }

  getUser() {
    this.userService.getAll().subscribe(
      (res) => {
        // console.log("res", res);
        res.forEach((obj) => {
          if (obj.user_type == "CS") this.users.push(obj);
          else {
            this.incharges.push(obj);
            this.picverifications.push(obj);
          }
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

  getSupervisor() {
    this.supervisorService
      .extended("date_on_duty=" + this.getCurrentDate())
      .subscribe(
        (res) => {
          // console.log("res", res);
          this.supervisors = res;
        },
        (err) => {
          console.error("err", err);
        }
      );
  }

  getCart(row, process: string) {
    var urlFilter = "";
    if (process == "info-show") urlFilter = "show_booking_id=" + row.id;
    else if (process == "info-simulator-ride")
      urlFilter = "simulator_ride_booking_id=" + row.id;
    else if (process == "info-facility")
      urlFilter = "facility_booking_id=" + row.id;

    this.cartService.filter(urlFilter).subscribe(
      (res) => {
        // console.log("res", res);
        this.carts = res;
      },
      (err) => {
        console.error("err", err);
      },
      () => {
        this.invoicereceiptService
          .filter("cart_id=" + this.carts[0].id)
          .subscribe(
            (res) => {
              // console.log("res", res);
              this.invoicereceipts = res;
            },
            (err) => {
              console.error("err", err);
            }
          );
      }
    );
  }

  ngOnInit() {}

  getData() {
    this.refundService.extended("").subscribe((res) => {
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

  emptyFormGroup() {
    this.refundFormGroup.patchValue({
      id: "",
      voucher_code: "",
      voucher_amount: 0,
      validity_until: "",
      description: "",
      status: "",
      user: "",
    });
  }

  openModal(modalRef: TemplateRef<any>, process: string, row) {
    if (process == "create") {
      this.refundFormGroup.reset();
    } else if (process == "update") {
      this.refundFormGroup.patchValue({
        ...row,
        bank_id: row.bank_id ? row.bank_id.id : "",
        user: row.user ? row.user.id : "",
        incharge_id: row.incharge_id ? row.incharge_id.id : "",
        pic_verification_id: row.pic_verification_id
          ? row.pic_verification_id.id
          : "",
      });
    } else {
      this.getCart(row, process);
      this.infobooking.push(row);
      if (
        this.infobooking[0].ticket_type &&
        this.infobooking[0].ticket_category
      ) {
        if (this.infobooking[0].ticket_type.length == 2) {
          let resultType = this.tickettypes.find((obj) => {
            return obj.value == this.infobooking[0].ticket_type;
          });
          this.infobooking[0].ticket_type = resultType.display_name;
        }
        if (this.infobooking[0].ticket_category.length == 2) {
          let resultCategory = this.ticketcategories.find((obj) => {
            return obj.value == this.infobooking[0].ticket_category;
          });
          this.infobooking[0].ticket_category = resultCategory.display_name;
        }
      } else {
        if (this.infobooking[0].booking_days.length == 4) {
          let resultDays = this.bookingdays.find((obj) => {
            return obj.value == this.infobooking[0].booking_days;
          });
          this.infobooking[0].booking_days = resultDays.display_name;
        }
        if (this.infobooking[0].organisation_category.length == 2) {
          let resultCategory = this.organisationcategories.find((obj) => {
            return obj.value == this.infobooking[0].organisation_category;
          });
          this.infobooking[0].organisation_category =
            resultCategory.display_name;
        }
        if (this.infobooking[0].want_equipment.length == 4) {
          let resultEquipment = this.wantequipments.find((obj) => {
            return obj.value == this.infobooking[0].want_equipment;
          });
          this.infobooking[0].want_equipment = resultEquipment.display_name;
        }
      }
    }
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.infobooking = [];
    this.modal.hide();
  }

  create() {
    this.refundService.post(this.refundFormGroup.value).subscribe(
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
              cancelButton: "btn btn-warning",
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
    this.refundService
      .update(this.refundFormGroup.value, this.refundFormGroup.value.id)
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
                cancelButton: "btn btn-warning",
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
          this.refundService.delete(row.id).subscribe(
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

  verify(row) {
    swal
      .fire({
        title: "Pengesahan Bayaran Balik",
        html: '<input type="text" id="supervisor_id" class="swal2-input" placeholder="Masukkan ID Penyelia / Staf">',
        text: "Adakah anda ingin meluluskan bayaran balik ini?",
        icon: "warning",
        buttonsStyling: false,
        showDenyButton: true,
        customClass: {
          confirmButton: "btn btn-success",
          denyButton: "btn btn-danger",
        },
        confirmButtonText: "Ya",
        denyButtonText: "Tidak",
        showCloseButton: true,
        preDeny: () => {
          const supervisor_id = (<HTMLInputElement>(
            swal.getPopup().querySelector("#supervisor_id")
          )).value;

          if (!supervisor_id) {
            swal.showValidationMessage("Sila masukkan ID Penyelia / Staf");
            return false;
          } else {
            return { supervisor_id: supervisor_id };
          }
        },
        preConfirm: () => {
          const supervisor_id = (<HTMLInputElement>(
            swal.getPopup().querySelector("#supervisor_id")
          )).value;

          if (!supervisor_id) {
            swal.showValidationMessage("Sila masukkan ID Penyelia / Staf");
          }
          return { supervisor_id: supervisor_id };
        },
      })
      .then((result) => {
        let supervisor = this.supervisors.find((obj) => {
          return obj.user.staff_id == result.value.supervisor_id;
        });

        // to check if staff id is same with the supervisor on duty id
        if (supervisor) {
          if (result.isConfirmed == true) {
            let obj = {
              status: "RA",
              pic_verification_id: supervisor.user.id,
              pic_verification_datetime: this.getCurrentDateTime(),
            };
            this.refundService.update(obj, row.id).subscribe(
              (res) => {
                // console.log("res", res);
              },
              (err) => {
                console.error("err", err);
              },
              () => {
                this.sweetAlertSuccess(
                  "Diluluskan",
                  "Anda telah meluluskan permohonan bayaran balik ini. Terima kasih."
                );
                this.getData();
              }
            );
          } else if (result.isDismissed == true) {
            let obj = {
              status: "RR",
              pic_verification_id: supervisor.user.id,
              pic_verification_datetime: this.getCurrentDateTime(),
            };
            this.refundService.update(obj, row.id).subscribe(
              (res) => {
                // console.log("res", res);
              },
              (err) => {
                console.error("err", err);
              },
              () => {
                this.sweetAlertSuccess(
                  "Ditolak",
                  "Anda telah menolak permohonan bayaran balik ini. Terima kasih."
                );
                this.getData();
              }
            );
          }
        } else {
          this.sweetAlertWarning(
            "Ralat",
            "ID Penyelia yang anda masukkan tidak sama dengan penyelia yang bertugas pada hari ini."
          );
        }
      });
  }

  sweetAlertSuccess(title, text) {
    swal.fire({
      title,
      text,
      icon: "success",
      buttonsStyling: false,
      customClass: {
        confirmButton: "btn btn-success",
      },
    });
  }

  sweetAlertWarning(title, text) {
    swal.fire({
      title,
      text,
      icon: "warning",
      buttonsStyling: false,
      customClass: {
        confirmButton: "btn btn-warning",
      },
    });
  }

  getStatus(value: string) {
    let result = this.statuses.find((obj) => {
      return obj.value == value;
    });
    return result.display_name;
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

  getCurrentDate() {
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

    return formatDate;
  }
}
