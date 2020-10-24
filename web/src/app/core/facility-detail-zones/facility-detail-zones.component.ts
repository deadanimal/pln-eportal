import { Component, OnInit, TemplateRef } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation,
} from "ngx-gallery";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import swal from "sweetalert2";

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { FacilitiesService } from "src/app/shared/services/facilities/facilities.service";
import { FacilityBookingsService } from "src/app/shared/services/facility-bookings/facility-bookings.service";
import { FacilityImagesService } from "src/app/shared/services/facility-images/facility-images.service";
import { FacilityPricesService } from "src/app/shared/services/facility-prices/facility-prices.service";
import { JwtService } from "src/app/shared/jwt/jwt.service";
import { UsersService } from "src/app/shared/services/users/users.service";

@Component({
  selector: "app-facility-detail-zones",
  templateUrl: "./facility-detail-zones.component.html",
  styleUrls: ["./facility-detail-zones.component.scss"],
})
export class FacilityDetailZonesComponent implements OnInit {
  // Data
  facility_category: string = "";
  facility_subcategory: string = "";
  facilities$: Observable<any>;
  facilityimages = [];
  /* facilities = [
    {
      name: "Teater Angkasa",
      type: "teater-angkasa",
      description:
        "Teater Angkasa boleh memuatkan sehingga 190 orang penonton. Ia mempunyai skrin berbentuk kubah aluminium hesmisfera yang dilengkapi dengan sistem bunyi sekeliling digital 6-saluran. Dua projektor full dome immersive system memberikan pilihan tayangan setiap jam dan setiap hari.",
      max_capacity: "190 orang penonton",
      area_size: "200 m2",
      images: [
        {
          small: "assets/home/teater-angkasa.jpg",
          medium: "assets/home/teater-angkasa.jpg",
          big: "assets/home/teater-angkasa.jpg",
        },
      ],
    },
    {
      name: "Pameran Penerokaan Sains Angkasa & Astronomi",
      type: "galeri-pameran",
      description:
        "Pameran ini memberikan peluang kepada pelawat meneroka bahan pameran interaktif dan mencipta sendiri pengalaman pembelajaran yang unik. Ia menggalakkan interaksi di kalangan pelawat pada semua peringkat usia.",
      max_capacity: "",
      area_size: "",
      images: [
        {
          small: "assets/img/facility/GALERI PAMERAN_ASTRONOMI 2.jpg",
          medium: "assets/img/facility/GALERI PAMERAN_ASTRONOMI 2.jpg",
          big: "assets/img/facility/GALERI PAMERAN_ASTRONOMI 2.jpg",
        },
        {
          small: "assets/img/facility/GALERI PAMERAN_ASTRONOMI.jpg",
          medium: "assets/img/facility/GALERI PAMERAN_ASTRONOMI.jpg",
          big: "assets/img/facility/GALERI PAMERAN_ASTRONOMI.jpg",
        },
        {
          small: "assets/img/facility/GALERI PAMERAN_BILIK GELAP.jpg",
          medium: "assets/img/facility/GALERI PAMERAN_BILIK GELAP.jpg",
          big: "assets/img/facility/GALERI PAMERAN_BILIK GELAP.jpg",
        },
      ],
    },
    {
      name: "Teatret",
      type: "teatret",
      description:
        "Kemudahan yang disediakan adalah projektor, kerusi, meja, skrin lebar, komputer dan sebagainya",
      max_capacity: "80 orang",
      area_size: "",
      images: [
        // {
        //   small: "assets/img/facility/teatret 2.jpg",
        //   medium: "assets/img/facility/teatret 2.jpg",
        //   big: "assets/img/facility/teatret 2.jpg",
        // },
        {
          small: "assets/img/facility/teatret3.jpg",
          medium: "assets/img/facility/teatret3.jpg",
          big: "assets/img/facility/teatret3.jpg",
        },
        {
          small: "assets/img/facility/teatret.jpg",
          medium: "assets/img/facility/teatret.jpg",
          big: "assets/img/facility/teatret.jpg",
        },
      ],
    },
    {
      name: "Bilik Centaurus",
      type: "bilik-centaurus",
      description:
        "Kutubkhanah Mini Planetarium Negara mempunyai koleksi buku terdiri daripada sebahagian subjek astronomi dan sains angkasa selain subjek-subjek umum yang lain seperti karya am, falsafah, sains kemasyarakatan dan sebagainya. Buku-buku tersebut telah disusun dan dikatalog agar memudahkan orang ramai untuk membuat carian dan rujukan. Kutubkahanah Mini mempunyai ruang bacaan yang boleh menempatkan 20 orang pembaca dalam 1 masa. Namun ruang ini dikongsi bersama Ruang Aktiviti STEM. Semasa penggunaan Ruang Aktiviti STEM, ruang bacaan dikecilkan kepada 2 pengguna sahaja. Kutubkhanah Mini turut menyenaraikan koleksi bahan rujukan di https://www.libib.com dan menyediakan perkhidmatan bacaan atas talian / online melalui blog iaitu di https://pnlibrary.blogspot.com/ .",
      max_capacity: "30 orang",
      area_size: "46 m2",
      images: [
        {
          small: "assets/img/facility/1 centaurus.jpg",
          medium: "assets/img/facility/1 centaurus.jpg",
          big: "assets/img/facility/1 centaurus.jpg",
        },
        {
          small: "assets/img/facility/2 centaurus.jpg",
          medium: "assets/img/facility/2 centaurus.jpg",
          big: "assets/img/facility/2 centaurus.jpg",
        },
        {
          small: "assets/img/facility/3 centaurus.jpg",
          medium: "assets/img/facility/3 centaurus.jpg",
          big: "assets/img/facility/3 centaurus.jpg",
        },
      ],
    },
    {
      name: "Kawasan Rekreasi",
      type: "kawasan-rekreasi",
      places: [
        {
          name: "Sculpture",
          description:
            "Sculpture ini melambangkan ruang dan waktu. Waktu dipotretkan menerusi garis-garis yang mengalir sementara ruang digambarkan oleh kedudukan sfera mewakili planet-planet. Nombor arab menunjukkan usaha manusia memahami alam semesta.",
          max_capacity: "50 orang",
          area_size: "49 m2",
          images: [
            {
              small: "assets/img/facility/SCULPTURE/SCULPTURE 1.jpg",
              medium: "assets/img/facility/SCULPTURE/SCULPTURE 1.jpg",
              big: "assets/img/facility/SCULPTURE/SCULPTURE 1.jpg",
            },
            {
              small: "assets/img/facility/SCULPTURE/SCULPTURE 2.jpg",
              medium: "assets/img/facility/SCULPTURE/SCULPTURE 2.jpg",
              big: "assets/img/facility/SCULPTURE/SCULPTURE 2.jpg",
            },
            {
              small: "assets/img/facility/SCULPTURE/SCULPTURE 3.jpg",
              medium: "assets/img/facility/SCULPTURE/SCULPTURE 3.jpg",
              big: "assets/img/facility/SCULPTURE/SCULPTURE 3.jpg",
            },
          ],
        },
        {
          name: "Jam Matahari Sundial",
          description:
            "Merdeka Sundial dibina pada tahun 1957 dan dirasmikan oleh Perdana Menteri Malaysia pertama, Tunku Abdul Rahman Putra bersempena dengan perasmian Taman Tunku Abdul Rahman. Tan Sri Stanley Edward Jewkes adalah arkitek yang merancang dan membina jam matahari. Sekiranya dilihat dari jauh, sundial kelihatan seperti bulan sabit dari lambang kerajaan persekutuan. Penunjuk bayangan dibuat dari bintang terukir tinggi yang mewakili negeri-negeri yang tinggi di Malaysia pada waktu itu. Pada tahun 1997, Merdeka Sundial telah dipindahkan ke Kompleks Planetarium Negara kerana projek pembangunan baru di taman itu.",
          max_capacity: "30 orang",
          area_size: "29.8 m2",
          images: [
            {
              small: "assets/img/facility/MERDEKA SUNDIAL/MERDEKA SUNDIAL.jpg",
              medium: "assets/img/facility/MERDEKA SUNDIAL/MERDEKA SUNDIAL.jpg",
              big: "assets/img/facility/MERDEKA SUNDIAL/MERDEKA SUNDIAL.jpg",
            },
            {
              small:
                "assets/img/facility/MERDEKA SUNDIAL/MERDEKA SUNDIAL 2.jpg",
              medium:
                "assets/img/facility/MERDEKA SUNDIAL/MERDEKA SUNDIAL 2.jpg",
              big: "assets/img/facility/MERDEKA SUNDIAL/MERDEKA SUNDIAL 2.jpg",
            },
            {
              small:
                "assets/img/facility/MERDEKA SUNDIAL/MERDEKA SUNDIAL 3.jpg",
              medium:
                "assets/img/facility/MERDEKA SUNDIAL/MERDEKA SUNDIAL 3.jpg",
              big: "assets/img/facility/MERDEKA SUNDIAL/MERDEKA SUNDIAL 3.jpg",
            },
            {
              small:
                "assets/img/facility/MERDEKA SUNDIAL/MERDEKA SUNDIAL 4.jpg",
              medium:
                "assets/img/facility/MERDEKA SUNDIAL/MERDEKA SUNDIAL 4.jpg",
              big: "assets/img/facility/MERDEKA SUNDIAL/MERDEKA SUNDIAL 4.jpg",
            },
            {
              small:
                "assets/img/facility/MERDEKA SUNDIAL/MERDEKA SUNDIAL 5.jpg",
              medium:
                "assets/img/facility/MERDEKA SUNDIAL/MERDEKA SUNDIAL 5.jpg",
              big: "assets/img/facility/MERDEKA SUNDIAL/MERDEKA SUNDIAL 5.jpg",
            },
          ],
        },
        {
          name: "Balai Cerap Purba",
          description: "",
          max_capacity: "",
          area_size: "",
          images: [
            {
              small: "assets/img/facility/STONEHENGE/STONEHENGE 1.jpg",
              medium: "assets/img/facility/STONEHENGE/STONEHENGE 1.jpg",
              big: "assets/img/facility/STONEHENGE/STONEHENGE 1.jpg",
            },
            {
              small: "assets/img/facility/STONEHENGE/STONEHENGE 2.jpg",
              medium: "assets/img/facility/STONEHENGE/STONEHENGE 2.jpg",
              big: "assets/img/facility/STONEHENGE/STONEHENGE 2.jpg",
            },
            {
              small: "assets/img/facility/STONEHENGE/STONEHENGE 3.jpg",
              medium: "assets/img/facility/STONEHENGE/STONEHENGE 3.jpg",
              big: "assets/img/facility/STONEHENGE/STONEHENGE 3.jpg",
            },
            {
              small: "assets/img/facility/STONEHENGE/STONEHENGE 4.jpg",
              medium: "assets/img/facility/STONEHENGE/STONEHENGE 4.jpg",
              big: "assets/img/facility/STONEHENGE/STONEHENGE 4.jpg",
            },
            {
              small: "assets/img/facility/STONEHENGE/STONEHENGE 5.jpg",
              medium: "assets/img/facility/STONEHENGE/STONEHENGE 5.jpg",
              big: "assets/img/facility/STONEHENGE/STONEHENGE 5.jpg",
            },
          ],
        },
      ],
    },
    {
      name: "Stesen Mikrosatelit",
      type: "stesen-mikrosatelit",
      description:
        "Suatu kemudahan yang menempatkan peralatan komunikasi Radio Amatur di Planetarium Negara. Peralatan Radio Amatur yang disediakan di stesen mikrosatelit Planeterium Negara dapat digunakan bagi tujuan perhubungan radio kepada pengguna-pengguna radio amatur dan juga untuk berkomunikasi dengan mikrosatelit yang melintas ruang udara Kuala Lumpur. Stesen ini juga digunakan untuk berkomunikasi dengan angkasawan yang sedang bertugas di Stesen Angkasa Antarabangsa (ISS).",
      max_capacity: "",
      area_size: "",
      images: [
        {
          small: "assets/img/facility/MIKROSATELITE 1.jpg",
          medium: "assets/img/facility/MIKROSATELITE 1.jpg",
          big: "assets/img/facility/MIKROSATELITE 1.jpg",
        },
        {
          small: "assets/img/facility/MIKROSATELITE 2.jpg",
          medium: "assets/img/facility/MIKROSATELITE 2.jpg",
          big: "assets/img/facility/MIKROSATELITE 2.jpg",
        },
        {
          small: "assets/img/facility/MIKROSATELITE 3.jpg",
          medium: "assets/img/facility/MIKROSATELITE 3.jpg",
          big: "assets/img/facility/MIKROSATELITE 3.jpg",
        },
      ],
    },
  ]; */
  selectedFacility = {
    value: "",
    display_name: "",
    link: "",
  };

  // Dropdown
  bookingdays = [
    {
      value: "HALF",
      display_name: "Separuh Hari",
    },
    {
      value: "FULL",
      display_name: "Satu Hari",
    },
    {
      value: "NONE",
      display_name: "Tiada",
    },
  ];
  facilitycategories = [
    {
      value: "TA",
      display_name: "Teater Angkasa",
      link: "teater-angkasa",
    },
    {
      value: "GP",
      display_name: "Galeri Pameran",
      link: "galeri-pameran",
    },
    {
      value: "TT",
      display_name: "Teatret",
      link: "teatret",
    },
    {
      value: "BC",
      display_name: "Bilik Centaurus",
      link: "bilik-centaurus",
    },
    {
      value: "KR",
      display_name: "Kawasan Rekreasi",
      link: "kawasan-rekreasi",
    },
    {
      value: "SM",
      display_name: "Stesen Mikrosatelit",
      link: "stesen-mikrosatelit",
    },
    {
      value: "NA",
      display_name: "Not Available",
      link: "not-available",
    },
  ];
  facilitysubcategories = [
    {
      value: "ZONE",
      display_name: "Titan",
    },
    {
      value: "ZTWO",
      display_name: "Milky Way",
    },
    {
      value: "ZTHR",
      display_name: "Sculpture",
    },
    {
      value: "ZFOU",
      display_name: "Callisto",
    },
    {
      value: "ZFIV",
      display_name: "Balai Cerap Purba",
    },
  ];
  organisationcategories = [
    {
      value: "GV",
      display_name: "Kerajaan",
    },
    {
      value: "SC",
      display_name: "Sekolah",
    },
    {
      value: "UN",
      display_name: "Universiti",
    },
    {
      value: "NA",
      display_name: "Tidak ada",
    },
  ];

  // FormGroup
  facilitybookingFormGroup: FormGroup;

  // Modal
  defaultModal: BsModalRef;
  default = {
    keyboard: true,
    class: "modal-dialog-centered",
  };

  // Ngx Gallery
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    public formBuilder: FormBuilder,
    private modalService: BsModalService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private jwtService: JwtService,
    private facilityService: FacilitiesService,
    private facilitybookingService: FacilityBookingsService,
    private facilityimageService: FacilityImagesService,
    private facilitypriceService: FacilityPricesService,
    private userService: UsersService
  ) {
    this.facility_category = this.activatedRoute.snapshot.paramMap.get("id");
    this.facility_subcategory = this.activatedRoute.snapshot.paramMap.get(
      "zone"
    );
    console.log("facility_category", this.facility_category);
    console.log("facility_subcategory", this.facility_subcategory);

    this.facilitybookingFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      full_name: new FormControl(""),
      email: new FormControl(""),
      phone: new FormControl(""),
      title: new FormControl(""),
      organisation_name: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      organisation_category: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      booking_date: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      booking_days: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      number_of_people: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      total_price: new FormControl(0.0),
      user_id: new FormControl(""),
      pic_id: new FormControl(""),
      facility_id: new FormControl(""),
      status: new FormControl("IP"),
    });
  }

  getFacility() {
    this.facilities$ = this.facilityService.filter(
      "facility_category=" +
        this.facility_category +
        "&facility_subcategory=" +
        this.facility_subcategory
    );
    for (let i = 0; i < this.facilitycategories.length; i++) {
      if (this.facilitycategories[i].value == this.facility_category) {
        this.selectedFacility = this.facilitycategories[i];
      }
    }
  }

  getFacilityImage() {
    this.facilityimageService.get().subscribe(
      (res) => {
        console.log("res", res);
        this.facilityimages = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  getUser() {
    this.userService.get(this.authService.decodedToken().user_id).subscribe(
      (res) => {
        // console.log("res", res);
        this.facilitybookingFormGroup.patchValue({
          ...res,
          user_id: res.id,
        });
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  ngOnInit(): void {
    this.getFacility();
    this.getFacilityImage();

    this.galleryOptions = [
      {
        width: "600px",
        height: "600px",
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        imageArrows: false,
        thumbnailsArrows: false,
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

  openDefaultModal(modalDefault: TemplateRef<any>, facility) {
    if (this.jwtService.getToken("accessToken")) {
      this.defaultModal = this.modalService.show(modalDefault, this.default);
      this.getUser();

      this.facilitybookingFormGroup.patchValue({
        facility_id: facility.id,
      });
    } else {
      this.toastr.error(
        "Harap maaf. Anda perlu log masuk terlebih dahulu untuk menempah fasiliti.",
        "Ralat"
      );
    }
  }

  openAfterBooking() {
    // this.facilitybookingFormGroup.value.booking_date = this.formatDate(
    //   this.facilitybookingFormGroup.value.booking_date
    // );

    this.facilitybookingService
      .post(this.facilitybookingFormGroup.value)
      .subscribe(
        (res) => {
          console.log("res", res);
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
        },
        (err) => {
          console.error("err", err);
        }
      );
  }

  formatDate(date) {
    let selectedDate = date;
    let year = selectedDate.getFullYear();
    let month = selectedDate.getMonth() + 1;
    let day =
      selectedDate.getDate() < 10
        ? "0" + selectedDate.getDate()
        : selectedDate.getDate();
    let formatDate = year + "-" + month + "-" + day;

    return formatDate;
  }

  getFacilityCategory(value: string) {
    let result = this.facilitycategories.find((obj) => {
      return obj.value == value;
    });
    return result.display_name;
  }

  getFacilitySubcategory(value: string) {
    let result = this.facilitysubcategories.find((obj) => {
      return obj.value == value;
    });
    return result.display_name;
  }
}
