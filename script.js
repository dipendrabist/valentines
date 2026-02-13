// Wait for DOM to be ready and currentEvent to be set
function initCanvas() {
  var canvas = document.getElementById("starfield");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var context = canvas.getContext("2d");
  var hearts = 400;
  var heartArray = [];

  // Get current event type from window
  var eventType = window.currentEvent || 'valentine';

  // Color schemes for each event
  var colorSchemes = {
    hug: {
      colors: [10, 30, 340, 350],
      gradient: { start: "#2d1810", mid1: "#3d2415", mid2: "#4d2f1a", mid3: "#5c3a24", end: "#6b4530" },
      messages: [
        ["On this Hug Day,", "I want to wrap you in the warmest embrace"],
        ["Your hugs are my safe place,", "where all my worries fade away"],
        ["In your arms, time stands still", "and the world feels perfect"],
        ["Every hug from you feels like", "coming home to where I belong"],
        ["Your embrace is my favorite place,", "my comfort, my joy, my everything"],
        ["Mero Ghuntudo, let me hold you close", "and never let go"],
        ["In your arms, I find peace, warmth,", "and a love that feels like forever"]
      ]
    },
    kiss: {
      colors: [320, 340, 0, 20],
      gradient: { start: "#1a0d1f", mid1: "#2d1530", mid2: "#3f1d40", mid3: "#512650", end: "#632e60" },
      messages: [
        ["On this Kiss Day,", "I want to taste the sweetness of your lips"],
        ["Your kisses ignite a fire", "that burns eternally in my soul"],
        ["Every kiss is a promise", "of forever written on my heart"],
        ["In your kiss, I find home,", "passion, and endless love"],
        ["Your lips are poetry,", "and I want to read them forever"],
        ["Mero Maya, let me kiss you", "like it's the first and last time"],
        ["With every kiss, I fall deeper", "into this beautiful forever with you"]
      ]
    },
    valentine: {
      colors: [330, 350, 0, 10],
      gradient: { start: "#1f0a14", mid1: "#331020", mid2: "#47162c", mid3: "#5b1c38", end: "#6f2244" },
      messages: [
        ["On this Valentine's Day,", "I want you to know you're my everything"],
        ["You are the love I've been", "searching for all my life"],
        ["With you, every moment", "becomes a precious memory"],
        ["You complete me in ways", "I never knew were possible"],
        ["My heart chose you,", "and it always will"],
        ["Mero Maya, you are my today", "and all of my tomorrows"],
        ["Forever isn't long enough", "to love you the way you deserve"]
      ]
    }
  };

  var currentScheme = colorSchemes[eventType];
  var colorrange = currentScheme.colors;

  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Initialize hearts
  for (var i = 0; i < hearts; i++) {
    var x = Math.random() * canvas.offsetWidth;
    var y = Math.random() * canvas.offsetHeight;
    var size = Math.random() * 18 + 5;
    var hue = colorrange[getRandom(0, colorrange.length - 1)];
    var sat = getRandom(70, 100);
    var opac = Math.random() * 0.9;
    var floatSpeed = Math.random() * 0.6 + 0.2;
    var sway = Math.random() * 2 - 1;
    var rotationSpeed = (Math.random() - 0.5) * 0.02;
    var rotation = Math.random() * Math.PI * 2;
    heartArray.push({ 
      x: x, 
      y: y, 
      size: size, 
      hue: hue, 
      sat: sat, 
      opacity: opac, 
      floatSpeed: floatSpeed, 
      sway: sway, 
      swayOffset: Math.random() * Math.PI * 2, 
      rotation: rotation, 
      rotationSpeed: rotationSpeed 
    });
  }

  var symbolTypes = { 
    hug: ['ring', 'infinity'], 
    kiss: ['lips', 'infinity'], 
    valentine: ['ring', 'infinity', 'arrow'] 
  };

  var symbolArray = [];
  for (var j = 0; j < 30; j++) {
    var sx = Math.random() * canvas.offsetWidth;
    var sy = Math.random() * canvas.offsetHeight;
    var ssize = Math.random() * 15 + 10;
    var availableTypes = symbolTypes[eventType];
    var stype = availableTypes[Math.floor(Math.random() * availableTypes.length)];
    var shue = colorrange[getRandom(0, colorrange.length - 1)];
    var sopacity = Math.random() * 0.6 + 0.2;
    var sfloatSpeed = Math.random() * 0.3 + 0.1;
    var srotation = Math.random() * Math.PI * 2;
    var srotationSpeed = (Math.random() - 0.5) * 0.01;
    symbolArray.push({ 
      x: sx, 
      y: sy, 
      size: ssize, 
      type: stype, 
      hue: shue, 
      opacity: sopacity, 
      floatSpeed: sfloatSpeed, 
      rotation: srotation, 
      rotationSpeed: srotationSpeed 
    });
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
    var topCurveHeight = size * 0.3;
    context.moveTo(0, 0);
    context.bezierCurveTo(-size / 2, -topCurveHeight, -size, topCurveHeight / 2, -size / 2, size);
    context.bezierCurveTo(-size / 4, size + topCurveHeight, size / 4, size + topCurveHeight, size / 2, size);
    context.bezierCurveTo(size, topCurveHeight / 2, size / 2, -topCurveHeight, 0, 0);
    context.fillStyle = color;
    context.fill();
    context.restore();
  }

  function drawRing(x, y, size, color, rotation) {
    context.save();
    context.translate(x, y);
    context.rotate(rotation);
    context.beginPath();
    context.arc(0, 0, size, 0, Math.PI * 2);
    context.strokeStyle = color;
    context.lineWidth = size * 0.15;
    context.stroke();
    context.beginPath();
    context.arc(size * 0.4, -size * 0.4, size * 0.2, 0, Math.PI * 2);
    context.fillStyle = "rgba(255, 255, 255, 0.6)";
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

  function drawLips(x, y, size, color, rotation) {
    context.save();
    context.translate(x, y);
    context.rotate(rotation);
    context.fillStyle = color;
    context.beginPath();
    context.moveTo(-size, 0);
    context.bezierCurveTo(-size, -size * 0.5, -size * 0.5, -size * 0.7, 0, -size * 0.5);
    context.bezierCurveTo(size * 0.5, -size * 0.7, size, -size * 0.5, size, 0);
    context.bezierCurveTo(size, size * 0.6, size * 0.5, size, 0, size * 0.8);
    context.bezierCurveTo(-size * 0.5, size, -size, size * 0.6, -size, 0);
    context.fill();
    context.fillStyle = 'rgba(255, 255, 255, 0.3)';
    context.beginPath();
    context.arc(0, -size * 0.2, size * 0.3, 0, Math.PI * 2);
    context.fill();
    context.restore();
  }

  function drawArrow(x, y, size, color, rotation) {
    context.save();
    context.translate(x, y);
    context.rotate(rotation);
    context.strokeStyle = color;
    context.fillStyle = color;
    context.lineWidth = size * 0.15;
    context.beginPath();
    context.moveTo(-size, 0);
    context.lineTo(size * 0.7, 0);
    context.stroke();
    context.beginPath();
    context.moveTo(size * 0.7, 0);
    context.lineTo(size * 0.3, -size * 0.4);
    context.lineTo(size * 0.3, size * 0.4);
    context.closePath();
    context.fill();
    context.beginPath();
    context.moveTo(-size, -size * 0.3);
    context.lineTo(-size * 0.6, 0);
    context.lineTo(-size, size * 0.3);
    context.stroke();
    context.restore();
  }

  function drawBackground() {
    var gradient = context.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, currentScheme.gradient.start);
    gradient.addColorStop(0.3, currentScheme.gradient.mid1);
    gradient.addColorStop(0.6, currentScheme.gradient.mid2);
    gradient.addColorStop(0.8, currentScheme.gradient.mid3);
    gradient.addColorStop(1, currentScheme.gradient.end);
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    for (var k = 0; k < 25; k++) {
      var bokehGradient = context.createRadialGradient(
        Math.random() * canvas.width, 
        Math.random() * canvas.height, 
        0, 
        Math.random() * canvas.width, 
        Math.random() * canvas.height, 
        Math.random() * 250 + 150
      );
      var bhue = colorrange[getRandom(0, colorrange.length - 1)];
      bokehGradient.addColorStop(0, "hsla(" + bhue + ", 80%, 70%, " + (Math.random() * 0.04) + ")");
      bokehGradient.addColorStop(1, "rgba(255, 200, 150, 0)");
      context.fillStyle = bokehGradient;
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    if (frameNumber % 3 === 0) {
      for (var m = 0; m < 5; m++) {
        var sparkleX = Math.random() * canvas.width;
        var sparkleY = Math.random() * canvas.height;
        var sparkleSize = Math.random() * 2 + 1;
        context.fillStyle = "rgba(255, 220, 180, " + (Math.random() * 0.8) + ")";
        context.beginPath();
        context.arc(sparkleX, sparkleY, sparkleSize, 0, Math.PI * 2);
        context.fill();
      }
    }
  }

  function drawHearts() {
    for (var i = 0; i < hearts; i++) {
      var heart = heartArray[i];
      var color = "hsla(" + heart.hue + ", " + heart.sat + "%, 75%, " + heart.opacity + ")";
      drawHeart(heart.x, heart.y, heart.size, color, heart.rotation);
    }
  }

  function drawSymbols() {
    for (var i = 0; i < symbolArray.length; i++) {
      var symbol = symbolArray[i];
      var color = "hsla(" + symbol.hue + ", 85%, 75%, " + symbol.opacity + ")";
      if (symbol.type === 'ring') {
        drawRing(symbol.x, symbol.y, symbol.size, color, symbol.rotation);
      } else if (symbol.type === 'infinity') {
        drawInfinity(symbol.x, symbol.y, symbol.size, color, symbol.rotation);
      } else if (symbol.type === 'lips') {
        drawLips(symbol.x, symbol.y, symbol.size, color, symbol.rotation);
      } else if (symbol.type === 'arrow') {
        drawArrow(symbol.x, symbol.y, symbol.size, color, symbol.rotation);
      }
    }
  }

  function updateHearts() {
    for (var i = 0; i < hearts; i++) {
      var heart = heartArray[i];
      heart.y -= heart.floatSpeed;
      heart.swayOffset += 0.02;
      heart.x += Math.sin(heart.swayOffset) * heart.sway;
      heart.rotation += heart.rotationSpeed;
      if (Math.random() > 0.98) {
        heart.opacity = Math.random() * 0.9;
      }
      if (heart.y < -20) {
        heart.y = canvas.height + 20;
        heart.x = Math.random() * canvas.width;
      }
      if (heart.x < -20) heart.x = canvas.width + 20;
      if (heart.x > canvas.width + 20) heart.x = -20;
    }
  }

  function updateSymbols() {
    for (var i = 0; i < symbolArray.length; i++) {
      var symbol = symbolArray[i];
      symbol.y -= symbol.floatSpeed;
      symbol.rotation += symbol.rotationSpeed;
      if (frameNumber % 60 === 0) {
        symbol.opacity = Math.random() * 0.4 + 0.3;
      }
      if (symbol.y < -30) {
        symbol.y = canvas.height + 30;
        symbol.x = Math.random() * canvas.width;
      }
    }
  }

  function drawTextWithLineBreaks(lines, x, y, fontSize, lineHeight) {
    for (var i = 0; i < lines.length; i++) {
      context.fillText(lines[i], x, y + i * (fontSize + lineHeight));
    }
  }

  function drawText() {
    var fontSize = Math.min(32, window.innerWidth / 22);
    var lineHeight = 10;
    context.font = fontSize + "px Georgia, serif";
    context.textAlign = "center";
    context.shadowColor = "rgba(255, 180, 120, 1)";
    context.shadowBlur = 25;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;

    var messages = currentScheme.messages;
    var frameInterval = 240;
    
    for (var msgIdx = 0; msgIdx < messages.length; msgIdx++) {
      var message = messages[msgIdx];
      var startFrame = msgIdx * frameInterval;
      var endFrame = startFrame + frameInterval;
      var fadeInEnd = startFrame + 120;
      
      if (frameNumber >= startFrame && frameNumber < fadeInEnd) {
        context.fillStyle = "rgba(255, 240, 230, " + opacity + ")";
        if (window.innerWidth < 600) {
          drawTextWithLineBreaks(message, canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
          context.fillText(message.join(' '), canvas.width/2, canvas.height/2);
        }
        opacity = opacity + 0.0167;
      }
      
      if (frameNumber >= fadeInEnd && frameNumber < endFrame) {
        context.fillStyle = "rgba(255, 240, 230, " + opacity + ")";
        if (window.innerWidth < 600) {
          drawTextWithLineBreaks(message, canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
          context.fillText(message.join(' '), canvas.width/2, canvas.height/2);
        }
        opacity = opacity - 0.0167;
      }
      
      if (frameNumber === endFrame) {
        opacity = 0;
      }
    }
    
    var finalStartFrame = messages.length * frameInterval;
    
    if (frameNumber > finalStartFrame && frameNumber < 99999) {
      var finalMessage = messages[messages.length - 2];
      context.fillStyle = "rgba(255, 240, 230, " + opacity + ")";
      if (window.innerWidth < 600) {
        drawTextWithLineBreaks(finalMessage, canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
      } else {
        context.fillText(finalMessage.join(' '), canvas.width/2, canvas.height/2);
      }
      if (opacity < 1) {
        opacity = opacity + 0.0167;
      }
    }
    
    if (frameNumber >= finalStartFrame + 120 && frameNumber < 99999) {
      var finalMessage2 = messages[messages.length - 1];
      context.fillStyle = "rgba(255, 240, 230, " + secondOpacity + ")";
      if (window.innerWidth < 600) {
        drawTextWithLineBreaks(finalMessage2, canvas.width / 2, (canvas.height/2 + 60), fontSize, lineHeight);
      } else {
        context.fillText(finalMessage2.join(' '), canvas.width/2, (canvas.height/2 + 50));
      }
      if (secondOpacity < 1) {
        secondOpacity = secondOpacity + 0.0167;
      }
    }
    
    if (frameNumber >= finalStartFrame + 240 && frameNumber < 99999) {
      var questionTexts = {
        hug: "Can I wrap you in the warmest hug? Happy Hug Day, Mero Maya 🤗",
        kiss: "Can I steal the sweetest kiss? Happy Kiss Day, Mero Maya 💋",
        valentine: "Will you be my forever Valentine, Mero Maya? 💝"
      };
      
      context.fillStyle = "rgba(255, 240, 230, " + thirdOpacity + ")";
      context.fillText(questionTexts[eventType], canvas.width/2, (canvas.height/2 + 120));
      if (thirdOpacity < 1) {
        thirdOpacity = thirdOpacity + 0.0167;
      }
      
      if (frameNumber === finalStartFrame + 240) {
        document.getElementById("valentineContainer").style.display = "block";
        document.getElementById("canvasBlur").classList.add("active");
      }
    }
    
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
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCanvas);
} else {
  initCanvas();
}