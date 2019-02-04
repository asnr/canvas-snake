import 'normalize.css';

const MILLISECONDS_BETWEEN_UPDATES = 300;

const BOARD_TILE_WIDTH = 60;
const BOARD_TILE_HEIGHT = 60;

const TILE_WIDTH = 10;
const TILE_HEIGHT = 10;

const BOARD_PIXEL_WIDTH = TILE_WIDTH * BOARD_TILE_WIDTH;
const BOARD_PIXEL_HEIGHT = TILE_HEIGHT * BOARD_TILE_HEIGHT;

const DIRECTIONS = {
  UP: { x: 0, y: -1 },
};

const startGame = () => {
  const canvas = document.getElementById('snake-canvas');
  canvas.width = BOARD_PIXEL_WIDTH;
  canvas.height = BOARD_PIXEL_HEIGHT;

  const context = canvas.getContext('2d');
  const model = {
    direction: DIRECTIONS.UP,
    snake: [{ x: 5, y: 17 }, { x: 6, y: 17 }, { x: 7, y: 17 }],
  };

  const timeNotSet = null;

  nextFrame(timeNotSet, context, model);
};


const nextFrame = (lastUpdateTime, canvas_context, model) => {
  const advanceOneFrameCallback =
        advanceOneFrame.bind(null, lastUpdateTime, canvas_context, model);
  window.requestAnimationFrame(advanceOneFrameCallback);
};

const advanceOneFrame = (
  lastUpdateTime,
  canvas_context,
  model,
  thisFrameTime
) => {
  if (!lastUpdateTime) {
    lastUpdateTime = thisFrameTime;
    nextFrame(lastUpdateTime, canvas_context, model);
    return;
  }

  const timeSinceLastUpdate = thisFrameTime - lastUpdateTime;
  if (timeSinceLastUpdate < MILLISECONDS_BETWEEN_UPDATES) {
    nextFrame(lastUpdateTime, canvas_context, model);
    return;
  }

  const updatedModel = update(model);
  drawUpdate(canvas_context, updatedModel);

  lastUpdateTime = thisFrameTime;
  nextFrame(lastUpdateTime, canvas_context, updatedModel);
};


const update = (model) => {
  const { direction, snake } = model;
  const head = snake[0];
  const nextHead = {
    x: (BOARD_TILE_WIDTH + head.x + direction.x) % BOARD_TILE_WIDTH,
    y: (BOARD_TILE_HEIGHT + head.y + direction.y) % BOARD_TILE_HEIGHT,
  };
  return {
    direction,
    snake: [nextHead, ...snake.slice(0, -1)],
  };
};


const drawUpdate = (context, model) => {
  context.fillStyle = '#fdf6e3';
  context.fillRect(0, 0, BOARD_PIXEL_WIDTH, BOARD_PIXEL_HEIGHT);

  context.fillStyle = '#586e75';
  model.snake.forEach(({ x, y }) => {
    context.fillRect(TILE_WIDTH * x, TILE_HEIGHT * y, TILE_WIDTH, TILE_HEIGHT);
  });
};


window.onload = startGame;
