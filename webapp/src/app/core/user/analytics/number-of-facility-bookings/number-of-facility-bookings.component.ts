import { Component, OnInit, NgZone } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { forkJoin, Subscription } from "rxjs";
import swal from "sweetalert2";

import { FacilitiesService } from "src/app/shared/services/facilities/facilities.service";
import { FacilityBookingsService } from "src/app/shared/services/facility-bookings/facility-bookings.service";

import * as moment from "moment";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

@Component({
  selector: "app-number-of-facility-bookings",
  templateUrl: "./number-of-facility-bookings.component.html",
  styleUrls: ["./number-of-facility-bookings.component.scss"],
})
export class NumberOfFacilityBookingsComponent implements OnInit {
  // Chart
  private chartone: am4charts.XYChart;
  private charttwo: am4charts.XYChart;
  private chartthree: am4charts.XYChart;

  // Data
  facilities = [];
  facilitybookings = [];
  facilitynames = [];
  objFacility = {};
  months = [
    "Januari",
    "Februari",
    "Mac",
    "April",
    "Mei",
    "Jun",
    "Julai",
    "Ogos",
    "September",
    "Oktober",
    "November",
    "Disember",
  ];

  // FormGroup
  searchFormGroup: FormGroup;

  // Subscription
  subscription: Subscription;

  // 1. Bilangan tempahan sama pecah by fasiliti - chartdivone - DONE
  // 2. Bilangan kekerapan tempahan by bulan - chaerdivtwo
  // 3. Statistik jumlah jualan tempahan mengikut fasiliti - chartdivthree

  constructor(
    public formBuilder: FormBuilder,
    private zone: NgZone,
    private facilityService: FacilitiesService,
    private facilitybookingService: FacilityBookingsService
  ) {
    this.searchFormGroup = this.formBuilder.group({
      start_date: new FormControl(""),
      end_date: new FormControl(""),
    });

    this.facilityService.get().subscribe(
      (res) => {
        // console.log("res", res);
        this.facilities = res;
      },
      (err) => {
        console.error("err", err);
      },
      () => {
        this.createObjFacility();
      }
    );
  }

  ngOnInit() {}

  ngAfterViewInit() {}

  changeNameToKey(id, name_ms) {
    let remove_hyphen = name_ms.replace(/-/g, "");
    let remove_apostrophe = remove_hyphen.replace(/'/g, "");
    let remove_acute = remove_apostrophe.replace(/‘/g, "");
    let remove_space = remove_acute.replace(/ /g, "");
    let lowercase = remove_space.toLowerCase();
    let key = lowercase + "_" + id;
    return key;
  }

  createObjFacility() {
    for (let i = 0; i < this.facilities.length; i++) {
      let key = this.changeNameToKey(
        this.facilities[i].id,
        this.facilities[i].name_ms
      );
      this.objFacility[key] = this.facilities[i].name_ms;
      this.facilitynames.push(this.facilities[i].name_ms);
    }
  }

  initChartOne(chartFacility) {
    let chart = am4core.create("chartdivone", am4charts.XYChart);
    chart.colors.step = 2;

    chart.legend = new am4charts.Legend();
    chart.legend.position = "top";
    chart.legend.paddingBottom = 20;
    chart.legend.labels.template.maxWidth = 95;

    let xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    xAxis.dataFields.category = "booking_date";
    xAxis.renderer.cellStartLocation = 0.1;
    xAxis.renderer.cellEndLocation = 0.9;
    xAxis.renderer.grid.template.location = 0;

    let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.min = 0;

    function createSeries(value, name) {
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = value;
      series.dataFields.categoryX = "booking_date";
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

    let chartData = [];
    chartFacility.forEach((obj) => {
      if (!this[obj.booking_date]) {
        this[obj.booking_date] = {
          booking_date: obj.booking_date,
        };
        for (const objek in this.objFacility) {
          this[obj.booking_date][objek] = 0;
        }
        chartData.push(this[obj.booking_date]);
      }

      for (const objek in this[obj.booking_date]) {
        this.facilities.find((facility) => {
          if (facility.id == objek.split("_")[1]) {
            if (facility.name_ms == obj.title) {
              this[obj.booking_date][objek] += obj.total_booking;
            }
          }
        });
      }
    });

    for (let obj in this) {
      if (moment(obj, "YYYY-MM-DD", true).isValid()) {
        delete this[obj];
      }
    }

    chart.data = chartData;

    for (const objek in this.objFacility) {
      createSeries(objek, this.objFacility[objek]);
    }

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

    this.chartone = chart;
  }

  initChartTwo(chartFacility) {
    let chart = am4core.create("chartdivtwo", am4charts.XYChart);

    // some extra padding for range labels
    chart.paddingBottom = 50;

    chart.cursor = new am4charts.XYCursor();
    chart.scrollbarX = new am4core.Scrollbar();

    // will use this to store colors of the same items
    let colors = {};

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.minGridDistance = 60;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.labels.template.rotation = 270;
    categoryAxis.dataItems.template.text = "{realName}";
    categoryAxis.adapter.add("tooltipText", function (tooltipText, target) {
      let dtx = categoryAxis.tooltipDataItem.dataContext as any;
      return dtx.realName;
    });

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.min = 0;

    // single column series for all data
    let columnSeries = chart.series.push(new am4charts.ColumnSeries());
    columnSeries.columns.template.width = am4core.percent(80);
    columnSeries.tooltipText = "{provider}: {realName}, {valueY}";
    columnSeries.dataFields.categoryX = "category";
    columnSeries.dataFields.valueY = "value";

    // fill adapter, here we save color value to colors object so that each time the item has the same name, the same color is used
    columnSeries.columns.template.adapter.add("fill", function (fill, target) {
      let dtx = target.dataItem.dataContext as any;
      let name = dtx.realName;
      if (!colors[name]) {
        colors[name] = chart.colors.next();
      }
      target.stroke = colors[name];
      return colors[name];
    });

    let rangeTemplate = categoryAxis.axisRanges.template;
    rangeTemplate.tick.disabled = false;
    rangeTemplate.tick.location = 0;
    rangeTemplate.tick.strokeOpacity = 0.6;
    rangeTemplate.tick.length = 60;
    rangeTemplate.grid.strokeOpacity = 0.5;
    rangeTemplate.label.tooltip = new am4core.Tooltip();
    rangeTemplate.label.tooltip.dy = -10;
    rangeTemplate.label.cloneTooltip = false;

    // DATA
    let chartData = [];

    for (let i = 0; i < chartFacility.length; i++) {
      // process data ant prepare it for the chart
      for (var providerName in chartFacility[i]) {
        let providerData = chartFacility[i][providerName];

        // add data of one provider to temp array
        let tempArray = [];
        let count = 0;
        // add items
        for (let j = 0; j < providerData.length; j++) {
          for (var itemName in providerData[j]) {
            count++;
            // we generate unique category for each column (providerName + "_" + itemName) and store realName
            tempArray.push({
              category: this.months[+providerName - 1] + "_" + itemName,
              realName: itemName,
              value: +providerData[j][itemName],
              provider: this.months[+providerName - 1],
            });
          }

          // sort temp array
          tempArray.sort(function (a, b) {
            if (a.value > b.value) {
              return 1;
            } else if (a.value < b.value) {
              return -1;
            } else {
              return 0;
            }
          });
        }

        // push to the final data
        am4core.array.each(tempArray, function (item) {
          chartData.push(item);
        });

        // create range (the additional label at the bottom)
        let range = categoryAxis.axisRanges.create();
        range.category = tempArray[0].category;
        range.endCategory = tempArray[tempArray.length - 1].category;
        range.label.text = tempArray[0].provider;
        range.label.dy = 50;
        range.label.truncate = true;
        range.label.fontWeight = "bold";
        range.label.tooltipText = tempArray[0].provider;
        range.label.rotation = 0;

        range.label.adapter.add("maxWidth", function (maxWidth, target) {
          let range = target.dataItem as any;
          let startPosition = categoryAxis.categoryToPosition(
            range.category,
            0
          );
          let endPosition = categoryAxis.categoryToPosition(
            range.endCategory,
            1
          );
          let startX = categoryAxis.positionToCoordinate(startPosition);
          let endX = categoryAxis.positionToCoordinate(endPosition);
          return endX - startX;
        });
      }
    }

    chart.data = chartData;

    // last tick
    let range = categoryAxis.axisRanges.create();
    range.category = chart.data[chart.data.length - 1].category;
    range.label.disabled = true;
    range.tick.location = 1;
    range.grid.location = 1;

    this.charttwo = chart;
  }

  initChartThree(chartFacility) {
    let chart = am4core.create("chartdivthree", am4charts.XYChart);

    // some extra padding for range labels
    chart.paddingBottom = 50;

    chart.cursor = new am4charts.XYCursor();
    chart.scrollbarX = new am4core.Scrollbar();

    // will use this to store colors of the same items
    let colors = {};

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.minGridDistance = 60;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.labels.template.rotation = 270;
    categoryAxis.dataItems.template.text = "{realName}";
    categoryAxis.adapter.add("tooltipText", function (tooltipText, target) {
      let dtx = categoryAxis.tooltipDataItem.dataContext as any;
      return dtx.realName;
    });

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.min = 0;

    // single column series for all data
    let columnSeries = chart.series.push(new am4charts.ColumnSeries());
    columnSeries.columns.template.width = am4core.percent(80);
    columnSeries.tooltipText = "{provider}: {realName}, {valueY}";
    columnSeries.dataFields.categoryX = "category";
    columnSeries.dataFields.valueY = "value";

    // fill adapter, here we save color value to colors object so that each time the item has the same name, the same color is used
    columnSeries.columns.template.adapter.add("fill", function (fill, target) {
      let dtx = target.dataItem.dataContext as any;
      let name = dtx.realName;
      if (!colors[name]) {
        colors[name] = chart.colors.next();
      }
      target.stroke = colors[name];
      return colors[name];
    });

    let rangeTemplate = categoryAxis.axisRanges.template;
    rangeTemplate.tick.disabled = false;
    rangeTemplate.tick.location = 0;
    rangeTemplate.tick.strokeOpacity = 0.6;
    rangeTemplate.tick.length = 60;
    rangeTemplate.grid.strokeOpacity = 0.5;
    rangeTemplate.label.tooltip = new am4core.Tooltip();
    rangeTemplate.label.tooltip.dy = -10;
    rangeTemplate.label.cloneTooltip = false;

    // DATA
    let chartData = [];

    for (let i = 0; i < chartFacility.length; i++) {
      // process data ant prepare it for the chart
      for (var providerName in chartFacility[i]) {
        let providerData = chartFacility[i][providerName];

        // add data of one provider to temp array
        let tempArray = [];
        let count = 0;
        // add items
        for (let j = 0; j < providerData.length; j++) {
          for (var itemName in providerData[j]) {
            count++;
            // we generate unique category for each column (providerName + "_" + itemName) and store realName
            tempArray.push({
              category: this.months[+providerName - 1] + "_" + itemName,
              realName: itemName,
              value: +providerData[j][itemName],
              provider: this.months[+providerName - 1],
            });
          }

          // sort temp array
          tempArray.sort(function (a, b) {
            if (a.value > b.value) {
              return 1;
            } else if (a.value < b.value) {
              return -1;
            } else {
              return 0;
            }
          });
        }

        // push to the final data
        am4core.array.each(tempArray, function (item) {
          chartData.push(item);
        });

        // create range (the additional label at the bottom)
        let range = categoryAxis.axisRanges.create();
        range.category = tempArray[0].category;
        range.endCategory = tempArray[tempArray.length - 1].category;
        range.label.text = tempArray[0].provider;
        range.label.dy = 50;
        range.label.truncate = true;
        range.label.fontWeight = "bold";
        range.label.tooltipText = tempArray[0].provider;
        range.label.rotation = 0;

        range.label.adapter.add("maxWidth", function (maxWidth, target) {
          let range = target.dataItem as any;
          let startPosition = categoryAxis.categoryToPosition(
            range.category,
            0
          );
          let endPosition = categoryAxis.categoryToPosition(
            range.endCategory,
            1
          );
          let startX = categoryAxis.positionToCoordinate(startPosition);
          let endX = categoryAxis.positionToCoordinate(endPosition);
          return endX - startX;
        });
      }
    }

    chart.data = chartData;

    // last tick
    let range = categoryAxis.axisRanges.create();
    range.category = chart.data[chart.data.length - 1].category;
    range.label.disabled = true;
    range.tick.location = 1;
    range.grid.location = 1;

    this.chartthree = chart;
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chartone) this.chartone.dispose();
      if (this.charttwo) this.charttwo.dispose();
      if (this.chartthree) this.chartthree.dispose();
    });

    if (this.subscription) this.subscription.unsubscribe();
  }

  search() {
    this.subscription = forkJoin([
      this.facilitybookingService.number_of_facility_bookings(
        this.searchFormGroup.value
      ),
      this.facilitybookingService.number_of_facility_bookings_frequency(
        this.searchFormGroup.value
      ),
      this.facilitybookingService.number_of_facility_bookings_statistic(
        this.searchFormGroup.value
      ),
    ]).subscribe(
      (res) => {
        // console.log("res", res);

        if (res.length > 0) {
          this.ngOnDestroy();

          let arrayZero = [];
          arrayZero = res[0].map((item) => {
            return {
              title: item.facility_id__name_ms,
              booking_date: item.booking_date,
              total_booking: item.total_booking,
            };
          });

          this.initChartOne(arrayZero);

          // to combine object if key is same
          const resultOne = res[1].reduce((acc, curr) => {
            const key = Object.keys(curr)[0];
            const found = acc.find((i) => i[key]);
            if (!found) {
              acc.push(curr);
            } else {
              found[key] = [...found[key], ...curr[key]];
            }
            return acc;
          }, []);

          this.initChartTwo(resultOne);

          // to combine object if key is same
          const resultTwo = res[2].reduce((acc, curr) => {
            const key = Object.keys(curr)[0];
            const found = acc.find((i) => i[key]);
            if (!found) {
              acc.push(curr);
            } else {
              found[key] = [...found[key], ...curr[key]];
            }
            return acc;
          }, []);

          this.initChartThree(resultTwo);
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
