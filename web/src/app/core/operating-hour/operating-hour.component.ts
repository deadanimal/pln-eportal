import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

import { TicketPricesService } from "src/app/shared/services/ticket-prices/ticket-prices.service";
import { W3csService } from "src/app/shared/services/w3cs/w3cs.service";

@Component({
  selector: "app-operating-hour",
  templateUrl: "./operating-hour.component.html",
  styleUrls: ["./operating-hour.component.scss"],
})
export class OperatingHourComponent implements OnInit {
  // CSS class
  fontSize: string;
  themeColor: string;

  // Data
  ticketprices = [];
  tickets = [
    {
      venue_ms: "TAYANGAN PLANETARIUM",
      venue_en: "PLANETARIUM SHOWS",
      normalAdult: "RM12.00",
      mykadAdult: "RM6.00",
      normalChildren: "RM8.00",
      mykadChildren: "RM4.00",
      normalStudent: "RM8.00",
      mykadStudent: "RM4.00",
    },
    {
      venue_ms: "KEMBARA SIMULASI SPACE POD",
      venue_en: "SPACE POD SIMULATOR RIDE",
      normalAdult: "RM24.00",
      mykadAdult: "RM12.00",
      normalChildren: "RM16.00",
      mykadChildren: "RM8.00",
      normalStudent: "tiada",
      mykadStudent: "tiada",
    },
    {
      venue_ms: "GALERI PAMERAN",
      venue_en: "EXHIBITION GALLERY",
      normalAdult: "",
      mykadAdult: "",
      normalChildren: "",
      mykadChildren: "",
      normalStudent: "",
      mykadStudent: "",
    },
  ];

  // Dropdown
  modules = [
    {
      value: "shows",
      display_name: "Tayangan",
    },
    {
      value: "simulator-ride",
      display_name: "Kembara Simulasi",
    },
  ];

  constructor(
    public translate: TranslateService,
    private ticketpriceService: TicketPricesService,
    private w3cService: W3csService
  ) {
    this.getData();
  }

  getData() {
    this.ticketpriceService.filter("status=true").subscribe(
      (res) => {
        // console.log("res", res);
        this.ticketprices = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  getTicketPrice(module: string, ticket_type: string, ticket_category: string) {
    let result = this.ticketprices.find((obj) => {
      return (
        obj.module == module &&
        obj.ticket_type == ticket_type &&
        obj.ticket_category == ticket_category
      );
    });
    return result;
  }

  ngOnInit() {
    this.w3cService.currentFontSize.subscribe(
      (fontSize) => (this.fontSize = fontSize)
    );

    this.w3cService.currentThemeColor.subscribe(
      (themeColor) => (this.themeColor = themeColor)
    );
  }
}
