import { Component, OnInit, TemplateRef } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import swal from "sweetalert2";

import { EducationalProgramsService } from "src/app/shared/services/educational-programs/educational-programs.service";
import { EducationalProgramDatesService } from "src/app/shared/services/educational-program-dates/educational-program-dates.service";
import { EducationalProgramImagesService } from "src/app/shared/services/educational-program-images/educational-program-images.service";
import { EducationalProgramActivitiesService } from "src/app/shared/services/educational-program-activities/educational-program-activities.service";
import { UsersService } from "src/app/shared/services/users/users.service";
import { VenuesService } from "src/app/shared/services/venues/venues.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-programs-list",
  templateUrl: "./programs-list.component.html",
  styleUrls: ["./programs-list.component.scss"],
})
export class ProgramsListComponent implements OnInit {
  // Data
  eduprogramdates = [];
  eduprogramimages = [];
  eduprogramactivities = [];

  // Dropdown
  programtypes = [
    {
      value: "PL",
      display_name: "Awam",
    },
    {
      value: "PV",
      display_name: "Swasta",
    },
  ];
  programcategories = [
    {
      value: "P1",
      display_name: "PROGRAM PEMBANGUNAN MURID/GURU",
    },
    {
      value: "P2",
      display_name: "PROGRAM PENCERAPAN",
    },
    {
      value: "P3",
      display_name: "PROGRAM KHAS",
    },
    {
      value: "P4",
      display_name: "PROGRAM KEBANGSAAN",
    },
    {
      value: "P5",
      display_name: "PROGRAM ANTARABANGSA",
    },
    {
      value: "P6",
      display_name: "PROGRAM KERJASAMA",
    },
    {
      value: "P7",
      display_name: "PROGRAM JANGKAUAN",
    },
    {
      value: "P8",
      display_name: "SEMINAR, CERAMAH, PLANETARIUM TALKS",
    },
  ];
  programsubcategories = [
    {
      value: "NSC",
      display_name: "National Space Challenge",
    },
    {
      value: "KRK",
      display_name: "Kejohanan Roket Kebangsaan",
    },
    {
      value: "NAV",
      display_name: "Tiada",
    },
  ];
  users = [];
  venues = [];

  // FormGroup
  eduprogramFormGroup: FormGroup;
  eduprogramdateFormGroup: FormGroup;
  eduprogramimageFormGroup: FormGroup;
  eduprogramactivityFormGroup: FormGroup;
  eduprogramattachmentFormGroup: FormGroup;

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog",
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
    private eduprogramService: EducationalProgramsService,
    private eduprogramdateService: EducationalProgramDatesService,
    private eduprogramimageService: EducationalProgramImagesService,
    private eduprogramactivityService: EducationalProgramActivitiesService,
    private userService: UsersService,
    private venueService: VenuesService
  ) {
    this.getUser();
    this.getVenue();

    this.eduprogramFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      title_en: new FormControl(""),
      description_en: new FormControl(""),
      title_ms: new FormControl(""),
      description_ms: new FormControl(""),
      program_code: new FormControl(""),
      program_type: new FormControl(""),
      program_category: new FormControl(""),
      program_subcategory: new FormControl(""),
      program_opento_en: new FormControl(""),
      program_opento_ms: new FormControl(""),
      min_participant: new FormControl(""),
      max_participant: new FormControl(""),
      price: new FormControl(0),
      // poster_link: new FormControl(""),
      // website_link: new FormControl(""),
      video_link: new FormControl(""),
      registration: new FormControl(""),
      activity: new FormControl(""),
      venue_id: new FormControl(""),
      coordinator_id: new FormControl(""),
      status: new FormControl(""),
    });

    this.eduprogramdateFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      program_date: new FormControl(""),
      program_id: new FormControl(""),
    });

    this.eduprogramimageFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      program_image: new FormControl(""),
      program_id: new FormControl(""),
    });

    this.eduprogramactivityFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      program_activity: new FormControl(""),
      program_id: new FormControl(""),
    });

    this.eduprogramattachmentFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      attachment_link: new FormControl(""),
    });
  }

  getUser() {
    this.userService.getAll().subscribe(
      (res) => {
        console.log("res", res);
        this.users = res;
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
    this.eduprogramService.getAll().subscribe((res) => {
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
    this.eduprogramFormGroup.patchValue({
      id: "",
      title_en: "",
      description_en: "",
      title_ms: "",
      description_ms: "",
      program_code: "",
      program_type: "",
      program_category: "",
      program_subcategory: "",
      program_opento_en: "",
      program_opento_ms: "",
      min_participant: "",
      max_participant: "",
      price: 0,
      // poster_link: "",
      // website_link: "",
      video_link: "",
      registration: "",
      activity: "",
      venue_id: "",
      coordinator_id: "",
      status: "",
    });
  }

  openModal(modalRef: TemplateRef<any>, process: string, row) {
    if (process == "create") {
      // this.eduprogramFormGroup.reset();
      this.emptyFormGroup();
    } else if (process == "update") {
      this.eduprogramFormGroup.patchValue({
        ...row,
      });
    } else if (process == "createupdatedate") {
      this.eduprogramdateService.filter("program_id=" + row.id).subscribe(
        (res) => {
          console.log("res", res);
          this.eduprogramdates = res;
        },
        (err) => {
          console.error("err", err);
        }
      );
      this.eduprogramdateFormGroup.patchValue({
        program_id: row.id,
      });
    } else if (process == "createupdateactivity") {
      this.eduprogramactivityService.filter("program_id=" + row.id).subscribe(
        (res) => {
          console.log("res", res);
          this.eduprogramactivities = res;
        },
        (err) => {
          console.error("err", err);
        }
      );
      this.eduprogramactivityFormGroup.patchValue({
        program_id: row.id,
      });
    } else if (process == "createupdateattachment") {
      this.eduprogramattachmentFormGroup.patchValue({
        id: row.id,
        attachment_link: row.attachment_link ? row.attachment_link : "",
      });
    } else if (process == "upload") {
      this.eduprogramimageService.filter("program_id=" + row.id).subscribe(
        (res) => {
          console.log("res", res);
          this.eduprogramimages = res;
        },
        (err) => {
          console.error("err", err);
        }
      );
      this.eduprogramimageFormGroup.patchValue({
        program_id: row.id,
      });
    }
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
  }

  create() {
    this.eduprogramService.create(this.eduprogramFormGroup.value).subscribe(
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
    this.eduprogramService
      .update(this.eduprogramFormGroup.value, this.eduprogramFormGroup.value.id)
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
          this.eduprogramService.delete(row.id).subscribe(
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

  createupdatedate() {
    this.eduprogramdateService
      .create(this.eduprogramdateFormGroup.value)
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

  deletedate(row) {
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
          this.eduprogramdateService.delete(row.id).subscribe(
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

  createupdateactivity() {
    this.eduprogramactivityService
      .create(this.eduprogramactivityFormGroup.value)
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

  deleteactivity(row) {
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
          this.eduprogramactivityService.delete(row.id).subscribe(
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

  createupdateattachment() {
    const formData = new FormData();
    formData.append("id", this.eduprogramattachmentFormGroup.value.id);
    if (
      typeof this.eduprogramattachmentFormGroup.get("attachment_link").value !=
      "string"
    ) {
      formData.append(
        "attachment_link",
        this.eduprogramattachmentFormGroup.get("attachment_link").value
      );
    }

    this.eduprogramService
      .update(formData, this.eduprogramattachmentFormGroup.value.id)
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

  // Image Process
  onChangeImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.eduprogramimageFormGroup.get("program_image").setValue(file);
    }
  }

  onChangeAttachment(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.eduprogramattachmentFormGroup.get("attachment_link").setValue(file);
    }
  }

  uploadimage() {
    const formData = new FormData();
    formData.append(
      "program_image",
      this.eduprogramimageFormGroup.get("program_image").value
    );
    formData.append(
      "program_id",
      this.eduprogramimageFormGroup.value.program_id
    );

    this.eduprogramimageService.create(formData).subscribe(
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

  deleteimage(image) {
    this.eduprogramimageService.delete(image.id).subscribe(
      (res) => {
        console.log("res", res);
        swal
          .fire({
            title: "Berjaya",
            text: "Data anda berjaya dibuang.",
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
            text: "Data anda tidak berjaya dibuang. Sila cuba lagi",
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

  getType(value: string) {
    let result = this.programtypes.find((obj) => {
      return obj.value == value;
    });
    return result.display_name;
  }

  getCategory(value: string) {
    let result = this.programcategories.find((obj) => {
      return obj.value == value;
    });
    return result.display_name;
  }
}
