import { utils } from './utils.js'; 
import RenderText from './RenderText.js';

class Song{
  constructor(id, data, wrapper){
    const thisSong = this;

    // console.log('id', id);
    // console.log('data', data);

    thisSong.id = id;
    thisSong.data = data;
    // console.log('thisSong.id', thisSong.id);

    thisSong.wrapper = wrapper;

    thisSong.renderPage();
    thisSong.initPlayer();
    thisSong.prepareAuthor();
  }

  renderPage(){
    const thisSong = this;
    // console.log(thisSong.data);
    
    const generatedHTML = Handlebars.compile(document.querySelector('#template-songs').innerHTML)(thisSong.data);
    // console.log(generatedHTML);
    
    thisSong.container = thisSong.wrapper.querySelector('.songs-wrapper');
    // console.log('container', thisSong.container);

    thisSong.element = utils.createDOMFromHTML(generatedHTML);
    // console.log('song.element', thisSong.element);

    const categoriesContainer = thisSong.element.querySelector('.category');
    // console.log('categories' ,categoriesContainer);
    categoriesContainer.innerHTML = thisSong.prepareCategory();

    thisSong.container.appendChild(thisSong.element);
  }

  initPlayer(){
    const thisSong = this;

    // console.log('player', thisSong.element);

    const player = thisSong.element.querySelector('.player');
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

    const author = thisSong.element.querySelector('.author');

    new RenderText(author);
  }
}

export default Song;