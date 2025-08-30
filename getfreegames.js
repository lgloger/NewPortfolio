const api = "https://www.cheapshark.com/api/1.0/deals?storelD=25&upperPrice=0";
import { CLIENT_ID, TOKEN } from "./igdbApi.js";

async function getfreeGames() {
  try {
    const response = await fetch(api);
    const data = await response.json();

    displayFreeEpicGames(data);
  } catch (error) {
    console.error("Error fetching free games:", error);
    return [];
  }
}

async function displayFreeEpicGames(data) {
  const freeGamesList = document.querySelector(".freeGamesList");

  for (let i = 0; i < data.length; i++) {
    const game = data[i];
    let dealID = game.dealID;
    let gameTitle = game.title;
    let gameThumb = game.thumb;
    let normalPrice = game.normalPrice;
    let rating = game.steamRatingText;

    let gameCover = await getGameIcon(gameTitle);

    const gameCard = document.createElement("a");
    gameCard.classList.add("gameCard");
    gameCard.href = `https://www.cheapshark.com/redirect?dealID=${dealID}`;
    gameCard.innerHTML = `
            <img src="${gameThumb}" alt="${gameTitle}" class="gameThumb"/>
            <div class="gameInfo">
                <span class="gameTitle">${gameTitle}</span>
                <div class="InfoText">
                    <span class="normalGamePrice">${normalPrice} $</span>
                    <span class="gameRating"> — ${rating}</span>
                </div>
            </div>
            `;

    freeGamesList.appendChild(gameCard);
  }
}

async function getGameIcon(gameName) {
  async function getGameId(name) {
    const res = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        "Client-ID": CLIENT_ID,
        Authorization: `Bearer ${TOKEN}`,
        Accept: "application/json",
      },
      body: `fields id,name; search "${name}"; limit 1;`,
    });
    const data = await res.json();
    return data[0]?.id;
  }

  async function getGameCover(gameId) {
    const res = await fetch("https://api.igdb.com/v4/covers", {
      method: "POST",
      headers: {
        "Client-ID": CLIENT_ID,
        Authorization: `Bearer ${TOKEN}`,
        Accept: "application/json",
      },
      body: `fields url; where game = ${gameId};`,
    });
    const data = await res.json();
    return data[0]?.url ? `https:${data[0].url}` : null;
  }

  (async () => {
    const gameId = await getGameId(gameName);
    if (!gameId) return console.log("Spiel nicht gefunden");

    const coverUrl = await getGameCover(gameId);
    console.log(coverUrl);
  })();
}

getfreeGames();
