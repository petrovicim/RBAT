import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
// import { ResetPasswordService } from '../../../services/resetPassword/resetPassword.service';
// import { UserService } from '../../../services/user/user.service';
import { Router } from '@angular/router';
// import * as localStorage from '../../../util/localStorageUtil';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
// import { Subscription } from 'rxjs';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-resetPassword',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})


export class ResetPasswordComponent implements OnInit {

  loading: boolean;
  response = {};
  resetPasswordForm: FormGroup;
  matcher: MyErrorStateMatcher;

  constructor(
    // private resetPasswordService: ResetPasswordService,
    private router: Router
    // ,
    // private userService: UserService
  ) {
  }

  ngOnInit() {
    this.resetPasswordForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    }, { updateOn: 'submit' });
    // if (localStorage.verifyResetPassword()) {
    //   const serviceSubscr: Subscription = this.userService.getUserDetails().subscribe((data: any) => {
    //     if (data.activated && data.hasCompletedTutorial) {
    //       this.router.navigate(['/']);
    //     }
    //     serviceSubscr.unsubscribe();
    //   });
    // }
    this.matcher = new MyErrorStateMatcher();
  }

  onResetPassword() {
    this.response = {};
    // if (this.resetPasswordForm.valid) {
    //   localStorage.removeToken();
    //   this.loading = true;
    //   const serviceSubscr: Subscription = this.resetPasswordService.resetPasswordUser(this.resetPasswordForm.value.username, this.resetPasswordForm.value.password)
    //     .subscribe((data: any) => {
    //       localStorage.saveToken(data.id_token);
    //       this.userService.refreshToken();
    //       this.router.navigate(['/']);
    //       this.userService.setCurrentUserName(this.resetPasswordForm.value.username);
    //       this.loading = false;
    //       serviceSubscr.unsubscribe();
    //     },
    //       err => {
    //         this.loading = false;
    //         this.showError(err.status);
    //         console.log('Error', err);
    //       }
    //     );
    // }
  }

  showError(err: number) {
    if (err === 400 || err === 401) {
      this.response = { type: 'error', message: 'Ooops! The username or password are incorrect. Please try again!' };
    } else {
      this.response = { type: 'error', message: 'Ooops! Something went wrong. Please try again!' };
    }
  }

  goToResetPassPage() {
    this.router.navigate(['/reset-pass']);
  }

  goToSignUp() {
    this.router.navigate(['/register']);
  }
}
