//declaring variables
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage,highestScore;

//declaring constant variable

//using boolean values (0-false and 1-true)
var PLAY = 1;
var END = 0;
var gameState = PLAY;

//creating gameover and restart variable
var gameOver,gameRestart;
var over,restart;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

//loading animation and image
function preload(){
  
  //loading images
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  over = loadImage("gameOver.png");
  restart = loadImage("restart.png");    
}

function setup() {
  createCanvas(600, 200);
  
  // creating player sprite
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  //craeting ground 
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  //creating invisible ground to support the visible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //creating groups
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  
  //creating gameover and restart object
  gameOver = createSprite(300,100,10,10);
  gameOver = addImage("over",over);
  gameOver.visible = false;
  gameOver.scale = 0.5;
  
  gameRestart = createSprite(300,140,10,10);
  gameRestart = addImage("restart",restart);
  gameRestart.visible = false;
  gameRestart.scale = 0.5;
  
}

function draw() {
  background(180);
  
  //scoring
  text("Score: "+ score, 500,50);
  
  //using if condition to check if gamestate is play
  if(gameState === PLAY){
     score = score + Math.round(getFrameRate()/60);
    //making the trex jump by pressing space key
  if(keyDown("space")) {
    trex.velocityY = -10;
  }
  //gravity concept
  trex.velocityY = trex.velocityY + 0.8
    
   //resetting the ground
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
    
   
  //colliding trex with invisible ground
  trex.collide(invisibleGround);
    
  //function declaration
  spawnClouds();
  spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
      gameState = END;
  }
}
else if(gameState === END){
   gameOver.visible = true;
   gameRestart.visible = true;
   
   //setting the velocity of each object to 0
   ground.velocityx = 0;
   trex.velocityY = 0;
   obstacleGroup.setVelocityXEach(0);
   cloudGroup.setVelocityXEach(0);
   trex.changeAnimation("trex_collided",trex_collided);
   obstacleGroup.setLifeTime(-1);
   cloudGroup.setLifeTime(-1);
   if(mousePressedOver(gameRestart)){
     reset();
   }
 }
  
  
  drawSprite();
}

//defing the body of reset function
function reset() {
  gameState = PLAY;
  gameOver.visible = false;
  gameRestart.visible = false;
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  trex.changeAnimation("trex_running",trex_running);
  score = 0;
  
  if(highestScore<score){
    highestScore = score;
    console.log(highestScore);
  }
}

//defining the body of function of clouds
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

//defining the body of function of obstacles
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -4;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
