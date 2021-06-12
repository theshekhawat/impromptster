import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { QuizInformationDetailsService } from '../services/quiz-information-details.service';
import { IQuestionDetails } from '../model/IQuestionDetails';

@Injectable({
    providedIn: 'root'
  })
export class QuestionDataResolver implements Resolve<any>{

    constructor(
        private quizDataService: QuizInformationDetailsService,

    ) {

    }

    resolve(route: ActivatedRouteSnapshot): Observable<IQuestionDetails[]> {
        return this.quizDataService.getsQuestionsList();
    }
}
