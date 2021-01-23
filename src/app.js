import axios from 'axios';

export default class App {
  constructor() {
    this.offset = 0;
    this.apikey = '580c186c7ae6504cf764775acdf3bd52';
    this.hash = '91aa9562dd044648a1924c909408a370';
    this.ts = '1610828309';
  }

  getCharacters() {
    const url = `https://gateway.marvel.com/v1/public/characters?apikey=${this.apikey}&hash=${this.hash}&ts=${this.ts}&limit=30&offset=${this.offset}`;

    axios
      .get(url)
      .then(response => {
        this.populate(response.data.data.results);
        this.setPagination(response.data.data.total);
      })
      .catch(error => console.log(error));
  }

  getCharacter(characterId) {
    const url = `https://gateway.marvel.com/v1/public/characters/${characterId}?apikey=${this.apikey}&hash=${this.hash}&ts=${this.ts}`;
  }

  populate(data) {
    document.querySelector('.gridImg').innerHTML = '';

    data.forEach(item => {
      const tr = `<div class="charImg">
                            <a href="#" class="linkIMg"><img src="${item.thumbnail.path}.${item.thumbnail.extension}" title="${item.name}"></a>
                        </div>`;

      document.querySelector('.gridImg').innerHTML += tr;
    });
  }

  setPagination(totalItems) {
    const pages = Math.ceil(totalItems / 30);

    document.querySelector('.pagination').innerHTML = '';

    for (let i = 1; i <= pages; i++) {
      const li = `<li class="page-item"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
      document.querySelector('.pagination').innerHTML += li;

      for (const link of document.getElementsByClassName('page-link')) {
        link.addEventListener('click', event => {
          event.preventDefault();

          const { page } = event.target.dataset;
          this.offset = (parseInt(page) - 1) * 30;
          this.getCharacters();
        });
      }
    }
  }
}
