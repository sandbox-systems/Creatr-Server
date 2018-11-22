var Promise = require('bluebird');
var {google} = require('googleapis');
var OAuth2 = google.auth.OAuth2;

var CLIENT_ID = "383888390385-7pq0knuv3r8qlnpnsqvoet4iikkpngbd.apps.googleusercontent.com";
var CLIENT_SECRET = "g6Z9sFYHmee16hNAjbuUz-6S";
var REDIRECT_URL = "http://www.google.com";
var refresh_token = process.env.refresh_token;

var YouTubeAPIService = function YouTubeAPIService(){
    this.OAuth2Client = null;
    this.youtube = null;
  };
  YouTubeAPIService.prototype.initialize = function initialize(what){
    var self = this;
    if(what==='Client'){
      self.OAuth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
    }else if(what==='Tokens'){
      self.OAuth2Client.setCredentials({
        refresh_token: refresh_token
      });
      return new Promise(function(resolve, reject){
        self.refreshAccessToken()
          .then(function(response){
            console.log(self.OAuth2Client);
            self.youtube = google.youtube({
              version: 'v3',
              auth: self.OAuth2Client
            });
            resolve('YouTube oAuth client authenticated.');
          })
          .catch(function(err){
            console.log(err);
            reject(err);
          });
      });
    }
  };
  YouTubeAPIService.prototype.refreshAccessToken = function refreshAccessToken(){
    var self = this;
    return new Promise(function(resolve, reject){
      self.OAuth2Client.refreshAccessToken(function(err, tokens){
        if(err){
          //do something with the error
          console.log(err);
          return reject('error in authenticating YouTube oAuth client.');
        }
        resolve(tokens);
      });
    });
  };
  
  YouTubeAPIService.prototype.generateAuthURL = function generateAuthURL(){
    var self = this;
    var url = self.OAuth2Client.generateAuthURL({
      access_type: 'offline',
      scope: 'https://gdata.youtube.com'
    });
    return url;
  };
  module.exports = YouTubeAPIService;