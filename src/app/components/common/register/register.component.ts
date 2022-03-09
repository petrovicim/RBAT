import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApiConnectionService } from '@services/api-connection.service';
import { environment } from '@environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  existingEmail: boolean;
  userData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'admin',
  }

  constructor(
    private _service: ApiConnectionService<any>,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private router: Router,
  ) {
    iconRegistry.addSvgIcon(
      'keyboard_arrow_right',
      sanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/keyboard_arrow_right.svg'));
  }

  ngOnInit() {
  }

  registerUser(): void {
    if (this.userData.password === this.userData.confirmPassword) {
      const cleaner = this._service.post(`${environment.base}${environment.auth}${environment.sign_in}`, this.userData).subscribe(res => {
        this.router.navigate(['/login']);
        cleaner.unsubscribe();
      },
        err => {
          console.error("REGISTER user error: ", err),
            this.existingEmail = true;
        });
    }
  }

  redirect(path) {
    this.router.navigate([path]);
  }
}
