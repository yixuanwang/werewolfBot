'use strict'

/*
function loadScript(url, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;
    // Fire the loading
    head.appendChild(script);
}
loadScript("functions.js", createGameRoom);
*/

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const events = require('events');



app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
    res.send('Hello world, I am a chat bot')
})

// for Facebook verification
app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === 'werewolf_is_the_best') {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token')
})

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})

app.post('/webhook/', function (req, res) {
    let messaging_events = req.body.entry[0].messaging
    for (let i = 0; i < messaging_events.length; i++) {
        let event = req.body.entry[0].messaging[i]
        let sender = event.sender.id
        if (event.message && event.message.text) {
            let text = event.message.text
            if(text == "creategame") {
                createGameRoom(sender);
                continue;
            }
            if (text == "image"){
                sendGenericMessage(sender);
                continue;
            }
            

            sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
            //if(text == "creategame") {
                //let startBot = new events.EventEmitter(); 
                //startBot.on('createGameRoom', createGameRoom(sender));
                //startBot.emit('createGameRoom');
            //}
            //buttons(sender);
        }
    }
    res.sendStatus(200)
})

const token = "EAAFjZC8es9ZAUBACkjbZCkCvObT8B9gABy2AiBBPVZAryGVp8RKn3oRNALP8bTW0FMYWFWqiLbzccJRqtMUdaUL9hSvpKloutzlj6j8vX7ZAfHyRnohWJr3bYa3gC0nsg63NfK85oEK75oJMkqoZAOFYRAf3O95fZBdXXliJg3PEQZDZD"

function sendTextMessage(sender, text) {
    let messageData = { text:text }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function createGameRoom (sender){
    sendTextMessage(sender, "creating");
    let IDTaken = false;
    var roomIDTaken = require('./data').roomIDTaken;
    var players = require('./data').players;
    do{
        var roomID = Math.floor(Math.random()*90000) + 10000;
        for (let i = 0; i<roomIDTaken.length; i++){
            if (roomID == roomIDTaken[i]){
                IDTaken = true;
            }
        }
    }while(IDTaken == true);
    roomIDTaken.push2roomIdTaken(roomID);
    players.push2players(sender);
    // test player.push
    let testMessage = {text: "you are: " + players[0]}; 
    sendTextMessage(sender, testMessage);
    
    let startMessage = { text: "You have created a game, you're room ID is: "+ roomID };
    sendTextMessage(sender, startMessage);
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: startMessage,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendGenericMessage(sender) {
    let messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "First card",
                    "subtitle": "Element #1 of an hscroll",
                    //"image_url": "http://messengerdemo.parseapp.com/img/rift.png",
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://www.messenger.com",
                        "title": "Kill someone"
                    }, {
                        "type": "postback",
                        "title": "Postback",
                        "payload": "Do nothing",
                    }],
                }, 

                ]
            }
        }
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}
