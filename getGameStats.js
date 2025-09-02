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
  for (let i = 0; i < 65; i++) {
    const game = data.response.ranks[i];

    const rank = game.rank;
    const appId = game.appid;
    const playersPeak = game.peak_in_game;
    const currentPlayers = await getAppCurrentPlayers(appId) || "no data";

    const gameDetails = await getAppDetails(appId);
    const gameName = gameDetails[appId].data.name || "Unknown Game";
    const gameImage = gameDetails[appId].data.capsule_imagev5;

    const mostPlayedSteamTable = document.getElementById("mostPlayedSteamTable");
    const tableContent = document.createElement("tr");
    tableContent.classList.add("tableContent");
    tableContent.innerHTML = `
            <td class="tableContentText tableContentRank">${rank}.</td>
            <td class="tableContentImageCon"><img class="tableContentImage" src="${gameImage}" alt="${gameName}" /></td>
            <td class="tableContentText tableContentName">${gameName}</td>
            <td class="tableContentText tableContentCP">${currentPlayers.toLocaleString()}</td>
            <td class="tableContentText">${playersPeak.toLocaleString()}</td>
        `;

    mostPlayedSteamTable.appendChild(tableContent);
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
