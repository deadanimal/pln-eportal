import { Component, OnInit, TemplateRef } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import swal from "sweetalert2";

import { TicketPricesService } from "src/app/shared/services/ticket-prices/ticket-prices.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-ticket-prices",
  templateUrl: "./ticket-prices.component.html",
  styleUrls: ["./ticket-prices.component.scss"],
})
export class TicketPricesComponent implements OnInit {
  // Data

  // Dropdown
  modules = [
    {
      value: "simulator-ride",
      display_name: "Kembara Simulasi",
    },
    {
      value: "shows",
      display_name: "Tayangan",
    },
  ];
  ticketcategories = [
    {
      value: "AD",
      display_name: "Dewasa",
      description: "13 tahun dan ke atas",
    },
    {
      value: "KD",
      display_name: "Kanak-kanak",
      description: "2 sehingga 12 tahun",
    },
    {
      value: "OF",
      display_name: "Warga emas",
      description: "",
    },
    {
      value: "SD",
      display_name: "Pelajar",
      description: "18 tahun dan ke bawah",
    },
    {
      value: "OK",
      display_name: "OKU",
      description: "",
    },
  ];

  // FormGroup
  ticketpriceFormGroup: FormGroup;

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
    private ticketpriceService: TicketPricesService
  ) {
    this.getData();

    this.ticketpriceFormGroup = this.formBuilder.group({
      id: new FormControl("", Validators.compose([Validators.required])),
      title_en: new FormControl("", Validators.compose([Validators.required])),
      title_ms: new FormControl("", Validators.compose([Validators.required])),
      price_citizen: new FormControl(0),
      price_noncitizen: new FormControl(0),
      ticket_category: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      module: new FormControl("", Validators.compose([Validators.required])),
      status: new FormControl(false),
    });
  }

  ngOnInit() {}

  getData() {
    this.ticketpriceService.get().subscribe((res) => {
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
    this.ticketpriceFormGroup.patchValue({
      id: "",
      title_en: "",
      title_ms: "",
      price_citizen: 0,
      price_noncitizen: 0,
      ticket_category: "",
      module: "",
      status: false,
    });
  }

  openModal(modalRef: TemplateRef<any>, process: string, row) {
    if (process == "create") {
      // this.ticketpriceFormGroup.reset();
      this.emptyFormGroup();
    } else if (process == "update") {
      this.ticketpriceFormGroup.patchValue({
        ...row,
        status: row.status.toString(),
      });
    }
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
  }

  checkInterceptTicketPrice() {
    let new_ticket_category = this.ticketpriceFormGroup.value.ticket_category;
    let new_module = this.ticketpriceFormGroup.value.module;

    if (this.tableRows.length > 0) {
      for (let i = 0; i < this.tableRows.length; i++) {
        if (
          new_ticket_category == this.tableRows[i].ticket_category &&
          new_module == this.tableRows[i].module
        ) {
          return false;
        } else {
          return true;
        }
      }
    } else return true;
  }

  create() {
    if (this.checkInterceptTicketPrice()) {
      this.ticketpriceService.post(this.ticketpriceFormGroup.value).subscribe(
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
    } else {
      this.sweetAlertWarning("Ralat", "Anda telah masukkan data yang sama.");
    }
  }

  update() {
    if (this.checkInterceptTicketPrice) {
      this.ticketpriceService
        .update(
          this.ticketpriceFormGroup.value,
          this.ticketpriceFormGroup.value.id
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
    } else {
      this.sweetAlertWarning("Ralat", "Anda telah masukkan data yang sama.");
    }
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
          this.ticketpriceService.delete(row.id).subscribe(
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

  getModule(value: string) {
    let result = this.modules.find((obj) => {
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
}
