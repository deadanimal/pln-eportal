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

import { VirtualLibraryCollectionsService } from "src/app/shared/services/virtual-library-collections/virtual-library-collections.service";
import { VirtualLibrarySerialpublicationsService } from "src/app/shared/services/virtual-library-serialpublications/virtual-library-serialpublications.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-virtual-library-serialpublications-list",
  templateUrl: "./virtual-library-serialpublications-list.component.html",
  styleUrls: ["./virtual-library-serialpublications-list.component.scss"],
})
export class VirtualLibrarySerialpublicationsListComponent implements OnInit {
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
  virtuallibraryserialpublicationFormGroup: FormGroup;
  virtuallibraryserialpublicationPDFFormGroup: FormGroup;
  virtuallibraryserialpublicationImageFormGroup: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private virtuallibraryserialpublicationService: VirtualLibrarySerialpublicationsService,
    private virtuallibrarycollectionService: VirtualLibraryCollectionsService
  ) {
    this.virtuallibraryserialpublicationFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      title: new FormControl(""),
      description: new FormControl(""),
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

    this.virtuallibraryserialpublicationPDFFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      pdf_link: new FormControl(""),
    });

    this.virtuallibraryserialpublicationImageFormGroup = this.formBuilder.group(
      {
        id: new FormControl(""),
        image_link: new FormControl(""),
      }
    );

    this.virtual_library_collection_id = this.route.snapshot.paramMap.get(
      "serialpublication"
    );
    if (this.virtual_library_collection_id) {
      this.virtuallibraryserialpublicationFormGroup.patchValue({
        virtual_library_collection_id: this.virtual_library_collection_id,
      });
      this.getData();
    }
  }

  ngOnInit() {}

  getData() {
    this.virtuallibraryserialpublicationService
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

  openModal(modalRef: TemplateRef<any>, process: string, row) {
    if (process == "create") {
      this.virtuallibraryserialpublicationFormGroup.reset();
      if (this.virtual_library_collection_id) {
        this.virtuallibraryserialpublicationFormGroup.patchValue({
          virtual_library_collection_id: this.virtual_library_collection_id,
        });
      }
    } else if (process == "update") {
      this.virtuallibraryserialpublicationFormGroup.patchValue({
        ...row,
      });
    } else if (process == "uploadpdf") {
      this.virtuallibraryserialpublicationPDFFormGroup.patchValue({
        id: row.id,
      });
    } else if (process == "uploadimage") {
      this.virtuallibraryserialpublicationImageFormGroup.patchValue({
        id: row.id,
      });
    }
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
  }

  create() {
    this.virtuallibraryserialpublicationService
      .post(this.virtuallibraryserialpublicationFormGroup.value)
      .subscribe(
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
    this.virtuallibraryserialpublicationService
      .update(
        this.virtuallibraryserialpublicationFormGroup.value,
        this.virtuallibraryserialpublicationFormGroup.value.id
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
          this.virtuallibraryserialpublicationService.delete(row.id).subscribe(
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
        this.virtuallibraryserialpublicationPDFFormGroup
          .get("pdf_link")
          .setValue(file);
      else if (column == "image_link")
        this.virtuallibraryserialpublicationImageFormGroup
          .get("image_link")
          .setValue(file);
    }
  }

  uploadPDFProcess() {
    const formData = new FormData();
    formData.append(
      "pdf_link",
      this.virtuallibraryserialpublicationPDFFormGroup.get("pdf_link").value
    );
    formData.append(
      "id",
      this.virtuallibraryserialpublicationPDFFormGroup.value.id
    );

    this.virtuallibraryserialpublicationService
      .update(
        formData,
        this.virtuallibraryserialpublicationPDFFormGroup.value.id
      )
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
      this.virtuallibraryserialpublicationImageFormGroup.get("image_link").value
    );
    formData.append(
      "id",
      this.virtuallibraryserialpublicationImageFormGroup.value.id
    );

    this.virtuallibraryserialpublicationService
      .update(
        formData,
        this.virtuallibraryserialpublicationImageFormGroup.value.id
      )
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
