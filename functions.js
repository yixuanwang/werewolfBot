import data from './data.js'

/*
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
*/


function joinGameRoom(sender,text){
	//var roomIDTaken = require('data');
	let validRoom = false;
	for (let i = 0; i<gameRoomArray.length;i++){
		if(gameRoomArray[i].id == text.substring(5,11)){
			validRoom = true;
			gameRoomArray[i].player.push(sender);
		}
	}
	if (validRoom){
		let joinMessage = { text: "you have successfully joined the room: "+ text};
	}
	else{
		let joinMessage = { text: "room ID invalid"};
	}

}

function daytime (gameid){
	for(var i = 0; i<globalPlayer.length;i++){
		sendTextMessage(players.id, "It is now time to vote for who to lynch, the player who are still alive are: ");
		for (var j = 0; j<globalPlayer.length;j++){
			if(globalPlayer[j].alive){
				sendTextMessage(players.id, player.name);
			}
		}
	}
	var totalVotes=0;
	while(totalVotes<gameRoomArray[gameid].players.length){
		//collect votes
	}


	sendTextMessage("")
}

function nighttime (gameid){
	for(var i = 0; i<globalPlayer.length;i++){
		if(globalPlayer[i] == "werewolf"){
			sendTextMessage(globalPlayer[i].id, "It is nighttime, who do you want to kill?");
			//werewolf options
		}
		else{
			sendTextMessage(globalPlayer[i].id, "It is nighttime, have so rest");
		}
	}
}
