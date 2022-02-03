import Song from './Songs.js';

class Search{
  constructor(data){
    const thisSearch = this;

    thisSearch.data = data;
    // console.log(thisSearch.data);

    thisSearch.wrapper = document.querySelector('#search');
    thisSearch.songwrapper = thisSearch.wrapper.querySelector('.songs-wrapper');

    thisSearch.initAction();

  }

  initAction(){
    const thisSearch = this;

    thisSearch.button = document.querySelector('.btn-primary');
    thisSearch.formInput = document.querySelector('.search-form input');
    thisSearch.count = document.querySelector('.search-count');
    thisSearch.countText = document.querySelector('.search-text');
    

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