import Song from './Songs.js';

class Search{
  constructor(data){
    const thisSearch = this;

    thisSearch.data = data;
    console.log(thisSearch.data);

    thisSearch.wrapper = document.querySelector('#search');

    // thisSearch.songMatching = [];
    
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

      for(let item in thisSearch.data){
        const songsArray = thisSearch.data[item];
        let count = 0;
        console.log(count);

        for(let item of songsArray){
          const titleSong = item.title;

          const cutTitle = titleSong.split(' ');
          console.log(cutTitle);

          for(let i = 0; i < cutTitle.length; i++){
            console.log(cutTitle[i]);
            if(cutTitle[i].toLowerCase() === thisSearch.formInput.value.toLowerCase()){
              thisSearch.songMatching.songs.push(songsArray[count]);
              console.log(songsArray[count]);
            }
          }
          count++;
        }

        for(let song in thisSearch.songMatching.songs){
          new Song(thisSearch.songMatching.songs[song].id, thisSearch.songMatching.songs[song], thisSearch.wrapper);
        }
      }
    });
  }
}

export default Search;