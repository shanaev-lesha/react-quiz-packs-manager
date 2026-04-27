import { useEffect, useRef } from "react";

export const CreatureCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const mouse = { x: width / 2, y: height / 2 };

    const SEGMENTS = 32;
    const DIST = 12;
    const OFFSET = 40;

    const nodes = Array.from({ length: SEGMENTS }, () => ({
      x: width / 2,
      y: height / 2,
    }));

    // events
    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);

    function update() {
      const head = nodes[0];

      const dx = mouse.x - head.x;
      const dy = mouse.y - head.y;

      const dist = Math.hypot(dx, dy) || 1;

      const dirX = dx / dist;
      const dirY = dy / dist;

      const targetX = mouse.x - dirX * OFFSET;
      const targetY = mouse.y - dirY * OFFSET;

      head.x += (targetX - head.x) * 0.2;
      head.y += (targetY - head.y) * 0.2;

      // тело
      for (let i = 1; i < nodes.length; i++) {
        const prev = nodes[i - 1];
        const curr = nodes[i];

        const dx = prev.x - curr.x;
        const dy = prev.y - curr.y;

        const angle = Math.atan2(dy, dx);

        curr.x = prev.x - Math.cos(angle) * DIST;
        curr.y = prev.y - Math.sin(angle) * DIST;
      }
    }

    function drawBody() {
      ctx.shadowBlur = 20;
      ctx.shadowColor = "#c800ff";

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const prev = nodes[i - 1] || n;

        const angle = Math.atan2(n.y - prev.y, n.x - prev.x);
        const scale = 1 - i / nodes.length;

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
      const head = nodes[0];
      const next = nodes[1];

      ctx.shadowBlur = 0;

      ctx.beginPath();
      ctx.ellipse(head.x, head.y, 10, 8, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();

      // глаза
      ctx.beginPath();
      ctx.arc(head.x - 3, head.y - 2, 2, 0, Math.PI * 2);
      ctx.arc(head.x + 3, head.y - 2, 2, 0, Math.PI * 2);
      ctx.fillStyle = "#000";
      ctx.fill();

      // язык
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

    function draw() {
      ctx.clearRect(0, 0, width, height);
      drawBody();
      drawHead();
    }

    function loop() {
      update();
      draw();
      requestAnimationFrame(loop);
    }

    loop();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
};
