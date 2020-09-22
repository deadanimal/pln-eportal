import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import swal from 'sweetalert2';

import { Database } from '../../../../assets/mock/showing';

@Component({
  selector: 'app-showing-database',
  templateUrl: './showing-database.component.html',
  styleUrls: ['./showing-database.component.scss']
})
export class ShowingDatabaseComponent implements OnInit {

  // Data
  showings

  // Table
  entries: number = 10;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows: any = Database

  // Modal
  defaultModal: BsModalRef;
  default = {
    keyboard: true,
    class: "modal-dialog-centered modal-lg"
  };

  constructor(
    private modalService: BsModalService
  ) {
    this.temp = this.rows.map((prop, key) => {
      return {
        ...prop,
        id: key
      };
    });
  }

  ngOnInit() {
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }

  filterTable($event) {
    let val = $event.target.value;
    this.temp = this.rows.filter(function (d) {
      for (var key in d) {
        if (d[key].toLowerCase().indexOf(val) !== -1) {
          return true;
        }
      }
      return false;
    });
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
    this.activeRow = event.row;
  }

  openDefaultModal(modalDefault: TemplateRef<any>) {
    this.defaultModal = this.modalService.show(modalDefault, this.default);
  }

  showNotification() {
    this.defaultModal.hide()
    swal.fire({
      title: "Success",
      text: "New record has been added",
      type: "success",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-success"
    })
  }

}
