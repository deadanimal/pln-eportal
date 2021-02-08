import { Component, OnInit, TemplateRef } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import swal from "sweetalert2";

import { VirtualLibraryArticlesService } from "src/app/shared/services/virtual-library-articles/virtual-library-articles.service";
import { VirtualLibraryCategoriesService } from "src/app/shared/services/virtual-library-categories/virtual-library-categories.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-virtual-library-articles-list",
  templateUrl: "./virtual-library-articles-list.component.html",
  styleUrls: ["./virtual-library-articles-list.component.scss"],
})
export class VirtualLibraryArticlesListComponent implements OnInit {
  // Data
  categories = [];

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
  virtuallibraryarticleFormGroup: FormGroup;
  virtuallibraryarticlePDFFormGroup: FormGroup;

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

  constructor(
    public formBuilder: FormBuilder,
    private modalService: BsModalService,
    private virtuallibraryarticleService: VirtualLibraryArticlesService,
    private virtuallibrarycategoryService: VirtualLibraryCategoriesService
  ) {
    this.virtuallibraryarticleFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      name_en: new FormControl(""),
      name_ms: new FormControl(""),
      description_en: new FormControl(""),
      description_ms: new FormControl(""),
      date: new FormControl(""),
      status: new FormControl(false),
      pdf_link: new FormControl(""),
      virtual_library_article_category_id: new FormControl(""),
    });

    this.virtuallibraryarticlePDFFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      pdf_link: new FormControl(""),
      virtual_library_article_category_id: new FormControl(""),
    });

    this.virtuallibrarycategoryService.filter("link=artikel-terkini").subscribe(
      (res) => {
        console.log("res", res);
        this.categories = res;
        if (this.categories) {
          this.virtuallibraryarticleFormGroup.patchValue({
            virtual_library_article_category_id: this.categories[0].id,
          });
        }
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.virtuallibraryarticleService.get().subscribe((res) => {
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
    this.virtuallibraryarticleFormGroup.patchValue({
      name_en: "",
      name_ms: "",
      description_en: "",
      description_ms: "",
      date: "",
      status: false,
      pdf_link: "",
      virtual_library_article_category_id: "",
    });
  }

  openModal(modalRef: TemplateRef<any>, process: string, row) {
    if (process == "create") {
      // this.virtuallibraryarticleFormGroup.reset();
      this.emptyFormGroup();
      if (this.categories) {
        this.virtuallibraryarticleFormGroup.patchValue({
          virtual_library_article_category_id: this.categories[0].id,
        });
      }
    } else if (process == "update") {
      this.virtuallibraryarticleFormGroup.patchValue({
        ...row,
        pdf_link: row.pdf_link != null ? row.pdf_link : "",
      });
    } else if (process == "uploadpdf") {
      this.virtuallibraryarticlePDFFormGroup.patchValue({
        id: row.id,
      });
    }
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
  }

  create() {
    const formData = new FormData();
    formData.append(
      "name_en",
      this.virtuallibraryarticleFormGroup.value.name_en
    );
    formData.append(
      "name_ms",
      this.virtuallibraryarticleFormGroup.value.name_ms
    );
    formData.append(
      "description_en",
      this.virtuallibraryarticleFormGroup.value.description_en
    );
    formData.append(
      "description_ms",
      this.virtuallibraryarticleFormGroup.value.description_ms
    );
    formData.append("date", this.virtuallibraryarticleFormGroup.value.date);
    formData.append("status", this.virtuallibraryarticleFormGroup.value.status);
    if (
      typeof this.virtuallibraryarticleFormGroup.get("pdf_link").value !=
      "string"
    ) {
      formData.append(
        "pdf_link",
        this.virtuallibraryarticleFormGroup.get("pdf_link").value
      );
    }
    formData.append(
      "virtual_library_article_category_id",
      this.virtuallibraryarticleFormGroup.value
        .virtual_library_article_category_id
    );

    this.virtuallibraryarticleService.post(formData).subscribe(
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
    const formData = new FormData();
    formData.append(
      "name_en",
      this.virtuallibraryarticleFormGroup.value.name_en
    );
    formData.append(
      "name_ms",
      this.virtuallibraryarticleFormGroup.value.name_ms
    );
    formData.append(
      "description_en",
      this.virtuallibraryarticleFormGroup.value.description_en
    );
    formData.append(
      "description_ms",
      this.virtuallibraryarticleFormGroup.value.description_ms
    );
    formData.append("date", this.virtuallibraryarticleFormGroup.value.date);
    formData.append("status", this.virtuallibraryarticleFormGroup.value.status);
    if (
      typeof this.virtuallibraryarticleFormGroup.get("pdf_link").value !=
      "string"
    ) {
      formData.append(
        "pdf_link",
        this.virtuallibraryarticleFormGroup.get("pdf_link").value
      );
    }
    formData.append(
      "virtual_library_article_category_id",
      this.virtuallibraryarticleFormGroup.value
        .virtual_library_article_category_id
    );

    this.virtuallibraryarticleService
      .update(formData, this.virtuallibraryarticleFormGroup.value.id)
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
          this.virtuallibraryarticleService.delete(row.id).subscribe(
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

  // Image Process
  onChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.virtuallibraryarticlePDFFormGroup.get("pdf_link").setValue(file);
    }
  }

  uploadPDFProcess() {
    const formData = new FormData();
    formData.append(
      "pdf_link",
      this.virtuallibraryarticlePDFFormGroup.get("pdf_link").value
    );
    formData.append("id", this.virtuallibraryarticlePDFFormGroup.value.id);

    this.virtuallibraryarticleService
      .update(formData, this.virtuallibraryarticlePDFFormGroup.value.id)
      .subscribe(
        (res) => {
          console.log("res", res);
          swal
            .fire({
              title: "Berjaya",
              text: "Data anda berjaya dimuat-naik.",
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
              text: "Data anda tidak berjaya dimuat-naik. Sila cuba lagi",
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
}
