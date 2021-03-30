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

import { SurveyAnswersService } from "src/app/shared/services/survey-answers/survey-answers.service";
import { SurveyQuestionsService } from "src/app/shared/services/survey-questions/survey-questions.service";
import { UsersService } from "src/app/shared/services/users/users.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-surveys-answer",
  templateUrl: "./surveys-answer.component.html",
  styleUrls: ["./surveys-answer.component.scss"],
})
export class SurveysAnswerComponent implements OnInit {
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

  // FormGroup
  surveyanswerFormGroup: FormGroup;

  // Dropdown
  questionnairetypes = [
    {
      value: "CB",
      display_name: "Checkbox",
    },
    {
      value: "SL",
      display_name: "Selection",
    },
    {
      value: "TB",
      display_name: "Textbox",
    },
    {
      value: "NA",
      display_name: "Tiada",
    },
  ];
  questionnairemodules = [
    {
      value: "M01",
      display_name: "Tayangan",
    },
    {
      value: "M02",
      display_name: "Pameran",
    },
    {
      value: "M03",
      display_name: "Program Pendidikan",
    },
    {
      value: "M04",
      display_name: "Perpustakaan Maya",
    },
    {
      value: "M05",
      display_name: "Kembara Simulasi",
    },
    {
      value: "M06",
      display_name: "Lawatan",
    },
    {
      value: "M07",
      display_name: "Penerbitan",
    },
    {
      value: "M08",
      display_name: "Fasiliti",
    },
    {
      value: "NAV",
      display_name: "Tiada",
    },
  ];

  // Data
  surveyquestion = {
    id: "",
    questionnaire_question_en: "",
    questionnaire_question_ms: "",
    questionnaire_type: "",
    questionnaire_answer: "",
    questionnaire_module: "",
  };
  users = [];

  constructor(
    public formBuilder: FormBuilder,
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private surveyanswerService: SurveyAnswersService,
    private surveyquestionService: SurveyQuestionsService,
    private userService: UsersService
  ) {
    this.getUser();
    
    this.surveyanswerFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      question: new FormControl(""),
      answer: new FormControl(""),
      survey_question_id: new FormControl(""),
      user_id: new FormControl(""),
    });

    this.surveyanswerFormGroup.value.survey_question_id = this.route.snapshot.params.id;

    this.surveyquestionService
      .filter("id=" + this.surveyanswerFormGroup.value.survey_question_id)
      .subscribe(
        (res) => {
          // console.log("res", res);
          this.surveyquestion = res[0];
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
        this.users = res;
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
    this.surveyanswerService
      .filter(
        "survey_question_id=" +
          this.surveyanswerFormGroup.value.survey_question_id
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
      this.surveyanswerFormGroup.reset();
    } else if (process == "update") {
      this.surveyanswerFormGroup.patchValue({
        ...row,
      });
    }
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
  }

  create() {
    this.surveyanswerService.post(this.surveyanswerFormGroup.value).subscribe(
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
    this.surveyanswerService
      .update(
        this.surveyanswerFormGroup.value,
        this.surveyanswerFormGroup.value.id
      )
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
          this.surveyanswerService.delete(row.id).subscribe(
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

  getType(value: string) {
    let result = this.questionnairetypes.find((obj) => {
      return obj.value == value;
    });
    return result.display_name;
  }

  getModule(value: string) {
    let result = this.questionnairemodules.find((obj) => {
      return obj.value == value;
    });
    return result.display_name;
  }

  getUserOne(user_id) {
    let user = this.users.find((obj) => {
      return obj.id == user_id;
    });
    return user.full_name;
  }
}
