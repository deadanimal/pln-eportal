import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_material from "@amcharts/amcharts4/themes/material";
am4core.useTheme(am4themes_material);
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-ticketing',
  templateUrl: './ticketing.component.html',
  styleUrls: ['./ticketing.component.scss']
})
export class TicketingComponent implements OnInit, OnDestroy {

  private chart: am4charts.XYChart
  private chart1: am4charts.XYChart

  constructor(
    private zone: NgZone
  ) { }

  ngOnInit() {
    console.log('ngOnInit')
    this.zone.runOutsideAngular(() => {
      this.initChart()
      this.initChart1()
    })
  }

  ngOnDestroy() {
    console.log('ngOnDestroy')
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose()
      }
      if (this.chart1) {
        this.chart1.dispose()
      }
    })
  }

  initChart() {

    let chart = am4core.create("chartdiv", am4charts.XYChart);

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    for (var i = 0; i < 10; i++) {
      createSeries("value" + i, "Show #" + i);
    }

    // Create series
    function createSeries(s, name) {
      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = "value" + s;
      series.dataFields.dateX = "date";
      series.name = name;

      let segment = series.segments.template;
      segment.interactionsEnabled = true;

      let hoverState = segment.states.create("hover");
      hoverState.properties.strokeWidth = 3;

      let dimmed = segment.states.create("dimmed");
      dimmed.properties.stroke = am4core.color("#dadada");

      segment.events.on("over", function (event) {
        processOver(event.target.parent.parent.parent);
      });

      segment.events.on("out", function (event) {
        processOut(event.target.parent.parent.parent);
      });

      let data = [];
      let value = Math.round(Math.random() * 100) + 100;
      for (var i = 1; i < 100; i++) {
        value += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 30 + i / 5);
        let dataItem = { date: new Date(2018, 0, i) };
        dataItem["value" + s] = value;
        data.push(dataItem);
      }

      series.data = data;
      return series;
    }

    chart.legend = new am4charts.Legend();
    chart.legend.position = "right";
    chart.legend.scrollable = true;
    chart.legend.itemContainers.template.events.on("over", function (event) {
      processOver(event.target.dataItem.dataContext);
    })

    chart.legend.itemContainers.template.events.on("out", function (event) {
      processOut(event.target.dataItem.dataContext);
    })

    function processOver(hoveredSeries) {
      hoveredSeries.toFront();

      hoveredSeries.segments.each(function (segment) {
        segment.setState("hover");
      })

      chart.series.each(function (series: any) {
        if (series != hoveredSeries) {
          series.segments.each(function (segment) {
            segment.setState("dimmed");
          })
          series.bulletsContainer.setState("dimmed");
        }
      });
    }

    function processOut(hoveredSeries) {
      chart.series.each(function (series: any) {
        series.segments.each(function (segment) {
          segment.setState("default");
        })
        series.bulletsContainer.setState("default");
      });
    }

    this.chart = chart

  }

  initChart1() {

    let chart = am4core.create('chartdiv1', am4charts.XYChart)
    chart.colors.step = 2;

    chart.legend = new am4charts.Legend()
    chart.legend.position = 'top'
    chart.legend.paddingBottom = 20
    chart.legend.labels.template.maxWidth = 95

    let xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
    xAxis.dataFields.category = 'category'
    xAxis.renderer.cellStartLocation = 0.1
    xAxis.renderer.cellEndLocation = 0.9
    xAxis.renderer.grid.template.location = 0;

    let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.min = 0;

    function createSeries(value, name) {
      let series = chart.series.push(new am4charts.ColumnSeries())
      series.dataFields.valueY = value
      series.dataFields.categoryX = 'category'
      series.name = name

      series.events.on("hidden", arrangeColumns);
      series.events.on("shown", arrangeColumns);

      let bullet = series.bullets.push(new am4charts.LabelBullet())
      bullet.interactionsEnabled = false
      bullet.dy = 30;
      bullet.label.text = '{valueY}'
      bullet.label.fill = am4core.color('#ffffff')

      return series;
    }

    chart.data = [
      {
        category: 'Show #1',
        first: 40,
        second: 55,
        third: 60
      },
      {
        category: 'Show #2',
        first: 30,
        second: 78,
        third: 69
      },
      {
        category: 'Show #3',
        first: 27,
        second: 40,
        third: 45
      },
      {
        category: 'Show #4',
        first: 50,
        second: 33,
        third: 22
      }
    ]


    createSeries('first', 'The Thirst');
    createSeries('second', 'The Second');
    createSeries('third', 'The Third');

    function arrangeColumns() {

      let series = chart.series.getIndex(0);

      let w = 1 - xAxis.renderer.cellStartLocation - (1 - xAxis.renderer.cellEndLocation);
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
            }
            else {
              series.dummyData = chart.series.indexOf(series);
            }
          })
          let visibleCount = newIndex;
          let newMiddle = visibleCount / 2;

          chart.series.each(function (series) {
            let trueIndex = chart.series.indexOf(series);
            let newIndex = series.dummyData;

            let dx = (newIndex - trueIndex + middle - newMiddle) * delta

            series.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
            series.bulletsContainer.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
          })
        }
      }
    }

    this.chart1 = chart
  }

}
