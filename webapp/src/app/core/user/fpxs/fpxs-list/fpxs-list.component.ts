import { Component, OnInit, TemplateRef } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import swal from "sweetalert2";

import { FpxTransactionsService } from "src/app/shared/services/fpx-transactions/fpx-transactions.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-fpxs-list",
  templateUrl: "./fpxs-list.component.html",
  styleUrls: ["./fpxs-list.component.scss"],
})
export class FpxsListComponent implements OnInit {
  // Data

  // Dropdown

  // FormGroup
  fpxtransactionFormGroup: FormGroup;

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
    private fpxtransactionService: FpxTransactionsService
  ) {
    this.fpxtransactionFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      fpx_msgicon: new FormControl(""),
      fpx_msgToken: new FormControl(""),
      fpx_fpxTxnId: new FormControl(""),
      fpx_sellerExId: new FormControl(""),
      fpx_sellerExOrderNo: new FormControl(""),
      fpx_fpxTxnTime: new FormControl(""),
      fpx_sellerTxnTime: new FormControl(""),
      fpx_sellerOrderNo: new FormControl(""),
      fpx_sellerId: new FormControl(""),
      fpx_sellerBankCode: new FormControl(""),
      fpx_txnCurrency: new FormControl(""),
      fpx_txnAmount: new FormControl(""),
      fpx_buyerEmail: new FormControl(""),
      fpx_checkSum: new FormControl(""),
      fpx_buyerName: new FormControl(""),
      fpx_buyerBankId: new FormControl(""),
      fpx_buyerBankBranch: new FormControl(""),
      fpx_buyerAccNo: new FormControl(""),
      fpx_buyerId: new FormControl(""),
      fpx_makerName: new FormControl(""),
      fpx_buyerIban: new FormControl(""),
      fpx_debitAuthCode: new FormControl(""),
      fpx_debitAuthNo: new FormControl(""),
      fpx_creditAuthCode: new FormControl(""),
      fpx_creditAuthNo: new FormControl(""),
      fpx_xtrainfo: new FormControl(""),
      fpx_productDesc: new FormControl(""),
      fpx_version: new FormControl(""),
      fpx_eaccountNum: new FormControl(""),
      fpx_ebuyerId: new FormControl(""),
    });
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.fpxtransactionService.get().subscribe((res) => {
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
    if (process == "view") {
      this.fpxtransactionFormGroup.patchValue({
        ...row,
      });
    }
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
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
          this.fpxtransactionService.delete(row.id).subscribe(
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
}
