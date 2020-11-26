import { Component, OnInit, TemplateRef } from "@angular/core";
import { Meta } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "app-facility",
  templateUrl: "./facility.component.html",
  styleUrls: ["./facility.component.scss"],
})
export class FacilityComponent implements OnInit {
  defaultModal: BsModalRef;
  default = {
    keyboard: true,
    class: "modal-dialog",
    backdrop: false,
    ignoreBackdropClick: true,
  };

  constructor(
    private metaTagService: Meta,
    private route: ActivatedRoute,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.addMetaTag();
  }

  openDefaultModal(modalDefault: TemplateRef<any>) {
    this.defaultModal = this.modalService.show(modalDefault, this.default);
  }

  addMetaTag() {
    this.metaTagService.addTags([
      { name: "og:title", content: this.route.snapshot.data["title"] },
      {
        name: "og:description",
        content: this.route.snapshot.data["description"],
      },
      { name: "og:url", content: this.route.snapshot.data["url"] },
      { name: "og:site_name", content: this.route.snapshot.data["site_name"] },
      {
        name: "og:image",
        content: this.route.snapshot.data["image"],
      },
      {
        name: "twitter:card",
        content: this.route.snapshot.data["twitter_card"],
      },
      {
        name: "twitter:description",
        content: this.route.snapshot.data["twitter_description"],
      },
      {
        name: "twitter:title",
        content: this.route.snapshot.data["twitter_title"],
      },
      {
        name: "twitter:image",
        content: this.route.snapshot.data["twitter_image"],
      },
      {
        name: "twitter:url",
        content: this.route.snapshot.data["twitter_url"],
      },
    ]);
  }
}
