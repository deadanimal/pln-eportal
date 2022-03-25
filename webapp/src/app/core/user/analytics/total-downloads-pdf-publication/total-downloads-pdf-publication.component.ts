import { Component, OnInit, NgZone } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

import { PublicationsService } from "src/app/shared/services/publications/publications.service";

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

  constructor(
    public formBuilder: FormBuilder,
    private publicationService: PublicationsService,
    private zone: NgZone
  ) {
    this.searchFormGroup = this.formBuilder.group({
      monthstart: new FormControl(""),
      monthend: new FormControl(""),
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.publicationService.get_analytic_total_download_pdf().subscribe(
      (res) => {
        // console.log("res", res);
        let array = [];
        array = res.map((item) => {
          return {
            label: item.publication_category_id__name_ms,
            title: item.title_ms,
            total: item.download_pdf_counter,
          };
        });
        this.arrayRange(array);
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  arrayRange(res) {
    let arrayRange = [];
    let dupes = {};

    res.forEach((item, index) => {
      dupes[item.label] = dupes[item.label] || [];
      dupes[item.label].push(index);
    });

    let countObj = 0;
    for (let object in dupes) {
      let obj = {
        label: object,
        start: res[dupes[object][0]].title,
        end: res[dupes[object][dupes[object].length - 1]].title,
        color: countObj,
      };
      countObj++;
      arrayRange.push(obj);
    }

    if (arrayRange.length > 0) this.initChartOne(res, arrayRange);
  }

  initChartOne(chartData, rangeData) {
    let chart = am4core.create("chartdivone", am4charts.XYChart);

    chart.data = chartData;

    // Create axes
    let yAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    yAxis.dataFields.category = "title";
    yAxis.renderer.grid.template.location = 0;
    yAxis.renderer.labels.template.fontSize = 10;
    yAxis.renderer.minGridDistance = 10;

    let xAxis = chart.xAxes.push(new am4charts.ValueAxis());

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueX = "total";
    series.dataFields.categoryY = "title";
    series.columns.template.tooltipText = "{categoryY}: [bold]{valueX}[/]";
    series.columns.template.strokeWidth = 0;
    series.columns.template.adapter.add("fill", function (fill, target) {
      const ctx = target.dataItem.dataContext as any;
      if (ctx) {
        let result = rangeData.find((res) => {
          return res.label === ctx.label;
        });
        return chart.colors.getIndex(result.color);
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

    for (let i = 0; i < rangeData.length; i++) {
      addRange(
        rangeData[i].label,
        rangeData[i].start,
        rangeData[i].end,
        chart.colors.getIndex(rangeData[i].color)
      );
    }

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
          if (ctx.label == name) {
            dataItem.hide(1000, 500);
          }
        });
        series.dataItems.each(function (dataItem) {
          let ctx = dataItem.dataContext as any;
          if (ctx.label == name) {
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
          if (ctx.label == name) {
            dataItem.show(1000);
          }
        });

        series.dataItems.each(function (dataItem) {
          let ctx = dataItem.dataContext as any;
          if (ctx.label == name) {
            dataItem.show(1000, 0, ["valueX"]);
          }
        });
      }
    });

        // Enable export
        chart.exporting.menu = new am4core.ExportMenu();


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
