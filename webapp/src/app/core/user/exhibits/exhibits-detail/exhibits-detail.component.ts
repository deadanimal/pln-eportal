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

import { ExhibitDetailsService } from "src/app/shared/services/exhibit-details/exhibit-details.service";
import { ExhibitDetailImagesService } from "src/app/shared/services/exhibit-detail-images/exhibit-detail-images.service";
import { VenuesService } from "src/app/shared/services/venues/venues.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-exhibits-detail",
  templateUrl: "./exhibits-detail.component.html",
  styleUrls: ["./exhibits-detail.component.scss"],
})
export class ExhibitsDetailComponent implements OnInit {
  // Data
  exhibit_list_id: string = "";
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
  exhibitdetailFormGroup: FormGroup;
  exhibitdetailimageFormGroup: FormGroup;

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog-centered",
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
    private exhibitdetailService: ExhibitDetailsService,
    private exhibitdetailimagesService: ExhibitDetailImagesService,
    private venueService: VenuesService
  ) {
    this.getVenue();

    this.exhibit_list_id = this.route.snapshot.paramMap.get("id");
    if (this.exhibit_list_id) this.getExhibitDetail();

    this.exhibitdetailFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      name: new FormControl(""),
      description: new FormControl(""),
      video_link: new FormControl(null),
      venue_id: new FormControl(""),
      // qrcode: new FormControl(""),
      status: new FormControl(""),
      exhibit_list_id: new FormControl(""),
    });

    this.exhibitdetailimageFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      exhibit_detail_image: new FormControl(""),
      exhibit_detail_id: new FormControl(""),
    });
  }

  getExhibitDetail() {
    this.exhibitdetailService
      .filter("exhibit_list_id=" + this.exhibit_list_id)
      .subscribe(
        (res) => {
          console.log("res", res);
          if (res.length > 0) {
            this.exhibitdetailFormGroup.patchValue({
              ...res[0],
            });

            this.getExhibitDetailImage(this.exhibitdetailFormGroup.value.id);
          } else {
            this.exhibitdetailFormGroup.patchValue({
              exhibit_list_id: this.exhibit_list_id,
            });
          }
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

  getExhibitDetailImage(exhibit_detail_id) {
    this.exhibitdetailimagesService
      .filter("exhibit_detail_id=" + exhibit_detail_id)
      .subscribe(
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

  ngOnInit() {}

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
      console.log("openModal : create :", this.exhibitdetailFormGroup.value);
      // this.exhibitdetailimageFormGroup.patchValue({
      //   exhibit_detail_id: this.exhibitdetailFormGroup.value.id
      // });
    } else if (process == "update") {
      this.exhibitdetailimageFormGroup.patchValue({
        ...row,
      });
    }
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
  }

  createupdate() {
    // Update
    if (this.exhibitdetailFormGroup.value.id) {
      this.exhibitdetailService
        .update(
          this.exhibitdetailFormGroup.value,
          this.exhibitdetailFormGroup.value.id
        )
        .subscribe(
          (res) => {
            console.log("res", res);
            this.exhibitdetailimageFormGroup.patchValue({
              exhibit_detail_id: this.exhibitdetailFormGroup.value.id,
            });
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
    // Create
    else {
      this.exhibitdetailService
        .post(this.exhibitdetailFormGroup.value)
        .subscribe(
          (res) => {
            console.log("res", res);
            this.exhibitdetailFormGroup.patchValue({
              ...res,
            });
            this.exhibitdetailimageFormGroup.patchValue({
              exhibit_detail_id: res.id,
            });
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
  }

  // Image Process
  onChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.exhibitdetailimageFormGroup
        .get("exhibit_detail_image")
        .setValue(file);
    }
  }

  create() {
    const formData = new FormData();
    formData.append(
      "exhibit_detail_image",
      this.exhibitdetailimageFormGroup.get("exhibit_detail_image").value
    );
    formData.append(
      "exhibit_detail_id",
      this.exhibitdetailimageFormGroup.value.exhibit_detail_id
    );

    this.exhibitdetailimagesService.post(formData).subscribe(
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
              this.getExhibitDetailImage(this.exhibitdetailFormGroup.value.id);
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
    if (
      typeof this.exhibitdetailimageFormGroup.get("exhibit_detail_image")
        .value != "string"
    ) {
      formData.append(
        "exhibit_detail_image",
        this.exhibitdetailimageFormGroup.get("exhibit_detail_image").value
      );
    }
    formData.append("id", this.exhibitdetailimageFormGroup.value.id);

    this.exhibitdetailimagesService
      .update(formData, this.exhibitdetailimageFormGroup.value.id)
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
                this.getExhibitDetailImage(
                  this.exhibitdetailFormGroup.value.id
                );
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
}
