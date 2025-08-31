import { tagsToGenre } from "./epicTagsID.js";

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

    let upcomingDate = "";

    if (game.promotions.upcomingPromotionalOffers.length > 0) {
      status = "UPCOMING";
      statusClass = "upcoming";
      let date =
        game.promotions.upcomingPromotionalOffers[0].promotionalOffers[0]
          .startDate;
      let dateObj = new Date(date);

      upcomingDate = dateObj.toLocaleString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
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

    let tags = game.tags;
    let genres = tags.map((tag) => tagsToGenre.get(tag.id)).filter(Boolean);
    let genresText = genres.join(", ") || "–";

    const gameCard = document.createElement("a");
    gameCard.classList.add("gameCard");
    gameCard.href = `https://www.epicgames.com/store/de/p/${pageSlug}`;
    gameCard.innerHTML = `
            <div class="fadeOverlay"></div>
            <div class="statusBadge ${statusClass}">${status}</div>
            <img src="${gameCover}" alt="${gameTitle}" class="gameThumb"/>
            <div class="gameInfo">
              <span class="gameTitle">${gameTitle}</span>
              <span class="gameGenres">${genresText}</span>
            <div class="InfoText">
              <span class="normalGamePrice">${normalPrice}</span>
              <span class="gameDate">${upcomingDate}</span>
            </div>
            </div>
            `;

    freeGamesList.appendChild(gameCard);
  }
}

getfreeGames();
