import Search from './components/Search.js';
import Song from './components/Songs.js'; 
import Discover from './components/Discover.js'; 
import RenderText from './components/RenderText.js'; 
import FilterCategory from './components/FilterCategory.js'; 
import {classNames, select, settings} from './settings.js';

const app = {
  initFilterCategory: function(){
    const thisApp = this;
    // console.log(thisApp.data);

    new FilterCategory(thisApp.data);
  },

  initRenderText: function(){
    const thisApp = this;

    thisApp.dom = {};

    thisApp.dom.splashTitle = document.querySelector(select.element.splashTitle);
    thisApp.textLinks = document.querySelectorAll(select.element.textLinks);
    thisApp.dom.textLinks = Array.from(thisApp.textLinks);
    thisApp.dom.subscribeTitle = document.querySelector(select.element.subscribeTitle);
    thisApp.dom.subscribeTitleSecond = document.querySelector(select.element.subscribeTitleSecond);
    thisApp.dom.descriptionTitle = document.querySelector(select.element.descriptionTitle);
    thisApp.dom.subscribeButton = document.querySelector(select.element.subscribeButton);
    thisApp.dom.searchTitle = document.querySelector(select.element.searchTitle);
    thisApp.dom.searchButton = document.querySelector(select.element.searchButton);
    thisApp.dom.discoverTitle = document.querySelector(select.element.discoverTitle);

    for(let item in thisApp.dom){
      const renderDom = thisApp.dom[item];

      if(Array.isArray(renderDom)){
        for(let link of renderDom){
          new RenderText(link);
        }
      }else{
        new RenderText(renderDom);
      }
    }  
  },

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
    
    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.element.textLinks);
    thisApp.subscribeSection = document.querySelector(select.containerOf.subscribe);

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
        console.log('id', id);

        thisApp.activePage(id);

        window.location.hash = '#/' + id;

        if(id === 'home'){
          thisApp.subscribeSection.classList.add(classNames.pages);
        }else{
          thisApp.subscribeSection.classList.remove(classNames.pages);
        }
      });
    }
  },

  activePage: function(pageId){
    const thisApp = this;

    for(let page of thisApp.pages){
      page.classList.toggle(classNames.pages, page.id == pageId);
    }

    for(let link of thisApp.navLinks){
      link.classList.toggle(classNames.pages, link.getAttribute('href') == '#' + pageId);
    }
  },

  initSongs: function(){
    const thisApp = this;
    
    // console.log(thisApp.data);

    const wrapper = document.querySelector(select.containerOf.home);

    for(let song in thisApp.data.songs){
      // console.log(thisApp.data.songs[song]);
      new Song(thisApp.data.songs[song].id, thisApp.data.songs[song], wrapper);
    }
  },

  initData: function(){
    const thisApp = this;
    
    thisApp.data = {};

    const url = '//' + settings.url + '/' + settings.songs;
  
    fetch(url)
      .then(function(rawResponse){
        return rawResponse.json();
      })
      .then(function(parsedResponse){
        // console.log('parsedResponse', parsedResponse);
      
        thisApp.data.songs = parsedResponse;
        // console.log('thisApp.data.songs', thisApp.data.songs);
        thisApp.initSearch();
        thisApp.initFilterCategory();
        thisApp.initSongs();
      });
  },

  init: function(){
    const thisApp = this;

    // console.log('*** App starting ***');
    // console.log('thisApp:', thisApp);
    
    thisApp.initData();
    thisApp.initPages();
    thisApp.initDiscover();
    thisApp.initRenderText();
  },
};

app.init();