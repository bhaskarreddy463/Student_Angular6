import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { studentListModel } from './student-list.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const apiUrl:String = "./assets/data.json";

@Injectable({
  providedIn: 'root'
})
export class StudentListService {

  constructor(private http: HttpClient) { }

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
    return throwError('Something bad happened; please try again later.');
  };

  private extractData(res: studentListModel[]) {
    let body = res;
    let topperMarks = {
      marks:0,
      index:-1
    };
    body.forEach((element, index) => {
      element.totalMarks = 0;
      console.log(element);
      element.status = "Pass";
      for(let subject in element.marks){
        if(Number(element.marks[subject] < 20)){
          element.status = "Fail";
        }
        element.totalMarks += Number(element.marks[subject]);
      }
      if(topperMarks.marks < element.totalMarks){
        topperMarks.marks = element.totalMarks;
        topperMarks.index = index;
      }
    });
    body = body.sort((a, b) => a.name > b.name ? 1 : -1 )
    body[topperMarks.index].status = "Topper";
    return body || { };
  }

  getStrudentsList(): Observable<any> {
    return this.http.get("./assets/data.json", httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
}
