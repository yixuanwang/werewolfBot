import './data.js'

Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
}

function randomsort(a, b) {
    return Math.random()>.5 ? -1 : 1;
}

var arr = [1, 2, 3, 4, 5];
arr.sort(randomsort);

// if admin == sender, then the game starts
function startgame(sender, admin){
	if (sender == admin){
		turn(GameRoom.players, turn1text)
	} else {
		let messageData = { text:"You are not the admin of the room." }
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
}

function turn(players, turntext){
 			for (i=0; i<players.length;i++){
			let messageData = { text:turntext}
		    request({
		        url: 'https://graph.facebook.com/v2.6/me/messages',
		        qs: {access_token:token},
		        method: 'POST',
		        json: {
		            recipient: {id:players[i]},
		            message: messageData,
		        }
		    }, function(error, response, body) {
		        if (error) {
		            console.log('Error sending messages: ', error)
		        } else if (response.body.error) {
		            console.log('Error: ', response.body.error)
		        }
		    })
		};
		generateRole(roles);
 }
function generateRole(myArray){
	var randarray = myArray;
	for (i=0; i<players.length;i++){
		var rand = randarray.randomElement();
		let messageData = { text:turntext}
	    request({
	        url: 'https://graph.facebook.com/v2.6/me/messages',
	        qs: {access_token:token},
	        method: 'POST',
	        json: {
	            recipient: {id:players[i]},
	            message: messageData,
	        }
	    }, function(error, response, body) {
	        if (error) {
	            console.log('Error sending messages: ', error)
	        } else if (response.body.error) {
	            console.log('Error: ', response.body.error)
	        }
	    })
	};
}