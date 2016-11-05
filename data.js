var roomIDTaken = []
var players = [] //list of players ID
var roles = []  //roles
//export default data;
exports.roomIDTaken = roomIDTaken;
exports.push2roomIdTaken = function(val){exports.roomIDTaken.push(val);};
exports.players = players;
exports.push2players = function(val){exports.player.push(val);};
exports.roles = roles;
exports.push2roles = function(val){exports.roles.push(val);};

class GameRoom{

	constructor(){
		this.roomID = Math.floor(Math.random()*90000) + 10000;
		this.players = [];
		this.roles = [];
	}

	addPlayer(id){
		this.players.push(id);
	}

	getPlayer(id){
		var player = _.find(this.players, {id});
		// if user not found create a new user
    	if (!player) {
      		this.addPlayer(id);
      		return this.getPlayer(id);
    	}
    return player;
	}
}

export default GameRoom;
