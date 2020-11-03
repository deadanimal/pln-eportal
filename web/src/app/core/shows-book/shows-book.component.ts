import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { ShowingsService } from "src/app/shared/services/showings/showings.service";
import { ShowtimesService } from "src/app/shared/services/showtimes/showtimes.service";
import { ShowbookingsService } from "src/app/shared/services/showbookings/showbookings.service";

@Component({
  selector: "app-shows-book",
  templateUrl: "./shows-book.component.html",
  styleUrls: ["./shows-book.component.scss"],
})
export class ShowsBookComponent implements OnInit {
  // Data
  show: any;
  /* seats = [
    // row 1
    {
      column: 3,
      row: 0,
      name: "A1",
    },
    {
      column: 4,
      row: 0,
      name: "A2",
    },
    {
      column: 6,
      row: 0,
      name: "B1",
    },
    {
      column: 7,
      row: 0,
      name: "B2",
    },
    {
      column: 8,
      row: 0,
      name: "B3",
    },
    {
      column: 9,
      row: 0,
      name: "B4",
    },
    {
      column: 10,
      row: 0,
      name: "B5",
    },
    {
      column: 11,
      row: 0,
      name: "B6",
    },
    {
      column: 12,
      row: 0,
      name: "B7",
    },
    {
      column: 14,
      row: 0,
      name: "B8",
    },
    {
      column: 15,
      row: 0,
      name: "B9",
    },
    {
      column: 16,
      row: 0,
      name: "B10",
    },
    {
      column: 17,
      row: 0,
      name: "B11",
    },
    {
      column: 19,
      row: 0,
      name: "B12",
    },
    {
      column: 20,
      row: 0,
      name: "B13",
    },
    {
      column: 21,
      row: 0,
      name: "B14",
    },
    {
      column: 22,
      row: 0,
      name: "B15",
    },
    {
      column: 23,
      row: 0,
      name: "B16",
    },
    {
      column: 24,
      row: 0,
      name: "B17",
    },
    {
      column: 25,
      row: 0,
      name: "B18",
    },
    {
      column: 27,
      row: 0,
      name: "C1",
    },
    {
      column: 28,
      row: 0,
      name: "C2",
    },

    // row 2
    {
      column: 0,
      row: 1,
      name: "A3",
    },
    {
      column: 1,
      row: 1,
      name: "A4",
    },
    {
      column: 2,
      row: 1,
      name: "A5",
    },
    {
      column: 3,
      row: 1,
      name: "A6",
    },
    {
      column: 4,
      row: 1,
      name: "A7",
    },
    {
      column: 6,
      row: 1,
      name: "B19",
    },
    {
      column: 7,
      row: 1,
      name: "B20",
    },
    {
      column: 8,
      row: 1,
      name: "B21",
    },
    {
      column: 9,
      row: 1,
      name: "B22",
    },
    {
      column: 10,
      row: 1,
      name: "B23",
    },
    {
      column: 11,
      row: 1,
      name: "B24",
    },
    {
      column: 12,
      row: 1,
      name: "B25",
    },
    {
      column: 19,
      row: 1,
      name: "B26",
    },
    {
      column: 20,
      row: 1,
      name: "B27",
    },
    {
      column: 21,
      row: 1,
      name: "B28",
    },
    {
      column: 22,
      row: 1,
      name: "B29",
    },
    {
      column: 23,
      row: 1,
      name: "B30",
    },
    {
      column: 24,
      row: 1,
      name: "B31",
    },
    {
      column: 25,
      row: 1,
      name: "B32",
    },
    {
      column: 27,
      row: 1,
      name: "C3",
    },
    {
      column: 28,
      row: 1,
      name: "C4",
    },
    {
      column: 29,
      row: 1,
      name: "C5",
    },
    {
      column: 30,
      row: 1,
      name: "C6",
    },
    {
      column: 31,
      row: 1,
      name: "C7",
    },

    // row 3
    {
      column: 0,
      row: 2,
      name: "A8",
    },
    {
      column: 1,
      row: 2,
      name: "A9",
    },
    {
      column: 2,
      row: 2,
      name: "A10",
    },
    {
      column: 3,
      row: 2,
      name: "A11",
    },
    {
      column: 4,
      row: 2,
      name: "A12",
    },
    {
      column: 7,
      row: 2,
      name: "B33",
    },
    {
      column: 8,
      row: 2,
      name: "B34",
    },
    {
      column: 9,
      row: 2,
      name: "B35",
    },
    {
      column: 10,
      row: 2,
      name: "B36",
    },
    {
      column: 11,
      row: 2,
      name: "B37",
    },
    {
      column: 12,
      row: 2,
      name: "B38",
    },
    {
      column: 19,
      row: 2,
      name: "B39",
    },
    {
      column: 20,
      row: 2,
      name: "B40",
    },
    {
      column: 21,
      row: 2,
      name: "B41",
    },
    {
      column: 22,
      row: 2,
      name: "B42",
    },
    {
      column: 23,
      row: 2,
      name: "B43",
    },
    {
      column: 24,
      row: 2,
      name: "B44",
    },
    {
      column: 27,
      row: 2,
      name: "C8",
    },
    {
      column: 28,
      row: 2,
      name: "C9",
    },
    {
      column: 29,
      row: 2,
      name: "C10",
    },
    {
      column: 30,
      row: 2,
      name: "C11",
    },
    {
      column: 31,
      row: 2,
      name: "C12",
    },

    // row 4

    // row 5
    {
      column: 0,
      row: 4,
      name: "D1",
    },
    {
      column: 1,
      row: 4,
      name: "D2",
    },
    {
      column: 2,
      row: 4,
      name: "D3",
    },
    {
      column: 3,
      row: 4,
      name: "D4",
    },
    {
      column: 4,
      row: 4,
      name: "D5",
    },
    {
      column: 5,
      row: 4,
      name: "D6",
    },
    {
      column: 6,
      row: 4,
      name: "D7",
    },
    {
      column: 7,
      row: 4,
      name: "D8",
    },
    {
      column: 8,
      row: 4,
      name: "D9",
    },
    {
      column: 9,
      row: 4,
      name: "D10",
    },
    {
      column: 10,
      row: 4,
      name: "D11",
    },
    {
      column: 11,
      row: 4,
      name: "D12",
    },
    {
      column: 12,
      row: 4,
      name: "D13",
    },
    {
      column: 19,
      row: 4,
      name: "F1",
    },
    {
      column: 20,
      row: 4,
      name: "F2",
    },
    {
      column: 21,
      row: 4,
      name: "F3",
    },
    {
      column: 22,
      row: 4,
      name: "F4",
    },
    {
      column: 23,
      row: 4,
      name: "F5",
    },
    {
      column: 24,
      row: 4,
      name: "F6",
    },
    {
      column: 25,
      row: 4,
      name: "F7",
    },
    {
      column: 26,
      row: 4,
      name: "F8",
    },
    {
      column: 27,
      row: 4,
      name: "F9",
    },
    {
      column: 28,
      row: 4,
      name: "F10",
    },
    {
      column: 29,
      row: 4,
      name: "F11",
    },
    {
      column: 30,
      row: 4,
      name: "F12",
    },
    {
      column: 31,
      row: 4,
      name: "F13",
    },

    // row 6
    {
      column: 1,
      row: 5,
      name: "D14",
    },
    {
      column: 2,
      row: 5,
      name: "D15",
    },
    {
      column: 3,
      row: 5,
      name: "D16",
    },
    {
      column: 4,
      row: 5,
      name: "D17",
    },
    {
      column: 5,
      row: 5,
      name: "D18",
    },
    {
      column: 6,
      row: 5,
      name: "D19",
    },
    {
      column: 7,
      row: 5,
      name: "D20",
    },
    {
      column: 8,
      row: 5,
      name: "D21",
    },
    {
      column: 9,
      row: 5,
      name: "D22",
    },
    {
      column: 10,
      row: 5,
      name: "D23",
    },
    {
      column: 11,
      row: 5,
      name: "D24",
    },
    {
      column: 12,
      row: 5,
      name: "D25",
    },
    {
      column: 19,
      row: 5,
      name: "F14",
    },
    {
      column: 20,
      row: 5,
      name: "F15",
    },
    {
      column: 21,
      row: 5,
      name: "F16",
    },
    {
      column: 22,
      row: 5,
      name: "F17",
    },
    {
      column: 23,
      row: 5,
      name: "F18",
    },
    {
      column: 24,
      row: 5,
      name: "F19",
    },
    {
      column: 25,
      row: 5,
      name: "F20",
    },
    {
      column: 26,
      row: 5,
      name: "F21",
    },
    {
      column: 27,
      row: 5,
      name: "F22",
    },
    {
      column: 28,
      row: 5,
      name: "F23",
    },
    {
      column: 29,
      row: 5,
      name: "F24",
    },
    {
      column: 30,
      row: 5,
      name: "F25",
    },

    // row 7
    {
      column: 1,
      row: 6,
      name: "D26",
    },
    {
      column: 2,
      row: 6,
      name: "D27",
    },
    {
      column: 3,
      row: 6,
      name: "D28",
    },
    {
      column: 4,
      row: 6,
      name: "D29",
    },
    {
      column: 5,
      row: 6,
      name: "D30",
    },
    {
      column: 6,
      row: 6,
      name: "D31",
    },
    {
      column: 7,
      row: 6,
      name: "D32",
    },
    {
      column: 8,
      row: 6,
      name: "D33",
    },
    {
      column: 9,
      row: 6,
      name: "D34",
    },
    {
      column: 10,
      row: 6,
      name: "D35",
    },
    {
      column: 11,
      row: 6,
      name: "D36",
    },
    {
      column: 12,
      row: 6,
      name: "D37",
    },
    {
      column: 19,
      row: 6,
      name: "F26",
    },
    {
      column: 20,
      row: 6,
      name: "F27",
    },
    {
      column: 21,
      row: 6,
      name: "F28",
    },
    {
      column: 22,
      row: 6,
      name: "F29",
    },
    {
      column: 23,
      row: 6,
      name: "F30",
    },
    {
      column: 24,
      row: 6,
      name: "F31",
    },
    {
      column: 25,
      row: 6,
      name: "F32",
    },
    {
      column: 26,
      row: 6,
      name: "F33",
    },
    {
      column: 27,
      row: 6,
      name: "F34",
    },
    {
      column: 28,
      row: 6,
      name: "F35",
    },
    {
      column: 29,
      row: 6,
      name: "F36",
    },

    // row 8
    {
      column: 3,
      row: 7,
      name: "D37",
    },
    {
      column: 4,
      row: 7,
      name: "D38",
    },
    {
      column: 5,
      row: 7,
      name: "D39",
    },
    {
      column: 6,
      row: 7,
      name: "D40",
    },
    {
      column: 7,
      row: 7,
      name: "D41",
    },
    {
      column: 8,
      row: 7,
      name: "D42",
    },
    {
      column: 9,
      row: 7,
      name: "D43",
    },
    {
      column: 10,
      row: 7,
      name: "D44",
    },
    {
      column: 11,
      row: 7,
      name: "D45",
    },
    {
      column: 12,
      row: 7,
      name: "D46",
    },
    {
      column: 19,
      row: 7,
      name: "F37",
    },
    {
      column: 20,
      row: 7,
      name: "F38",
    },
    {
      column: 21,
      row: 7,
      name: "F39",
    },
    {
      column: 22,
      row: 7,
      name: "F40",
    },
    {
      column: 23,
      row: 7,
      name: "F41",
    },
    {
      column: 24,
      row: 7,
      name: "F42",
    },
    {
      column: 25,
      row: 7,
      name: "F43",
    },
    {
      column: 26,
      row: 7,
      name: "F44",
    },
    {
      column: 27,
      row: 7,
      name: "F45",
    },
    {
      column: 28,
      row: 7,
      name: "F46",
    },

    // row 9
    {
      column: 4,
      row: 8,
      name: "D47",
    },
    {
      column: 5,
      row: 8,
      name: "D48",
    },
    {
      column: 6,
      row: 8,
      name: "D49",
    },
    {
      column: 7,
      row: 8,
      name: "D50",
    },
    {
      column: 8,
      row: 8,
      name: "D51",
    },
    {
      column: 9,
      row: 8,
      name: "D52",
    },
    {
      column: 10,
      row: 8,
      name: "D53",
    },
    {
      column: 11,
      row: 8,
      name: "D54",
    },
    {
      column: 12,
      row: 8,
      name: "D55",
    },
    {
      column: 19,
      row: 8,
      name: "F47",
    },
    {
      column: 20,
      row: 8,
      name: "F48",
    },
    {
      column: 21,
      row: 8,
      name: "F49",
    },
    {
      column: 22,
      row: 8,
      name: "F50",
    },
    {
      column: 23,
      row: 8,
      name: "F51",
    },
    {
      column: 24,
      row: 8,
      name: "F52",
    },
    {
      column: 25,
      row: 8,
      name: "F53",
    },
    {
      column: 26,
      row: 8,
      name: "F54",
    },
    {
      column: 27,
      row: 8,
      name: "F55",
    },

    // row 10
    {
      column: 5,
      row: 9,
      name: "D56",
    },
    {
      column: 6,
      row: 9,
      name: "D57",
    },
    {
      column: 7,
      row: 9,
      name: "D58",
    },
    {
      column: 8,
      row: 9,
      name: "D59",
    },
    {
      column: 9,
      row: 9,
      name: "D60",
    },
    {
      column: 10,
      row: 9,
      name: "D61",
    },
    {
      column: 11,
      row: 9,
      name: "D62",
    },
    {
      column: 12,
      row: 9,
      name: "D63",
    },
    {
      column: 19,
      row: 9,
      name: "F56",
    },
    {
      column: 20,
      row: 9,
      name: "F57",
    },
    {
      column: 21,
      row: 9,
      name: "F58",
    },
    {
      column: 22,
      row: 9,
      name: "F59",
    },
    {
      column: 23,
      row: 9,
      name: "F60",
    },
    {
      column: 24,
      row: 9,
      name: "F61",
    },
    {
      column: 25,
      row: 9,
      name: "F62",
    },
    {
      column: 26,
      row: 9,
      name: "F63",
    },
  ]; */

  /* seats = [
    // row 1
    {
      row: 0,
      columns: [
        {
          column: 3,
          name: "A1",
        },
        {
          column: 4,
          name: "A2",
        },
        {
          column: 6,
          name: "B1",
        },
        {
          column: 7,
          name: "B2",
        },
        {
          column: 8,
          name: "B3",
        },
        {
          column: 9,
          name: "B4",
        },
        {
          column: 10,
          name: "B5",
        },
        {
          column: 11,
          name: "B6",
        },
        {
          column: 12,
          name: "B7",
        },
        {
          column: 14,
          name: "B8",
        },
        {
          column: 15,
          name: "B9",
        },
        {
          column: 16,
          name: "B10",
        },
        {
          column: 17,
          name: "B11",
        },
        {
          column: 19,
          name: "B12",
        },
        {
          column: 20,
          name: "B13",
        },
        {
          column: 21,
          name: "B14",
        },
        {
          column: 22,
          name: "B15",
        },
        {
          column: 23,
          name: "B16",
        },
        {
          column: 24,
          name: "B17",
        },
        {
          column: 25,
          name: "B18",
        },
        {
          column: 27,
          name: "C1",
        },
        {
          column: 28,
          name: "C2",
        },
      ],
    },
    // row 2
    {
      row: 1,
      columns: [
        {
          column: 0,
          name: "A3",
        },
        {
          column: 1,
          name: "A4",
        },
        {
          column: 2,
          name: "A5",
        },
        {
          column: 3,
          name: "A6",
        },
        {
          column: 4,
          name: "A7",
        },
        {
          column: 6,
          name: "B19",
        },
        {
          column: 7,
          name: "B20",
        },
        {
          column: 8,
          name: "B21",
        },
        {
          column: 9,
          name: "B22",
        },
        {
          column: 10,
          name: "B23",
        },
        {
          column: 11,
          name: "B24",
        },
        {
          column: 12,
          name: "B25",
        },
        {
          column: 19,
          name: "B26",
        },
        {
          column: 20,
          name: "B27",
        },
        {
          column: 21,
          name: "B28",
        },
        {
          column: 22,
          name: "B29",
        },
        {
          column: 23,
          name: "B30",
        },
        {
          column: 24,
          name: "B31",
        },
        {
          column: 25,
          name: "B32",
        },
        {
          column: 27,
          name: "C3",
        },
        {
          column: 28,
          name: "C4",
        },
        {
          column: 29,
          name: "C5",
        },
        {
          column: 30,
          name: "C6",
        },
        {
          column: 31,
          name: "C7",
        },
      ],
    },
    // row 3
    {
      row: 2,
      columns: [
        {
          column: 0,
          name: "A8",
        },
        {
          column: 1,
          name: "A9",
        },
        {
          column: 2,
          name: "A10",
        },
        {
          column: 3,
          name: "A11",
        },
        {
          column: 4,
          name: "A12",
        },
        {
          column: 7,
          name: "B33",
        },
        {
          column: 8,
          name: "B34",
        },
        {
          column: 9,
          name: "B35",
        },
        {
          column: 10,
          name: "B36",
        },
        {
          column: 11,
          name: "B37",
        },
        {
          column: 12,
          name: "B38",
        },
        {
          column: 19,
          name: "B39",
        },
        {
          column: 20,
          name: "B40",
        },
        {
          column: 21,
          name: "B41",
        },
        {
          column: 22,
          name: "B42",
        },
        {
          column: 23,
          name: "B43",
        },
        {
          column: 24,
          name: "B44",
        },
        {
          column: 27,
          name: "C8",
        },
        {
          column: 28,
          name: "C9",
        },
        {
          column: 29,
          name: "C10",
        },
        {
          column: 30,
          name: "C11",
        },
        {
          column: 31,
          name: "C12",
        },
      ],
    },
    // row 4
    {
      row: 3,
      columns: [],
    },
    // row 5
    {
      row: 4,
      columns: [
        {
          column: 0,
          name: "D1",
        },
        {
          column: 1,
          name: "D2",
        },
        {
          column: 2,
          name: "D3",
        },
        {
          column: 3,
          name: "D4",
        },
        {
          column: 4,
          name: "D5",
        },
        {
          column: 5,
          name: "D6",
        },
        {
          column: 6,
          name: "D7",
        },
        {
          column: 7,
          name: "D8",
        },
        {
          column: 8,
          name: "D9",
        },
        {
          column: 9,
          name: "D10",
        },
        {
          column: 10,
          name: "D11",
        },
        {
          column: 11,
          name: "D12",
        },
        {
          column: 12,
          name: "D13",
        },
        {
          column: 19,
          name: "F1",
        },
        {
          column: 20,
          name: "F2",
        },
        {
          column: 21,
          name: "F3",
        },
        {
          column: 22,
          name: "F4",
        },
        {
          column: 23,
          name: "F5",
        },
        {
          column: 24,
          name: "F6",
        },
        {
          column: 25,
          name: "F7",
        },
        {
          column: 26,
          name: "F8",
        },
        {
          column: 27,
          name: "F9",
        },
        {
          column: 28,
          name: "F10",
        },
        {
          column: 29,
          name: "F11",
        },
        {
          column: 30,
          name: "F12",
        },
        {
          column: 31,
          name: "F13",
        },
      ],
    },
    // row 6
    {
      row: 5,
      columns: [
        {
          column: 1,
          name: "D14",
        },
        {
          column: 2,
          name: "D15",
        },
        {
          column: 3,
          name: "D16",
        },
        {
          column: 4,
          name: "D17",
        },
        {
          column: 5,
          name: "D18",
        },
        {
          column: 6,
          name: "D19",
        },
        {
          column: 7,
          name: "D20",
        },
        {
          column: 8,
          name: "D21",
        },
        {
          column: 9,
          name: "D22",
        },
        {
          column: 10,
          name: "D23",
        },
        {
          column: 11,
          name: "D24",
        },
        {
          column: 12,
          name: "D25",
        },
        {
          column: 19,
          name: "F14",
        },
        {
          column: 20,
          name: "F15",
        },
        {
          column: 21,
          name: "F16",
        },
        {
          column: 22,
          name: "F17",
        },
        {
          column: 23,
          name: "F18",
        },
        {
          column: 24,
          name: "F19",
        },
        {
          column: 25,
          name: "F20",
        },
        {
          column: 26,
          name: "F21",
        },
        {
          column: 27,
          name: "F22",
        },
        {
          column: 28,
          name: "F23",
        },
        {
          column: 29,
          name: "F24",
        },
        {
          column: 30,
          name: "F25",
        },
      ],
    },
    // row 7
    {
      row: 6,
      columns: [
        {
          column: 1,
          name: "D26",
        },
        {
          column: 2,
          name: "D27",
        },
        {
          column: 3,
          name: "D28",
        },
        {
          column: 4,
          name: "D29",
        },
        {
          column: 5,
          name: "D30",
        },
        {
          column: 6,
          name: "D31",
        },
        {
          column: 7,
          name: "D32",
        },
        {
          column: 8,
          name: "D33",
        },
        {
          column: 9,
          name: "D34",
        },
        {
          column: 10,
          name: "D35",
        },
        {
          column: 11,
          name: "D36",
        },
        {
          column: 12,
          name: "D37",
        },
        {
          column: 19,
          name: "F26",
        },
        {
          column: 20,
          name: "F27",
        },
        {
          column: 21,
          name: "F28",
        },
        {
          column: 22,
          name: "F29",
        },
        {
          column: 23,
          name: "F30",
        },
        {
          column: 24,
          name: "F31",
        },
        {
          column: 25,
          name: "F32",
        },
        {
          column: 26,
          name: "F33",
        },
        {
          column: 27,
          name: "F34",
        },
        {
          column: 28,
          name: "F35",
        },
        {
          column: 29,
          name: "F36",
        },
      ],
    },
    // row 8
    {
      row: 7,
      columns: [
        {
          column: 3,
          name: "D37",
        },
        {
          column: 4,
          name: "D38",
        },
        {
          column: 5,
          name: "D39",
        },
        {
          column: 6,
          name: "D40",
        },
        {
          column: 7,
          name: "D41",
        },
        {
          column: 8,
          name: "D42",
        },
        {
          column: 9,
          name: "D43",
        },
        {
          column: 10,
          name: "D44",
        },
        {
          column: 11,
          name: "D45",
        },
        {
          column: 12,
          name: "D46",
        },
        {
          column: 19,
          name: "F37",
        },
        {
          column: 20,
          name: "F38",
        },
        {
          column: 21,
          name: "F39",
        },
        {
          column: 22,
          name: "F40",
        },
        {
          column: 23,
          name: "F41",
        },
        {
          column: 24,
          name: "F42",
        },
        {
          column: 25,
          name: "F43",
        },
        {
          column: 26,
          name: "F44",
        },
        {
          column: 27,
          name: "F45",
        },
        {
          column: 28,
          name: "F46",
        },
      ],
    },
    // row 9
    {
      row: 8,
      columns: [
        {
          column: 4,
          name: "D47",
        },
        {
          column: 5,
          name: "D48",
        },
        {
          column: 6,
          name: "D49",
        },
        {
          column: 7,
          name: "D50",
        },
        {
          column: 8,
          name: "D51",
        },
        {
          column: 9,
          name: "D52",
        },
        {
          column: 10,
          name: "D53",
        },
        {
          column: 11,
          name: "D54",
        },
        {
          column: 12,
          name: "D55",
        },
        {
          column: 19,
          name: "F47",
        },
        {
          column: 20,
          name: "F48",
        },
        {
          column: 21,
          name: "F49",
        },
        {
          column: 22,
          name: "F50",
        },
        {
          column: 23,
          name: "F51",
        },
        {
          column: 24,
          name: "F52",
        },
        {
          column: 25,
          name: "F53",
        },
        {
          column: 26,
          name: "F54",
        },
        {
          column: 27,
          name: "F55",
        },
      ],
    },
    // row 10
    {
      row: 9,
      columns: [
        {
          column: 5,
          name: "D56",
        },
        {
          column: 6,
          name: "D57",
        },
        {
          column: 7,
          name: "D58",
        },
        {
          column: 8,
          name: "D59",
        },
        {
          column: 9,
          name: "D60",
        },
        {
          column: 10,
          name: "D61",
        },
        {
          column: 11,
          name: "D62",
        },
        {
          column: 12,
          name: "D63",
        },
        {
          column: 19,
          name: "F56",
        },
        {
          column: 20,
          name: "F57",
        },
        {
          column: 21,
          name: "F58",
        },
        {
          column: 22,
          name: "F59",
        },
        {
          column: 23,
          name: "F60",
        },
        {
          column: 24,
          name: "F61",
        },
        {
          column: 25,
          name: "F62",
        },
        {
          column: 26,
          name: "F63",
        },
      ],
    },
  ]; */

  seats = [
    // row 1
    {
      row: 0,
      columns: [
        {
          column: 5,
          name: "D56",
        },
        {
          column: 6,
          name: "D57",
        },
        {
          column: 7,
          name: "D58",
        },
        {
          column: 8,
          name: "D59",
        },
        {
          column: 9,
          name: "D60",
        },
        {
          column: 10,
          name: "D61",
        },
        {
          column: 11,
          name: "D62",
        },
        {
          column: 12,
          name: "D63",
        },
        {
          column: 19,
          name: "F56",
        },
        {
          column: 20,
          name: "F57",
        },
        {
          column: 21,
          name: "F58",
        },
        {
          column: 22,
          name: "F59",
        },
        {
          column: 23,
          name: "F60",
        },
        {
          column: 24,
          name: "F61",
        },
        {
          column: 25,
          name: "F62",
        },
        {
          column: 26,
          name: "F63",
        },
      ],
    },
    // row 2
    {
      row: 1,
      columns: [
        {
          column: 4,
          name: "D47",
        },
        {
          column: 5,
          name: "D48",
        },
        {
          column: 6,
          name: "D49",
        },
        {
          column: 7,
          name: "D50",
        },
        {
          column: 8,
          name: "D51",
        },
        {
          column: 9,
          name: "D52",
        },
        {
          column: 10,
          name: "D53",
        },
        {
          column: 11,
          name: "D54",
        },
        {
          column: 12,
          name: "D55",
        },
        {
          column: 19,
          name: "F47",
        },
        {
          column: 20,
          name: "F48",
        },
        {
          column: 21,
          name: "F49",
        },
        {
          column: 22,
          name: "F50",
        },
        {
          column: 23,
          name: "F51",
        },
        {
          column: 24,
          name: "F52",
        },
        {
          column: 25,
          name: "F53",
        },
        {
          column: 26,
          name: "F54",
        },
        {
          column: 27,
          name: "F55",
        },
      ],
    },
    // row 3
    {
      row: 2,
      columns: [
        {
          column: 3,
          name: "D37",
        },
        {
          column: 4,
          name: "D38",
        },
        {
          column: 5,
          name: "D39",
        },
        {
          column: 6,
          name: "D40",
        },
        {
          column: 7,
          name: "D41",
        },
        {
          column: 8,
          name: "D42",
        },
        {
          column: 9,
          name: "D43",
        },
        {
          column: 10,
          name: "D44",
        },
        {
          column: 11,
          name: "D45",
        },
        {
          column: 12,
          name: "D46",
        },
        {
          column: 19,
          name: "F37",
        },
        {
          column: 20,
          name: "F38",
        },
        {
          column: 21,
          name: "F39",
        },
        {
          column: 22,
          name: "F40",
        },
        {
          column: 23,
          name: "F41",
        },
        {
          column: 24,
          name: "F42",
        },
        {
          column: 25,
          name: "F43",
        },
        {
          column: 26,
          name: "F44",
        },
        {
          column: 27,
          name: "F45",
        },
        {
          column: 28,
          name: "F46",
        },
      ],
    },
    // row 4
    {
      row: 3,
      columns: [
        {
          column: 1,
          name: "D26",
        },
        {
          column: 2,
          name: "D27",
        },
        {
          column: 3,
          name: "D28",
        },
        {
          column: 4,
          name: "D29",
        },
        {
          column: 5,
          name: "D30",
        },
        {
          column: 6,
          name: "D31",
        },
        {
          column: 7,
          name: "D32",
        },
        {
          column: 8,
          name: "D33",
        },
        {
          column: 9,
          name: "D34",
        },
        {
          column: 10,
          name: "D35",
        },
        {
          column: 11,
          name: "D36",
        },
        {
          column: 12,
          name: "D37",
        },
        {
          column: 19,
          name: "F26",
        },
        {
          column: 20,
          name: "F27",
        },
        {
          column: 21,
          name: "F28",
        },
        {
          column: 22,
          name: "F29",
        },
        {
          column: 23,
          name: "F30",
        },
        {
          column: 24,
          name: "F31",
        },
        {
          column: 25,
          name: "F32",
        },
        {
          column: 26,
          name: "F33",
        },
        {
          column: 27,
          name: "F34",
        },
        {
          column: 28,
          name: "F35",
        },
        {
          column: 29,
          name: "F36",
        },
      ],
    },
    // row 5
    {
      row: 4,
      columns: [
        {
          column: 1,
          name: "D14",
        },
        {
          column: 2,
          name: "D15",
        },
        {
          column: 3,
          name: "D16",
        },
        {
          column: 4,
          name: "D17",
        },
        {
          column: 5,
          name: "D18",
        },
        {
          column: 6,
          name: "D19",
        },
        {
          column: 7,
          name: "D20",
        },
        {
          column: 8,
          name: "D21",
        },
        {
          column: 9,
          name: "D22",
        },
        {
          column: 10,
          name: "D23",
        },
        {
          column: 11,
          name: "D24",
        },
        {
          column: 12,
          name: "D25",
        },
        {
          column: 19,
          name: "F14",
        },
        {
          column: 20,
          name: "F15",
        },
        {
          column: 21,
          name: "F16",
        },
        {
          column: 22,
          name: "F17",
        },
        {
          column: 23,
          name: "F18",
        },
        {
          column: 24,
          name: "F19",
        },
        {
          column: 25,
          name: "F20",
        },
        {
          column: 26,
          name: "F21",
        },
        {
          column: 27,
          name: "F22",
        },
        {
          column: 28,
          name: "F23",
        },
        {
          column: 29,
          name: "F24",
        },
        {
          column: 30,
          name: "F25",
        },
      ],
    },
    // row 6
    {
      row: 5,
      columns: [
        {
          column: 0,
          name: "D1",
        },
        {
          column: 1,
          name: "D2",
        },
        {
          column: 2,
          name: "D3",
        },
        {
          column: 3,
          name: "D4",
        },
        {
          column: 4,
          name: "D5",
        },
        {
          column: 5,
          name: "D6",
        },
        {
          column: 6,
          name: "D7",
        },
        {
          column: 7,
          name: "D8",
        },
        {
          column: 8,
          name: "D9",
        },
        {
          column: 9,
          name: "D10",
        },
        {
          column: 10,
          name: "D11",
        },
        {
          column: 11,
          name: "D12",
        },
        {
          column: 12,
          name: "D13",
        },
        {
          column: 19,
          name: "F1",
        },
        {
          column: 20,
          name: "F2",
        },
        {
          column: 21,
          name: "F3",
        },
        {
          column: 22,
          name: "F4",
        },
        {
          column: 23,
          name: "F5",
        },
        {
          column: 24,
          name: "F6",
        },
        {
          column: 25,
          name: "F7",
        },
        {
          column: 26,
          name: "F8",
        },
        {
          column: 27,
          name: "F9",
        },
        {
          column: 28,
          name: "F10",
        },
        {
          column: 29,
          name: "F11",
        },
        {
          column: 30,
          name: "F12",
        },
        {
          column: 31,
          name: "F13",
        },
      ],
    },
    // row 7
    {
      row: 6,
      columns: [],
    },
    // row 8
    {
      row: 7,
      columns: [
        {
          column: 0,
          name: "A8",
        },
        {
          column: 1,
          name: "A9",
        },
        {
          column: 2,
          name: "A10",
        },
        {
          column: 3,
          name: "A11",
        },
        {
          column: 4,
          name: "A12",
        },
        {
          column: 7,
          name: "B33",
        },
        {
          column: 8,
          name: "B34",
        },
        {
          column: 9,
          name: "B35",
        },
        {
          column: 10,
          name: "B36",
        },
        {
          column: 11,
          name: "B37",
        },
        {
          column: 12,
          name: "B38",
        },
        {
          column: 19,
          name: "B39",
        },
        {
          column: 20,
          name: "B40",
        },
        {
          column: 21,
          name: "B41",
        },
        {
          column: 22,
          name: "B42",
        },
        {
          column: 23,
          name: "B43",
        },
        {
          column: 24,
          name: "B44",
        },
        {
          column: 27,
          name: "C8",
        },
        {
          column: 28,
          name: "C9",
        },
        {
          column: 29,
          name: "C10",
        },
        {
          column: 30,
          name: "C11",
        },
        {
          column: 31,
          name: "C12",
        },
      ],
    },
    // row 9
    {
      row: 8,
      columns: [
        {
          column: 0,
          name: "A3",
        },
        {
          column: 1,
          name: "A4",
        },
        {
          column: 2,
          name: "A5",
        },
        {
          column: 3,
          name: "A6",
        },
        {
          column: 4,
          name: "A7",
        },
        {
          column: 6,
          name: "B19",
        },
        {
          column: 7,
          name: "B20",
        },
        {
          column: 8,
          name: "B21",
        },
        {
          column: 9,
          name: "B22",
        },
        {
          column: 10,
          name: "B23",
        },
        {
          column: 11,
          name: "B24",
        },
        {
          column: 12,
          name: "B25",
        },
        {
          column: 19,
          name: "B26",
        },
        {
          column: 20,
          name: "B27",
        },
        {
          column: 21,
          name: "B28",
        },
        {
          column: 22,
          name: "B29",
        },
        {
          column: 23,
          name: "B30",
        },
        {
          column: 24,
          name: "B31",
        },
        {
          column: 25,
          name: "B32",
        },
        {
          column: 27,
          name: "C3",
        },
        {
          column: 28,
          name: "C4",
        },
        {
          column: 29,
          name: "C5",
        },
        {
          column: 30,
          name: "C6",
        },
        {
          column: 31,
          name: "C7",
        },
      ],
    },
    // row 10
    {
      row: 9,
      columns: [
        {
          column: 3,
          name: "A1",
        },
        {
          column: 4,
          name: "A2",
        },
        {
          column: 6,
          name: "B1",
        },
        {
          column: 7,
          name: "B2",
        },
        {
          column: 8,
          name: "B3",
        },
        {
          column: 9,
          name: "B4",
        },
        {
          column: 10,
          name: "B5",
        },
        {
          column: 11,
          name: "B6",
        },
        {
          column: 12,
          name: "B7",
        },
        {
          column: 14,
          name: "B8",
        },
        {
          column: 15,
          name: "B9",
        },
        {
          column: 16,
          name: "B10",
        },
        {
          column: 17,
          name: "B11",
        },
        {
          column: 19,
          name: "B12",
        },
        {
          column: 20,
          name: "B13",
        },
        {
          column: 21,
          name: "B14",
        },
        {
          column: 22,
          name: "B15",
        },
        {
          column: 23,
          name: "B16",
        },
        {
          column: 24,
          name: "B17",
        },
        {
          column: 25,
          name: "B18",
        },
        {
          column: 27,
          name: "C1",
        },
        {
          column: 28,
          name: "C2",
        },
      ],
    },
  ];
  selectedSeats = [];
  enabledShowingDates = [];
  column: number = 32;
  row: number = 10;
  ticketcategories = [
    {
      value: "AD",
      display_name: "Adult",
      formcontrol: "adult",
      price_citizen: 6.0,
      price_noncitizen: 12.0,
    },
    {
      value: "KD",
      display_name: "Kid",
      formcontrol: "children",
      price_citizen: 4.0,
      price_noncitizen: 8.0,
    },
    {
      value: "OF",
      display_name: "Old Folk",
      formcontrol: "senior",
      price_citizen: 0.0,
      price_noncitizen: 0.0,
    },
    {
      value: "SD",
      display_name: "Student",
      formcontrol: "school",
      price_citizen: 4.0,
      price_noncitizen: 8.0,
    },
    {
      value: "OK",
      display_name: "OKU",
      formcontrol: "oku",
      price_citizen: 0.0,
      price_noncitizen: 0.0,
    },
  ];

  // FormGroup
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  // Data
  showings = [];
  showtimes = [];
  user_obj: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private showingService: ShowingsService,
    private showtimeService: ShowtimesService,
    private showbookingService: ShowbookingsService,
    private authService: AuthService
  ) {
    this.user_obj = this.authService.decodedToken();
    // this.route.queryParams.subscribe((params) => {
    //   if (this.router.getCurrentNavigation().extras.state)
    //     this.show = this.router.getCurrentNavigation().extras.state.show;
    // });

    this.firstFormGroup = this.formBuilder.group({
      date: ["", Validators.required],
      time: ["", Validators.required],
    });
    this.secondFormGroup = this.formBuilder.group({
      citizen: [true, Validators.required],
      adult: [0, Validators.required],
      children: [0, Validators.required],
      school: [0, Validators.required],
      senior: [0, Validators.required],
      oku: [0, Validators.required],
      total: [0, Validators.required],
    });

    this.getShowing();
    this.getEnableShowtime();
  }

  getShowing() {
    if (this.route.snapshot.paramMap.get("id")) {
      let filterField = "id=" + this.route.snapshot.paramMap.get("id");
      this.showingService.filter(filterField).subscribe(
        (res) => {
          console.log("res", res);
          this.showings = res;
        },
        (err) => {
          console.error("err", err);
        }
      );
    }
  }

  getShowtime(event) {
    this.firstFormGroup.value.date = event;
    if (this.firstFormGroup.value.date) {
      // change from Thu Oct 01 2020 11:43:59 GMT+0800 (Malaysia Time) to 2020-10-01
      let selectedDate = this.firstFormGroup.value.date;
      let year = selectedDate.getFullYear();
      let month = selectedDate.getMonth() + 1;
      let day =
        selectedDate.getDate() < 10
          ? "0" + selectedDate.getDate()
          : selectedDate.getDate();
      let formatDate = year + "-" + month + "-" + day;
      let filterField =
        "showing_id=" +
        this.route.snapshot.paramMap.get("id") +
        "&show_date=" +
        formatDate;
      this.showtimeService.filter(filterField).subscribe(
        (res) => {
          console.log("res", res);
          this.showtimes = res;
        },
        (err) => {
          console.error("err", err);
        }
      );
    }
  }

  getEnableShowtime() {
    let filterField = "showing_id=" + this.route.snapshot.paramMap.get("id");
    this.showtimeService.filter(filterField).subscribe(
      (res) => {
        console.log("res", res);
        for (let i = 0; i < res.length; i++) {
          let date = new Date(res[i].show_date);
          this.enabledShowingDates.push(date);
        }
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  ngOnInit() {}

  citizenChange() {
    this.calculateTotal();
  }

  calculateTotal() {
    if (this.secondFormGroup.value.citizen) {
      this.secondFormGroup.value.total =
        this.secondFormGroup.value.adult * 6 +
        this.secondFormGroup.value.children * 4 +
        this.secondFormGroup.value.school * 4;
    } else {
      this.secondFormGroup.value.total =
        this.secondFormGroup.value.adult * 12 +
        this.secondFormGroup.value.children * 8 +
        this.secondFormGroup.value.school * 8;
    }
  }

  makePayment() {
    var totalTicket =
      this.secondFormGroup.value.adult +
      this.secondFormGroup.value.children +
      this.secondFormGroup.value.school +
      this.secondFormGroup.value.senior +
      this.secondFormGroup.value.oku;
    var showtimeId = this.firstFormGroup.value.time.split("_").pop();
    var ticketType = this.secondFormGroup.value.citizen ? "CZ" : "NC";

    var adultTicket = this.secondFormGroup.value.adult;
    var childrenTicket = this.secondFormGroup.value.children;
    var schoolTicket = this.secondFormGroup.value.school;
    var seniorTicket = this.secondFormGroup.value.senior;
    var okuTicket = this.secondFormGroup.value.oku;

    for (let i = 0; i < totalTicket; i++) {
      if (adultTicket > 0) {
        var ticketCategory = "AD";
        adultTicket--;
      } else if (childrenTicket > 0) {
        var ticketCategory = "KD";
        childrenTicket--;
      } else if (schoolTicket > 0) {
        var ticketCategory = "SD";
        schoolTicket--;
      } else if (seniorTicket > 0) {
        var ticketCategory = "OF";
        seniorTicket--;
      } else if (okuTicket > 0) {
        var ticketCategory = "OK";
        okuTicket--;
      }

      let selectedTicket = this.ticketcategories.find((obj) => {
        return obj.value == ticketCategory;
      });

      var price = this.secondFormGroup.value.citizen
        ? selectedTicket.price_citizen
        : selectedTicket.price_noncitizen;
      var totalPrice = this.secondFormGroup.value.citizen
        ? selectedTicket.price_citizen
        : selectedTicket.price_noncitizen;

      let objPost = {
        ticket_type: ticketType,
        ticket_category: ticketCategory,
        ticket_quantity: 1,
        price: price,
        total_price: totalPrice,
        showtime_id: showtimeId,
        user_id: this.authService.decodedToken().user_id,
        show_id: this.route.snapshot.paramMap.get("id"),
        ticket_seat: this.selectedSeats[i].name
      };

      this.showbookingService.post(objPost).subscribe(
        (res) => {
          /* stuck disini untuk membuat bayaran FPX */
          console.log("res", res);
        },
        (err) => {
          console.error("err", err);
        }
      );
    }

    /* for (let value in this.secondFormGroup.value) {
      if (
        value == "adult" ||
        value == "children" ||
        value == "school" ||
        value == "senior" ||
        value == "oku"
      ) {
        let selectedTicket = this.ticketcategories.find((obj) => {
          return obj.formcontrol == value;
        });
        let calculateTicketPrice = 0.0;
        if (this.secondFormGroup.value.citizen) {
          if (value == "adult" || value == "children" || value == "school") {
            calculateTicketPrice =
              this.secondFormGroup.value[value] * selectedTicket.price_citizen;
          }
        } else {
          if (value == "adult" || value == "children" || value == "school") {
            calculateTicketPrice =
              this.secondFormGroup.value[value] *
              selectedTicket.price_noncitizen;
          }
        }

        let createArray = {
          ticket_type: this.secondFormGroup.value.citizen ? "CZ" : "NC",
          ticket_category: selectedTicket.value,
          ticket_quantity: this.secondFormGroup.value[value],
          price: this.secondFormGroup.value.citizen
            ? selectedTicket.price_citizen
            : selectedTicket.price_noncitizen,
          total_price: calculateTicketPrice,
          showtime_id: this.firstFormGroup.value.time,
          show_id: this.route.snapshot.paramMap.get("id"),
          user_id: this.user_obj.user_id,
        };

        console.log("createArray", createArray);

        // this.showbookingService.post(createArray).subscribe(
        //   (res) => {
        //     console.log("res", res);
        //   },
        //   (err) => {
        //     console.error("err", err);
        //   }
        // );
      }
    } */

    // let booking = {
    //   ...this.firstFormGroup.value,
    //   ...this.secondFormGroup.value,
    // };
    // let navigationExtras: NavigationExtras = {
    //   state: {
    //     booking,
    //   },
    // };
    // this.router.navigate(["/payment"], navigationExtras);
    this.router.navigate([
      "/payment",
      "shows",
      this.authService.decodedToken().user_id,
      showtimeId,
    ]);
  }

  arrayOne(n: number): any[] {
    return Array(n);
  }

  getSeat(row: number, column: number) {
    let result = this.seats[row].columns.find((value) => {
      return value.column === column;
    });
    if (result) return result.name;
  }

  selectSeat(row: number, column: number) {
    let result = this.seats[row].columns.find((value) => {
      return value.column === column;
    });

    let totalSeat =
      this.secondFormGroup.value.adult +
      this.secondFormGroup.value.children +
      this.secondFormGroup.value.school +
      this.secondFormGroup.value.senior +
      this.secondFormGroup.value.oku;
    if (result.name) {
      if (this.selectedSeats.length < totalSeat) {
        // to check if the seat is already exist in selection
        let existSeats = this.selectedSeats.find((obj) => {
          return obj.name == result.name;
        });

        if (!existSeats) {
          let array = {
            row,
            column,
            name: result.name,
          };
          this.selectedSeats.push(array);
        }
      } else {
        this.toastr.error(
          "Harap maaf. Anda telah memilih kerusi lebih daripada tiket yang anda beli.",
          "Ralat"
        );
      }
    }
  }

  emptySeats() {
    this.selectedSeats.splice(0, this.selectedSeats.length);
  }

  getSelectedSeat(row: number, column: number) {
    // let selectedStyle = {
    //   backgroundColor: "red",
    //   color: "white",
    //   borderRadius: "10px",
    // };
    let selectedStyle = "btn-danger";
    for (let i = 0; i < this.selectedSeats.length; i++) {
      if (
        this.selectedSeats[i].row === row &&
        this.selectedSeats[i].column === column
      ) {
        return selectedStyle;
      }
    }
  }
}
