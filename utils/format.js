const dayjs = require("dayjs");

const formatLeagues = (competitions) => {
  const leaguesStr = competitions.reduce(
    (accumulator, currentValue, currentIndex) => {
      const { id, name, description } = currentValue;

      return `${accumulator}\n \n${
        currentIndex + 1
      }. ${name} (${id}) - ${description}`;
    },
    ""
  );

  return `
    List of Leagues${leaguesStr}.\n \nTo get league standings for any league follow this format:\nSTANDINGS _league-id_ eg. *STANDINGS PRL*\n \nTo get results for a week in any league follow this format:\nWEEK _league-id_  _week-number_ eg. *WEEK PRL 22*\n \nTo get match details for a game within a week in any league follow this format:\nMATCH _league-id_  _week-number_ _team-name_ eg. *MATCH PRL 22 Manchester City*`;
};

const formatStandings = ({ name, yearStart, yearEnd, standings }) => {
  const standingStr = standings.reduce((accumulator, currentValue) => {
    const { position, team, points, playedGames, wins, draws, loses, goalsFor, goalsAgainst} = currentValue;

    return `${accumulator}\n \n${position}. ${team?.name} - ${points} points - P ${playedGames} W ${wins} / D ${draws} / L ${loses} - GF ${goalsFor} / GA ${goalsAgainst}`;
  }, "");

  return `${name} - ${yearStart}/${yearEnd}\n \nStandings${standingStr}`;
};

const formatMatches = (matches, week, league) => {
  const resultsStr = matches.reduce((accumulator, currentValue) => {
    const { homeTeam, awayTeam, homeGoals, awayGoals } = currentValue;

    return `${accumulator}\n \n${homeTeam.name} ${homeGoals} - ${awayTeam.name} ${awayGoals}`;
  }, "");

  return `${league} - Week ${week}\n \nResults${resultsStr}`;
};

const formatMatchResult = (match, week, league) => {
  const { date, hour, homeTeam, awayTeam, homeGoals, awayGoals, stats } = match;

  const { ballPossessionHome, ballPossessionAway, goalAttemptsHome, goalAttemptsAway, offsidesHome, offsidesAway, foulsHome, foulsAway, totalPassesHome, totalPassesAway, attacksHome, attacksAway } = stats;

  const statsStr = `Possession: ${ballPossessionHome} - ${ballPossessionAway}\nGoal Attempts: ${goalAttemptsHome} - ${goalAttemptsAway}\nOffsides: ${offsidesHome} - ${offsidesAway}\nFouls: ${foulsHome} - ${foulsAway}\nPasses: ${totalPassesHome} - ${totalPassesAway}\nAttacks: ${attacksHome} - ${attacksAway}`;

  const formattedTime = dayjs(`${date}-${hour}`, "DD.MM.YYYY-HH:MM").format(
    "MMM DD YYYY  hh:mma"
  );

  return `${league} - Week ${week}\n \n*${homeTeam.name} ${homeGoals} - ${awayGoals} ${awayTeam.name}*\n \nMatch Date: ${formattedTime}\n \n${statsStr}`;
};

module.exports = { formatLeagues, formatStandings, formatMatches, formatMatchResult };
