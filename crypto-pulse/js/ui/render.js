import { state } from "../state/appState.js";

export function renderCoins(coins) {
  const container = document.getElementById('coins_container');
  
  container.innerHTML = '';

  coins.forEach((coin) =>{
    const div = document.createElement("div");
    const isFav = state.favorites.includes(coin.id);
    div.innerHTML =
    `
      <p>${coin.name}</p>
      <p>$${coin.current_price}</p>
      <button data-id="${coin.id}" class="fav-btn">
        ${isFav ? '★' : '☆'}
      </button>
    `;
    
    container.appendChild(div);
  });
}
