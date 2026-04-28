import { fetchCoins } from "./api/coins.js";
import { state } from "./state/appState.js";
import { renderCoins, renderLoading, renderError } from "./ui/render.js";

const searchInput = document.getElementById("search_input");
state.visibleCount = 10;
function handleSearch(value) {
  const query = value.toLowerCase();

  state.filteredCoins = state.coins.filter((coin) =>
    coin.name.toLowerCase().includes(query)
  );

  if (shouldRender(state.filteredCoins)) {
    renderCoins(state.filteredCoins);
    addFavoriteEvents();

    state.lastRenderedCoins = [...state.filteredCoins];
  }
}

const debouncedSearch = debounce(handleSearch, 300);

function debounce(fn, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

function toggleFavorite(coinId){
  if(state.favorites.includes(coinId)){
    state.favorites = state.favorites.filter((id)=>{
        return id !== coinId;
    });
  }else{
    state.favorites.push(coinId);
  }
  localStorage.setItem('favorites', JSON.stringify(state.favorites));
  renderCoins(state.filteredCoins);
  addFavoriteEvents();
}

function loadFavorites(){
  const data = localStorage.getItem('favorites');
  state.favorites = data ? JSON.parse(data) : [];
}

function addFavoriteEvents() {
  const buttons = document.querySelectorAll('.fav-btn');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const coinId = btn.dataset.id;
      toggleFavorite(coinId);
    });
  });
}

//Funcion de shouldRender

function shouldRender(newCoins) {
  if (state.lastRenderedCoins.length !== newCoins.length) return true;

  return newCoins.some((coin, index) => {
    return coin.id !== state.lastRenderedCoins[index]?.id;
  });
}

async function init() {
  try {
    renderLoading(); //  primero UI

    loadFavorites(); //  carga favoritos

    state.isLoading = true;

    const data = await fetchCoins();

    state.coins = data;
    state.filteredCoins = data;

    renderCoins(state.filteredCoins);
    addFavoriteEvents();

    state.isLoading = false;
  } catch (error) {
    console.error(error);

    state.isError = true;

    renderError(); // usar esto, no renderCoins(data)
  }
}

searchInput.addEventListener("input", (e) => {
  debouncedSearch(e.target.value);
});

init();