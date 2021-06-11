import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutMeComponent } from './about-me/about-me.component';
import { GameWheelComponent } from './game-wheel/game-wheel.component';
import { QuestionsComponent } from './questions/questions.component';
import { StartupComponent } from './startup/startup.component';

const routes: Routes = [
  { path: '', redirectTo: '/startup', pathMatch: 'full'},
  { path: 'about', component: AboutMeComponent },
  { path: 'wheel-of-fortune', component: GameWheelComponent },
  { path: 'quiz', component: QuestionsComponent },
  {path: 'startup', component: StartupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [AboutMeComponent, GameWheelComponent, QuestionsComponent, StartupComponent];
