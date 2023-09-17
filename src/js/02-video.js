import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const vimeoPlayer = new Player('vimeo-player', {
  id: 236203659,
  width: 640,
});

const storageKey = 'videoPlaybackTime';

const savedTime = localStorage.getItem(storageKey);

if (savedTime !== null) {
  vimeoPlayer.ready().then(() => {
    const seekTime = parseFloat(savedTime);
    if (!isNaN(seekTime)) {
      vimeoPlayer.setCurrentTime(seekTime).then(function(seconds) {
        console.log('Seeked to:', seconds);
      }).catch(function(error) {
        switch (error.name) {
          case 'RangeError':
            console.error('The time was out of range.');
            break;
          default:
            console.error('An error occurred:', error);
            break;
        }
      });
    }
  });
}

vimeoPlayer.on('timeupdate', throttle(() => {
  vimeoPlayer.getDuration().then(function(duration) {
    vimeoPlayer.getCurrentTime().then(function(currentTime) {
      localStorage.setItem(storageKey, currentTime);
    });
  });
}, 500));
