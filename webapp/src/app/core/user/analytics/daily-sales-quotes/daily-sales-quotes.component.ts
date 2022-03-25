import { Component, OnInit, NgZone } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { forkJoin, Subscription } from "rxjs";
import swal from "sweetalert2";

import { InvoiceReceiptsService } from "src/app/shared/services/invoice-receipts/invoice-receipts.service";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

@Component({
  selector: "app-daily-sales-quotes",
  templateUrl: "./daily-sales-quotes.component.html",
  styleUrls: ["./daily-sales-quotes.component.scss"],
})
export class DailySalesQuotesComponent implements OnInit {
  // Chart
  private chartone: am4charts.XYChart;
  private charttwo: am4charts.XYChart;
  private chartthree: am4charts.XYChart;

  // FormGroup
  searchFormGroup: FormGroup;

  // Subscription
  subscription: Subscription;

  constructor(
    public formBuilder: FormBuilder,
    private invoicereceiptService: InvoiceReceiptsService,
    private zone: NgZone
  ) {
    this.searchFormGroup = this.formBuilder.group({
      start_date: new FormControl(""),
      end_date: new FormControl(""),
      category: new FormControl(""),
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {}

  initChartOne(chartData) {
    let chart = am4core.create("chartdivone", am4charts.XYChart);

    // Add data
    chart.data = chartData;

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "total_price";
    series.dataFields.dateX = "payment_successful_datetime";
    series.numberFormatter.numberFormat = "#.00";
    series.strokeWidth = 2;
    series.minBulletDistance = 10;
    series.tooltipText = "RM {valueY}";
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.fillOpacity = 0.5;
    series.tooltip.label.padding(12, 12, 12, 12);

    // Add scrollbar
    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    chart.scrollbarX = scrollbarX;

    // Add cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
    chart.cursor.snapToSeries = series;
    chart.exporting.menu = new am4core.ExportMenu();

    this.chartone = chart;

  }

  initChartTwo(chartCounter, chartOnline) {
    let chart = am4core.create("chartdivtwo", am4charts.XYChart);

    let data = [];
    for (var i = 0; i < chartCounter.length; i++) {
      data.push({
        date1: new Date(chartCounter[i].payment_successful_datetime),
        ticket1: chartCounter[i].total_ticket,
      });
    }
    for (var i = 0; i < chartOnline.length; i++) {
      data.push({
        date2: new Date(chartOnline[i].payment_successful_datetime),
        ticket2: chartOnline[i].total_ticket,
      });
    }

    chart.data = data;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.labels.template.fill = am4core.color("#e59165");

    let dateAxis2 = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis2.renderer.grid.template.location = 0;
    dateAxis2.renderer.labels.template.fill = am4core.color("#dfcc64");

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.labels.template.fill = am4core.color("#e59165");

    valueAxis.renderer.minWidth = 60;

    let valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis2.tooltip.disabled = true;
    valueAxis2.renderer.labels.template.fill = am4core.color("#dfcc64");
    valueAxis2.renderer.minWidth = 60;
    valueAxis2.syncWithAxis = valueAxis;

    let series = chart.series.push(new am4charts.LineSeries());
    series.name = "2015";
    series.dataFields.dateX = "date1";
    series.dataFields.valueY = "ticket1";
    series.tooltipText = "{valueY.value}";
    series.fill = am4core.color("#e59165");
    series.stroke = am4core.color("#e59165");
    //series.strokeWidth = 3;

    let series2 = chart.series.push(new am4charts.LineSeries());
    series2.name = "2017";
    series2.dataFields.dateX = "date2";
    series2.dataFields.valueY = "ticket2";
    series2.yAxis = valueAxis2;
    series2.xAxis = dateAxis2;
    series2.tooltipText = "{valueY.value}";
    series2.fill = am4core.color("#dfcc64");
    series2.stroke = am4core.color("#dfcc64");
    //series2.strokeWidth = 3;

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis2;

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    chart.scrollbarX = scrollbarX;

    chart.legend = new am4charts.Legend();
    chart.legend.parent = chart.plotContainer;
    chart.legend.zIndex = 100;

    valueAxis2.renderer.grid.template.strokeOpacity = 0.07;
    dateAxis2.renderer.grid.template.strokeOpacity = 0.07;
    dateAxis.renderer.grid.template.strokeOpacity = 0.07;
    valueAxis.renderer.grid.template.strokeOpacity = 0.07;

    this.charttwo = chart;


    chart.exporting.menu = new am4core.ExportMenu();
    
    
  }

  initChartThree(chartCitizen, chartNonCitizen) {
    let chart = am4core.create("chartdivthree", am4charts.XYChart);

    let combinedChart = [...chartCitizen, ...chartNonCitizen];

    let chartData = [];
    combinedChart.forEach((obj) => {
      if (!this[obj.payment_successful_datetime]) {
        this[obj.payment_successful_datetime] = {
          payment_successful_datetime: obj.payment_successful_datetime,
          adult_citizen: 0,
          kid_citizen: 0,
          oldfolk_citizen: 0,
          student_citizen: 0,
          oku_citizen: 0,
          adult_noncitizen: 0,
          kid_noncitizen: 0,
          oldfolk_noncitizen: 0,
          student_noncitizen: 0,
          oku_noncitizen: 0,
        };
        chartData.push(this[obj.payment_successful_datetime]);
      }
      // Citizen Data
      if (obj.type == "CZ" && obj.ticket_category == "AD")
        this[obj.payment_successful_datetime].adult_citizen +=
          +obj.total_ticket_category;
      if (obj.type == "CZ" && obj.ticket_category == "KD")
        this[obj.payment_successful_datetime].kid_citizen +=
          +obj.total_ticket_category;
      if (obj.type == "CZ" && obj.ticket_category == "OF")
        this[obj.payment_successful_datetime].oldfolk_citizen +=
          +obj.total_ticket_category;
      if (obj.type == "CZ" && obj.ticket_category == "SD")
        this[obj.payment_successful_datetime].student_citizen +=
          +obj.total_ticket_category;
      if (obj.type == "CZ" && obj.ticket_category == "OK")
        this[obj.payment_successful_datetime].oku_citizen +=
          +obj.total_ticket_category;

      // Non-citizen Data
      if (obj.type == "NC" && obj.ticket_category == "AD")
        this[obj.payment_successful_datetime].adult_noncitizen +=
          +obj.total_ticket_category;
      if (obj.type == "NC" && obj.ticket_category == "KD")
        this[obj.payment_successful_datetime].kid_noncitizen +=
          +obj.total_ticket_category;
      if (obj.type == "NC" && obj.ticket_category == "OF")
        this[obj.payment_successful_datetime].oldfolk_noncitizen +=
          +obj.total_ticket_category;
      if (obj.type == "NC" && obj.ticket_category == "SD")
        this[obj.payment_successful_datetime].student_noncitizen +=
          +obj.total_ticket_category;
      if (obj.type == "NC" && obj.ticket_category == "OK")
        this[obj.payment_successful_datetime].oku_noncitizen +=
          +obj.total_ticket_category;
    });

    // Add data
    chart.data = chartData;

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "payment_successful_datetime";
    categoryAxis.title.text = "Tiket";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 20;
    categoryAxis.renderer.cellStartLocation = 0.1;
    categoryAxis.renderer.cellEndLocation = 0.9;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.title.text = "";

    // Create series
    function createSeries(field, name, stacked) {
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = field;
      series.dataFields.categoryX = "payment_successful_datetime";
      series.name = name;
      series.columns.template.tooltipText = "{name}: [bold]{valueY}[/]";
      series.stacked = stacked;
      series.columns.template.width = am4core.percent(95);
    }

    createSeries("adult_citizen", "Dewasa (warganegara)", false);
    createSeries("kid_citizen", "Kanak-kanak (warganegara)", true);
    createSeries("oldfolk_citizen", "Warga emas (warganegara)", true);
    createSeries("student_citizen", "Pelajar (warganegara)", true);
    createSeries("oku_citizen", "OKU (warganegara)", true);
    createSeries("adult_noncitizen", "Dewasa (bukan warganegara)", false);
    createSeries("kid_noncitizen", "Kanak-kanak (bukan warganegara)", true);
    createSeries("oldfolk_noncitizen", "Warga emas (bukan warganegara)", true);
    createSeries("student_noncitizen", "Pelajar (bukan warganegara)", true);
    createSeries("oku_noncitizen", "OKU (bukan warganegara)", true);

    // Add legend
    chart.legend = new am4charts.Legend();

    this.chartthree = chart;
    chart.exporting.menu = new am4core.ExportMenu();

  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chartone) this.chartone.dispose();
      if (this.charttwo) this.charttwo.dispose();
    });

    if (this.subscription) this.subscription.unsubscribe();
  }

  search() {
    this.subscription = forkJoin([
      this.invoicereceiptService.get_analytic_daily_quote_sales_rm(
        this.searchFormGroup.value
      ),
      this.invoicereceiptService.get_analytic_daily_quote_sales_ticket(
        this.searchFormGroup.value
      ),
      this.invoicereceiptService.get_analytic_daily_quote_sales_ticket_category(
        this.searchFormGroup.value
      ),
    ]).subscribe(
      (res) => {
        // console.log("res", res);

        if (res.length > 0) {
          this.ngOnDestroy();

          // let arrayZero = [];
          // // to sum up all total price based on payment_successful_datetime
          // res[0].forEach((obj) => {
          //   if (!this[obj.payment_successful_datetime]) {
          //     this[obj.payment_successful_datetime] = {
          //       payment_successful_datetime: obj.payment_successful_datetime,
          //       total_price: 0,
          //     };
          //     arrayZero.push(this[obj.payment_successful_datetime]);
          //   }
          //   this[obj.payment_successful_datetime].total_price += obj.total_price;
          // });

          this.initChartOne(res[0]);

          // var arrayCounter = res[1].queryset_counter.reduce(function (
          //   accumulator,
          //   cur
          // ) {
          //   var payment_successful_datetime = cur.payment_successful_datetime,
          //     found = accumulator.find(function (elem) {
          //       return (
          //         elem.payment_successful_datetime == payment_successful_datetime
          //       );
          //     });
          //   if (found) found.total_ticket += cur.total_ticket;
          //   else accumulator.push(cur);
          //   return accumulator;
          // },
          // []);

          this.initChartTwo(res[1].queryset_counter, res[1].queryset_online);

          this.initChartThree(
            res[2].queryset_citizen,
            res[2].queryset_noncitizen
          );
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
