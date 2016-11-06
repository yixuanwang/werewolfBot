
// Help Handler
var helpInstruction = "This is help Instruction, nothing new"
function helpInfo(sender) {
	sendTextMessage(sender, helpInstruction);
}

// Flee Handler
function flee(sender) {
	let i;
	for(i = 0; i < globalPlayer.length; i++) {
		if(sender == globalPlayer[i].id)  {
			globalPlayer[i].alive = false;
			sendTextMessage(sender, "You have successfully fled from the game");
		}
	}
}

// Call everyone in the room
/******** I AM NOT SURE IF THIS WOULD WORK!!!!!  ********/
function callEveryone(roomid, text) {
    let messageData = { text:text }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
        	// I AM NOT SURE WITH THIS RECIPIENT ID
            recipient: {id: gameRoomArray[roomid].players},
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



function command(sender, text) {
	// command "creategame"
	if(text == "creategame")
		createGameRoom(sender);
	// command "join #roomID"
	else if(text.substring(0,5) == "join ")
		joinGameRoom(sender, text);
	// command "start #roomID"
	else if(text.substring(0,6) == "start ")
		startgame(sender, text.substring(6,9));
	// command "help"
	else if(text == "help")
		helpInfo(sender);
	// command "flee #roomID"
	else if(text.substring(0,5) == "flee ")
		flee(sender);
}