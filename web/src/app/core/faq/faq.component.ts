import { Component, OnInit, ViewEncapsulation } from "@angular/core";

import { FaqsService } from "src/app/shared/services/faqs/faqs.service";

@Component({
  selector: "app-faq",
  templateUrl: "./faq.component.html",
  styleUrls: ["./faq.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class FaqComponent implements OnInit {
  // Data
  customClass = "customClass";
  faqs = [];

  constructor(private faqService: FaqsService) {
    this.getData();
  }

  getData() {
    this.faqService.filter("status=true").subscribe(
      (res) => {
        console.log("res", res);
        this.faqs = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  ngOnInit() {}
}
