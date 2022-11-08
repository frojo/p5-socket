const socket = io({
  transports: ["websocket"]
});


let positions = {};


// called once at the beginning
function setup() {
  const cnv = createCanvas(600, 600);

  fill(random(255), random(255), random(255)); //sets the fill color of the circle to random color

  socket.on("positions", (data) => {
    //get the data from the server to continually update the positions
    positions = data;
  });
}


// this runs 60 times a second
function draw() {
  background(0); //reset background to black
  //draw a circle for every position
  for (const id in positions) {
    const position = positions[id];
    circle(position.x * width, position.y * height, 10);
  }

  socket.emit("updatePosition", {
    x: mouseX / width, // always send relative number of position between 0 and 1
    y: mouseY / height //so it positions are the relatively the same on different screen sizes.
  });

}


