import { Component, OnInit, NgZone } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import swal from "sweetalert2";

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
  last5Years = [];

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

    for (let i = 0; i < 5; i++) {
      this.last5Years.push(new Date().getFullYear() - i);
    }
  }

  ngOnInit() {}

  ngAfterViewInit() {}

  initChartOne(data) {
    console.log("data refer", data)
    let chart = am4core.create("chartdivone", am4charts.XYChart);

    // Add data
    chart.data = data;

    // Create axes
    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "program_name";
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
      series.dataFields.categoryY = "program_name";
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

    createSeries("inprocess", "Daftar");
    createSeries("approve", "Lulus");
    createSeries("reject", "Ditolak");

    this.chartone = chart;
    chart.exporting.menu = new am4core.ExportMenu();

  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chartone) this.chartone.dispose();
    });
  }

  search() {
    this.eduprogramappService
      .number_of_program_participants(this.searchFormGroup.value)
      .subscribe(
        (res) => {
          // console.log("res", res);

          if (res.length > 0) {
            this.ngOnDestroy();

            let arrayOld = [];
            arrayOld = res.map((item) => {
              return {
                program_name: item.educational_program_id__title_ms,
                inprocess: item.status == "IP" ? item.total : 0,
                approve: item.status == "AP" ? item.total : 0,
                reject: item.status == "RJ" ? item.total : 0,
              };
            });

            let arrayNew = [];
            arrayOld.forEach((obj) => {
              if (!this[obj.program_name]) {
                this[obj.program_name] = {
                  program_name: obj.program_name,
                  inprocess: 0,
                  approve: 0,
                  reject: 0,
                };
                arrayNew.push(this[obj.program_name]);
              }
              this[obj.program_name].inprocess += obj.inprocess;
              this[obj.program_name].approve += obj.approve;
              this[obj.program_name].reject += obj.reject;
            }, Object.create(null));

            this.initChartOne(arrayNew);
          } else {
            this.sweetAlertInfo(
              "Info",
              "Harap maaf. Tiada data untuk carian yang dibuat."
            );
          }
        },
        (err) => {
          console.error("err", err);
        }
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
