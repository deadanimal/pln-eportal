import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { VirtualLibraryArticlesService } from "src/app/shared/services/virtual-library-articles/virtual-library-articles.service";

@Component({
  selector: "app-virtual-library-artikel-terkini",
  templateUrl: "./virtual-library-artikel-terkini.component.html",
  styleUrls: ["./virtual-library-artikel-terkini.component.scss"],
})
export class VirtualLibraryArtikelTerkiniComponent implements OnInit {
  // Data
  virtual_library_article_category_id: string = "";
  vl_articles = [];
  showSelectedArticle: boolean = false;
  selectedArticle = {
    id: "",
    name: "",
    description: "",
    date: "",
    pdf_link: "",
  };

  constructor(
    private route: ActivatedRoute,
    private virtuallibraryarticleService: VirtualLibraryArticlesService
  ) {
    this.virtual_library_article_category_id = this.route.snapshot.paramMap.get(
      "category_id"
    );
    if (this.virtual_library_article_category_id) this.getData();
  }

  getData() {
    this.virtuallibraryarticleService
      .filter(
        "virtual_library_article_category_id" +
          this.virtual_library_article_category_id +
          "&status=true"
      )
      .subscribe(
        (res) => {
          console.log("res", res);
          this.vl_articles = res;
        },
        (err) => {
          console.error("err", err);
        }
      );
  }

  ngOnInit() {}

  readMore(article) {
    this.showSelectedArticle = true;
    this.selectedArticle = article;
  }

  backArticle() {
    this.showSelectedArticle = false;
    this.selectedArticle = this.emptyArticle();
  }

  emptyArticle() {
    return {
      id: "",
      name: "",
      description: "",
      date: "",
      pdf_link: "",
    };
  }
}
