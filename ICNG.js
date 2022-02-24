// infinite campus notification grabber

// functions and variables

var creds = [];
var counts = 0;
var i = 0;
const readline = require('readline');
const fs = require('fs');
const IC = require('infinite-campus');

const readInterface = readline.createInterface({
  input: fs.createReadStream('credentials.txt'),
  console: false
});

function getStuff() {
  readInterface.on('line', function(line) {
    creds.push(line);
  });
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function doThings() { 
  var user = new IC(creds[0], creds[1], creds[2], creds[3]);
  user.on('ready', () => {
    // now that we are logged in, get the notification count
    console.log("Logged in!");
    sleep(1000);
    user.getNotificationCount().then((count) => {
      counts = count;
      console.log("You have " + count + " notifications.");
    });
    sleep(1000);
    user.getNotifications(counts).then((notifs) => {
      while (true) {
        console.log("\n"+notifs[counts - 1].text);
        sleep(100);
        counts -= 1;
        i+=1;
        if (counts == 0) {
          break;
        }
      }
    });
  });
};;

// end of functions and variables

console.log("\n---------\nICNG V1.0\n---------\n\nLogging in... (make sure your credentials are in credentials.txt)\n");
getStuff();
setTimeout(doThings, 2000);