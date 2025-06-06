const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const letters = Array(256).join(" ").split("");
const text = "My Love";
const fontSize = 14;
const columns = canvas.width / fontSize;

let drops = [];
for (let i = 0; i < columns; i++) {
  drops[i] = 1;
}

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#ff69b4"; // cor rosa
  ctx.font = fontSize + "px 'Courier New'";
  for (let i = 0; i < drops.length; i++) {
    const char = text;
    const x = i * fontSize;
    const y = drops[i] * fontSize;

    ctx.fillText(char, x, y);

    // se a gota sair da tela ou aleatoriamente, reinicia
    if (y > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(draw, 33);

// Explosão quando clica
canvas.addEventListener("click", (e) => {
  const particles = 50;
  for (let i = 0; i < particles; i++) {
    createExplosion(e.clientX, e.clientY);
  }
});

function createExplosion(x, y) {
  let particleCount = 30;
  let particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: x,
      y: y,
      radius: Math.random() * 2 + 1,
      color: "pink",
      velocity: {
        x: (Math.random() - 0.5) * 6,
        y: (Math.random() - 0.5) * 6,
      },
      life: 100
    });
  }

  const interval = setInterval(() => {
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      p.x += p.velocity.x;
      p.y += p.velocity.y;
      p.life -= 2;
      if (p.life <= 0) particles.splice(i, 1);
    });

    if (particles.length <= 0) clearInterval(interval);
  }, 30);
}
