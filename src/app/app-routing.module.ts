import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutMeComponent } from './about-me/about-me.component';
import { GameWheelComponent } from './game-wheel/game-wheel.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionDataResolver } from './questions/question-data-resolver';
import { StartupComponent } from './startup/startup.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/startup', pathMatch: 'full' },
  { path: 'about', component: AboutMeComponent },
  { path: 'wheel-of-fortune', component: GameWheelComponent },
  {
    path: 'quiz', component: QuestionsComponent, resolve: {
      questionData: QuestionDataResolver
    }
  },
  { path: 'startup', component: StartupComponent },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/page-not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [AboutMeComponent, GameWheelComponent, QuestionsComponent, StartupComponent, PageNotFoundComponent];
