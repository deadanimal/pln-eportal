import { Component, OnInit, TemplateRef } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import swal from "sweetalert2";

import { UsersService } from "src/app/shared/services/users/users.service";
import { VenuesService } from "src/app/shared/services/venues/venues.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-venues",
  templateUrl: "./venues.component.html",
  styleUrls: ["./venues.component.scss"],
})
export class VenuesComponent implements OnInit {
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
    class: "modal-dialog-centered",
  };

  // FormGroup
  venueFormGroup: FormGroup;

  // Dropdown
  zones = [
    {
      value: "A",
      display_name: "Zon A - Alam Semesta",
    },
    {
      value: "B",
      display_name: "Zon B - Ruang Kanak-kanak",
    },
    {
      value: "C",
      display_name: "Zon C - Teknologi Satelit",
    },
    {
      value: "D",
      display_name: "Zon D - Misi Angkasa",
    },
    {
      value: "E",
      display_name: "Zon E - Sistem Solar",
    },
    {
      value: "F",
      display_name: "Zon F - Gelombang",
    },
    {
      value: "G",
      display_name: "Zon G - Balai Cerap",
    },
    {
      value: "H",
      display_name: "Zon H - Menara Pemandangan",
    },
  ];

  constructor(
    public formBuilder: FormBuilder,
    private modalService: BsModalService,
    private userService: UsersService,
    private venueService: VenuesService
  ) {
    this.venueFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      name: new FormControl(""),
      location: new FormControl(""),
      max_capacity: new FormControl(""),
      zone: new FormControl(""),
    });
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.venueService.get().subscribe((res) => {
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
      this.venueFormGroup.reset();
    } else if (process == "update") {
      this.venueFormGroup.patchValue({
        ...row,
      });
    }
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
  }

  create() {
    this.venueService.post(this.venueFormGroup.value).subscribe(
      (res) => {
        console.log("res", res);
        swal
          .fire({
            title: "Berjaya",
            text: "Data anda berjaya disimpan.",
            type: "success",
            buttonsStyling: false,
            confirmButtonClass: "btn btn-success",
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
            type: "warning",
            buttonsStyling: false,
            confirmButtonClass: "btn btn-warning",
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
    this.venueService
      .update(this.venueFormGroup.value, this.venueFormGroup.value.id)
      .subscribe(
        (res) => {
          console.log("res", res);
          swal
            .fire({
              title: "Berjaya",
              text: "Data anda berjaya dikemaskini.",
              type: "success",
              buttonsStyling: false,
              confirmButtonClass: "btn btn-success",
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
              type: "warning",
              buttonsStyling: false,
              confirmButtonClass: "btn btn-warning",
            })
            .then((result) => {
              if (result.value) {
                // this.modal.hide();
              }
            });
        }
      );
  }

  getZone(value: string) {
    let result = this.zones.find((obj) => {
      return obj.value == value;
    });
    return result.display_name;
  }
}
