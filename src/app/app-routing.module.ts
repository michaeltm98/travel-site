
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { ViewPostComponent } from './components/view-post/view-post.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'new-post', component: NewPostComponent },
    { path: 'view-post/:id', component: ViewPostComponent },
    { path: 'sign-up', component: SignupComponent },
    { path: 'login', component: LoginComponent },

];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule {

}