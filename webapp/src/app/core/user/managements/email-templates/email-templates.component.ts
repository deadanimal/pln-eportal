import { Component, OnInit, TemplateRef } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import swal from "sweetalert2";

import { EmailTemplatesService } from "src/app/shared/services/email-templates/email-templates.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-email-templates",
  templateUrl: "./email-templates.component.html",
  styleUrls: ["./email-templates.component.scss"],
})
export class EmailTemplatesComponent implements OnInit {
  // Dropdown
  codes = [
    {
      value: "EMEL01",
      display_name: "Templat Maklum Balas - Diterima",
    },
    {
      value: "EMEL02",
      display_name: "Templat Maklum Balas - Dijawab",
    },
    {
      value: "EMEL03",
      display_name: "Templat Fasiliti - Tempahan Diproses",
    },
    {
      value: "EMEL04",
      display_name: "Templat Fasiliti - Tempahan Diterima",
    },
    {
      value: "EMEL05",
      display_name: "Templat Fasiliti - Tempahan Ditolak",
    },
    {
      value: "EMEL06",
      display_name: "Templat Program - Tempahan Diproses",
    },
    {
      value: "EMEL07",
      display_name: "Templat Program - Tempahan Diterima",
    },
    {
      value: "EMEL08",
      display_name: "Templat Program - Tempahan Ditolak",
    },
    {
      value: "EMEL09",
      display_name: "Templat Lawatan - Tempahan Diproses",
    },
    {
      value: "EMEL10",
      display_name: "Templat Lawatan - Tempahan Diterima",
    },
    {
      value: "EMEL11",
      display_name: "Templat Lawatan - Tempahan Ditolak",
    },
    {
      value: "EMEL12",
      display_name: "Templat Fasiliti - Proses Pembayaran",
    },
    {
      value: "EMEL99",
      display_name: "Tiada",
    },
  ];

  // FormGroup
  emailtemplateFormGroup: FormGroup;

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog modal-lg",
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
    private emailtemplateService: EmailTemplatesService
  ) {
    this.getData();

    this.emailtemplateFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      name: new FormControl(""),
      code: new FormControl(""),
      subject: new FormControl(""),
      body: new FormControl(""),
      status: new FormControl(false),
    });
  }

  ngOnInit() {}

  getData() {
    this.emailtemplateService.get().subscribe((res) => {
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
      this.emailtemplateFormGroup.reset();
    } else if (process == "update") {
      this.emailtemplateFormGroup.patchValue({
        ...row,
      });
    }
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
  }

  create() {
    this.emailtemplateService.post(this.emailtemplateFormGroup.value).subscribe(
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
    this.emailtemplateService
      .update(
        this.emailtemplateFormGroup.value,
        this.emailtemplateFormGroup.value.id
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
          this.emailtemplateService.delete(row.id).subscribe(
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

  getCode(value: string) {
    let result = this.codes.find((obj) => {
      return obj.value == value;
    });
    return result.display_name;
  }
}
