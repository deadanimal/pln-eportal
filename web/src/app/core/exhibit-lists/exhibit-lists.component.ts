import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-exhibit-lists",
  templateUrl: "./exhibit-lists.component.html",
  styleUrls: ["./exhibit-lists.component.scss"],
})
export class ExhibitListsComponent implements OnInit {
  exhibits = [
    {
      title: "Langit & kita",
      description: "",
      img: "../../../assets/img/exhibit/langit-kita.jpeg",
    },
    {
      title: "Anti graviti",
      description: "",
      img: "../../../assets/img/exhibit/anti-graviti.jpeg",
    },
    {
      title: "Replika ahli falak",
      description: "",
      img: "../../../assets/img/exhibit/replika-ahli-falak.jpeg",
    },
    {
      title: "Spacepod",
      description: "",
      img: "../../../assets/img/exhibit/kembara-simulasi.jpeg",
    },
  ];

  constructor() {}

  ngOnInit() {}
}
