
var helpInstruction = "This is help Instruction, nothing new"
function helpInfo(sender) {
	sendTextMessage(sender, helpInstruction);
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
		flee()
}