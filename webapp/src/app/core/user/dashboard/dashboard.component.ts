import { Component, OnInit } from "@angular/core";

import { EducationalProgramApplicationsService } from "src/app/shared/services/educational-program-applications/educational-program-applications.service";
import { FacilityBookingsService } from "src/app/shared/services/facility-bookings/facility-bookings.service";

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

  constructor(
    private eduprogramappService: EducationalProgramApplicationsService,
    private facilitybookingService: FacilityBookingsService
  ) {
    this.getEduProgram();
    this.getFacility();
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

  ngOnInit() {}
}
