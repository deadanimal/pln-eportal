import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { ExhibitsService } from "src/app/shared/services/exhibits/exhibits.service";
import { ExhibitListsService } from "src/app/shared/services/exhibit-lists/exhibit-lists.service";

@Component({
  selector: "app-exhibit-lists",
  templateUrl: "./exhibit-lists.component.html",
  styleUrls: ["./exhibit-lists.component.scss"],
})
export class ExhibitListsComponent implements OnInit {
  exhibitlists = [
    // {
    //   title: "Langit & kita",
    //   description: "",
    //   img: "../../../assets/img/exhibit/langit-kita.jpeg",
    // },
    // {
    //   title: "Anti graviti",
    //   description: "",
    //   img: "../../../assets/img/exhibit/anti-graviti.jpeg",
    // },
    // {
    //   title: "Replika ahli falak",
    //   description: "",
    //   img: "../../../assets/img/exhibit/replika-ahli-falak.jpeg",
    // },
    // {
    //   title: "Spacepod",
    //   description: "",
    //   img: "../../../assets/img/exhibit/kembara-simulasi.jpeg",
    // },
  ];
  zone: string = "";

  constructor(
    private route: ActivatedRoute,
    private exhibitService: ExhibitsService,
    private exhibitlistService: ExhibitListsService
  ) {
    this.zone = this.route.snapshot.paramMap.get("zone");
    this.getExhibitList();
  }

  getExhibitList() {
    this.exhibitService.filter("zone=" + this.zone).subscribe(
      (res) => {
        console.log("res", res);
        if (res.length > 0) {
          this.exhibitlistService.filter("exhibit_id=" + res[0].id).subscribe(
            (res) => {
              console.log("res", res);
              this.exhibitlists = res;
            },
            (err) => {
              console.error("err", err);
            }
          );
        }
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  ngOnInit() {}
}
