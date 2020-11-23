import { Component, OnInit, TemplateRef } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import swal from "sweetalert2";

import { FacilitySubcategoriesService } from "src/app/shared/services/facility-subcategories/facility-subcategories.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-facilities-subcategory",
  templateUrl: "./facilities-subcategory.component.html",
  styleUrls: ["./facilities-subcategory.component.scss"],
})
export class FacilitiesSubcategoryComponent implements OnInit {
  // Dropdown
  facilitycategories = [
    {
      value: "TA",
      display_name: "Teater Angkasa",
    },
    {
      value: "GP",
      display_name: "Galeri Pameran",
    },
    {
      value: "TT",
      display_name: "Bilik Orion",
    },
    {
      value: "BC",
      display_name: "Bilik Centaurus",
    },
    {
      value: "KR",
      display_name: "Kawasan Rekreasi",
    },
    {
      value: "SM",
      display_name: "Stesen Mikrosatelit",
    },
    {
      value: "NA",
      display_name: "Tiada",
    },
  ];

  // FormGroup
  subcategoryFormGroup: FormGroup;

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
    private modalService: BsModalService,
    private facilitysubcategoryService: FacilitySubcategoriesService
  ) {
    this.getData();

    this.subcategoryFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      name: new FormControl(""),
      code: new FormControl(""),
      status: new FormControl(false),
      image_link: new FormControl(""),
      facility_category: new FormControl(""),
    });
  }

  ngOnInit() {}

  getData() {
    this.facilitysubcategoryService.get().subscribe((res) => {
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
    this.subcategoryFormGroup.patchValue({
      id: "",
      code: "",
      name: "",
      status: false,
      image_link: "",
      facility_category: "",
    });
  }

  openModal(modalRef: TemplateRef<any>, process: string, row) {
    if (process == "create") {
      // this.facilityFormGroup.reset();
      this.emptyFormGroup();
    } else if (process == "update") {
      this.subcategoryFormGroup.patchValue({
        ...row,
        image_link: row.image_link ? row.image_link : "",
      });
    }
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
  }

  create() {
    const formData = new FormData();
    formData.append("code", this.subcategoryFormGroup.value.code);
    formData.append("name", this.subcategoryFormGroup.value.name);
    formData.append("status", this.subcategoryFormGroup.value.status);
    formData.append(
      "facility_subcategory",
      this.subcategoryFormGroup.value.facility_subcategory
    );
    if (typeof this.subcategoryFormGroup.get("image_link").value != "string") {
      formData.append(
        "image_link",
        this.subcategoryFormGroup.get("image_link").value
      );
    }

    this.facilitysubcategoryService.post(formData).subscribe(
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
    formData.append("code", this.subcategoryFormGroup.value.code);
    formData.append("name", this.subcategoryFormGroup.value.name);
    formData.append("status", this.subcategoryFormGroup.value.status);
    formData.append(
      "facility_subcategory",
      this.subcategoryFormGroup.value.facility_subcategory
    );
    if (typeof this.subcategoryFormGroup.get("image_link").value != "string") {
      formData.append(
        "image_link",
        this.subcategoryFormGroup.get("image_link").value
      );
    }

    this.facilitysubcategoryService
      .update(formData, this.subcategoryFormGroup.value.id)
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
          this.facilitysubcategoryService.delete(row.id).subscribe(
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
      this.subcategoryFormGroup.get("image_link").setValue(file);
    }
  }
}
