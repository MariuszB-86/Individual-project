import Song from './home.js'; 

const app = {
  initSongs: function(){
    const thisApp = this;

    console.log(thisApp.data);

    for(let song in thisApp.data.songs){
      new Song(thisApp.data.songs[song].id, thisApp.data.songs[song]);
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
        console.log('parsedResponse', parsedResponse);
        

        thisApp.data.songs = parsedResponse;
        console.log('thisApp.data', thisApp.data.songs);

        thisApp.initSongs();
      });

    
    console.log('thisApp.data', thisApp.data);
  },

  init: function(){
    const thisApp = this;

    console.log('*** App starting ***');
    console.log('thisApp:', thisApp);

    thisApp.initData();
    
  },
};

app.init();