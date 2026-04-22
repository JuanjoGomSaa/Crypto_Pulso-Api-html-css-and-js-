export function renderCoins(coins) {
  const container = document.getElementById('coins_container');
  
  container.innerHTML = '';

  coins.forEach((coin) =>{
    const div = document.createElement("div");

    div.innerHTML =
    `
      <p>${coin.name}</p>
      <p>$${coin.current_price}</p>
    `;
    
    container.appendChild(div);
  });
}
