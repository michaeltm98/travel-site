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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    NewPostComponent,
    ViewPostComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [DataStoreService, BackgroundService],
  bootstrap: [AppComponent]
})
export class AppModule { }
