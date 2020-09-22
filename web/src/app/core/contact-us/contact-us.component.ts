import { Component, OnInit } from "@angular/core";
import * as L from "leaflet";

@Component({
  selector: "app-contact-us",
  templateUrl: "./contact-us.component.html",
  styleUrls: ["./contact-us.component.scss"],
})
export class ContactUsComponent implements OnInit {
  options = {
    layers: [
      L.tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
        maxZoom: 20,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
      }),
    ],
    zoom: 18,
    center: L.latLng(3.1396361, 101.6882681),
    scrollWheelZoom: false,
  };

  focus;
  focus1;
  focus2;

  constructor() {}

  ngOnInit() {}
}
