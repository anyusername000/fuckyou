const mineflayer = require('mineflayer')
const cmd = require('mineflayer-cmd').plugin
const fs = require('fs');
let rawdata = fs.readFileSync('config.json');
let data = JSON.parse(rawdata);
var lasttime = -1;
var moving = 0;
var first = false;
var connected = 0;
var actions = [ 'forward', 'back', 'left', 'right']
var lastaction;
var pi = 3.14159;
var moveinterval = 2; // 2 second movement interval
var maxrandom = 5; // 0-5 seconds added to movement interval (randomly)
var host = data["ip"];
var username = data["name"]
var nightskip = data["auto-night-skip"]
var bot = mineflayer.createBot({
  host: host,
  port:data["port"],
  username: username
});
function getRandomArbitrary(min, max) {
       return Math.random() * (max - min) + min;

}

bot.loadPlugin(cmd)



bot.on('login',function(){
	console.log("Trying to login")
	if(data["login-enabled"] == "true"){
		bot.chat(data["register-cmd"])
		bot.chat(data["login-cmd"])
	}
	for (let i=0; i<10; i++) { 
	   task(i); 
	} 
	console.log("Logged In")
	bot.chat("hello");
});
  
bot.on('spawn',function() {
    connected=1;
    bot.setControlState("forward", true);
});

bot.on('death',function() {
    bot.emit("respawn")
});

