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
import { UsersService } from "src/app/shared/services/users/users.service";
import { VisitApplicationsService } from "src/app/shared/services/visit-applications/visit-applications.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-visits-applications",
  templateUrl: "./visits-applications.component.html",
  styleUrls: ["./visits-applications.component.scss"],
})
export class VisitsApplicationsComponent implements OnInit {
  // Dropdown
  users = [];
  organisationcategories = [
    {
      value: "GV",
      display_name: "Kerajaan",
    },
    {
      value: "SC",
      display_name: "Sekolah",
    },
    {
      value: "UN",
      display_name: "Universiti",
    },
    {
      value: "NA",
      display_name: "Tiada",
    },
  ];

  // FormGroup
  visitappFormGroup: FormGroup;

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog",
    ignoreBackdropClick: true,
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
    private emailtemplateService: EmailTemplatesService,
    private userService: UsersService,
    private visitappService: VisitApplicationsService
  ) {
    this.getUser();

    this.visitappFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      organisation_name: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      organisation_category: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      visit_date: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      visit_time: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      total_participant: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      customer_id: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      pic_id: new FormControl(""),
      tour_guide: new FormControl(false, Validators.required),
      status: new FormControl(""),
      other_activities: new FormControl(""),
      document_link: new FormControl(""),
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
    this.visitappService.extended().subscribe((res) => {
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

  emptyFormGroup() {
    this.visitappFormGroup.patchValue({
      organisation_name: "",
      organisation_category: "",
      visit_date: "",
      visit_time: "",
      total_participant: "",
      customer_id: "",
      pic_id: "",
      tour_guide: "",
      status: "",
      other_activities: "",
      document_link: "",
    });
  }

  openModal(modalRef: TemplateRef<any>, process: string, row) {
    if (process == "create") {
      // this.visitappFormGroup.reset();
      this.emptyFormGroup();
    } else if (process == "update") {
      this.visitappFormGroup.patchValue({
        ...row,
        customer_id: row.customer_id ? row.customer_id.id : "",
        pic_id: row.pic_id ? row.pic_id.id : "",
        document_link: row.document_link ? row.document_link : "",
        tour_guide: row.tour_guide.toString(),
      });
    }
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
  }

  // Image Process
  onChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.visitappFormGroup.get("document_link").setValue(file);
    }
  }

  create() {
    const formData = new FormData();
    formData.append(
      "organisation_name",
      this.visitappFormGroup.value.organisation_name
    );
    formData.append(
      "organisation_category",
      this.visitappFormGroup.value.organisation_category
    );
    formData.append("visit_date", this.visitappFormGroup.value.visit_date);
    formData.append("visit_time", this.visitappFormGroup.value.visit_time);
    formData.append(
      "total_participant",
      this.visitappFormGroup.value.total_participant
    );
    formData.append("customer_id", this.visitappFormGroup.value.customer_id);
    formData.append("pic_id", this.visitappFormGroup.value.pic_id);
    formData.append("tour_guide", this.visitappFormGroup.value.tour_guide);
    formData.append("status", this.visitappFormGroup.value.status);
    formData.append(
      "other_activities",
      this.visitappFormGroup.value.other_activities
    );
    if (typeof this.visitappFormGroup.get("document_link").value != "string") {
      formData.append(
        "document_link",
        this.visitappFormGroup.get("document_link").value
      );
    }

    this.visitappService.post(formData).subscribe(
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
    const formData = new FormData();
    formData.append(
      "organisation_name",
      this.visitappFormGroup.value.organisation_name
    );
    formData.append(
      "organisation_category",
      this.visitappFormGroup.value.organisation_category
    );
    formData.append("visit_date", this.visitappFormGroup.value.visit_date);
    formData.append("visit_time", this.visitappFormGroup.value.visit_time);
    formData.append(
      "total_participant",
      this.visitappFormGroup.value.total_participant
    );
    formData.append("customer_id", this.visitappFormGroup.value.customer_id);
    formData.append("pic_id", this.visitappFormGroup.value.pic_id);
    formData.append("tour_guide", this.visitappFormGroup.value.tour_guide);
    formData.append("status", this.visitappFormGroup.value.status);
    formData.append(
      "other_activities",
      this.visitappFormGroup.value.other_activities
    );
    if (typeof this.visitappFormGroup.get("document_link").value != "string") {
      formData.append(
        "document_link",
        this.visitappFormGroup.get("document_link").value
      );
    }

    this.visitappService
      .update(formData, this.visitappFormGroup.value.id)
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

          // this.sendmail(this.visitappFormGroup.value);
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
          this.visitappService.delete(row.id).subscribe(
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

  verifyVisit(row) {
    swal
      .fire({
        title: "Pengesahan Lawatan",
        text: "Adakah anda ingin meluluskan permohonan lawatan ini?",
        icon: "warning",
        // showCancelButton: true,
        buttonsStyling: false,
        showDenyButton: true,
        customClass: {
          confirmButton: "btn btn-success",
          // cancelButton: "btn btn-danger",
          denyButton: "btn btn-danger",
        },
        confirmButtonText: "Ya",
        denyButtonText: "Tidak",
        // cancelButtonText: "Tidak",
        showCloseButton: true,
      })
      .then((result) => {
        if (result.isConfirmed == true) {
          // to accept the educational program application
          let objUpdate = {
            status: "AP",
          };
          this.visitappService.update(objUpdate, row.id).subscribe(
            (res) => {
              // console.log("res", res);
            },
            (err) => {
              console.error("err", err);
            },
            () => {
              this.getData();

              this.sweetAlertSuccess(
                "Diterima",
                "Anda telah menerima permohonan lawatan ini."
              );

              let objMail = {
                status: "AP",
                customer_id: row.customer_id.id,
              };

              this.sendmail(objMail);
            }
          );
        } else if (result.isDenied == true) {
          // to reject the educational program application
          let objUpdate = {
            status: "RJ",
          };
          this.visitappService.update(objUpdate, row.id).subscribe(
            (res) => {
              // console.log("res", res);
            },
            (err) => {
              console.error("err", err);
            },
            () => {
              this.getData();

              this.sweetAlertWarning(
                "Ditolak",
                "Anda telah menolak permohonan lawatan ini."
              );

              let objMail = {
                status: "RJ",
                customer_id: row.customer_id.id,
              };

              this.sendmail(objMail);
            }
          );
        }
      });
  }

  sweetAlertSuccess(title, text) {
    swal.fire({
      title,
      text,
      icon: "success",
      buttonsStyling: false,
      customClass: {
        confirmButton: "btn btn-success",
      },
    });
  }

  sweetAlertWarning(title, text) {
    swal.fire({
      title,
      text,
      icon: "warning",
      buttonsStyling: false,
      customClass: {
        confirmButton: "btn btn-warning",
      },
    });
  }

  sendmail(row) {
    let user = this.users.filter((obj) => {
      return obj.id == row.customer_id;
    });
    // AP : "Diterima"
    // IP : "Dalam proses"
    // RJ : "Ditolak"
    if (row.status == "AP") {
      let obj = {
        code: "EMEL10",
        to: user[0].email,
        context: null,
      };
      // console.log("obj", obj);
      this.emailtemplateService.sending_mail(obj).subscribe(
        (res) => {
          // console.log("res", res);
        },
        (err) => {
          console.error("err", err);
        }
      );
    } else if (row.status == "RJ") {
      let obj = {
        code: "EMEL11",
        to: user[0].email,
        context: null,
      };
      // console.log("obj", obj);
      this.emailtemplateService.sending_mail(obj).subscribe(
        (res) => {
          // console.log("res", res);
        },
        (err) => {
          console.error("err", err);
        }
      );
    }
  }
}
