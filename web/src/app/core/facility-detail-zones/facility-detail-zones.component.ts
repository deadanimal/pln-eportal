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
  selectedFacility = {
    facility_subcategory: "",
    value: "",
    display_name: "",
    link: "",
  };
  today: Date = new Date();

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
      facility_subcategory: "",
      value: "TA",
      display_name: "Teater Angkasa",
      link: "teater-angkasa",
    },
    {
      facility_subcategory: "",
      value: "GP",
      display_name: "Galeri Pameran",
      link: "galeri-pameran",
    },
    {
      facility_subcategory: "",
      value: "TT",
      display_name: "Teatret",
      link: "teatret",
    },
    {
      facility_subcategory: "",
      value: "BC",
      display_name: "Bilik Centaurus",
      link: "bilik-centaurus",
    },
    {
      facility_subcategory: "",
      value: "KR",
      display_name: "Kawasan Rekreasi",
      link: "kawasan-rekreasi",
    },
    {
      facility_subcategory: "",
      value: "SM",
      display_name: "Stesen Mikrosatelit",
      link: "stesen-mikrosatelit",
    },
    {
      facility_subcategory: "",
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
    class: "modal-dialog",
    backdrop: false,
    ignoreBackdropClick: true,
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
    this.today.setDate(this.today.getDate() + 1);

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
    this.facilitybookingFormGroup.value.booking_date = this.formatDate(
      this.facilitybookingFormGroup.value.booking_date
    );

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
