import { Component, OnInit } from "@angular/core";

import { EmployeeDirectoriesService } from "src/app/shared/services/employee-directories/employee-directories.service";

@Component({
  selector: "app-employee-directory",
  templateUrl: "./employee-directory.component.html",
  styleUrls: ["./employee-directory.component.scss"],
})
export class EmployeeDirectoryComponent implements OnInit {
  // Data
  employeedirectories = [];

  constructor(private employeedirectoryService: EmployeeDirectoriesService) {
    this.getEmployeeDirectory();
  }

  getEmployeeDirectory() {
    this.employeedirectoryService.filter("status=true").subscribe(
      (res) => {
        console.log("res", res);
        this.employeedirectories = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  ngOnInit() {}
}
