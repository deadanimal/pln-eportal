import { HttpClient } from "@angular/common/http";
import { Pipe, PipeTransform } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Pipe({
  name: "ticketPriceDetailFilter",
  pure: true,
})
export class TicketPriceDetailFilter implements PipeTransform {
  constructor(private translate: TranslateService) {}

  modules = [
    {
      value: "simulator-ride",
      display_name_en: "SPACE POD SIMULATOR RIDE",
      display_name_ms: "KEMBARA SIMULASI SPACE POD",
    },
    {
      value: "shows",
      display_name_en: "PLANETARIUM SHOWS",
      display_name_ms: "TAYANGAN PLANETARIUM",
    },
  ];

  transform(module: any, obj: any, type: any, category: any): any {
    return this.ticketPriceDetailFilter(module, obj, type, category);
  }

  ticketPriceDetailFilter(module: any, obj: any, type: any, category: any) {
    let result = obj.find((obj) => {
      return obj.module == module && obj.ticket_category == category;
    });
    if (result && type == "CZ") return "RM " + result.price_citizen;
    else if (result && type == "NC") return "RM " + result.price_noncitizen;
    else return "";
  }
}
