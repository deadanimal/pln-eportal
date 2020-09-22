import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "app-exhibit-details",
  templateUrl: "./exhibit-details.component.html",
  styleUrls: ["./exhibit-details.component.scss"],
})
export class ExhibitDetailsComponent implements OnInit {
  defaultModal: BsModalRef;
  default = {
    keyboard: true,
    class: "modal-dialog-centered",
  };

  constructor(private modalService: BsModalService) {}

  ngOnInit() {}

  openDefaultModal(modalDefault: TemplateRef<any>) {
    this.defaultModal = this.modalService.show(modalDefault, this.default);
  }
}
