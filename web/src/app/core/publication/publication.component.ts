import { Component, OnInit } from "@angular/core";
import swal from "sweetalert2";

@Component({
  selector: "app-publication",
  templateUrl: "./publication.component.html",
  styleUrls: ["./publication.component.scss"],
})
export class PublicationComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

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
