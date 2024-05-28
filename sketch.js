let counter = 0;
let imgs = [];
let currentIndex = 0;
let imgWidth;
let imgHeight;
let spacing = 50;
let totalWidth;
let blackhole, mss, nebula, supermassive, supernova;
let displayCounter = 0; // Counter to keep track of displayNextImage calls
let starPositions =[];
let check = 0;



function preload() {
  blackhole = loadImage('images/blackhole.png');
  mss = loadImage('images/mss.png');
  nebula = loadImage('images/nebula.png');
  supermassive = loadImage('images/supermassive.png');
  supernova = loadImage('images/supernova.png');

  imgs.push(nebula);
  imgs.push(mss);
  imgs.push(supermassive);
  imgs.push(blackhole);
  imgs.push(supernova);
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  counter = 0;
  imageTimer = 0;
  imageMode(CENTER);
  
  imgWidth = windowWidth / 6;  //width of each image in relation to window size
  imgHeight = imgWidth; // craetes symetrical images

  slider=createSlider(0, 400);
  slider.position(windowWidth/2-100, windowHeight-50);
  slider.size(200);

  counter = -1;
  index = -1;
  starXHistory = [];
  starYHistory = [];
  timerK = 20;
  imgIndex=0;
  background(22, 12, 41);
  displayNextImage();

  //drawImage();
}

function draw() {
  let starLimit = slider.value();
  frameRate(1000);
  //imageTimer++;
  // if(counter ===0){
  //   background(22, 12, 41);
  // }


  if(counter>starLimit||starLimit===0){
    index++;
    if(counter<0){
      counter = 0;
      index = 0;
    }
    starX = starXHistory[index];
    starY = starYHistory[index];
    
    counter--;
    
    R = 22;
    G = 12;
    B = 41;
    // temporaryXArray =[];
    // temporaryYArray =[];
    // for(x=1;x<starHistoryX.length;x++){
    //   temporaryXArray.push(starHistoryX[x]);
    //   temporaryYArray.push(starHistoryY[x]);
    // }
    // starHistoryX = temporaryXArray;
    // starHistoryY = temporaryYArray;
    //drawStar(starX,starY);
  }else{
    starX = floor(random(0,windowWidth));
    starY = floor(random(0,windowHeight));
    starXHistory.push(starX);
    starYHistory.push(starY);
    R = 200;
    G = 120;
    B = 200;
    counter++;
  }
  
    drawStar(starX,starY, R, G, B);
    starString = str(starLimit) + " Stars!";
    fill(22,12,41);
    rect(windowWidth/2-80,windowHeight-90,110,20);
    fill(255);
    text(starString,windowWidth/2-30,windowHeight-75);
    
    // if(imageTimer>timerK*10*(imgIndex+1)){
    //   imgIndex++;
    // }
    //drawImage(imgIndex);
  // for(x=0;x<starLimit;x++){
  //   starX = floor(random(0,windowWidth));
  //   starY = floor(random(0,windowHeight));
  //   drawStar(starX,starY);
  //   starString = str(starLimit) + " Stars!";
  //   fill(22,12,41);
  //   rect(windowWidth/2-80,windowHeight-90,110,20);
  //   fill(255);
  //   text(starString,windowWidth/2-30,windowHeight-75);
    
  //   //text(str(counter),windowWidth/2-50,windowHeight-75);
  // }
  //drawStar(starX,starY); // Draws little stars in the background at an interval
  
  //fill(255);
  //text(counter,windowWidth/2-50,windowHeight-75);
}

function drawStar(starX,starY, R, G, B) { //this will draw the stars randomly
  
  
  
  
  //counter++;
  //if(counter<150){
  drawStarShape(starX, starY, 5, 4, 2, 0, R, G, B);
  //}
  //if (counter >= 150) {
  //  clearInterval(countInterval);

  //}

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(22, 12, 41);
}

function drawImage(currentIndex){
  image(imgs[currentIndex], x, windowHeight / 2, imgWidth, imgHeight);
}

function drawStarShape(x, y, n, outerRadius, innerRadius, rotation, R, G, B) { //this is just the formula to create a star shape
  noStroke();
  fill(R, G, B);
  let theta = TAU / n;
  beginShape();
  for (let i = 0; i < n; i++) {
    let x1 = x + cos(i * theta + rotation) * outerRadius;
    let y1 = y + sin(i * theta + rotation) * outerRadius;
    vertex(x1, y1);
    let x2 = x + cos((i + 0.5) * theta + rotation) * innerRadius;
    let y2 = y + sin((i + 0.5) * theta + rotation) * innerRadius;
    vertex(x2, y2);
  }
  endShape(CLOSE);
}

function displayNextImage() { //function to draw the five images in succession along the screen
  setTimeout(1)
  
  if (currentIndex >= imgs.length) {
    currentIndex = 0;
  }

  totalWidth = ((imgWidth * 5) + 200)

  let startX = (windowWidth / 10);

  let x = startX + currentIndex * (imgWidth + spacing);

  image(imgs[currentIndex], x, windowHeight / 2, imgWidth, imgHeight);

  currentIndex++;
  
  displayCounter++; // Increment the display counter (number of images on screen)

  if (displayCounter >= 5) { // Check if it has been called 5 times
    setTimeout(resetCanvas, 2000); // Reset the canvas after a delay of 2 seconds
    displayCounter = 0; // Reset the display counter
  } else {
    setTimeout(displayNextImage, 2000);
  }
}

function resetCanvas() {
  background(22, 12, 41);
  counter = 0;
  index=0;
  starXHistory = [];
  starYHistory = [];
  displayNextImage(); // Start displaying images again
}