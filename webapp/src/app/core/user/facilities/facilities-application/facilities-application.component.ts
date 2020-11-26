import { Component, OnInit, TemplateRef } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import swal from "sweetalert2";

import { EmailTemplatesService } from "src/app/shared/services/email-templates/email-templates.service";
import { FacilityBookingsService } from "src/app/shared/services/facility-bookings/facility-bookings.service";
import { FacilitiesService } from "src/app/shared/services/facilities/facilities.service";
import { UsersService } from "src/app/shared/services/users/users.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-facilities-application",
  templateUrl: "./facilities-application.component.html",
  styleUrls: ["./facilities-application.component.scss"],
})
export class FacilitiesApplicationComponent implements OnInit {
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
  };

  // FormGroup
  facilityFormGroup: FormGroup;

  // Dropdown
  facilities = [];
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
  bookingdays = [
    {
      value: "HALF",
      display_name: "Separuh Hari",
    },
    {
      value: "FULL",
      display_name: "Satu Hari",
    },
    {
      value: "NONE",
      display_name: "Tiada",
    },
  ];
  statuses = [
    {
      value: "AP",
      display_name: "Diterima",
    },
    {
      value: "IP",
      display_name: "Dalam proses",
    },
    {
      value: "RJ",
      display_name: "Ditolak",
    },
  ];

  constructor(
    public formBuilder: FormBuilder,
    private modalService: BsModalService,
    private emailtemplateService: EmailTemplatesService,
    private facilitybookingService: FacilityBookingsService,
    private facilityService: FacilitiesService,
    private userService: UsersService
  ) {
    this.getFacility();
    this.getUser();

    this.facilityFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      title: new FormControl(""),
      user_id: new FormControl(""),
      pic_id: new FormControl(""),
      facility_id: new FormControl(""),
      status: new FormControl(""),
      organisation_name: new FormControl(""),
      organisation_category: new FormControl(""),
      booking_date: new FormControl(""),
      booking_days: new FormControl(""),
      number_of_people: new FormControl(""),
      total_price: new FormControl(0.00),
    });
  }

  getFacility() {
    this.facilityService.get().subscribe(
      (res) => {
        console.log("res", res);
        this.facilities = res;
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
    this.facilitybookingService.extended().subscribe((res) => {
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
      this.facilityFormGroup.reset();
    } else if (process == "update") {
      this.facilityFormGroup.patchValue({
        ...row,
        user_id: row.user_id.id,
        pic_id: row.pic_id != null ? row.pic_id.id : null,
        facility_id: row.facility_id.id,
      });
    }
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
  }

  create() {
    this.facilitybookingService.post(this.facilityFormGroup.value).subscribe(
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
    this.facilitybookingService
      .update(this.facilityFormGroup.value, this.facilityFormGroup.value.id)
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

          this.sendmail(this.facilityFormGroup.value);
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

  delete(row) {
    swal
      .fire({
        title: "Buang data",
        text: "Adakah anda ingin membuang data ini?",
        type: "warning",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonClass: "btn btn-danger",
        confirmButtonText: "Ya",
        cancelButtonClass: "btn btn-secondary",
        cancelButtonText: "Tidak",
      })
      .then((result) => {
        if (result.value) {
          this.facilitybookingService.delete(row.id).subscribe(
            (res) => {
              console.log("res", res);
              swal.fire({
                title: "Proses Buang berjaya",
                text: "Data anda berjaya dibuang.",
                type: "success",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
              });
              this.getData();
            },
            (err) => {
              console.error("err", err);
              swal.fire({
                title: "Proses Buang tidak berjaya",
                text: "Data anda tidak berjaya dibuang. Sila cuba lagi.",
                type: "warning",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-warning",
              });
            }
          );
        }
      });
  }

  sendmail(row) {
    let user = this.users.filter((obj) => {
      return obj.id == row.user_id;
    });
    // AP : "Diterima"
    // IP : "Dalam proses"
    // RJ : "Ditolak"
    if (row.status == "AP") {
      let obj = {
        code: "EMEL04",
        to: user[0].email,
        context: null,
      };
      console.log("obj", obj);
      this.emailtemplateService.sending_mail(obj).subscribe(
        (res) => {
          console.log("res", res);
        },
        (err) => {
          console.error("err", err);
        }
      );
    } else if (row.status == "RJ") {
      let obj = {
        code: "EMEL05",
        to: user[0].email,
        context: null,
      };
      console.log("obj", obj);
      this.emailtemplateService.sending_mail(obj).subscribe(
        (res) => {
          console.log("res", res);
        },
        (err) => {
          console.error("err", err);
        }
      );
    }
  }

  getOrganisationCategory(value: string) {
    let result = this.organisationcategories.find((obj) => {
      return obj.value == value;
    });
    return result.display_name;
  }

  getBookingDay(value: string) {
    let result = this.bookingdays.find((obj) => {
      return obj.value == value;
    });
    return result.display_name;
  }
}
