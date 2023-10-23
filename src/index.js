import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

axios.defaults.headers.common['x-api-key'] =
  'live_ukaf7WCWiphyZBpVr8MHSCK5EjQVTMyP6XhTB78YHR3nVoEWWjDDb1yJyYB9CW76';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

const elements = {
  select: document.querySelector('.breed-select'),
  div: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

new SlimSelect({
  select: '#slim-select',
});

addClass(elements.error);
addClass(elements.select);

fetchBreeds()
  .then(data => {
    const markup = data
      .map(({ name, id }) => `<option value=${id}>${name}</option>`)
      .join('');

    elements.select.innerHTML = markup;

    removeClass(elements.select);
    addClass(elements.loader);
  })
  .catch(err => {
    console.log(err);

    addClass(elements.loader);
    removeClass(elements.error);
  });

elements.select.addEventListener('change', handlerChoseCat);

function handlerChoseCat(evt) {
  removeClass(elements.loader);
  addClass(elements.div);

  if (!evt.target.classList.contains('breed-select')) {
    return;
  } else {
    const catId = evt.currentTarget.value;

    fetchCatByBreed(catId)
      .then(data => {
        addClass(elements.loader);
        removeClass(elements.div);

        const { name, description, temperament } = data[0].breeds[0];

        createMarkup(data[0].url, name, description, temperament);
      })
      .catch(error => {
        addClass(elements.loader);
        addClass(elements.select);
        removeClass(elements.error);

        console.log(error);
      });
  }
}

function createMarkup(url, name, description, temperament) {
  elements.div.innerHTML = `
          <img src="${url}" alt="${name} " class="cat-icon" width='500'>
          <div class="cat-text-box">
          <h2 class="cat-breed"><b>🐈‍⬛ ${name} </b></h2>
          <p class="cat-descr">${description}</p>
          <p class="cat-temperament"><b>🐾 Temperament</b>: ${temperament}
</p></div>`;
}

function addClass(el) {
  el.classList.add('hidden');
}

function removeClass(el) {
  el.classList.remove('hidden');
}
