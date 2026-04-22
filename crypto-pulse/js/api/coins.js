
const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd';


export async function fetchCoins() {
    const response = await fetch(API_URL);
    const data = await response.json();

    if(!response.ok){
        throw new Error("API failed");
    }

    return data;
}