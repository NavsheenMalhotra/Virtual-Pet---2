var database ,dog,dog1,dog2
var position
//var form
var feed,add
var foodobject
var Feedtime
var lastFeed
//Create variables here

function preload()

{
  dogimg1 = loadImage("images/dogImg.png")
  dogimg2 = loadImage("images/dogImg1.png")
	//load images here
}

function setup() {
	createCanvas(1000, 500);
  database = firebase.database();
  console.log(database);
 
  foodobject=new Food
  dog = createSprite(550,250,10,10);
  dog.addImage(dogimg1)
  dog.scale=0.2
  
 

  var dogo = database.ref('Food');
  dogo.on("value", readPosition, showError);
feed = createButton("FEED THE DOG")
feed.position(880, 65)
feed.mousePressed(FeedDog)

add = createButton("ADD FOOD")
add.position(1000, 65)
add.mousePressed(AddFood)

} 



function draw(){
 { background(46,139,87);
 foodobject.display()
 feedTime=database.ref('FeedTime');
 feedTime.on("value", function(data){
   lastFeed=data.val();
 })
 
 }
 drawSprites();
  
  fill(255,255,254);
 textSize(15);
 if(lastFeed>=12) {
   text("Last Feed :"+ lastFeed%12 + "PM", 350, 30);
 }else if(lastFeed==0) {
   text("LastFeed :12 AM", 350, 30);
 }else{
   text("Last Feed: "+lastFeed + "AM", 350, 30);
 }

  // text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
 
  //add styles here
drawSprites();
}
function readPosition(data){
  position = data.val();
  foodobject.updateFoodStock(position)
  
  
}

function showError(){
  console.log("Error in writing to the database");
}

function writePosition(nazo){
  if(nazo>0){
    nazo=nazo-1
  }
  else{
    nazo=0
  }
  database.ref('/').set({
    'Food': nazo
  })

}
function AddFood(){
position++
database.ref('/').update({
  Food:position
}

)
}
function FeedDog(){



dog.addImage(dogimg2)
foodobject.updateFoodStock(foodobject.getFoodStock()-1)
 database.ref('/').update({
   Food:foodobject.getFoodStock(),
   FeedTime:hour ()
 
 })

}