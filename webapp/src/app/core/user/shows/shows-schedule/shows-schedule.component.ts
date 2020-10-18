import {
  Component,
  OnInit,
  NgZone,
  OnDestroy,
  TemplateRef,
} from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import swal from "sweetalert2";

import { ShowtimesService } from "../../../../shared/services/showtimes/showtimes.service";
import { ShowingsService } from "src/app/shared/services/showings/showings.service";
import { VenuesService } from 'src/app/shared/services/venues/venues.service';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";


am4core.useTheme(am4themes_animated);

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-shows-schedule",
  templateUrl: "./shows-schedule.component.html",
  styleUrls: ["./shows-schedule.component.scss"],
})
export class ShowsScheduleComponent implements OnInit {
  // Chart
  private chart: any;

  // Table
  tableEntries: number = 5;
  tableSelected: any[] = [];
  tableTemp = [];
  tableActiveRow: any;
  tableRows: any[] = [];
  SelectionType = SelectionType;

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog-centered",
  };

  // FormGroup
  showtimeFormGroup: FormGroup;

  // Dropdown
  shows = [];
  venues = [];

  constructor(
    public formBuilder: FormBuilder,
    private zone: NgZone,
    private modalService: BsModalService,
    private showtimeService: ShowtimesService,
    private showingService: ShowingsService,
    private venueService: VenuesService
  ) {
    this.getShowing();
    this.getVenue();

    this.showtimeFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      show_date: new FormControl(""),
      show_time: new FormControl(""),
      showing_id: new FormControl(""),
      venue_id: new FormControl(""),
    });
  }

  getShowing() {
    this.showingService.get().subscribe(
      (res) => {
        console.log("res", res);
        this.shows = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  getVenue() {
    this.venueService.get().subscribe(
      (res) => {
        console.log("res", res);
        this.venues = res;
      }, (err) => {
        console.error("err", err);
      }
    )
  }

  ngOnInit() {
    this.getData();
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        console.log("Chart disposed");
        this.chart.dispose();
      }
    });
  }

  getData() {
    this.showtimeService.extended().subscribe(
      (res) => {
        console.log("res", res);
        this.tableRows = res;
        this.getCharts();
        this.tableTemp = this.tableRows.map((prop, key) => {
          return {
            ...prop,
            no: key,
          };
        });
      },
      (err) => {
        console.log("err", err);
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
        if (
          d[key]
            .toString()
            .toLowerCase()
            .indexOf(val.toString().toLowerCase()) !== -1
        ) {
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
      this.getChart();
    });
  }

  getChart() {
    let chart = am4core.create("chart-show-schedule-1", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.paddingRight = 30;
    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd HH:mm";

    let colorSet = new am4core.ColorSet();
    colorSet.saturation = 0.4;

    chart.data = this.generateData(colorSet);

    chart.dateFormatter.dateFormat = "yyyy-MM-dd HH:mm:ss";
    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd HH:mm:ss";

    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "name";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.minGridDistance = 10;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.dateFormatter.dateFormat = "yyyy-MM-dd HH:mm:ss";
    dateAxis.renderer.minGridDistance = 70;
    dateAxis.baseInterval = { count: 30, timeUnit: "minute" };
    // dateAxis.max = new Date(2018, 0, 1, 24, 0, 0, 0).getTime();
    // dateAxis.strictMinMax = true;
    dateAxis.renderer.tooltipLocation = 0;

    let series1 = chart.series.push(new am4charts.ColumnSeries());
    series1.columns.template.width = am4core.percent(80);
    series1.columns.template.tooltipText = "{title}: {openDateX} - {dateX}";

    series1.dataFields.openDateX = "fromDate";
    series1.dataFields.dateX = "toDate";
    series1.dataFields.categoryY = "name";
    series1.columns.template.propertyFields.fill = "color"; // get color from data
    series1.columns.template.propertyFields.stroke = "color";
    series1.columns.template.strokeOpacity = 1;

    // chart.scrollbarX = new am4core.Scrollbar();
  }

  generateData(colorSet) {
    console.log("tableRows", this.tableRows);
    let arrayChart = [];
    for (let i = 0; i < this.tableRows.length; i++) {
      var days = ['Ahad', 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu'];
      var name = this.getDayName(this.tableRows[i].show_date);
      var dayIndex = days.indexOf(name);
      let array = {
        name,
        fromDate: this.tableRows[i].show_date + ' ' + this.tableRows[i].show_time,
        toDate: this.tableRows[i].show_date + ' ' + '16:00:00',
        color: colorSet.getIndex(dayIndex).brighten(0),
        title: this.tableRows[i].showing_id.title
      }
      arrayChart.push(array);
    }
    return arrayChart;
  }

  getDayName(dateString) {
    var days = ['Ahad', 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu'];
    var d = new Date(dateString);
    var dayName = days[d.getDay()];
    return dayName;
  }

  openModal(modalRef: TemplateRef<any>, process: string, row) {
    if (process == "create") {
      this.showtimeFormGroup.reset();
    } else if (process == "update") {
      this.showtimeFormGroup.patchValue({
        ...row,
        showing_id: row.showing_id.id
      });
    }
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
  }

  create() {
    this.showtimeService.post(this.showtimeFormGroup.value).subscribe(
      (res) => {
        console.log("res", res);
        swal
          .fire({
            title: "Berjaya",
            text: "Data anda berjaya disimpan.",
            type: "success",
            buttonsStyling: false,
            confirmButtonClass: "btn btn-success",
          })
          .then((result) => {
            if (result.value) {
              this.modal.hide();
              this.getData();
            }
          });
      },
      (err) => {
        console.error("err", err);
        swal
          .fire({
            title: "Ralat",
            text: "Data anda tidak berjaya disimpan. Sila cuba lagi",
            type: "warning",
            buttonsStyling: false,
            confirmButtonClass: "btn btn-warning",
          })
          .then((result) => {
            if (result.value) {
              // this.modal.hide();
            }
          });
      }
    );
  }

  update() {
    this.showtimeService
      .update(this.showtimeFormGroup.value, this.showtimeFormGroup.value.id)
      .subscribe(
        (res) => {
          console.log("res", res);
          swal
            .fire({
              title: "Berjaya",
              text: "Data anda berjaya dikemaskini.",
              type: "success",
              buttonsStyling: false,
              confirmButtonClass: "btn btn-success",
            })
            .then((result) => {
              if (result.value) {
                this.modal.hide();
                this.getData();
              }
            });
        },
        (err) => {
          console.error("err", err);
          swal
            .fire({
              title: "Ralat",
              text: "Data anda tidak berjaya dikemaskini. Sila cuba lagi",
              type: "warning",
              buttonsStyling: false,
              confirmButtonClass: "btn btn-warning",
            })
            .then((result) => {
              if (result.value) {
                // this.modal.hide();
              }
            });
        }
      );
  }
}
