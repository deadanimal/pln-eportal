import { Component, OnInit, TemplateRef } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import swal from "sweetalert2";

import { EmailTemplatesService } from "src/app/shared/services/email-templates/email-templates.service";
import { EducationalProgramApplicationsService } from "src/app/shared/services/educational-program-applications/educational-program-applications.service";
import { EducationalProgramsService } from "src/app/shared/services/educational-programs/educational-programs.service";
import { EducationalProgramDatesService } from "src/app/shared/services/educational-program-dates/educational-program-dates.service";
import { EducationalProgramActivitiesService } from "src/app/shared/services/educational-program-activities/educational-program-activities.service";
import { EducationalProgramFormsService } from "src/app/shared/services/educational-program-forms/educational-program-forms.service";
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
  // Data
  programs = [];
  programdates = [];
  programactivities = [];
  programforms = [];
  users = [];
  selectedProgramDates = [];
  selectedProgramActivity = [];

  // Table
  tableEntries: number = 5;
  tableSelected: any[] = [];
  tableTemp = [];
  tableActiveRow: any;
  tableRows: any[] = [];
  SelectionType = SelectionType;

  // Table
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows: any[] = [];

  // Modal
  modal: BsModalRef;
  modalForm: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog",
    ignoreBackdropClick: true,
  };
  modalFormConfig = {
    keyboard: true,
    class: "modal-dialog modal-xl",
    ignoreBackdropClick: true,
  };

  // FormGroup
  eduprogramappFormGroup: FormGroup;
  zeroFormGroup: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

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
  religions = [
    {
      value: "IS",
      display_name: "Islam",
    },
    {
      value: "HD",
      display_name: "Hindu",
    },
    {
      value: "BD",
      display_name: "Buddha",
    },
    {
      value: "CT",
      display_name: "Christian",
    },
    {
      value: "OT",
      display_name: "Other",
    },
  ];
  genders = [
    {
      value: "FM",
      display_name_en: "Female",
      display_name_ms: "Perempuan",
    },
    {
      value: "ML",
      display_name_en: "Male",
      display_name_ms: "Lelaki",
    },
  ];
  citizenships = [
    {
      value: "CZ",
      display_name_en: "Citizen",
      display_name_ms: "Warganegara",
    },
    {
      value: "NC",
      display_name_en: "Non-Citizen",
      display_name_ms: "Bukan Warganegara",
    },
  ];
  maritalstatuses = [
    {
      value: "S",
      display_name_en: "Single",
      display_name_ms: "Bujang",
    },
    {
      value: "M",
      display_name_en: "Married",
      display_name_ms: "Kahwin",
    },
  ];
  tshirtsizes = [
    {
      value: "S",
      display_name: "S",
    },
    {
      value: "M",
      display_name: "M",
    },
    {
      value: "L",
      display_name: "L",
    },
    {
      value: "XL",
      display_name: "XL",
    },
    {
      value: "2XL",
      display_name: "2XL",
    },
    {
      value: "3XL",
      display_name: "3XL",
    },
  ];
  truefalses = [
    {
      value: "true",
      display_name_en: "Yes",
      display_name_ms: "Ya",
    },
    {
      value: "false",
      display_name_en: "No",
      display_name_ms: "Tidak",
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
      display_name: "PROGRAM/RAKAN KERJASAMA",
    },
    {
      value: "P7",
      display_name: "PROGRAM JANGKAUAN (6 ZON)",
    },
    {
      value: "P8",
      display_name: "SEMINAR, CERAMAH, PLANETARIUM TALKS",
    },
    {
      value: "P9",
      display_name: "LAIN-LAIN",
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
  ];

  constructor(
    public formBuilder: FormBuilder,
    private modalService: BsModalService,
    private emailtemplateService: EmailTemplatesService,
    private eduprogramappService: EducationalProgramApplicationsService,
    private eduprogramService: EducationalProgramsService,
    private eduprogramdateService: EducationalProgramDatesService,
    private eduprogramactivityService: EducationalProgramActivitiesService,
    private eduprogramformService: EducationalProgramFormsService,
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
      image_link: new FormControl(""),
      video_link: new FormControl(""),
    });

    this.zeroFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      educational_program_id: new FormControl(""),
      customer_id: new FormControl(""),
      status: new FormControl("IP"),
    });

    this.firstFormGroup = this.formBuilder.group({
      teacher_name: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      teacher_school_name: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      teacher_school_address: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      teacher_school_postcode: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      teacher_school_division: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      teacher_school_state: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      teacher_tel: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      teacher_hp: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      teacher_email: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      teacher_fax: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      teacher_dob: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      teacher_age: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      teacher_religion: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      teacher_gender: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      teacher_citizenship: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      teacher_nric_passportno: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      teacher_maritalstatus: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      teacher_tshirt_size: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      teacher_contactperson_name: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      teacher_contactperson_tel: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      teacher_anysickness: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      teacher_anyallergies: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      teacher_vegetarian: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
    });

    this.secondFormGroup = this.formBuilder.group({
      student_1_name: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      student_1_dob: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      student_1_age: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      student_1_year: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      student_1_religion: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      student_1_gender: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      student_1_citizenship: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      student_1_nric_passportno: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      student_1_tshirt_size: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      student_1_contactperson_name: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      student_1_contactperson_tel: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      student_1_anysickness: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      student_1_anyallergies: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      student_1_vegetarian: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
    });

    this.thirdFormGroup = this.formBuilder.group({
      student_2_name: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      student_2_dob: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      student_2_age: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      student_2_year: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      student_2_religion: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      student_2_gender: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      student_2_citizenship: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      student_2_nric_passportno: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      student_2_tshirt_size: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      student_2_contactperson_name: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      student_2_contactperson_tel: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      student_2_anysickness: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      student_2_anyallergies: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      student_2_vegetarian: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
    });

    this.fourthFormGroup = this.formBuilder.group({
      accept: new FormControl(
        false,
        Validators.compose([Validators.requiredTrue])
      ),
    });
  }

  getProgram() {
    this.eduprogramService.getAll().subscribe(
      (res) => {
        // console.log("res", res);
        this.programs = res;
        res.forEach((obj) => {
          if (obj.program_subcategory != "NAV") this.programforms.push(obj);
        });
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  getProgramDate() {
    this.eduprogramdateService.getAll().subscribe(
      (res) => {
        // console.log("res", res);
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
        // console.log("res", res);
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
        // console.log("res", res);
        res.forEach((obj) => {
          if (obj.user_type == "CS") this.users.push(obj);
        });
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  ngOnInit() {
    // this.getCharts()
    this.getData();
    this.getDataForm();
  }

  getData() {
    this.eduprogramappService.extended().subscribe((res) => {
      // console.log("res", res);
      this.tableRows = res;
      this.tableTemp = this.tableRows.map((prop, key) => {
        return {
          ...prop,
          no: key,
        };
      });
    });
  }

  getDataForm() {
    this.eduprogramformService.extended().subscribe((res) => {
      // console.log("res", res);
      this.rows = res;
      this.temp = this.rows.map((prop, key) => {
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

  entriesChangeForm($event) {
    this.entries = $event.target.value;
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

  filterTableForm($event) {
    let val = $event.target.value;
    this.temp = this.rows.filter(function (d) {
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

  onSelectForm({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
    this.tableActiveRow = event.row;
  }

  onActivateForm(event) {
    this.activeRow = event.row;
  }

  openModal(modalRef: TemplateRef<any>, process: string, row) {
    if (process == "create") {
      this.eduprogramappFormGroup.reset();
      this.eduprogramappFormGroup.patchValue({
        document_link: "",
        image_link: "",
        video_link: "",
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
        image_link: row.image_link ? row.image_link : "",
        video_link: row.video_link ? row.video_link : "",
      });
      this.changeProgram();
    }
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  openModalForm(modalRef: TemplateRef<any>, process: string, row) {
    if (process == "create") {
      this.zeroFormGroup.reset();
      this.firstFormGroup.reset();
      this.secondFormGroup.reset();
      this.thirdFormGroup.reset();
    } else if (process == "update") {
      this.zeroFormGroup.patchValue({
        ...row,
        customer_id: row.customer_id.id,
        educational_program_id: row.educational_program_id
          ? row.educational_program_id.id
          : "",
      });
      this.firstFormGroup.patchValue({
        ...row,
      });
      this.secondFormGroup.patchValue({
        ...row,
      });
      this.thirdFormGroup.patchValue({
        ...row,
      });
    }
    this.modalForm = this.modalService.show(modalRef, this.modalFormConfig);
  }

  closeModal() {
    this.modal.hide();
  }

  closeModalForm() {
    this.modalForm.hide();
  }

  // Image Process
  onChange(event, type: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (type == "document_link")
        this.eduprogramappFormGroup.get("document_link").setValue(file);
      if (type == "image_link")
        this.eduprogramappFormGroup.get("image_link").setValue(file);
      if (type == "video_link")
        this.eduprogramappFormGroup.get("video_link").setValue(file);
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
    if (
      typeof this.eduprogramappFormGroup.get("image_link").value != "string"
    ) {
      formData.append(
        "image_link",
        this.eduprogramappFormGroup.get("image_link").value
      );
    }
    if (
      typeof this.eduprogramappFormGroup.get("video_link").value != "string"
    ) {
      formData.append(
        "video_link",
        this.eduprogramappFormGroup.get("video_link").value
      );
    }

    this.eduprogramappService.post(formData).subscribe(
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
    if (
      typeof this.eduprogramappFormGroup.get("image_link").value != "string"
    ) {
      formData.append(
        "image_link",
        this.eduprogramappFormGroup.get("image_link").value
      );
    }
    if (
      typeof this.eduprogramappFormGroup.get("video_link").value != "string"
    ) {
      formData.append(
        "video_link",
        this.eduprogramappFormGroup.get("video_link").value
      );
    }

    this.eduprogramappService
      .update(formData, this.eduprogramappFormGroup.value.id)
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
          this.eduprogramappService.delete(row.id).subscribe(
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

  verifyApp(row) {
    swal
      .fire({
        title: "Pengesahan Program Pendidikan",
        text: "Adakah anda ingin meluluskan penyertaan program pendidikan ini?",
        icon: "warning",
        // showCancelButton: true,
        buttonsStyling: false,
        showDenyButton: true,
        customClass: {
          confirmButton: "btn btn-success",
          // cancelButton: "btn btn-danger",
          denyButton: "btn btn-danger",
        },
        confirmButtonText: "Ya",
        denyButtonText: "Tidak",
        // cancelButtonText: "Tidak",
        showCloseButton: true,
      })
      .then((result) => {
        if (result.isConfirmed == true) {
          // to accept the educational program application
          let objUpdate = {
            status: "AP",
          };
          this.eduprogramappService.update(objUpdate, row.id).subscribe(
            (res) => {
              // console.log("res", res);
            },
            (err) => {
              console.error("err", err);
            },
            () => {
              this.getData();

              this.sweetAlertSuccess(
                "Diterima",
                "Anda telah menerima penyertaan program pendidikan ini."
              );

              let objMail = {
                status: "AP",
                customer_id: row.customer_id.id,
              };

              this.sendmail(objMail);
            }
          );
        } else if (result.isDenied == true) {
          // to reject the educational program application
          let objUpdate = {
            status: "RJ",
          };
          this.eduprogramappService.update(objUpdate, row.id).subscribe(
            (res) => {
              // console.log("res", res);
            },
            (err) => {
              console.error("err", err);
            },
            () => {
              this.getData();

              this.sweetAlertWarning(
                "Ditolak",
                "Anda telah menolak penyertaan program pendidikan ini."
              );

              let objMail = {
                status: "RJ",
                customer_id: row.customer_id.id,
              };

              this.sendmail(objMail);
            }
          );
        }
      });
  }

  verifyForm(row) {
    swal
      .fire({
        title: "Pengesahan Penyertaan (NSC & Rocket)",
        text: "Adakah anda ingin meluluskan penyertaan ini?",
        icon: "warning",
        // showCancelButton: true,
        buttonsStyling: false,
        showDenyButton: true,
        customClass: {
          confirmButton: "btn btn-success",
          // cancelButton: "btn btn-danger",
          denyButton: "btn btn-danger",
        },
        confirmButtonText: "Ya",
        denyButtonText: "Tidak",
        // cancelButtonText: "Tidak",
        showCloseButton: true,
      })
      .then((result) => {
        if (result.isConfirmed == true) {
          // to accept the educational program application
          let objUpdate = {
            status: "AP",
          };
          this.eduprogramformService.update(objUpdate, row.id).subscribe(
            (res) => {
              // console.log("res", res);
            },
            (err) => {
              console.error("err", err);
            },
            () => {
              this.getDataForm();

              this.sweetAlertSuccess(
                "Diterima",
                "Anda telah menerima penyertaan ini."
              );

              let objMail = {
                status: "AP",
                customer_id: row.customer_id.id,
              };

              this.sendmail(objMail);
            }
          );
        } else if (result.isDenied == true) {
          // to reject the educational program application
          let objUpdate = {
            status: "RJ",
          };
          this.eduprogramformService.update(objUpdate, row.id).subscribe(
            (res) => {
              // console.log("res", res);
            },
            (err) => {
              console.error("err", err);
            },
            () => {
              this.getDataForm();

              this.sweetAlertWarning(
                "Ditolak",
                "Anda telah menolak penyertaan ini."
              );

              let objMail = {
                status: "RJ",
                customer_id: row.customer_id.id,
              };

              this.sendmail(objMail);
            }
          );
        }
      });
  }

  sweetAlertSuccess(title, text) {
    swal.fire({
      title,
      text,
      icon: "success",
      buttonsStyling: false,
      customClass: {
        confirmButton: "btn btn-success",
      },
    });
  }

  sweetAlertWarning(title, text) {
    swal.fire({
      title,
      text,
      icon: "warning",
      buttonsStyling: false,
      customClass: {
        confirmButton: "btn btn-warning",
      },
    });
  }

  createForm() {
    let postArray = {
      ...this.zeroFormGroup.value,
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value,
      ...this.thirdFormGroup.value,
    };
    // console.log("postArray", postArray);

    this.eduprogramformService.create(postArray).subscribe(
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
              this.modalForm.hide();
              this.getDataForm();
            }
          });

        let user = this.users.filter((obj) => {
          return obj.id == this.zeroFormGroup.value.customer_id;
        });

        let obj = {
          code: "EMEL06",
          to: user[0].email,
          context: null, //JSON.stringify({ name: this.authService.decodedToken().full_name }),
        };
        this.emailtemplateService.sending_mail(obj).subscribe(
          (res) => {
            // console.log("res", res);
          },
          (err) => {
            console.error("err", err);
          }
        );
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

  updateForm() {
    let postArray = {
      ...this.zeroFormGroup.value,
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value,
      ...this.thirdFormGroup.value,
    };
    // console.log("postArray", postArray);

    this.eduprogramformService
      .update(postArray, this.zeroFormGroup.value.id)
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
                this.modalForm.hide();
                this.getDataForm();
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

  deleteForm(row) {
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
          this.eduprogramformService.delete(row.id).subscribe(
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
              this.getDataForm();
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
      // console.log("obj", obj);
      this.emailtemplateService.sending_mail(obj).subscribe(
        (res) => {
          // console.log("res", res);
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
      // console.log("obj", obj);
      this.emailtemplateService.sending_mail(obj).subscribe(
        (res) => {
          // console.log("res", res);
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

  getGender(value: string) {
    let result = this.genders.find((obj) => {
      return obj.value == value;
    });
    return result.display_name_ms;
  }

  getMaritalStatus(value: string) {
    let result = this.maritalstatuses.find((obj) => {
      return obj.value == value;
    });
    return result.display_name_ms;
  }

  getCitizenship(value: string) {
    let result = this.citizenships.find((obj) => {
      return obj.value == value;
    });
    return result.display_name_ms;
  }

  getTrueFalse(value: string) {
    let result = this.truefalses.find((obj) => {
      return obj.value == value;
    });
    return result.display_name_ms;
  }

  getProgramCategory(value: string) {
    let result = this.programcategories.find((obj) => {
      return obj.value == value;
    });
    return result.display_name;
  }

  getProgramSubCategory(value: string) {
    let result = this.programsubcategories.find((obj) => {
      return obj.value == value;
    });
    return result.display_name;
  }
}
