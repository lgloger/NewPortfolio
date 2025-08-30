import fetch from "node-fetch";

export async function handler(event, context) {
  try {
    const { gameName } = JSON.parse(event.body);

    const gameRes = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        "Client-ID": process.env.CLIENT_ID,
        Authorization: `Bearer ${process.env.TOKEN}`,
        Accept: "application/json",
      },
      body: `fields id,name; search "${gameName}"; limit 1;`,
    });

    const gameData = await gameRes.json();
    const gameId = gameData[0]?.id;

    if (!gameId) {
      return {
        statusCode: 200,
        body: JSON.stringify({ coverUrl: null }),
      };
    }

    const coverRes = await fetch("https://api.igdb.com/v4/covers", {
      method: "POST",
      headers: {
        "Client-ID": process.env.CLIENT_ID,
        Authorization: `Bearer ${process.env.TOKEN}`,
        Accept: "application/json",
      },
      body: `fields url; where game = ${gameId};`,
    });

    const coverData = await coverRes.json();
    const coverUrl = coverData[0]?.url ? `https:${coverData[0].url}` : null;

    return {
      statusCode: 200,
      body: JSON.stringify({ coverUrl }),
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: "Server error" }) };
  }
}