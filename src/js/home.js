import { utils } from './utils.js'; 

class Song{
  constructor(id, data){
    const thisSong = this;

    console.log('id', id);
    console.log('data', data);

    thisSong.id = id;
    thisSong.data = data;

    thisSong.renderPage();
    thisSong.initPlayer();
    

  }

  renderPage(){
    const thisSong = this;
    console.log(thisSong.data);
    
    const generatedHTML = Handlebars.compile(document.querySelector('#template-songs').innerHTML)(thisSong.data);
    console.log(generatedHTML);
    
    thisSong.container = document.querySelector('.main__songs');
    console.log('container', thisSong.container);

    thisSong.element = utils.createDOMFromHTML(generatedHTML);
    console.log('song.element', thisSong.element);

    thisSong.container.appendChild(thisSong.element);
  }

  initPlayer(){
    const thisSong = this;

    console.log('player', thisSong.element);

    const player = thisSong.element.querySelector('.player');
    console.log('player',player);

    // eslint-disable-next-line no-undef
    new GreenAudioPlayer(player);

    
  }

  
}

export default Song;