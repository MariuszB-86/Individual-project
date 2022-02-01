import Song from './Songs.js';

class Discover{
  constructor(data){
    const thisDiscover = this;

    thisDiscover.data = data;
    // console.log('data' ,thisDiscover.data);

    thisDiscover.wrapper = document.querySelector('#discover');
    thisDiscover.songwrapper = thisDiscover.wrapper.querySelector('.songs-wrapper');

    thisDiscover.initAction();
  }

  initAction(){
    const thisDiscover = this;

    thisDiscover.link = document.querySelector('[href = "#discover"]');
    // console.log(thisDiscover.link);

    thisDiscover.link.addEventListener('click', function(){
      for(let item in thisDiscover.data){
        const songsArray = thisDiscover.data[item];
        // console.log('tablica' ,songsArray.length);

        const randomId = Math.round(Math.random() * (songsArray.length - 1) + 1);

        // console.log('wylosowana liczba' ,randomId);

        for(let item of songsArray){
          const songId = item.id;

          if(songId === randomId){
            // console.log('piosenka nr', randomId);
            thisDiscover.songwrapper.innerHTML = '';

            const randomSong = songsArray[songsArray.indexOf(item)];

            new Song(randomId, randomSong, thisDiscover.wrapper);
          }
        }
      }
    });
  }
}

export default Discover;