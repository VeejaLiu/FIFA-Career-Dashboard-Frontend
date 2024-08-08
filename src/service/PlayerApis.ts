import axios from 'axios';
import { BACKEND_URL } from '../constant';

export interface PlayerOverall {
  playerID: number;
  playerName: string;
  overallRating: number;
  potential: number;
  age: number;
  positionType: 'GK' | 'DEF' | 'MID' | 'FOR';
  position1: string;
  position2: string;
  position3: string;
  position4: string;
}

export interface PlayerTrend {
  inGameDate: string;
  overallRating: number;
  potential: number;
}

export interface PlayerTrendData {
  playerID: number;
  playerName: string;
  preferredposition1: string;
  positionType: string;
  trends: PlayerTrend[];
}

export class PlayerApis {
  /**
   * Get player list
   */
  static async getPlayerList(): Promise<PlayerOverall[]> {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/player/`);
      if (response.status === 200) {
        return response.data;
      }
      return [];
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  /**
   * Get player count
   */
  static async getPlayerCount(): Promise<number> {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/player/count`);
      if (response.status === 200) {
        return response.data;
      }
      return 0;
    } catch (e) {
      console.log(e);
      return 0;
    }
  }

  /**
   * Get player trends
   */
  static async getPlayerTrends(): Promise<PlayerTrendData[]> {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/player/trends`);
      if (response.status === 200) {
        return response.data;
      }
      return [];
    } catch (e) {
      console.log(e);
      return [];
    }
  }
}
