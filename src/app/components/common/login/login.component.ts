import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiConnectionService } from '@services/api-connection.service';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

@Injectable()

export class LoginComponent implements OnInit {

  wrongData: boolean;
  userData = {
    email: '',
    password: '',
  }

  constructor(
    private router: Router,
    private _service: ApiConnectionService<any>,
  ) {
  }

  ngOnInit() {
  }

  logIn() {
    const cleaner = this._service.signIn(`${environment.base}${environment.auth}${environment.sign_in}`, this.userData).subscribe(res => {
      let data = {
        'access-token': res.headers.get('access-token'),
        'client': res.headers.get('client'),
        'uid': res.headers.get('uid'),
        'role': res.body.data.role,
        'id': res.body.data.id,
      }
      localStorage.setItem('data', JSON.stringify(data));
      this.router.navigate(['/users']);
      cleaner.unsubscribe();
    },
      err => {
        console.error('LOGIN error: ', err);
        this.wrongData = true;
      });
  }

  redirect(path) {
    switch (path) {
      case '/register':
        this.router.navigate([path]);
        break;
      case '/reset-password':
        this.router.navigate([path]);
        break;
      default:
        break;
    }
  }

}