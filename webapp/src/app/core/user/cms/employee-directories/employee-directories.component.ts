import { Component, OnInit, TemplateRef } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import swal from "sweetalert2";

import { EmployeeDirectoriesService } from "src/app/shared/services/employee-directories/employee-directories.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-employee-directories",
  templateUrl: "./employee-directories.component.html",
  styleUrls: ["./employee-directories.component.scss"],
})
export class EmployeeDirectoriesComponent implements OnInit {
  // Data

  // Dropdown
  departments = [
    {
      value: "PPP",
      display_name: "Pejabat Pengarah Planetarium Negara",
    },
    {
      value: "UPA",
      display_name: "Unit Perhubungan Awam",
    },
    {
      value: "SPP",
      display_name: "Seksyen Pendidikan - Pameran",
    },
    {
      value: "SPC",
      display_name: "Seksyen Pendidikan - Pencerapan",
    },
    {
      value: "SPB",
      display_name: "Seksyen Pendidikan - Pembudayaan",
    },
    {
      value: "UTK",
      display_name: "Unit Teknikal",
    },
    {
      value: "SPK",
      display_name: "Seksyen Perkhidmatan",
    },
    {
      value: "UKW",
      display_name: "Unit Kewangan",
    },
    {
      value: "UTM",
      display_name: "Unit Teknologi Maklumat",
    },
    {
      value: "UPF",
      display_name: "Unit Pengurusan Fasiliti",
    },
    {
      value: "UPT",
      display_name: "Unit Pentadbiran",
    },
    {
      value: "NAV",
      display_name: "Tiada",
    },
  ];

  // FormGroup
  employeedirectoryFormGroup: FormGroup;

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
    private employeedirectoryService: EmployeeDirectoriesService
  ) {
    this.getData();

    this.employeedirectoryFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      name: new FormControl(""),
      position: new FormControl(""),
      extension: new FormControl(""),
      email: new FormControl(""),
      department: new FormControl(""),
      status: new FormControl(false),
    });
  }

  ngOnInit() {}

  getData() {
    this.employeedirectoryService.get().subscribe((res) => {
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
      this.employeedirectoryFormGroup.reset();
    } else if (process == "update") {
      this.employeedirectoryFormGroup.patchValue({
        ...row,
      });
    }
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
  }

  create() {
    this.employeedirectoryService
      .post(this.employeedirectoryFormGroup.value)
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
    this.employeedirectoryService
      .update(
        this.employeedirectoryFormGroup.value,
        this.employeedirectoryFormGroup.value.id
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
          this.employeedirectoryService.delete(row.id).subscribe(
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

  getDepartment(value: string) {
    let result = this.departments.find((obj) => {
      return obj.value == value;
    });
    return result.display_name;
  }
}
