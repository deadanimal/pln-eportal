import { Component, NgZone, OnInit } from "@angular/core";

import { EducationalProgramApplicationsService } from "src/app/shared/services/educational-program-applications/educational-program-applications.service";
import { EducationalProgramFormsService } from "src/app/shared/services/educational-program-forms/educational-program-forms.service";
import { FacilityBookingsService } from "src/app/shared/services/facility-bookings/facility-bookings.service";
import { IntegrationsService } from "src/app/shared/services/integrations/integrations.service";
import { InvoiceReceiptsService } from "src/app/shared/services/invoice-receipts/invoice-receipts.service";
import { PublicationsService } from "src/app/shared/services/publications/publications.service";
import { ShowbookingsService } from "src/app/shared/services/showbookings/showbookings.service";
import { SimulatorRideBookingsService } from "src/app/shared/services/simulator-ride-bookings/simulator-ride-bookings.service";
import { VirtualLibraryArticlesService } from "src/app/shared/services/virtual-library-articles/virtual-library-articles.service";
import { VirtualLibraryBooksService } from "src/app/shared/services/virtual-library-books/virtual-library-books.service";
import { VirtualLibrarySerialpublicationsService } from "src/app/shared/services/virtual-library-serialpublications/virtual-library-serialpublications.service";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_material);
am4core.useTheme(am4themes_animated);

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  // Chart
  dailyQuoteNumberChart: am4charts.XYChart;
  totalFacilityBookingChart: am4charts.PieChart;
  totalEducationalProgramChart: am4charts.PieChart;
  totalTicketSalesRMChart: am4charts.XYChart;
  totalTicketSalesOnlineChart: am4charts.XYChart;
  totalTicketSalesCounterChart: am4charts.XYChart;

  // Data
  eduprogramsignup: number = 0;
  eduprogramaccept: number = 0;
  eduprogramreject: number = 0;
  facilitynew = [];
  facilityaccept = [];
  facilityreject = [];
  facilitypendingpayment = [];
  facilitypaymentaccept = [];
  facilitypaymentreject = [];
  facilityrefund = [];
  headcounter;
  today = new Date();
  totaldailysales = [];
  totaldailysalesonlineshowing: number = 0;
  totaldailysalesonlinesimulatorride: number = 0;
  totaldailysalescountershowing: number = 0;
  totaldailysalescountersimulatorride: number = 0;
  totaldownloadpdfpublication: number = 0;
  totaldownloadpdfarticle: number = 0;
  totaldownloadpdfbook: number = 0;
  totaldownloadpdfserialpublication: number = 0;
  totalticketshowing: number = 0;
  totalticketsimulatorride: number = 0;
  totalvisitor: number = 0;
  varheadcounterinterval;

  constructor(
    private zone: NgZone,
    private eduprogramappService: EducationalProgramApplicationsService,
    private eduprogramformService: EducationalProgramFormsService,
    private facilitybookingService: FacilityBookingsService,
    private integrationService: IntegrationsService,
    private invoicereceiptService: InvoiceReceiptsService,
    private publicationService: PublicationsService,
    private showbookingService: ShowbookingsService,
    private simulatorridebookingService: SimulatorRideBookingsService,
    private vlarticleService: VirtualLibraryArticlesService,
    private vlbookService: VirtualLibraryBooksService,
    private vlserialpublicationService: VirtualLibrarySerialpublicationsService
  ) {
    this.getEduProgram();
    this.getFacility();
    this.getTotalDownloadPdf();
    this.getHeadCounter();
    this.getTotalVisitor();
    this.getTotalTicket();
    this.getDailySales();
    this.getDailySalesMain();
  }

  getEduProgram() {
    this.eduprogramappService.get_dashboard().subscribe(
      (res) => {
        // console.log("res", res);
        this.eduprogramsignup += res.queryset_created.length;
        this.eduprogramaccept += res.queryset_approved.length;
        this.eduprogramreject += res.queryset_rejected.length;
      },
      (err) => {
        console.error("err", err);
      },
      () => {
        this.eduprogramformService.get_dashboard().subscribe(
          (res) => {
            // console.log("res", res);
            this.eduprogramsignup += res.queryset_created.length;
            this.eduprogramaccept += res.queryset_approved.length;
            this.eduprogramreject += res.queryset_rejected.length;
          },
          (err) => {
            console.error("err", err);
          }, () => {
            this.initTotalEducationalProgramChart();
          }
        );
      }
    );
  }

  getFacility() {
    this.facilitybookingService.get_dashboard().subscribe((res) => {
      // console.log("res", res);
      this.facilitynew = res.queryset_created.length;
      this.facilityaccept = res.queryset_approved.length;
      this.facilityreject = res.queryset_rejected.length;
    }, (err) => {
      console.error("err", err);
    }, () => {
      this.initTotalFacilityBookingChart();
    });
  }

  getTotalDownloadPdf() {
    this.publicationService.get_total_download_pdf().subscribe(
      (res) => {
        // console.log("res", res);
        this.totaldownloadpdfpublication = res["total_download_pdf"];
      },
      (err) => {
        console.error("err", err);
      }
    );

    this.vlarticleService.get_total_download_pdf().subscribe(
      (res) => {
        // console.log("res", res);
        this.totaldownloadpdfarticle = res["total_download_pdf"];
      },
      (err) => {
        console.error("err", err);
      }
    );

    this.vlbookService.get_total_download_pdf().subscribe(
      (res) => {
        // console.log("res", res);
        this.totaldownloadpdfbook = res["total_download_pdf"];
      },
      (err) => {
        console.error("err", err);
      }
    );

    this.vlserialpublicationService.get_total_download_pdf().subscribe(
      (res) => {
        // console.log("res", res);
        this.totaldownloadpdfserialpublication = res["total_download_pdf"];
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  getHeadCounter() {
    this.varheadcounterinterval = setInterval(() => {
      this.integrationService.get_head_counter_value().subscribe(
        (res) => {
          // console.log("res", res);
          this.headcounter = res;
        },
        (err) => {
          console.error("err", err);
        }
      );
    }, 10000);
  }

  getTotalVisitor() {
    this.integrationService.get_summary_stats_yearly().subscribe(
      (res) => {
        // console.log("res", res);
        for (let i = 0; i < res.sc_data.length; i++) {
          this.totalvisitor += +res.sc_data[i].unique_visits;
        }
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  getTotalTicket() {
    this.simulatorridebookingService.get_dashboard().subscribe((res) => {
      // console.log("res", res);
      this.totalticketsimulatorride = res.queryset_simulator_ride.length;
    }, (err) => {
      console.error("err", err);
    }, () => {
      this.showbookingService.get_dashboard().subscribe((res) => {
        // console.log("res", res);
        this.totalticketshowing = res.queryset_showing.length;
      }, (err) => {
        console.error("err", err);
      }, () => {
        this.initTotalTicketSalesRMChart();
      })
    })
  }

  getDailySales() {
    // Kaunter
    this.invoicereceiptService.get_dashboard("sales_category=Kaunter").subscribe((res) => {
      // console.log("res", res);
      this.totaldailysalescountershowing = res.queryset_showing.length;
      this.totaldailysalescountersimulatorride = res.queryset_simulator_ride.length;
    }, (err) => {
      console.error("err", err);
    }, () => {
      this.initTotalTicketSalesCounterChart();
    });

    // Online
    this.invoicereceiptService.get_dashboard("sales_category=Online").subscribe((res) => {
      // console.log("res", res);
      this.totaldailysalesonlineshowing = res.queryset_showing.length;
      this.totaldailysalesonlinesimulatorride = res.queryset_simulator_ride.length;
    }, (err) => {
      console.error("err", err);
    }, () => {
      this.initTotalTicketSalesOnlineChart();
    });
  }

  getDailySalesMain() {
    this.invoicereceiptService.get_dashboard_2().subscribe((res) => {
      // console.log("res", res);
      this.totaldailysales = res;
      res.forEach((obj, index) => {
        this.totaldailysales[index].date = new Date(obj.date);
      });
    }, (err) => {
      console.error("err", err);
    }, () => {
      this.initDailyQuoteNumberChart();
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.dailyQuoteNumberChart) this.dailyQuoteNumberChart.dispose();
      if (this.totalFacilityBookingChart)
        this.totalFacilityBookingChart.dispose();
      if (this.totalEducationalProgramChart)
        this.totalEducationalProgramChart.dispose();
      if (this.totalTicketSalesRMChart) this.totalTicketSalesRMChart.dispose();
      if (this.totalTicketSalesOnlineChart)
        this.totalTicketSalesOnlineChart.dispose();
      if (this.totalTicketSalesCounterChart)
        this.totalTicketSalesCounterChart.dispose();
    });

    clearInterval(this.varheadcounterinterval);
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      // this.initDailyQuoteNumberChart();
      // this.initTotalFacilityBookingChart();
      // this.initTotalEducationalProgramChart();
      // this.initTotalTicketSalesRMChart();
      // this.initTotalTicketSalesOnlineChart();
      // this.initTotalTicketSalesCounterChart();
    });
  }

  initDailyQuoteNumberChart() {
    // Create chart instance
    let chart = am4core.create("dailyquotenumberchart", am4charts.XYChart);

    // Increase contrast by taking evey second color
    chart.colors.step = 2;

    // Add data
    chart.data = this.totaldailysales;

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;

    // Create series
    function createAxisAndSeries(field, name, opposite, bullet, color) {
      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis() as any);
      if (chart.yAxes.indexOf(valueAxis) != 0) {
        valueAxis.syncWithAxis = chart.yAxes.getIndex(0);
      }

      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = field;
      series.dataFields.dateX = "date";
      series.stroke = am4core.color(color);
      series.strokeWidth = 2;
      series.yAxis = valueAxis;
      series.name = name;
      series.tooltipText = "{name}: [bold]RM {valueY}[/]";
      series.tensionX = 0.8;
      series.showOnInit = true;

      switch (bullet) {
        case "triangle":
          let triangleBullet = series.bullets.push(new am4charts.Bullet());
          triangleBullet.width = 12;
          triangleBullet.height = 12;
          triangleBullet.horizontalCenter = "middle";
          triangleBullet.verticalCenter = "middle";

          let triangle = triangleBullet.createChild(am4core.Triangle);
          triangle.fill = am4core.color("#172b4d");
          triangle.stroke = am4core.color("#172b4d");
          triangle.strokeWidth = 2;
          triangle.direction = "top";
          triangle.width = 12;
          triangle.height = 12;
          break;
        case "rectangle":
          let rectangleBullet = series.bullets.push(new am4charts.Bullet());
          rectangleBullet.width = 10;
          rectangleBullet.height = 10;
          rectangleBullet.horizontalCenter = "middle";
          rectangleBullet.verticalCenter = "middle";

          let rectangle = rectangleBullet.createChild(am4core.Rectangle);
          rectangle.fill = am4core.color("#5e72e4");
          rectangle.stroke = am4core.color("#5e72e4");
          rectangle.strokeWidth = 2;
          rectangle.width = 10;
          rectangle.height = 10;
          break;
        default:
          let bullet = series.bullets.push(new am4charts.CircleBullet());
          bullet.fill = am4core.color("#11cdef");
          bullet.circle.stroke = am4core.color("#11cdef");
          bullet.circle.strokeWidth = 2;
          break;
      }

      valueAxis.renderer.line.strokeOpacity = 1;
      valueAxis.renderer.line.strokeWidth = 2;
      valueAxis.renderer.line.stroke = series.stroke;
      valueAxis.renderer.labels.template.fill = series.stroke;
      valueAxis.renderer.opposite = opposite;
    }

    createAxisAndSeries("total_sales_showing", "Tayangan", false, "circle", "#11cdef");
    createAxisAndSeries("total_sales_simulator_ride", "Kembara Simulasi", true, "triangle", "#172b4d");
    createAxisAndSeries("total_sales_facility", "Fasiliti", true, "rectangle", "#5e72e4");

    // Add legend
    chart.legend = new am4charts.Legend();

    // Add cursor
    chart.cursor = new am4charts.XYCursor();

    this.dailyQuoteNumberChart = chart;
  }

  initTotalFacilityBookingChart() {
    // Create chart instance
    let chart = am4core.create("totalfacilitybookingchart", am4charts.PieChart);

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "total";
    pieSeries.dataFields.category = "status";

    // Let's cut a hole in our Pie chart the size of 30% the radius
    chart.innerRadius = am4core.percent(30);

    // Put a thick white border around each Slice
    pieSeries.slices.template.propertyFields.fill = "color";
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

    chart.data = [
      {
        status: "Daftar",
        total: this.facilitynew,
        color: am4core.color("#5e72e4"),
      },
      {
        status: "Lulus",
        total: this.facilityaccept,
        color: am4core.color("#2dce89"),
      },
      {
        status: "Ditolak",
        total: this.facilityreject,
        color: am4core.color("#f5365c"),
      },
    ];

    this.totalFacilityBookingChart = chart;
  }

  initTotalEducationalProgramChart() {
    // Create chart instance
    let chart = am4core.create(
      "totaleducationalprogramchart",
      am4charts.PieChart
    );

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "total";
    pieSeries.dataFields.category = "status";

    // Let's cut a hole in our Pie chart the size of 30% the radius
    chart.innerRadius = am4core.percent(30);

    // Put a thick white border around each Slice
    pieSeries.slices.template.propertyFields.fill = "color";
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

    chart.data = [
      {
        status: "Daftar",
        total: this.eduprogramsignup,
        color: am4core.color("#5e72e4"),
      },
      {
        status: "Lulus",
        total: this.eduprogramaccept,
        color: am4core.color("#2dce89"),
      },
      {
        status: "Ditolak",
        total: this.eduprogramreject,
        color: am4core.color("#f5365c"),
      },
    ];

    this.totalEducationalProgramChart = chart;
  }

  initTotalTicketSalesRMChart() {
    let chart = am4core.create("totalticketsalesrmchart", am4charts.XYChart);
    chart.colors.step = 2;

    chart.legend = new am4charts.Legend();
    chart.legend.position = "top";
    chart.legend.paddingBottom = 20;
    chart.legend.labels.template.maxWidth = 95;

    let xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    xAxis.dataFields.category = "category";
    xAxis.renderer.cellStartLocation = 0.1;
    xAxis.renderer.cellEndLocation = 0.9;
    xAxis.renderer.grid.template.location = 0;

    let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.min = 0;

    function createSeries(value, name, color) {
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = value;
      series.dataFields.categoryX = "category";
      series.name = name;
      series.columns.template.stroke = am4core.color(color);
      series.columns.template.fill = am4core.color(color);

      series.events.on("hidden", arrangeColumns);
      series.events.on("shown", arrangeColumns);

      let bullet = series.bullets.push(new am4charts.LabelBullet());
      bullet.interactionsEnabled = false;
      bullet.dy = 30;
      bullet.label.text = "{valueY}";
      bullet.label.fill = am4core.color("#ffffff");

      return series;
    }

    chart.data = [
      {
        category: "Jualan Tiket",
        simulator_ride: this.totalticketsimulatorride,
        showing: this.totalticketshowing,
      },
    ];

    createSeries("simulator_ride", "Kembara Simulasi", "#172b4d");
    createSeries("showing", "Tayangan", "#11cdef");

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

    this.totalTicketSalesRMChart = chart;
  }

  initTotalTicketSalesOnlineChart() {
    let chart = am4core.create(
      "totalticketsalesonlinechart",
      am4charts.XYChart
    );
    chart.colors.step = 2;

    chart.legend = new am4charts.Legend();
    chart.legend.position = "top";
    chart.legend.paddingBottom = 20;
    chart.legend.labels.template.maxWidth = 95;

    let xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    xAxis.dataFields.category = "category";
    xAxis.renderer.cellStartLocation = 0.1;
    xAxis.renderer.cellEndLocation = 0.9;
    xAxis.renderer.grid.template.location = 0;

    let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.min = 0;

    function createSeries(value, name, color) {
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = value;
      series.dataFields.categoryX = "category";
      series.name = name;
      series.columns.template.stroke = am4core.color(color);
      series.columns.template.fill = am4core.color(color);

      series.events.on("hidden", arrangeColumns);
      series.events.on("shown", arrangeColumns);

      let bullet = series.bullets.push(new am4charts.LabelBullet());
      bullet.interactionsEnabled = false;
      bullet.dy = 30;
      bullet.label.text = "{valueY}";
      bullet.label.fill = am4core.color("#ffffff");

      return series;
    }

    chart.data = [
      {
        category: "Kutipan Jualan",
        simulator_ride: this.totaldailysalesonlinesimulatorride,
        showing: this.totaldailysalesonlineshowing,
      },
    ];

    createSeries("simulator_ride", "Kembara Simulasi", "#172b4d");
    createSeries("showing", "Tayangan", "#11cdef");

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

    this.totalTicketSalesOnlineChart = chart;
  }

  initTotalTicketSalesCounterChart() {
    let chart = am4core.create(
      "totalticketsalescounterchart",
      am4charts.XYChart
    );
    chart.colors.step = 2;

    chart.legend = new am4charts.Legend();
    chart.legend.position = "top";
    chart.legend.paddingBottom = 20;
    chart.legend.labels.template.maxWidth = 95;

    let xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    xAxis.dataFields.category = "category";
    xAxis.renderer.cellStartLocation = 0.1;
    xAxis.renderer.cellEndLocation = 0.9;
    xAxis.renderer.grid.template.location = 0;

    let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.min = 0;

    function createSeries(value, name, color) {
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = value;
      series.dataFields.categoryX = "category";
      series.name = name;
      series.columns.template.stroke = am4core.color(color);
      series.columns.template.fill = am4core.color(color);

      series.events.on("hidden", arrangeColumns);
      series.events.on("shown", arrangeColumns);

      let bullet = series.bullets.push(new am4charts.LabelBullet());
      bullet.interactionsEnabled = false;
      bullet.dy = 30;
      bullet.label.text = "{valueY}";
      bullet.label.fill = am4core.color("#ffffff");

      return series;
    }

    chart.data = [
      {
        category: "Kutipan Jualan",
        simulator_ride: this.totaldailysalescountersimulatorride,
        showing: this.totaldailysalescountershowing,
      },
    ];

    createSeries("simulator_ride", "Kembara Simulasi", "#172b4d");
    createSeries("showing", "Tayangan", "#11cdef");

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

    this.totalTicketSalesCounterChart = chart;
  }
}
