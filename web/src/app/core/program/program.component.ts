import {
  Component,
  OnInit,
  TemplateRef,
  ViewEncapsulation,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation,
} from "ngx-gallery";
import { ToastrService } from "ngx-toastr";
import swal from "sweetalert2";

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { JwtService } from "src/app/shared/jwt/jwt.service";
import { EducationalProgramsService } from "src/app/shared/services/educational-programs/educational-programs.service";
import { EducationalProgramApplicationsService } from "src/app/shared/services/educational-program-applications/educational-program-applications.service";
import { EducationalProgramDatesService } from "src/app/shared/services/educational-program-dates/educational-program-dates.service";
import { EducationalProgramImagesService } from "src/app/shared/services/educational-program-images/educational-program-images.service";
import { EducationalProgramActivitiesService } from "src/app/shared/services/educational-program-activities/educational-program-activities.service";
import { UsersService } from "src/app/shared/services/users/users.service";

@Component({
  selector: "app-program",
  templateUrl: "./program.component.html",
  styleUrls: ["./program.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ProgramComponent implements OnInit {
  // Modal
  defaultModal: BsModalRef;
  readmoreModal: BsModalRef;
  videoModal: BsModalRef;
  default = {
    keyboard: true,
    class: "modal-dialog",
    backdrop: false,
    ignoreBackdropClick: true,
  };

  // FormGroup
  eduprogramappFormGroup: FormGroup;

  // Data
  programs = [];
  /* programs = [
    {
      title: "PROGRAM PEMBANGUNAN MURID/GURU",
      program: [
        {
          name: "Planet Kidz",
          desc:
            "Planet Kidz merupakan penjenamaan semula Program Si Cilik Angkasa. Ia adalah merupakan program yang dijalankan secara tempahan oleh pihak sekolah.  Aktiviti – aktiviti Planet Kidz ini mengkhusus kepada para pelajar pra sekolah dan sekolah rendah tahap satu serta menyokong kurikulum standard kebangsaan yang ditetapkan oleh Kementerian Pelajaran Malaysia.<br/>Pelajar akan dapat meningkatkan pemahaman melalui aktiviti hands-on yang dijalankan sekali gus menyemai minat dalam bidang astronomi dan sains angkasa.  Selain itu juga, program ini menggalakkan para pelajar dan guru-guru untuk datang bukan hanya sekali sahaja ke Planetarium Negara.<br/>Program ini juga dapat menghidupkan semula aktiviti – aktiviti harian yang terdapat di Planetarium Negara agar standing dengan institusi/ jabatan lain yang menganjurkan aktiviti pembudayaan serta menjadi sumber rujukan utama di kalangan guru dan para pelajar terutamanya dalam bidang astronomi dan sains angkasa.",
          images: [
            {
              small: "assets/img/program/si cilik 1.jpg",
              medium: "assets/img/program/si cilik 1.jpg",
              big: "assets/img/program/si cilik 1.jpg",
            },
            {
              small: "assets/img/program/si cilik 2.jpg",
              medium: "assets/img/program/si cilik 2.jpg",
              big: "assets/img/program/si cilik 2.jpg",
            },
            {
              small: "assets/img/program/si cilik 3.jpg",
              medium: "assets/img/program/si cilik 3.jpg",
              big: "assets/img/program/si cilik 3.jpg",
            },
            {
              small: "assets/img/program/si cilik 4.jpg",
              medium: "assets/img/program/si cilik 4.jpg",
              big: "assets/img/program/si cilik 4.jpg",
            },
          ],
          pic: "Rosnita",
          announcement: "Terbuka (Tadika & Sekolah Rendah)",
          dates: [
            {
              date: "2020-09-01",
            },
            {
              date: "2020-09-02",
            },
          ],
          registration: true,
          video_link:
            "https://www.youtube.com/watch?v=e4rBL_arMXE&ab_channel=PlanetariumNegara",
        },
        {
          name: "Astro Spark",
          desc:
            "Astro Spark merupakan menjenamaan semula Kem ALAMI.  Ia merupakan satu aktiviti yang bertujuan mendedahkan para pelajar dengan pengalaman dan pengetahuan yang luas meliputi Bumi dan ruang angkasa. Ia juga bertujuan untuk memberi inspirasi, aspirasi dan peluang kepada golongan murid untuk menerokai pembelajaran melalui berkumpulan, aktiviti hands-on, pembentangan dan juga aktiviti fizikal. Daripada modul dan aktiviti-aktiviti yang diperkenalkan ini para pelajar akan mempelajari teknik membuat pemerhatian. Ianya bertujuan untuk membina kesepaduan kumpulan menerusi kesabaran, ketetapan masa, bekerjasama dan sebagainya. Objektif program ini ialah untuk :- Memberi pendedahan kepada para peserta mengenai kepentingan sains dan teknologi di dalam kehidupan seharian; Menggunakan populariti sains angkasa untuk menarik minat murid dalam bidang STEM (Science, Technology, Engineering, Mathematics); Sebagai galakan untuk mempraktikkan teori yang dipelajari di sekolah dengan aktiviti yang dijalankan di dalam program; Mengasah daya kreativiti dan inovasi ; dan Melahirkan pelajar yang minat  bidang sains, matematik dan teknologi angkasa.",
          images: [
            {
              small: "assets/img/program/kem alami 1.JPG",
              medium: "assets/img/program/kem alami 1.JPG",
              big: "assets/img/program/kem alami 1.JPG",
            },
            {
              small: "assets/img/program/kem alami 2.JPG",
              medium: "assets/img/program/kem alami 2.JPG",
              big: "assets/img/program/kem alami 2.JPG",
            },
            {
              small: "assets/img/program/kem alami 4.JPG",
              medium: "assets/img/program/kem alami 4.JPG",
              big: "assets/img/program/kem alami 4.JPG",
            },
            {
              small: "assets/img/program/kem alami 5.JPG",
              medium: "assets/img/program/kem alami 5.JPG",
              big: "assets/img/program/kem alami 5.JPG",
            },
            {
              small: "assets/img/program/kem alami 6.JPG",
              medium: "assets/img/program/kem alami 6.JPG",
              big: "assets/img/program/kem alami 6.JPG",
            },
          ],
          pic: "Rosnita",
          announcement: "Terbuka (sekolah rendah tahun 4 hingga 6)",
          dates: [
            {
              date: "2020-08-18",
            },
            {
              date: "2020-08-19",
            },
          ],
          registration: true,
        },
        {
          name: "BENGKEL ASTRONOMI UNTUK GURU",
          desc:
            "Bengkel ini dirangka khusus kepada sekumpulan guru apabila ada permintaan atau semasa program Kejohanann Roket Kebangsaan dan National Space Challenge. Objektif: Mempelajari dan memahami konsep sains angkasa agar guru mempunyai asas pengetahuan yang kukuh dan mampu mengendalikan kelas.	Berkongsi kaedah pengajaran dan pembelajaran jenis interaktif hands-on melalui bahan pameran, program dan aktiviti dengan guru bagi diterapkan oleh guru semasa mengajar sains di sekolah. Pendedahan kepada guru tentang perkhidmatan/produk yang ditawarkan oleh Planetarium Negara bagi memudahkan guru merancangkan lawatan ke Planetarium Negara.",
          images: [
            {
              small: "assets/img/program/bengkel astronomi 1.jpeg",
              medium: "assets/img/program/bengkel astronomi 1.jpeg",
              big: "assets/img/program/bengkel astronomi 1.jpeg",
            },
            {
              small: "assets/img/program/bengkel astronomi 2.jpg",
              medium: "assets/img/program/bengkel astronomi 2.jpg",
              big: "assets/img/program/bengkel astronomi 2.jpg",
            },
          ],
          pic: "Ella",
          announcement: "Tertutup",
          dates: [
            {
              date: "2020-07-21",
            },
            {
              date: "2020-07-22",
            },
          ],
          registration: false,
        },
      ],
    },
  ]; */
  selectedProgram = {
    id: "",
    title: "",
    description: "",
    video_link: "",
    activity: false,
  };
  programdates = [];
  programimages = [];
  programactivities = [];
  enabledProgramDates = [];

  // Dropdown
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
  programtypes = [
    {
      value: "PL",
      display_name: "Public",
    },
    {
      value: "PV",
      display_name: "Private",
    },
  ];
  programcategories = [
    {
      value: "P1",
      display_name: "PROGRAM PEMBANGUNAN MURID/GURU",
    },
    {
      value: "P2",
      display_name: "PROGRAM PENCERAPAN",
    },
    {
      value: "P3",
      display_name: "PROGRAM KHAS",
    },
    {
      value: "P4",
      display_name: "PROGRAM KEBANGSAAN",
    },
    {
      value: "P5",
      display_name: "PROGRAM ANTARABANGSA",
    },
    {
      value: "P6",
      display_name: "PROGRAM/RAKAN KERJASAMA",
    },
    {
      value: "P7",
      display_name: "PROGRAM JANGKAUAN (6 ZON)",
    },
    {
      value: "P8",
      display_name: "SEMINAR, CERAMAH, PLANETARIUM TALKS",
    },
    {
      value: "P9",
      display_name: "LAIN-LAIN",
    },
  ];
  programsubcategories = [
    {
      value: "NSC",
      display_name: "National Space Challenge",
    },
    {
      value: "KRK",
      display_name: "Kejohanan Roket Kebangsaan",
    },
    {
      value: "NAV",
      display_name: "Not Available",
    },
  ];
  statuses = [
    {
      value: "AV",
      display_name: "Available",
    },
    {
      value: "NA",
      display_name: "Not Available",
    },
  ];

  // Ngx Gallery
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    public formBuilder: FormBuilder,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private router: Router,
    private authService: AuthService,
    private jwtService: JwtService,
    private eduprogramService: EducationalProgramsService,
    private eduprogramappService: EducationalProgramApplicationsService,
    private eduprogramdateService: EducationalProgramDatesService,
    private eduprogramimageService: EducationalProgramImagesService,
    private eduprogramactivityService: EducationalProgramActivitiesService,
    private userService: UsersService
  ) {
    this.eduprogramappFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      full_name: new FormControl(""),
      email: new FormControl(""),
      phone: new FormControl(""),
      organisation_name: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      organisation_category: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      customer_id: new FormControl(""),
      educational_program_id: new FormControl(""),
      educational_program_date_id: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      participant: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      age: new FormControl("", Validators.compose([Validators.required])),
      activity: new FormControl(""),
      status: new FormControl("IP"),
      document_link: new FormControl(""),
      image_link: new FormControl(""),
      video_link: new FormControl(""),
    });

    this.getProgram();
    this.getProgramImage();
    this.getUser();
  }

  getProgram() {
    this.eduprogramService.getAll().subscribe(
      (res) => {
        console.log("res", res);
        this.programs = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  getProgramDate(program_id: string) {
    this.eduprogramdateService.filter("program_id=" + program_id).subscribe(
      (res) => {
        console.log("res", res);
        this.programdates = res;
        for (let i = 0; i < res.length; i++) {
          let date = new Date(res[i].program_date);
          this.enabledProgramDates.push(date);
        }
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  getProgramImage() {
    this.eduprogramimageService.getAll().subscribe(
      (res) => {
        console.log("res", res);
        this.programimages = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  getUser() {
    if (this.jwtService.getToken("accessToken")) {
      this.userService.get(this.authService.decodedToken().user_id).subscribe(
        (res) => {
          // console.log("res", res);
          this.eduprogramappFormGroup.patchValue({
            ...res,
            customer_id: res.id,
            id: "",
          });
        },
        (err) => {
          console.error("err", err);
        }
      );
    }
  }

  getProgramActivity(program_id: string) {
    this.eduprogramactivityService.filter("program_id=" + program_id).subscribe(
      (res) => {
        console.log("res", res);
        this.programactivities = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  ngOnInit(): void {
    this.galleryOptions = [
      {
        width: "400px",
        height: "500px",
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

  openDefaultModal(modalDefault: TemplateRef<any>, program) {
    if (this.jwtService.getToken("accessToken")) {
      // jika program tiada sub-program
      if (program.program_subcategory == "NAV") {
        this.defaultModal = this.modalService.show(modalDefault, this.default);

        this.selectedProgram = program;
        this.getProgramDate(program.id);
        this.getUser();

        if (program.activity) {
          this.getProgramActivity(program.id);
        }
      } else {
        this.router.navigate(["/program/forms/" + program.id]);
      }
    } else {
      this.toastr.error(
        "Harap maaf. Anda perlu log masuk terlebih dahulu untuk menyertai program ini.",
        "Ralat"
      );
    }
  }

  openReadMoreModal(modalDefault: TemplateRef<any>, program) {
    this.selectedProgram = program;
    this.readmoreModal = this.modalService.show(modalDefault, this.default);
  }

  openVideoModal(modalDefault: TemplateRef<any>, program) {
    this.selectedProgram = program;
    this.videoModal = this.modalService.show(modalDefault, this.default);
  }

  // Image Process
  onChange(event, type: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (type == "document_link")
        this.eduprogramappFormGroup.get("document_link").setValue(file);
      if (type == "image_link")
        this.eduprogramappFormGroup.get("image_link").setValue(file);
      if (type == "video_link")
        this.eduprogramappFormGroup.get("video_link").setValue(file);
    }
  }

  openAfterBooking() {
    let selectedProgramDate = this.formatDate(
      this.eduprogramappFormGroup.value.educational_program_date_id
    );

    let result = this.programdates.find((obj) => {
      return obj.program_date == selectedProgramDate;
    });
    this.eduprogramappFormGroup.value.educational_program_date_id = result.id;
    this.eduprogramappFormGroup.value.educational_program_id = this.selectedProgram.id;

    const formData = new FormData();
    formData.append(
      "organisation_name",
      this.eduprogramappFormGroup.value.organisation_name
    );
    formData.append(
      "organisation_category",
      this.eduprogramappFormGroup.value.organisation_category
    );
    formData.append(
      "customer_id",
      this.eduprogramappFormGroup.value.customer_id
    );
    formData.append(
      "educational_program_id",
      this.eduprogramappFormGroup.value.educational_program_id
    );
    formData.append(
      "educational_program_date_id",
      this.eduprogramappFormGroup.value.educational_program_date_id
    );
    formData.append(
      "participant",
      this.eduprogramappFormGroup.value.participant
    );
    formData.append("age", this.eduprogramappFormGroup.value.age);
    formData.append("activity", this.eduprogramappFormGroup.value.activity);
    formData.append("status", this.eduprogramappFormGroup.value.status);
    if (
      typeof this.eduprogramappFormGroup.get("document_link").value != "string"
    ) {
      formData.append(
        "document_link",
        this.eduprogramappFormGroup.get("document_link").value
      );
    }
    if (
      typeof this.eduprogramappFormGroup.get("image_link").value != "string"
    ) {
      formData.append(
        "image_link",
        this.eduprogramappFormGroup.get("image_link").value
      );
    }
    if (
      typeof this.eduprogramappFormGroup.get("video_link").value != "string"
    ) {
      formData.append(
        "video_link",
        this.eduprogramappFormGroup.get("video_link").value
      );
    }

    this.eduprogramappService.post(formData).subscribe(
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
}
