import { getDefaultGameVersion } from './common.ts';

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

export function getAvatarUrl(playerID: number | null | undefined): string {
  const gameVersion = getDefaultGameVersion();

  if (!playerID) {
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
