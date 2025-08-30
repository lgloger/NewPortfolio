// const api = "https://www.cheapshark.com/api/1.0/deals?storelD=25&upperPrice=0";
const api =
  "https://corsproxy.io/https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions?locale=de-DE&country=DE&allowCountries=DE";

// async function getfreeGames() {
//   try {
//     const response = await fetch(api);
//     const data = await response.json();

//     displayFreeEpicGames(data);
//   } catch (error) {
//     console.error("Error fetching free games:", error);
//     return [];
//   }
// }

async function getfreeGames() {
  try {
    const response = await fetch(api);
    const data = await response.json();

    console.log(data);

    displayFreeEpicGames(data);
  } catch (error) {
    console.error("Error fetching free games:", error);
    return [];
  }
}

// async function displayFreeEpicGames(data) {
//   const freeGamesList = document.querySelector(".freeGamesList");

//   for (let i = 0; i < data.length; i++) {
//     const game = data[i];
//     let dealID = game.dealID;
//     let gameTitle = game.title;

//     if (gameTitle === "Lynn , HD WallPaper") {
//       return;
//     }

//     let normalPrice = game.normalPrice;
//     let rating = game.steamRatingText || "N/A";

//     let gameCover = await getGameCovers(gameTitle);

//     const gameCard = document.createElement("a");
//     gameCard.classList.add("gameCard");
//     gameCard.href = `https://www.cheapshark.com/redirect?dealID=${dealID}`;
//     gameCard.innerHTML = `
//             <div class="fadeOverlay"></div>
//             <div class="statusBadge">FREE NOW</div>
//             <img src="${gameCover}" alt="${gameTitle}" class="gameThumb"/>
//             <div class="gameInfo">
//             <span class="gameTitle">${gameTitle}</span>
//             <div class="InfoText">
//             <span class="normalGamePrice">${normalPrice} $</span>
//             <span class="gameRating"> — ${rating}</span>
//             </div>
//             </div>
//             `;

//     freeGamesList.appendChild(gameCard);
//   }
// }

async function displayFreeEpicGames(data) {
  const freeGamesList = document.querySelector(".freeGamesList");

  const games = data?.data?.Catalog?.searchStore?.elements || [];

  for (let i = 0; i < games.length; i++) {
    const game = games[i];

    let gameCover = game.keyImages[2]?.url || "";
    let gameTitle = game.title;
    let normalPrice = game.price.totalPrice.fmtPrice.originalPrice || "0,00 €";

    const gameCard = document.createElement("a");
    gameCard.classList.add("gameCard");
    gameCard.innerHTML = `
            <div class="fadeOverlay"></div>
            <div class="statusBadge">FREE NOW</div>
            <img src="${gameCover}" alt="${gameTitle}" class="gameThumb"/>
            <div class="gameInfo">
            <span class="gameTitle">${gameTitle}</span>
            <div class="InfoText">
            <span class="normalGamePrice">${normalPrice}</span>
            </div>
            </div>
            `;

    freeGamesList.appendChild(gameCard);
  }
}

// async function getGameCovers(gameTitle) {
//   const API_KEY = "f65fe027f8e64638887cae7e3c94d363";
//   const url = `https://corsproxy.io/https://api.rawg.io/api/games?search=${encodeURIComponent(
//     gameTitle
//   )}&key=${API_KEY}`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();

//     return data.results[0].background_image;
//   } catch (error) {
//     console.error("Error fetching game cover:", error);
//     return null;
//   }
// }

getfreeGames();
