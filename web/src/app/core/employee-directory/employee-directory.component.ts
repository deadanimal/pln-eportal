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

  // Dropdown
  departments = [
    {
      value: "PPP",
      display_name: "Pejabat Pengarah Planetarium Negara",
    },
    {
      value: "UPA",
      display_name: "Unit Perhubungan Awam",
    },
    {
      value: "SPP",
      display_name: "Seksyen Pendidikan - Pameran",
    },
    {
      value: "SPC",
      display_name: "Seksyen Pendidikan - Pencerapan",
    },
    {
      value: "SPB",
      display_name: "Seksyen Pendidikan - Pembudayaan",
    },
    {
      value: "UTK",
      display_name: "Unit Teknikal",
    },
    {
      value: "SPK",
      display_name: "Seksyen Perkhidmatan",
    },
    {
      value: "UKW",
      display_name: "Unit Kewangan",
    },
    {
      value: "UTM",
      display_name: "Unit Teknologi Maklumat",
    },
    {
      value: "UPF",
      display_name: "Unit Pengurusan Fasiliti",
    },
    {
      value: "UPT",
      display_name: "Unit Pentadbiran",
    },
  ];

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

  getDepartment(value: string) {
    let result = this.departments.find((obj) => {
      return obj.value == value;
    });
    return result.display_name;
  }
}
