import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_material from "@amcharts/amcharts4/themes/material";
am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_material);

const data = {
  chart: {
    showhovereffect: "1",
    drawcrossline: "1",
    plottooltext: "<b>$dataValue</b> $seriesName",
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
      seriesname: "Registered",
      data: [
        {
          value: "620"
        },
        {
          value: "640"
        },
        {
          value: "604"
        },
        {
          value: "606"
        },
        {
          value: "780"
        }
      ]
    },
    {
      seriesname: "Active",
      data: [
        {
          value: "160"
        },
        {
          value: "280"
        },
        {
          value: "340"
        },
        {
          value: "420"
        },
        {
          value: "540"
        }
      ]
    },
    {
      seriesname: "Inactive",
      data: [
        {
          value: "120"
        },
        {
          value: "122"
        },
        {
          value: "127"
        },
        {
          value: "122"
        },
        {
          value: "129"
        }
      ]
    },
    {
      seriesname: "Banned",
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

const data2 = {
  chart: {
    showpercentvalues: "1",
    defaultcenterlabel: "Users",
    aligncaptionwithcanvas: "0",
    captionpadding: "0",
    decimals: "1",
    plottooltext:
      "<b>$percentValue</b> <b>$label</b>",
    centerlabel: "# Users: $value",
    theme: "fusion"
  },
  data: [
    {
      label: "Active",
      value: "5000"
    },
    {
      label: "Inactive",
      value: "2000"
    },
    {
      label: "Banned",
      value: "500"
    }
  ]
};

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit, OnDestroy {

  width = '100%'
  height = '100%'
  dataFormat = 'json'

  type = 'msline'
  dataSource = data

  type2 = 'doughnut2d'
  dataSource2 = data2

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {

  }

  initChart() {
    let chart = am4core.create("chartdiv", am4charts.XYChart);

    // Add data
    chart.data = [{
      "date": "2012-03-01",
      "price": 20
    }, {
      "date": "2012-03-02",
      "price": 75
    }, {
      "date": "2012-03-03",
      "price": 15
    }, {
      "date": "2012-03-04",
      "price": 75
    }, {
      "date": "2012-03-05",
      "price": 158
    }, {
      "date": "2012-03-06",
      "price": 57
    }, {
      "date": "2012-03-07",
      "price": 107
    }, {
      "date": "2012-03-08",
      "price": 89
    }, {
      "date": "2012-03-09",
      "price": 75
    }, {
      "date": "2012-03-10",
      "price": 132
    }, {
      "date": "2012-03-11",
      "price": 380
    }, {
      "date": "2012-03-12",
      "price": 56
    }, {
      "date": "2012-03-13",
      "price": 169
    }, {
      "date": "2012-03-14",
      "price": 24
    }, {
      "date": "2012-03-15",
      "price": 147
    }];

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.minGridDistance = 50;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.logarithmic = true;
    valueAxis.renderer.minGridDistance = 20;

    // Create series
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "price";
    series.dataFields.dateX = "date";
    series.tensionX = 0.8;
    series.strokeWidth = 3;

    let bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.fill = am4core.color("#fff");
    bullet.circle.strokeWidth = 3;

    // Add cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.fullWidthLineX = true;
    chart.cursor.xAxis = dateAxis;
    chart.cursor.lineX.strokeWidth = 0;
    chart.cursor.lineX.fill = am4core.color("#000");
    chart.cursor.lineX.fillOpacity = 0.1;

    // Add scrollbar
    chart.scrollbarX = new am4core.Scrollbar();

    // Add a guide
    let range = valueAxis.axisRanges.create();
    range.value = 90.4;
    range.grid.stroke = am4core.color("#396478");
    range.grid.strokeWidth = 1;
    range.grid.strokeOpacity = 1;
    range.grid.strokeDasharray = "3,3";
    range.label.inside = true;
    range.label.text = "Average";
    range.label.fill = range.grid.stroke;
    range.label.verticalCenter = "bottom";
  }

}
