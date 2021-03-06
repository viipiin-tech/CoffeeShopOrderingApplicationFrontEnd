import {Injectable} from '@angular/core';
import {Orders} from './Orders';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable()
export class OrderService {

 postUrl: string = "http://localhost:8080/place-order";

constructor(private http: HttpClient, private _router: Router) { }

 httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'

    })
};
  
postOrder(order): Observable < any > {
    let body = JSON.stringify({"orders":order});
    return this.http.post(this.postUrl, body, this.httpOptions).pipe(retry(3),
        catchError(this.handleError)
    );
    
}


    private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
    } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return Observable.throw("Something bad happened; please try again later, Also check your username or password");
}; 

}
