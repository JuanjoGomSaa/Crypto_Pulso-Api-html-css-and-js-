// Variables globales 
let coins = [];
let filteredCoins = [];
let isLoading = false;
let isError = false;

const coins_container = document.getElementById('coins_container');
const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd';



// Comprobar conexión 
console.log('CryptoPulse Conectado'); 


async function loadCoins() {
  isLoading = true;
  isError = false; 
  render();
  try{
    const response = await fetch(API_URL);
  
    if(!response.ok){
      throw new Error("API failed");
    }

    const data = await response.json();

    coins = data;
    filteredCoins = data;
    
  }catch(error){
    console.error(error);
    isError = true;
  } finally {
    isLoading = false;
    render();
  }
}

function renderLoading() {
  return '<p>Cargando...</p>';
}

function renderError() {
  return '<p>Error al cargar los datos</p>';
}

function renderEmpty(){
  return '<p>No hay resultados</p>';
}

function renderCoins() {
  return coins.map(coin => 
    ` <div>
        <img src="${coin.image}" alt ="${coin.name}" width="50" />
        <p>${coin.name}</p>
        <p>${coin.current_price}</p>
      </div>`).join("");

}

function render(){

  if(isLoading){
    coins_container.innerHTML = renderLoading();
    return;
  }
  if(isError){
    coins_container.innerHTML = renderError();
    return;
  }

  if(coins.length === 0){
    coins_container.innerHTML = renderEmpty();
    return; 
  }

  coins_container.innerHTML = renderCoins();
}

loadCoins();



