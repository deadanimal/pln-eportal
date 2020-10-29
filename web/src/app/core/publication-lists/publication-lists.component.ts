import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import swal from "sweetalert2";

import { PublicationsService } from "src/app/shared/services/publications/publications.service";

@Component({
  selector: "app-publication-lists",
  templateUrl: "./publication-lists.component.html",
  styleUrls: ["./publication-lists.component.scss"],
})
export class PublicationListsComponent implements OnInit {
  // Data
  publication_category_id: string = "";
  publications = [];
  showSelectedPublication: boolean = false;
  selectedPublication = {
    title: "",
    abstract: "",
    author_name: "",
    publisher_name: "",
    published_date: "",
    poster_link: "",
    pdf_link: "",
    year: "",
    edition: "",
    publication_category_id: "",
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private publicationService: PublicationsService
  ) {
    this.publication_category_id = this.route.snapshot.paramMap.get("id");

    this.getPublication();
  }

  getPublication() {
    this.publicationService
      .filter("publication_category_id=" + this.publication_category_id)
      .subscribe(
        (res) => {
          console.log("res", res);
          this.publications = res;
        },
        (err) => {
          console.error("err", err);
        }
      );
  }

  ngOnInit() {}

  downloadPDF(publication) {
    swal.fire({
      icon: "success",
      title: "Terima kasih kerana memuat turun informasi daripada kami",
      text:
        "Sila tunggu sebentar. Muat turun anda akan berlangsung sebentar lagi",
      buttonsStyling: false,
      confirmButtonText: "Tutup",
      customClass: {
        confirmButton: "btn btn-success",
      },
    });
  }

  openPublication(publication) {
    this.showSelectedPublication = true;
    this.selectedPublication = publication;
  }

  backPublication() {
    this.showSelectedPublication = false;
    this.selectedPublication = this.emptyPublication();
  }

  emptyPublication() {
    return {
      title: "",
      abstract: "",
      author_name: "",
      publisher_name: "",
      published_date: "",
      poster_link: "",
      pdf_link: "",
      year: "",
      edition: "",
      publication_category_id: "",
    };
  }
}
