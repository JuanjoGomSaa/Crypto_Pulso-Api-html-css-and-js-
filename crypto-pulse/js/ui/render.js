import { state } from "../state/appState.js";
import { getCoinHistory, renderChartInCanvas} from "../services/chatService.js";

export function renderCoins(coins) {
  const container = document.getElementById('coins_container');
  container.innerHTML = '';

  coins.forEach((coin) => {
    const div = document.createElement("div");
    div.classList.add("coin-card");

    const isFav = state.favorites.includes(coin.id);

    // 👉 proteger datos de la API
    const price = coin.current_price
      ? coin.current_price.toLocaleString()
      : "N/A";

    const change = coin.price_change_percentage_24h;
    const formattedChange =
      change !== null && change !== undefined
        ? change.toFixed(2) + "%"
        : "N/A";

    const changeClass =
    change === null || change === undefined
      ? ""
      : change >= 0
      ? "positive"
      : "negative";  

    div.innerHTML = `
      <div class="coin-top">
        <div>
          <h3>${coin.name}</h3>
          <span class="symbol">${coin.symbol.toUpperCase()}</span>
        </div>

        <button class="fav-btn" data-id="${coin.id}">
          ${isFav ? '★' : '☆'}
        </button>
      </div>
    

      <div class="coin-bottom">
        <p class="price">$${price}</p>
        <p class="change ${changeClass}">
          ${formattedChange}
        </p>
      </div>
    `;

    // 👉 abrir gráfico (sin romper botón ⭐)
    div.addEventListener("click", (e) => {
      if (e.target.classList.contains("fav-btn")) return;

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

    //  traer data
    const prices = await getCoinHistory(coin.id);

    //  render chart en ese canvas específico
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

//Render loading

export function renderLoading() {
  const container = document.getElementById('coins_container');
  container.innerHTML = '';

  for (let i = 0; i < 6; i++) {
    const div = document.createElement('div');
    div.classList.add('coin-card', 'skeleton');

    div.innerHTML = `
      <div class="skeleton-line title"></div>
      <div class="skeleton-line"></div>
      <div class="skeleton-line short"></div>
    `;

    container.appendChild(div);
  }
}

// Render error

export function renderError() {
  const container = document.getElementById('coins_container');

  container.innerHTML = `
    <p class="error">Error cargando datos. Intenta de nuevo.</p>
  `;
}