import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-operating-hour',
  templateUrl: './operating-hour.component.html',
  styleUrls: ['./operating-hour.component.scss']
})
export class OperatingHourComponent implements OnInit {
  // Data
  tickets = [
    {
      venue: "TAYANGAN PLANETARIUM",
      normalAdult: "RM12.00",
      mykadAdult: "RM6.00",
      normalChildren: "RM8.00",
      mykadChildren: "RM4.00",
      normalStudent: "RM8.00",
      mykadStudent: "RM4.00",
    },
    {
      venue: "KEMBARA SIMULASI / SPACE POD",
      normalAdult: "RM24.00",
      mykadAdult: "RM12.00",
      normalChildren: "RM16.00",
      mykadChildren: "RM8.00",
      normalStudent: "tiada",
      mykadStudent: "tiada",
    },
    {
      venue: "GALERI PAMERAN",
      normalAdult: "",
      mykadAdult: "",
      normalChildren: "",
      mykadChildren: "",
      normalStudent: "",
      mykadStudent: "",
    },
  ]

  constructor() { }

  ngOnInit() {
  }

}
