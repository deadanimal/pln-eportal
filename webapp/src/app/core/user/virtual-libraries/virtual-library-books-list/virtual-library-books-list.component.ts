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

import { VirtualLibraryBooksService } from "src/app/shared/services/virtual-library-books/virtual-library-books.service";
import { VirtualLibraryCollectionsService } from "src/app/shared/services/virtual-library-collections/virtual-library-collections.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-virtual-library-books-list",
  templateUrl: "./virtual-library-books-list.component.html",
  styleUrls: ["./virtual-library-books-list.component.scss"],
})
export class VirtualLibraryBooksListComponent implements OnInit {
  // Data
  virtual_library_collection_id: string = "";

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
  virtuallibrarybookFormGroup: FormGroup;
  virtuallibrarybookPDFFormGroup: FormGroup;
  virtuallibrarybookImageFormGroup: FormGroup;

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
    private route: ActivatedRoute,
    private virtuallibrarybookService: VirtualLibraryBooksService,
    private virtuallibrarycollectionService: VirtualLibraryCollectionsService
  ) {
    this.virtuallibrarybookFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      title_en: new FormControl(""),
      title_ms: new FormControl(""),
      description_en: new FormControl(""),
      description_ms: new FormControl(""),
      call_number: new FormControl(""),
      author: new FormControl(""),
      author_added: new FormControl(""),
      editor: new FormControl(""),
      isbn: new FormControl(""),
      issn: new FormControl(""),
      year: new FormControl(""),
      publisher_name: new FormControl(""),
      published_date: new FormControl(""),
      notes: new FormControl(""),
      status: new FormControl(""),
      image_link: new FormControl(""),
      pdf_link: new FormControl(""),
      virtual_library_collection_id: new FormControl(""),
    });

    this.virtuallibrarybookPDFFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      pdf_link: new FormControl(""),
    });

    this.virtuallibrarybookImageFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      image_link: new FormControl(""),
    });

    this.virtual_library_collection_id = this.route.snapshot.paramMap.get(
      "book"
    );
    if (this.virtual_library_collection_id) {
      this.virtuallibrarybookFormGroup.patchValue({
        virtual_library_collection_id: this.virtual_library_collection_id,
      });
      this.getData();
    }
  }

  ngOnInit() {}

  getData() {
    this.virtuallibrarybookService
      .filter(
        "virtual_library_collection_id=" + this.virtual_library_collection_id
      )
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
    this.virtuallibrarybookFormGroup.patchValue({
      title_en: "",
      title_ms: "",
      description_en: "",
      description_ms: "",
      call_number: "",
      author: "",
      author_added: "",
      editor: "",
      isbn: "",
      issn: "",
      year: "",
      publisher_name: "",
      published_date: "",
      notes: "",
      status: "IAC",
      image_link: "",
      pdf_link: "",
    });
  }

  openModal(modalRef: TemplateRef<any>, process: string, row) {
    if (process == "create") {
      // this.virtuallibrarybookFormGroup.reset();
      this.emptyFormGroup();
      if (this.virtual_library_collection_id) {
        this.virtuallibrarybookFormGroup.patchValue({
          virtual_library_collection_id: this.virtual_library_collection_id,
        });
      }
    } else if (process == "update") {
      this.virtuallibrarybookFormGroup.patchValue({
        ...row,
        published_date: row.published_date != null ? row.published_date : "",
        image_link: row.image_link != null ? row.image_link : "",
        pdf_link: row.pdf_link != null ? row.pdf_link : "",
      });
    } else if (process == "uploadpdf") {
      this.virtuallibrarybookPDFFormGroup.patchValue({
        id: row.id,
      });
    } else if (process == "uploadimage") {
      this.virtuallibrarybookImageFormGroup.patchValue({
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
    formData.append("title_en", this.virtuallibrarybookFormGroup.value.title_en);
    formData.append("title_ms", this.virtuallibrarybookFormGroup.value.title_ms);
    formData.append(
      "description_en",
      this.virtuallibrarybookFormGroup.value.description_en
    );
    formData.append(
      "description_ms",
      this.virtuallibrarybookFormGroup.value.description_ms
    );
    formData.append(
      "call_number",
      this.virtuallibrarybookFormGroup.value.call_number
    );
    formData.append("author", this.virtuallibrarybookFormGroup.value.author);
    formData.append(
      "author_added",
      this.virtuallibrarybookFormGroup.value.author_added
    );
    formData.append("editor", this.virtuallibrarybookFormGroup.value.editor);
    formData.append("isbn", this.virtuallibrarybookFormGroup.value.isbn);
    formData.append("issn", this.virtuallibrarybookFormGroup.value.issn);
    formData.append("year", this.virtuallibrarybookFormGroup.value.year);
    formData.append(
      "publisher_name",
      this.virtuallibrarybookFormGroup.value.publisher_name
    );
    formData.append(
      "published_date",
      this.virtuallibrarybookFormGroup.value.published_date
    );
    formData.append("notes", this.virtuallibrarybookFormGroup.value.notes);
    formData.append("status", this.virtuallibrarybookFormGroup.value.status);
    if (
      typeof this.virtuallibrarybookFormGroup.get("image_link").value !=
      "string"
    ) {
      formData.append(
        "image_link",
        this.virtuallibrarybookFormGroup.get("image_link").value
      );
    }
    if (
      typeof this.virtuallibrarybookFormGroup.get("pdf_link").value != "string"
    ) {
      formData.append(
        "pdf_link",
        this.virtuallibrarybookFormGroup.get("pdf_link").value
      );
    }
    formData.append(
      "virtual_library_collection_id",
      this.virtuallibrarybookFormGroup.value.virtual_library_collection_id
    );

    this.virtuallibrarybookService.post(formData).subscribe(
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
    formData.append("title_en", this.virtuallibrarybookFormGroup.value.title_en);
    formData.append("title_ms", this.virtuallibrarybookFormGroup.value.title_ms);
    formData.append(
      "description_en",
      this.virtuallibrarybookFormGroup.value.description_en
    );
    formData.append(
      "description_ms",
      this.virtuallibrarybookFormGroup.value.description_ms
    );
    formData.append(
      "call_number",
      this.virtuallibrarybookFormGroup.value.call_number
    );
    formData.append("author", this.virtuallibrarybookFormGroup.value.author);
    formData.append(
      "author_added",
      this.virtuallibrarybookFormGroup.value.author_added
    );
    formData.append("editor", this.virtuallibrarybookFormGroup.value.editor);
    formData.append("isbn", this.virtuallibrarybookFormGroup.value.isbn);
    formData.append("issn", this.virtuallibrarybookFormGroup.value.issn);
    formData.append("year", this.virtuallibrarybookFormGroup.value.year);
    formData.append(
      "publisher_name",
      this.virtuallibrarybookFormGroup.value.publisher_name
    );
    formData.append(
      "published_date",
      this.virtuallibrarybookFormGroup.value.published_date
    );
    formData.append("notes", this.virtuallibrarybookFormGroup.value.notes);
    formData.append("status", this.virtuallibrarybookFormGroup.value.status);
    if (
      typeof this.virtuallibrarybookFormGroup.get("image_link").value !=
      "string"
    ) {
      formData.append(
        "image_link",
        this.virtuallibrarybookFormGroup.get("image_link").value
      );
    }
    if (
      typeof this.virtuallibrarybookFormGroup.get("pdf_link").value != "string"
    ) {
      formData.append(
        "pdf_link",
        this.virtuallibrarybookFormGroup.get("pdf_link").value
      );
    }
    formData.append(
      "virtual_library_collection_id",
      this.virtuallibrarybookFormGroup.value.virtual_library_collection_id
    );

    this.virtuallibrarybookService
      .update(formData, this.virtuallibrarybookFormGroup.value.id)
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
          this.virtuallibrarybookService.delete(row.id).subscribe(
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
  onChange(event, column: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (column == "pdf_link")
        this.virtuallibrarybookPDFFormGroup.get("pdf_link").setValue(file);
      else if (column == "image_link")
        this.virtuallibrarybookImageFormGroup.get("image_link").setValue(file);
    }
  }

  uploadPDFProcess() {
    const formData = new FormData();
    formData.append(
      "pdf_link",
      this.virtuallibrarybookPDFFormGroup.get("pdf_link").value
    );
    formData.append("id", this.virtuallibrarybookPDFFormGroup.value.id);

    this.virtuallibrarybookService
      .update(formData, this.virtuallibrarybookPDFFormGroup.value.id)
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

  uploadImageProcess() {
    const formData = new FormData();
    formData.append(
      "image_link",
      this.virtuallibrarybookImageFormGroup.get("image_link").value
    );
    formData.append("id", this.virtuallibrarybookImageFormGroup.value.id);

    this.virtuallibrarybookService
      .update(formData, this.virtuallibrarybookImageFormGroup.value.id)
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
