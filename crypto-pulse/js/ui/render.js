import { state } from "../state/appState.js";
import { getCoinHistory, renderChartInCanvas} from "../services/chatService.js";

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
  
   //Evento de graficas
  div.addEventListener("click", () => {
   // evitar duplicados
    if (state.openCharts.includes(coin.id)) return;

   state.openCharts.push(coin.id);
   renderOpenCharts();
  });
    
    container.appendChild(div);
  });
}

export async function renderOpenCharts() {
  const container = document.getElementById("charts_container");

  // limpiar
  container.innerHTML = "";

  for (const coinId of state.openCharts) {
    const coin = state.coins.find(c => c.id === coinId);

    const wrapper = document.createElement("div");
    wrapper.classList.add("chart-card");

    wrapper.innerHTML = `
      <div class="chart-header">
        <h3>${coin.name}</h3>
        <button class="close-btn" data-id="${coin.id}">✖</button>
      </div>
      <canvas id="chart-${coin.id}"></canvas>
    `;

    container.appendChild(wrapper);

    // 🔥 traer data
    const prices = await getCoinHistory(coin.id);

    // 🔥 render chart en ese canvas específico
    renderChartInCanvas(`chart-${coin.id}`, prices);
  }

  attachCloseEvents();
}

function attachCloseEvents() {
  const buttons = document.querySelectorAll(".close-btn");

  buttons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.id;

      // remover del estado
      state.openCharts = state.openCharts.filter(c => c !== id);

      renderOpenCharts();
    });
  });
}

