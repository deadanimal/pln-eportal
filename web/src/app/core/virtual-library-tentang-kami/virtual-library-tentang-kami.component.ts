import { Component, OnInit } from '@angular/core';
import { Meta } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-virtual-library-tentang-kami',
  templateUrl: './virtual-library-tentang-kami.component.html',
  styleUrls: ['./virtual-library-tentang-kami.component.scss']
})
export class VirtualLibraryTentangKamiComponent implements OnInit {

  constructor(private metaTagService: Meta, private route: ActivatedRoute) { }

  ngOnInit() {
    this.addMetaTag();
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
