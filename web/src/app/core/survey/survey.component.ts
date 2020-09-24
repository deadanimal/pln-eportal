import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import swal from "sweetalert2";

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

  typeQuestion: string = "";
  module: string = "";

  constructor(private modalService: BsModalService) {}

  ngOnInit() {}

  openDefaultModal(modalDefault: TemplateRef<any>) {
    this.defaultModal = this.modalService.show(modalDefault, this.default);
  }

  chooseQuestion(question: string, module: string) {
    if (this.defaultModal) this.defaultModal.hide();
    this.typeQuestion = question;
    this.module = module;
  }

  back() {
    this.typeQuestion = "";
  }

  hantarSoalSelidik() {
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

  hantarMaklumBalas() {
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
  }
}
