import { Component, OnInit } from "@angular/core";
import swal from "sweetalert2";

import { PublicationCategoriesService } from "src/app/shared/services/publication-categories/publication-categories.service";

@Component({
  selector: "app-publication",
  templateUrl: "./publication.component.html",
  styleUrls: ["./publication.component.scss"],
})
export class PublicationComponent implements OnInit {
  // Data
  publicationcategories = [];

  constructor(
    private publicationcategoryService: PublicationCategoriesService
  ) {
    this.getPublicationCategory();
  }

  ngOnInit() {}

  getPublicationCategory() {
    this.publicationcategoryService.get().subscribe(
      (res) => {
        console.log("res", res);
        this.publicationcategories = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  openAfterDownload() {
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
}
