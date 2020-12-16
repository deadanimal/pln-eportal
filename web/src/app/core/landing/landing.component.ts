import {
  Component,
  OnInit,
  HostListener,
  TemplateRef,
  ViewEncapsulation,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { CalendarOptions } from "@fullcalendar/core";
import dayGridPlugin, { DayGridView } from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { TranslateService } from '@ngx-translate/core';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import swal from "sweetalert2";

import { AnnouncementsService } from "src/app/shared/services/announcements/announcements.service";
import { BannersService } from "src/app/shared/services/banners/banners.service";
import { FeedbacksService } from "src/app/shared/services/feedbacks/feedbacks.service";
import { PartnersService } from "src/app/shared/services/partners/partners.service";
import { WhatisinterestingsService } from "src/app/shared/services/whatisinterestings/whatisinterestings.service";
import { W3csService } from "src/app/shared/services/w3cs/w3cs.service";


@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class LandingComponent implements OnInit {
  // CSS class
  fontSize: string;

  // FormGroup
  ratingFormGroup: FormGroup;

  // Screen size
  screenWidth: any;
  screenHeight: any;

  rate: number = 0;
  totalnow: number = 8;
  totaltoday: number = 50;
  totalweek: number = 154;
  totalmonth: number = 367;
  totalyear: number = 590;
  totalall: number = 3098;

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog",
  };

  // Carousel
  itemsPerSlide = 6;
  singleSlideOffset = true;
  noWrap = false;
  activeSlideIndex = 0;

  // Data
  months = [
    "Januari",
    "Februari",
    "Mac",
    "April",
    "Mei",
    "Jun",
    "Julai",
    "Ogos",
    "September",
    "Oktober",
    "November",
    "Disember",
  ];
  currentDate = new Date();
  interestings = [];
  // interestings = [
  //   {
  //     title: "PAMERAN ANGKASA",
  //     description:
  //       "Pameran yang bertemakan astronomi dan penerokaan angkasa disediakan supaya pengunjung dapat merasai pengalaman pembelajaran yang unik melalui konsep hands-on dan minds-on. Ruangan pameran yang dilengkapi dengan bahan pameran yang interaktif  akan mewujudkan simulasi sebenar persekitaran ruangan angkasa.",
  //     img: "../../../assets/home/peneroka-angkasa.jpg",
  //   },
  //   {
  //     title: "TEATER ANGKASA",
  //     description:
  //       "Teater Angkasa menyerupai sebuah panggung wayang yang menjadi penanda aras sesebuah Planetarium.  Ia boleh dilihat dari segi skala saiz yang mampu memuatkan sehingga 200 orang penonton dalam satu masa dan infrastruktur teknologi bagi membantu mensimulasikan pergerakan dan keunikan objek yang berbeza dalam galaksi.  Ia mempunyai kubah aluminium hemisfera yang dilengkapi system bunyi sekelliling digital 6-saluran. Dua projektor full dome immersive system memberikan tayangan astronomi dan simulasi langit malam menyerupai sebuah balai cerap.",
  //     img: "../../../assets/home/teater-angkasa.jpg",
  //   },
  //   {
  //     title: "KEMBARA SIMULASI",
  //     description:
  //       "Kembara Simulasi merupakan sebuah simulator kokpit dua tempat duduk yang memberikan pengalaman penerokaan dan penerbangan ke angkasa lepas.  Pengunjung akan merasai pengalaman pergerakan tiga paksi dengan kebebasan pergerakan 360 darjah. Kapasiti: 2 orang/pusingan.",
  //     img: "../../../assets/home/space-pod.jpg",
  //   },
  //   {
  //     title: "TAMAN REKREASI",
  //     description:
  //       "Persekitaran bukit yang menghijau itu dihiasi dengan replika balai cerap China dan India dari era terdahulu. Replika Stonehenge tersergam di sebelah pintu masuk utama sementara Jam Matahari Merdeka menghiasi kawasan laluan masuk. Selain dari replika bahan sejarah di kawasan luarnya juga terdapat arca hasil karya seni.",
  //     img: "../../../assets/home/stonehenge.jpg",
  //   },
  //   {
  //     title: "KEDUDUKAN STRATEGIK",
  //     description:
  //       "Planetarium Negara terletak di dalam kawasan hijau Kuala Lumpur yang dikelilingi oleh beberapa mercu tanda iaitu Masjid Negara, Muzium Negara, Muzium Seni Islam, Tugu Negara dan Taman Botani Perdana. Lokasi dan keunikan senibina islam adalah aset terbesar sebagai eco-tourism negara yang menjadi daya tarikan dan tumpuan pelancong. Kemudahan pengangkutan yang mudah kepada pengunjung kerana lokasinya yang hampir dengan stesen Sentral Kuala Lumpur yang merupakan hab transit terbesar negara.",
  //     img: "../../../assets/home/kedudukan-strategik.jpg",
  //   },
  //   {
  //     title: "BALAI CERAP",
  //     description:
  //       "Suatu kemudahan yang menempatkan teleskop dan aksesori untuk orang awam mencerap objek-objek langit dan boleh juga digunakan untuk tujuan penyelidikan. Pada waktu siang para pengunjung boleh menggunakan teleskop di Balaicerap Planetarium Negara untuk melihat permukaan Matahari. Balaicerap Planetarium Negara dibuka kepada awam pada hari-hari tertentu dalam seminggu.",
  //     img: "../../../assets/home/balai-cerap-pn.jpg",
  //   },
  //   {
  //     title: "STESEN MIKROSATELIT",
  //     description:
  //       "Suatu kemudahan yang menempatkan peralatan komunikasi Radio Amatur di Planetarium Negara. Peralatan Radio Amatur yang disediakan di stesen mikrosatelit Planetarium Negara dapat digunakan bagi tujuan perhubungan radio kepada pengguna-pengguna radio amatur dan juga untuk berkomunikasi dengan mikrosatelit yang melintasi ruang udara Kuala Lumpur. Stesen ini juga digunakan untuk berkomunikasi dengan angkasawan yang sedang bertugas di Stesen Angkasa Antarabangsa (ISS).",
  //     img: "../../../assets/home/stesen-mikrosatelit.jpg",
  //   },
  //   {
  //     title: "GALERI PEMANDANGAN",
  //     description:
  //       "Galeri Pemandangan dengan ketinggian 33 meter ini terletak di Menara Balai Cerap Planetarium Negara. Kedudukan Planetarium Negara yang terletak diatas bukit membolehkan pengunjung berpeluang untuk menikmati pemandangan panaroma 3600 Kuala Lumpur dengan binokular yang disediakan. Keluasan: 46.57m2. Kapasiti: 10 orang.",
  //     img: "../../../assets/home/menara-pemandangan.jpg",
  //   },
  // ];
  interesting = {
    title_en: "",
    description_en: "",
    title_ms: "",
    description_ms: "",
  };
  collaborations = [
    {
      image: "../../../assets/img/partners/apadilangit.jpg",
      name: "Apadilangit",
    },
    {
      image: "../../../assets/img/partners/falakonline.jpg",
      name: "Falakonline",
    },
    {
      image: "../../../assets/img/partners/gostem.jpg",
      name: "GoSTEM",
    },
    {
      image: "../../../assets/img/partners/kpm.jpg",
      name: "Kementerian Pendidikan Malaysia",
    },
    {
      image: "../../../assets/img/partners/marts.jpg",
      name: "Malaysian Amateur Radio Transmitters' Society",
    },
    {
      image: "../../../assets/img/partners/ukm.jpg",
      name: "Universiti Kebangsaan Malaysia",
    },
    {
      image: "../../../assets/img/partners/um.jpg",
      name: "Universiti Malaya",
    },
  ];
  partners = [];
  announcements = [];
  banners = [];

  // Calendar
  calendarOptions: CalendarOptions = {
    events: [
      { title: "event 1", date: "2020-11-03" },
      { title: "event 2", date: "2020-11-07" },
      { title: "event 3", date: "2020-11-15" },
      { title: "event 4", date: "2020-11-23" },
    ],
    headerToolbar: {
      left: "prev,next",
      center: "title",
      right: "today",
    },
    height: 400,
    initialView: "dayGridMonth",
    plugins: [dayGridPlugin, interactionPlugin],
  };

  constructor(
    public formBuilder: FormBuilder,
    public modalService: BsModalService,
    public translate: TranslateService,
    private announcementService: AnnouncementsService,
    private bannerService: BannersService,
    private feedbackService: FeedbacksService,
    private partnerService: PartnersService,
    private whatisinterestingService: WhatisinterestingsService,
    private w3cService: W3csService
  ) {
    this.getAnnouncement();
    this.getBanner();
    this.getPartner();
    this.getWhatIsInteresting();

    this.ratingFormGroup = this.formBuilder.group({
      rating: new FormControl(0, Validators.compose([Validators.required])),
      comment: new FormControl(""),
    });
  }

  getAnnouncement() {
    this.announcementService.filter("status=true").subscribe(
      (res) => {
        console.log("res", res);
        this.announcements = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  getBanner() {
    this.bannerService.filter("status=true").subscribe(
      (res) => {
        console.log("res", res);
        this.banners = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  getPartner() {
    this.partnerService.filter("status=true").subscribe(
      (res) => {
        console.log("res", res);
        this.partners = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  getWhatIsInteresting() {
    this.whatisinterestingService.filter("status=true").subscribe(
      (res) => {
        console.log("res", res);
        this.interestings = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;

    this.w3cService.currentFontSize.subscribe(
      (fontSize) => (this.fontSize = fontSize)
    );
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  openModal(template: TemplateRef<any>, interesting) {
    this.modal = this.modalService.show(template, this.modalConfig);
    this.interesting = interesting;
  }

  closeModal() {
    this.modal.hide();
  }

  rating() {
    this.feedbackService.postRating(this.ratingFormGroup.value).subscribe(
      (res) => {
        console.log("res", res);
        swal.fire({
          icon: "success",
          title: "Nilai perkhidmatan kami",
          text:
            "Terima kasih kerana memberi penilaian terhadap perkhidmatan kami. Penilaian anda amat berharga buat kami.",
          buttonsStyling: false,
          confirmButtonText: "Tutup",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      },
      (err) => {
        console.error("err", err);
        swal.fire({
          icon: "warning",
          title: "Nilai perkhidmatan kami",
          text:
            "Terima kasih kerana memberi penilaian terhadap perkhidmatan kami. Penilaian anda amat berharga buat kami.",
          buttonsStyling: false,
          confirmButtonText: "Tutup",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }
    );
  }

  getBannerStyle() {
    console.log("getBannerStyle", this.screenHeight);
    if (this.screenHeight < 720) return { height: "400px" };
    else if (this.screenHeight >= 720) return { height: "600px" };
  }
}
