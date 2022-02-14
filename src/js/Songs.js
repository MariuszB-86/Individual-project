import { utils } from './utils.js'; 
import RenderText from './RenderText.js';
import {select, templates} from './settings.js';

class Song{
  constructor(id, data, wrapper){
    const thisSong = this;

    // console.log('id', id);
    // console.log('data', data);

    thisSong.id = id;
    thisSong.data = data;
    // console.log('thisSong.id', thisSong.id);

    thisSong.dom = {};
    
    thisSong.dom.wrapper = wrapper;

    thisSong.renderPage();
    thisSong.initPlayer();
    thisSong.prepareAuthor();
  }

  renderPage(){
    const thisSong = this;
    // console.log(thisSong.data);
    
    const generatedHTML = templates.songs(thisSong.data);
    // console.log(generatedHTML);
    
    thisSong.container = thisSong.dom.wrapper.querySelector(select.containerOf.songs);
    // console.log('container', thisSong.container);

    thisSong.element = utils.createDOMFromHTML(generatedHTML);
    // console.log('song.element', thisSong.element);

    const categoriesContainer = thisSong.element.querySelector(select.containerOf.category);
    // console.log('categories' ,categoriesContainer);
    categoriesContainer.innerHTML = thisSong.prepareCategory();

    thisSong.container.appendChild(thisSong.element);
  }

  initPlayer(){
    const thisSong = this;

    // console.log('player', thisSong.element);

    const player = thisSong.element.querySelector(select.player);
    // console.log('player',player);

    // eslint-disable-next-line no-undef
    new GreenAudioPlayer(player);
  }

  prepareCategory(){
    const thisSong = this;

    const arrayLength = thisSong.data.categories.length;
    // console.log(arrayLength);

    const lastItem = thisSong.data.categories[arrayLength -1].toLowerCase();
    // console.log(lastItem);

    thisSong.data.categories.splice(arrayLength - 1, 1, lastItem);
    
    // console.log(thisSong.data.categories);

    const textFromArray = thisSong.data.categories.join(', ');
    // console.log(textFromArray);

    return textFromArray;
  }

  prepareAuthor(){
    const thisSong = this;

    const author = thisSong.element.querySelector(select.songAuthor);

    new RenderText(author);
  }
}

export default Song;