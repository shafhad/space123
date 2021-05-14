var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;


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
  createCanvas(600, 200);
  
  player = createSprite(200,360,60,10);
  player.scale =0.5;
  player.setCollider("rectangle",0,0,100,100);
  player.debug = true;
  
  player.addAnimation("running", playerImage);
  player.addAnimation("collided", player_collidedImage);
  player.scale = 0.5;
  
  var space =createSprite(200,200);
  space.addImage(spaceImage);
   space.scale =1.7;


  space.x = space.height /2;
  space.velocityY =3;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  
    var lasergroup = createGroup();
    var b1group = createGroup();
    var b2group = createGroup();
    var ggroup = createGroup();
    var rgroup = createGroup();

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
        gamestate=1;
        
      }
if(keyWentDown("space")){
  createLaser();
  playSound("sound://category_digital/laser_fade_2.mp3");
}
      if(player.isTouching(b1group) || player.isTouching(b2group)||player.isTouching(ggroup)|| player.isTouching(rgroup)){
    //change the trex animation
    
    gameState = END
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
  
     var select_enemy = Math.round(randomNumber(1,4));

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
    laser.setAnimation("laser");  
    laser.velocityY =-3;
    laser.lifetime =200;
    laser.x =player.x;
    
    lasergroup.add(laser);
    }
    
  function black() {
    var eb = createSprite(Math.round(randomNumber(20, 370)),0,10, 10);
    eb.setAnimation("enemyBlack2_1"); 
    eb.velocityY = 7; 
    eb.lifetime = 150;
    eb.scale = 0.4; 
    
    b1group.add(eb);
    }
  
  function blue() {
    var ebl = createSprite(Math.round(randomNumber(20, 370)),0,10, 10);
    ebl.setAnimation("enemyBlue2_1"); 
    ebl.velocityY = 7; 
    ebl.lifetime = 150;
    ebl.scale = 0.4; 
    
    b2group.add(ebl);
    b2group.setColliderEach("rectangle",0,0,100,100);
    }
    
    function green() {
    var eg = createSprite(Math.round(randomNumber(20, 370)),0,10, 10);
    eg.setAnimation("enemyGreen2_1"); 
    eg.velocityY =7 ; 
    eg.lifetime = 150;
    eg.scale = 0.4;
    
    ggroup.add(eg);
    ggroup.setColliderEach("rectangle",0,0,100,100);
    }
    
    function red() {
    var er = createSprite(Math.round(randomNumber(20, 370)),0,10, 10);
    er.setAnimation("enemyRed2_1"); 
    er.velocityY =7 ; 
    er.lifetime = 150;
    er.scale = 0.4; 
    
    rgroup.add(er);
    rgroup.setColliderEach("rectangle",0,0,100,100);
    }
  