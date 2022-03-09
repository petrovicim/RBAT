import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.scss']
})
export class EntitiesComponent implements OnInit {

  admin: boolean;

  constructor() { }

  ngOnInit() {
    let data = JSON.parse(localStorage.getItem('data'));
    if (data['role'] === 'admin') {
      this.admin = true;
    }
  }

}
