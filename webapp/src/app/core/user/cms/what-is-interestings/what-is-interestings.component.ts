import { Component, OnInit, TemplateRef } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import swal from "sweetalert2";

import { WhatisinterestingsService } from "src/app/shared/services/whatisinterestings/whatisinterestings.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-what-is-interestings",
  templateUrl: "./what-is-interestings.component.html",
  styleUrls: ["./what-is-interestings.component.scss"],
})
export class WhatIsInterestingsComponent implements OnInit {
  // Data

  // Dropdown

  // FormGroup
  whatisinterestingFormGroup: FormGroup;

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog",
    ignoreBackdropClick: true,
  };

  // Quill
  modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ["clean"], // remove formatting button

      ["link"], // link and image, video
    ],
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
    private whatisinterestingService: WhatisinterestingsService
  ) {
    this.getData();

    this.whatisinterestingFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      title_en: new FormControl(""),
      description_en: new FormControl(""),
      title_ms: new FormControl(""),
      description_ms: new FormControl(""),
      image_link: new FormControl(""),
      status: new FormControl(false),
    });
  }

  ngOnInit() {}

  getData() {
    this.whatisinterestingService.get().subscribe(
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
    this.whatisinterestingFormGroup.patchValue({
      id: "",
      title: "",
      description: "",
      image_link: "",
      status: false,
    });
  }

  openModal(modalRef: TemplateRef<any>, process: string, row) {
    if (process == "create") {
      // this.whatisinterestingFormGroup.reset();
      this.emptyFormGroup();
    } else if (process == "update") {
      this.whatisinterestingFormGroup.patchValue({
        ...row,
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
      this.whatisinterestingFormGroup.get("image_link").setValue(file);
    }
  }

  create() {
    const formData = new FormData();
    formData.append(
      "image_link",
      this.whatisinterestingFormGroup.get("image_link").value
    );
    formData.append("title_en", this.whatisinterestingFormGroup.value.title_en);
    formData.append(
      "description_en",
      this.whatisinterestingFormGroup.value.description_en
    );
    formData.append("title_ms", this.whatisinterestingFormGroup.value.title_ms);
    formData.append(
      "description_ms",
      this.whatisinterestingFormGroup.value.description_ms
    );
    formData.append("status", this.whatisinterestingFormGroup.value.status);

    this.whatisinterestingService.post(formData).subscribe(
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
    if (
      typeof this.whatisinterestingFormGroup.get("image_link").value != "string"
    ) {
      formData.append(
        "image_link",
        this.whatisinterestingFormGroup.get("image_link").value
      );
    }
    formData.append("id", this.whatisinterestingFormGroup.value.id);
    formData.append("title_en", this.whatisinterestingFormGroup.value.title_en);
    formData.append(
      "description_en",
      this.whatisinterestingFormGroup.value.description_en
    );
    formData.append("title_ms", this.whatisinterestingFormGroup.value.title_ms);
    formData.append(
      "description_ms",
      this.whatisinterestingFormGroup.value.description_ms
    );
    formData.append("status", this.whatisinterestingFormGroup.value.status);

    this.whatisinterestingService
      .update(formData, this.whatisinterestingFormGroup.value.id)
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
          this.whatisinterestingService.delete(row.id).subscribe(
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
