import { Component, OnInit, TemplateRef } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import swal from "sweetalert2";

import { EmailTemplatesService } from "src/app/shared/services/email-templates/email-templates.service";
import { FeedbacksService } from "src/app/shared/services/feedbacks/feedbacks.service";
import { UsersService } from "src/app/shared/services/users/users.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-feedbacks-list",
  templateUrl: "./feedbacks-list.component.html",
  styleUrls: ["./feedbacks-list.component.scss"],
})
export class FeedbacksListComponent implements OnInit {
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
  feedbackFormGroup: FormGroup;

  // Dropdown
  users = [];
  modules = [
    {
      value: "simulator-ride",
      display_name: "Kembara Simulasi",
    },
    {
      value: "shows",
      display_name: "Tayangan",
    },
    {
      value: "exhibit",
      display_name: "Pameran",
    },
    {
      value: "visit",
      display_name: "Lawatan",
    },
    {
      value: "program",
      display_name: "Program Pendidikan",
    },
    {
      value: "facility",
      display_name: "Fasiliti",
    },
    {
      value: "publication",
      display_name: "Penerbitan",
    },
    {
      value: "virtual-library",
      display_name: "Kutubkhanah Mini",
    },
  ];

  constructor(
    public formBuilder: FormBuilder,
    private modalService: BsModalService,
    private emailtemplateService: EmailTemplatesService,
    private feedbackService: FeedbacksService,
    private userService: UsersService
  ) {
    this.getUser();

    this.feedbackFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      comment_user: new FormControl(""),
      comment_admin: new FormControl(""),
      module: new FormControl(""),
      display: new FormControl(false),
      user_id: new FormControl(""),
      status: new FormControl(false),
    });
  }

  getUser() {
    this.userService.getAll().subscribe(
      (res) => {
        // console.log("res", res);
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
    this.feedbackService.extended().subscribe((res) => {
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
      this.feedbackFormGroup.reset();
    } else if (process == "update") {
      this.feedbackFormGroup.patchValue({
        ...row,
        user_id: row.user_id.id,
        display: row.display.toString(),
      });
    }
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
  }

  create() {
    this.feedbackService.post(this.feedbackFormGroup.value).subscribe(
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

  update() {
    this.feedbackService
      .update(this.feedbackFormGroup.value, this.feedbackFormGroup.value.id)
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
          this.feedbackService.delete(row.id).subscribe(
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

  reply(row) {
    let obj = {
      code: "EMEL02",
      to: row.user_id.email,
      context: JSON.stringify({
        comment_admin: row.comment_admin,
        full_name: row.user_id.full_name,
      }),
    };
    this.emailtemplateService.sending_mail(obj).subscribe(
      (res) => {
        // console.log("res", res);
        this.feedbackFormGroup.patchValue({
          ...row,
          user_id: row.user_id.id,
          status: true,
        });
        this.feedbackService
          .update(this.feedbackFormGroup.value, row.id)
          .subscribe(
            (res) => {
              // console.log("res", res);
              swal
                .fire({
                  title: "Berjaya",
                  text:
                    "Anda berjaya membalas maklum balas pengguna. Terima Kasih",
                  icon: "success",
                  buttonsStyling: false,
                  customClass: {
                    confirmButton: "btn btn-success",
                  },
                })
                .then((result) => {
                  if (result.value) {
                    this.getData();
                  }
                });
            },
            (err) => {
              console.error("err", err);
            }
          );
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  getModule(value: string) {
    let result = this.modules.find((obj) => {
      return obj.value == value;
    });
    return result.display_name;
  }
}
