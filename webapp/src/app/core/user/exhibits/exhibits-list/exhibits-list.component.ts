import { Component, OnInit, TemplateRef } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import swal from "sweetalert2";

import { ExhibitsService } from "src/app/shared/services/exhibits/exhibits.service";
import { AssetsService } from "src/app/shared/services/assets/assets.service";
import { UsersService } from "src/app/shared/services/users/users.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-exhibits-list",
  templateUrl: "./exhibits-list.component.html",
  styleUrls: ["./exhibits-list.component.scss"],
})
export class ExhibitsListComponent implements OnInit {
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
  exhibitFormGroup: FormGroup;

  // Dropdown
  assets = [];
  statuses = [];
  users = [];
  zones = [];

  constructor(
    public formBuilder: FormBuilder,
    private modalService: BsModalService,
    private exhibitService: ExhibitsService,
    private assetService: AssetsService,
    private userService: UsersService
  ) {
    this.getAsset();
    this.getUser();

    this.exhibitFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      name: new FormControl(""),
      description: new FormControl(""),
      // image_link: new FormControl(""),
      zone: new FormControl(""),
      pic_id: new FormControl(""),
      asset_id: new FormControl(""),
      // qrcode: new FormControl(""),
      status: new FormControl(""),
    });
  }

  getAsset() {
    this.assetService.get().subscribe(
      (res) => {
        console.log("res", res);
        this.assets = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  getUser() {
    this.userService.getAll().subscribe(
      (res) => {
        console.log("res", res);
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
    // let fakeData = [
    //   { zone: "A", number: "1", item: "Lobi", status: "inactive" },
    //   {
    //     zone: "A",
    //     number: "2",
    //     item: "Bumi, Matahari dan Sistem Suria",
    //     status: "inactive",
    //   },
    //   { zone: "A", number: "3", item: "Terokai Angkasa", status: "active" },
    //   { zone: "A", number: "4", item: "Star Life Cycle", status: "active" },
    //   { zone: "A", number: "5", item: "Alam Semesta", status: "active" },
    //   { zone: "B", number: "6", item: "Lobi", status: "active" },
    //   {
    //     zone: "B",
    //     number: "7",
    //     item: "Bumi, Matahari dan Sistem Suria",
    //     status: "active",
    //   },
    //   { zone: "B", number: "8", item: "Terokai Angkasa", status: "active" },
    //   { zone: "B", number: "9", item: "Star Life Cycle", status: "active" },
    //   { zone: "B", number: "10", item: "Satelit", status: "active" },
    // ];

    // this.tableRows = [...fakeData];
    // this.tableTemp = this.tableRows.map((prop, key) => {
    //   return {
    //     ...prop,
    //     id: key,
    //   };
    // });
    this.exhibitService.get().subscribe(
      (res) => {
        console.log("res", res);
        this.tableRows = res;
        this.tableTemp = this.tableRows.map((prop, key) => {
          return {
            ...prop,
            id: key,
          };
        });
      },
      (err) => {
        console.error("err", err);
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
      this.exhibitFormGroup.reset();
    } else if (process == "update") {
      this.exhibitFormGroup.patchValue({
        ...row,
        asset_id: row.asset_id.id,
        pic_id: row.pic_id.id,
      });
    }
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
  }

  create() {
    this.exhibitService.post(this.exhibitFormGroup.value).subscribe(
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
    this.exhibitService
      .update(this.exhibitFormGroup.value, this.exhibitFormGroup.value.id)
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
}
