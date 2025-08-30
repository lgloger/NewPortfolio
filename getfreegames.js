const api = "https://www.cheapshark.com/api/1.0/deals?storelD=25&upperPrice=0";

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

displayFreeEpicGames = (data) => {
  const freeGamesList = document.querySelector(".freeGamesList");

  for (let i = 0; i < data.length; i++) {
    const game = data[i];
    gameThumb = game.thumb;
    gameTitle = game.title;
    normalPrice = game.normalPrice;
    rating = game.steamRatingText;

    const gameCard = document.createElement("div");
    gameCard.classList.add("gameCard");
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
};

getfreeGames();
