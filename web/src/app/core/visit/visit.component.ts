import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import swal from "sweetalert2";

@Component({
  selector: "app-visit",
  templateUrl: "./visit.component.html",
  styleUrls: ["./visit.component.scss"],
})
export class VisitComponent implements OnInit {
  defaultModal: BsModalRef;
  default = {
    keyboard: true,
    class: "modal-dialog-centered",
  };

  data1 = [
    { id: "", itemName: "Select country" },
    { id: "CZ", itemName: "Czech Republic" },
    { id: "DK", itemName: "Denmark" },
    { id: "DO", itemName: "Dominican Republic" },
    { id: "IQ", itemName: "Iraq" },
    { id: "IL", itemName: "Israel" },
    { id: "IT", itemName: "Italy" },
    { id: "JM", itemName: "Jamaica" },
    { id: "JP", itemName: "Japan" },
    { id: "MG", itemName: "Madagascar" },
    { id: "MT", itemName: "Malta" },
    { id: "NO", itemName: "Norway" },
    { id: "PL", itemName: "Poland" },
    { id: "PT", itemName: "Portugal" },
    { id: "RO", itemName: "Romania" },
    { id: "RU", itemName: "Russian Federation" },
    { id: "LC", itemName: "Saint Lucia" },
    { id: "WS", itemName: "Samoa" },
    { id: "SM", itemName: "San Marino" },
    { id: "SA", itemName: "Saudi Arabia" },
    { id: "ES", itemName: "Spain" },
    { id: "SZ", itemName: "Swaziland" },
    { id: "SE", itemName: "Sweden" },
    { id: "TR", itemName: "Turkey" },
    { id: "UG", itemName: "Uganda" },
    { id: "UA", itemName: "Ukraine" },
    { id: "AE", itemName: "United Arab Emirates" },
    { id: "GB", itemName: "United Kingdom" },
    { id: "US", itemName: "United States" },
    { id: "VN", itemName: "Viet Nam" },
  ];
  settings1 = {
    singleSelection: true,
    text: "Single Select",
    enableSearchFilter: false,
    classes: "selectpicker btn-primary",
  };
  selectedItems1 = [];
  focus;

  constructor(private modalService: BsModalService) {}

  ngOnInit() {}

  openDefaultModal(modalDefault: TemplateRef<any>) {
    this.defaultModal = this.modalService.show(modalDefault, this.default);
  }

  openAfterBooking() {
    this.defaultModal.hide();
    swal.fire({
      icon: "success",
      title: "Terima kasih",
      text:
        "Pihak kami akan memberi maklum balas terhadap permohonan tersebut dalam masa 3 hari bekerja",
      buttonsStyling: false,
      confirmButtonText: "Tutup",
      customClass: {
        confirmButton: "btn btn-success",
      },
    });
  }
}
