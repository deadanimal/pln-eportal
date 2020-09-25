import { Component, OnInit, NgZone, OnDestroy, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import swal from 'sweetalert2';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
am4core.useTheme(am4themes_animated);

export enum SelectionType {
  single = 'single',
  multi = 'multi',
  multiClick = 'multiClick',
  cell = 'cell',
  checkbox = 'checkbox'
}

@Component({
  selector: 'app-shows-schedule',
  templateUrl: './shows-schedule.component.html',
  styleUrls: ['./shows-schedule.component.scss']
})
export class ShowsScheduleComponent implements OnInit {

  // Chart
  private chart: any


  // Table
  tableEntries: number = 5;
  tableSelected: any[] = [];
  tableTemp = [];
  tableActiveRow: any;
  tableRows: any[] = []
  SelectionType = SelectionType;

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog-centered"
  };

  constructor(
    private zone: NgZone,
    private modalService: BsModalService,
  ) { }

  ngOnInit() {
    this.getCharts()
    this.getData()
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(
      () => {
        if (this.chart) {
          console.log('Chart disposed')
          this.chart.dispose()
        }
      }
    )
  }

  getData() {
    let fakeData = [
      { 'date': '20/05/2020', 'start_time': '10.00 am', 'end_time': '10.20a m', 'title': 'Dynamic Earth', 'status': 'active' },
      { 'date': '20/05/2020', 'start_time': '12.00 pm', 'end_time': '12.20 pm', 'title': 'The Little Prince', 'status': 'active' },
      { 'date': '20/05/2020', 'start_time': '2.00 pm', 'end_time': '2.20 pm', 'title': 'Shedding Light on The Universe', 'status': 'active' },
      { 'date': '20/05/2020', 'start_time': '4.00 pm', 'end_time': '4.20 pm', 'title': 'Limpahan Chaaya di Alam Semesta', 'status': 'active' },
      { 'date': '21/05/2020', 'start_time': '10.00 am', 'end_time': '10.20 am', 'title': 'The Little Prince', 'status': 'active' },
      { 'date': '21/05/2020', 'start_time': '12.00 pm', 'end_time': '12.20 pm', 'title': 'Shedding Light on The Universe', 'inactive': 'inactive' },
      { 'date': '21/05/2020', 'start_time': '4.00 pm', 'end_time': '4.20 pm', 'title': 'Limpahan Cahaya di Alam Semesta', 'inactive': 'inactive' }
    ]

    this.tableRows = [...fakeData]
      this.tableTemp = this.tableRows.map((prop, key) => {
        return {
          ...prop,
          id: key
        };
      }
    );
  }

  entriesChange($event) {
    this.tableEntries = $event.target.value;
  }

  filterTable($event) {
    let val = $event.target.value;
    this.tableTemp = this.tableRows.filter(function (d) {
      for (var key in d) {
        if (d[key].toLowerCase().indexOf(val) !== -1) {
          return true;
        }
      }
      return false;
    });
  }

  onSelect({ selected }) {
    this.tableSelected.splice(0, this.tableSelected.length);
    this.tableSelected.push(...selected);
  }

  onActivate(event) {
    this.tableActiveRow = event.row;
  }

  getCharts() {
    this.zone.runOutsideAngular(() => {
      this.getChart()
    })
  }

  getChart() {
    let chart = am4core.create('chart-show-schedule-1', am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.paddingRight = 30;
    chart.dateFormatter.inputDateFormat = 'yyyy-MM-dd HH:mm';

    let colorSet = new am4core.ColorSet();
    colorSet.saturation = 0.4;

    chart.data = [
      {
        name: 'Isnin',
        fromDate: '2020-01-01 08:00',
        toDate: '2020-01-01 10:00',
        color: colorSet.getIndex(0).brighten(0)
      },
      {
        name: 'Selasa',
        fromDate: '2020-01-01 12:00',
        toDate: '2020-01-01 15:00',
        color: colorSet.getIndex(0).brighten(0.4)
      },
      {
        name: 'Rabu',
        fromDate: '2020-01-01 15:30',
        toDate: '2020-01-01 21:30',
        color: colorSet.getIndex(0).brighten(0.8)
      },
      {
        name: 'Khamis',
        fromDate: '2020-01-01 09:00',
        toDate: '2020-01-01 12:00',
        color: colorSet.getIndex(2).brighten(0)
      },
      {
        name: 'Jumaat',
        fromDate: '2020-01-01 13:00',
        toDate: '2020-01-01 17:00',
        color: colorSet.getIndex(2).brighten(0.4)
      },
      {
        name: 'Sabtu',
        fromDate: '2020-01-01 11:00',
        toDate: '2020-01-01 16:00',
        color: colorSet.getIndex(4).brighten(0)
      },
      {
        name: 'Ahad',
        fromDate: '2020-01-01 16:00',
        toDate: '2020-01-01 19:00',
        color: colorSet.getIndex(4).brighten(0.4)
      }
    ];

    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'name';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.inversed = true;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.dateFormatter.dateFormat = 'yyyy-MM-dd HH:mm';
    dateAxis.renderer.minGridDistance = 70;
    dateAxis.baseInterval = { count: 30, timeUnit: 'minute' };
    dateAxis.max = new Date(2018, 0, 1, 24, 0, 0, 0).getTime();
    dateAxis.strictMinMax = true;
    dateAxis.renderer.tooltipLocation = 0;

    let series1 = chart.series.push(new am4charts.ColumnSeries());
    series1.columns.template.width = am4core.percent(80);
    series1.columns.template.tooltipText = '{name}: {openDateX} - {dateX}';

    series1.dataFields.openDateX = 'fromDate';
    series1.dataFields.dateX = 'toDate';
    series1.dataFields.categoryY = 'name';
    series1.columns.template.propertyFields.fill = 'color'; // get color from data
    series1.columns.template.propertyFields.stroke = 'color';
    series1.columns.template.strokeOpacity = 1;

    // chart.scrollbarX = new am4core.Scrollbar();

  }

  openModal(modalRef: TemplateRef<any>) {
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide()
    // this.registerForm.reset()
  }

  confirm() {
    swal.fire({
      title: "Confirmation",
      text: "Are you sure to create this new user?",
      type: "info",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-info",
      confirmButtonText: "Simpan",
      showCancelButton: true,
      cancelButtonClass: "btn btn-outline-info",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.value) {
        // this.register()
      }
    })
  }
  

}
