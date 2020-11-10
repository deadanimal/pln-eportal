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
  selector: "app-exhibits",
  templateUrl: "./exhibits.component.html",
  styleUrls: ["./exhibits.component.scss"],
})
export class ExhibitsComponent implements OnInit {
  // Data

  // Dropdown
  assets = [];
  statuses = [
    {
      value: "AV",
      display_name: "Aktif",
    },
    {
      value: "NA",
      display_name: "Tidak aktif",
    },
  ];
  users = [];
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

  // FormGroup
  exhibitFormGroup: FormGroup;

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog-centered",
  };

  // Quill
  modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ["clean"], // remove formatting button
    ],
  };

  // Table
  tableEntries: number = 5;
  tableSelected: any[] = [];
  tableTemp = [];
  tableActiveRow: any;
  tableRows: any[] = [];
  SelectionType = SelectionType;

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
      // asset_id: new FormControl(""),
      equipment: new FormControl(""),
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
    this.exhibitService.extended().subscribe(
      (res) => {
        console.log("res", res);
        this.tableRows = res;
        this.tableTemp = this.tableRows.map((prop, key) => {
          return {
            ...prop,
            no: key,
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
        asset_id: row.asset_id ? row.asset_id.id : "",
        pic_id: row.pic_id ? row.pic_id.id : "",
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
    console.log(this.exhibitFormGroup.value);
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

  getZone(value: string) {
    let result = this.zones.find((obj) => {
      return obj.value == value;
    });
    return result.display_name;
  }
}
