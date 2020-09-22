import {
  Component,
  OnInit,
  Renderer,
  HostListener,
  Inject,
} from "@angular/core";
import { Location } from "@angular/common";
import { DOCUMENT } from "@angular/common";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  constructor(
    private renderer: Renderer,
    public location: Location,
    @Inject(DOCUMENT) document,
    public translate: TranslateService
  ) {
    this.translate.addLangs(["en", "my"]);
    this.translate.setDefaultLang("my");
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll(e) {
    if (window.pageYOffset > 300) {
      var element = document.getElementById("navbar-top");
      if (element) {
        element.classList.remove("navbar-transparent");
        element.classList.add("bg-default");
      }
    } else {
      var element = document.getElementById("navbar-top");
      if (element) {
        element.classList.add("navbar-transparent");
        element.classList.remove("bg-default");
      }
    }
  }

  ngOnInit() {
    this.onWindowScroll(event);
  }
}
