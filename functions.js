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
	var roomIDTaken = require("./data");
	let validRoom = false;
	for (i = 0; i<roomIDTaken.length;i++){
		if(roomIDTaken == text.substring(6,11)){
			validRoom = true;
		}
	}
	if (validRoom){
		let joinMessage = { text: "you have successfully joined the room"};
	}

}
