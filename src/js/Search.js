import Song from './Songs.js';
import {select} from './settings.js';

class Search{
  constructor(data){
    const thisSearch = this;

    thisSearch.data = data;
    // console.log(thisSearch.data);

    thisSearch.wrapper = document.querySelector(select.containerOf.search);
    thisSearch.songwrapper = thisSearch.wrapper.querySelector(select.containerOf.songs);

    thisSearch.initAction();

  }

  initAction(){
    const thisSearch = this;

    thisSearch.button = document.querySelector(select.search.button);
    thisSearch.formInput = document.querySelector(select.search.input);
    thisSearch.count = document.querySelector(select.search.count);
    thisSearch.countText = document.querySelector(select.search.countText);
    

    thisSearch.button.addEventListener('click', function(event){
      event.preventDefault();
      thisSearch.songMatching = {
        songs: [],
        author: []
      };
      thisSearch.songwrapper.innerHTML = '';

      for(let item in thisSearch.data){
        const songsArray = thisSearch.data[item];
        console.log(songsArray);

        for(let item of songsArray){
          const titleSong = item.title;
          const authorSong = item.author;

          const cutTitle = titleSong.split(' ');
          const cutAuthor = authorSong.split(' ');
          
          for(let i = 0; i < cutTitle.length; i++){
            if(cutTitle[i].toLowerCase() === thisSearch.formInput.value.toLowerCase()){
              thisSearch.songMatching.songs.push(songsArray[songsArray.indexOf(item)]);
            }
          }

          for(let i = 0; i < cutAuthor.length; i++){
            if(cutAuthor[i].toLowerCase() === thisSearch.formInput.value.toLowerCase()){
              thisSearch.songMatching.author.push(songsArray[songsArray.indexOf(item)]);
            }
          }
        }
        // console.log(thisSearch.songMatching.songs);

        for(let song in thisSearch.songMatching.songs){
          new Song(thisSearch.songMatching.songs[song].id, thisSearch.songMatching.songs[song], thisSearch.wrapper);
        }

        for(let author in thisSearch.songMatching.author){
          new Song(thisSearch.songMatching.author[author].id, thisSearch.songMatching.author[author], thisSearch.wrapper);
        }

        const count = thisSearch.songMatching.songs.length + thisSearch.songMatching.author.length;
        // console.log(count);
        thisSearch.count.innerHTML = count;

        if(thisSearch.formInput.value || !thisSearch.formInput.value){
          thisSearch.countText.classList.add('active');
        }
        
      }
    });
  }
}

export default Search;