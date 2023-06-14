const axios = require("axios");
require("dotenv").config();

const config = {
  headers: {
    "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
    "X-RapidAPI-Host": "zeus-api1.p.rapidapi.com",
  },
};

const getLeaguesInfo = async () => {
  try {
    const response = await axios.get(
      "https://zeus-api1.p.rapidapi.com/competitions",
      config
    );
    return response.data.competitions;
  } catch (error) {
    return false;
  }
};

const getMatches = async (week, leagueId) => {
  try {
    const response = await axios.get(
      `https://zeus-api1.p.rapidapi.com/competitions/${leagueId}/matches/2022/${week}`,
      config
    );
    return response.data;
  } catch (error) {
    return false;
  }
};

const getStandings = async (league) => {
  try {
    const response = await axios.get(
      `https://zeus-api1.p.rapidapi.com/competitions/${league}/standings/2022`,
      config
    );
    return response.data;
  } catch (error) {
    return false;
  }
};

module.exports = { getLeaguesInfo, getMatches, getStandings };
