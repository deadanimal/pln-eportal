import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-ticketing",
  templateUrl: "./ticketing.component.html",
  styleUrls: ["./ticketing.component.scss"],
})
export class TicketingComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  changeAdultQuantity(value: number): void {
    console.log(value);
  }

  changeChildrenQuantity(value: number): void {
    console.log(value);
  }

  changeSeniorQuantity(value: number): void {
    console.log(value);
  }
}
