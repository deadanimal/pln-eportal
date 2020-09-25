import { Component, OnInit } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // Image
  imgLogo: string = 'assets/img/logo/planetarium-logo.png'

  // Login form
  focusUsername: boolean = false
  focusPassword: boolean = false
  loginForm: FormGroup
  loginFormMessages = {
    'username': [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Please enter a valid email'}
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minLength', message: 'Password must have at least 8 characters' }
    ]
  }
  
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private loadingBar: LoadingBarService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.initForm()
    this.serviceSubscription()
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])]
    })
  }

  serviceSubscription() {
    // this.userService.getAll().subscribe()
    // this.programService.getAll().subscribe()
  }

  login() {
    this.navigatePage('/dashboard')
    
    // this.authService.obtainToken(this.loginForm.value).subscribe(
    //   () => {
    //     // Success
    //     this.loadingBar.complete()
    //   },
    //   () => {
    //     // Failed
    //     this.loadingBar.complete()
    //   },
    //   () => {
    //     // After
    //     this.navigatePage('/dashboard')
    //   }
    // )
  }

  successMessage() {
    let title = 'Success'
    let message = 'Logging in right now'
    this.toastr.success(message, title)
  }

  navigatePage(path: string) {
    if (path == '/dashboard') {
      this.successMessage()
    }
    return this.router.navigate([path])
  }

  initServices() {
    this.loadingBar.start()
    forkJoin([]).subscribe(
      () => {
        this.loadingBar.complete()
      },
      () => {
        this.loadingBar.complete()
      },
      () => {}
    )
  }

}
