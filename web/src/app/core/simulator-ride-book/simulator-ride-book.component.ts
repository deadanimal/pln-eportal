import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NavigationExtras, Router } from "@angular/router";

@Component({
  selector: "app-simulator-ride-book",
  templateUrl: "./simulator-ride-book.component.html",
  styleUrls: ["./simulator-ride-book.component.scss"],
})
export class SimulatorRideBookComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.firstFormGroup = this.formBuilder.group({
      date: ["", Validators.required],
      time: ["", Validators.required],
    });
    this.secondFormGroup = this.formBuilder.group({
      citizen: [true, Validators.required],
      adult: [0, Validators.required],
      children: [0, Validators.required],
      // senior: [0, Validators.required],
      // oku: [0, Validators.required],
      total: [0, Validators.required],
    });
  }

  ngOnInit() {}

  citizenChange() {
    this.calculateTotal();
  }

  calculateTotal() {
    if (this.secondFormGroup.value.citizen) {
      this.secondFormGroup.value.total =
        this.secondFormGroup.value.adult * 12 +
        this.secondFormGroup.value.children * 8;
    } else {
      this.secondFormGroup.value.total =
        this.secondFormGroup.value.adult * 24 +
        this.secondFormGroup.value.children * 16;
    }
  }

  makePayment() {
    let booking = {
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value,
    };
    let navigationExtras: NavigationExtras = {
      state: {
        booking,
      },
    };
    this.router.navigate(["/payment"], navigationExtras);
  }
}
