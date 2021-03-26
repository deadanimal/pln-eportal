import { Component, OnInit, TemplateRef } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import swal from "sweetalert2";

import { SurveyQuestionsService } from "src/app/shared/services/survey-questions/survey-questions.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-surveys-list",
  templateUrl: "./surveys-list.component.html",
  styleUrls: ["./surveys-list.component.scss"],
})
export class SurveysListComponent implements OnInit {
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
  surveyquestionFormGroup: FormGroup;

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
      value: "RB",
      display_name: "Radiobox",
    },
    {
      value: "RT",
      display_name: "Rating",
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
      display_name: "Keberkesanan",
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
      display_name: "Kutubkhanah Mini/Penerbitan",
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

  constructor(
    public formBuilder: FormBuilder,
    private modalService: BsModalService,
    private surveyquestionService: SurveyQuestionsService
  ) {
    this.surveyquestionFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      questionnaire_fieldname: new FormControl(""),
      questionnaire_question_en: new FormControl(""),
      questionnaire_question_ms: new FormControl(""),
      questionnaire_type: new FormControl(""),
      questionnaire_answer: new FormControl([]),
      questionnaire_module: new FormControl(""),
      // questionnaire_status: new FormControl(""),
      questionnaire_required: new FormControl(""),
    });
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.surveyquestionService.get().subscribe((res) => {
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
      this.surveyquestionFormGroup.reset();
    } else if (process == "update") {
      this.surveyquestionFormGroup.patchValue({
        ...row,
        questionnaire_answer: row.questionnaire_answer
          ? row.questionnaire_answer.toString()
          : [],
        questionnaire_required: row.questionnaire_required.toString(),
      });
    }
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
  }

  create() {
    var typesWithoutValue = ["CB", "SL", "RB"];
    if (
      ~typesWithoutValue.indexOf(
        this.surveyquestionFormGroup.value.questionnaire_type
      )
    ) {
      this.surveyquestionFormGroup.patchValue({
        questionnaire_answer: this.surveyquestionFormGroup.value.questionnaire_answer
          .replace(", ", ",")
          .split(","),
      });
    }
    let result = this.tableRows.find((obj) => {
      return (obj.questionnaire_fieldname = this.surveyquestionFormGroup.value.questionnaire_fieldname);
    });

    if (result) {
      swal
        .fire({
          title: "Ralat",
          text: "Nama Medan sudah wujud. Sila masukkan nama medan yang lain.",
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
    } else {
      this.surveyquestionService
        .post(this.surveyquestionFormGroup.value)
        .subscribe(
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
  }

  update() {
    var typesWithoutValue = ["CB", "SL", "RB"];
    if (
      ~typesWithoutValue.indexOf(
        this.surveyquestionFormGroup.value.questionnaire_type
      )
    ) {
      this.surveyquestionFormGroup.patchValue({
        questionnaire_answer: this.surveyquestionFormGroup.value.questionnaire_answer
          .replace(", ", ",")
          .split(","),
      });
    }
    let result = this.tableRows.find((obj) => {
      return (obj.questionnaire_fieldname = this.surveyquestionFormGroup.value.questionnaire_fieldname);
    });

    if (result) {
      swal
        .fire({
          title: "Ralat",
          text: "Nama Medan sudah wujud. Sila masukkan nama medan yang lain.",
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
    } else {
      this.surveyquestionService
        .update(
          this.surveyquestionFormGroup.value,
          this.surveyquestionFormGroup.value.id
        )
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
          this.surveyquestionService.delete(row.id).subscribe(
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
}
