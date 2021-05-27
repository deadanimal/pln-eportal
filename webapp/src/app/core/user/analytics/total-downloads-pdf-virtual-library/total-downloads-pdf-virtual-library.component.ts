import { Component, OnInit, NgZone } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { forkJoin, Subscription } from "rxjs";
import swal from "sweetalert2";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

import { VirtualLibraryArticlesService } from "src/app/shared/services/virtual-library-articles/virtual-library-articles.service";
import { VirtualLibraryBooksService } from "src/app/shared/services/virtual-library-books/virtual-library-books.service";
import { VirtualLibrarySerialpublicationsService } from "src/app/shared/services/virtual-library-serialpublications/virtual-library-serialpublications.service";

@Component({
  selector: "app-total-downloads-pdf-virtual-library",
  templateUrl: "./total-downloads-pdf-virtual-library.component.html",
  styleUrls: ["./total-downloads-pdf-virtual-library.component.scss"],
})
export class TotalDownloadsPdfVirtualLibraryComponent implements OnInit {
  // Chart
  private chartone: am4charts.XYChart;

  // FormGroup
  searchFormGroup: FormGroup;

  // Subscription
  subscription: Subscription;

  constructor(
    public formBuilder: FormBuilder,
    private vlarticleService: VirtualLibraryArticlesService,
    private vlbookService: VirtualLibraryBooksService,
    private vlserialpublicationService: VirtualLibrarySerialpublicationsService,
    private zone: NgZone
  ) {
    this.searchFormGroup = this.formBuilder.group({
      monthstart: new FormControl(""),
      monthend: new FormControl(""),
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.subscription = forkJoin([
      this.vlarticleService.get_analytic_total_download_pdf(),
      this.vlbookService.get_analytic_total_download_pdf(),
      this.vlserialpublicationService.get_analytic_total_download_pdf(),
    ]).subscribe(
      (res) => {
        // console.log("res", res);

        if (res.length > 0) {
          this.ngOnDestroy();

          let arrayZero = [];
          let arrayOne = [];
          let arrayTwo = [];
          let rangeArray = [];

          // mapping the retrieved data into new object
          arrayZero = res[0].map((item) => {
            return {
              label: item.virtual_library_article_category_id__name_ms,
              title: item.name_ms,
              total: item.download_pdf_counter,
            };
          });

          // to find first and last index for range data
          rangeArray.push({
            label: arrayZero[0].label,
            start: arrayZero[0].title,
            end: arrayZero[arrayZero.length - 1].title,
            color: 0,
          });

          // mapping the retrieved data into new object
          arrayOne = res[1].map((item) => {
            return {
              label: item.virtual_library_collection_id__name_ms,
              title: item.title_ms,
              total: item.download_pdf_counter,
            };
          });

          // to find first and last index for range data
          rangeArray.push({
            label: arrayOne[0].label,
            start: arrayOne[0].title,
            end: arrayOne[arrayOne.length - 1].title,
            color: 1,
          });

          // mapping the retrieved data into new object
          arrayTwo = res[2].map((item) => {
            return {
              label: item.virtual_library_collection_id__name_ms,
              title: item.title_ms,
              total: item.download_pdf_counter,
            };
          });

          // to find first and last index for range data
          rangeArray.push({
            label: arrayTwo[0].label,
            start: arrayTwo[0].title,
            end: arrayTwo[arrayTwo.length - 1].title,
            color: 2,
          });

          let combinedArray = [...arrayZero, ...arrayOne, ...arrayTwo];
          this.initChartOne(combinedArray, rangeArray);
        } else {
          this.sweetAlertInfo(
            "Info",
            "Harap maaf. Tiada data untuk carian yang dibuat."
          );
        }
      },
      (err) => {
        console.error("err", err);
      },
      () => {}
    );
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

    this.chartone = chart;
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chartone) this.chartone.dispose();
    });

    if (this.subscription) this.subscription.unsubscribe();
  }

  search() {
    // console.log("searchFormGroup", this.searchFormGroup.value);
  }

  reset() {
    this.searchFormGroup.reset();
    this.ngOnDestroy();
  }

  sweetAlertInfo(title, text) {
    swal.fire({
      title,
      text,
      icon: "info",
      buttonsStyling: false,
      customClass: {
        confirmButton: "btn btn-info",
      },
    });
  }
}
