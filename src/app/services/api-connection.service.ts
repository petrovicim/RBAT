import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class ApiConnectionService<T> {

    constructor(
        private http: HttpClient
    ) { }

    getHttpOptions() {
        let data = JSON.parse(localStorage.getItem('data'));
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                // 'Access-Control-Expose-Headers': 'allow',
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization",
                'access-token': data['access-token'],
                'client': data['client'],
                'uid': data['uid'],
            })
        };
    }

    get(path: string): Observable<T> {
        return this.http.get<T>(path, this.getHttpOptions());
    }

    put(path: string, data: T): Observable<T> {
        return this.http.put<T>(path, data, this.getHttpOptions());
    }

    post(path: string, data: T): Observable<T> {
        return this.http.post<T>(path, data, this.getHttpOptions());
    }

    delete(path: string): Observable<T> {
        return this.http.delete<T>(path, this.getHttpOptions());
    }

    signIn(path: string, data: T): Observable<HttpResponse<any>> {
        return this.http.post(path, data, {
            observe: 'response'
        });
    }
}
