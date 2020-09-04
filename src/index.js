const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://rickandmortyapi.com/api/character/';
const final = document.getElementById('finale');
const main = document.querySelector('.Main');

// if (localStorage.getItem('next_fetch') == null) {
//   final.innerText('Ya no hay personajes')
//   main.removeChild($observe);
// }
// } else if (localStorage.getItem('next_fetch') == null) {
//   text = document.createTextNode('Ya no hay personajes');
//   final.textContent.appendChild(text);
//   main.removeChild($observe);
// }

const getData = api => {
  if (localStorage.getItem('next_fetch') !== null) {
    api = localStorage.getItem('next_fetch')
  }
  fetch(api)
    .then(response => response.json())
    .then(response => {
      const characters = response.results;
      const next_fetch = response.info.next;
      localStorage.setItem('next_fetch', next_fetch);
      let output = characters.map(character => {
        return `
      <article class="Card">
        <img src="${character.image}" />
        <h2>${character.name}<span>${character.species}</span></h2>
      </article>
    `
      }).join('');
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = async () => {
  try {
    await getData(API);
    console.log('Carga de datos exitosa');
  } catch (error) {
    console.log(error);
  }
}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);

document.addEventListener("DOMContentLoaded", () => {
  localStorage.removeItem('next_fetch');
})