import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PostService } from '@services/post-service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @ViewChild('componentInput')
  componentInput: any;

  @ViewChild('search') search: ElementRef;

  filterBy = 'name';
  constructor(private _postService: PostService<any>) { }

  ngOnInit() {
  }

  toggleFilter(): void {
    this._postService.sendData(this.componentInput);
  }
  setFocus() {
    this.search.nativeElement.focus();
  }
}
