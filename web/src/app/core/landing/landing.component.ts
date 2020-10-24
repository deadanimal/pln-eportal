import { Component, OnInit, HostListener, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"],
})
export class LandingComponent implements OnInit {
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
  itemsPerSlide = 5;
  singleSlideOffset = true;
  noWrap = false;

  // Data
  interestings = [
    {
      title: "PAMERAN SAINS",
      description:
        "Pameran ini memberikan peluang kepada pelawat meneroka bahan pameran interaktif dan mencipta sendiri pengalaman pembelajaran yang unik. Ia menggalakkan interaksi di kalangan pelawat pada semua peringkat usia.",
      img: "../../../assets/home/peneroka-angkasa.jpg",
    },
    {
      title: "TEATER ANGKASA",
      description:
        "Teater Angkasa boleh memuatkan sehingga 190 orang penonton. Ia mempunyai skrin berbentuk kubah aluminium hesmisfera yang dilengkapi dengan sistem bunyi sekeliling digital 6-saluran. Dua projektor full dome immersive system memberikan pilihan tayangan setiap jam dan setiap hari.",
      img: "../../../assets/home/teater-angkasa.jpg",
    },
    {
      title: "KEMBARA SIMULASI",
      description:
        "Kemudahan terkini di ruang pameran Planetarium Negara yang merupakan simulator yang dapat memberikan pengalaman penerokaan dan penerbangan ke angkasa lepas menggunakan simulasi komputer dan dalam masa yang sama pengunjung akan merasai pengalaman pergerakan tiga dimensi dengan kebebasan pergerakan 360 darjah.",
      img: "../../../assets/home/space-pod.jpg",
    },
    {
      title: "TAMAN REKREASI",
      description:
        "Persekitaran bukit yang menghijau itu dihiasi dengan replika balai cerap China dan India dari era terdahulu. Replika Stonehenge tersergam di sebelah pintu masuk utama sementara Jam Matahari Merdeka menghiasi kawasan laluan masuk. Selain dari replika bahan sejarah di kawasan luarnya juga terdapat arca hasil karya seni.",
      img: "../../../assets/home/stonehenge.jpeg",
    },
  ];
  interesting = {
    title: "",
    description: "",
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

  constructor(public modalService: BsModalService) {}

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
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
}
