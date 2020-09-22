import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EducationalProgramsService } from 'src/app/shared/services/educational-programs/educational-programs.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
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
    private programService: EducationalProgramsService,
    private userService: UsersService,
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

  submitLogin() {
    this.navigateDashboard()
    //  this.loadingBar.start()
    
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
    //     this.navigateDashboard()
    //   }
    // )
    
    //this.navigateDashboard()
  }

  navigateDashboard() {
    this.successMessage()
    this.router.navigate(['/admin/dashboard'])
  }

  navigateForgotPage() {
    this.router.navigate(['/auth/login'])
  }

  successMessage() {
    let title = 'Success'
    let message = 'Loging in right now'
    this.toastr.success(message, title)
  }

}
