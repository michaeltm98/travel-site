import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { ViewPostComponent } from './components/view-post/view-post.component';
import { HeaderComponent } from './partials/header/header.component';
import { FooterComponent } from './partials/footer/footer.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataStoreService } from './shared/dataStore.service';
import { BackgroundService } from './shared/background.service';
import { CognitoService } from './shared/cognito.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ConfirmCodeModalComponent } from './modals/confirm-code-modal/confirm-code-modal.component';
import { UserPageComponent } from './components/user-page/user-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    NewPostComponent,
    ViewPostComponent,
    HeaderComponent,
    FooterComponent,
    ConfirmCodeModalComponent,
    UserPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    NgbModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  entryComponents: [ConfirmCodeModalComponent],
  providers: [DataStoreService, BackgroundService, CognitoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
