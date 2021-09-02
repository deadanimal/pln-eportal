import { Component, OnInit, TemplateRef } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import swal from "sweetalert2";

import { AnnouncementsService } from "src/app/shared/services/announcements/announcements.service";
import { BannersService } from "src/app/shared/services/banners/banners.service";
import { CalendarsService } from "src/app/shared/services/calendars/calendars.service";
import { CloseBookingsService } from "src/app/shared/services/close-bookings/close-bookings.service";
import { DynamicContentsService } from "src/app/shared/services/dynamic-contents/dynamic-contents.service";
import { EducationalProgramsService } from "src/app/shared/services/educational-programs/educational-programs.service";
import { EmailTemplatesService } from "src/app/shared/services/email-templates/email-templates.service";
import { EmployeeDirectoriesService } from "src/app/shared/services/employee-directories/employee-directories.service";
import { ExhibitsService } from "src/app/shared/services/exhibits/exhibits.service";
import { FacilitiesService } from "src/app/shared/services/facilities/facilities.service";
import { FaqsService } from "src/app/shared/services/faqs/faqs.service";
import { FeedbacksService } from "src/app/shared/services/feedbacks/feedbacks.service";
import { FpxTransactionsService } from "src/app/shared/services/fpx-transactions/fpx-transactions.service";
import { ModulesService } from "src/app/shared/services/modules/modules.service";
import { PartnersService } from "src/app/shared/services/partners/partners.service";
import { PublicationsService } from "src/app/shared/services/publications/publications.service";
import { QuickLinksService } from "src/app/shared/services/quick-links/quick-links.service";
import { ShowingsService } from "src/app/shared/services/showings/showings.service";
import { SimulatorRidesService } from "src/app/shared/services/simulator-rides/simulator-rides.service";
import { SupervisorsService } from "src/app/shared/services/supervisors/supervisors.service";
import { SurveyQuestionsService } from "src/app/shared/services/survey-questions/survey-questions.service";
import { UsersService } from "src/app/shared/services/users/users.service";
import { VenuesService } from "src/app/shared/services/venues/venues.service";
import { VirtualLibraryCategoriesService } from "src/app/shared/services/virtual-library-categories/virtual-library-categories.service";
import { VisitsService } from "src/app/shared/services/visits/visits.service";
import { WhatisinterestingsService } from "src/app/shared/services/whatisinterestings/whatisinterestings.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-audit-logs",
  templateUrl: "./audit-logs.component.html",
  styleUrls: ["./audit-logs.component.scss"],
})
export class AuditLogsComponent implements OnInit {
  // history_user: the user that made the create/update/delete
  // history_date: the datetime at which the create/update/delete occurred
  // history_change_reason: the reason the create/update/delete occurred (null by default)
  // history_id: the primary key for the historical table (note the base table’s primary key is not unique on the historical table since there are multiple versions of it on the historical table)
  // history_type: + for create, ~ for update, and - for delete

  // Data
  module = "";

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

  // Dropdown
  /*
  transaksi
  */
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
      value: "facility",
      display_name: "Fasiliti",
    },
    {
      value: "program",
      display_name: "Program Pendidikan",
    },
    {
      value: "visit",
      display_name: "Lawatan",
    },
    {
      value: "exhibit",
      display_name: "Pameran",
    },
    {
      value: "virtual-library",
      display_name: "Kutubkhanah Mini",
    },
    {
      value: "publication",
      display_name: "Penerbitan",
    },
    {
      value: "survey",
      display_name: "Soal Selidik",
    },
    {
      value: "feedback",
      display_name: "Maklum Balas",
    },
    {
      value: "fpx",
      display_name: "FPX",
    },
    {
      value: "module",
      display_name: "Modul",
    },
    {
      value: "venue",
      display_name: "Tempat",
    },
    {
      value: "what-is-interesting",
      display_name: "Apa Yang Menarik",
    },
    {
      value: "dynamic-content",
      display_name: "Kandungan Dinamik",
    },
    {
      value: "banner",
      display_name: "Banner",
    },
    {
      value: "employee-directory",
      display_name: "Direktori Pegawai",
    },
    {
      value: "faq",
      display_name: "FAQ",
    },
    {
      value: "quick-link",
      display_name: "Pautan Pantas",
    },
    {
      value: "announcement",
      display_name: "Pengumuman",
    },
    {
      value: "partner",
      display_name: "Rakan Kerjasama",
    },
    {
      value: "close-booking",
      display_name: "Penutupan Tempahan",
    },
    {
      value: "calendar",
      display_name: "Kalendar",
    },
    {
      value: "user",
      display_name: "Pengguna & Pelanggan",
    },
    {
      value: "supervisor",
      display_name: "Penyelia",
    },
    {
      value: "email-template",
      display_name: "Templet Emel",
    },
  ];

  constructor(
    public formBuilder: FormBuilder,
    private modalService: BsModalService,
    private announcementService: AnnouncementsService,
    private bannerService: BannersService,
    private calendarService: CalendarsService,
    private closebookingService: CloseBookingsService,
    private dynamiccontentService: DynamicContentsService,
    private eduprogramService: EducationalProgramsService,
    private emailtemplateService: EmailTemplatesService,
    private employeedirectoryService: EmployeeDirectoriesService,
    private exhibitService: ExhibitsService,
    private facilityService: FacilitiesService,
    private faqService: FaqsService,
    private feedbackService: FeedbacksService,
    private fpxtransactionService: FpxTransactionsService,
    private moduleService: ModulesService,
    private partnerService: PartnersService,
    private publicationService: PublicationsService,
    private quicklinkService: QuickLinksService,
    private showingService: ShowingsService,
    private simulatorrideService: SimulatorRidesService,
    private supervisorService: SupervisorsService,
    private surveyquestionService: SurveyQuestionsService,
    private userService: UsersService,
    private venueService: VenuesService,
    private vlcategoryService: VirtualLibraryCategoriesService,
    private visitService: VisitsService,
    private whatisinterestingService: WhatisinterestingsService
  ) {}

  ngOnInit() {}

  getData() {
    if (this.tableRows.length > 0) this.tableRows = [];

    if (this.module == "shows") {
      this.showingService.getAuditLog().subscribe(
        (res) => {
          // console.log("res", res);
          this.setDatatable(res);
        },
        (err) => {
          console.error("err", err);
        }
      );
    } else if (this.module == "simulator-ride") {
      this.simulatorrideService.getAuditLog().subscribe(
        (res) => {
          // console.log("res", res);
          this.setDatatable(res);
        },
        (err) => {
          console.error("err", err);
        }
      );
    } else if (this.module == "facility") {
      this.facilityService.getAuditLog().subscribe(
        (res) => {
          // console.log("res", res);
          this.setDatatable(res);
        },
        (err) => {
          console.error("err", err);
        }
      );
    } else if (this.module == "program") {
      this.eduprogramService.getAuditLog().subscribe(
        (res) => {
          // console.log("res", res);
          this.setDatatable(res);
        },
        (err) => {
          console.error("err", err);
        }
      );
    } else if (this.module == "visit") {
      this.visitService.getAuditLog().subscribe(
        (res) => {
          // console.log("res", res);
          this.setDatatable(res);
        },
        (err) => {
          console.error("err", err);
        }
      );
    } else if (this.module == "exhibit") {
      this.exhibitService.getAuditLog().subscribe(
        (res) => {
          // console.log("res", res);
          this.setDatatable(res);
        },
        (err) => {
          console.error("err", err);
        }
      );
    } else if (this.module == "virtual-library") {
      this.vlcategoryService.getAuditLog().subscribe(
        (res) => {
          // console.log("res", res);
          this.setDatatable(res);
        },
        (err) => {
          console.error("err", err);
        }
      );
    } else if (this.module == "publication") {
      this.publicationService.getAuditLog().subscribe(
        (res) => {
          // console.log("res", res);
          this.setDatatable(res);
        },
        (err) => {
          console.error("err", err);
        }
      );
    } else if (this.module == "survey") {
      this.surveyquestionService.getAuditLog().subscribe(
        (res) => {
          // console.log("res", res);
          this.setDatatable(res);
        },
        (err) => {
          console.error("err", err);
        }
      );
    } else if (this.module == "feedback") {
      this.feedbackService.getAuditLog().subscribe(
        (res) => {
          // console.log("res", res);
          this.setDatatable(res);
        },
        (err) => {
          console.error("err", err);
        }
      );
    } else if (this.module == "fpx") {
      this.fpxtransactionService.getAuditLog().subscribe(
        (res) => {
          // console.log("res", res);
          this.setDatatable(res);
        },
        (err) => {
          console.error("err", err);
        }
      );
    } else if (this.module == "module") {
      this.moduleService.getAuditLog().subscribe(
        (res) => {
          // console.log("res", res);
          this.setDatatable(res);
        },
        (err) => {
          console.error("err", err);
        }
      );
    } else if (this.module == "venue") {
      this.venueService.getAuditLog().subscribe(
        (res) => {
          // console.log("res", res);
          this.setDatatable(res);
        },
        (err) => {
          console.error("err", err);
        }
      );
    } else if (this.module == "what-is-interesting") {
      this.whatisinterestingService.getAuditLog().subscribe(
        (res) => {
          // console.log("res", res);
          this.setDatatable(res);
        },
        (err) => {
          console.error("err", err);
        }
      );
    } else if (this.module == "dynamic-content") {
      this.dynamiccontentService.getAuditLog().subscribe(
        (res) => {
          // console.log("res", res);
          this.setDatatable(res);
        },
        (err) => {
          console.error("err", err);
        }
      );
    } else if (this.module == "banner") {
      this.bannerService.getAuditLog().subscribe(
        (res) => {
          // console.log("res", res);
          this.setDatatable(res);
        },
        (err) => {
          console.error("err", err);
        }
      );
    } else if (this.module == "employee-directory") {
      this.employeedirectoryService.getAuditLog().subscribe(
        (res) => {
          // console.log("res", res);
          this.setDatatable(res);
        },
        (err) => {
          console.error("err", err);
        }
      );
    } else if (this.module == "faq") {
      this.faqService.getAuditLog().subscribe(
        (res) => {
          // console.log("res", res);
          this.setDatatable(res);
        },
        (err) => {
          console.error("err", err);
        }
      );
    } else if (this.module == "quick-link") {
      this.quicklinkService.getAuditLog().subscribe(
        (res) => {
          // console.log("res", res);
          this.setDatatable(res);
        },
        (err) => {
          console.error("err", err);
        }
      );
    } else if (this.module == "announcement") {
      this.announcementService.getAuditLog().subscribe(
        (res) => {
          // console.log("res", res);
          this.setDatatable(res);
        },
        (err) => {
          console.error("err", err);
        }
      );
    } else if (this.module == "partner") {
      this.partnerService.getAuditLog().subscribe(
        (res) => {
          // console.log("res", res);
          this.setDatatable(res);
        },
        (err) => {
          console.error("err", err);
        }
      );
    } else if (this.module == "close-booking") {
      this.closebookingService.getAuditLog().subscribe(
        (res) => {
          // console.log("res", res);
          this.setDatatable(res);
        },
        (err) => {
          console.error("err", err);
        }
      );
    } else if (this.module == "calendar") {
      this.calendarService.getAuditLog().subscribe(
        (res) => {
          // console.log("res", res);
          this.setDatatable(res);
        },
        (err) => {
          console.error("err", err);
        }
      );
    } else if (this.module == "user") {
      this.userService.getAuditLog().subscribe(
        (res) => {
          // console.log("res", res);
          this.setDatatable(res);
        },
        (err) => {
          console.error("err", err);
        }
      );
    } else if (this.module == "supervisor") {
      this.supervisorService.getAuditLog().subscribe(
        (res) => {
          // console.log("res", res);
          this.setDatatable(res);
        },
        (err) => {
          console.error("err", err);
        }
      );
    } else if (this.module == "email-template") {
      this.emailtemplateService.getAuditLog().subscribe(
        (res) => {
          // console.log("res", res);
          this.setDatatable(res);
        },
        (err) => {
          console.error("err", err);
        }
      );
    }
  }

  setDatatable(res) {
    if (res.length > 0) {
      this.tableRows = res;
      this.tableTemp = this.tableRows.map((prop, key) => {
        return {
          ...prop,
          no: key + 1,
        };
      });
    } else {
      swal.fire({
        title: "Hasil carian",
        text: "Carian anda tidak menemui sebarang data.",
        icon: "info",
        buttonsStyling: false,
        customClass: {
          confirmButton: "btn btn-info",
        },
      });
    }
  }

  resetData() {
    this.module = "";
    this.tableRows = [];
    this.tableTemp = [];
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
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
  }
}
