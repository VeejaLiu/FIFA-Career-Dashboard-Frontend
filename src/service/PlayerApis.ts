import axios from 'axios';
import { BACKEND_URL } from '../constant';
import { Toast } from '@douyinfe/semi-ui';

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
  imageUrl?: string;
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

export class PlayerModel {
  public id!: number;
  public user_id!: number;
  public save_id!: number | null;
  public player_id!: number | null;
  public player_name!: string | null;
  public birthdate!: number | null;
  public age!: number | null;
  public overallrating!: number | null;
  public potential!: number | null;
  public nationality!: string | null;
  public height!: number | null;
  public weight!: number | null;
  public preferredfoot!: string | null;
  public preferredposition1!: string | null;
  public preferredposition2!: string | null;
  public preferredposition3!: string | null;
  public preferredposition4!: string | null;
  public skillmoves!: number | null;
  public weakfootabilitytypecode!: number | null;
  public attackingworkrate!: string | null;
  public defensiveworkrate!: string | null;
  public acceleration!: number | null;
  public sprintspeed!: number | null;
  public positioning!: number | null;
  public finishing!: number | null;
  public shotpower!: number | null;
  public longshots!: number | null;
  public volleys!: number | null;
  public penalties!: number | null;
  public vision!: number | null;
  public crossing!: number | null;
  public freekickaccuracy!: number | null;
  public shortpassing!: number | null;
  public longpassing!: number | null;
  public curve!: number | null;
  public agility!: number | null;
  public balance!: number | null;
  public reactions!: number | null;
  public ballcontrol!: number | null;
  public dribbling!: number | null;
  public composure!: number | null;
  public interceptions!: number | null;
  public headingaccuracy!: number | null;
  public defensiveawareness!: number | null;
  public standingtackle!: number | null;
  public slidingtackle!: number | null;
  public jumping!: number | null;
  public stamina!: number | null;
  public strength!: number | null;
  public aggression!: number | null;
  public gkdiving!: number | null;
  public gkhandling!: number | null;
  public gkkicking!: number | null;
  public gkpositioning!: number | null;
  public gkreflexes!: number | null;
  public is_archived!: number;
  public is_deleted!: boolean;
  public create_time!: Date;
  public update_time!: Date;
}

export interface PlayerDetail {
  allPlayer: PlayerOverall[];
  thisPlayer: PlayerModel;
  trends: PlayerTrend[];
}

export class PlayerApis {
  /**
   * Get player list
   */
  static async getPlayerList(): Promise<PlayerOverall[]> {
    try {
      const token = localStorage.getItem('fcd-token');
      // console.log(`[getPlayerList] token: ${token}`);
      const response = await axios.get(`${BACKEND_URL}/api/v1/player/`, {
        headers: {
          Accept: '*/*',
          token: token,
        },
      });
      if (response.status === 200) {
        return response.data;
      }
      return [];
    } catch (e: any) {
      console.log(`[getPlayerList] error code: ${e.response.status}`);
      console.log(`[getPlayerList] error message: ${e.message}`);
      if (e.response.status === 401) {
        Toast.error('Please login first');
      }
      return [];
    }
  }

  /**
   * Get player detail
   */
  static async getPlayerDetail({
    playerID,
  }: {
    playerID?: number;
  }): Promise<PlayerDetail | null> {
    try {
      const token = localStorage.getItem('fcd-token');
      const response = await axios.get(
        `${BACKEND_URL}/api/v1/player/detail/${playerID || 0}`,
        {
          headers: {
            Accept: '*/*',
            token: token,
          },
        },
      );
      if (response.status === 200) {
        return response.data;
      }
      return null;
    } catch (e: any) {
      console.log(`[getPlayerDetail] error code: ${e.response.status}`);
      console.log(`[getPlayerDetail] error message: ${e.message}`);
      if (e.response.status === 401) {
        Toast.error('Please login first');
      }
      return null;
    }
  }

  /**
   * Get player count
   */
  static async getPlayerCount(): Promise<number> {
    try {
      const token = localStorage.getItem('fcd-token');
      const response = await axios.get(`${BACKEND_URL}/api/v1/player/count`, {
        headers: { Accept: '*/*', token: token },
      });
      if (response.status === 200) {
        return response.data;
      }
      return 0;
    } catch (e: any) {
      console.log(`[getPlayerCount] error code: ${e.response.status}`);
      console.log(`[getPlayerCount] error message: ${e.message}`);
      if (e.response.status === 401) {
        Toast.error('Please login first');
      }
      return 0;
    }
  }

  /**
   * Get player trends
   */
  static async getPlayerTrends(): Promise<PlayerTrendData[]> {
    try {
      const token = localStorage.getItem('fcd-token');
      const response = await axios.get(`${BACKEND_URL}/api/v1/player/trends`, {
        headers: { Accept: '*/*', token: token },
      });
      if (response.status === 200) {
        return response.data;
      }
      return [];
    } catch (e: any) {
      console.log(`[getPlayerCount] error code: ${e.response.status}`);
      console.log(`[getPlayerCount] error message: ${e.message}`);
      if (e.response.status === 401) {
        Toast.error('Please login first');
      }
      return [];
    }
  }
}
