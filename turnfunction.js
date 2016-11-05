import
var players = []
var roles = []

Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
}

function turn(sender, admin, turntext, numberofplayers){
	if (sender == admin){
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
		generateRole();
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
	    }
	}
}

function generateRole(myArray){
	var rand = myArray.randomElement();
}