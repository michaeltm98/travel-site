import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Place } from '../models/place.model';
import { HttpClient } from '@angular/common/http';
import { PlacesService } from '../services/places.service';
import { User } from '../models/user.model';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import * as AWS from 'aws-sdk/global';
import { CognitoIdentityCredentials } from 'aws-sdk/global';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {
    poolData = {
        UserPoolId : 'us-east-1_ExtEwSNsr', // Your user pool id here
        ClientId : '7rq9a5js654ldm3giha4d7agg0' // Your client id here
      };
    userPool: CognitoUserPool = new CognitoUserPool(this.poolData);

  constructor() { }

  initialize() {

  }


  signup(user: User) {
      var attributeList = [];
  
      var dataEmail = {
          Name : 'email',
          Value : user.email
      };
  
      var attributeEmail = new CognitoUserAttribute(dataEmail);
  
      attributeList.push(attributeEmail);
  
      this.userPool.signUp(user.username, user.username, attributeList, null, function(err, result){
          if (err) {
              alert(err.message || JSON.stringify(err));
              return;
          }
          var cognitoUser = result.user;
          console.log('user name is ' + cognitoUser.getUsername());
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
    var cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            var accessToken = result.getAccessToken().getJwtToken();
 
            //POTENTIAL: Region needs to be set if not already set previously elsewhere.
            AWS.config.region = '<region>';
 
            AWS.config.credentials = new CognitoIdentityCredentials({
                IdentityPoolId : '...', // your identity pool id here
                Logins : {
                    // Change the key below according to the specific region your user pool is in.
                    'cognito-idp.<region>.amazonaws.com/<YOUR_USER_POOL_ID>' : result.getIdToken().getJwtToken()
                }
            });
 
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
 
        onFailure: function(err) {
            alert(err.message || JSON.stringify(err));
        },
 
    });
  }




}
