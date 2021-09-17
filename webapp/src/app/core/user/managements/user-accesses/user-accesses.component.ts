import { Component, OnInit, TemplateRef } from "@angular/core";
import {
  Validators,
  FormArray,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import swal from "sweetalert2";

import { UserAccessesService } from "src/app/shared/services/user-accesses/user-accesses.service";
import { MenusService } from "src/app/shared/services/menus/menus.service";
import { RolesService } from "src/app/shared/services/roles/roles.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-user-accesses",
  templateUrl: "./user-accesses.component.html",
  styleUrls: ["./user-accesses.component.scss"],
})
export class UserAccessesComponent implements OnInit {
  // Data
  menus = [];
  menuExists = [];
  menuNews = [];
  roles = [];

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
    ignoreBackdropClick: true,
  };

  // FormGroup
  menuroleFormGroup: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private modalService: BsModalService,
    private useraccessService: UserAccessesService,
    private menuService: MenusService,
    private roleService: RolesService
  ) {
    this.menuroleFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      menu: new FormControl(""),
      role: new FormControl("", Validators.compose([Validators.required])),
      menuArray: this.formBuilder.array(
        [],
        Validators.compose([Validators.required])
      ),
    });
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    if (this.tableRows.length > 0) this.tableRows = [];
    this.useraccessService.extended("").subscribe((res) => {
      this.tableRows = res;
      this.tableTemp = this.tableRows.map((prop, key) => {
        return {
          ...prop,
          no: key,
        };
      });
    });

    this.menuService.filter("active=true").subscribe(
      (res) => {
        // console.log("res", res);
        res.forEach((obj) => {
          if ((obj.type == "link" && obj.mainmenu == "") || obj.type == "sub") {
            this.menus.push(obj);
          }
        });
      },
      (err) => {
        console.error("err", err);
      }
    );

    this.roleService.get().subscribe(
      (res) => {
        // console.log("res", res);
        res.forEach((obj) => {
          if (obj.code != "CS") this.roles.push(obj);
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

  emptyFormGroup() {
    this.menuroleFormGroup.patchValue({
      id: "",
      menu: "",
      role: "",
    });
  }

  openModal(modalRef: TemplateRef<any>, process: string, row) {
    if (process == "create") {
      this.emptyFormGroup();
    } else if (process == "update") {
      this.menuroleFormGroup.patchValue({
        ...row,
        menu: row.menu.id,
        role: row.role.id,
      });
    }
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
  }

  create() {
    for (let i = 0; i < this.menuroleFormGroup.value.menuArray.length; i++) {
      let role = this.menuroleFormGroup.value.role;
      let menu = this.menuroleFormGroup.value.menuArray[i];

      let result = this.tableRows.find((obj) => {
        return obj.role.id == role && obj.menu.id == menu;
      });

      if (!result) {
        // to insert new data into database
        let body = {
          menu,
          role,
        };
        this.useraccessService.post(body).subscribe(
          (res) => {
            // console.log("res", res);
          },
          (err) => {
            console.error("err", err);
          }
        );
      } else {
        // console.log("ada", role, menu);
      }

      if (i === this.menuroleFormGroup.value.menuArray.length - 1) {
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
              window.location.reload();
            }
          });
      }
    }

    /* this.useraccessService.post(this.menuroleFormGroup.value).subscribe(
      (res) => {
        // console.log("res", res);
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
              window.location.reload();
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
    ); */
  }

  update() {
    this.useraccessService
      .update(this.menuroleFormGroup.value.id, this.menuroleFormGroup.value)
      .subscribe(
        (res) => {
          // console.log("res", res);
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
                window.location.reload();
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
          this.useraccessService.delete(row.id).subscribe(
            (res) => {
              // console.log("res", res);
              swal.fire({
                title: "Proses Buang berjaya",
                text: "Data anda berjaya dibuang.",
                icon: "success",
                buttonsStyling: false,
                customClass: {
                  confirmButton: "btn btn-success",
                },
              });
              window.location.reload();
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

  selectChange() {
    const menuArray: FormArray = this.menuroleFormGroup.get(
      "menuArray"
    ) as FormArray;

    let result = this.tableRows.filter((obj) => {
      return obj.role.id == this.menuroleFormGroup.value.role;
    });
    if (result) {
      result.forEach((obj) => {
        menuArray.push(new FormControl(obj.menu.id));
      });
    }
  }

  onCheckboxChange(e) {
    const menuArray: FormArray = this.menuroleFormGroup.get(
      "menuArray"
    ) as FormArray;

    if (e.target.checked) {
      menuArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      menuArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          menuArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
}
