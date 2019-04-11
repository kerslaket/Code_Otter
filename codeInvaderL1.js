//waits till all the page content is loaded

window.onload=function(){
    //INITIALISE FIREBASE
    var config = {
        apiKey: "AIzaSyCYiO4wctdypgl5_ViUN4WNQwInrasMDIM",
        authDomain: "code-otter.firebaseapp.com",
        databaseURL: "https://code-otter.firebaseio.com",
        projectId: "code-otter",
        storageBucket: "code-otter.appspot.com",
        messagingSenderId: "993202102328"
    };

    //initialise based on earlier config
    firebase.initializeApp(config);

    //add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser);
        } else{
            console.log('not logged in')
        }
    });

    var count = 0; //used to count the amount of seconds the rounds lasted
    canv=document.getElementById("gc");//gets canvas
    ctx=canv.getContext("2d");//adds 2d canvas context
    setup();//sets up the ship object and alien array
    setInterval(game, 1000/60);//runs function game every 60 seconds, 60FPS
    document.addEventListener("keydown",keyPush); //Listens for keypresses
}

//sets initial variables
var count = 0;
var shots = [];
var aliens = [];
var alienTexts = ["int","num","string","char","word","input"];//sets text 
var alienCor = [true,false,true,true,false,false];//sets bools
var points = 0;
var won = false;
var newhighscore = false;
var scoresUpdated = false;
moveRight = true;

function setup(){//initialises ships and alien array
    ship = new ship();
    for (var i = 0;i < 6;i++){
        aliens[i] = new alien(60 + (120*i),120,alienTexts[i],alienCor[i]);
    }
    
}

function game(){
    background();//fill black background
    count += (1/60);//adds 1 60th a second for playtime counter
    if (won == false){
        won = true;
        for (var i = 0;i < aliens.length;i++){
            if(aliens[i].correct == true){//if aliens that are correct still on scrren player has not won
                won = false;
            }
        }

        ship.show();//show ship
        for (var i = 0;i < aliens.length;i++){//moves aliens left and right
            aliens[i].show();
            if (moveRight){
                aliens[i].moveRight();
                if (aliens[aliens.length - 1].x > 750){
                    moveRight = false;
                }
            }
            if (moveRight == false){
                aliens[i].moveLeft();
                if (aliens[0].x < 50){
                    moveRight = true;
                }
            }  
        }
        //adds shot to shot array
        for (var i = 0;i < shots.length - 1;i++) {
            shots[i].show();
            shots[i].move();
            if (shots[i].y < 0){
                shots.splice(i,1);
            }
            //adds/removes points and remove aliens when in contact with a shot
            for (var j=0;j < aliens.length ;j++){
                if (shots[i].hits(aliens[j]) && aliens[j].correct == true){
                    aliens.splice(j,1);
                    points = points + 10;
                }
                if (shots[i].hits(aliens[j]) && aliens[j].correct == false){
                    points = points - 15;
                }
            } 
        }
    }
    else{
        if (scoresUpdated == false){
            points += Math.round(90-count);//gets total play time
            updateScores();//updates score
        }
        gameover();//endgame screen
    }
}

function background(){//background
    //background
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canv.width,canv.height)

    ctx.fillStyle="red";
    ctx.font = "25px Arial";
    ctx.fillText("Points " + points, 650 , 50);

    ctx.fillStyle="green";
    ctx.font = "25px Arial";
    ctx.fillText("Level 1 -Shoot All The Data Types", 100 , 50);
}

function gameover(){//end game screen
    
    ctx.fillStyle="red";
    ctx.font = "40px Arial";
    ctx.fillText("Highscores", 300 , 100);

    //displays high scores using firebase data

    firebase.database().ref('Highscores/Highscore 1/Username').on('value', function(snapshot){
        ctx.fillText(snapshot.val(), 200 , 200);
    });
    firebase.database().ref('Highscores/Highscore 1/Score').on('value', function(snapshot){
        ctx.fillText(snapshot.val(), 500 , 200);
    });
    
    firebase.database().ref('Highscores/Highscore 2/Username').on('value', function(snapshot){
        ctx.fillText(snapshot.val(), 200 , 250);
    });
    firebase.database().ref('Highscores/Highscore 2/Score').on('value', function(snapshot){
        ctx.fillText(snapshot.val(), 500 , 250);
    });

    firebase.database().ref('Highscores/Highscore 3/Username').on('value', function(snapshot){
        ctx.fillText(snapshot.val(), 200 , 300);
    });
    firebase.database().ref('Highscores/Highscore 3/Score').on('value', function(snapshot){
        ctx.fillText(snapshot.val(), 500 , 300);
    });

    firebase.database().ref('Highscores/Highscore 4/Username').on('value', function(snapshot){
        ctx.fillText(snapshot.val(), 200 , 350);
    });
    firebase.database().ref('Highscores/Highscore 4/Score').on('value', function(snapshot){
        ctx.fillText(snapshot.val(), 500 , 350);
    });

    firebase.database().ref('Highscores/Highscore 5/Username').on('value', function(snapshot){
        ctx.fillText(snapshot.val(), 200 , 400);
    });
    firebase.database().ref('Highscores/Highscore 5/Score').on('value', function(snapshot){
        ctx.fillText(snapshot.val(), 500 , 400);
    });
}

// updates scores
function updateScores(){//updates scores if new score is higher
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {

            firebase.database().ref('Users/' + firebaseUser.uid + '/username').on('value', function(snapshot){
                var usernamevar = snapshot.val();
                console.log(usernamevar);
            
    
                firebase.database().ref('Highscores/Highscore 1/Score').on('value', function(snapshot){
                    if (points > snapshot.val() && newhighscore == false){
                        firebase.database().ref('Highscores/Highscore 1').set({
                            Username: usernamevar,
                            Score: points,
                        })
                    newhighscore = true;
                    console.log(usernamevar);
                }
                });

                firebase.database().ref('Highscores/Highscore 2/Score').on('value', function(snapshot){
                    if (points > snapshot.val() && newhighscore == false){
                        firebase.database().ref('Highscores/Highscore 2').set({
                            Username: usernamevar,
                            Score: points,
                        })
                    newhighscore = true;
                }
                });

                firebase.database().ref('Highscores/Highscore 3/Score').on('value', function(snapshot){
                    if (points > snapshot.val() && newhighscore == false){
                        firebase.database().ref('Highscores/Highscore 3').set({
                            Username: usernamevar,
                            Score: points,
                        })
                    newhighscore = true;
                }
                });

                firebase.database().ref('Highscores/Highscore 4/Score').on('value', function(snapshot){
                    if (points > snapshot.val() && newhighscore == false){
                        firebase.database().ref('Highscores/Highscore 4').set({
                            Username: usernamevar,
                            Score: points,
                        })
                    newhighscore = true;
                }
                });

                firebase.database().ref('Highscores/Highscore 5/Score').on('value', function(snapshot){
                    if (points > snapshot.val() && newhighscore == false){
                        firebase.database().ref('Highscores/Highscore 5').set({
                            Username: usernamevar,
                            Score: points,
                        })
                    newhighscore = true;
                }
                });

        });
    }})
    scoresUpdated = true;
}

//Objects ////////////////////////////////////////////////////////////////////////////////////////////////////////// 

function alien(x,y,text,correct){
    this.x=x;
    this.y=y;
    this.text=text;
    this.correct=correct;

    this.show = function(){
        ctx.fillStyle="green";
        ctx.fillRect(this.x,this.y+30,5,5);
        ctx.fillRect(this.x,this.y+25,5,5);
        ctx.fillRect(this.x,this.y+20,5,5);
        ctx.fillRect(this.x+5,this.y+20,5,5);
        ctx.fillRect(this.x+5,this.y+15,5,5);
        ctx.fillRect(this.x+10,this.y+20,5,5);
        ctx.fillRect(this.x+10,this.y+15,5,5);
        ctx.fillRect(this.x+10,this.y+25,5,5);
        ctx.fillRect(this.x+10,this.y+30,5,5);
        ctx.fillRect(this.x+10,this.y+10,5,5);
        ctx.fillRect(this.x+15,this.y+10,5,5);
        ctx.fillRect(this.x+20,this.y+10,5,5);
        ctx.fillRect(this.x+25,this.y+10,5,5);
        ctx.fillRect(this.x+30,this.y+10,5,5);
        ctx.fillRect(this.x+35,this.y+10,5,5);
        ctx.fillRect(this.x+40,this.y+10,5,5);
        ctx.fillRect(this.x+20,this.y+15,5,5);  
        ctx.fillRect(this.x+25,this.y+15,5,5);
        ctx.fillRect(this.x+30,this.y+15,5,5);
        ctx.fillRect(this.x+40,this.y+15,5,5);
        ctx.fillRect(this.x+45,this.y+15,5,5);
        ctx.fillRect(this.x+15,this.y+20,5,5);
        ctx.fillRect(this.x+20,this.y+20,5,5);
        ctx.fillRect(this.x+25,this.y+20,5,5);
        ctx.fillRect(this.x+30,this.y+20,5,5);
        ctx.fillRect(this.x+35,this.y+20,5,5);
        ctx.fillRect(this.x+40,this.y+20,5,5);
        ctx.fillRect(this.x+45,this.y+20,5,5);
        ctx.fillRect(this.x+50,this.y+20,5,5);
        ctx.fillRect(this.x+20,this.y+25,5,5);
        ctx.fillRect(this.x+25,this.y+25,5,5);
        ctx.fillRect(this.x+30,this.y+25,5,5);
        ctx.fillRect(this.x+35,this.y+25,5,5);
        ctx.fillRect(this.x+40,this.y+25,5,5);
        ctx.fillRect(this.x+50,this.y+25,5,5);
        ctx.fillRect(this.x+15,this.y+25,5,5);
        ctx.fillRect(this.x+50,this.y+25,5,5);
        ctx.fillRect(this.x+40,this.y+30,5,5);
        ctx.fillRect(this.x+40,this.y+25,5,5);
        ctx.fillRect(this.x+50,this.y+30,5,5);
        ctx.fillRect(this.x+15,this.y+35,5,5);
        ctx.fillRect(this.x+20,this.y+35,5,5);
        ctx.fillRect(this.x+35,this.y+35,5,5);
        ctx.fillRect(this.x+30,this.y+35,5,5);
        ctx.fillRect(this.x+10,this.y,5,5);
        ctx.fillRect(this.x+15,this.y+5,5,5);
        ctx.fillRect(this.x+40,this.y,5,5);
        ctx.fillRect(this.x+35,this.y+5,5,5);
        
        ctx.font = "15px Arial";
        ctx.fillText(this.text, this.x , this.y + 50);
    }

    this.moveLeft = function(){
        this.x= this.x - 1;
    }
    this.moveRight = function(){
        this.x= this.x + 1;
    }
}
function shot(shipx,shipy){

    this.x = shipx;
    this.y = shipy-50;

    this.show = function(){
        ctx.fillStyle="blue";
        ctx.fillRect(this.x,this.y,10,20);

    } 

    this.move = function(){
        this.y = this.y - 10;
    }

    this.hits = function(alien){
        if ((this.x - alien.x > 0) && (this.x - alien.x < 40) && (this.y - alien.y > 0) && (this.y - alien.y < 40) ){
            return true;
        }
    }
}

function ship(){

    this.x = 400;
    this.y = 450;

    this.moveLeft = function(){
        this.x = this.x - 10;
        if (this.x < 0){
            this.x = canv.width - 1;
        }
    }

    this.moveRight = function(){
        this.x = this.x + 10;
        if (this.x >= canv.width){
            this.x = 1;
        }
    }

    this.show = function(){
        ctx.fillStyle="blue";
        ctx.fillRect(this.x,this.y,60,20);
        ctx.fillStyle="blue";
        ctx.fillRect(this.x+20,this.y-20,20,20);
    }
}

// Keys Events //////////////////////////////////////////////////////////////////////////////////////

function keyPush(evt){
    switch(evt.keyCode){
        case 37:
            //left arrow
            ship.moveLeft();
            break;
        case 39:
            //right arrow
            ship.moveRight();
            break;
        case 32:
            //space bar
            var newshot = new shot(ship.x,ship.y);
            shots.push(newshot);
            break;
    }
}