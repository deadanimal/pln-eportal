import { Component, OnInit, NgZone } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { forkJoin, Subscription } from "rxjs";
import swal from "sweetalert2";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

import { HeadCountersService } from "src/app/shared/services/head-counters/head-counters.service";
import { IntegrationsService } from "src/app/shared/services/integrations/integrations.service";

@Component({
  selector: "app-number-of-visitors",
  templateUrl: "./number-of-visitors.component.html",
  styleUrls: ["./number-of-visitors.component.scss"],
})
export class NumberOfVisitorsComponent implements OnInit {
  // Chart
  private chartone: am4charts.XYChart;

  // FormGroup
  searchFormGroup: FormGroup;

  // Subscription
  subscription: Subscription;

  constructor(
    public formBuilder: FormBuilder,
    private headcounterService: HeadCountersService,
    private integrationService: IntegrationsService,
    private zone: NgZone
  ) {
    this.searchFormGroup = this.formBuilder.group({
      start_date: new FormControl(""),
      end_date: new FormControl(""),
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {}

  initChartOne(chartData, maxValue) {
    let chart = am4core.create("chartdivone", am4charts.XYChart);
    chart.colors.step = 2;

    chart.legend = new am4charts.Legend();
    chart.legend.position = "top";
    chart.legend.paddingBottom = 20;
    chart.legend.labels.template.maxWidth = 95;

    let xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    xAxis.dataFields.category = "date";
    xAxis.renderer.cellStartLocation = 0.1;
    xAxis.renderer.cellEndLocation = 0.9;
    xAxis.renderer.grid.template.location = 0;
    xAxis.renderer.minGridDistance = 10;

    let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.min = 0;
    yAxis.max = Math.ceil(maxValue) + 10;

    function createSeries(value, name) {
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = value;
      series.dataFields.categoryX = "date";
      series.name = name;

      series.events.on("hidden", arrangeColumns);
      series.events.on("shown", arrangeColumns);

      let bullet = series.bullets.push(new am4charts.LabelBullet());
      bullet.interactionsEnabled = false;
      bullet.dy = -20;
      bullet.label.text = "{valueY}";
      bullet.label.fill = am4core.color("#000000");

      return series;
    }

    chart.data = chartData;

    createSeries("website", "Website");
    createSeries("headcount", "Head Count");

    function arrangeColumns() {
      let series = chart.series.getIndex(0);

      let w =
        1 -
        xAxis.renderer.cellStartLocation -
        (1 - xAxis.renderer.cellEndLocation);
      if (series.dataItems.length > 1) {
        let x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
        let x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
        let delta = ((x1 - x0) / chart.series.length) * w;
        if (am4core.isNumber(delta)) {
          let middle = chart.series.length / 2;

          let newIndex = 0;
          chart.series.each(function (series) {
            if (!series.isHidden && !series.isHiding) {
              series.dummyData = newIndex;
              newIndex++;
            } else {
              series.dummyData = chart.series.indexOf(series);
            }
          });
          let visibleCount = newIndex;
          let newMiddle = visibleCount / 2;

          chart.series.each(function (series) {
            let trueIndex = chart.series.indexOf(series);
            let newIndex = series.dummyData;

            let dx = (newIndex - trueIndex + middle - newMiddle) * delta;

            series.animate(
              { property: "dx", to: dx },
              series.interpolationDuration,
              series.interpolationEasing
            );
            series.bulletsContainer.animate(
              { property: "dx", to: dx },
              series.interpolationDuration,
              series.interpolationEasing
            );
          });
        }
      }
    }

    // Enable export
    chart.exporting.menu = new am4core.ExportMenu();

    this.chartone = chart;
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chartone) this.chartone.dispose();
    });

    if (this.subscription) this.subscription.unsubscribe();
  }

  search() {
    this.subscription = forkJoin([
      this.headcounterService.get_analytic_total_head_counter(
        this.searchFormGroup.value
      ),
      this.integrationService.get_summary_stats_daily(
        this.searchFormGroup.value
      ),
    ]).subscribe(
      (res) => {
        // console.log("res", res);

        if (res.length > 0) {
          this.ngOnDestroy();

          let combinedArray = [];
          let maxValue = 0;

          // mapping the retrieved data into new object
          res[0].forEach((obj, index) => {
            if (+res[1].sc_data[index].unique_visits > maxValue) {
              maxValue = +res[1].sc_data[index].unique_visits;
            }
            if (obj.total_in > maxValue) {
              maxValue = obj.total_in;
            }

            let object = {
              date: obj.date,
              website: +res[1].sc_data[index].unique_visits,
              headcount: obj.total_in,
            };
            combinedArray.push(object);
          });

          this.initChartOne(combinedArray, maxValue);
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
