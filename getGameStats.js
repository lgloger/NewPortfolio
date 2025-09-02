const api =
  "https://corsproxy.io/https://api.steampowered.com/ISteamChartsService/GetMostPlayedGames/v1/";

async function getGameStats() {
  try {
    const response = await fetch(api);
    const data = await response.json();

    displayGameStats(data);
  } catch (error) {
    console.error("Error fetching game stats:", error);
  }
}

async function displayGameStats(data) {
  for (let i = 0; i < 50; i++) {
    const game = data.response.ranks[i];

    const rank = game.rank;
    const appId = game.appid;
    const playersPeak = game.peak_in_game;
    const currentPlayers = await getAppCurrentPlayers(appId);

    const gameDetails = await getAppDetails(appId);
    const gameName = gameDetails[appId].data.name || "Unknown Game";
    const gameImage = gameDetails[appId].data.capsule_imagev5;

    const SteamList = document.getElementById("SteamList");
    const gameElement = document.createElement("div");
    gameElement.classList.add("gameElement");
    gameElement.innerHTML = `
            <span class="gameRank">${rank}.</span>
            <div class="gameImageNameContainer">
                <img class="gameImage" src="${gameImage}" alt="${gameName}" />
                <span class="gameName">${gameName}</span>
            </div>
            <div class="gamePlayersContainer">
                <span class="currentPlayers">${currentPlayers.toLocaleString()}</span>
                <span class="gamePlayers">${playersPeak.toLocaleString()}</span>
            </div>
        `;

    SteamList.appendChild(gameElement);
  }
}

async function getAppCurrentPlayers(appId) {
  const api = `https://corsproxy.io/https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${appId}`;

  try {
    const response = await fetch(api);
    const data = await response.json();

    const currentPlayers = data.response.player_count || 0;

    return currentPlayers;
  } catch (error) {
    console.error("Error fetching game data:", error);
  }
}

async function getAppDetails(appId) {
  const api = `https://corsproxy.io/https://store.steampowered.com/api/appdetails?appids=${appId}`;

  try {
    const response = await fetch(api);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching game data:", error);
  }
}

getGameStats();
