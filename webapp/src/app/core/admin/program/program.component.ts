import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import swal from "sweetalert2";
import { EducationalProgram } from 'src/app/shared/services/educational-programs/educational-programs.model';
import { EducationalProgramsService } from 'src/app/shared/services/educational-programs/educational-programs.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/services/users/users.model';
import { UsersService } from 'src/app/shared/services/users/users.service';
import * as moment from 'moment'

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {

  // Data
  programs: EducationalProgram[] = []
  coordinators: User[] = []
  programTypes = [
    { value: 'PL', text: 'Public' },
    { value: 'PV', text: 'Private' }
  ]

  // Table
  entries: number = 10;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows: any = [
    {
      title: "Tiger Nixon",
      genre: "System Architect",
      description: "Edinburgh",
      duration: "61",
      date: "2011/04/25",
      price: "$320,800"
    },
    {
      title: "Garrett Winters",
      genre: "Accountant",
      description: "Tokyo",
      duration: "63",
      date: "2011/07/25",
      price: "$170,750"
    },
    {
      title: "Ashton Cox",
      genre: "Junior Technical Author",
      description: "San Francisco",
      duration: "66",
      date: "2009/01/12",
      price: "$86,000"
    },
    {
      title: "Cedric Kelly",
      genre: "Senior Javascript Developer",
      description: "Edinburgh",
      duration: "22",
      date: "2012/03/29",
      price: "$433,060"
    },
    {
      title: "Airi Satou",
      genre: "Accountant",
      description: "Tokyo",
      duration: "33",
      date: "2008/11/28",
      price: "$162,700"
    },
    {
      title: "Brielle Williamson",
      genre: "Integration Specialist",
      description: "New York",
      duration: "61",
      date: "2012/12/02",
      price: "$372,000"
    },
    {
      title: "Herrod Chandler",
      genre: "Sales Assistant",
      description: "San Francisco",
      duration: "59",
      date: "2012/08/06",
      price: "$137,500"
    },
    {
      title: "Rhona Davidson",
      genre: "Integration Specialist",
      description: "Tokyo",
      duration: "55",
      date: "2010/10/14",
      price: "$327,900"
    },
    {
      title: "Colleen Hurst",
      genre: "Javascript Developer",
      description: "San Francisco",
      duration: "39",
      date: "2009/09/15",
      price: "$205,500"
    },
    {
      title: "Sonya Frost",
      genre: "Software Engineer",
      description: "Edinburgh",
      duration: "23",
      date: "2008/12/13",
      price: "$103,600"
    },
    {
      title: "Jena Gaines",
      genre: "description Mandurationr",
      description: "London",
      duration: "30",
      date: "2008/12/19",
      price: "$90,560"
    },
    {
      title: "Quinn Flynn",
      genre: "Support Lead",
      description: "Edinburgh",
      duration: "22",
      date: "2013/03/03",
      price: "$342,000"
    },
    {
      title: "Charde Marshall",
      genre: "Regional Director",
      description: "San Francisco",
      duration: "36",
      date: "2008/10/16",
      price: "$470,600"
    },
    {
      title: "Haley Kennedy",
      genre: "Senior Marketing Designer",
      description: "London",
      duration: "43",
      date: "2012/12/18",
      price: "$313,500"
    },
    {
      title: "Tatyana Fitzpatrick",
      genre: "Regional Director",
      description: "London",
      duration: "19",
      date: "2010/03/17",
      price: "$385,750"
    },
    {
      title: "Michael Silva",
      genre: "Marketing Designer",
      description: "London",
      duration: "66",
      date: "2012/11/27",
      price: "$198,500"
    },
    {
      title: "Paul Byrd",
      genre: "Chief Financial descriptionr (CFO)",
      description: "New York",
      duration: "64",
      date: "2010/06/09",
      price: "$725,000"
    },
    {
      title: "Gloria Little",
      genre: "Systems Administrator",
      description: "New York",
      duration: "59",
      date: "2009/04/10",
      price: "$237,500"
    },
    {
      title: "Bradley Greer",
      genre: "Software Engineer",
      description: "London",
      duration: "41",
      date: "2012/10/13",
      price: "$132,000"
    },
    {
      title: "Dai Rios",
      genre: "Personnel Lead",
      description: "Edinburgh",
      duration: "35",
      date: "2012/09/26",
      price: "$217,500"
    },
    {
      title: "Jenette Caldwell",
      genre: "Development Lead",
      description: "New York",
      duration: "30",
      date: "2011/09/03",
      price: "$345,000"
    },
    {
      title: "Yuri Berry",
      genre: "Chief Marketing descriptionr (CMO)",
      description: "New York",
      duration: "40",
      date: "2009/06/25",
      price: "$675,000"
    },
    {
      title: "Caesar Vance",
      genre: "Pre-Sales Support",
      description: "New York",
      duration: "21",
      date: "2011/12/12",
      price: "$106,450"
    },
    {
      title: "Doris Wilder",
      genre: "Sales Assistant",
      description: "Sidney",
      duration: "23",
      date: "2010/09/20",
      price: "$85,600"
    },
    {
      title: "Angelica Ramos",
      genre: "Chief Executive descriptionr (CEO)",
      description: "London",
      duration: "47",
      date: "2009/10/09",
      price: "$1,200,000"
    },
    {
      title: "Gavin Joyce",
      genre: "Developer",
      description: "Edinburgh",
      duration: "42",
      date: "2010/12/22",
      price: "$92,575"
    },
    {
      title: "Jennifer Chang",
      genre: "Regional Director",
      description: "Singapore",
      duration: "28",
      date: "2010/11/14",
      price: "$357,650"
    },
    {
      title: "Brenden Wagner",
      genre: "Software Engineer",
      description: "San Francisco",
      duration: "28",
      date: "2011/06/07",
      price: "$206,850"
    },
    {
      title: "Fiona Green",
      genre: "Chief Operating descriptionr (COO)",
      description: "San Francisco",
      duration: "48",
      date: "2010/03/11",
      price: "$850,000"
    },
    {
      title: "Shou Itou",
      genre: "Regional Marketing",
      description: "Tokyo",
      duration: "20",
      date: "2011/08/14",
      price: "$163,000"
    },
    {
      title: "Michelle House",
      genre: "Integration Specialist",
      description: "Sidney",
      duration: "37",
      date: "2011/06/02",
      price: "$95,400"
    },
    {
      title: "Suki Burks",
      genre: "Developer",
      description: "London",
      duration: "53",
      date: "2009/10/22",
      price: "$114,500"
    },
    {
      title: "Prescott Bartlett",
      genre: "Technical Author",
      description: "London",
      duration: "27",
      date: "2011/05/07",
      price: "$145,000"
    },
    {
      title: "Gavin Cortez",
      genre: "Team Leader",
      description: "San Francisco",
      duration: "22",
      date: "2008/10/26",
      price: "$235,500"
    },
    {
      title: "Martena Mccray",
      genre: "Post-Sales support",
      description: "Edinburgh",
      duration: "46",
      date: "2011/03/09",
      price: "$324,050"
    },
    {
      title: "Unity Butler",
      genre: "Marketing Designer",
      description: "San Francisco",
      duration: "47",
      date: "2009/12/09",
      price: "$85,675"
    },
    {
      title: "Howard Hatfield",
      genre: "description Mandurationr",
      description: "San Francisco",
      duration: "51",
      date: "2008/12/16",
      price: "$164,500"
    },
    {
      title: "Hope Fuentes",
      genre: "Secretary",
      description: "San Francisco",
      duration: "41",
      date: "2010/02/12",
      price: "$109,850"
    },
    {
      title: "Vivian Harrell",
      genre: "Financial Controller",
      description: "San Francisco",
      duration: "62",
      date: "2009/02/14",
      price: "$452,500"
    },
    {
      title: "Timothy Mooney",
      genre: "description Mandurationr",
      description: "London",
      duration: "37",
      date: "2008/12/11",
      price: "$136,200"
    },
    {
      title: "Jackson Bradshaw",
      genre: "Director",
      description: "New York",
      duration: "65",
      date: "2008/09/26",
      price: "$645,750"
    },
    {
      title: "Olivia Liang",
      genre: "Support Engineer",
      description: "Singapore",
      duration: "64",
      date: "2011/02/03",
      price: "$234,500"
    },
    {
      title: "Bruno Nash",
      genre: "Software Engineer",
      description: "London",
      duration: "38",
      date: "2011/05/03",
      price: "$163,500"
    },
    {
      title: "Sakura Yamamoto",
      genre: "Support Engineer",
      description: "Tokyo",
      duration: "37",
      date: "2009/08/19",
      price: "$139,575"
    },
    {
      title: "Thor Walton",
      genre: "Developer",
      description: "New York",
      duration: "61",
      date: "2013/08/11",
      price: "$98,540"
    },
    {
      title: "Finn Camacho",
      genre: "Support Engineer",
      description: "San Francisco",
      duration: "47",
      date: "2009/07/07",
      price: "$87,500"
    },
    {
      title: "Serge Baldwin",
      genre: "Data Coordinator",
      description: "Singapore",
      duration: "64",
      date: "2012/04/09",
      price: "$138,575"
    },
    {
      title: "Zenaida Frank",
      genre: "Software Engineer",
      description: "New York",
      duration: "63",
      date: "2010/01/04",
      price: "$125,250"
    },
    {
      title: "Zorita Serrano",
      genre: "Software Engineer",
      description: "San Francisco",
      duration: "56",
      date: "2012/06/01",
      price: "$115,000"
    },
    {
      title: "Jennifer Acosta",
      genre: "Junior Javascript Developer",
      description: "Edinburgh",
      duration: "43",
      date: "2013/02/01",
      price: "$75,650"
    },
    {
      title: "Cara Stevens",
      genre: "Sales Assistant",
      description: "New York",
      duration: "46",
      date: "2011/12/06",
      price: "$145,600"
    },
    {
      title: "Hermione Butler",
      genre: "Regional Director",
      description: "London",
      duration: "47",
      date: "2011/03/21",
      price: "$356,250"
    },
    {
      title: "Lael Greer",
      genre: "Systems Administrator",
      description: "London",
      duration: "21",
      date: "2009/02/27",
      price: "$103,500"
    },
    {
      title: "Jonas Alexander",
      genre: "Developer",
      description: "San Francisco",
      duration: "30",
      date: "2010/07/14",
      price: "$86,500"
    },
    {
      title: "Shad Decker",
      genre: "Regional Director",
      description: "Edinburgh",
      duration: "51",
      date: "2008/11/13",
      price: "$183,000"
    },
    {
      title: "Michael Bruce",
      genre: "Javascript Developer",
      description: "Singapore",
      duration: "29",
      date: "2011/06/27",
      price: "$183,000"
    },
    {
      title: "Donna Snider",
      genre: "Customer Support",
      description: "New York",
      duration: "27",
      date: "2011/01/25",
      price: "$112,000"
    }
  ];

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog-centered modal-lg"
  };

  // Form
  programForm: FormGroup

  constructor(
    private programService: EducationalProgramsService,
    private userService: UsersService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder
  ) {
    this.coordinators = this.userService.administrator
    this.programs = this.programService.programs
    this.temp = this.programs.map((prop, key) => {
      return {
        ...prop,
        id: key
      };
    });
  }

  ngOnInit() {
    this.programForm = this.formBuilder.group({
      title: ['', Validators.compose([
        Validators.required
      ])],
      description: ['', Validators.compose([
        Validators.required
      ])],
      program_type: ['', Validators.compose([
        Validators.required
      ])],
      min_participant: ['', Validators.compose([
        Validators.required
      ])],
      max_participant: ['', Validators.compose([
        Validators.required
      ])],
      price: ['', Validators.compose([
        Validators.required
      ])],
      start_datetime: ['', Validators.compose([
        Validators.required
      ])],
      end_datetime: ['', Validators.compose([
        Validators.required
      ])],
      poster_link: ['', Validators.compose([
      ])],
      venue_id: ['', Validators.compose([
      ])],
      coordinator_id: ['', Validators.compose([
        Validators.required
      ])],
      status: ['', Validators.compose([
      ])]
    })
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }

  filterTable($event) {
    let val = $event.target.value;
    this.temp = this.programs.filter(function (d) {
      for (var key in d) {
        if (d[key].toLowerCase().indexOf(val) !== -1) {
          return true;
        }
      }
      return false;
    });
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
    this.activeRow = event.row;
  }

  openModal(modalRef: TemplateRef<any>) {
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide()
  }

  add() {
    this.programForm.value.start_datetime = moment(this.programForm.value.start_datetime).format('YYYY-MM-DDThh:mm[:ss[.uuuuuu]][+HH:MM|-HH:MM|Z]')
    this.programForm.value.end_datetime = moment(this.programForm.value.end_datetime).format('YYYY-MM-DDThh:mm[:ss[.uuuuuu]][+HH:MM|-HH:MM|Z]')
    
    this.programService.create(this.programForm.value).subscribe(
      () => {
        // Success
      },
      () => {
        // Denied
      },
      () => {
        // After
        this.success()
        this.modal.hide()
        this.programForm.reset()
        this.programService.getAll().subscribe()
      }
    )
  }

  success() {
    this.modal.hide()
    swal.fire({
      title: "Success",
      text: "New record has been added",
      type: "success",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-success"
    })
  }

}
