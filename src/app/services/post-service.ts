import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()

export class PostService<Post> {
    getData: EventEmitter<any> = new EventEmitter<any>();
    public userName: string;
    public newCategory: any = '';
    public newSubcategory: any;
    public newUser: any;
    public categoryAttributes: any;
    public obsSubject = new Subject<any>();

    constructor() { }

    sendData(value) {
        this.getData.emit(value);
    }

    sendCategoryData() {
        return this.newCategory, this.newUser;
    }

    returnSubj() {
        return this.obsSubject.asObservable();
    }

    trig() {
        this.obsSubject.next();
    }
}
