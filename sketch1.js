var PLAY = 1;
var END = 0;
var gameState = PLAY;

var player,player_collidedImage,playerImage;
var space,spaceImage;

var b1group,b2group,rgroup,ggroup;
var laser,lasergroup;

var score=0;

var gameOver, restart;

var eb,eb2,eg,er;


function preload(){
  playerImage = loadAnimation("playerShip2_blue_1.png");
  player_collidedImage = loadAnimation("blast.png");
  
  spaceImage = loadImage("space_1.png");
  
  enemyblackImg=loadImage("enemyBlack2_1.png")
  enemyblueImg=loadImage("enemyBlue2_1.png")
  enemygreenImg=loadImage("enemyGreen2_1.png")
  enemyredImg=loadImage("enemyRed2_1.png")
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(1600, 1200);
  
  player = createSprite(200,360,60,10);
  player.scale =0.5;
  player.setCollider("rectangle",0,0,100,100);
  player.debug = true;
  
  player.addAnimation("running", playerImage);
  player.addAnimation("collided", player_collidedImage);
  player.scale = 0.5;
  
  space =createSprite(200,200);
  space.addImage(spaceImage);
   space.scale =1.7;

  space.velocityY =3;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  
   lasergroup = createGroup();
   b1group = createGroup();
   b2group = createGroup();
   ggroup = createGroup();
  rgroup = createGroup();

  score = 0;
}

function draw() {
  
  background(255);
  player.x =World.mouseX;

  if(keyWentDown("space")){
    createLaser();
  }
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){

        if(keyWentDown("space")){
            createLaser();
            gamestate=PLAY; 
          }

        if(keyWentDown("space")){
          createLaser();
        } 

        if(b1group.isTouching(player) || b2group.isTouching(player)||ggroup.isTouching(player)|| rgroup.isTouching(player)){
              gameState = END;
        }
    }

  else if (gameState === END) {
        gameOver.visible = true;
        restart.visible = true;
        
        //set velcity of each game object to 0
        space.velocityY = 0;
        player.velocityX = 0;
       
        //change the trex animation
        player.changeAnimation("collided", player_collidedImage);
        
        //set lifetime of the game objects so that they are never destroyed
        b1group.setLifetimeEach(-1);
        b2group.setLifetimeEach(-1);
        ggroup.setLifetimeEach(-1);
        rgroup.setLifetimeEach(-1);
        lasergroup.setLifetimeEach(-1);
        
        b1group.setVelocityXEach(0);
        b2group.setVelocityXEach(0);
        ggroup.setVelocityXEach(0);
        rgroup.setVelocityXEach(0);
        
        if(mousePressedOver(restart)) {
          reset();
        }
      }
      
    if(space.y>400){
      space.y =space.height/2;
     }  
  
     var select_enemy = Math.round(random(1,4));

    if (World.frameCount % 100 ==0) { 
      if (select_enemy == 1) { 
        black();
      } 
      else if (select_enemy == 2) { 
        blue();
      } 
      else if (select_enemy == 3) { 
        green();
      } 
      else { 
        red();
      }
    } 

if (lasergroup.isTouching(b1group)){
  b1group.destroyEach();
  lasergroup.destroyEach();
  score =score+1;
  
  } 

if (lasergroup.isTouching(b2group)) {
  b2group.destroyEach();
  lasergroup.destroyEach();
  score =score+2;
  
  } 
  
if (lasergroup.isTouching(ggroup)) { 
  ggroup.destroyEach(); 
  lasergroup.destroyEach();
  score =score+3;
  
  } 
  
if (lasergroup.isTouching(rgroup)) { 
  rgroup.destroyEach(); 
  lasergroup.destroyEach();
  score =score+4;
  } 
   
  drawSprites();
}

function createLaser(){
    var laser =createSprite(200,320,100,10);  
    laser.addImage();  
    laser.velocityY =-3;
    laser.lifetime =200;
    laser.x =player.x;
    
    lasergroup.add(laser);
}
    
function black() {
    eb = createSprite(Math.round(random(20, 370)),0,10, 10);
    eb.addImage(enemyblackImg); 
    eb.velocityY = 7; 
    eb.lifetime = 150;
    eb.scale = 0.4; 
    
    b1group.add(eb);
}
  
  function blue() {
    ebl = createSprite(Math.round(random(20, 370)),0,10, 10);
    ebl.addImage(enemyblueImg); 
    ebl.velocityY = 7; 
    ebl.lifetime = 150;
    ebl.scale = 0.4; 
    
    b2group.add(ebl);
    
    }
    
    function green() {
     eg = createSprite(Math.round(random(20, 370)),0,10, 10);
    eg.addImage(enemygreenImg); 
    eg.velocityY =7 ; 
    eg.lifetime = 150;
    eg.scale = 0.4;
    
    ggroup.add(eg);
    
    }
    
    function red() {
    er = createSprite(Math.round(random(20, 370)),0,10, 10);
    er.addImage(enemyredImg); 
    er.velocityY =7 ; 
    er.lifetime = 150;
    er.scale = 0.4; 
    
    rgroup.add(er);
   
    }
