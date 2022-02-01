import Search from './Search.js';
import Song from './Songs.js'; 
import Discover from './Discover.js'; 

const app = {
  initDiscover: function(){
    const thisApp = this;

    new Discover(thisApp.data);
  },
  
  initSearch: function(){
    const thisApp = this;

    // console.log('initSearch', thisApp.data);
    new Search(thisApp.data);
  },

  initPages: function(){
    const thisApp = this;

    thisApp.pages = document.querySelector('#pages').children;
    thisApp.navLinks = document.querySelectorAll('.main__links a');

    // console.log('thisApp.pages', thisApp.pages);
    // console.log('thisApp.navLinks', thisApp.navLinks);

    let pageMatchingHash = thisApp.pages[0].id;
    // console.log('thisApp.pages[0].id', thisApp.pages[0].id);

    window.location.hash = '/' + thisApp.pages[0].id;

    thisApp.activePage(pageMatchingHash);

    for(let link of thisApp.navLinks){
      link.addEventListener('click', function(event){
        const clickedElement = this;
        event.preventDefault();
        // console.log('clickedElement', clickedElement);

        const id = clickedElement.getAttribute('href').replace('#', '');
        // console.log('id', id);

        thisApp.activePage(id);

        window.location.hash = '#/' + id;
      });
    }
  },

  activePage: function(pageId){
    const thisApp = this;

    for(let page of thisApp.pages){
      page.classList.toggle('active', page.id == pageId);
    }

    for(let link of thisApp.navLinks){
      link.classList.toggle('active', link.getAttribute('href') == '#' + pageId);
    }
  },

  initSongs: function(){
    const thisApp = this;

    // console.log(thisApp.data);

    const wrapper = document.querySelector('#home');

    for(let song in thisApp.data.songs){
      // console.log(thisApp.data.songs[song]);
      new Song(thisApp.data.songs[song].id, thisApp.data.songs[song], wrapper);
    }
  },

  initData: function(){
    const thisApp = this;

    thisApp.data = {};

    const url = '//localhost:3131' + '/' + 'songs';
  
    fetch(url)
      .then(function(rawResponse){
        return rawResponse.json();
      })
      .then(function(parsedResponse){
        // console.log('parsedResponse', parsedResponse);
      
        thisApp.data.songs = parsedResponse;
        // console.log('thisApp.data.songs', thisApp.data.songs);

        thisApp.initSongs();
      });
  },

  init: function(){
    const thisApp = this;

    // console.log('*** App starting ***');
    // console.log('thisApp:', thisApp);

    thisApp.initData();
    thisApp.initPages();
    thisApp.initSearch();
    thisApp.initDiscover();
  },
};

app.init();