var PLAY = 1;
var END = 0;
var gameState = PLAY;
var man, man_running, man_collided;
var ground, invisibleGround, groundImage;
var Background,bg;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score=0;
var gameOver, restart;

localStorage["HighestScore"] = 0;

function preload(){

  man_running =   loadAnimation("man1.png","man4.png","man3.png","man4.png");
  man_collided = loadAnimation("man_collided.png");

  bg=loadImage("bg.png")
  groundImage = loadImage("ground2.png");
 
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
 
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);


  man= createSprite(300,380,20,50);
  man.addAnimation("running", man_running);
  man.addAnimation("collided", man_collided);
  man.scale = 0.2;
  man.setCollider("circle",0,0,40);
  man.collider.visible=false;

ground = createSprite(380,480,400,20);
 ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.visible=false;
  ground.velocityX = -(6 + 3*score/100);
 
  gameOver = createSprite(300,400);
  gameOver.addImage(gameOverImg);
 
  restart = createSprite(300,400);
  restart.addImage(restartImg);
 
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
 
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
 
  obstaclesGroup = new Group();

  score = 0;
}

function draw() {
   background(bg);
   text("Meter: "+ score, 50,50);
    if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 1*score/100);
    console.log(man.y);

    if(keyDown("space") && man.y >=466) {
      man.velocityY = -12;
    }
    man.velocityY = man.velocityY + 0.8;
 
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
 
    man.collide(ground);
    spawnObstacles();
 
    if(obstaclesGroup.isTouching(man)){
        gameState = END;
    }
    }
    else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
   
    ground.velocityX = 0;
    man.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
   
    man.changeAnimation("collided",man_collided);
   
    obstaclesGroup.setLifetimeEach(-1);
   
    if(mousePressedOver(restart)) {
      reset();
    }
  }
 
 
  drawSprites();
}

 


function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,480,10,40);
    obstacle.velocityX = -(6 + 1*score/100);
    //obstacle.collide(ground);
   
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
   
    obstacle.scale = 0.4;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}

  
  function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  
  man.changeAnimation("running",man_running);
  
  score= 0;
  
}