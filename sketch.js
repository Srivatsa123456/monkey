
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstaclesGroup
var score, ground
var gamestate="start"

function preload(){
  
  
  monkey_running =  loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  foodGroup= new Group()
  obstaclesGroup= new Group()
  
}



function setup() {
  createCanvas(670, 400);
  score=0

  ground=createSprite(0,400,1500,10)
  
   monkey=createSprite(90,370,10,10)
  monkey.addAnimation("monkey_running",monkey_running)
  monkey.scale=0.1
  
  camera.position.x=monkey.x+150
 

  }
function draw() {
  background("white")
  fruits()
  obstacles()
  if(keyDown("space")&&monkey.y >= 350){
    monkey.velocityY=-15  
    camera.position.y=camera.position.y+50
  }
  else{
      camera.position.y=monkey.y
  }
  monkey.velocityY = monkey.velocityY + 0.7
  monkey.collide(ground)   
  
  
  ground.velocityX = -5 
 ground.x = ground.width/2;
    

  if(score/10===0){
    foodGroup.velocityY=foodGroup.velocityY+0.5
    //obstaclesGroup.velocityY=obstacleGroup.velocityY+0.5
}
 
  
  if(monkey.isTouching(foodGroup)){
    score=score+1
    foodGroup.destroyEach()
      }
  if(keyDown("space")&&gamestate==="start")
    {
gamestate="play"
}
  if(gamestate==="play")
    {
monkey.visible=true
}
  if(monkey.isTouching(obstaclesGroup))
  {
      gamestate="end"
}
  if(gamestate==="end"){
foodGroup.destroyEach()
obstaclesGroup.destroyEach()
    monkey.velocityX=0
    monkey.visible=false
}
 
 drawSprites()
  fill("black")
  text("Score:  "+ score, 500,50);
  if(gamestate==="start")
    {
      monkey.visible=false
    textSize(40)
    text("press space to start",150,200)
    }
  if(gamestate==="end")
    {
      textSize(40)
text("press r to restart",150,200)
}
  if(keyDown("r")&&gamestate==="end"){
gamestate="play"
}
  
}

function fruits(){
  if(gamestate==="play")
    {
      if(frameCount%150===0)
        {
  banana=createSprite(670,Math.round(random(170,230)),10,10)
  banana.addImage(bananaImage)
  banana.scale=0.1
  banana.velocityX=-3
  foodGroup.add(banana)
}
    }
}
function obstacles(){
  if(gamestate==="play"){
    if(frameCount%400===0){
  obstacle=createSprite(670,380,10,10)
  obstacle.addImage(obstacleImage)
  obstacle.velocityX=-5.5
    //  obstacle.debug=true
obstacle.setCollider("rectangle", 0, 0, 20, 80, -45);  obstacle.scale=0.2
  obstaclesGroup.add(obstacle)
}
}
}






