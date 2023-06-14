const { getLeaguesInfo, getStandings, getMatches } = require("./fetcher");
const { formatLeagues, formatMatches, formatMatchResult, formatStandings } = require("./format");

const HELLO = "HELLO".toLowerCase();
const INFO = "INFO".toLowerCase();
const STANDINGS = "STANDINGS".toLowerCase();
const WEEK = "WEEK".toLowerCase();
const MATCH = "MATCH".toLowerCase();

const leagueObj = {
  PRL: "Premier League",
  LAL: "LaLiga",
  LI1: "Ligue 1",
  SEA: "Serie A",
  BUN: "Bundesliga",
};

const greetMessage = `
  Hello and welcome to the European Football 2022/23 WhatsApp bot!\n\nYou can get league standings and match reports about the top 5 European leagues for the 2022/23 season\nTo get list of leagues type info
  `;

const selectMatch = (matches, teamName) => {
  return matches.find((match) => {
    const { homeTeam, awayTeam } = match;
    const homeTeamName = homeTeam.name.replace(/-/g, " ").toLowerCase();
    const awayTeamName = awayTeam.name.replace(/-/g, " ").toLowerCase();
    const teamNameStr = teamName.replace(/-/g, " ").toLowerCase();

    if (
      homeTeamName.includes(teamNameStr) ||
      awayTeamName.includes(teamNameStr)
    )
      return match;
  });
};

const parseUserInput = async (body) => {
  if (!body) return greetMessage;
  const messageArr = body.split(" ");

  if (messageArr[0]?.toLowerCase().includes(HELLO)) {
    return greetMessage;
  }

  if (messageArr[0]?.toLowerCase().includes(INFO)) {
    const competitions = await getLeaguesInfo();
    if (!competitions) return "Sorry, we were unable to process this request";
    return formatLeagues(competitions);
  }

  if (messageArr[0]?.toLowerCase().includes(STANDINGS)) {
    const leagueId = messageArr[1]?.trim().toUpperCase();

    if (!leagueId) return "Please specify a league";

    const standings = await getStandings(leagueId);
    if (!standings) return "Sorry, we were unable to process this request";

    return formatStandings(standings);
  }

  if (messageArr[0]?.toLowerCase().includes(WEEK)) {
    const leagueId = messageArr[1]?.trim().toUpperCase();
    const week = messageArr[2]?.trim();

    if (!leagueId) return "Please specify a league";
    if (!week) return "Please specify a week";

    const matches = await getMatches(week, leagueId);
    if (!matches) return "Sorry, we were unable to process this request";

    const leagueName = leagueObj[leagueId.toUpperCase()];
    return formatMatches(matches.matches, matches.round, leagueName);
  }

  if (messageArr[0]?.toLowerCase().includes(MATCH)) {
    const [_, leagueId, week, ...rest] = messageArr;
    const team = rest.join(" ")?.trim();

    if (!leagueId) return "Please specify a league";
    if (!week) return "Please specify a week";
    if (!team) return "Please specify a team";

    const matches = await getMatches(week, leagueId);
    if (!matches) return "Sorry, we were unable to process this request";

    const match = selectMatch(matches.matches, team);

    if (!match) return `This match result was not found`;

    const leagueName = leagueObj[leagueId.toUpperCase()];
    return formatMatchResult(match, matches.round, leagueName);
  }
};

module.exports = { parseUserInput };
