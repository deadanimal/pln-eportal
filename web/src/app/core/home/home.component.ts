import { Component, OnInit } from "@angular/core";

import { ModulesService } from 'src/app/shared/services/modules/modules.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  // Modules
  modules = [];
  /* modules = [
    {
      title: "Kembara Simulasi",
      link: "/simulator-ride",
      img: "../../../assets/home/icon/kembara-simulasi.jpeg",
    },
    {
      title: "Tayangan",
      link: "/shows",
      img: "../../../assets/home/icon/tayangan.jpeg",
    },
    {
      title: "Pameran",
      link: "/exhibit",
      img: "../../../assets/home/icon/pameran.jpeg",
    },
    {
      title: "Lawatan",
      link: "/visit",
      img: "../../../assets/home/icon/lawatan.jpeg",
    },
    {
      title: "Program Pendidikan",
      link: "/program",
      img: "../../../assets/home/icon/program-pendidikan.jpeg",
    },
    {
      title: "Maklum Balas",
      link: "/survey",
      img: "../../../assets/home/icon/maklum-balas.jpeg",
    },
    {
      title: "Fasiliti",
      link: "/facility",
      img: "../../../assets/home/icon/fasiliti.jpeg",
    },
    {
      title: "Penerbitan",
      link: "/publication",
      img: "../../../assets/home/icon/penerbitan.jpeg",
    },
    {
      title: "Kutubkhanah Mini",
      link: "/virtual-library",
      img: "../../../assets/home/icon/perpustakaan-maya.jpeg",
    },
  ]; */

  constructor(private moduleService: ModulesService) {
    this.getData();
  }

  getData() {
    this.moduleService.filter("status=true").subscribe(
      (res) => {
        console.log("res", res);
        this.modules = res;
      }, (err) => {
        console.log("err", err);
      }
    )
  }

  ngOnInit() {}
}
