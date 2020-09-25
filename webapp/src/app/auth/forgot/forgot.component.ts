import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms'
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  // Image
  imgLogo: string = 'assets/img/logo/planetarium-logo.png'

  // Reset form
  focusEmail: boolean = false
  resetForm: FormGroup
  resetFormMessages = {
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Please enter a valid email'}
    ]
  }

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private loadingBar: LoadingBarService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.resetForm = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])]
    })
  }

  submitReset(){
    // console.log(this.resetForm.value)
    this.loadingBar.start()
    this.authService.resetPassword(this.resetForm.value).subscribe(
      () => {
        // Success
        this.loadingBar.complete()
        this.successMessage()
      },
      () => {
        // Failed
        this.loadingBar.complete()
      },
      () => {
        // After
      }
    )
  }
  
  successMessage() {
    let title = 'Success'
    let message = 'An email has been sent to ' + this.resetForm.value.email + ' to reset your password'
    this.toastr.success(message, title)
  }

  navigatePage(path: string) {
    return this.router.navigate([path])
  }

}
