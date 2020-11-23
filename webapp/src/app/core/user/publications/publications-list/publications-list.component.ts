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
      title: new FormControl(""),
      description: new FormControl(""),
      call_number: new FormControl(""),
      abstract: new FormControl(""),
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
      status: new FormControl(false)
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
    console.log("getData", this.publication_category_id);
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
      this.publicationFormGroup.reset();
      this.publicationFormGroup.patchValue({
        publication_category_id: this.publication_category_id,
      });
    } else if (process == "update") {
      this.publicationFormGroup.patchValue({
        ...row,
        publication_category_id: row.publication_category_id
          ? row.publication_category_id.id
          : null,
      });
    } else if (process == "uploadpdf") {
      this.publicationPDFFormGroup.patchValue({
        id: row.id,
      });
    } else if (process == "uploadposter") {
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
    this.publicationService.post(this.publicationFormGroup.value).subscribe(
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
    this.publicationService
      .update(
        this.publicationFormGroup.value,
        this.publicationFormGroup.value.id
      )
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
          this.publicationService.delete(row.id).subscribe(
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
