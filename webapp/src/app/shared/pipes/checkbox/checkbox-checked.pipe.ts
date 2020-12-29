import { HttpClient } from "@angular/common/http";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "checkboxChecked",
  pure: true,
})
export class CheckboxCheckedPipe implements PipeTransform {
  transform(id: any, obj: any): any {
    return this.checkboxChecked(id, obj);
  }

  checkboxChecked(id: any, obj: any) {
    let result = obj.find((obj) => {
      if (obj == id) return true;
      else return false;
    });
    return result;
  }
}
