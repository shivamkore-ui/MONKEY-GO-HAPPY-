var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkey_running, monkey_stop;
var banana, bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var bg, bgImage;
var score;
var invisibleGround;


function preload() {

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bg = loadImage("jungle game bg1.jpg");

}

function setup() {
  createCanvas(600, 400);

  monkey = createSprite(100, 320);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.17;

  invisibleGround = createSprite(200, 390, 400, 30);
  invisibleGround.visible = false;
  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
 
  
}


function draw() {
  background(bg)

  if(gameState === PLAY){
  invisibleGround.velocityX = -5;
  
   if (invisibleGround.x < 0){
      invisibleGround.x = invisibleGround.width/2;
    }
    
  if (keyDown("space")&& monkey.y >= 100) {
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.5;

  monkey.collide(invisibleGround);
 
  spawnBananas();
  spawnObstacles();
  }
  
  if(obstacleGroup.isTouching(monkey)){
    gameState = END;
    } 
  
  
   if(gameState === END){
     obstacleGroup.setLifetimeEach(-1);
     bananaGroup.setLifetimeEach(-1);
    
     obstacleGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);
     
     monkey.collide(invisibleGround);
   }
  
 


  drawSprites();
}

function spawnBananas() {

  if (frameCount % 250 === 0) {
    banana = createSprite(random(720, 600), 200);
    banana.addImage("banana", bananaImage);
    banana.scale = 0.12;
    banana.velocityX = -4;
    banana.lifetime = 320;
    bananaGroup.add(banana);
  }
}

function spawnObstacles() {

  if (frameCount % 300 === 0) {
    obstacle = createSprite(random(720, 650), 330);
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.velocityX = -5;
    obstacle.scale = 0.3;
    obstacleGroup.add(obstacle);
  }

}