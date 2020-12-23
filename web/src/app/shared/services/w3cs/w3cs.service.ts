import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class W3csService {
  // Font Size
  private fontSizeDefault = new BehaviorSubject("fs-09rem");
  currentFontSize = this.fontSizeDefault.asObservable();

  // Theme Color
  private themeColorDefault = new BehaviorSubject("theme-default");
  currentThemeColor = this.themeColorDefault.asObservable();

  constructor() {}

  changeFontSize(className: string) {
    this.fontSizeDefault.next(className);
  }

  changeThemeColor(className: string) {
    this.themeColorDefault.next(className);
  }
}
