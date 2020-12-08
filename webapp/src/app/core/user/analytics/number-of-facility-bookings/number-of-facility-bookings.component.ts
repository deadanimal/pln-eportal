import { Component, OnInit, NgZone } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";

import { FacilityBookingsService } from "src/app/shared/services/facility-bookings/facility-bookings.service";

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
  private chartone: am4charts.PieChart;

  // Data
  facilitybookings = [];

  // FormGroup
  searchFormGroup: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private zone: NgZone,
    private facilitybookingService: FacilityBookingsService
  ) {
    this.searchFormGroup = this.formBuilder.group({
      year: new FormControl(""),
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      if (this.chartone) this.chartone.dispose();

      this.facilitybookingService
        .number_of_facility_bookings(this.searchFormGroup.value)
        .subscribe(
          (res) => {
            // console.log("res", res);
            res.forEach((value) => {
              if (value.status == "AP") value.status = "Diterima";
              if (value.status == "RJ") value.status = "Ditolak";
              if (value.status == "IP") value.status = "Dalam Proses";
            });
            this.initChartOne(res);
          },
          (err) => {
            console.error("err", err);
          }
        );
    });
  }

  initChartOne(data) {
    let chart = am4core.create("chartdivone", am4charts.PieChart);

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "total";
    pieSeries.dataFields.category = "status";

    // Let's cut a hole in our Pie chart the size of 30% the radius
    chart.innerRadius = am4core.percent(30);

    // Put a thick white border around each Slice
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;
    // change the cursor on hover to make it apparent the object can be interacted with
    pieSeries.slices.template.cursorOverStyle = [
      {
        property: "cursor",
        value: "pointer",
      },
    ];

    pieSeries.alignLabels = false;
    pieSeries.labels.template.bent = true;
    pieSeries.labels.template.radius = 3;
    pieSeries.labels.template.padding(0, 0, 0, 0);

    pieSeries.ticks.template.disabled = true;

    // Create a base filter effect (as if it's not there) for the hover to return to
    let shadow = pieSeries.slices.template.filters.push(
      new am4core.DropShadowFilter()
    );
    shadow.opacity = 0;

    // Create hover state
    let hoverState = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists

    // Slightly shift the shadow and make it more prominent on hover
    let hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter());
    hoverShadow.opacity = 0.7;
    hoverShadow.blur = 5;

    // Add a legend
    chart.legend = new am4charts.Legend();

    chart.data = data;

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
