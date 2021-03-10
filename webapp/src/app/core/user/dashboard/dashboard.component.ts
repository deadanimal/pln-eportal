import { Component, OnInit } from "@angular/core";

import { EducationalProgramApplicationsService } from "src/app/shared/services/educational-program-applications/educational-program-applications.service";
import { FacilityBookingsService } from "src/app/shared/services/facility-bookings/facility-bookings.service";
import { PublicationsService } from "src/app/shared/services/publications/publications.service";
import { VirtualLibraryArticlesService } from "src/app/shared/services/virtual-library-articles/virtual-library-articles.service";
import { VirtualLibraryBooksService } from "src/app/shared/services/virtual-library-books/virtual-library-books.service";
import { VirtualLibrarySerialpublicationsService } from "src/app/shared/services/virtual-library-serialpublications/virtual-library-serialpublications.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  // Data
  eduprogramsignup = [];
  eduprogramattend = [];
  facilitynew = [];
  facilityaccept = [];
  facilityreject = [];
  today = new Date();
  totaldownloadpdfpublication: number = 0;
  totaldownloadpdfarticle: number = 0;
  totaldownloadpdfbook: number = 0;
  totaldownloadpdfserialpublication: number = 0;

  constructor(
    private eduprogramappService: EducationalProgramApplicationsService,
    private facilitybookingService: FacilityBookingsService,
    private publicationService: PublicationsService,
    private vlarticleService: VirtualLibraryArticlesService,
    private vlbookService: VirtualLibraryBooksService,
    private vlserialpublicationService: VirtualLibrarySerialpublicationsService,
  ) {
    this.getEduProgram();
    this.getFacility();
    this.getTotalDownloadPdf();
  }

  getEduProgram() {
    this.eduprogramappService.get().subscribe(
      (res) => {
        // console.log("res", res);
        this.eduprogramsignup = res.filter((obj) => {
          return obj.status == "IP";
        });
        this.eduprogramattend = res.filter((obj) => {
          return obj.status == "AP";
        });
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  getFacility() {
    this.facilitybookingService.get().subscribe(
      (res) => {
        // console.log("res", res);
        this.facilitynew = res.filter((obj) => {
          return obj.status == "IP";
        });
        this.facilityaccept = res.filter((obj) => {
          return obj.status == "AP";
        });
        this.facilityreject = res.filter((obj) => {
          return obj.status == "RJ";
        });
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  getTotalDownloadPdf() {
    this.publicationService.get_total_download_pdf().subscribe(
      (res) => {
        // console.log("res", res);
        this.totaldownloadpdfpublication = res['total_download_pdf'];
      },
      (err) => {
        console.error("err", err);
      }
    );

    this.vlarticleService.get_total_download_pdf().subscribe(
      (res) => {
        // console.log("res", res);
        this.totaldownloadpdfarticle = res['total_download_pdf'];
      },
      (err) => {
        console.error("err", err);
      }
    );

    this.vlbookService.get_total_download_pdf().subscribe(
      (res) => {
        // console.log("res", res);
        this.totaldownloadpdfbook = res['total_download_pdf'];
      },
      (err) => {
        console.error("err", err);
      }
    );

    this.vlserialpublicationService.get_total_download_pdf().subscribe(
      (res) => {
        // console.log("res", res);
        this.totaldownloadpdfserialpublication = res['total_download_pdf'];
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  ngOnInit() {}
}
