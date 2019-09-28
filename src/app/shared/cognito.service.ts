import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Place } from '../models/place.model';
import { HttpClient } from '@angular/common/http';
import { PlacesService } from '../services/places.service';
import 'crypto-js/lib-typedarrays'; // add this line
import { User } from '../models/user.model';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import * as AWS from 'aws-sdk/global';
import { CognitoIdentityCredentials } from 'aws-sdk/global';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ViewPostComponent } from '../components/view-post/view-post.component';
import { SignupComponent } from '../components/signup/signup.component';
import { HomeComponent } from '../components/home/home.component';
import { ConfirmCodeModalComponent } from '../modals/confirm-code-modal/confirm-code-modal.component';
import { DataStoreService } from './dataStore.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {
    poolData = {
        UserPoolId : 'us-east-1_ExtEwSNsr', // Your user pool id here
        ClientId : '7rq9a5js654ldm3giha4d7agg0' // Your client id here
      };
    userPool: CognitoUserPool = new CognitoUserPool(this.poolData);
    cognitoUser: CognitoUser;

  constructor(private modalService: NgbModal, 
    private dataStoreService: DataStoreService,
    private router: Router) { }
  closeResult: string;

  initialize() {
     this.dataStoreService.setUser(this.getLocalStore());
  }

  getUser(): CognitoUser {
    return this.cognitoUser;
  }


  signup(user: User) {
      var attributeList = [];
  
      var dataEmail = {
          Name : 'email',
          Value : user.email
      };
  
      var attributeEmail = new CognitoUserAttribute(dataEmail);
  
      attributeList.push(attributeEmail);
  
      this.userPool.signUp(user.username, user.password, attributeList, null, (err, result) => {
          if (err) {
              alert(err.message || JSON.stringify(err));
              return;
          }
          this.cognitoUser = result.user;
          this.confirmUser(user);
      });
  }

  login(user: User) {

    var authenticationData = {
        Username : user.username,
        Password : user.password,
    };
    var authenticationDetails = new AuthenticationDetails(authenticationData);

    var userData = {
        Username : user.username,
        Pool : this.userPool
    };
    this.cognitoUser = new CognitoUser(userData);
    this.cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          //TODO: JS function in here to store user in localhost
          // send user id to DB in each post / transaction
            var accessToken = result.getAccessToken().getJwtToken();
            this.router.navigate(['/']);  
            user.accessToken = accessToken;
            this.dataStoreService.setUser(user);
            this.setLocalStore(user);
            // this.user
            // //POTENTIAL: Region needs to be set if not already set previously elsewhere.
            // AWS.config.region = 'use-east-1';
 
            // AWS.config.credentials = new CognitoIdentityCredentials({
            //     IdentityPoolId : '...', // your identity pool id here
            //     Logins : {
            //         // Change the key below according to the specific region your user pool is in.
            //         'cognito-idp.us-east-1.amazonaws.com/us-east-1_ExtEwSNsr' : result.getIdToken().getJwtToken()
            //     }
            // });
 
            // //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
            // AWS.config.credentials.refresh((error) => {
            //     if (error) {
            //          console.error(error);
            //     } else {
            //          // Instantiate aws sdk service objects now that the credentials have been updated.
            //          // example: var s3 = new AWS.S3();
            //          console.log('Successfully logged!');
            //     }
            // });
        },
 
        onFailure: (err) => {
          console.log(err.message);
            if (err.message.includes("confirm")) {
                this.confirmUser(user);
            }
        },
 
    });
  }

  private confirmUserRegistration(user: User, confirmationCode: string) {
    var userData = {
        Username : user.username,
        Pool : this.userPool
    };
    this.cognitoUser = new CognitoUser(userData);

    this.cognitoUser.confirmRegistration(confirmationCode, true, function(err, result) {
        if (err) {
          alert("error");
            console.log(err)
            return;
        }
    });
  }

   confirmUser(user: User) {

     setTimeout(() => {
      this.modalService.open(ConfirmCodeModalComponent, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
        this.confirmUserRegistration(user, result);
        
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
     }, 100);

   }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


  logout() {
    if (this.cognitoUser && this.cognitoUser.signOut) {
      this.cognitoUser.signOut();
    }
    this.cognitoUser = null;
    this.dataStoreService.setUser(null);
    this.router.navigate(['/']);
    this.setLocalStore(null);
  }

  setLocalStore(user: User): void {
    localStorage.setItem("currentUser", JSON.stringify(user));
  }

  getLocalStore(): User {
    return JSON.parse(localStorage.getItem("currentUser"));
  }


}
