import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation,
} from "ngx-gallery";
import { ActivatedRoute } from "@angular/router";
import swal from "sweetalert2";

@Component({
  selector: "app-facility-details",
  templateUrl: "./facility-details.component.html",
  styleUrls: ["./facility-details.component.scss"],
})
export class FacilityDetailsComponent implements OnInit {
  defaultModal: BsModalRef;
  default = {
    keyboard: true,
    class: "modal-dialog-centered",
  };

  type: string = "";
  facility;
  facilities = [
    {
      name: "Teater Angkasa",
      type: "teater-angkasa",
      images: [],
    },
    {
      name: "Galeri Pameran",
      type: "galeri-pameran",
      images: [
        {
          small: "assets/img/facility/galeri-pameran-1.jpg",
          medium: "assets/img/facility/galeri-pameran-1.jpg",
          big: "assets/img/facility/galeri-pameran-1.jpg",
        },
        {
          small: "assets/img/facility/galeri-pameran-2.jpg",
          medium: "assets/img/facility/galeri-pameran-2.jpg",
          big: "assets/img/facility/galeri-pameran-2.jpg",
        },
        {
          small: "assets/img/facility/galeri-pameran-3.jpg",
          medium: "assets/img/facility/galeri-pameran-3.jpg",
          big: "assets/img/facility/galeri-pameran-3.jpg",
        },
      ],
    },
    {
      name: "Teatret",
      type: "teatret",
      images: [
        {
          small: "assets/img/facility/teatret-1.jpg",
          medium: "assets/img/facility/teatret-1.jpg",
          big: "assets/img/facility/teatret-1.jpg",
        },
        {
          small: "assets/img/facility/teatret-2.jpg",
          medium: "assets/img/facility/teatret-2.jpg",
          big: "assets/img/facility/teatret-2.jpg",
        },
        {
          small: "assets/img/facility/teatret-3.jpg",
          medium: "assets/img/facility/teatret-3.jpg",
          big: "assets/img/facility/teatret-3.jpg",
        },
      ],
    },
    {
      name: "Bilik Centaurus",
      type: "bilik-centaurus",
      images: [],
    },
    {
      name: "Kawasan Rekreasi",
      type: "kawasan-rekreasi",
      images: [
        {
          small: "assets/img/facility/kawasan-rekreasi-1.jpg",
          medium: "assets/img/facility/kawasan-rekreasi-1.jpg",
          big: "assets/img/facility/kawasan-rekreasi-1.jpg",
        },
        {
          small: "assets/img/facility/kawasan-rekreasi-2.jpg",
          medium: "assets/img/facility/kawasan-rekreasi-2.jpg",
          big: "assets/img/facility/kawasan-rekreasi-2.jpg",
        },
        {
          small: "assets/img/facility/kawasan-rekreasi-3.jpg",
          medium: "assets/img/facility/kawasan-rekreasi-3.jpg",
          big: "assets/img/facility/kawasan-rekreasi-3.jpg",
        },
        {
          small: "assets/img/facility/kawasan-rekreasi-4.jpg",
          medium: "assets/img/facility/kawasan-rekreasi-4.jpg",
          big: "assets/img/facility/kawasan-rekreasi-4.jpg",
        },
      ],
    },
    {
      name: "Stesen Mikrosatelit",
      type: "stesen-mikrosatelit",
      images: [],
    },
  ];

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private modalService: BsModalService,
    private activatedRoute: ActivatedRoute
  ) {
    this.type = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.type) {
      this.facility = this.facilities.find((value) => {
        return value.type == this.type;
      });
    }
  }

  ngOnInit(): void {
    this.galleryOptions = [
      {
        width: "600px",
        height: "600px",
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
      },
      // max-width 800
      {
        breakpoint: 800,
        width: "100%",
        height: "600px",
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20,
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false,
      },
    ];
  }

  openDefaultModal(modalDefault: TemplateRef<any>) {
    this.defaultModal = this.modalService.show(modalDefault, this.default);
  }

  openAfterBooking() {
    this.defaultModal.hide();
    swal.fire({
      icon: "success",
      title: "Terima kasih",
      text:
        "Pihak kami akan memberi maklum balas terhadap permohonan tersebut dalam masa 3 hari bekerja",
      buttonsStyling: false,
      confirmButtonText: "Tutup",
      customClass: {
        confirmButton: "btn btn-success",
      },
    });
  }
}
