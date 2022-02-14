import Song from './Songs.js';
import {select} from './settings.js';
import { utils } from './utils.js'; 

class Search{
  constructor(data){
    const thisSearch = this;

    thisSearch.data = data;
    // console.log(thisSearch.data);

    thisSearch.prepareFilteredData();
    thisSearch.initWidget();
    thisSearch.getElements();
    thisSearch.initAction();
  }

  getElements(){
    const thisSearch = this;

    thisSearch.dom = {};

    thisSearch.dom.wrapper = document.querySelector(select.containerOf.search);
    thisSearch.dom.songwrapper = thisSearch.dom.wrapper.querySelector(select.containerOf.songs);
    thisSearch.dom.button = document.querySelector(select.search.button);
    thisSearch.dom.formInput = document.querySelector(select.search.input);
    thisSearch.dom.count = document.querySelector(select.search.count);
    thisSearch.dom.countText = document.querySelector(select.search.countText);
    thisSearch.dom.select = document.querySelector('[name = "category"]');
  }

  initAction(){
    const thisSearch = this;

    thisSearch.dom.button.addEventListener('click', function(event){

      thisSearch.showSearchResult(event);

    });
  }

  searchSong(event){
    const thisSearch = this;

    event.preventDefault();

    thisSearch.songMatching = {
      songs: [],
      author: []
    };

    // thisSearch.dom.songwrapper.innerHTML = '';

    for(let item in thisSearch.data){
      const songsArray = thisSearch.data[item];
      // console.log(songsArray);

      for(let item of songsArray){
        const titleSong = item.title;
        const authorSong = item.author;

        const cutTitle = titleSong.split(' ');
        const cutAuthor = authorSong.split(' ');
          
        for(let i = 0; i < cutTitle.length; i++){
          if(cutTitle[i].toLowerCase() === thisSearch.dom.formInput.value.toLowerCase()){
            thisSearch.songMatching.songs.push(songsArray[songsArray.indexOf(item)]);
          }
        }

        for(let i = 0; i < cutAuthor.length; i++){
          if(cutAuthor[i].toLowerCase() === thisSearch.dom.formInput.value.toLowerCase()){
            thisSearch.songMatching.author.push(songsArray[songsArray.indexOf(item)]);
          }
        }
      }
      // console.log(thisSearch.songMatching.songs);

      for(let i of thisSearch.songMatching.songs){
        // console.log(!thisSearch.songMatching.author.includes(i.id));

        thisSearch.resultArray.push(i);
      }
      // console.log(array);

      for(let i of thisSearch.songMatching.author){
        if(!thisSearch.resultArray.includes(i)){

          thisSearch.resultArray.push(i);
        }
      }
      // console.log(array);
    }
  }

  prepareFilteredData(){
    const thisSearch = this;

    thisSearch.filteredCat = [];

    for(let song in thisSearch.data.songs){
      // console.log(thisSearch.data.songs[song].categories);

      for(let cat of thisSearch.data.songs[song].categories){
        // console.log(cat);

        if(!thisSearch.filteredCat.includes(cat)){
          thisSearch.filteredCat.push(cat);
        }
      }
    }

    // console.log(thisSearch.filteredCat);
  }

  searchByCategories(event){
    const thisSearch = this;

    event.preventDefault();

    thisSearch.categoryMatching = {
      songs: [],
    };

    // thisSearch.dom.songwrapper.innerHTML = '';

    for(let item in thisSearch.data){
      const songsArray = thisSearch.data[item];
      // console.log(songsArray);

      for(let item of songsArray){
        const categoriesOfSongs = item.categories;
        // console.log(categoriesOfSongs);
        // console.log(item);

        for(let i = 0; i < categoriesOfSongs.length; i++){
          // console.log(categoriesOfSongs[i]);

          if(thisSearch.dom.select.value.toLowerCase() === categoriesOfSongs[i].toLowerCase()){
            thisSearch.categoryMatching.songs.push(item);
          }
        }
      }
    }
  }

  initWidget(){
    const thisSearch = this;

    const generatedHTML = Handlebars.compile(document.querySelector('#template-search').innerHTML)(thisSearch.filteredCat);
    // console.log(generatedHTML);
    
    thisSearch.container = document.querySelector('.select-category');
    // console.log('container', thisSearch.container);

    thisSearch.element = utils.createDOMFromHTML(generatedHTML);
    // console.log(thisSearch.element);

    thisSearch.container.appendChild(thisSearch.element);
  }

  showSearchResult(event){
    const thisSearch = this;

    thisSearch.dom.songwrapper.innerHTML = '';

    thisSearch.resultArray = [];

    if(thisSearch.dom.formInput.value && !thisSearch.dom.select.value){
      thisSearch.searchSong(event);

    }else if(thisSearch.dom.select.value && !thisSearch.dom.formInput.value){
      thisSearch.searchByCategories(event);

      for(let song in thisSearch.categoryMatching.songs){
        thisSearch.resultArray.push(thisSearch.categoryMatching.songs[song]);
      }

    }else if(thisSearch.dom.formInput.value && thisSearch.dom.select.value){
      thisSearch.searchSong(event);
      thisSearch.searchByCategories(event);

      for(let i of thisSearch.categoryMatching.songs){
        if(!thisSearch.resultArray.includes(i)){

          thisSearch.resultArray.push(i);
        }
      }

    }else{

      for(let song in thisSearch.data.songs){
        thisSearch.resultArray.push(thisSearch.data.songs[song]);
      }

    }

    for(let song of thisSearch.resultArray){
      new Song(song.id, song, thisSearch.dom.wrapper);
    }

    const count = thisSearch.resultArray.length;
    // console.log(count);
    thisSearch.dom.count.innerHTML = count;

    thisSearch.dom.countText.classList.add('active');

  }
  
}

export default Search;