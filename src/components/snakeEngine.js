export const createSnakeGame = (width, height) => {
  const DIST = 12;
  const OFFSET = 20;

  const mouse = { x: width / 2, y: height / 2 };

  let nodes = [];
  let apples = [];
  let score = 0;
  let gameOver = false;
  let frames = 0;

  function initSnake() {
    nodes.length = 0;
    for (let i = 0; i < 20; i++) {
      nodes.push({
        x: width / 2 - i * DIST,
        y: height / 2,
      });
    }
  }

  function spawnApple() {
    apples.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 6,
    });
  }

  function init() {
    initSnake();
    apples.length = 0;
    for (let i = 0; i < 5; i++) spawnApple();
    score = 0;
    gameOver = false;
    frames = 0;
  }

  function update() {
    if (gameOver) return;

    frames++;

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

    for (let i = 1; i < nodes.length; i++) {
      const prev = nodes[i - 1];
      const curr = nodes[i];

      const dx = prev.x - curr.x;
      const dy = prev.y - curr.y;

      const angle = Math.atan2(dy, dx);

      curr.x = prev.x - Math.cos(angle) * DIST;
      curr.y = prev.y - Math.sin(angle) * DIST;
    }

    for (let i = apples.length - 1; i >= 0; i--) {
      const a = apples[i];
      const d = Math.hypot(head.x - a.x, head.y - a.y);

      if (d < 10) {
        apples.splice(i, 1);
        score++;

        const tail = nodes[nodes.length - 1];
        nodes.push({ x: tail.x, y: tail.y });

        spawnApple();
      }
    }

    if (frames > 20) {
      for (let i = 5; i < nodes.length; i++) {
        const n = nodes[i];
        const d = Math.hypot(head.x - n.x, head.y - n.y);

        if (d < 6) {
          gameOver = true;
          break;
        }
      }
    }
  }

  return {
    mouse,
    nodes,
    apples,
    get score() {
      return score;
    },
    get gameOver() {
      return gameOver;
    },
    init,
    update,
  };
};
