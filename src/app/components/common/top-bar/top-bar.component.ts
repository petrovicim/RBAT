import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiConnectionService } from '@services/api-connection.service';
import { environment } from '@environment';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  userDetails = {
    image_url: '',
    role: '',
    uid: '',
  };

  constructor(
    private router: Router,
    private _service: ApiConnectionService<any>
  ) { }

  ngOnInit() {
    // let data = JSON.parse(localStorage.getItem('data'))
    // this.userDetails.uid = data['uid'];
    // if (data['role'] === 'admin') {
    //   this.userDetails.role = 'Administrator';
    // } else {
    //   this.userDetails.role = 'User';
    // }
    this.userDetails.role = 'Administrator'
  }

  editProfile() {
    this.router.navigate(['users/', this.userDetails.uid]);
  }

  logoutUser() {
    this._service.get(`${environment.base}${environment.auth}${environment.sign_out}`);
    localStorage.clear();
    this.router.navigate(['login']);
  }

}
