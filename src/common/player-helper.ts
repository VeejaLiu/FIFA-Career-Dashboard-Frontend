import { getDefaultGameVersionFromLocalStorage } from './common.ts';

export function getColorByPositionType(positionType: string) {
  switch (positionType) {
    case 'FOR':
      return '#306eff';
    case 'MID':
      return '#268535';
    case 'DEF':
      return '#f7b702';
    case 'GK':
      return '#f87e0b';
  }
  return 'black';
}

export function getColorByOverallRating(overallRating: number) {
  // 40 - #d31332
  // 50 - #d31332
  // 60 - #f7b702
  // 70 - #36b84b
  // 80 - #268535
  // 90 - #268535
  if (overallRating < 50) {
    return '#d31332';
  } else if (overallRating < 60) {
    return '#f7b702';
  } else if (overallRating < 70) {
    return '#36b84b';
  } else if (overallRating < 80) {
    return '#268535';
  } else {
    return '#268535';
  }
}

export function getRankingColor(ranking: number): string {
  switch (ranking) {
    case 1:
      return 'linear-gradient(135deg, rgba(255, 215, 0, 1) 30%, rgba(255, 185, 0, 1) 70%)';
    case 2:
      return 'linear-gradient(135deg, rgba(192, 192, 192, 1) 30%, rgba(169, 169, 169, 1) 70%)';
    case 3:
      return 'linear-gradient(135deg, rgba(205, 127, 50, 1) 30%, rgba(184, 115, 51, 1) 70%)';
    case 4:
      return 'linear-gradient(135deg, rgba(0, 255, 0, 1) 30%, rgba(0, 200, 0, 1) 70%)';
    case 5:
      return 'linear-gradient(135deg, rgba(0, 0, 255, 1) 30%, rgba(0, 0, 200, 1) 70%)';
    case 6:
      return 'linear-gradient(135deg, rgba(255, 0, 0, 1) 30%, rgba(200, 0, 0, 1) 70%)';
    default:
      return 'linear-gradient(135deg, rgba(0, 0, 0, 0.5) 30%, rgba(100, 100, 100, 1) 70%)';
  }
}

export function getAvatarUrl(playerID: number | null | undefined): string {
  const gameVersion = getDefaultGameVersionFromLocalStorage();

  if (!playerID || !gameVersion) {
    return '';
  }
  // playerID example: 158023
  // src example: https://cdn.sofifa.net/players/158/023/24_120.png for FIFA 24
  // src example: https://cdn.sofifa.net/players/158/023/25_120.png for FIFA 25

  const a = playerID.toString().slice(0, 3);
  const b = playerID.toString().slice(3, 6);

  const imageUrl = `https://cdn.sofifa.net/players/${a}/${b}/${gameVersion}_120.png`;

  return imageUrl;
}

export function getWorkRateText(value: number | string | undefined) {
  switch (value) {
    case 0:
    case '0':
      return 'Low';
    case 1:
    case '1':
      return 'Medium';
    case 2:
    case '2':
      return 'High';
    default:
      return 'unknown';
  }
}
