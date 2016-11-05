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
		
	}
}

function turn(players, turntext){
 			for (i=0; i<players.length;i++){
			
		};
		generateRole(roles);
 }
function generateRole(myArray){
	var randarray = myArray;
	for (i=0; i<players.length;i++){
		var rand = randarray.randomElement();
		
	};
}