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
            sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
            //$.getScript("button.js", buttons(sender) {

             //alert("Script loaded but not necessarily executed.");

             //});
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
    let IDTaken = false;
    var roomIDTaken = require("./data");
    do{
        var roomID = Math.random()*(100000-10000)+10000;
        for (i = 0; i<roomIDTaken.length;i++){
            if (roomID == roomIDTaken[i]){
                IDTaken = true;
            }
        }
    }while(IDTaken == true);
    roomIDTaken.push(roomID);
    
    let startMessage = { text: "You have created a game, you're room ID is: "+ roomID };
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