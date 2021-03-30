import { Component, OnInit, NgZone } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

@Component({
  selector: "app-total-downloads-pdf-publication",
  templateUrl: "./total-downloads-pdf-publication.component.html",
  styleUrls: ["./total-downloads-pdf-publication.component.scss"],
})
export class TotalDownloadsPdfPublicationComponent implements OnInit {
  // Chart
  private chartone: am4charts.XYChart;

  // FormGroup
  searchFormGroup: FormGroup;

  constructor(public formBuilder: FormBuilder, private zone: NgZone) {
    this.searchFormGroup = this.formBuilder.group({
      monthstart: new FormControl(""),
      monthend: new FormControl(""),
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.initChartOne();
    });
  }

  initChartOne() {
    let chart = am4core.create("chartdivone", am4charts.XYChart);

    chart.data = [
      {
        region: "Central",
        state: "North Dakota",
        sales: 920,
      },
      {
        region: "Central",
        state: "South Dakota",
        sales: 1317,
      },
      {
        region: "Central",
        state: "Kansas",
        sales: 2916,
      },
      {
        region: "Central",
        state: "Iowa",
        sales: 4577,
      },
      {
        region: "Central",
        state: "Nebraska",
        sales: 7464,
      },
      {
        region: "Central",
        state: "Oklahoma",
        sales: 19686,
      },
      {
        region: "Central",
        state: "Missouri",
        sales: 22207,
      },
      {
        region: "Central",
        state: "Minnesota",
        sales: 29865,
      },
      {
        region: "Central",
        state: "Wisconsin",
        sales: 32125,
      },
      {
        region: "Central",
        state: "Indiana",
        sales: 53549,
      },
      {
        region: "Central",
        state: "Michigan",
        sales: 76281,
      },
      {
        region: "Central",
        state: "Illinois",
        sales: 80162,
      },
      {
        region: "Central",
        state: "Texas",
        sales: 170187,
      },
      {
        region: "East",
        state: "West Virginia",
        sales: 1209,
      },
      {
        region: "East",
        state: "Maine",
        sales: 1270,
      },
      {
        region: "East",
        state: "District of Columbia",
        sales: 2866,
      },
      {
        region: "East",
        state: "New Hampshire",
        sales: 7294,
      },
      {
        region: "East",
        state: "Vermont",
        sales: 8929,
      },
      {
        region: "East",
        state: "Connecticut",
        sales: 13386,
      },
      {
        region: "East",
        state: "Rhode Island",
        sales: 22629,
      },
      {
        region: "East",
        state: "Maryland",
        sales: 23707,
      },
      {
        region: "East",
        state: "Delaware",
        sales: 27453,
      },
      {
        region: "East",
        state: "Massachusetts",
        sales: 28639,
      },
      {
        region: "East",
        state: "New Jersey",
        sales: 35763,
      },
      {
        region: "East",
        state: "Ohio",
        sales: 78253,
      },
      {
        region: "East",
        state: "Pennsylvania",
        sales: 116522,
      },
      {
        region: "East",
        state: "New York",
        sales: 310914,
      },
      {
        region: "South",
        state: "South Carolina",
        sales: 8483,
      },
      {
        region: "South",
        state: "Louisiana",
        sales: 9219,
      },
      {
        region: "South",
        state: "Mississippi",
        sales: 10772,
      },
      {
        region: "South",
        state: "Arkansas",
        sales: 11678,
      },
      {
        region: "South",
        state: "Alabama",
        sales: 19511,
      },
      {
        region: "South",
        state: "Tennessee",
        sales: 30662,
      },
      {
        region: "South",
        state: "Kentucky",
        sales: 36598,
      },
      {
        region: "South",
        state: "Georgia",
        sales: 49103,
      },
      {
        region: "South",
        state: "North Carolina",
        sales: 55604,
      },
      {
        region: "South",
        state: "Virginia",
        sales: 70641,
      },
      {
        region: "South",
        state: "Florida",
        sales: 89479,
      },
      {
        region: "West",
        state: "Wyoming",
        sales: 1603,
      },
      {
        region: "West",
        state: "Idaho",
        sales: 4380,
      },
      {
        region: "West",
        state: "New Mexico",
        sales: 4779,
      },
      {
        region: "West",
        state: "Montana",
        sales: 5589,
      },
      {
        region: "West",
        state: "Utah",
        sales: 11223,
      },
      {
        region: "West",
        state: "Nevada",
        sales: 16729,
      },
      {
        region: "West",
        state: "Oregon",
        sales: 17431,
      },
      {
        region: "West",
        state: "Colorado",
        sales: 32110,
      },
      {
        region: "West",
        state: "Arizona",
        sales: 35283,
      },
      {
        region: "West",
        state: "Washington",
        sales: 138656,
      },
      {
        region: "West",
        state: "California",
        sales: 457731,
      },
    ];

    // Create axes
    let yAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    yAxis.dataFields.category = "state";
    yAxis.renderer.grid.template.location = 0;
    yAxis.renderer.labels.template.fontSize = 10;
    yAxis.renderer.minGridDistance = 10;

    let xAxis = chart.xAxes.push(new am4charts.ValueAxis());

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueX = "sales";
    series.dataFields.categoryY = "state";
    series.columns.template.tooltipText = "{categoryY}: [bold]{valueX}[/]";
    series.columns.template.strokeWidth = 0;
    series.columns.template.adapter.add("fill", function (fill, target) {
      const ctx = target.dataItem.dataContext as any;
      if (ctx) {
        switch (ctx.region) {
          case "Central":
            return chart.colors.getIndex(0);
            break;
          case "East":
            return chart.colors.getIndex(1);
            break;
          case "South":
            return chart.colors.getIndex(2);
            break;
          case "West":
            return chart.colors.getIndex(3);
            break;
        }
      }
      return fill;
    });

    let axisBreaks = {};
    let legendData = [];

    // Add ranges
    function addRange(label, start, end, color) {
      let range = yAxis.axisRanges.create();
      range.category = start;
      range.endCategory = end;
      range.label.text = label;
      range.label.disabled = false;
      range.label.fill = color;
      range.label.location = 0;
      range.label.dx = -130;
      range.label.dy = 12;
      range.label.fontWeight = "bold";
      range.label.fontSize = 12;
      range.label.horizontalCenter = "left";
      range.label.inside = true;

      range.grid.stroke = am4core.color("#396478");
      range.grid.strokeOpacity = 1;
      range.tick.length = 200;
      range.tick.disabled = false;
      range.tick.strokeOpacity = 0.6;
      range.tick.stroke = am4core.color("#396478");
      range.tick.location = 0;

      range.locations.category = 1;
      let axisBreak = yAxis.axisBreaks.create();
      axisBreak.startCategory = start;
      axisBreak.endCategory = end;
      axisBreak.breakSize = 1;
      axisBreak.fillShape.disabled = true;
      axisBreak.startLine.disabled = true;
      axisBreak.endLine.disabled = true;
      axisBreaks[label] = axisBreak;

      legendData.push({ name: label, fill: color });
    }

    addRange("Central", "Texas", "North Dakota", chart.colors.getIndex(0));
    addRange("East", "New York", "West Virginia", chart.colors.getIndex(1));
    addRange("South", "Florida", "South Carolina", chart.colors.getIndex(2));
    addRange("West", "California", "Wyoming", chart.colors.getIndex(3));

    chart.cursor = new am4charts.XYCursor();

    let legend = new am4charts.Legend();
    legend.position = "right";
    legend.scrollable = true;
    legend.valign = "top";
    legend.reverseOrder = true;

    chart.legend = legend;
    legend.data = legendData;

    legend.itemContainers.template.events.on("toggled", function (event) {
      let ctx = event.target.dataItem.dataContext as any;
      let name = ctx.name;
      let axisBreak = axisBreaks[name];
      if (event.target.isActive) {
        axisBreak.animate(
          { property: "breakSize", to: 0 },
          1000,
          am4core.ease.cubicOut
        );
        yAxis.dataItems.each(function (dataItem) {
          let ctx = dataItem.dataContext as any;
          if (ctx.region == name) {
            dataItem.hide(1000, 500);
          }
        });
        series.dataItems.each(function (dataItem) {
          let ctx = dataItem.dataContext as any;
          if (ctx.region == name) {
            dataItem.hide(1000, 0, 0, ["valueX"]);
          }
        });
      } else {
        axisBreak.animate(
          { property: "breakSize", to: 1 },
          1000,
          am4core.ease.cubicOut
        );
        yAxis.dataItems.each(function (dataItem) {
          let ctx = dataItem.dataContext as any;
          if (ctx.region == name) {
            dataItem.show(1000);
          }
        });

        series.dataItems.each(function (dataItem) {
          let ctx = dataItem.dataContext as any;
          if (ctx.region == name) {
            dataItem.show(1000, 0, ["valueX"]);
          }
        });
      }
    });

    this.chartone = chart;
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chartone) this.chartone.dispose();
    });
  }

  search() {
    // console.log("searchFormGroup", this.searchFormGroup.value);
  }

  reset() {
    this.searchFormGroup.reset();
  }
}
