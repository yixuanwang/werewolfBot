
//end game function **put with other if statements**

if (text == "end game")
{
	sendTextMessage(sender,"Sorry! The admin has ended the game prematurely.");
	for (i=0; i<gameRoomArray.length; i++)
	{
		if (i == event.sender.room)
		{
			for (j=0; j < gameRoomArray[i].players.length; j++)
			{
				delete gameRoomArray[i].players[j];
			}
		}

		delete gameRoomArray[i];
	}

}

//displays buttons with player names for day time lynch
function playerButtons(roomArray)
{
	let messageData = {
		"attachment": {
			"type": "template",
			"payload": {
				"template_type": "generic",
				"elements": [{
					"title": "Day Time",
					"subtitle": "Who do you want to choose to lynch?",

					"buttons": [{
						"type": "postback",
						"payload": "You lynched no one this day",
						"title": "No One",

					}, {
						for (var i=0; i<roomArray.length; i++)
						{
							if (i == event.sender.room)
							{
								for (var j=0; j < roomArray[i].players.length; j++)
								{
									"type": "postback",
                        			"payload": "Your vote has been set",
                        			"title": gameRoomArray[i].players[j],
								}
							}
                    	}                        
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
    	}, 
    	function(error, response, body) 
    	{
        if (error) 
        {
            console.log('Error sending messages: ', error)
        } 
        else if (response.body.error) 
        {
            console.log('Error: ', response.body.error)
        }
    })
}
