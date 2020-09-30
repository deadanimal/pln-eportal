import { Component, OnInit, TemplateRef } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import swal from "sweetalert2";

import { EducationalProgramApplicationsService } from "src/app/shared/services/educational-program-applications/educational-program-applications.service";
import { EducationalProgramsService } from "src/app/shared/services/educational-programs/educational-programs.service";
import { EducationalProgramDatesService } from "src/app/shared/services/educational-program-dates/educational-program-dates.service";
import { UsersService } from "src/app/shared/services/users/users.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-programs-application",
  templateUrl: "./programs-application.component.html",
  styleUrls: ["./programs-application.component.scss"],
})
export class ProgramsApplicationComponent implements OnInit {
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
  eduprogramappFormGroup: FormGroup;

  // Dropdown
  organisationcategories = [
    {
      value: "GV",
      display_name: "Government",
    },
    {
      value: "SC",
      display_name: "School",
    },
    {
      value: "UN",
      display_name: "University",
    },
    {
      value: "NA",
      display_name: "Not Available",
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
  programs = [];
  programdates = [];
  users = [];
  selectedProgramDates = [];

  constructor(
    public formBuilder: FormBuilder,
    private modalService: BsModalService,
    private eduprogramappService: EducationalProgramApplicationsService,
    private eduprogramService: EducationalProgramsService,
    private eduprogramdateService: EducationalProgramDatesService,
    private userService: UsersService
  ) {
    this.getProgram();
    this.getProgramDate();
    this.getUser();

    this.eduprogramappFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      organisation_name: new FormControl(""),
      organisation_category: new FormControl(""),
      customer_id: new FormControl(""),
      educational_program_id: new FormControl(""),
      educational_program_date_id: new FormControl(""),
      participant: new FormControl(""),
      status: new FormControl(""),
    });
  }

  getProgram() {
    this.eduprogramService.getAll().subscribe(
      (res) => {
        console.log("res", res);
        this.programs = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  getProgramDate() {
    this.eduprogramdateService.getAll().subscribe(
      (res) => {
        console.log("res", res);
        this.programdates = res;
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
    // this.getCharts()
    this.getData();
  }

  getData() {
    this.eduprogramappService.extended().subscribe((res) => {
      console.log("res", res);
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
      this.eduprogramappFormGroup.reset();
    } else if (process == "update") {
      this.eduprogramappFormGroup.patchValue({
        ...row,
        customer_id: row.customer_id.id,
        educational_program_id: row.educational_program_id.id,
        educational_program_date_id: row.educational_program_date_id.id,
      });
      this.changeProgram();
    }
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
  }

  create() {
    this.eduprogramappService.post(this.eduprogramappFormGroup.value).subscribe(
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
    this.eduprogramappService
      .update(
        this.eduprogramappFormGroup.value,
        this.eduprogramappFormGroup.value.id
      )
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

  changeProgram() {
    this.selectedProgramDates = this.programdates.filter((obj) => {
      return (
        obj.program_id ==
        this.eduprogramappFormGroup.value.educational_program_id
      );
    });
  }
}
