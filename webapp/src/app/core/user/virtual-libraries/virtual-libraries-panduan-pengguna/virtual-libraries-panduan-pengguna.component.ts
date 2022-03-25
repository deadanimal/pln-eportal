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

import { VirtualLibraryPanduanPenggunaService } from "src/app/shared/services/virtual-library-panduan-pengguna/virtual-library-panduan-pengguna.service";
import { VirtualLibraryPanduanPengguna } from "src/app/shared/services/virtual-library-panduan-pengguna/virtual-library-panduan-pengguna.model";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: 'app-virtual-libraries-panduan-pengguna',
  templateUrl: './virtual-libraries-panduan-pengguna.component.html',
  styleUrls: ['./virtual-libraries-panduan-pengguna.component.scss']
})
export class VirtualLibrariesPanduanPenggunaComponent implements OnInit {

  //Panduan Pengguna
  panduans: VirtualLibraryPanduanPengguna[] = [];

   // FormGroup
   panduanFormGroup: FormGroup;

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
    ignoreBackdropClick: true,
  };


  constructor(
    private panduanService: VirtualLibraryPanduanPenggunaService,
    public formBuilder: FormBuilder,
    private modalService: BsModalService,


  ) { 
    this.panduanFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      tajuk_dokumen: new FormControl(""),
      pdf_link: new FormControl(""),
      status: new FormControl(false),
    });
  }

  ngOnInit() {
    this.getPanduanPengguna();
  }

  getPanduanPengguna() {
    this.panduanService.get().subscribe(
      (res) => {
        this.tableRows = res;
        this.tableTemp = this.tableRows.map((prop, key) => {
          return {
            ...prop,
            no: key,
          };
        });
      }
    )
  }
  emptyFormGroup() {
    this.panduanFormGroup.patchValue({
      id: "",
      tajuk_dokumen: "",
      pdf_link: "",
      status: false,
    });
  }

  openModal(modalRef: TemplateRef<any>, process: string, row) {
    if (process == "create") {
      // this.bannerFormGroup.reset();
      this.emptyFormGroup();
    } else if (process == "update") {
      this.panduanFormGroup.patchValue({
        ...row,
      });
    }
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
  }

  onChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.panduanFormGroup.get("pdf_link").setValue(file);
    }
  }

  create() {
    const formData = new FormData();
    formData.append("pdf_link", this.panduanFormGroup.get("pdf_link").value);
    formData.append("tajuk_dokumen", this.panduanFormGroup.value.tajuk_dokumen);
    formData.append("status", this.panduanFormGroup.value.status);

    this.panduanService.post(formData).subscribe(
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
              this.getPanduanPengguna();
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
    if (typeof this.panduanFormGroup.get("pdf_link").value != "string") {
      formData.append(
        "pdf_link",
        this.panduanFormGroup.get("pdf_link").value
      );
    }

    if (typeof(this.panduanFormGroup.get("pdf_link").value) == "string") {
      this.panduanFormGroup.patchValue({pdf_link: null})
      formData.append("tajuk_dokumen", this.panduanFormGroup.value.tajuk_dokumen);
      formData.append("status", this.panduanFormGroup.value.status);
    }

    else { 
      formData.append("tajuk_dokumen", this.panduanFormGroup.value.tajuk_dokumen);
      formData.append("status", this.panduanFormGroup.value.status);
    }


    this.panduanService
      .update(formData, this.panduanFormGroup.value.id)
      .subscribe(
        (res) => {
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
                this.getPanduanPengguna();
              }
            });
        },
        (err) => {
          console.error("err", err);
          swal
            .fire({
              title: "Ralat",
              text: "Data anda tidak berjaya dikemaskini. Sila cuba lagi. Pastikan ruangan fail di isi",
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
          this.panduanService.delete(row.id).subscribe(
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
              this.getPanduanPengguna();
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
}
