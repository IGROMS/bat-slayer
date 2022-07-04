const ctx = document.getElementById('canvas').getContext('2d');
const game = new Game(ctx);
const startBtn = document.getElementById('start-button')
const menu = document.getElementById('menu')

window.onload = () => {
  startBtn.onclick = () => {
    menu.classList.add('visibility')
    startBtn.classList.add('visibility')
    game.start()
    audio.Map.play()
  };
};