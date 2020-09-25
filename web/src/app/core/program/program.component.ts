import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation,
} from "ngx-gallery";
import { ToastrService } from "ngx-toastr";
import swal from "sweetalert2";

import { JwtService } from "src/app/shared/jwt/jwt.service";

@Component({
  selector: "app-program",
  templateUrl: "./program.component.html",
  styleUrls: ["./program.component.scss"],
})
export class ProgramComponent implements OnInit {
  defaultModal: BsModalRef;
  readmoreModal: BsModalRef;
  default = {
    keyboard: true,
    class: "modal-dialog-centered",
  };

  programs = [
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
        },
        {
          name: "BENGKEL ASTRONOMI UNTUK GURU",
          desc:
            "Bengkel ini dirangka khusus kepada sekumpulan guru apabila ada permintaan atau semasa program Kejohanann Roket Kebangsaan dan National Space Challenge. Objektif: Mempelajari dan memahami konsep sains angkasa agar guru mempunyai asas pengetahuan yang kukuh dan mampu mengendalikan kelas.	Berkongsi kaedah pengajaran dan pembelajaran jenis interaktif hands-on melalui bahan pameran, program dan aktiviti dengan guru bagi diterapkan oleh guru semasa mengajar sains di sekolah. Pendedahan kepada guru tentang perkhidmatan/produk yang ditawarkan oleh Planetarium Negara bagi memudahkan guru merancangkan lawatan ke Planetarium Negara.",
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
        },
      ],
    },
    /* {
      title: "PROGRAM PENCERAPAN",
      program: [
        {
          name: "PENCERAPAN MATAHARI",
          desc:
            "Program Pencerapan Matahari merupakan aktiviti melihat permukaan Matahari menggunakan teleskop dengan penuras khas yang disediakan oleh Planetarium Negara. Aktiviti ini dibuka kepada orang awam. Program akan dijalankan sekiranya Planetarium Negara mendapat jemputan oleh pihak tertentu di luar kawasan Planetarium Negara.",
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
          pic: "Zamri/Aswad/Aziz",
          announcement: "Terbuka (awam)",
        },
        {
          name: "PENCERAPAN LANGIT MALAM",
          desc:
            "Program pencerapan Langit Malam merupakan aktiviti melihat objek langit pada waktu malam seperti permukaan Bulan atau planet-planet menggunakan teleskop yang disediakan oleh Planetarium Negara dan juga simulasi langit malam di dalam Teater Angkasa. Aktiviti ini dibuka kepada orang awam. Program ini akan ditentukan tarikhnya jika dijalankan di Planetarium Negara atau mengikut lokasi dan tarikh penganjur sekiranya Planetarium mendapat jemputan di luar kawasan Planetarium Negara.",
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
          pic: "Zamri/Aswad/Aziz",
          announcement: "Terbuka (awam)",
        },
        {
          name: "FENOMENA ASTRONOMI (GERHANA MATAHARI SEPARA 21 JUN 2020)",
          desc:
            "Program Fenomena Astronomi akan dianjurkan oleh Planetarium Negara sekiranya terdapat fenomena Astronomi pada tarikh-tarikh tertentu yang menarik serta dapat dilihat dengan mudah oleh orang awam. Program terbuka kepada orang awam sama ada dijalankan di Planetarium Negara dan/atau dilokasi lain yang bersesuaian. Pelbagai aktiviti boleh dijalankan serentak seperti aktiviti pencerapan menggunakan teleskop, ceramah dan juga aktiviti hands-on di lokasi yang ditetapkan. Antara program yang akan dijalankan di Planetarium Negara dan juga beberapa lokasi lain adalah PROGRAM GERHANA MATAHARI SEPARA yang akan berlaku di Malaysia pada 21 JUN 2020.",
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
          pic: "Zamri/Aswad/Aziz",
          announcement: "Terbuka (awam)",
        },
      ],
    },
    {
      title: "PROGRAM KHAS",
      program: [
        {
          name: "GLOBAL MALAYSIAN ASTRONOMY CONFERENCE",
          desc:
            "Konvensyen ini bertujuan untuk mengumpulkan komuniti astronomi tempatan dan global untuk pertama kalinya bagi mencapai objektif berikut: Mempelajari mengenai projek penyelidikan antara satu sama lain, membina rangkaian dan membentuk perkongsian jangka panjang dan kolaborasi penyelidikan. Membincangkan dan merumuskan rancangan konkrit untuk mengembangkan pendidikan dan penyelidikan astronomi di Malaysia di semua peringkat, dari sekolah hingga universiti hingga ke balai cerap dan agensi kerajaan. Memperkuat jaringan ahli astronomi Malaysia sebagai blok untuk menggunakan sumber terhad kami dengan lebih cekap, dan mempunyai pengaruh yang lebih kuat terhadap pembuat dasar dan agensi pembiayaan. Meningkatkan kesedaran orang ramai mengenai penyelidikan yang dilakukan oleh ahli astronomi Malaysia dan laluan yang tersedia untuk kerjaya dalam bidang astronomi. Melebarkan kepelbagaian kami melalui minat bersama untuk astronomi, bersama dengan rakyat Malaysia dari pelbagai etnik, agama, dan sosio-ekonomi",
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
          pic: "Ella",
          announcement: "Tertutup (jemputan NGO, penggiat astronomi)",
        },
        {
          name: "MINGGU SAINS NEGARA",
          desc:
            "Sambutan Minggu Sains Negara (MScN) merupakan salah satu daripada inisiatif Kementerian Sains, Teknologi dan Inovasi dalam menyemarak dan membudayakan Sains, Teknologi dan Inovasi (STI) di pelbagai peringkat. Program ini bertujuan untuk meningkatkan kesedaran dan kepentingan STI kepada semua lapisan masyarakat dengan menampilkan pelbagai program berasaskan “sains” yang menarik dan interaktif. Penganjuran program ini adalah selari dengan sambutan World Science Day yang dianjurkan oleh United Nations Organization for Education, Science and Culture (UNESCO) semenjak tahun 2002. Planetarium Negara dipilih sebagai salah satu lokasi utama penganjuran Minggu Sains Negara 2020 di Kuala Lumpur. Pelbagai aktiviti hands-on dan interaktif sains angkasa akan dilaksanakan dan melibatkan kerjasama daripada pelbagai organisasi seperti NGO, kelab dan persatuan astronomi, penggiat astronomi, universiti dan persatuan Radio Amatur. Aktiviti ini akan diadakan pada minggu pertama bulan April setiap tahun.",
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
          pic: "Zul",
          announcement: "Terbuka (awam)",
        },
        {
          name: "WORLD SPACE WEEK",
          desc:
            "Minggu Angkasa Sedunia (World Space Week) merupakan sambutan peringkat antarabangsa yang telah diisytiharkan pada tahun 1999 di Perhimpunan Agung Pertubuhan Bangsa-Bangsa Bersatu (The United Nations General Assembly). Perhimpunan ini telah mengisytiharkan bahawa Minggu Angkasa Sedunia disambut pada tarikh 4hb hingga 10hb Oktober setiap tahun bagi memperingati dua peristiwa penting iaitu: 4 Oktober 1957: Pelancaran satelit bumi buatan manusia yang pertama, Sputnik 1, sekaligus membuka laluan penerokaan angkasa; dan 10 Oktober 1967: Majlis menandatangani Treaty on Principles Governing the Activites of States in the Exploration dan Peaceful Uses of Outer Space termasuk Bulan dan objek-objek samawi lain. Tema bagi Minggu Angkasa Sedunia 2020 ialah “Satellites Improve Life”",
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
          pic: "Ella",
          announcement: "Terbuka (awam)",
        },
        {
          name: "ISS CONTACT",
          desc:
            "Program ini mempunyai objektif untuk memberi pendedahan kepada pelajar-pelajar sekolah tentang kepentingan teknologi angkasa serta memberi peluang bagi mereka mempelajari tentang kehidupan angkasawan di ISS. Beberapa orang pelajar terpilih dari seluruh negara akan berkomunikasi dengan angkasawan yang sedang bertugas di Stesen Angkasa Antaranagsa (ISS) menggunakan kemudahan peralatan komunikasi radio amatur yang terdapat di Stesen Mikrosatelit Planetarium Negara.",
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
          pic: "Ella",
          announcement: "Terbuka (jemputan)",
        },
      ],
    },
    {
      title: "PROGRAM KEBANGSAAN",
      program: [
        {
          name: "KEJOHANAN ROKET KEBANGSAAN",
          desc:
            "Kejohanan Roket Kebangsaan  merupakan sebuah pertandingan roket air berbentuk “sukan sains angkasa” yang menggabungkan aktiviti kecergasan fizikal di atas padang dan aplikasi teori sains berkaitan dengan roket dan teknologi pelancarannya. Di dalam industri pelancaran roket, pemahaman mengenai hukum-hukum sains, khususnya konsep fizik yang berkaitan dengan pergerakan objek-objek, masih menjadi asas kepada setiap pelancaran roket yang sebenar. Kejohanan Roket Kebangsaan 2020 (KRK2020) adalah program kerjasama dengan Kementerian Pendidikan Malaysia (KPM), Universiti Teknologi Mara (UiTM) dan Majlis Amanah Rakyat (MARA).  Program KRK ini telah dianjurkan semenjak tahun 2003 dan pada tahun ini ianya merupakan penganjuran untuk kali yang ke-18.",
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
          pic: "Ridhuan",
          announcement:
            "Peringkat Negeri: Terbuka (sekolah menengah tingkatan 3 & 4). Peringkat Kebangsaan (tertutup wakil negeri sahaja)",
        },
        {
          name: "NATIONAL SPACE CHALLENGE PRIME MINISTER’S TROPHY",
          desc:
            "National Space Challenge Prime Minister’s Trophy (NSC) merupakan program tahunan berbentuk “Minds-On, Hearts-On, Hands-On Learning Engagement” yang direka khas untuk murid sekolah rendah Tahun 4 dan 5. Program ini merupakan kerjasama strategik di antara Planetarium Negara dan Bahagian Sukan, Kokurikulum dan Kesenian, Kementerian Pendidikan Malaysia. NSC telah memasuki tahun ke-23 sejak mula diperkenalkan pada tahun 1997 sebagai Kuiz Sains Angkasa Piala Perdana Menteri di sekitar Lembah Klang. Objektif program ini ialah: merangsang minat golongan muda terhadap sains dan teknologi khususnya dalam bidang sains angkasa; sebagai platform pendedahan ilmu ke arah pemilihan aliran pendidikan serta kerjaya terutama dalam bidang sains dan teknologi; dan meningkatkan kesedaran masyarakat terhadap kepentingan STI dalam kehidupan seharian Peserta akan menjalani Ujian Kelayakan NSC2020 secara dalam talian (online).  Hanya 30 orang murid yang memperolehi markah kumulatif tertinggi dari 15 negeri terpilih untuk bertanding ke peringkat kebangsaan.",
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
          pic: "Ella",
          announcement:
            "Peringkat Negeri: Terbuka (sekolah rendah tahun 4 & 5). Peringkat Kebangsaan (tertutup wakil negeri sahaja)",
        },
        {
          name: "NSC POSTER CONTEST",
          desc:
            "Pertandingan ini bertujuan menggalakkan kanak-kanak mengembangkan imaginasi dan kreativiti mereka dari sudut pengembaraan dan penerokaan angkasa dan diterjemahkan dalam bentuk seni lukis dan warna.   Pertandingan ini akan membuka peluang unik kepada murid-murid sekolah untuk mengasah bakat, kreativiti dan imaginasi sains dan teknologi angkasa secara lebih mendalam. Ianya juga dapat menibgkatkan minat dan kesedarann sains dan teknologi angkasa di akalangan generasi muda melalui medium kesenian.",
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
          pic: "Ella & Ridhuan",
          announcement: "Terbuka (sekolah rendah)",
        },
        {
          name: "KONVENSYEN ASTRONOMY NASIONAL (ASTROCON)",
          desc:
            "Konvensyen Astronomi Nasional atau AstroCON merupakan aktiviti seminar yang dijalankan secara dua tahun sekali. Peserta-peserta seminar terdiri daripada penggiat-penggiat Astronomi di seluruh negara. Peserta akan membentangkan perkembangan aktiviti dan perancangan masa hadapan aktiviti Astronomi masing-masing untuk dikongsi bersama komuniti Astronomi di seluruh negara. Program akan dijalankan di Planetarium Negara. Program ini juga merupakan suatu platform pertukaran pandangan dan membina jaringan di kalangan penggiat-penggiat Astronomi di Malaysia.",
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
          pic: "Zamri/Aswad/Aziz",
          announcement: "Terbuka (NGO, penggiat astronomi, awam)",
        },
      ],
    },
    {
      title: "PROGRAM ANTARABANGSA",
      program: [
        {
          name: "APRSAF Water Rocket Event",
          desc:
            "Pada setiap tahun, johan Kejohanan Roket Kebangsaan dan 1 buah wakil dari sekolah MRSM akan mewakili Malaysia untuk bertanding diperingkat Asia Pacific.  Pertandingan antarabangsa ini dijalankan secara individu dan hanya kategori sasaran yang dipertandingkan. Objektif penghantaran peserta Malaysia inii adalah sebagai pendedahan dengan tahap pertandingan di peringkat antarabangsa sebagai medan pembelajaran bagi meningkatkan pengetahuan, kemahiran, dan soft-skills para peserta.",
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
          pic: "Ridhuan",
          announcement:
            "Tertutup (Johan KRK Kebangsaan akan mewakili Malaysia)",
        },
        {
          name: "APRSAF Poster Contest",
          desc:
            "Peraduan poster untuk kanak-kanak ini dianjurkan oleh APRSAF dibawah Kumpulan Kerja Pendidikan Angkasa (SEWG) sebagai sebahagian persidangan yang dianjurkan setiap tahun.  Peraduan Poster ini akan memberi peluang kepada kanak-kanak untuk menyelami imajinasi mereka, menggunakan kreativiti mereka dan mempamerkan idea mereka dalam bentuk seni. Peraduan ini bertujuan untuk meningkatkan minat terhadap sains dan teknologi angkasa di kalangan kanak-kanak kecil. Objektif: Untuk meningkatkan minat dan pemahaman kanak-kanak dalam sains dan teknologi ruang angkasa. Untuk mendorong kanak-kanak meluaskan imaginasi mereka tentang alam semesta.",
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
          pic: "Ridhuan",
          announcement: "Terbuka (sekolah rendah)",
        },
      ],
    },
    {
      title: "PROGRAM/RAKAN KERJASAMA",
      program: [
        {
          name: "Program Citra Angkasa",
          desc:
            "Program Citra Angkasa merupakan program berbentuk perkongsian ilmu bersama pakar akademik dan aktiviti interaktif sains angkasa melalui aktiviti hands on menggunakan fasiliti di Planetarium Negara. Program ini mengandungi 4 sesi dan bertempat di Planetarium Negara. Program ini dilaksanakan melalui kerjasama pintar di antara Planetarium Negara dan rakan strategik dari Pusat CITRA Universiti (UKM) dan Kementerian Pendidikan Malaysia (KPM). Objektif program ini ialah: merangsang minat dan membuka minda generasi muda untuk menceburi bidang sains dan teknologi terutamanya sains angkasa; perkongsian kepakaran, pengetahuan dan pengalaman dalam sains dan teknologi di kalangan ahli akademik jemputan; dan mengoptimumkan sumber daripada rakan kerjasama iaitu Pusat CITRA Angkasa (UKM) dan Kementerian Pendidikan Malaysia (KPM).",
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
          pic: "Ella",
          announcement: "Tertutup",
        },
        {
          name: "MySOLAR",
          desc:
            "Malaysia Solar Competition (My-SOLAR) atau Pertandingan Solar Malaysia merupakan satu program kerjasama antara Planetarium Negara dan MyRobotz Enterprise.  Program ini berkonsepkan sebuah pertandingan yang menggunakan sumber cahaya daripada lampu cahaya limpah bagi menggantikan sumber cahaya matahari. Program yang telah memasuki tahun kelima penganjurannya dengan mensasarkan dua (2) kategori untuk dipertandingkan iaitu kategori sekolah rendah (junior) dan kategori sekolah menengah (senior).  Setiap pasukan terdiri daripada seorang (1) guru pengiring dan tiga (3) orang murid/peserta. Pemenang dikira berdasarkan pasukan yang mampu mengharungi trek tersebut dengan catatan masa yang paling singkat. Objektif: Menyediakan platform persaingan dan peluang untuk pelajar menonjolkan kemahiran dan ilmu pengetahuan masing-masing di peringkat kebangsaan; Bersaing dalam persaingan berasaskan teknikal dan menerapkan apa yang telah dipelajari di bilik darjah; dan Menyediakan saluran komunikasi antara pelajar dari sekolah dan juga IPTA/IPTS.",
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
          pic: "Ridhuan",
          announcement: "Terbuka",
          further_detail: "http://myrobotzmis.blogspot.com",
        },
        {
          name: "Kem Angkasa Generasi Marikh",
          desc:
            "Kem Angkasa anjuran Generasi Marikh ini dilaksanakan beberapa siri dengan tema yang berbeza seperti Moonshot, Space Race Junior, Astronutz, Astroprenuer, Robotics dan Bladerz Science.  Setiap kem dibuat dengan tujuan untuk membimbing dan mendorong anda ke arah memaksimumkan potensi anda.",
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
          pic: "",
          announcement: "Terbuka",
          further_detail: "https://generasimarikh.com/",
        },
        {
          name: "Apadilangit",
          desc:
            "Pelbagai program dan aktivti dirangka mengikut tahap umur, pendedahan dan objektif program.  Antara program dan aktivti yang mendapat permintaan ramai ialah Kem Angkasa Cilik, Celik Angkasa, Space4STEM, Astroinclusive dan pencerapan.",
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
          pic: "",
          announcement: "Terbuka",
          further_detail: "http://apadilangit.com/",
        },
        {
          name: "Go STEM",
          desc:
            "Program-program anjuran Go STEM adalah memberi tumpuan terutamanya kepada pengembangan Sains, Teknologi, Kejuruteraan dan Program dan pameran pendidikan berkaitan Matematik (STEM). Antara program yang mendapat sambutan ialah Aerospace Science Discovery Camp, Space Explorer @ Planetarium Negara, STEM Auto Solar Camp dan Space Explorer @ Planetarium Negara Lite.",
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
          pic: "",
          announcement: "Terbuka",
          further_detail: "http://gostemmalaysia.mystrikingly.com/#go-stem",
        },
      ],
    },
    {
      title: "PROGRAM JANGKAUAN (6 ZON)",
      program: [
        {
          name: "",
          desc:
            "Secara amnya program ini dibahagikan kepada 6 zon iaitu zon utara, zon tengah, zon selatan, zon timur, zon Sarawak dan zon Sabah/Labuan.    Pelbagai pengisian sepanjang program ini dijalankan seperti pencerapan Matahari, aktiviti hands-on, bengkel, tayangan mini planetarium dan lain-lain berdasarkan kesesuaian sesuatu lokasi. Program ini mempromosi dan membudayakan astronomi dan sains angkasa kepada semua lapisan masyarakat dan peringkat umur. Program Jangkauan ini juga sebagai wadah penyampaian maklumat di luar bilik darjah khususnya maklumat berkaitan bidang astronomi dan sains angkasa sebagai inisiatif tambahan kepada pembelajaran di sekolah.",
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
          pic: "Ella",
          announcement: "Terbuka",
        },
      ],
    },
    {
      title: "SEMINAR, CERAMAH, PLANETARIUM TALKS",
      program: [
        {
          name: "",
          desc:
            "Program seminar, ceramah dan Planetarium Talks merupakan aktiviti pertemuan di antara pakar-pakar Astronomi atau Sains Angkasa sama ada dari tempatan atau antarabangsa  dengan orang awam atau penggiat-penggiat Astronomi di Malaysia untuk membincangkan sebarang topik terkini atau penemuan terbaru atau mungkin juga oleh delegasi negara tertentu membentangkan perkembangan aktiviti Astronomi atau Sains Angkasa di negara meraka. Tajuk dan tarikh bergantung kepada ketentuan penceramah dan aktiviti akan diadakan di Planetarium Negara",
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
          pic: "Zamri/Aswad/Aziz",
          announcement: "Terbuka (NGO, penggiat astronomi, awam)",
        },
      ],
    }, */
  ];

  selectedProgram = {
    name: "",
    pic: "",
    announcement: "",
    desc: "",
  };

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private toastr: ToastrService,
    private modalService: BsModalService,
    private jwtService: JwtService
  ) {}

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

  openDefaultModal(modalDefault: TemplateRef<any>) {
    if (this.jwtService.getToken("accessToken")) {
      this.defaultModal = this.modalService.show(modalDefault, this.default);
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
