import { Component, OnInit, TemplateRef } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import swal from "sweetalert2";

import { EmailTemplatesService } from "src/app/shared/services/email-templates/email-templates.service";
import { EducationalProgramApplicationsService } from "src/app/shared/services/educational-program-applications/educational-program-applications.service";
import { EducationalProgramsService } from "src/app/shared/services/educational-programs/educational-programs.service";
import { EducationalProgramDatesService } from "src/app/shared/services/educational-program-dates/educational-program-dates.service";
import { EducationalProgramActivitiesService } from "src/app/shared/services/educational-program-activities/educational-program-activities.service";
import { UsersService } from "src/app/shared/services/users/users.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-programs-application",
  templateUrl: "./programs-application.component.html",
  styleUrls: ["./programs-application.component.scss"],
})
export class ProgramsApplicationComponent implements OnInit {
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
  eduprogramappFormGroup: FormGroup;

  // Dropdown
  organisationcategories = [
    {
      value: "GV",
      display_name: "Kerajaan",
    },
    {
      value: "SC",
      display_name: "Sekolah",
    },
    {
      value: "UN",
      display_name: "Universiti",
    },
    {
      value: "NA",
      display_name: "Tiada",
    },
  ];
  statuses = [
    {
      value: "AP",
      display_name: "Diterima",
    },
    {
      value: "IP",
      display_name: "Dalam proses",
    },
    {
      value: "RJ",
      display_name: "Ditolak",
    },
  ];
  programs = [];
  programdates = [];
  programactivities = [];
  users = [];
  selectedProgramDates = [];
  selectedProgramActivity = [];

  constructor(
    public formBuilder: FormBuilder,
    private modalService: BsModalService,
    private emailtemplateService: EmailTemplatesService,
    private eduprogramappService: EducationalProgramApplicationsService,
    private eduprogramService: EducationalProgramsService,
    private eduprogramdateService: EducationalProgramDatesService,
    private eduprogramactivityService: EducationalProgramActivitiesService,
    private userService: UsersService
  ) {
    this.getProgram();
    this.getProgramDate();
    this.getProgramActivity();
    this.getUser();

    this.eduprogramappFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      organisation_name: new FormControl(""),
      organisation_category: new FormControl(""),
      customer_id: new FormControl(""),
      educational_program_id: new FormControl(""),
      educational_program_date_id: new FormControl(""),
      participant: new FormControl(""),
      age: new FormControl(""),
      activity: new FormControl(""),
      status: new FormControl(""),
      document_link: new FormControl(""),
    });
  }

  getProgram() {
    this.eduprogramService.getAll().subscribe(
      (res) => {
        console.log("res", res);
        this.programs = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  getProgramDate() {
    this.eduprogramdateService.getAll().subscribe(
      (res) => {
        console.log("res", res);
        this.programdates = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  getProgramActivity() {
    this.eduprogramactivityService.getAll().subscribe(
      (res) => {
        console.log("res", res);
        this.programactivities = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
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

  ngOnInit() {
    // this.getCharts()
    this.getData();
  }

  getData() {
    this.eduprogramappService.extended().subscribe((res) => {
      console.log("res", res);
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
      this.eduprogramappFormGroup.reset();
      this.eduprogramappFormGroup.patchValue({
        document_link: "",
      });
    } else if (process == "update") {
      this.eduprogramappFormGroup.patchValue({
        ...row,
        customer_id: row.customer_id.id,
        educational_program_id: row.educational_program_id
          ? row.educational_program_id.id
          : "",
        educational_program_date_id: row.educational_program_date_id
          ? row.educational_program_date_id.id
          : "",
        document_link: row.document_link ? row.document_link : "",
      });
      this.changeProgram();
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
      this.eduprogramappFormGroup.get("document_link").setValue(file);
    }
  }

  create() {
    const formData = new FormData();
    formData.append(
      "organisation_name",
      this.eduprogramappFormGroup.value.organisation_name
    );
    formData.append(
      "organisation_category",
      this.eduprogramappFormGroup.value.organisation_category
    );
    formData.append(
      "customer_id",
      this.eduprogramappFormGroup.value.customer_id
    );
    formData.append(
      "educational_program_id",
      this.eduprogramappFormGroup.value.educational_program_id
    );
    formData.append(
      "educational_program_date_id",
      this.eduprogramappFormGroup.value.educational_program_date_id
    );
    formData.append(
      "participant",
      this.eduprogramappFormGroup.value.participant
    );
    formData.append("age", this.eduprogramappFormGroup.value.age);
    if (this.eduprogramappFormGroup.value.activity)
      formData.append("activity", this.eduprogramappFormGroup.value.activity);
    formData.append("status", this.eduprogramappFormGroup.value.status);
    if (
      typeof this.eduprogramappFormGroup.get("document_link").value != "string"
    ) {
      formData.append(
        "document_link",
        this.eduprogramappFormGroup.get("document_link").value
      );
    }

    this.eduprogramappService.post(formData).subscribe(
      (res) => {
        console.log("res", res);
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
    formData.append("id", this.eduprogramappFormGroup.value.id);
    formData.append(
      "organisation_name",
      this.eduprogramappFormGroup.value.organisation_name
    );
    formData.append(
      "organisation_category",
      this.eduprogramappFormGroup.value.organisation_category
    );
    formData.append(
      "customer_id",
      this.eduprogramappFormGroup.value.customer_id
    );
    formData.append(
      "educational_program_id",
      this.eduprogramappFormGroup.value.educational_program_id
    );
    formData.append(
      "educational_program_date_id",
      this.eduprogramappFormGroup.value.educational_program_date_id
    );
    formData.append(
      "participant",
      this.eduprogramappFormGroup.value.participant
    );
    formData.append("age", this.eduprogramappFormGroup.value.age);
    if (this.eduprogramappFormGroup.value.activity)
      formData.append("activity", this.eduprogramappFormGroup.value.activity);
    formData.append("status", this.eduprogramappFormGroup.value.status);
    if (
      typeof this.eduprogramappFormGroup.get("document_link").value != "string"
    ) {
      formData.append(
        "document_link",
        this.eduprogramappFormGroup.get("document_link").value
      );
    }

    this.eduprogramappService
      .update(formData, this.eduprogramappFormGroup.value.id)
      .subscribe(
        (res) => {
          console.log("res", res);
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

          this.sendmail(this.eduprogramappFormGroup.value);
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
          this.eduprogramappService.delete(row.id).subscribe(
            (res) => {
              console.log("res", res);
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

  sendmail(row) {
    let user = this.users.filter((obj) => {
      return obj.id == row.customer_id;
    });
    // AP : "Diterima"
    // IP : "Dalam proses"
    // RJ : "Ditolak"
    if (row.status == "AP") {
      let obj = {
        code: "EMEL07",
        to: user[0].email,
        context: null,
      };
      console.log("obj", obj);
      this.emailtemplateService.sending_mail(obj).subscribe(
        (res) => {
          console.log("res", res);
        },
        (err) => {
          console.error("err", err);
        }
      );
    } else if (row.status == "RJ") {
      let obj = {
        code: "EMEL08",
        to: user[0].email,
        context: null,
      };
      console.log("obj", obj);
      this.emailtemplateService.sending_mail(obj).subscribe(
        (res) => {
          console.log("res", res);
        },
        (err) => {
          console.error("err", err);
        }
      );
    }
  }

  changeProgram() {
    this.selectedProgramDates = this.programdates.filter((obj) => {
      return (
        obj.program_id ==
        this.eduprogramappFormGroup.value.educational_program_id
      );
    });

    this.selectedProgramActivity = this.programactivities.filter((obj) => {
      return (
        obj.program_id ==
        this.eduprogramappFormGroup.value.educational_program_id
      );
    });
  }
}
