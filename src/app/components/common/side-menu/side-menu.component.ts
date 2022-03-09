import { Component, OnInit } from '@angular/core';
import { PostService } from '@services/post-service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  route;
  currentRoute;
  constructor(private _postService: PostService<any>) { }

  ngOnInit() {
  }

  resetData(current) {
    if (current !== this.route) {
      this._postService.newCategory = { name: '', attributes: [] };
      this._postService.newSubcategory = {
        name: '',
        data: {},
        attributes: [],
        category: '',
        categoryUid: '',
      };
      this.route = current;
    }
  }

  onClick(current) {
    switch (current) {
      case 'users':
        this.resetData(current);
        break;
      case 'assets':
        this.resetData(current);
        break;
      case 'entities':
        this.resetData(current);
        break;
      default:
        break;
    }
  }
}
