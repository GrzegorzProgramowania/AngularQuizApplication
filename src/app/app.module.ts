import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { QuestionComponent } from './question/question.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [BrowserModule, FormsModule, AppRoutingModule, RouterModule],
  declarations: [AppComponent, WelcomeComponent, QuestionComponent, HeaderComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
