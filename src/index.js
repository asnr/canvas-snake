import 'normalize.css';

const BOARD_PIXEL_WIDTH = 600;
const BOARD_PIXEL_HEIGHT = 600;

const TILE_WIDTH = 10;
const TILE_HEIGHT = 10;

const startGame = () => {
  const canvas = document.getElementById('snake-canvas');
  canvas.width = BOARD_PIXEL_WIDTH;
  canvas.height = BOARD_PIXEL_HEIGHT;

  const context = canvas.getContext('2d');
  const model = {
    snake: [{ x: 5, y: 17 }, { x: 6, y: 17 }, { x: 7, y: 17 }],
  };

  draw(context, model);
};

const draw = (context, model) => {
  context.fillStyle = '#fdf6e3';
  context.fillRect(TILE_WIDTH, TILE_HEIGHT, BOARD_PIXEL_WIDTH, BOARD_PIXEL_HEIGHT);

  context.fillStyle = '#586e75';
  model.snake.forEach(({ x, y }) => {
    context.fillRect(TILE_WIDTH * x, TILE_HEIGHT * y, TILE_WIDTH, TILE_HEIGHT);
  });
};


window.onload = startGame;
