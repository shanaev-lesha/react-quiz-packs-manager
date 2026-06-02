import { useEffect, useRef } from "react";
import { createSnakeGame } from "./snakeEngine";

export const CreatureCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const game = createSnakeGame(width, height);
    game.init();

    // events
    const onMouseMove = (e) => {
      game.mouse.x = e.clientX;
      game.mouse.y = e.clientY;
    };

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const onClick = () => {
      if (game.gameOver) {
        game.init();
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);
    window.addEventListener("click", onClick);

    function drawBody() {
      ctx.shadowBlur = 20;
      ctx.shadowColor = "#c800ff";

      for (let i = 0; i < game.nodes.length; i++) {
        const n = game.nodes[i];
        const prev = game.nodes[i - 1] || n;

        const angle = Math.atan2(n.y - prev.y, n.x - prev.x);
        const scale = 1 - i / game.nodes.length;

        ctx.save();
        ctx.translate(n.x, n.y);
        ctx.rotate(angle);
        ctx.scale(scale, scale);

        ctx.beginPath();
        ctx.ellipse(0, 0, 6, 3.2, 0, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        ctx.restore();
      }
    }

    function drawHead() {
      const head = game.nodes[0];
      const next = game.nodes[1];

      ctx.shadowBlur = 0;

      ctx.beginPath();
      ctx.ellipse(head.x, head.y, 10, 8, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(head.x - 4, head.y - 2, 2.5, 0, Math.PI * 2);
      ctx.arc(head.x + 4, head.y - 2, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = "#000";
      ctx.fill();

      const dx = head.x - next.x;
      const dy = head.y - next.y;
      const len = Math.hypot(dx, dy) || 1;

      const dirX = dx / len;
      const dirY = dy / len;

      const tx = head.x + dirX * 10;
      const ty = head.y + dirY * 10;

      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(tx + dirX * 6 - dirY * 2, ty + dirY * 6 + dirX * 2);
      ctx.moveTo(tx, ty);
      ctx.lineTo(tx + dirX * 6 + dirY * 2, ty + dirY * 6 - dirX * 2);

      ctx.strokeStyle = "red";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    function drawApples() {
      game.apples.forEach((a) => {
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fillStyle = "#ff3b3b";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(a.x - 2, a.y - 2, a.r / 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.6)";
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(a.x + 3, a.y - a.r - 2, 4, 2, Math.PI / 4, 0, Math.PI * 2);
        ctx.fillStyle = "#4caf50";
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(a.x, a.y - a.r);
        ctx.lineTo(a.x, a.y - a.r - 4);
        ctx.strokeStyle = "#5d4037";
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    }

    function drawScore() {
      ctx.fillStyle = "#fff";
      ctx.font = "20px Arial";
      ctx.textAlign = "right";
      ctx.fillText(`🍎 ${game.score}`, width - 20, 30);
    }

    function drawGameOver() {
      if (!game.gameOver) return;

      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#fff";
      ctx.font = "bold 48px Arial";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", width / 2, height / 2);

      ctx.font = "20px Arial";
      ctx.fillText("click to restart", width / 2, height / 2 + 40);
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      drawApples();
      drawBody();
      drawHead();
      drawScore();
      drawGameOver();
    }

    function loop() {
      game.update();
      draw();
      requestAnimationFrame(loop);
    }

    loop();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
};
