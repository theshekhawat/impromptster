import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { IQuestionDetails } from '../model/IQuestionDetails';
import { ActivatedRoute } from '@angular/router';
import { QuizInformationDetailsService } from '../services/quiz-information-details.service';
import { ConstantsService } from '../services/constants.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  @ViewChild('menuButton') menuButton!: ElementRef;
  @ViewChild('hamburger') hamburger!: ElementRef;
  @ViewChild('navbar') navbar!: ElementRef;
  @ViewChild('menuNav') menuNav!: ElementRef;
  @ViewChild('menuNavItem') menuNavItem!: ElementRef;
  public showMenu = false;
  public questionDetails!: Array<IQuestionDetails>;
  public imgBasePath = ConstantsService.imageAssetsBasePath;

  constructor(private quizInformationDetailsService: QuizInformationDetailsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.questionDetails = data.questionData;
      console.log(data.questionData);
    });
    // this.getQuizQuestions();
  }

  private getQuizQuestions(): void {
    this.quizInformationDetailsService.getsQuestionsList().subscribe(
      (data) => this.questionDetails = data,
      (error) => (console.log(error))
    );
  }

  toggleMenu(): void {
    if (!this.showMenu) {
      this.hamburger.nativeElement.classList.add('open');
      this.navbar.nativeElement.classList.add('open');
      this.menuNav.nativeElement.classList.add('open');
      this.showMenu = true;
    } else {
      this.hamburger.nativeElement.classList.remove('open');
      this.navbar.nativeElement.classList.remove('open');
      this.menuNav.nativeElement.classList.remove('open');
      this.showMenu = false;
    }
  }

}
