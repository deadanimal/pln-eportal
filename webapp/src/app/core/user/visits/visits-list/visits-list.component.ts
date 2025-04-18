import { Component, OnInit, TemplateRef } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import swal from "sweetalert2";

import { VisitsService } from "src/app/shared/services/visits/visits.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-visits-list",
  templateUrl: "./visits-list.component.html",
  styleUrls: ["./visits-list.component.scss"],
})
export class VisitsListComponent implements OnInit {
  // FormGroup
  visitFormGroup: FormGroup;

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
    private visitService: VisitsService
  ) {
    this.getData();

    this.visitFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      title: new FormControl(""),
      description: new FormControl(""),
      status: new FormControl(false),
      image_link: new FormControl(""),
    });
  }

  ngOnInit() {}

  getData() {
    this.visitService.get().subscribe((res) => {
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
    this.visitFormGroup.patchValue({
      title: "",
      description: "",
      status: false,
      image_link: "",
    });
  }

  openModal(modalRef: TemplateRef<any>, process: string, row) {
    if (process == "create") {
      // this.visitFormGroup.reset();
      this.emptyFormGroup();
    } else if (process == "update") {
      this.visitFormGroup.patchValue({
        ...row,
        image_link: row.image_link != "" ? row.image_link : "",
      });
    }
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
  }

  // Image Process
  onChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.visitFormGroup.get("image_link").setValue(file);
    }
  }

  create() {
    const formData = new FormData();
    formData.append("title", this.visitFormGroup.value.title);
    formData.append("description", this.visitFormGroup.value.description);
    formData.append("status", this.visitFormGroup.value.status);
    if (typeof this.visitFormGroup.get("image_link").value != "string") {
      formData.append(
        "image_link",
        this.visitFormGroup.get("image_link").value
      );
    }

    this.visitService.post(formData).subscribe(
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
    const formData = new FormData();
    formData.append("title", this.visitFormGroup.value.title);
    formData.append("description", this.visitFormGroup.value.description);
    formData.append("status", this.visitFormGroup.value.status);
    if (typeof this.visitFormGroup.get("image_link").value != "string") {
      formData.append(
        "image_link",
        this.visitFormGroup.get("image_link").value
      );
    }

    this.visitService.update(formData, this.visitFormGroup.value.id).subscribe(
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
          this.visitService.delete(row.id).subscribe(
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
