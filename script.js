const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let bubbles = [];
const bubbleCount = 80;

// Generate bubbles
for (let i = 0; i < bubbleCount; i++) {
  bubbles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 15 + 5,
    dx: (Math.random() - 0.5) * 0.8,
    dy: (Math.random() - 0.5) * 0.8,
    color: `rgba(0,255,240,${Math.random()*0.5+0.3})`
  });
}

// Draw bubbles and connect
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw connections
  for (let i = 0; i < bubbles.length; i++) {
    for (let j = i + 1; j < bubbles.length; j++) {
      let dx = bubbles[i].x - bubbles[j].x;
      let dy = bubbles[i].y - bubbles[j].y;
      let dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0,255,240,${1 - dist/120})`;
        ctx.lineWidth = 1;
        ctx.moveTo(bubbles[i].x, bubbles[i].y);
        ctx.lineTo(bubbles[j].x, bubbles[j].y);
        ctx.stroke();
      }
    }
  }

  // Draw and update bubbles
  for (let bubble of bubbles) {
    bubble.x += bubble.dx;
    bubble.y += bubble.dy;

    if (bubble.x < 0 || bubble.x > canvas.width) bubble.dx *= -1;
    if (bubble.y < 0 || bubble.y > canvas.height) bubble.dy *= -1;

    ctx.beginPath();
    ctx.arc(bubble.x, bubble.y, bubble.r, 0, Math.PI * 2);
    ctx.fillStyle = bubble.color;
    ctx.fill();
  }

  requestAnimationFrame(animate);
}
animate();

// Interactivity: bubble grows on mouse hover
canvas.addEventListener('mousemove', (e) => {
  let mx = e.clientX;
  let my = e.clientY;
  for (let bubble of bubbles) {
    let dx = bubble.x - mx;
    let dy = bubble.y - my;
    let dist = Math.sqrt(dx*dx + dy*dy);
    if (dist < 80) {
      bubble.r = Math.min(30, bubble.r + 0.5);
    } else {
      bubble.r = Math.max(5, bubble.r - 0.2);
    }
  }
});

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
