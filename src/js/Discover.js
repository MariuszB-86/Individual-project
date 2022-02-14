import Song from './Songs.js';
import {select} from './settings.js';

class Discover{
  constructor(data){
    const thisDiscover = this;

    thisDiscover.data = data;
    // console.log('data' ,thisDiscover.data);

    thisDiscover.getElements();
    thisDiscover.initAction();
  }

  getElements(){
    const thisDiscover = this;

    thisDiscover.dom = {};

    thisDiscover.dom.wrapper = document.querySelector(select.containerOf.discover);
    thisDiscover.dom.songwrapper = thisDiscover.dom.wrapper.querySelector(select.containerOf.songs);
    thisDiscover.dom.link = document.querySelector('[href = "#discover"]');

  }

  initAction(){
    const thisDiscover = this;

    thisDiscover.dom.link.addEventListener('click', function(){

      thisDiscover.randomSong();
      
    });
  }

  randomSong(){
    const thisDiscover = this;

    for(let item in thisDiscover.data){
      const songsArray = thisDiscover.data[item];
      // console.log('tablica' ,songsArray.length);

      const randomId = Math.round(Math.random() * (songsArray.length - 1) + 1);

      // console.log('wylosowana liczba' ,randomId);

      for(let item of songsArray){
        const songId = item.id;

        if(songId === randomId){
          // console.log('piosenka nr', randomId);
          thisDiscover.dom.songwrapper.innerHTML = '';

          const randomSong = songsArray[songsArray.indexOf(item)];

          new Song(randomId, randomSong, thisDiscover.dom.wrapper);
        }
      }
    }
  }
}

export default Discover;