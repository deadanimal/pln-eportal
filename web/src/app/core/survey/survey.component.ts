import { Component, OnInit, TemplateRef } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import swal from "sweetalert2";

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { FeedbacksService } from "src/app/shared/services/feedbacks/feedbacks.service";
import { SurveyAnswersService } from "src/app/shared/services/survey-answers/survey-answers.service";
import { SurveyQuestionsService } from "src/app/shared/services/survey-questions/survey-questions.service";
import { UsersService } from "src/app/shared/services/users/users.service";

@Component({
  selector: "app-survey",
  templateUrl: "./survey.component.html",
  styleUrls: ["./survey.component.scss"],
})
export class SurveyComponent implements OnInit {
  defaultModal: BsModalRef;
  default = {
    keyboard: true,
    class: "modal-dialog-centered",
  };

  // FormGroup
  feedbackFormGroup: FormGroup;
  surveyFormGroup: FormGroup;

  // Data
  typeQuestion: string = "";
  module: string = "";
  module_code: string = "";
  surveyquestions = [];

  // Dropdown
  modules = [
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
      display_name: "Not Available",
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private authService: AuthService,
    private feedbackService: FeedbacksService,
    private surveyanswerService: SurveyAnswersService,
    private surveyquestionService: SurveyQuestionsService,
    private userService: UsersService
  ) {
    this.surveyFormGroup = new FormGroup({});

    this.feedbackFormGroup = this.formBuilder.group({
      full_name: ["", Validators.required],
      email: ["", Validators.required],
      comment: ["", Validators.required],
      user_id: ["", Validators.required],
    });

    this.userService.get(this.authService.decodedToken().user_id).subscribe(
      (res) => {
        // console.log("res", res);
        this.feedbackFormGroup.patchValue({
          full_name: res.full_name,
          email: res.email,
        });
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  ngOnInit() {}

  openDefaultModal(modalDefault: TemplateRef<any>) {
    this.defaultModal = this.modalService.show(modalDefault, this.default);
  }

  chooseQuestion(question: string, module: string, module_code: string) {
    if (this.defaultModal) this.defaultModal.hide();
    this.typeQuestion = question;
    this.module = module;
    this.module_code = module_code;

    if (this.typeQuestion == "soalselidik") {
      this.surveyquestionService
        .filter("questionnaire_module=" + this.module_code)
        .subscribe(
          (res) => {
            // console.log("res", res);
            this.surveyquestions = res;
            let group = {};
            res.forEach((question) => {
              if (question.questionnaire_type == "CB") {
                group[question.questionnaire_fieldname] = new FormControl("");
              } else
                group[question.questionnaire_fieldname] = new FormControl("");
            });
            this.surveyFormGroup = new FormGroup(group);
            console.log(this.surveyFormGroup);
          },
          (err) => {
            console.error("err", err);
          }
        );
    }
  }

  changeCheckbox(event, field_name) {
    console.log("event", event);
    console.log("field_name", field_name);

    if (event.target.checked) {
      console.log("checked", event.target.value);
    } else {
    }

    console.log("surveyFormGroup", this.surveyFormGroup.value);
  }

  back() {
    this.typeQuestion = "";
  }

  submitSurvey() {
    for (let key in this.surveyFormGroup.value) {
      let answer = this.surveyFormGroup.value[key];
      let surveyquestion = this.surveyquestions.find((obj) => {
        return obj.questionnaire_fieldname == key;
      });

      let postObj = {
        answer: answer.toString(),
        survey_question_id: surveyquestion.id,
        user_id: this.authService.decodedToken().user_id,
      };

      this.surveyanswerService.post(postObj).subscribe(
        (res) => {
          console.log("res", res);
        },
        (err) => {
          console.error("err", err);
        }
      );
    }

    swal
      .fire({
        icon: "success",
        title: "Terima kasih atas kerjasama yang diberikan",
        buttonsStyling: false,
        confirmButtonText: "Tutup",
        customClass: {
          confirmButton: "btn btn-success",
        },
      })
      .then((result) => {
        if (result.value) {
          this.typeQuestion = "";
        }
      });
  }

  submitFeedback() {
    this.feedbackFormGroup.value.user_id = this.authService.decodedToken().user_id;

    this.feedbackService.post(this.feedbackFormGroup.value).subscribe(
      (res) => {
        console.log("res", res);
        swal
          .fire({
            icon: "success",
            title: "Terima kasih atas kerjasama yang diberikan",
            text: "Maklum balas anda akan dibalas dalam waktu 3 hari bekerja",
            buttonsStyling: false,
            confirmButtonText: "Tutup",
            customClass: {
              confirmButton: "btn btn-success",
            },
          })
          .then((result) => {
            if (result.value) {
              this.typeQuestion = "";
            }
          });
      },
      (err) => {
        console.error("err", err);
      }
    );
  }
}
