import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IQuestionDetails } from '../model/IQuestionDetails';

@Injectable({
  providedIn: 'root'
})
export class QuizInformationDetailsService {
  private quizQuestionsSet = '../assets/datasource/question-set-1.json';

  constructor(private httpClient: HttpClient) { }

  getsQuestionsList(): Observable<any> {
    return this.httpClient.get<IQuestionDetails>(this.quizQuestionsSet).pipe(
      catchError(
        this.errorHandler
      ));
  }

  errorHandler(error: HttpErrorResponse): Observable<any> {
    if (error.status === 401) {
      return observableThrowError('Status ' + error.status + ': You are not authorized to access this service.');
    }
    else if (error.status === 400) {
      return observableThrowError('Status ' + error.status + ': Bad request!');
    }
    else if (error.status === 0) {
      return observableThrowError('Status ' + error.status + ': Unknown Error!');
    }
    else if (error.status === 404) {
      return observableThrowError('Status ' + error.status + ': Not found!');
    }
    return observableThrowError(error.message || 'Server Error');
  }
}
