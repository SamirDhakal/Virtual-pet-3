var dog, dogImg, happyDog, database, foodS, foodStock;
var fedTime, lastFed;
var foodObj;
var changeState, readState;
var bedroom, garden, washroom;
var gameState;
function preload()
{
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
  bedroom = loadImage("virtual pet images/Bed Room.png");
  garden = loadImage("virtual pet images/Garden.png");
  washroom = loadImage("virtual pet images/Wash Room.png");
}

function setup() {
  database = firebase.database();
  createCanvas(400, 500);
  foodObj = new Food();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  readState = database.ref('gameState');
  readState.on("value",function(data){
    gameState = data.val();
  });
  
  dog = createSprite(200, 400, 150, 150);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  //foodObj = new Food();

  feed = createButton("Feed the dog");
  feed.position(380, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(480, 95);
  addFood.mousePressed(addFoods);
}


function draw() {  
  background(46, 139, 87);

  if(gameState != "Hungry") {
    feed.hide();
    addFood.hide();
    dog.remove();
  } else {
    feed.show();
    addFood.show();
    dog.addImage(dogImg);
  }
  currentTime = hour();
  if(currentTime==(lastFed+1)) {
    update("Playing");
    foodObj.garden();
  } else if(currentTime==(lastFed+2)) {
    update("Sleeping");
    foodObj.bedroom();
  } else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)) {
    update("Bathing")
    foodObj.washroom();
  } else {
    update("Hungry")
    foodObj.display();
  }
  textSize(15);
  fill(255, 255, 254);
  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  })
  if(lastFed >= 12) {
    text("Last Feed : "+ lastFed%12 + " PM", 250, 30);
  } else if(lastFed === 0) {
    text("Last Feed : 12 AM", 250, 30);
  } else {
    text("Last Feed : "+ lastFed + "AM", 250, 30);
  }
  drawSprites();
}

function feedDog() {
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock() -1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods() {
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function writeStock(x) {

  if(x <= 0) {
    x = 0;
  } else {
    x = x - 1;
  }

  database.ref('/').update({
    Food:x
  })
}

function update(state) {
  database.ref('/').update({
    gameState:state
  });
}
