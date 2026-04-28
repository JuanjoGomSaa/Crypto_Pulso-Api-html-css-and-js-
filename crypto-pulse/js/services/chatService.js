const historyCache = {};
const MAX_CACHE = 10;

export async function getCoinHistory(coinId) {
  // 1. usar cache si existe
  if (historyCache[coinId]) {
    console.log("Usando cache:", coinId);
    return historyCache[coinId];
  }

  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`
    );

    const data = await res.json();

    // 2. guardar en cache
    historyCache[coinId] = data.prices;

    // 3. aplicar límite (AQUÍ)
    if (Object.keys(historyCache).length > MAX_CACHE) {
      const firstKey = Object.keys(historyCache)[0];
      delete historyCache[firstKey];
    }

    return data.prices;
  } catch (error) {
    console.error("Error fetching history", error);
    return [];
  }
}

function formatChartData(prices) {
  return {
    labels: prices.map(p => {
      const date = new Date(p[0]);
      return date.toLocaleDateString();
    }),
    values: prices.map(p => p[1])
  };
}

export function renderChartInCanvas(canvasId, prices) {
  const canvas = document.getElementById(canvasId);

  if (!canvas) {
    console.error("Canvas no encontrado:", canvasId);
    return;
  }

  const ctx = canvas.getContext("2d");

  const { labels, values } = formatChartData(prices);

  new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          data: values,
          borderWidth: 2,
          tension: 0.3
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      }
    }
  });
}