var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var Gameover,GameoverImg;
var gameState = "play"

function preload(){
    towerImg = loadImage("tower.png");
    doorImg = loadImage("door.png");
    climberImg = loadImage("climber.png");
    ghostImg = loadImage("ghost-standing.png");
    GameoverImg = loadImage("Gameover.png")
    spookySound = loadSound("spooky.wav");
    doorsGroup = new Group();
    climbersGroup = new Group()
    invisibleBlockGroup = new Group();
  }

function setup() {
    createCanvas(600, 600);
   
    tower = createSprite(300,300);
    tower.addImage("tower",towerImg);
    tower.velocityY = 1;
     
    ghost = createSprite(200,200,50,50);
    ghost.scale = 0.3;
    ghost.addImage("ghost",ghostImg);

   // gameOver = createSprite(400,150);
   // gameOver.addImage(gameOverImg);
   // gameOver.scale = 0.8;
   // gameOver.visible = false; 
}

function draw() {
    background(200);
    if(gameState === "play"){
    
    if(tower.y > 400){
        tower.y = 300
      }
      spawnDoors();
      if(keyDown(LEFT_ARROW)){
        ghost.x = ghost.x-3
      }
      if(keyDown(RIGHT_ARROW)){
        ghost.x = ghost.x+3
      }
      if(keyDown("space")){
        ghost.velocityY = -5
      }
      ghost.velocityY = ghost.velocityY+0.8;
  
      if(climbersGroup.isTouching(ghost)){
        ghost.velocityY = 0
      }
  
      if(invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
        ghost.destroy();
        gameState = "end";
      }
      
      drawSprites();
      
  }
  if(gameState ==="end"){
   // gameOver.visible = true;
  }
  }
  
  function spawnDoors(){
    if(frameCount % 240 === 0){
      var door = createSprite(200,-50);
      door.addImage("door",doorImg);
      
      var climber = createSprite(200,10);
      climber.addImage("climber",climberImg);
  
      var invisibleBlock = createSprite(200,15);
      invisibleBlock.width = climber.width;
      invisibleBlock.heigth = 2;
  
      door.x = Math.round(random(120,400));
      door.velocityY = 1;
  
      climber.x = door.x;
      climber.velocityY = 1
  
      invisibleBlock.x = door.x;
      invisibleBlock.velocityY = 1;
  
      door.lifetime = 800;
      doorsGroup.add(door);
  
      climber.lifetime = 800;
      climbersGroup.add(climber);
  
      invisibleBlock.lifetime = 800;
      invisibleBlock.debug=true;
      invisibleBlockGroup.add(invisibleBlock);
  
      ghost.depth = door.depth;
      ghost.depth+=1;
    }
  }
