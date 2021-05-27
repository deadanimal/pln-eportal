import { Component, OnInit, TemplateRef } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import swal from "sweetalert2";

import { BannersService } from "src/app/shared/services/banners/banners.service";
import { EducationalProgramsService } from "src/app/shared/services/educational-programs/educational-programs.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-banners",
  templateUrl: "./banners.component.html",
  styleUrls: ["./banners.component.scss"],
})
export class BannersComponent implements OnInit {
  // Data
  programs = [];

  // Dropdown

  // FormGroup
  bannerFormGroup: FormGroup;

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
    private route: ActivatedRoute,
    private bannerService: BannersService,
    private educationalprogramService: EducationalProgramsService
  ) {
    this.getData();
    this.getProgram();

    this.bannerFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      title: new FormControl(""),
      description: new FormControl(""),
      image_link: new FormControl(""),
      status: new FormControl(false),
      program_id: new FormControl(""),
    });
  }

  getProgram() {
    this.educationalprogramService.filter("status=AV").subscribe(
      (res) => {
        // console.log("res", res);
        this.programs = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  ngOnInit() {}

  getData() {
    this.bannerService.extended().subscribe(
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
    this.bannerFormGroup.patchValue({
      id: "",
      title: "",
      description: "",
      image_link: "",
      status: false,
      program_id: "",
    });
  }

  openModal(modalRef: TemplateRef<any>, process: string, row) {
    if (process == "create") {
      // this.bannerFormGroup.reset();
      this.emptyFormGroup();
    } else if (process == "update") {
      this.bannerFormGroup.patchValue({
        ...row,
        program_id: row.program_id ? row.program_id.id : "",
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
      this.bannerFormGroup.get("image_link").setValue(file);
    }
  }

  create() {
    const formData = new FormData();
    formData.append("image_link", this.bannerFormGroup.get("image_link").value);
    formData.append("title", this.bannerFormGroup.value.title);
    formData.append("description", this.bannerFormGroup.value.description);
    formData.append("program_id", this.bannerFormGroup.value.program_id);
    formData.append("status", this.bannerFormGroup.value.status);

    this.bannerService.post(formData).subscribe(
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
    if (typeof this.bannerFormGroup.get("image_link").value != "string") {
      formData.append(
        "image_link",
        this.bannerFormGroup.get("image_link").value
      );
    }
    formData.append("id", this.bannerFormGroup.value.id);
    formData.append("title", this.bannerFormGroup.value.title);
    formData.append("description", this.bannerFormGroup.value.description);
    formData.append("program_id", this.bannerFormGroup.value.program_id);
    formData.append("status", this.bannerFormGroup.value.status);

    this.bannerService
      .update(formData, this.bannerFormGroup.value.id)
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
          this.bannerService.delete(row.id).subscribe(
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
