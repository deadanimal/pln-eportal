import { Component, OnInit, TemplateRef } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import swal from "sweetalert2";

import { JwtService } from "src/app/shared/jwt/jwt.service";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { UsersService } from "src/app/shared/services/users/users.service";
import { VisitApplicationsService } from "src/app/shared/services/visit-applications/visit-applications.service";
import { VisitsService } from "src/app/shared/services/visits/visits.service";

@Component({
  selector: "app-visit",
  templateUrl: "./visit.component.html",
  styleUrls: ["./visit.component.scss"],
})
export class VisitComponent implements OnInit {
  defaultModal: BsModalRef;
  default = {
    keyboard: true,
    class: "modal-dialog",
    backdrop: false,
    ignoreBackdropClick: true,
  };

  data1 = [
    { id: "", itemName: "Select country" },
    { id: "CZ", itemName: "Czech Republic" },
    { id: "DK", itemName: "Denmark" },
    { id: "DO", itemName: "Dominican Republic" },
    { id: "IQ", itemName: "Iraq" },
    { id: "IL", itemName: "Israel" },
    { id: "IT", itemName: "Italy" },
    { id: "JM", itemName: "Jamaica" },
    { id: "JP", itemName: "Japan" },
    { id: "MG", itemName: "Madagascar" },
    { id: "MT", itemName: "Malta" },
    { id: "NO", itemName: "Norway" },
    { id: "PL", itemName: "Poland" },
    { id: "PT", itemName: "Portugal" },
    { id: "RO", itemName: "Romania" },
    { id: "RU", itemName: "Russian Federation" },
    { id: "LC", itemName: "Saint Lucia" },
    { id: "WS", itemName: "Samoa" },
    { id: "SM", itemName: "San Marino" },
    { id: "SA", itemName: "Saudi Arabia" },
    { id: "ES", itemName: "Spain" },
    { id: "SZ", itemName: "Swaziland" },
    { id: "SE", itemName: "Sweden" },
    { id: "TR", itemName: "Turkey" },
    { id: "UG", itemName: "Uganda" },
    { id: "UA", itemName: "Ukraine" },
    { id: "AE", itemName: "United Arab Emirates" },
    { id: "GB", itemName: "United Kingdom" },
    { id: "US", itemName: "United States" },
    { id: "VN", itemName: "Viet Nam" },
  ];
  settings1 = {
    singleSelection: true,
    text: "Single Select",
    enableSearchFilter: false,
    classes: "selectpicker btn-primary",
  };
  selectedItems1 = [];
  focus;

  // FormGroup
  visitapplicationFormGroup: FormGroup;

  // Data
  users = [];
  visits = [];

  // Dropdown
  organisationcategories = [
    {
      value: "GV",
      display_name: "Kerajaan",
    },
    {
      value: "SC",
      display_name: "Sekolah",
    },
    {
      value: "UN",
      display_name: "Universiti",
    },
    {
      value: "NA",
      display_name: "Tidak ada",
    },
  ];

  constructor(
    public formBuilder: FormBuilder,
    private jwtService: JwtService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private authService: AuthService,
    private userService: UsersService,
    private visitiapplicationService: VisitApplicationsService,
    private visitService: VisitsService
  ) {
    this.getData();

    this.visitapplicationFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      full_name: new FormControl(""),
      email: new FormControl(""),
      phone: new FormControl(""),
      organisation_name: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      organisation_category: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      visit_date: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      visit_time: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      total_participant: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      customer_id: new FormControl(""),
      pic_id: new FormControl(""),
      tour_guide: new FormControl(false, Validators.required),
      status: new FormControl("IP"),
      other_activities: new FormControl(""),
      document_link: new FormControl(""),
    });
  }

  getData() {
    this.visitService.filter("status=true").subscribe(
      (res) => {
        console.log("res", res);
        this.visits = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  getUser() {
    this.userService.get(this.authService.decodedToken().user_id).subscribe(
      (res) => {
        // console.log("res", res);
        this.visitapplicationFormGroup.patchValue({
          ...res,
          customer_id: res.id,
        });
      },
      (err) => {
        console.error("err", err);
      }
    );

    this.userService.getAll().subscribe(
      (res) => {
        // console.log("res", res);
        this.users = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  ngOnInit() {}

  openDefaultModal(modalDefault: TemplateRef<any>) {
    if (this.jwtService.getToken("accessToken")) {
      this.defaultModal = this.modalService.show(modalDefault, this.default);
      this.getUser();
    } else {
      this.toastr.error(
        "Harap maaf. Anda perlu log masuk terlebih dahulu untuk membuat lawatan.",
        "Ralat"
      );
    }
  }

  // Image Process
  onChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.visitapplicationFormGroup.get("document_link").setValue(file);
    }
  }

  openAfterBooking() {
    this.visitapplicationFormGroup.value.visit_date = this.formatDate(
      this.visitapplicationFormGroup.value.visit_date
    );

    const formData = new FormData();
    formData.append(
      "organisation_name",
      this.visitapplicationFormGroup.value.organisation_name
    );
    formData.append(
      "organisation_category",
      this.visitapplicationFormGroup.value.organisation_category
    );
    formData.append(
      "visit_date",
      this.visitapplicationFormGroup.value.visit_date
    );
    formData.append(
      "visit_time",
      this.visitapplicationFormGroup.value.visit_time
    );
    formData.append(
      "total_participant",
      this.visitapplicationFormGroup.value.total_participant
    );
    formData.append(
      "customer_id",
      this.visitapplicationFormGroup.value.customer_id
    );
    formData.append("pic_id", this.visitapplicationFormGroup.value.pic_id);
    formData.append(
      "tour_guide",
      this.visitapplicationFormGroup.value.tour_guide
    );
    formData.append(
      "other_activities",
      this.visitapplicationFormGroup.value.other_activities
    );
    // test dulu
    formData.append(
      "document_link",
      this.visitapplicationFormGroup.get("document_link").value
    );

    this.visitiapplicationService.post(formData).subscribe(
      (res) => {
        console.log("res", res);
        this.defaultModal.hide();
        swal.fire({
          icon: "success",
          title: "Terima kasih",
          text:
            "Pihak kami akan memberi maklum balas terhadap permohonan tersebut dalam masa 3 hari bekerja",
          buttonsStyling: false,
          confirmButtonText: "Tutup",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  formatDate(date) {
    let selectedDate = date;
    let year = selectedDate.getFullYear();
    let month = selectedDate.getMonth() + 1;
    let day =
      selectedDate.getDate() < 10
        ? "0" + selectedDate.getDate()
        : selectedDate.getDate();
    let formatDate = year + "-" + month + "-" + day;

    return formatDate;
  }
}
