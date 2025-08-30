const api =
  "https://corsproxy.io/https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions?locale=de-DE&country=DE&allowCountries=DE";

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

async function displayFreeEpicGames(data) {
  const freeGamesList = document.querySelector(".freeGamesList");

  const games = data?.data?.Catalog?.searchStore?.elements || [];

  for (let i = 0; i < games.length; i++) {
    const game = games[i];

    if (game.promotions == null) {
      continue;
    }

    let status = "";
    let statusClass = "";

    if (game.promotions.upcomingPromotionalOffers.length > 0) {
      status = "UPCOMING";
      statusClass = "upcoming";
    } else {
      status = "FREE NOW";
    }

    let pageSlug =
      game.offerMappings && game.offerMappings.length > 0
        ? game.offerMappings[0]?.pageSlug
        : null;
    let gameCover = game.keyImages[2]?.url || "";
    let gameTitle = game.title;
    let normalPrice = game.price.totalPrice.fmtPrice.originalPrice || "0,00 €";

    const gameCard = document.createElement("a");
    gameCard.classList.add("gameCard");
    gameCard.href = `https://www.epicgames.com/store/de/p/${pageSlug}`;
    gameCard.innerHTML = `
            <div class="fadeOverlay"></div>
            <div class="statusBadge ${statusClass}">${status}</div>
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

getfreeGames();
