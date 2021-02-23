import { HttpClient } from "@angular/common/http";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "ticketPriceModuleFilter",
  pure: true,
})
export class TicketPriceModuleFilterPipe implements PipeTransform {
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

  transform(module: any, lang: any): any {
    return this.ticketPriceModuleFilter(module, lang);
  }

  ticketPriceModuleFilter(module: any, lang: any) {
    let result = this.modules.find((obj) => {
      return obj.value == module;
    });
    if (lang == "en") return result.display_name_en;
    if (lang == "ms") return result.display_name_ms;
  }
}
