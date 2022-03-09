import { Router } from "@angular/router";
import { Injectable, OnInit } from "@angular/core";

@Injectable()
export class AuthService implements OnInit {

    constructor(
        private router: Router,
    ) { }

    ngOnInit() { }

    isAuthenticated() {
        let data = JSON.parse(localStorage.getItem('data'));
        if (data['access-token'] != null && data['client'] != null && data['uid'] != null) {
            return true;
        } else {
            return false;
        }
    }
}
