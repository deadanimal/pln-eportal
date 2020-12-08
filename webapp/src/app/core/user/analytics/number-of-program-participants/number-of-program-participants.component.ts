import { Component, OnInit, NgZone } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";

import { EducationalProgramApplicationsService } from "src/app/shared/services/educational-program-applications/educational-program-applications.service";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

@Component({
  selector: "app-number-of-program-participants",
  templateUrl: "./number-of-program-participants.component.html",
  styleUrls: ["./number-of-program-participants.component.scss"],
})
export class NumberOfProgramParticipantsComponent implements OnInit {
  // Chart
  private chartone: am4charts.XYChart;

  // Data
  eduprogramapps = [];

  // FormGroup
  searchFormGroup: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private zone: NgZone,
    private eduprogramappService: EducationalProgramApplicationsService
  ) {
    this.searchFormGroup = this.formBuilder.group({
      year: new FormControl(""),
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      if (this.chartone) this.chartone.dispose();

      this.eduprogramappService
        .number_of_program_participants(this.searchFormGroup.value)
        .subscribe(
          (res) => {
            // console.log("res", res);
            res.forEach((value) => {
              let obj = {
                inprocess: value.status == "IP" ? value.total : 0,
                approve: value.status == "AP" ? value.total : 0,
                reject: value.status == "RJ" ? value.total : 0,
                year: value.year
              }

              this.eduprogramapps.push(obj);
            });
            this.initChartOne(this.eduprogramapps);
          },
          (err) => {
            console.error("err", err);
          }
        );
    });
  }

  initChartOne(data) {
    let chart = am4core.create("chartdivone", am4charts.XYChart);

    // Add data
    chart.data = data;

    // Create axes
    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "year";
    categoryAxis.numberFormatter.numberFormat = "#";
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.cellStartLocation = 0.1;
    categoryAxis.renderer.cellEndLocation = 0.9;

    let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.opposite = true;

    // Create series
    function createSeries(field, name) {
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueX = field;
      series.dataFields.categoryY = "year";
      series.name = name;
      series.columns.template.tooltipText = "{name}: [bold]{valueX}[/]";
      series.columns.template.height = am4core.percent(100);
      series.sequencedInterpolation = true;

      let valueLabel = series.bullets.push(new am4charts.LabelBullet());
      valueLabel.label.text = "{valueX}";
      valueLabel.label.horizontalCenter = "left";
      valueLabel.label.dx = 10;
      valueLabel.label.hideOversized = false;
      valueLabel.label.truncate = false;

      let categoryLabel = series.bullets.push(new am4charts.LabelBullet());
      categoryLabel.label.text = "{name}";
      categoryLabel.label.horizontalCenter = "right";
      categoryLabel.label.dx = -10;
      categoryLabel.label.fill = am4core.color("#fff");
      categoryLabel.label.hideOversized = false;
      categoryLabel.label.truncate = false;
    }

    createSeries("inprocess", "Dalam Proses");
    createSeries("approce", "Diterima");
    createSeries("reject", "Ditolak");

    this.chartone = chart;
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chartone) this.chartone.dispose();
    });
  }

  search() {
    this.ngAfterViewInit();
  }

  reset() {
    this.searchFormGroup.reset();
    this.ngAfterViewInit();
  }
}
