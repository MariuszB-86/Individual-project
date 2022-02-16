export const select = {
  templateOf: {
    songs: '#template-songs',
    categories: '#template-categories',
    search: '#template-search',
  },
  containerOf: {
    songs: '.songs-wrapper',
    category: '.category',
    pages: '#pages',
    home: '#home',
    search: '#search',
    discover: '#discover',
    subscribe: '.subscribe',
    categoriesList: '.categories-list',
    categoriesLinks: '.categories-links',
    searchSelect: '.select-category',
  },
  element: {
    splashTitle: '.splash__title',
    textLinks: '.main__links li a',
    subscribeTitle: '.subscribe__header__title',
    subscribeTitleSecond: '.title-style',
    descriptionTitle: '.subscribe__description__title',
    subscribeButton: '.btn-secondary',
    searchTitle: '.search-title',
    searchButton: '.btn-primary',
    searchSelect: '[name = "category"]',
    discoverTitle: '.discover-title'
  },
  search: {
    button: '.btn-primary',
    input: '.search-form input',
    count: '.search-count',
    countText: '.search-text',
  },
  player: '.player',
  songAuthor: '.author',
};

export const classNames = {
  pages: 'active',
};

export const settings = {
  url: '//' + window.location.hostname + (window.location.hostname=='localhost' ? ':3131' : ''),
  songs: 'songs',
};

export const templates = {
  songs: Handlebars.compile(document.querySelector(select.templateOf.songs).innerHTML),
  categories: Handlebars.compile(document.querySelector(select.templateOf.categories).innerHTML),
  searchSelect: Handlebars.compile(document.querySelector(select.templateOf.search).innerHTML),
};