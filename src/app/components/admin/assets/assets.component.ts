import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit {

  import = 'Import';
  admin: boolean;

  constructor() { }

  ngOnInit() {
    let data = JSON.parse(localStorage.getItem('data'));
    if (data['role'] === 'admin') {
      this.admin = true;
    }
  }

}
