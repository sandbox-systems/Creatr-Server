'use strict';
const util = require('util')
const moment = require('moment')
require('dotenv').config({ path: '../.env'});
const environment = process.env.NODE_ENV;
var YouTubeAPIService = require('./youtubeapiservice');
var youTubeAPIService = new YouTubeAPIService();
youTubeAPIService.initialize('Client');
//use the below to initialize the youTubeAPIService with the client ID and secret
//when you don't yet have an access token or a refresh token.
// youTubeAPIService.initialize('Client');

// use the below to retrieve the URL for the consent screen.
// console.log(youTubeAPIService.generateAuthURL());

//use the below to retrieve a refresh token using the code you received in the step above:
// youTubeAPIService.getToken('4/nQDXh2rinS7weXHdrxaLBOgxvyS9sSezrDx9UdRjHxAR4ilbexw8HEO1YqsMe6mo8H55KwE1ulLGRyiUTmFTsFQ');

//use the below to initialize the youtube property on your service
//and set the authorization for the youtube API.
module.exports = {
    getDefaultBroadcast: async () => {
        return new Promise(async (resolve, reject) => {
            try {
                await youTubeAPIService.initialize('Tokens')
                const res = await youTubeAPIService.youtube.liveBroadcasts.list({
                    "part": "id, snippet, contentDetails, status",
                    "broadcastStatus": "all",
                    "broadcastType": "persistent",
                    "maxResults": 10
                })
                const item = res.data.items.filter(i=> 'boundStreamId' in i.contentDetails)[0];
                //console.log(res.data.item)
                resolve(item)
                // {vid:item.id, stream:item.contentDetails.boundStreamId, livechat:item.snippet.liveChatId}
            } catch (err) {
                reject(err);
            }
        })
    },
    createBroadcast: async (video) => {
        return new Promise(async (resolve, reject) => {
            try {
                await youTubeAPIService.initialize('Tokens')
                const defaultBroadcast = await module.exports.getDefaultBroadcast()
                const res = await youTubeAPIService.youtube.liveBroadcasts.update({
                    "part": "id, snippet, contentDetails, status",
                    "resource": {
                        "id": defaultBroadcast.id,
                        "snippet": {
                            "scheduledStartTime": moment().add(1, 'm').toDate().toISOString(),
                            "title": video.name,
                            "description" : video.description
                        },
                        "contentDetails": {
                            "monitorStream": {
                            "enableMonitorStream": true,
                            "broadcastStreamDelayMs": 0,
                        },
                        "enableDvr": false,
                        "enableEmbed": false,
                        "recordFromStart": true,
                        "enableContentEncryption": false,
                        "startWithSlate": false,
                        "latencyPreference": "ultralow"
                        },
                        "status": {
                            "privacyStatus": "unlisted"
                        }
                    }   
                })
                resolve(res.data)
            } catch (err) {
                reject(err);
            }
        })
    },
    getLivestream: async () => {
        return new Promise(async (resolve, reject) => {
            try {
                await youTubeAPIService.initialize('Tokens')
                const defaultBroadcast = await module.exports.getDefaultBroadcast()
                const res = await youTubeAPIService.youtube.liveStreams.list({
                    "part": "cdn, status",
                    "id": defaultBroadcast.contentDetails.boundStreamId,
                    "maxResults": 1
                })
                resolve(res.data.items[0])
            } catch (err) {
                reject(err);
            }
        })
    },
    stopBroadcast: async () => {
        try {
            await youTubeAPIService.initialize('Tokens')
            const defaultBroadcast = await module.exports.getDefaultBroadcast()
            console.log(defaultBroadcast)
            const res = await youTubeAPIService.youtube.liveBroadcasts.transition({
                "part": "status",
                "id": defaultBroadcast.id,
                "broadcastStatus": "complete",
            })
            return res.data
        } catch (err) {
           throw err;
        }
    },  
}

// module.exports.createBroadcast({name:"Test nifwejfiowep0of",description:"Testing 12345..."})
// .then(data => console.log(data))
// .catch(err => console.log(err))
// module.exports.getLivestream({name:"Creatr 4",description:"Testing 123..."})
// .then(data => console.log(data.cdn))
// .catch(err => console.log(err))

// module.exports.getDefaultBroadcast({name:"Creatr 2020",description:"Testing 12345..."})
// .then(data => console.log(data))
// .catch(err => console.log(err))
// module.exports.stopBroadcast({name:"Creatr 2020",description:"Testing 12345..."})
// .then(data => console.log(data))
// .catch(err => console.log(err))

// youTubeAPIService.initialize('Tokens')
//   .then(function(){
//     youTubeAPIService.youtube.liveStreams.insert(
//         {
//         "part": "id, snippet, status, contentDetails",
//         "resource": {
//             "snippet": {
//               "title": "Arvind Balaji Live Stream"
//             },
//             "cdn": {
//               "format": "720p",
//               "ingestionType": "rtmp"
//             }
//           }    
//     }, 
//         function(err, data){
//             if(err){
//                 console.log(err);
//                 //do something to handle the error
//                 return err;
//             }
//             if(data){
//                 console.log(data);
//                 return data;
//             }
//         }
//     )
// })
//   youTubeAPIService.youtube.playlistItems.list({
//     playlistId : 'PLy4V6XuyqF3OaVU50wrf1yAgoPClsjAnO',
//     part : 'snippet',
//     maxResults: '50'
//   }, function(err, data){
//     if(err){
//       console.log(err);
//       //do something to handle the error
//       return err;
//     }
//     if(data){
//       console.log(data);
//       return data;
//     }
//   });