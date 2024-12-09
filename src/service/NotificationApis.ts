import { getDefaultGameVersion, getToken } from '../common/common.ts';
import axios from 'axios';
import { BACKEND_URL } from '../constant';
import { Toast } from '@douyinfe/semi-ui';

export interface NotificationBody {
  id: number;
  user_id: number;
  game_version: number;
  in_game_date: string;
  message_type: string;
  message_subtype: string;
  player_id: number;
  old_overall_rating: number | null;
  overall_rating: number | null;
  old_potential: number | null;
  potential: number | null;
  old_skillmoves: number | null;
  skillmoves: number | null;
  old_weakfoot: number | null;
  weakfoot: number | null;
  is_read: number;
  is_deleted: number;
  create_time: string;
  update_time: string;
}

export class NotificationApis {
  /**
   * Get player list
   */
  static async getAllNotifications(): Promise<NotificationBody[]> {
    try {
      const token = getToken();
      const gameVersion = await getDefaultGameVersion();

      const response = await axios.get(
        `${BACKEND_URL}/api/v1/notification/?gameVersion=${gameVersion}`,
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
}
