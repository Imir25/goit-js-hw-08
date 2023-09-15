import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const vimeoPlayer = document.getElementById('vimeo-player');
const storageKey = 'videoPlaybackTime';

const savedTime = localStorage.getItem(storageKey);

if (savedTime !== null) {
  const player = new Vimeo(vimeoPlayer);

  player.on('loaded', () => {
    const seekTime = parseFloat(savedTime);
    if (!isNaN(seekTime)) {
      player.setCurrentTime(seekTime)
        .then(function(seconds) {
          console.log('Seeked to:', seconds);
        })
        .catch(function(error) {
          switch (error.name) {
            case 'RangeError':
              console.error('Time was out of range.');
              break;
            default:
              console.error('An error occurred:', error);
              break;
          }
        });
    }
  });
}

vimeoPlayer.addEventListener('timeupdate', () => {
  const player = new Vimeo(vimeoPlayer);

  player.getDuration().then(function(duration) {
    player.getCurrentTime().then(function(currentTime) {
      localStorage.setItem(storageKey, currentTime);
    });
  });
});
