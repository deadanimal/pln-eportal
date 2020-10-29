import {
  Component,
  OnInit,
  Renderer,
  HostListener,
  Inject,
} from "@angular/core";
import { Location } from "@angular/common";
import { DOCUMENT } from "@angular/common";
import { NavigationStart, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  subscription: Subscription;

  constructor(
    private renderer: Renderer,
    public location: Location,
    @Inject(DOCUMENT) document,
    private router: Router,
    public translate: TranslateService
  ) {
    this.translate.addLangs(["en", "my"]);
    this.translate.setDefaultLang("my");

    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // console.log("navigationStart");
      }
    });
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
