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

import { PublicationsService } from "src/app/shared/services/publications/publications.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-publications-list",
  templateUrl: "./publications-list.component.html",
  styleUrls: ["./publications-list.component.scss"],
})
export class PublicationsListComponent implements OnInit {
  // Data
  publication_category_id: string = "";

  // FormGroup
  publicationFormGroup: FormGroup;
  publicationPDFFormGroup: FormGroup;
  publicationPosterFormGroup: FormGroup;

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
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private publicationService: PublicationsService
  ) {
    this.publication_category_id = this.route.snapshot.paramMap.get(
      "publication_category_id"
    );

    this.getData();

    this.publicationFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      title_en: new FormControl(""),
      title_ms: new FormControl(""),
      description_en: new FormControl(""),
      description_ms: new FormControl(""),
      call_number: new FormControl(""),
      abstract_en: new FormControl(""),
      abstract_ms: new FormControl(""),
      author_name: new FormControl(""),
      editor_name: new FormControl(""),
      publisher_name: new FormControl(""),
      published_date: new FormControl(""),
      isbn: new FormControl(""),
      issn: new FormControl(""),
      poster_link: new FormControl(""),
      pdf_link: new FormControl(""),
      year: new FormControl(""),
      edition: new FormControl(""),
      publication_category_id: new FormControl(""),
      status: new FormControl(false),
    });

    this.publicationPDFFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      pdf_link: new FormControl(""),
      publication_category_id: new FormControl(""),
    });

    this.publicationPosterFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      poster_link: new FormControl(""),
      publication_category_id: new FormControl(""),
    });
  }

  ngOnInit() {}

  getData() {
    this.publicationService
      .filter("publication_category_id=" + this.publication_category_id)
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
        try { 
          if (
          d[key]
            .toString()
            .toLowerCase()
            .indexOf(val.toString().toLowerCase()) !== -1
        ) {
          return true;
        }
      }
      catch (err) {}
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
    this.publicationFormGroup.patchValue({
      id: "",
      title_en: "",
      title_ms: "",
      description_en: "",
      description_ms: "",
      call_number: "",
      abstract_en: "",
      abstract_ms: "",
      author_name: "",
      editor_name: "",
      publisher_name: "",
      published_date: "",
      isbn: "",
      issn: "",
      poster_link: "",
      pdf_link: "",
      year: 2020,
      edition: "",
      publication_category_id: "",
      status: false,
    });
  }

  openModal(modalRef: TemplateRef<any>, process: string, row) {
    if (process == "create") {
      // this.publicationFormGroup.reset();
      this.emptyFormGroup();
      this.publicationFormGroup.patchValue({
        publication_category_id: this.publication_category_id,
      });
    } else if (process == "update") {
      this.publicationFormGroup.patchValue({
        ...row,
        published_date: row.published_date != null ? row.published_date : "",
        poster_link: row.poster_link != null ? row.poster_link : "",
        pdf_link: row.pdf_link != null ? row.pdf_link : "",
        publication_category_id:
          row.publication_category_id != null
            ? row.publication_category_id
            : "",
      });
    } else if (process == "uploadpdf") {
      this.publicationFormGroup.patchValue({
        ...row,
      });
      this.publicationPDFFormGroup.patchValue({
        id: row.id,
      });
    } else if (process == "uploadposter") {
      this.publicationFormGroup.patchValue({
        ...row,
      });
      this.publicationPosterFormGroup.patchValue({
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
    formData.append("title_en", this.publicationFormGroup.value.title_en);
    formData.append("title_ms", this.publicationFormGroup.value.title_ms);
    formData.append(
      "description_en",
      this.publicationFormGroup.value.description_en
    );
    formData.append(
      "description_ms",
      this.publicationFormGroup.value.description_ms
    );
    formData.append("call_number", this.publicationFormGroup.value.call_number);
    formData.append("abstract_en", this.publicationFormGroup.value.abstract_en);
    formData.append("abstract_ms", this.publicationFormGroup.value.abstract_ms);
    formData.append("author_name", this.publicationFormGroup.value.author_name);
    formData.append("editor_name", this.publicationFormGroup.value.editor_name);
    formData.append(
      "publisher_name",
      this.publicationFormGroup.value.publisher_name
    );
    formData.append(
      "published_date",
      this.publicationFormGroup.value.published_date
    );
    formData.append("isbn", this.publicationFormGroup.value.isbn);
    formData.append("issn", this.publicationFormGroup.value.issn);
    if (typeof this.publicationFormGroup.get("poster_link").value != "string") {
      formData.append(
        "poster_link",
        this.publicationFormGroup.get("poster_link").value
      );
    }
    if (typeof this.publicationFormGroup.get("pdf_link").value != "string") {
      formData.append(
        "pdf_link",
        this.publicationFormGroup.get("pdf_link").value
      );
    }
    formData.append("year", this.publicationFormGroup.value.year);
    formData.append("edition", this.publicationFormGroup.value.edition);
    formData.append(
      "publication_category_id",
      this.publicationFormGroup.value.publication_category_id
    );
    formData.append("status", this.publicationFormGroup.value.status);

    this.publicationService.post(formData).subscribe(
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
    formData.append("title_en", this.publicationFormGroup.value.title_en);
    formData.append("title_ms", this.publicationFormGroup.value.title_ms);
    formData.append(
      "description_en",
      this.publicationFormGroup.value.description_en
    );
    formData.append(
      "description_ms",
      this.publicationFormGroup.value.description_ms
    );
    formData.append("call_number", this.publicationFormGroup.value.call_number);
    formData.append("abstract_en", this.publicationFormGroup.value.abstract_en);
    formData.append("abstract_ms", this.publicationFormGroup.value.abstract_ms);
    formData.append("author_name", this.publicationFormGroup.value.author_name);
    formData.append("editor_name", this.publicationFormGroup.value.editor_name);
    formData.append(
      "publisher_name",
      this.publicationFormGroup.value.publisher_name
    );
    formData.append(
      "published_date",
      this.publicationFormGroup.value.published_date
    );
    formData.append("isbn", this.publicationFormGroup.value.isbn);
    formData.append("issn", this.publicationFormGroup.value.issn);
    if (typeof this.publicationFormGroup.get("poster_link").value != "string") {
      formData.append(
        "poster_link",
        this.publicationFormGroup.get("poster_link").value
      );
    }
    if (typeof this.publicationFormGroup.get("pdf_link").value != "string") {
      formData.append(
        "pdf_link",
        this.publicationFormGroup.get("pdf_link").value
      );
    }
    formData.append("year", this.publicationFormGroup.value.year);
    formData.append("edition", this.publicationFormGroup.value.edition);
    formData.append(
      "publication_category_id",
      this.publicationFormGroup.value.publication_category_id
    );
    formData.append("status", this.publicationFormGroup.value.status);

    this.publicationService
      .update(formData, this.publicationFormGroup.value.id)
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
          this.publicationService.delete(row.id).subscribe(
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

  // Image Process
  onChange(event, column: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (column == "pdf_link")
        this.publicationPDFFormGroup.get("pdf_link").setValue(file);
      else if (column == "poster_link")
        this.publicationPosterFormGroup.get("poster_link").setValue(file);
    }
  }

  uploadPDFProcess() {
    const formData = new FormData();
    formData.append(
      "pdf_link",
      this.publicationPDFFormGroup.get("pdf_link").value
    );
    formData.append("id", this.publicationPDFFormGroup.value.id);

    this.publicationService
      .update(formData, this.publicationPDFFormGroup.value.id)
      .subscribe(
        (res) => {
          // console.log("res", res);
          swal
            .fire({
              title: "Berjaya",
              text: "Data anda berjaya dimuat-naik.",
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
              text: "Data anda tidak berjaya dimuat-naik. Sila cuba lagi",
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

  deletePDFProcess() {
    let body = {
      pdf_link: null,
    };
    this.publicationService
      .update(body, this.publicationFormGroup.value.id)
      .subscribe(
        (res) => {
          // console.log("res", res);
          swal.fire({
            title: "Proses Buang berjaya",
            text: "PDF anda berjaya dibuang.",
            icon: "success",
            buttonsStyling: false,
            customClass: {
              confirmButton: "btn btn-success",
            },
          });
        },
        (err) => {
          console.error("err", err);
          swal.fire({
            title: "Proses Buang tidak berjaya",
            text: "PDF anda tidak berjaya dibuang. Sila cuba lagi.",
            icon: "warning",
            buttonsStyling: false,
            customClass: {
              confirmButton: "btn btn-warning",
            },
          });
        },
        () => {
          this.modal.hide();
          this.getData();
        }
      );
  }

  uploadPosterProcess() {
    const formData = new FormData();
    formData.append(
      "poster_link",
      this.publicationPosterFormGroup.get("poster_link").value
    );
    formData.append("id", this.publicationPosterFormGroup.value.id);

    this.publicationService
      .update(formData, this.publicationPosterFormGroup.value.id)
      .subscribe(
        (res) => {
          // console.log("res", res);
          swal
            .fire({
              title: "Berjaya",
              text: "Data anda berjaya dimuat-naik.",
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
              text: "Data anda tidak berjaya dimuat-naik. Sila cuba lagi",
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

  deletePosterProcess() {
    let body = {
      poster_link: null,
    };
    this.publicationService
      .update(body, this.publicationFormGroup.value.id)
      .subscribe(
        (res) => {
          // console.log("res", res);
          swal.fire({
            title: "Proses Buang berjaya",
            text: "Poster anda berjaya dibuang.",
            icon: "success",
            buttonsStyling: false,
            customClass: {
              confirmButton: "btn btn-success",
            },
          });
        },
        (err) => {
          console.error("err", err);
          swal.fire({
            title: "Proses Buang tidak berjaya",
            text: "Poster anda tidak berjaya dibuang. Sila cuba lagi.",
            icon: "warning",
            buttonsStyling: false,
            customClass: {
              confirmButton: "btn btn-warning",
            },
          });
        },
        () => {
          this.modal.hide();
          this.getData();
        }
      );
  }
}
