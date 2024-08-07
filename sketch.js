let img;
let images = [];
let fontHeading;
let circleSize = 0;
let drawCircle = false;
let fadeAlpha = 0;
let startFade = false;
let bloodGushSound;
let bgMusic;
let spinningCircle;
let enterSection;
let showEnterSection = true;
let enterSectionAlpha = 255;
let letter;
let fontBody;
let headingClicked = false;
let backBounds;

function preload() {
  img = loadImage("assets/HUMAN.png");
  fontHeading = loadFont("assets/bodegaserifblack.ttf");
  bloodGushSound = loadSound("assets/mainPageBloodGushSound.mp3");
  bgMusic = loadSound("assets/mainPageOperaSound.mp3");
  enterSection = loadImage("assets/mainpageEnterSection.png");
  letter = loadImage("assets/instructionPaper.png");
  fontBody = loadFont("assets/AmaticSC-Bold.ttf");

  // Load the images into the arrays
  images = [
    {
      file: loadImage("assets/pretend.png"),
      x: 1398.18,
      y: 318,
      targetX: 1398.18,
      targetY: 318,
      url: "page1.html",
      name: "pretend",
    },
    {
      file: loadImage("assets/misery.png"),
      x: 112,
      y: 318,
      targetX: 112,
      targetY: 318,
      url: "page2.html",
      name: "misery",
    },
    {
      file: loadImage("assets/denial.png"),
      x: 1398.18,
      y: 572,
      targetX: 1398.18,
      targetY: 572,
      url: "page3.html",
      name: "denial",
    },
    {
      file: loadImage("assets/dealing.png"),
      x: 112,
      y: 572,
      targetX: 112,
      targetY: 572,
      url: "page4.html",
      name: "dealing",
    },
    {
      file: loadImage("assets/accept.png"),
      x: 1398.18,
      y: 826.27,
      targetX: 1398.18,
      targetY: 826.27,
      url: "page5.html",
      name: "accept",
    },
    {
      file: loadImage("assets/moveon.png"),
      x: 112,
      y: 826.27,
      targetX: 112,
      targetY: 826.27,
      url: "page6.html",
      name: "moveon",
    },
  ];
}

function setup() {
  // Create the canvas
  createCanvas(1920, 1080);
  backBounds = {
    x: 932,
    y: 896,
    w: textWidth("back"),
    h: textAscent() + textDescent(),
  }; // Add this line
}

function draw() {
  background(0, 0, 0);

  if (!headingClicked) {
    image(img, 839, 361.62);
    textFont(fontHeading);
    textSize(130);
    let headingBounds = {
      x: 638,
      y: 230 - textAscent(),
      w: textWidth("THE LOST SOUL"),
      h: textAscent() + textDescent(),
    };
    if (
      mouseX > headingBounds.x &&
      mouseX < headingBounds.x + headingBounds.w &&
      mouseY > headingBounds.y &&
      mouseY < headingBounds.y + headingBounds.h
    ) {
      fill(208, 68, 56, 128);
    } else {
      fill(208, 68, 56);
    }
    text("THE LOST SOUL", 638, 190);

    for (let imageObj of images) {
      imageObj.x = lerp(imageObj.x, imageObj.targetX, 0.3);
      imageObj.y = lerp(imageObj.y, imageObj.targetY, 0.3);
      image(imageObj.file, imageObj.x, imageObj.y);
    }

    // Draw the circle at if drawCircle is true
    if (drawCircle) {
      noStroke();
      circleSize += 6;
      let gradient = lerpColor(
        color(169, 57, 46),
        color(0, 0, 0),
        circleSize / (2 * max(width, height))
      );
      fill(gradient);
      ellipse(936.78, 556.01, circleSize, circleSize);
      if (circleSize > 2 * max(width, height)) {
        circleSize = 0;
        drawCircle = false;
      }
    }

    // Draw the fullscreen rectangle with decreasing alpha for the fade-out effect
    if (startFade) {
      fill(0, 0, 0, fadeAlpha);
      rect(0, 0, width, height);
      if (fadeAlpha < 255) {
        fadeAlpha += 2;
      } else {
        startFade = false;
        fadeAlpha = 0;
      }
    }
    if (showEnterSection) {
      tint(255, enterSectionAlpha);
      image(enterSection, 0, 0);
      noTint();
    }
  } else {
    image(letter, 683, 169);
    fill(255, 255, 255);
    textFont(fontBody);
    textSize(36);
    if (
      mouseX > backBounds.x &&
      mouseX < backBounds.x + backBounds.w &&
      mouseY > backBounds.y - backBounds.h &&
      mouseY < backBounds.y
    ) {
      fill(255, 255, 255, 128);
    } else {
      fill(255, 255, 255);
    }
    text("back", backBounds.x, backBounds.y);
  }
}

function mousePressed() {
  if (
    mouseX > 958 &&
    mouseX < 958 + textWidth("THE LOST SOUL") &&
    mouseY > 269 - textAscent() &&
    mouseY < 269
  ) {
    headingClicked = true;
  }

  if (
    mouseX > backBounds.x &&
    mouseX < backBounds.x + backBounds.w &&
    mouseY > backBounds.y - backBounds.h &&
    mouseY < backBounds.y
  ) {
    headingClicked = false;
  }

  for (let imageObj of images) {
    if (
      mouseX > imageObj.x &&
      mouseX < imageObj.x + imageObj.file.width &&
      mouseY > imageObj.y &&
      mouseY < imageObj.y + imageObj.file.height
    ) {
      bgMusic.stop();

      setTimeout(function () {
        bloodGushSound.play();
      }, -200);

      if (
        imageObj.name === "pretend" ||
        imageObj.name === "denial" ||
        imageObj.name === "accept"
      ) {
        imageObj.targetX = 959.14;
        imageObj.targetY = 431.52;
      } else if (
        imageObj.name === "misery" ||
        imageObj.name === "dealing" ||
        imageObj.name === "moveon"
      ) {
        imageObj.targetX = 548;
        imageObj.targetY = 431.52;
      }
      drawCircle = true;
      setTimeout(function () {
        startFade = true;
      }, 9000);
      setTimeout(function () {
        window.location.href = imageObj.url;
      }, 10000);
    }
  }
}

function keyPressed() {
  if (key === "m" || key === "M") {
    if (!bgMusic.isPlaying()) {
      bgMusic.play();
    }
    showEnterSection = false;
    if (enterSectionAlpha > 0) {
      enterSectionAlpha -= 5; // Decrease the alpha value
    }
  }
}
