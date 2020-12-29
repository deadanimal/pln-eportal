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

import { ExhibitsService } from "src/app/shared/services/exhibits/exhibits.service";
import { ExhibitDetailsService } from "src/app/shared/services/exhibit-details/exhibit-details.service";
import { ExhibitDetailImagesService } from 'src/app/shared/services/exhibit-detail-images/exhibit-detail-images.service';
import { ExhibitListsService } from "src/app/shared/services/exhibit-lists/exhibit-lists.service";
import { VenuesService } from "src/app/shared/services/venues/venues.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-exhibits-list",
  templateUrl: "./exhibits-list.component.html",
  styleUrls: ["./exhibits-list.component.scss"],
})
export class ExhibitsListComponent implements OnInit {
  // Data
  exhibit_id: string = "";
  exhibits = [];
  exhibitdetailimages = [];

  // Dropdown
  statuses = [
    {
      value: "AV",
      display_name: "Aktif",
    },
    {
      value: "NA",
      display_name: "Tidak aktif",
    },
  ];
  venues = [];

  // FormGroup
  exhibitlistFormGroup: FormGroup;

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
    private route: ActivatedRoute,
    private exhibitService: ExhibitsService,
    private exhibitdetailService: ExhibitDetailsService,
    private exhibitdetailimagesService: ExhibitDetailImagesService,
    private exhibitlistService: ExhibitListsService,
    private venueService: VenuesService
  ) {
    this.getVenue();

    this.exhibit_id = this.route.snapshot.paramMap.get("id");
    if (this.exhibit_id) this.getExhibit();

    this.exhibitlistFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      name_en: new FormControl(""),
      name_ms: new FormControl(""),
      image_link: new FormControl(""),
      status: new FormControl(""),
      exhibit_id: new FormControl(""),
    });
  }

  getExhibit() {
    this.exhibitService.filter("id=" + this.exhibit_id).subscribe(
      (res) => {
        console.log("res", res);
        this.exhibits = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  getVenue() {
    this.venueService.get().subscribe(
      (res) => {
        console.log("res", res);
        this.venues = res;
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
    this.exhibitlistService.filter("exhibit_id=" + this.exhibit_id).subscribe(
      (res) => {
        console.log("res", res);
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

  openModal(modalRef: TemplateRef<any>, process: string, row) {
    if (process == "create") {
      this.exhibitlistFormGroup.reset();
      this.exhibitlistFormGroup.patchValue({
        exhibit_id: this.exhibit_id,
      });
    } else if (process == "update") {
      this.exhibitlistFormGroup.patchValue({
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
      this.exhibitlistFormGroup.get("image_link").setValue(file);
    }
  }

  create() {
    const formData = new FormData();
    formData.append(
      "image_link",
      this.exhibitlistFormGroup.get("image_link").value
    );
    formData.append("name_en", this.exhibitlistFormGroup.value.name_en);
    formData.append("name_ms", this.exhibitlistFormGroup.value.name_ms);
    formData.append("exhibit_id", this.exhibitlistFormGroup.value.exhibit_id);
    formData.append("status", this.exhibitlistFormGroup.value.status);

    this.exhibitlistService.post(formData).subscribe(
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
    if (typeof(this.exhibitlistFormGroup.get("image_link").value) != "string") {
      formData.append(
        "image_link",
        this.exhibitlistFormGroup.get("image_link").value
      );  
    }
    formData.append("name_en", this.exhibitlistFormGroup.value.name_en);
    formData.append("name_ms", this.exhibitlistFormGroup.value.name_ms);
    formData.append("id", this.exhibitlistFormGroup.value.id);
    formData.append("exhibit_id", this.exhibitlistFormGroup.value.exhibit_id);
    formData.append("status", this.exhibitlistFormGroup.value.status);

    this.exhibitlistService
      .update(formData, this.exhibitlistFormGroup.value.id)
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
          this.exhibitlistService.delete(row.id).subscribe(
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
}
