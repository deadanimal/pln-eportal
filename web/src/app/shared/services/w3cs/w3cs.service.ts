import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class W3csService {
  private fontSizeDefault = new BehaviorSubject("fs-09rem");
  currentFontSize = this.fontSizeDefault.asObservable();

  constructor() {}

  changeFontSize(className: string) {
    this.fontSizeDefault.next(className);
  }

  // getFontSize() {
  //   return window.localStorage['fontSize'];
  // }

  // setFontSize(className: string) {
  //   window.localStorage['fontSize'] = className;
  // }
}
