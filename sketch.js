//press space key for jump and press on reset button for reset the game

var PLAY = 1;
var END = 0;
var score;
var gameState = PLAY;

var bg, bgImg;
var rex;
var rexImg, rexDownImg, rexJumpImg;
var invisibleGround, invisibleGround2;

var cloud, cloudImg, cloudsGroup;
var eagle, eagleImg, eaglesGroup;

var obstacle1, obstacle2, obstacle3;
var obstacle1Img, obstacle2Img, obstacle3Img, obstaclesGroup;

var gameOver, gameOverImg;

var restart, restartImg;

var jumpSound, dieSound;

function preload(){

bgImg = loadImage("bg.webp");
rexImg = loadAnimation("rex1.png", "rex2.png", "rex3.png", "rex4.png");
rexDownImg = loadAnimation( "rexdown4.png");
rexJumpImg = loadAnimation("jump1.png", "jump2.png", "jump3.png", "jump4.png",);

obstacle1Img = loadImage("woodenBox.png");
obstacle2Img = loadImage("rock1.png");
obstacle3Img = loadImage("rock2.png");

cloudImg = loadAnimation("cloud1.png", "cloud2.png", "cloud3.png", "cloud4.png", "cloud5.png", "cloud6.png",);
eagleImg = loadAnimation("eagle1.png", "eagle2.png", "eagle3.png");

gameOverImg = loadImage("gameover.png");

restartImg = loadImage("restart.png");

jumpSound = loadSound("jump.mp3");

}

function setup() {
 bg = createSprite(400, 200, 0, 0);
 bg.addImage("background", bgImg);
 bg.scale = 0.8;
 bg.velocityX = -4;

 rex = createSprite(50, 325, 20, 20);
 rex.addAnimation("running", rexImg);
 rex.addAnimation("falling", rexDownImg);
 rex.addAnimation("jumping", rexJumpImg);
 rex.scale = 0.5;

 invisibleGround = createSprite(200, 340, 400, 60)
 invisibleGround.visible = false;

 invisibleGround2 = createSprite(200, 80, 400, 150)
 invisibleGround2.visible = false;

 gameOver = createSprite(200, 200, 0, 0);
 gameOver.addImage("gameover", gameOverImg);
 gameOver.scale = 0.6;

 restart = createSprite(200, 350, 0, 0);
 restart.addImage("restart", restartImg);
 restart.scale = 0.1;

 obstaclesGroup = createGroup();
 cloudsGroup = createGroup();
 eaglesGroup = createGroup();

 score = 0;

 rex.depth = score.depth;
 rex.depth = rex.depth + 1;
}

function draw() {

background("black");
  
text("Score: "+ score, 360,50);

text("anshul", 200, 200)

if (mousePressedOver(restart)) {
    reset();
}

if (gameState === PLAY) {

    bg.velocityX = -(4 + 3* score/100);
    
    //scoring
    score = score + Math.round(getFrameRate()/60);

    gameOver.visible = false;
    restart.visible = false;

  if (bg.x < 0) {
      bg.x = width;
   }

  if (keyDown("space")) {
      rex.velocityY = -8;
      jumpSound.play();
   //   rex.changeAnimation("jumping", rexJumpImg);
  }

  rex.velocityY = rex.velocityY+0.8;
  rex.collide(invisibleGround);
  rex.collide(invisibleGround2);

  if (obstaclesGroup.isTouching(rex)) {
      gameState = END;
  }

  if (eaglesGroup.isTouching(rex)) {
    gameState = END;
    dieSound.play();
  }

  rex.setCollider("circle",0,0,50);
  rex.debug = false;

  spawnObstacles();
  spawnClouds();
  spawnEagles();

}
else if (gameState === END) {

    gameOver.visible = true;
    restart.visible = true;
    bg.velocityX = 0;
    rex.velocityY = 0;
    obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();
    eaglesGroup.destroyEach();
    score = 0;

    rex.changeAnimation("falling", rexDownImg);

    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);

    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
  
}

drawSprites()
}

function spawnObstacles(){
    if (frameCount % 60 === 0){
      var obstacle = createSprite(400,325,10,40);
      obstacle.velocityX = -10;
      obstacle.velocityX = -(4 + 3* score/100);
      obstacle.setCollider("circle",0,0,150);
      obstacle.debug = false;

      
       //generate random obstacles
       var rand = Math.round(random(1,3));
       switch(rand) {
         case 1: obstacle.addImage(obstacle1Img)
                 break;
         case 2: obstacle.addImage(obstacle2Img);
                 break;
         case 3: obstacle.addImage(obstacle3Img);
                 break;
         default: break;
       }
      
       //assign scale and lifetime to the obstacle           
       obstacle.scale = 0.2;
       obstacle.lifetime = 300;
      
      //add each obstacle to the group
       obstaclesGroup.add(obstacle);
    }
   }

   function spawnClouds() {
    //write code here to spawn the clouds
    if (frameCount % 40 === 0) {
      var cloud = createSprite(400,100,40,10);
      cloud.y = Math.round(random(50,100));
      cloud.addAnimation("cloud", cloudImg);
      cloud.scale = 0.3;
      cloud.velocityX = -3;
      cloud.velocityX = -(4 + 3* score/100);
      
       //assign lifetime to the variable
      cloud.lifetime = 200;
      
      //adjust the depth
      cloud.depth = rex.depth;
      rex.depth = rex.depth + 1;
      
      //add each cloud to the group
      cloudsGroup.add(cloud);
    }
  }

  function spawnEagles() {
    //write code here to spawn the clouds
    if (frameCount % 40 === 0) {
      var eagle = createSprite(450,160,40,10);
      eagle.y = Math.round(random(80,160));
      eagle.addAnimation("flying", eagleImg);
      eagle.scale = 0.5;
      eagle.velocityX = -3;
      eagle.velocityX = -(4 + 3* score/100);
      eagle.setCollider("circle",0,0,70);
      eagle.debug = false;
      
       //assign lifetime to the variable
      eagle.lifetime = 200;
      
      //adjust the depth
      eagle.depth = rex.depth;
      rex.depth = rex.depth + 1;
      
      //add each eagle to the group
      eaglesGroup.add(eagle);
    }
  }

  function reset() {
      gameState = PLAY;
      score = 0;
      gameOver.visible = false;
      restart.visible = false;
      rex.changeAnimation("running", rexImg);
      
  }
   