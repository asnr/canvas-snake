import 'normalize.css';

const startGame = () => {
  const canvas = document.getElementById('snake-canvas');
  const context = canvas.getContext('2d');

  context.fillStyle = 'green';
  context.fillRect(10, 10, 150, 100);
};


window.onload = startGame;
