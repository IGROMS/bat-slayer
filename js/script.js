const ctx = document.getElementById('canvas').getContext('2d');
const game = new Game(ctx);
//const startBtn = document.getElementById('start-button')

/*window.onload = () => {
  startBtn.onclick = () => {
    game.start()
  };
};*/

game.start()