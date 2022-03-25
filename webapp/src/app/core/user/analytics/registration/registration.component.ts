
import { Component, OnInit, NgZone } from "@angular/core";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { forkJoin, Subscription } from "rxjs";
import swal from "sweetalert2";

import { UsersService } from "src/app/shared/services/users/users.service";
import { User } from "src/app/shared/services/users/users.model";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { countries } from "src/app/shared/country-states/country";
import { states } from "src/app/shared/country-states/states";
import { map } from 'rxjs/operators';
import { ToastrService } from "ngx-toastr";


am4core.useTheme(am4themes_animated);
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  // Country
  countries = countries.countries;
  states = states.states;

  // User
  temp_users: [] = [];
  users: any[] = [];
  gender_group: [] = [];
  country_group: [] = [];
  age_group: [] = [];
  race_group: [] = [];


  // Chart
  private chartcountry: am4charts.XYChart;
  private chartstate: am4charts.XYChart;
  private chartgender: am4charts.XYChart;
  private chartrace: am4charts.XYChart;
  private chartage: am4charts.XYChart;

  // FormGroup
  searchFormGroup: FormGroup;

  // Subscription
  subscription: Subscription;

  constructor(
    public formBuilder: FormBuilder,
    private userService: UsersService,
    private toastr: ToastrService,
    private zone: NgZone
  ) {
    this.searchFormGroup = this.formBuilder.group({
      start_date: ["", Validators.required],
      end_date: ["", Validators.required],
    });
  }

  ngOnInit() {

  }

  computeAgeUser() {
    let array = [];
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i]['birth_date'] != null && this.users[i]['birth_date'] != "") {
        let age = 2022 - +this.users[i]['birth_date'].slice(0, 4)
        console.log("age", this.users[i]['birth_date'].slice(0, 4))

        let temp = {
          "age": age
        }
        array.push(temp);
      }
    }
    let age_group = this.groupArrayOfObjects(array, "age");


    let ret = [];
    for (const [key, value] of Object.entries(age_group)) {

      if (this.isNumber(key)) {
        //TODO - lookup countries json files to get the name
        let temp = {
          "age": key
        }
        temp[key] = age_group[key].length

        ret.push(temp);
      }
    }

    this.initChartAge(ret)


  }

  ngAfterViewInit() { }

  initChartGender(data) {
    console.log("data refer", data)
    let chart = am4core.create("chartdivgender", am4charts.XYChart);

    // Add data
    chart.data = data;

    // Create axes
    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "gender";
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
      series.dataFields.categoryY = "gender";
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

    createSeries("FM", "Female");
    createSeries("ML", "Male");
    createSeries("NA", "NA");
    // createSeries("approve", "Lulus");
    // createSeries("reject", "Ditolak");

    this.chartgender = chart;
    chart.exporting.menu = new am4core.ExportMenu();
  }

  initChartRace(data) {
    console.log("data refer", data)
    let chart = am4core.create("chartdivrace", am4charts.XYChart);

    // Add data
    chart.data = data;

    // Create axes
    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "race";
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
      series.dataFields.categoryY = "race";
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

    createSeries("ML", "Malay");
    createSeries("CN", "Chinese");
    createSeries("IN", "Indian");
    createSeries("OT", "Others");
    createSeries("NA", "NA");
    // createSeries("approve", "Lulus");
    // createSeries("reject", "Ditolak");

    this.chartrace = chart;
    chart.exporting.menu = new am4core.ExportMenu();
  }

  initChartCountry(data) {
    let chart = am4core.create("chartdivcountry", am4charts.XYChart);

    // Add data
    chart.data = data;

    // Create axes
    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "country";
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
      series.dataFields.categoryY = "country";
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

    data.forEach((item) => {
      createSeries(item["country"], item["country"]);
    })

    this.chartcountry = chart;
    chart.exporting.menu = new am4core.ExportMenu();
  }

  initChartState(data) {
    let chart = am4core.create("chartdivstate", am4charts.XYChart);

    // Add data
    chart.data = data;

    // Create axes
    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "state";
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
      series.dataFields.categoryY = "state";
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

    data.forEach((item) => {
      createSeries(item["state"], item["state"]);
    })

    this.chartstate = chart;
    chart.exporting.menu = new am4core.ExportMenu();
  }

  initChartAge(data) {
    let chart = am4core.create("chartdivage", am4charts.XYChart);

    // Add data
    chart.data = data;

    // Create axes
    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "age";
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
      series.dataFields.categoryY = "age";
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

    data.forEach((item) => {
      createSeries(item["age"], item["age"]);
    })

    this.chartage = chart;
    chart.exporting.menu = new am4core.ExportMenu();
  }



  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chartgender) this.chartgender.dispose();
      if (this.chartrace) this.chartrace.dispose();
      if (this.chartcountry) this.chartcountry.dispose();
      if (this.chartage) this.chartage.dispose();
    });

  }

  search() {
    this.ngOnDestroy();
    this.userService.getAll().pipe(map(x => x.filter(i => i.date_joined.slice(0,10) >= this.searchFormGroup.value.start_date && i.date_joined.slice(0,10) <= this.searchFormGroup.value.end_date))).subscribe(
      (res) => {
        this.users = res;
        console.log("GG",this.users.length)
      },
      () => {},
      () => {
        if (this.users.length > 0) {
          let gender_group = this.groupArrayOfObjects(this.users, "gender_type");
          let race_group = this.groupArrayOfObjects(this.users, "race_type");
          let country_group = this.groupArrayOfObjects(this.users, "country");
          let state_group = this.groupArrayOfObjects(this.users, "state");

  
          console.log("country_group", country_group);

          try {
            let gender_data = [
              {
                "gender": "Female", "FM": gender_group["FM"].length,
              },
              {
                "gender": "Male", "ML": gender_group["ML"].length,
              },
              {
                "gender": "NA", "NA": gender_group["NA"].length,
              }
            ]
    
            let race_data = [
              {
                "race": "Malay", "ML": race_group["ML"].length,
              },
              {
                "race": "Chinese", "CN": race_group["CN"].length,
              },
              // {
              //   "race": "India", "IN": race_group["IN"].length,
              // },
              {
                "race": "Others", "OT": race_group["OT"].length,
              },
              {
                "race": "NA", "NA": race_group["NA"].length,
              }
            ]
    
            let country_data = this.processCountryData(country_group);
            let state_data = this.processStateData(state_group);
    
            this.initChartGender(gender_data);
            this.initChartRace(race_data);
            this.initChartCountry(country_data);
            this.initChartState(state_data);
            this.computeAgeUser();
          }
          catch (error) {
            this.toastr.error("No Data Found", "Warning");
          }
  
          
  
        }
        else { 
          this.toastr.error("No Data Found", "Warning");
        }
        
      }
    );



  }

  processCountryData(country_group) {
    let ret = [];
    for (const [key, value] of Object.entries(country_group)) {

      if (this.isNumber(key)) {
        //TODO - lookup countries json files to get the name

        let new_key = this.countries.find(element => element.id == +key);
        console.log("NK", new_key);

        let temp = {
          "country": new_key.name
        }
        temp[new_key.name] = country_group[key].length

        ret.push(temp);
      }
    }

    return ret;
  }

  processStateData(state_data) {
    let ret = [];
    for (const [key, value] of Object.entries(state_data)) {

      if (this.isNumber(key)) {
        //TODO - lookup countries json files to get the name

        let new_key = this.states.find(element => element.id == +key);
        console.log("NK", new_key);

        let temp = {
          "state": new_key.name
        }
        temp[new_key.name] = state_data[key].length

        ret.push(temp);
      }
    }

    return ret;
  }

  groupArrayOfObjects(list, key) {
    return list.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

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

  isNumber(char) {
    if (typeof char !== 'string') {
      return false;
    }

    if (char.trim() === '') {
      return false;
    }

    return !isNaN(+char);
  }
}
