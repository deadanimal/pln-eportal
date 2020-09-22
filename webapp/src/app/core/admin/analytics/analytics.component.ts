import { Component, OnInit } from '@angular/core';

const data = {
  chart: {
    formatnumberscale: "1",
    plottooltext:
      "<b>$dataValue</b> <b>$seriesName</b> $label",
    theme: "fusion",
    drawcrossline: "1"
  },
  categories: [
    {
      category: [
        {
          label: "2012"
        },
        {
          label: "2013"
        },
        {
          label: "2014"
        },
        {
          label: "2015"
        },
        {
          label: "2016"
        }
      ]
    }
  ],
  dataset: [
    {
      seriesname: "Low",
      data: [
        {
          value: "125000"
        },
        {
          value: "300000"
        },
        {
          value: "480000"
        },
        {
          value: "800000"
        },
        {
          value: "1100000"
        }
      ]
    },
    {
      seriesname: "Mid",
      data: [
        {
          value: "70000"
        },
        {
          value: "150000"
        },
        {
          value: "350000"
        },
        {
          value: "600000"
        },
        {
          value: "1400000"
        }
      ]
    },
    {
      seriesname: "High",
      data: [
        {
          value: "10000"
        },
        {
          value: "100000"
        },
        {
          value: "300000"
        },
        {
          value: "600000"
        },
        {
          value: "900000"
        }
      ]
    }
  ]
};

const dataTwo = {
  chart: {
    showhovereffect: "1",
    numbersuffix: "",
    drawcrossline: "1",
    plottooltext: "<b>$dataValue</b>  $seriesName",
    theme: "fusion"
  },
  categories: [
    {
      category: [
        {
          label: "2012"
        },
        {
          label: "2013"
        },
        {
          label: "2014"
        },
        {
          label: "2015"
        },
        {
          label: "2016"
        }
      ]
    }
  ],
  dataset: [
    {
      seriesname: "Data 1",
      data: [
        {
          value: "62"
        },
        {
          value: "64"
        },
        {
          value: "64"
        },
        {
          value: "66"
        },
        {
          value: "78"
        }
      ]
    },
    {
      seriesname: "Data 2",
      data: [
        {
          value: "16"
        },
        {
          value: "28"
        },
        {
          value: "34"
        },
        {
          value: "42"
        },
        {
          value: "54"
        }
      ]
    },
    {
      seriesname: "Data 3",
      data: [
        {
          value: "20"
        },
        {
          value: "22"
        },
        {
          value: "27"
        },
        {
          value: "22"
        },
        {
          value: "29"
        }
      ]
    },
    {
      seriesname: "Data 4",
      data: [
        {
          value: "18"
        },
        {
          value: "19"
        },
        {
          value: "21"
        },
        {
          value: "21"
        },
        {
          value: "24"
        }
      ]
    }
  ]
};

const dataThree = {
  chart: {
    numberprefix: "$",
    theme: "fusion",
    plottooltext: "$name : $zvalue%"
  },
  categories: [
    {
      verticallinealpha: "20",
      category: [
        {
          label: "0",
          x: "0"
        },
        {
          label: "1500",
          x: "1500",
          showverticalline: "1"
        },
        {
          label: "3000",
          x: "3000",
          showverticalline: "1"
        },
        {
          label: "4500",
          x: "4500",
          showverticalline: "1"
        },
        {
          label: "6000",
          x: "6000",
          showverticalline: "1"
        }
      ]
    }
  ],
  dataset: [
    {
      data: [
        {
          x: "5540",
          y: "16.09",
          z: "30.63",
          name: "Campaign 1"
        },
        {
          x: "4406",
          y: "12.74",
          z: "24.36",
          name: "Campaign 2"
        },
        {
          x: "1079",
          y: "15.79",
          z: "5.97",
          name: "Campaign 3"
        },
        {
          x: "1700",
          y: "8.27",
          z: "9.4",
          name: "Campaign 4"
        },
        {
          x: "853",
          y: "15.89",
          z: "4.71",
          name: "Campaign 5"
        },
        {
          x: "1202",
          y: "10.74",
          z: "6.65",
          name: "Campaign 6"
        },
        {
          x: "2018",
          y: "6.14",
          z: "11.16",
          name: "Campaign 7"
        },
        {
          x: "413",
          y: "19.83",
          z: "2.28",
          name: "Campaign 8"
        },
        {
          x: "586",
          y: "13.96",
          z: "3.24",
          name: "Campaign 9"
        },
        {
          x: "184",
          y: "15.82",
          z: "1.02",
          name: "Campaign 10"
        },
        {
          x: "311",
          y: "5.83",
          z: "1.72",
          name: "Campaign 11"
        },
        {
          x: "35",
          y: "10.76",
          z: "0.19",
          name: "Campaign 12"
        },
        {
          x: "55",
          y: "2.73",
          z: "0.3",
          name: "Campaign 13"
        },
        {
          x: "6",
          y: "21.22",
          z: "0.03",
          name: "Campaign 14"
        }
      ]
    }
  ]
};

const dataFour = {
  chart: {
    plottooltext:
      "<b>$dataValue</b> $seriesName $label",
    showsum: "0",
    theme: "fusion"
  },
  categories: [
    {
      category: [
        {
          label: "1994"
        },
        {
          label: "1995"
        },
        {
          label: "1996"
        },
        {
          label: "1997"
        },
        {
          label: "1998"
        },
        {
          label: "1999"
        },
        {
          label: "2000"
        },
        {
          label: "2001"
        },
        {
          label: "2002"
        },
        {
          label: "2003"
        },
        {
          label: "2004"
        },
        {
          label: "2005"
        },
        {
          label: "2006"
        },
        {
          label: "2007"
        },
        {
          label: "2008"
        },
        {
          label: "2009"
        },
        {
          label: "2010"
        },
        {
          label: "2011"
        },
        {
          label: "2012"
        },
        {
          label: "2013"
        },
        {
          label: "2014"
        },
        {
          label: "2015"
        },
        {
          label: "2016"
        },
        {
          label: "2017"
        }
      ]
    }
  ],
  dataset: [
    {
      seriesname: "Data 1",
      data: [
        {
          value: "15622"
        },
        {
          value: "10612"
        },
        {
          value: "15820"
        },
        {
          value: "26723"
        },
        {
          value: "35415"
        },
        {
          value: "25555"
        },
        {
          value: "81803"
        },
        {
          value: "47950"
        },
        {
          value: "42396"
        },
        {
          value: "19435"
        },
        {
          value: "9780"
        },
        {
          value: "23243"
        },
        {
          value: "28619"
        },
        {
          value: "8477"
        },
        {
          value: "3503"
        },
        {
          value: "14278"
        },
        {
          value: "30522"
        },
        {
          value: "61518"
        },
        {
          value: "24819"
        },
        {
          value: "16437"
        },
        {
          value: "21171"
        },
        {
          value: "1690"
        },
        {
          value: "2418"
        },
        {
          value: "11253"
        }
      ]
    },
    {
      seriesname: "Data 2",
      data: [
        {
          value: "3622"
        },
        {
          value: "2612"
        },
        {
          value: "5820"
        },
        {
          value: "6723"
        },
        {
          value: "5415"
        },
        {
          value: "5555"
        },
        {
          value: "1803"
        },
        {
          value: "7950"
        },
        {
          value: "2396"
        },
        {
          value: "9435"
        },
        {
          value: "2780"
        },
        {
          value: "3243"
        },
        {
          value: "8619"
        },
        {
          value: "1477"
        },
        {
          value: "1503"
        },
        {
          value: "4278"
        },
        {
          value: "9522"
        },
        {
          value: "2518"
        },
        {
          value: "4819"
        },
        {
          value: "6437"
        },
        {
          value: "6171"
        },
        {
          value: "2690"
        },
        {
          value: "1418"
        },
        {
          value: "1253"
        }
      ]
    }
  ]
};

const dataFive = {
  chart: {
    xaxisminvalue: "20",
    xaxismaxvalue: "100",
    ynumberprefix: "",
    yaxisminvalue: "1200",
    xnumbersuffix: "",
    theme: "fusion",
    showlegend: "0",
    plottooltext:
      "<b>$yDataValue</b> <b>$seriesNames</b> <br> <b>$xDataValue</b>"
  },
  categories: [
    {
      verticallinedashed: "1",
      verticallinedashlen: "1",
      verticallinedashgap: "1",
      verticallinethickness: "1",
      verticallinecolor: "#000000",
      category: [
        {
          x: "20",
          label: "20°F",
          showverticalline: "0"
        },
        {
          x: "40",
          label: "40°F"
        },
        {
          x: "60",
          label: "60°F"
        },
        {
          x: "80",
          label: "80°F"
        },
        {
          x: "100",
          label: "100°F"
        }
      ]
    }
  ],
  dataset: [
    {
      seriesname: "Ice Cream",
      anchorbgcolor: "5D62B5",
      data: [
        {
          x: "21",
          y: "1450"
        },
        {
          x: "22",
          y: "1490"
        },
        {
          x: "23",
          y: "1560"
        },
        {
          x: "24",
          y: "1500"
        },
        {
          x: "24",
          y: "1680"
        },
        {
          x: "25",
          y: "1780"
        },
        {
          x: "25",
          y: "1620"
        },
        {
          x: "26",
          y: "1810"
        },
        {
          x: "27",
          y: "2310"
        },
        {
          x: "29",
          y: "2620"
        },
        {
          x: "31",
          y: "2500"
        },
        {
          x: "32",
          y: "2410"
        },
        {
          x: "33",
          y: "2530"
        },
        {
          x: "34",
          y: "3280"
        },
        {
          x: "35",
          y: "2880"
        },
        {
          x: "36",
          y: "3910"
        },
        {
          x: "34",
          y: "3960"
        },
        {
          x: "38",
          y: "4080"
        },
        {
          x: "37",
          y: "3880"
        },
        {
          x: "39",
          y: "3910"
        },
        {
          x: "39",
          y: "4210"
        },
        {
          x: "40",
          y: "4190"
        },
        {
          x: "41",
          y: "4170"
        },
        {
          x: "42",
          y: "4280"
        },
        {
          x: "43",
          y: "4350"
        },
        {
          x: "44",
          y: "4880"
        },
        {
          x: "45",
          y: "4700"
        },
        {
          x: "47",
          y: "5100"
        },
        {
          x: "48",
          y: "5190"
        },
        {
          x: "48",
          y: "5000"
        },
        {
          x: "49",
          y: "5210"
        },
        {
          x: "50",
          y: "5110"
        },
        {
          x: "50",
          y: "5200"
        },
        {
          x: "52",
          y: "5210"
        },
        {
          x: "53",
          y: "5330"
        },
        {
          x: "54",
          y: "5180"
        },
        {
          x: "53",
          y: "5770"
        },
        {
          x: "55",
          y: "5900"
        },
        {
          x: "56",
          y: "5940"
        },
        {
          x: "58",
          y: "6090"
        },
        {
          x: "61",
          y: "6086"
        },
        {
          x: "62",
          y: "6185"
        },
        {
          x: "63",
          y: "6815"
        },
        {
          x: "62",
          y: "6273"
        },
        {
          x: "64",
          y: "6143"
        },
        {
          x: "65",
          y: "6151"
        },
        {
          x: "67",
          y: "6100"
        },
        {
          x: "68",
          y: "6200"
        },
        {
          x: "70",
          y: "6360"
        },
        {
          x: "71",
          y: "6860"
        },
        {
          x: "71",
          y: "6150"
        },
        {
          x: "72",
          y: "6150"
        },
        {
          x: "73",
          y: "6273"
        },
        {
          x: "74",
          y: "6650"
        },
        {
          x: "74",
          y: "6133"
        },
        {
          x: "75",
          y: "6450"
        },
        {
          x: "79",
          y: "6650"
        },
        {
          x: "80",
          y: "6710"
        },
        {
          x: "79",
          y: "6975"
        },
        {
          x: "82",
          y: "7000"
        },
        {
          x: "85",
          y: "7150"
        },
        {
          x: "86",
          y: "7160"
        },
        {
          x: "86",
          y: "7200"
        },
        {
          x: "88",
          y: "7230"
        },
        {
          x: "87",
          y: "7210"
        },
        {
          x: "86",
          y: "7480"
        },
        {
          x: "89",
          y: "7540"
        },
        {
          x: "89",
          y: "7400"
        },
        {
          x: "90",
          y: "7500"
        },
        {
          x: "92",
          y: "7640"
        },
        {
          x: "90",
          y: "7340"
        },
        {
          x: "94",
          y: "7840"
        },
        {
          x: "95",
          y: "7140"
        },
        {
          x: "95",
          y: "7510"
        },
        {
          x: "96",
          y: "6940"
        },
        {
          x: "97",
          y: "7100"
        },
        {
          x: "98",
          y: "7840"
        }
      ]
    }
  ]
};

const dataSix = {
  chart: {
    numberprefix: "",
    yaxisminvalue: "-2000",
    showsum: "1",
    plottooltext:
      "$seriesName in $label was <b>$dataValue</b>  ($percentValue of monthly total)",
    decimals: "1",
    theme: "fusion"
  },
  categories: [
    {
      category: [
        {
          label: "Dec-17"
        },
        {
          label: "Jan-18"
        },
        {
          label: "Feb-18"
        },
        {
          label: "Mar-18"
        },
        {
          label: "Apr-18"
        },
        {
          label: "May-18"
        },
        {
          label: "Jun-18"
        },
        {
          label: "Jul-18"
        },
        {
          label: "Aug-18"
        },
        {
          label: "Sep-18"
        },
        {
          label: "Oct-18"
        },
        {
          label: "Nov-18"
        },
        {
          label: "Dec-18"
        }
      ]
    }
  ],
  dataset: [
    {
      seriesname: "Data 1",
      data: [
        {
          value: "810"
        },
        {
          value: "930"
        },
        {
          value: "1110"
        },
        {
          value: "1300"
        },
        {
          value: "1890"
        },
        {
          value: "2350"
        },
        {
          value: "2740"
        },
        {
          value: "3050"
        },
        {
          value: "3570"
        },
        {
          value: "4390"
        },
        {
          value: "5610"
        },
        {
          value: "7160"
        },
        {
          value: "7750"
        }
      ]
    },
    {
      seriesname: "Data 2 ",
      data: [
        {
          value: "380"
        },
        {
          value: "390"
        },
        {
          value: "420"
        },
        {
          value: "490"
        },
        {
          value: "900"
        },
        {
          value: "1160"
        },
        {
          value: "1350"
        },
        {
          value: "1510"
        },
        {
          value: "1790"
        },
        {
          value: "2140"
        },
        {
          value: "2660"
        },
        {
          value: "3850"
        },
        {
          value: "4070"
        }
      ]
    },
    {
      seriesname: "Data 3",
      data: [
        {
          value: "220"
        },
        {
          value: "240"
        },
        {
          value: "280"
        },
        {
          value: "350"
        },
        {
          value: "580"
        },
        {
          value: "630"
        },
        {
          value: "670"
        },
        {
          value: "740"
        },
        {
          value: "790"
        },
        {
          value: "920"
        },
        {
          value: "1050"
        },
        {
          value: "1290"
        },
        {
          value: "1320"
        }
      ]
    },
    {
      seriesname: "Data 4",
      data: [
        {
          value: "0"
        },
        {
          value: "0"
        },
        {
          value: "0"
        },
        {
          value: "20"
        },
        {
          value: "50"
        },
        {
          value: "50"
        },
        {
          value: "60"
        },
        {
          value: "60"
        },
        {
          value: "60"
        },
        {
          value: "80"
        },
        {
          value: "130"
        },
        {
          value: "170"
        },
        {
          value: "170"
        }
      ]
    },
    {
      seriesname: "Data 5",
      data: [
        {
          value: "-50"
        },
        {
          value: "-50"
        },
        {
          value: "-70"
        },
        {
          value: "-90"
        },
        {
          value: "-100"
        },
        {
          value: "-110"
        },
        {
          value: "-150"
        },
        {
          value: "-260"
        },
        {
          value: "-320"
        },
        {
          value: "-350"
        },
        {
          value: "-500"
        },
        {
          value: "-630"
        },
        {
          value: "-650"
        }
      ]
    },
    {
      seriesname: "Data 6",
      data: [
        {
          value: "-180"
        },
        {
          value: "-210"
        },
        {
          value: "-260"
        },
        {
          value: "-320"
        },
        {
          value: "-580"
        },
        {
          value: "-680"
        },
        {
          value: "-780"
        },
        {
          value: "-900"
        },
        {
          value: "-1060"
        },
        {
          value: "-1320"
        },
        {
          value: "-1520"
        },
        {
          value: "-1650"
        },
        {
          value: "-1660"
        }
      ]
    }
  ]
};

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  width = '100%';
  height = '100%';
  dataFormat = "json";
  type = "mscolumn2d";
  dataSource = data;
  typeTwo = 'msline'
  dataSourceTwo = dataTwo
  typeThree = 'bubble'
  dataSourceThree = dataThree
  typeFour = 'stackedcolumn3d'
  dataSourceFour = dataFour
  typeFive = 'scatter'
  dataSourceFive = dataFive
  typeSix = 'stackedcolumn2d'
  dataSourceSix = dataSix
  
  constructor() { }

  ngOnInit() {
  }

}
