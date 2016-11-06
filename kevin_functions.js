
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