//when the player first play the game
var welcomeText = "Welcome to the world of Werewolf! Use 'creategame' to create a gameroom, use 'join #roomID' to join a current game and use 'help' for help"; 

//when someont creates a game room
var gameroomCreateText = "You have successfully created the game room! The roomID is " + roomID;

//when someone joins a game room successfully
//must be something wrong with players.length
var gameroomJoinSuccessText = "You have successfully joined a game room! " + players.length + "players have joined the game!";

//when someone joins a game room successfully, other people will be notified
var gameReceiveCurrentJoinerText = player.id + " has joined the game. " + players.length + "players have joined the game!";

//when admin chooses to end the game, everyone will be notified
var endGameText = "Sorry! The game has ended prematurely!";

//when someone types in help
var helpText = "Each night, werewolves will kill one Villager. It is up to the Villagers in the morning to vote and hang who they think are the werewolves.";


//when someone fails to join a game because the game is already started
var gameroomJoinFailAlreadyStartText = "You can't join now! The game is already running";

//when someone fails to join a game because max player limit has been reached
var gameroomJoinFailPlayerLimitReachText = "You can't join now. The max player limit has been reached";

//when the admin starts the game successfully
var gameStartSuccessText = "Game is starting, please wait while I assign roles and update the database";

//when the admin starts the game but failed because of lack of players. We need at least 5 players to start a game
var gameStartFailText = "Not enough players, cancelling the game!";

//when someone flees the game
var gameFleeText = player.flee.id + " has fled in terror";

/***************** WOLF *****************/
//During the night, tell the wolves their role and their teammate, only once
var gameNightWolfIntroText = "You are a Werewolf! Each night you can choose to kill someone. If a tie occurs in the choosing, one of the selected will be randomly chosen" + "The other wolves are " + wolf.id;

//During the night, ask the wolf who he wants to eat, ask everynight
var gameNightAskWolfText = "Who do you want to eat"

//when in the night, if a werewolf vote to eat someon, the other werewolf will get the message
var gameNightWolfEatVoteText = voter.id + " has voted to eat " + victim.id

/***************** Villager *****************/
//when in the night, tell the villagers their role, only once
var gameNightVillagerIntroText = "You are just a noraml Villager. Your goal is to survive until the end of the game by lynching the Werewolves."

/***************** WITCH *****************/
//During the night, tell the witch her role, only once
var gameNightWitchIntroText = "You are a WITCH!!! You can save someone once and poision someone once. You will always know who's eaten before using the medicine, but then you won't know who dies. You can not save and poision people in one night. You can never save yourself";

//During the night, ask the witch who she wants to save. Check if she can save first and give her option: save, skip
var gameNightWitchAskSaveText = victim.id + " died." + "Do you want to save his life";

//During the night, ask the witch who she wants to poision. Check if she can poision first(she didn't use the poison and didn't save someone before in that night).
var gameNightWitchAskPoisionText = "Who do you want to poision (You can skip this step)";

//In the morning, say how many people died that night and who died
var morningText = "Unfortunately, last night we found 1 person dead last night. They were killed by a werewolf.";

/***************** SEER *****************/

/***************** GUNNER *****************/

/***************** GurdianAngel *****************/

/***************** CUPID *****************/


//when in the night, if someone makes a choice, give him the feedback
var gameChoiceAcceptedNoticeText = "Choice Accepted";





//when a night ends, display the victim, THERE CAN BE MORE THAN ONE VICTIMS
var gameVictimText = victim.id + " died in silence. RIP.";

//when a night ends, display the remining people
var gameRemainText = players.length + " players remain";

//During the day time, if someone votes to lynch, the others will get the message
var gameLynchVoteText = voter.id + "has voted to lynch" + target.id;

//Display the Lynch Result
var gameLynchResultText = "The villagers have cast their votes, amid doubts and suspicions. " + finaltarget.id + " has been voted to be executed. RIP.";

 