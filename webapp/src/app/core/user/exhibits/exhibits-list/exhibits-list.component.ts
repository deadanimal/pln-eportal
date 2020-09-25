import { Component, OnInit, NgZone, OnDestroy, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import swal from 'sweetalert2';

export enum SelectionType {
  single = 'single',
  multi = 'multi',
  multiClick = 'multiClick',
  cell = 'cell',
  checkbox = 'checkbox'
}

@Component({
  selector: 'app-exhibits-list',
  templateUrl: './exhibits-list.component.html',
  styleUrls: ['./exhibits-list.component.scss']
})
export class ExhibitsListComponent implements OnInit {

  // Table
  tableEntries: number = 5;
  tableSelected: any[] = [];
  tableTemp = [];
  tableActiveRow: any;
  tableRows: any[] = []
  SelectionType = SelectionType;

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog-centered"
  };

  constructor(
    private zone: NgZone,
    private modalService: BsModalService,
  ) { }

  ngOnInit() {
    // this.getCharts()
    this.getData()
  }

  ngOnDestroy() {
  }

  getData() {
    let fakeData = [
      { 'zone': 'A', number: '1', 'item': 'Lobi', status: 'inactive' },
      { 'zone': 'A', number: '2', 'item': 'Bumi, Matahari dan Sistem Suria', status: 'inactive' },
      { 'zone': 'A', number: '3', 'item': 'Terokai Angkasa', status: 'active' },
      { 'zone': 'A', number: '4', 'item': 'Star Life Cycle', status: 'active' },
      { 'zone': 'A', number: '5', 'item': 'Alam Semesta', status: 'active' },
      { 'zone': 'B', number: '6', 'item': 'Lobi', status: 'active' },
      { 'zone': 'B', number: '7', 'item': 'Bumi, Matahari dan Sistem Suria', status: 'active' },
      { 'zone': 'B', number: '8', 'item': 'Terokai Angkasa', status: 'active' },
      { 'zone': 'B', number: '9', 'item': 'Star Life Cycle', status: 'active' },
      { 'zone': 'B', number: '10', 'item': 'Satelit', status: 'active' }
    ]

    this.tableRows = [...fakeData]
      this.tableTemp = this.tableRows.map((prop, key) => {
        return {
          ...prop,
          id: key
        };
      }
    );
  }

  entriesChange($event) {
    this.tableEntries = $event.target.value;
  }

  filterTable($event) {
    let val = $event.target.value;
    this.tableTemp = this.tableRows.filter(function (d) {
      for (var key in d) {
        if (d[key].toLowerCase().indexOf(val) !== -1) {
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

  openModal(modalRef: TemplateRef<any>) {
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide()
    // this.registerForm.reset()
  }

  confirm() {
    swal.fire({
      title: "Confirmation",
      text: "Are you sure to create this new user?",
      type: "info",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-info",
      confirmButtonText: "Simpan",
      showCancelButton: true,
      cancelButtonClass: "btn btn-outline-info",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.value) {
        // this.register()
      }
    })
  }

}
