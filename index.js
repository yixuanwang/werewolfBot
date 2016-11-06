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

function gameRoom(id) {
    this.id = id;
    this.players = [];
}
var takenID = [];
var gameRoomArray = [];

function player (id){
    this.id = id;
    this.name = "player";
    this.alive = true;
    this.role = "villager";
    this.room;
    this.admin = false;

}

var globalPlayer = []


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
                // This is a test
                sendTextMessage(sender, "Number of Active Games: " + gameRoomArray.length);
                continue;
            }

            //end game function **put with other if statements**

            if (text == "end game")
            {
                endGame();
                break;
            }

            if (text == "image"){
                sendNightOptions(sender);
                continue;
            }



            if (text == "checkarray"){
                var roomIDTaken = require('./data').roomIDTaken;
                console.info(roomIDTaken);
            }


            if (text.substring(0,5) == "join "){
                joinGameRoom(sender, text);
                continue;
            }

            if (text.substring(0,6) == "start "){
                startgame(sender, text.substring(6,9));
                continue;
            }

            sendTextMessage(sender, "Hi, welcome to the Werewolf Game! " + text.substring(0, 200))            
        }
        if (event.postback) {
                
                let text = JSON.stringify(event.postback)                     
                sendTextMessage(sender,text.substring(12, text.length -2 ));
                continue;
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

function endGame() 
{
    sendTextMessage(sender,"Sorry! The admin has ended the game prematurely.");
    for (var i=0; i<gameRoomArray.length; i++)
    {
        if (i == event.sender.room)
        {
            for (var j=0; j < gameRoomArray[i].players.length; j++)
            {
                delete gameRoomArray[i].players[j];
            }
        }

        delete gameRoomArray[i];
    }

}
function checkID(room){
    var i;
    for(i=0; i<takenID.length; i++){
        if (room == takenID[i]){
            room ="a" + (Math.floor(Math.random()*90000) + 10000);
            checkID(room);
        }
    }
    return room;
}



function createGameRoom (sender){
    sendTextMessage(sender, "creating");
    let finalid = gameRoomArray.length;
    let test = new gameRoom(finalid);
    test.players.push(sender);
    gameRoomArray.push(test);

    let tempPlayer = new player(sender);
    tempPlayer.room = finalid;
    tempPlayer.name = "player" + finalid;
    
    let startMessage = { text: "You have created a game, your room ID is: "+ finalid };
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

function sendNightOptions(sender) {
    let messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "Night Time",
                    "subtitle": "What action do you want to do?",
                    
                    "buttons": [{
                        "type": "postback",
                        "payload": "You killed someone this turn",
                        "title": "Kill someone",
                        
                    }, {
                        "type": "postback",
                        "payload": "You did nothing this turn",
                        "title": "Do nothing",
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

function joinGameRoom(sender,text){
    //var roomIDTaken = require('data');
    if (gameRoomArray[text.substring(5,8)]){
        var alreadyJoined=0;
        for (var j=0;j<gameRoomArray[text.substring(5,8)].players.length;j++){
            if (gameRoomArray[text.substring(5,8)].players[j] == sender){
                alreadyJoined++;
            }
        }
        if(alreadyJoined == 0){
            gameRoomArray[text.substring(5,8)].players.push(sender);
        }
        sendTextMessage(sender, "Number of players: " + gameRoomArray[text.substring(5,8)].players.length);
        var joinMessage ="you have successfully joined the room: "+ text.substring(5,8);
        sendTextMessage(sender, joinMessage);
    } else{
        var joinMessage = "room ID invalid";
        sendTextMessage(sender, joinMessage);
    }

}


// Everything from turn 

Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
}

function randomsort(a, b) {
    return Math.random()>.5 ? -1 : 1;
}

var arr = [1, 2, 3, 4, 5];
arr.sort(randomsort);


function playerRearrange(roomid) {
    var i;
    console.log(gameRoomArray);
    for(i = 0; i < gameRoomArray[roomid].players.length; i++) {
        let tempPlayer = new player(gameRoomArray[roomid].players[i]);
        globalPlayer.push(tempPlayer);
    }
}



// if admin == sender, then the game starts
function startgame(sender, roomid){
    //playerRearrange(roomid);
    var i;
    if (gameRoomArray[roomid]){
        for (i=0; i < gameRoomArray[roomid].players.length; i++) {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> f3fcd06a9cf5ae4fecbf61cf7b47e20304aef718
            sendTextMessage(sender, "You are in the loop");

            if (sender == gameRoomArray[roomid].players[0]){
                //turn(gameRoomArray[roomid].players, turn1text);
                sendTextMessage(sender, "The game started for room "+ roomid);


            } else {
<<<<<<< HEAD
=======
=======
>>>>>>> f3fcd06a9cf5ae4fecbf61cf7b47e20304aef718
            if (sender == gameRoomArray[roomid].players[0]){
                //turn(gameRoomArray[roomid].players, turn1text);
                sendTextMessage(sender, "The game started for room "+ roomid);
                var j;
                for(j=0; j<globalPlayer.length; j++){
                    sendTextMessage(sender, globalPlayer[j].id);
                }
                break;

            } else if (i==gameRoomArray[roomid].players.length-1){
<<<<<<< HEAD
=======
>>>>>>> dfff7bc56ef60161b2e15b717bdf6dcef5e6e987
>>>>>>> f3fcd06a9cf5ae4fecbf61cf7b47e20304aef718
                sendTextMessage(sender, "You are not the admin of the room "+ roomid);
            }
        }
    } else {
<<<<<<< HEAD
        sendTextMessage(sender, "No Active GameRoom")
=======
<<<<<<< HEAD
        sendTextMessage(sender, "room is undefined again")
=======
        sendTextMessage(sender, "No Active GameRoom")
>>>>>>> dfff7bc56ef60161b2e15b717bdf6dcef5e6e987
>>>>>>> f3fcd06a9cf5ae4fecbf61cf7b47e20304aef718
    }
}


function turn(players, turntext){
    for (i=0; i<players.length;i++){
        sendTextMessage(players[i], "Welcome");
        };
        generateRole(roles);
 }
function generateRole(myArray){
    var randarray = myArray;
    for (i=0; i<players.length;i++){
        var rand = randarray.randomElement();
        
    };
}

