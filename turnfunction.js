import './data.js'

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
	for(i = 0; i < gameRoomArray[roomid].players.length; i++) {
		let tempPlayer = new player(gameRoomArray[roomid].players[i]);
		globalPlayer.push(tempPlayer);
	}
}



// if admin == sender, then the game starts
function startgame(sender, roomid){
	playerRearrange(roomid);
	var i;
	for (i=0; i < gameRoomArray[roomid].players.length; i++) {
		sendTextMessage(sender, "You are in the loop");

		if (sender == gameRoomArray[roomid].players[0]){
			turn(gameRoomArray[roomid].players, turn1text);
		} else {
			sendTextMessage(sender, "You are not the admin of the room "+ roomid);
		}
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