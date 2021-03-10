import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

import { PublicationsService } from "src/app/shared/services/publications/publications.service";
import { VirtualLibraryArchiveKutubkhanahsService } from "src/app/shared/services/virtual-library-archivekutubkhanahs/virtual-library-archivekutubkhanahs.service";
import { VirtualLibraryArticlesService } from "src/app/shared/services/virtual-library-articles/virtual-library-articles.service";
import { VirtualLibraryBooksService } from "src/app/shared/services/virtual-library-books/virtual-library-books.service";
import { VirtualLibraryESourcesService } from "src/app/shared/services/virtual-library-esources/virtual-library-esources.service";
import { VirtualLibrarySerialpublicationsService } from "src/app/shared/services/virtual-library-serialpublications/virtual-library-serialpublications.service";
import { W3csService } from "src/app/shared/services/w3cs/w3cs.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-search-keyword",
  templateUrl: "./search-keyword.component.html",
  styleUrls: ["./search-keyword.component.scss"],
})
export class SearchKeywordComponent implements OnInit {
  // CSS class
  fontSize: string;
  themeColor: string;

  // Data
  search_keyword: string = "";
  searchkeywords = [];

  constructor(
    public translate: TranslateService,
    private route: ActivatedRoute,
    private publicationService: PublicationsService,
    private vlarchivekutubkhanahService: VirtualLibraryArchiveKutubkhanahsService,
    private vlarticleService: VirtualLibraryArticlesService,
    private vlbookService: VirtualLibraryBooksService,
    private vlesourceService: VirtualLibraryESourcesService,
    private vlserialpublicationService: VirtualLibrarySerialpublicationsService,
    private w3cService: W3csService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.search_keyword = "";
      this.searchkeywords.splice(0, this.searchkeywords.length);
      this.search_keyword = params.search_keyword;
      this.getSearchKeyword(this.search_keyword);
    });

    this.w3cService.currentFontSize.subscribe((fontSize) => {
      this.fontSize = fontSize;
    });

    this.w3cService.currentThemeColor.subscribe(
      (themeColor) => (this.themeColor = themeColor)
    );
  }

  getSearchKeyword(search_keyword: string) {
    this.publicationService
      .get_search_keyword(search_keyword, this.translate.currentLang)
      .subscribe(
        (res) => {
          // console.log("res", res);
          res.forEach((obj) => {
            obj["url"] =
              environment.portalUrl +
              "publication/lists/" +
              obj.publication_category_id.id;
            const reg = new RegExp(this.search_keyword, "gi");
            obj["description_en"] = obj.description_en.replace(
              reg,
              "<mark>" + this.search_keyword + "</mark>"
            );
            obj["description_ms"] = obj.description_ms.replace(
              reg,
              "<mark>" + this.search_keyword + "</mark>"
            );
            this.searchkeywords.push(obj);
            // console.log("searchkeywords publication", this.searchkeywords);
          });
        },
        (err) => {
          console.error("err", err);
        }
      );

    this.vlarchivekutubkhanahService
      .get_search_keyword(search_keyword, this.translate.currentLang)
      .subscribe(
        (res) => {
          // console.log("res", res);
          res.forEach((obj) => {
            obj["url"] =
              environment.portalUrl +
              "virtual-library/koleksi/" +
              obj.virtual_library_archivekutubkhanah_category_id
                .virtual_library_collection_id
                .virtual_library_collection_category_id +
              "/arkib-kutubkhanah/" +
              obj.virtual_library_archivekutubkhanah_category_id
                .virtual_library_collection_id.id;
            this.searchkeywords.push(obj);
            // console.log("searchkeywords archivekutubkhanah", this.searchkeywords);
          });
        },
        (err) => {
          console.error("err", err);
        }
      );

    this.vlarticleService
      .get_search_keyword(search_keyword, this.translate.currentLang)
      .subscribe(
        (res) => {
          // console.log("res", res);
          res.forEach((obj) => {
            obj["url"] =
              environment.portalUrl +
              "virtual-library/artikel-terkini/" +
              obj.virtual_library_article_category_id.id;
            const reg = new RegExp(this.search_keyword, "gi");
            obj["description_en"] = obj.description_en.replace(
              reg,
              "<mark>" + this.search_keyword + "</mark>"
            );
            obj["description_ms"] = obj.description_ms.replace(
              reg,
              "<mark>" + this.search_keyword + "</mark>"
            );
            this.searchkeywords.push(obj);
            // console.log("searchkeywords article", this.searchkeywords);
          });
        },
        (err) => {
          console.error("err", err);
        }
      );

    this.vlbookService
      .get_search_keyword(search_keyword, this.translate.currentLang)
      .subscribe(
        (res) => {
          // console.log("res", res);
          res.forEach((obj) => {
            obj["url"] =
              environment.portalUrl +
              "virtual-library/koleksi/" +
              obj.virtual_library_collection_id
                .virtual_library_collection_category_id +
              "/buku/" +
              obj.virtual_library_collection_id.id;
            const reg = new RegExp(this.search_keyword, "gi");
            obj["description_en"] = obj.description_en.replace(
              reg,
              "<mark>" + this.search_keyword + "</mark>"
            );
            obj["description_ms"] = obj.description_ms.replace(
              reg,
              "<mark>" + this.search_keyword + "</mark>"
            );
            this.searchkeywords.push(obj);
            // console.log("searchkeywords book", this.searchkeywords);
          });
        },
        (err) => {
          console.error("err", err);
        }
      );

    this.vlesourceService
      .get_search_keyword(search_keyword, this.translate.currentLang)
      .subscribe(
        (res) => {
          // console.log("res", res);
          res.forEach((obj) => {
            obj["url"] =
              environment.portalUrl +
              "virtual-library/koleksi/" +
              obj.virtual_library_esource_category_id
                .virtual_library_collection_id
                .virtual_library_collection_category_id +
              "/e-sumber/" +
              obj.virtual_library_esource_category_id
                .virtual_library_collection_id.id;
            this.searchkeywords.push(obj);
            // console.log("searchkeywords esource", this.searchkeywords);
          });
        },
        (err) => {
          console.error("err", err);
        }
      );

    this.vlserialpublicationService
      .get_search_keyword(search_keyword, this.translate.currentLang)
      .subscribe(
        (res) => {
          // console.log("res", res);
          res.forEach((obj) => {
            obj["url"] =
              environment.portalUrl +
              "virtual-library/koleksi/" +
              obj.virtual_library_collection_id
                .virtual_library_collection_category_id +
              "/terbitan-bersiri/" +
              obj.virtual_library_collection_id.id;
            const reg = new RegExp(this.search_keyword, "gi");
            obj["description_en"] = obj.description_en.replace(
              reg,
              "<mark>" + this.search_keyword + "</mark>"
            );
            obj["description_ms"] = obj.description_ms.replace(
              reg,
              "<mark>" + this.search_keyword + "</mark>"
            );
            this.searchkeywords.push(obj);
            // console.log("searchkeywords serialpublication", this.searchkeywords);
          });
        },
        (err) => {
          console.error("err", err);
        }
      );
  }
}
