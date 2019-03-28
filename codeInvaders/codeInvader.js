window.onload=function(){
    canv=document.getElementById("gc");
    ctx=canv.getContext("2d");
    setup();
    setInterval(game, 1000/60);
    document.addEventListener("keydown",keyPush);  
}

var shots = [];
var aliens = [];
var alienTexts = ["int","num","string","char","word","input"];
var alienCor = [true,false,true,true,false,false];
var points = 0;
var won = false;
moveRight = true;

function setup(){
    ship = new ship();
    for (var i = 0;i < 6;i++){
        aliens[i] = new alien(60 + (120*i),120,alienTexts[i],alienCor[i]);
    }
    
}

function game(){
    background();
    console.log("gayy");
    if (won == false){
        won = true;
        for (var i = 0;i < aliens.length;i++){
            if(aliens[i].correct == true){
                won = false;
            }
        }

        ship.show();
        for (var i = 0;i < aliens.length;i++){
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
        for (var i = 0;i < shots.length - 1;i++) {
            shots[i].show();
            shots[i].move();
            if (shots[i].y < 0){
                shots.splice(i,1);
            }
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
        gameover();
    }
}

function background(){
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

function gameover(){
    ctx.fillStyle="red";
    ctx.font = "100px Arial";
    ctx.fillText("GAME", 250 , 200);

    ctx.fillStyle="red";
    ctx.font = "100px Arial";
    ctx.fillText("OVER", 250 , 350);
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