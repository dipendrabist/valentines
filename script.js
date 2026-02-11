var canvas = document.getElementById("starfield");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var context = canvas.getContext("2d");
var hearts = 400;
var colorrange = [10, 30, 340, 350]; // Warm oranges, peaches, and soft pinks for Hug Day
var heartArray = [];

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Initialize hearts with random opacity and size values
for (var i = 0; i < hearts; i++) {
  var x = Math.random() * canvas.offsetWidth;
  var y = Math.random() * canvas.offsetHeight;
  var size = Math.random() * 18 + 5; // Hearts sized between 5-23
  var hue = colorrange[getRandom(0, colorrange.length - 1)];
  var sat = getRandom(70, 100);
  var opacity = Math.random() * 0.9;
  var floatSpeed = Math.random() * 0.6 + 0.2; // Floating speed
  var sway = Math.random() * 2 - 1; // Left-right sway
  var rotationSpeed = (Math.random() - 0.5) * 0.02; // Rotation
  var rotation = Math.random() * Math.PI * 2;
  heartArray.push({ x, y, size, hue, sat, opacity, floatSpeed, sway, swayOffset: Math.random() * Math.PI * 2, rotation, rotationSpeed });
}

// Add some promise rings and infinity symbols
var symbolArray = [];
for (var i = 0; i < 30; i++) {
  var x = Math.random() * canvas.offsetWidth;
  var y = Math.random() * canvas.offsetHeight;
  var size = Math.random() * 15 + 10;
  var type = Math.random() > 0.5 ? 'ring' : 'infinity';
  var hue = colorrange[getRandom(0, colorrange.length - 1)];
  var opacity = Math.random() * 0.6 + 0.2;
  var floatSpeed = Math.random() * 0.3 + 0.1;
  var rotation = Math.random() * Math.PI * 2;
  var rotationSpeed = (Math.random() - 0.5) * 0.01;
  symbolArray.push({ x, y, size, type, hue, opacity, floatSpeed, rotation, rotationSpeed });
}

var frameNumber = 0;
var opacity = 0;
var secondOpacity = 0;
var thirdOpacity = 0;

function drawHeart(x, y, size, color, rotation) {
  context.save();
  context.translate(x, y);
  context.rotate(rotation);
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

function drawRing(x, y, size, color, rotation) {
  context.save();
  context.translate(x, y);
  context.rotate(rotation);
  
  // Outer circle
  context.beginPath();
  context.arc(0, 0, size, 0, Math.PI * 2);
  context.strokeStyle = color;
  context.lineWidth = size * 0.15;
  context.stroke();
  
  // Inner shine
  context.beginPath();
  context.arc(size * 0.4, -size * 0.4, size * 0.2, 0, Math.PI * 2);
  context.fillStyle = `rgba(255, 255, 255, ${0.6})`;
  context.fill();
  
  context.restore();
}

function drawInfinity(x, y, size, color, rotation) {
  context.save();
  context.translate(x, y);
  context.rotate(rotation);
  
  context.beginPath();
  context.strokeStyle = color;
  context.lineWidth = size * 0.15;
  
  // Draw infinity symbol using bezier curves
  var width = size * 1.5;
  var height = size * 0.8;
  
  context.moveTo(-width/2, 0);
  context.bezierCurveTo(-width/2, -height, -width/4, -height, 0, 0);
  context.bezierCurveTo(width/4, height, width/2, height, width/2, 0);
  context.bezierCurveTo(width/2, -height, width/4, -height, 0, 0);
  context.bezierCurveTo(-width/4, height, -width/2, height, -width/2, 0);
  
  context.stroke();
  context.restore();
}

function drawBackground() {
  // Create warm, cozy gradient background with Hug Day colors
  var gradient = context.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#2d1810");     // Deep warm brown at top
  gradient.addColorStop(0.3, "#3d2415");   // Warm chocolate
  gradient.addColorStop(0.6, "#4d2f1a");   // Rich warm brown
  gradient.addColorStop(0.8, "#5c3a24");   // Warm caramel
  gradient.addColorStop(1, "#6b4530");     // Cozy amber at bottom
  
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);
  
  // Add warm bokeh circles in the background
  for (let i = 0; i < 25; i++) {
    var bokehGradient = context.createRadialGradient(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      0,
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      Math.random() * 250 + 150
    );
    
    var hue = colorrange[getRandom(0, colorrange.length - 1)];
    bokehGradient.addColorStop(0, `hsla(${hue}, 80%, 70%, ${Math.random() * 0.04})`);
    bokehGradient.addColorStop(1, "rgba(255, 200, 150, 0)");
    
    context.fillStyle = bokehGradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
  
  // Add some warm sparkles
  if (frameNumber % 3 === 0) {
    for (let i = 0; i < 5; i++) {
      var sparkleX = Math.random() * canvas.width;
      var sparkleY = Math.random() * canvas.height;
      var sparkleSize = Math.random() * 2 + 1;
      
      context.fillStyle = `rgba(255, 220, 180, ${Math.random() * 0.8})`;
      context.beginPath();
      context.arc(sparkleX, sparkleY, sparkleSize, 0, Math.PI * 2);
      context.fill();
    }
  }
}

function drawHearts() {
  for (var i = 0; i < hearts; i++) {
    var heart = heartArray[i];
    var color = `hsla(${heart.hue}, ${heart.sat}%, 75%, ${heart.opacity})`;
    drawHeart(heart.x, heart.y, heart.size, color, heart.rotation);
  }
}

function drawSymbols() {
  for (var i = 0; i < symbolArray.length; i++) {
    var symbol = symbolArray[i];
    var color = `hsla(${symbol.hue}, 85%, 75%, ${symbol.opacity})`;
    
    if (symbol.type === 'ring') {
      drawRing(symbol.x, symbol.y, symbol.size, color, symbol.rotation);
    } else {
      drawInfinity(symbol.x, symbol.y, symbol.size, color, symbol.rotation);
    }
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
    
    // Rotate
    heart.rotation += heart.rotationSpeed;
    
    // Random opacity changes (twinkling effect)
    if (Math.random() > 0.98) {
      heart.opacity = Math.random() * 0.9;
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

function updateSymbols() {
  for (var i = 0; i < symbolArray.length; i++) {
    var symbol = symbolArray[i];
    
    // Float upward slower
    symbol.y -= symbol.floatSpeed;
    
    // Rotate
    symbol.rotation += symbol.rotationSpeed;
    
    // Gentle pulsing opacity
    if (frameNumber % 60 === 0) {
      symbol.opacity = Math.random() * 0.4 + 0.3;
    }
    
    // Reset symbols that float off the top
    if (symbol.y < -30) {
      symbol.y = canvas.height + 30;
      symbol.x = Math.random() * canvas.width;
    }
  }
}

function drawTextWithLineBreaks(lines, x, y, fontSize, lineHeight) {
  lines.forEach((line, index) => {
    context.fillText(line, x, y + index * (fontSize + lineHeight));
  });
}

function drawText() {
  var fontSize = Math.min(32, window.innerWidth / 22);
  var lineHeight = 10;
  context.font = fontSize + "px Georgia, serif";
  context.textAlign = "center";
  
  // Enhanced glow effect for Hug Day
  context.shadowColor = "rgba(255, 180, 120, 1)";
  context.shadowBlur = 20;
  context.shadowOffsetX = 0;
  context.shadowOffsetY = 0;

  // First message - Frames 0-240 (4 seconds)
  if(frameNumber < 120){
    context.fillStyle = `rgba(255, 240, 230, ${opacity})`;
    if (window.innerWidth < 600) {
      drawTextWithLineBreaks(["On this Hug Day,", "I want to wrap you in the warmest embrace"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
    } else {
      context.fillText("On this Hug Day, I want to wrap you in the warmest embrace", canvas.width/2, canvas.height/2);
    }
    opacity = opacity + 0.0167;
  }
  
  if(frameNumber >= 120 && frameNumber < 240){
    context.fillStyle = `rgba(255, 240, 230, ${opacity})`;
    if (window.innerWidth < 600) {
      drawTextWithLineBreaks(["On this Hug Day,", "I want to wrap you in the warmest embrace"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
    } else {
      context.fillText("On this Hug Day, I want to wrap you in the warmest embrace", canvas.width/2, canvas.height/2);
    }
    opacity = opacity - 0.0167;
  }
  
  if(frameNumber == 240){
    opacity = 0;
  }
  
  // Second message - Frames 240-480
  if(frameNumber > 240 && frameNumber < 360){
    context.fillStyle = `rgba(255, 240, 230, ${opacity})`;
    if (window.innerWidth < 600) {
      drawTextWithLineBreaks(["Your hugs are my safe place,", "where all my worries fade away"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
    } else {
      context.fillText("Your hugs are my safe place, where all my worries fade away", canvas.width/2, canvas.height/2);
    }
    opacity = opacity + 0.0167;
  }
  
  if(frameNumber >= 360 && frameNumber < 480){
    context.fillStyle = `rgba(255, 240, 230, ${opacity})`;
    if (window.innerWidth < 600) {
      drawTextWithLineBreaks(["Your hugs are my safe place,", "where all my worries fade away"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
    } else {
      context.fillText("Your hugs are my safe place, where all my worries fade away", canvas.width/2, canvas.height/2);
    }
    opacity = opacity - 0.0167;
  }
  
  if(frameNumber == 480){
    opacity = 0;
  }
  
  // Third message - Frames 480-720
  if(frameNumber > 480 && frameNumber < 600){
    context.fillStyle = `rgba(255, 240, 230, ${opacity})`;
    if (window.innerWidth < 600) {
      drawTextWithLineBreaks(["In your arms, time stands still", "and the world feels perfect"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
    } else {
      context.fillText("In your arms, time stands still and the world feels perfect", canvas.width/2, canvas.height/2);
    }
    opacity = opacity + 0.0167;
  }
  
  if(frameNumber >= 600 && frameNumber < 720){
    context.fillStyle = `rgba(255, 240, 230, ${opacity})`;
    if (window.innerWidth < 600) {
      drawTextWithLineBreaks(["In your arms, time stands still", "and the world feels perfect"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
    } else {
      context.fillText("In your arms, time stands still and the world feels perfect", canvas.width/2, canvas.height/2);
    }
    opacity = opacity - 0.0167;
  }
  
  if(frameNumber == 720){
    opacity = 0;
  }
  
  // Fourth message - Frames 720-960
  if(frameNumber > 720 && frameNumber < 840){
    context.fillStyle = `rgba(255, 240, 230, ${opacity})`;
    if (window.innerWidth < 600) {
      drawTextWithLineBreaks(["Every hug from you feels like", "coming home to where I belong"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
    } else {
      context.fillText("Every hug from you feels like coming home to where I belong", canvas.width/2, canvas.height/2);
    }
    opacity = opacity + 0.0167;
  }
  
  if(frameNumber >= 840 && frameNumber < 960){
    context.fillStyle = `rgba(255, 240, 230, ${opacity})`;
    if (window.innerWidth < 600) {
      drawTextWithLineBreaks(["Every hug from you feels like", "coming home to where I belong"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
    } else {
      context.fillText("Every hug from you feels like coming home to where I belong", canvas.width/2, canvas.height/2);
    }
    opacity = opacity - 0.0167;
  }
  
  if(frameNumber == 960){
    opacity = 0;
  }
  
  // Fifth message - Frames 960-1200
  if(frameNumber > 960 && frameNumber < 1080){
    context.fillStyle = `rgba(255, 240, 230, ${opacity})`;
    if (window.innerWidth < 600) {
      drawTextWithLineBreaks(["Your embrace is my favorite place,", "my comfort, my joy, my everything"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
    } else {
      context.fillText("Your embrace is my favorite place, my comfort, my joy, my everything", canvas.width/2, canvas.height/2);
    }
    opacity = opacity + 0.0167;
  }
  
  if(frameNumber >= 1080 && frameNumber < 1200){
    context.fillStyle = `rgba(255, 240, 230, ${opacity})`;
    if (window.innerWidth < 600) {
      drawTextWithLineBreaks(["Your embrace is my favorite place,", "my comfort, my joy, my everything"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
    } else {
      context.fillText("Your embrace is my favorite place, my comfort, my joy, my everything", canvas.width/2, canvas.height/2);
    }
    opacity = opacity - 0.0167;
  }
  
  if(frameNumber == 1200){
    opacity = 0;
  }
  
  // Main declaration - Frames 1200+
  if(frameNumber > 1200 && frameNumber < 99999){
    context.fillStyle = `rgba(255, 240, 230, ${opacity})`;
    if (window.innerWidth < 600) {
      drawTextWithLineBreaks(["Mero Ghuntudo, let me hold you close", "and never let go"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
    } else {
      context.fillText("Mero Ghuntudo, let me hold you close and never let go", canvas.width/2, canvas.height/2);
    }
    if(opacity < 1) {
      opacity = opacity + 0.0167;
    }
  }
  
  // Second line appears at frame 1320
  if(frameNumber >= 1320 && frameNumber < 99999){
    context.fillStyle = `rgba(255, 240, 230, ${secondOpacity})`;
    if (window.innerWidth < 600) {
      drawTextWithLineBreaks(["In your arms, I find peace, warmth,", "and a love that feels like forever"], canvas.width / 2, (canvas.height/2 + 60), fontSize, lineHeight);
    } else {
      context.fillText("In your arms, I find peace, warmth, and a love that feels like forever", canvas.width/2, (canvas.height/2 + 50));
    }
    if(secondOpacity < 1) {
      secondOpacity = secondOpacity + 0.0167;
    }
  }
  
  // Buttons appear at frame 1440
  if(frameNumber >= 1440 && frameNumber < 99999){
    context.fillStyle = `rgba(255, 240, 230, ${thirdOpacity})`;
    context.fillText("Can I wrap you in the warmest hug? Happy Hug Day, Mero Maya 🤗", canvas.width/2, (canvas.height/2 + 120));
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
  drawSymbols();
  updateSymbols();
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