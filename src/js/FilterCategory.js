import { utils } from './utils.js'; 
import Song from './Songs.js'; 
import {select, templates} from './settings.js';

class FilterCategory{
  constructor(data){
    const thisFilter = this;

    thisFilter.data = data;
    // console.log(thisFilter.data);

    thisFilter.filteredCat = [];

    for(let song in thisFilter.data.songs){
      // console.log(thisFilter.data.songs[song].categories);

      for(let cat of thisFilter.data.songs[song].categories){
        // console.log(cat);

        if(!thisFilter.filteredCat.includes(cat)){
          thisFilter.filteredCat.push(cat);
        }
      }
    }

    // console.log(thisFilter.filteredCat);
    thisFilter.renderPage();
    thisFilter.filterSongs();
  }

  renderPage(){
    const thisFilter = this;
    // console.log(thisSong.data);
    
    const generatedHTML = templates.categories(thisFilter.filteredCat);
    // console.log(generatedHTML);
    
    thisFilter.container = document.querySelector(select.containerOf.categoriesList);
    // console.log('container', thisSong.container);

    thisFilter.element = utils.createDOMFromHTML(generatedHTML);
    // // console.log('song.element', thisSong.element);

    thisFilter.container.appendChild(thisFilter.element);
  }

  filterSongs(){
    const thisFilter = this;


    const categoriesList = document.querySelector(select.containerOf.categoriesLinks);
    const wrapper = document.querySelector(select.containerOf.home);

    // console.log(categoriesList);

    categoriesList.addEventListener('click', function(event){
      // console.log(event.target);

      thisFilter.obj = {
        songs: [],
      };

      const clickedElement = event.target.nodeName;
      // console.log(clickedElement);

      const songsContainer = wrapper.querySelector(select.containerOf.songs);
      // console.log(songsContainer);

      songsContainer.innerHTML = '';

      if(clickedElement === 'A' && !event.target.classList.contains('active')){

        const activeLink = categoriesList.querySelector('.active');

        if(activeLink){
          activeLink.classList.remove('active');
        }
        
        event.target.classList.add('active');

        const nameCategory = event.target.getAttribute('href').replace('#', '');
        // console.log('nameCategory', nameCategory);

        for(let song in thisFilter.data.songs){
          // console.log(thisFilter.data.songs[song]);

          for(let cat of thisFilter.data.songs[song].categories){
            // console.log(cat);

            if(cat.toLowerCase() === nameCategory.toLowerCase()){
              thisFilter.obj.songs.push(thisFilter.data.songs[song]);
            }
          }
        }
        // console.log(thisFilter.obj);

        for(let song in thisFilter.obj.songs){
          // console.log(thisApp.data.songs[song]);
          new Song(thisFilter.obj.songs[song].id, thisFilter.obj.songs[song], wrapper);
        }
      }else{
        event.target.classList.remove('active');
      
        for(let song in thisFilter.data.songs){
          // console.log(thisApp.data.songs[song]);
          new Song(thisFilter.data.songs[song].id, thisFilter.data.songs[song], wrapper);
        }
      }
    });
  }
}

export default FilterCategory;