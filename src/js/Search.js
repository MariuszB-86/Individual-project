import Song from './Songs.js';

class Search{
  constructor(data){
    const thisSearch = this;

    thisSearch.data = data;

    thisSearch.wrapper = document.querySelector('#search');
    thisSearch.songwrapper = thisSearch.wrapper.querySelector('.songs-wrapper');

    thisSearch.initAction();

  }

  initAction(){
    const thisSearch = this;

    thisSearch.button = document.querySelector('.btn-primary');
    thisSearch.formInput = document.querySelector('.search-form input');
    

    thisSearch.button.addEventListener('click', function(event){
      event.preventDefault();
      thisSearch.songMatching = {
        songs: []
      };
      thisSearch.songwrapper.innerHTML = '';

      for(let item in thisSearch.data){
        const songsArray = thisSearch.data[item];

        for(let item of songsArray){
          const titleSong = item.title;

          const cutTitle = titleSong.split(' ');

          for(let i = 0; i < cutTitle.length; i++){
            if(cutTitle[i].toLowerCase() === thisSearch.formInput.value.toLowerCase()){
              thisSearch.songMatching.songs.push(songsArray[songsArray.indexOf(item)]);
            }
          }
        }
        console.log(thisSearch.songMatching.songs);

        for(let song in thisSearch.songMatching.songs){
          new Song(thisSearch.songMatching.songs[song].id, thisSearch.songMatching.songs[song], thisSearch.wrapper);
        }
      }
    });
  }
}

export default Search;