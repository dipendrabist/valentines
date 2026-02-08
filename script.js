var canvas = document.getElementById("starfield");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var context = canvas.getContext("2d");
var hearts = 500;
var colorrange = [330, 350, 0, 20]; // Pink and red hues
var heartArray = [];

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Initialize hearts with random opacity and size values
for (var i = 0; i < hearts; i++) {
  var x = Math.random() * canvas.offsetWidth;
  var y = Math.random() * canvas.offsetHeight;
  var size = Math.random() * 15 + 5; // Hearts sized between 5-20
  var hue = colorrange[getRandom(0, colorrange.length - 1)];
  var sat = getRandom(70, 100);
  var opacity = Math.random() * 0.8;
  var floatSpeed = Math.random() * 0.5 + 0.2; // Floating speed
  var sway = Math.random() * 2 - 1; // Left-right sway
  heartArray.push({ x, y, size, hue, sat, opacity, floatSpeed, sway, swayOffset: Math.random() * Math.PI * 2 });
}

var frameNumber = 0;
var opacity = 0;
var secondOpacity = 0;
var thirdOpacity = 0;

// Valentine container will be shown after animation completes

function drawHeart(x, y, size, color) {
  context.save();
  context.translate(x, y);
  context.beginPath();
  
  // Draw heart shape
  var topCurveHeight = size * 0.3;
  context.moveTo(0, 0);
  
  // Left side of heart
  context.bezierCurveTo(
    -size / 2, -topCurveHeight,
    -size, topCurveHeight / 2,
    -size / 2, size
  );
  
  // Bottom point
  context.bezierCurveTo(
    -size / 4, size + topCurveHeight,
    size / 4, size + topCurveHeight,
    size / 2, size
  );
  
  // Right side of heart
  context.bezierCurveTo(
    size, topCurveHeight / 2,
    size / 2, -topCurveHeight,
    0, 0
  );
  
  context.fillStyle = color;
  context.fill();
  context.restore();
}

function drawBackground() {
  // Create beautiful gradient background
  var gradient = context.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#1a0a1f");     // Deep purple at top
  gradient.addColorStop(0.3, "#2d1b3d");   // Purple
  gradient.addColorStop(0.6, "#4a2545");   // Purple-pink
  gradient.addColorStop(1, "#5c2e4a");     // Deep rose at bottom
  
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);
  
  // Add some soft bokeh circles in the background
  for (let i = 0; i < 20; i++) {
    var bokehGradient = context.createRadialGradient(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      0,
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      Math.random() * 200 + 100
    );
    bokehGradient.addColorStop(0, `rgba(255, 182, 193, ${Math.random() * 0.03})`);
    bokehGradient.addColorStop(1, "rgba(255, 182, 193, 0)");
    
    context.fillStyle = bokehGradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function drawHearts() {
  for (var i = 0; i < hearts; i++) {
    var heart = heartArray[i];
    var color = `hsla(${heart.hue}, ${heart.sat}%, 75%, ${heart.opacity})`;
    drawHeart(heart.x, heart.y, heart.size, color);
  }
}

function updateHearts() {
  for (var i = 0; i < hearts; i++) {
    var heart = heartArray[i];
    
    // Float upward
    heart.y -= heart.floatSpeed;
    
    // Sway left and right
    heart.swayOffset += 0.02;
    heart.x += Math.sin(heart.swayOffset) * heart.sway;
    
    // Random opacity changes (twinkling effect)
    if (Math.random() > 0.98) {
      heart.opacity = Math.random() * 0.8;
    }
    
    // Reset hearts that float off the top
    if (heart.y < -20) {
      heart.y = canvas.height + 20;
      heart.x = Math.random() * canvas.width;
    }
    
    // Keep hearts within horizontal bounds
    if (heart.x < -20) heart.x = canvas.width + 20;
    if (heart.x > canvas.width + 20) heart.x = -20;
  }
}

function drawTextWithLineBreaks(lines, x, y, fontSize, lineHeight) {
  lines.forEach((line, index) => {
    context.fillText(line, x, y + index * (fontSize + lineHeight));
  });
}

function drawText() {
  var fontSize = Math.min(30, window.innerWidth / 24);
  var lineHeight = 8;
  context.font = fontSize + "px Georgia, serif";
  context.textAlign = "center";
  
  // Romantic glow effect
  context.shadowColor = "rgba(255, 182, 193, 1)";
  context.shadowBlur = 15;
  context.shadowOffsetX = 0;
  context.shadowOffsetY = 0;

  // First message - Frames 0-240 (4 seconds total: 2s fade in, 2s fade out)
  if(frameNumber < 120){
    context.fillStyle = `rgba(255, 230, 240, ${opacity})`;
    if (window.innerWidth < 600) {
      drawTextWithLineBreaks(["In a universe vast beyond measure,", "my soul found its home in you"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
    } else {
      context.fillText("In a universe vast beyond measure, my soul found its home in you", canvas.width/2, canvas.height/2);
    }
    opacity = opacity + 0.0167; // Faster fade (reaches 1.0 in 2 seconds)
  }
  
  if(frameNumber >= 120 && frameNumber < 240){
    context.fillStyle = `rgba(255, 230, 240, ${opacity})`;
    if (window.innerWidth < 600) {
      drawTextWithLineBreaks(["In a universe vast beyond measure,", "my soul found its home in you"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
    } else {
      context.fillText("In a universe vast beyond measure, my soul found its home in you", canvas.width/2, canvas.height/2);
    }
    opacity = opacity - 0.0167;
  }
  
  if(frameNumber == 240){
    opacity = 0;
  }
  
  // Second message - Frames 240-480 (4 seconds total)
  if(frameNumber > 240 && frameNumber < 360){
    context.fillStyle = `rgba(255, 230, 240, ${opacity})`;
    if (window.innerWidth < 600) {
      drawTextWithLineBreaks(["You are the dream I never knew", "I was searching for"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
    } else {
      context.fillText("You are the dream I never knew I was searching for", canvas.width/2, canvas.height/2);
    }
    opacity = opacity + 0.0167;
  }
  
  if(frameNumber >= 360 && frameNumber < 480){
    context.fillStyle = `rgba(255, 230, 240, ${opacity})`;
    if (window.innerWidth < 600) {
      drawTextWithLineBreaks(["You are the dream I never knew", "I was searching for"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
    } else {
      context.fillText("You are the dream I never knew I was searching for", canvas.width/2, canvas.height/2);
    }
    opacity = opacity - 0.0167;
  }
  
  if(frameNumber == 480){
    opacity = 0;
  }
  
  // Third message - Frames 480-720 (4 seconds total)
  if(frameNumber > 480 && frameNumber < 600){
    context.fillStyle = `rgba(255, 230, 240, ${opacity})`;
    if (window.innerWidth < 600) {
      drawTextWithLineBreaks(["The way you look at me makes me believe", "in magic, in fate, in forever"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
    } else {
      context.fillText("The way you look at me makes me believe in magic, in fate, in forever", canvas.width/2, canvas.height/2);
    }
    opacity = opacity + 0.0167;
  }
  
  if(frameNumber >= 600 && frameNumber < 720){
    context.fillStyle = `rgba(255, 230, 240, ${opacity})`;
    if (window.innerWidth < 600) {
      drawTextWithLineBreaks(["The way you look at me makes me believe", "in magic, in fate, in forever"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
    } else {
      context.fillText("The way you look at me makes me believe in magic, in fate, in forever", canvas.width/2, canvas.height/2);
    }
    opacity = opacity - 0.0167;
  }
  
  if(frameNumber == 720){
    opacity = 0;
  }
  
  // Fourth message - Frames 720-960 (4 seconds total)
  if(frameNumber > 720 && frameNumber < 840){
    context.fillStyle = `rgba(255, 230, 240, ${opacity})`;
    if (window.innerWidth < 600) {
      drawTextWithLineBreaks(["Every heartbeat whispers your name,", "every breath is a prayer of gratitude for you"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
    } else {
      context.fillText("Every heartbeat whispers your name, every breath is a prayer of gratitude for you", canvas.width/2, canvas.height/2);
    }
    opacity = opacity + 0.0167;
  }
  
  if(frameNumber >= 840 && frameNumber < 960){
    context.fillStyle = `rgba(255, 230, 240, ${opacity})`;
    if (window.innerWidth < 600) {
      drawTextWithLineBreaks(["Every heartbeat whispers your name,", "every breath is a prayer of gratitude for you"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
    } else {
      context.fillText("Every heartbeat whispers your name, every breath is a prayer of gratitude for you", canvas.width/2, canvas.height/2);
    }
    opacity = opacity - 0.0167;
  }
  
  if(frameNumber == 960){
    opacity = 0;
  }
  
  // Fifth message - Frames 960-1200 (4 seconds total)
  if(frameNumber > 960 && frameNumber < 1080){
    context.fillStyle = `rgba(255, 230, 240, ${opacity})`;
    if (window.innerWidth < 600) {
      drawTextWithLineBreaks(["With you, I have found a love that feels like", "coming home after a lifetime of wandering"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
    } else {
      context.fillText("With you, I have found a love that feels like coming home after a lifetime of wandering", canvas.width/2, canvas.height/2);
    }
    opacity = opacity + 0.0167;
  }
  
  if(frameNumber >= 1080 && frameNumber < 1200){
    context.fillStyle = `rgba(255, 230, 240, ${opacity})`;
    if (window.innerWidth < 600) {
      drawTextWithLineBreaks(["With you, I have found a love that feels like", "coming home after a lifetime of wandering"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
    } else {
      context.fillText("With you, I have found a love that feels like coming home after a lifetime of wandering", canvas.width/2, canvas.height/2);
    }
    opacity = opacity - 0.0167;
  }
  
  if(frameNumber == 1200){
    opacity = 0;
  }
  
  // Main declaration - Frames 1200+ (2 seconds to fade in)
  if(frameNumber > 1200 && frameNumber < 99999){
    context.fillStyle = `rgba(255, 230, 240, ${opacity})`;
    if (window.innerWidth < 600) {
      drawTextWithLineBreaks(["Mero Ghuntudo, you are my greatest adventure,", "my deepest peace, my truest love"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
    } else {
      context.fillText("Mero Ghuntudo, you are my greatest adventure, my deepest peace, my truest love", canvas.width/2, canvas.height/2);
    }
    if(opacity < 1) {
      opacity = opacity + 0.0167;
    }
  }
  
  // Second line appears at frame 1320 (2 seconds after main message starts)
  if(frameNumber >= 1320 && frameNumber < 99999){
    context.fillStyle = `rgba(255, 230, 240, ${secondOpacity})`;
    if (window.innerWidth < 600) {
      drawTextWithLineBreaks(["I promise to love you fiercely, protect your heart tenderly,", "and cherish every moment we share"], canvas.width / 2, (canvas.height/2 + 60), fontSize, lineHeight);
    } else {
      context.fillText("I promise to love you fiercely, protect your heart tenderly, and cherish every moment we share", canvas.width/2, (canvas.height/2 + 50));
    }
    if(secondOpacity < 1) {
      secondOpacity = secondOpacity + 0.0167;
    }
  }
  
  // Buttons appear at frame 1440 (24 seconds total - much faster!)
  if(frameNumber >= 1440 && frameNumber < 99999){
    context.fillStyle = `rgba(255, 230, 240, ${thirdOpacity})`;
    context.fillText("You are my forever. Happy Valentine's Day, my love ♡", canvas.width/2, (canvas.height/2 + 120));
    if(thirdOpacity < 1) {
      thirdOpacity = thirdOpacity + 0.0167;
    }
    
    // Show the valentine question container and blur background
    if (frameNumber === 1440) {
      document.getElementById("valentineContainer").style.display = "block";
      document.getElementById("canvasBlur").classList.add("active");
    }
  }
  
  // Reset the shadow effect after drawing the text
  context.shadowColor = "transparent";
  context.shadowBlur = 0;
  context.shadowOffsetX = 0;
  context.shadowOffsetY = 0;
}

function draw() {
  drawBackground();
  drawHearts();
  updateHearts();
  drawText();
  if (frameNumber < 99999) {
    frameNumber++;
  }
  window.requestAnimationFrame(draw);
}

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

window.requestAnimationFrame(draw);