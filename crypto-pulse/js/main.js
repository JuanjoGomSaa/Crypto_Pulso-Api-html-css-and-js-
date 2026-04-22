import { fetchCoins } from "./api/coins.js";
import { state } from "./state/appState.js";
import { renderCoins } from "./ui/render.js";


const searchInput = document.getElementById("search-input");

function handleSearch(event) {
  const query = event.target.value.toLowerCase();

  state.filteredCoins = state.coins.filter((coin) =>
    coin.name.toLowerCase().includes(query)
  );
  console.log("Jj");
  renderCoins(state.filteredCoins);
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

async function init() {
  try {
    state.isLoading = true; 

    const data = await fetchCoins();

    state.coins = data;
    state.filteredCoins = data;

    renderCoins(state.filteredCoins);

    state.isLoading = false;
  }catch(error){
    state.isError = true;
    console.error(error);
  }
}

searchInput.addEventListener("input", debouncedSearch);

init();