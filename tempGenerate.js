function generateRole(roomid){
    
    if(gameRoomArray[roomid]) {
        var tempPlayerArray = gameRoomArray[roomid].players;
        var playerCount = tempPlayerArray.length;
        var wolfCount = Math.floor(playerCount / 3);
        //test
        console.log(wolfCount);
        var i;
        var j;
        var tempRandNum = [];
        for(i = 0; i < wolfCount; i++) {
            var rand = Math.floor((Math.random() * playerCount) );
            if(tempRandNum.indexOf(rand) > -1) continue;
            tempRandNum.push(rand);
        }
        for(i = 0; i < wolfCount; i++) {
            var wolfUserID = tempPlayerArray[tempRandNum[i]];
            for(j = 0; j < globalPlayer.length; j++) {
                if(globalPlayer[j].id == wolfUserID) {
                    globalPlayer[j].role = "wolf";
                    break;
                }
            }
        }
        tempRandNum = [];

        //gameRoomArray[roomid].players = tempPlayerArray;
    }
    else {
        console.log('Error in generateRole');
    }
    //var randarray = playersArray;
    //for (i=0; i<players.length;i++){
    //   var rand = randarray.randomElement();        
    //};
}