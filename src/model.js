import { BOARD_TILE_WIDTH, BOARD_TILE_HEIGHT } from './constants';


export const DIRECTIONS = {
  UP: { x: 0, y: -1 },
};


export const initialModel = {
  direction: DIRECTIONS.UP,
  snake: [{ x: 5, y: 17 }, { x: 6, y: 17 }, { x: 7, y: 17 }],
};


export const updateModel = (model) => {
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
