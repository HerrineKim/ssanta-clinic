const gameOverSound = new Audio('./gameOver.mp3');

function playSound(sound: any) {
  sound.currentTime = 0;
  sound.play();
}
export function playGameOverSound() {
  playSound(gameOverSound);
  console.log('playGameOverSound');
}
