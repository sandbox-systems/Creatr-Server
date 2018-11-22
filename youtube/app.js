'use strict';
var YouTubeAPIService = require('./youtubeapi');
var youTubeAPIService = new YouTubeAPIService();
youTubeAPIService.initialize('Client');
console.log(youTubeAPIService.generateAuthURL());