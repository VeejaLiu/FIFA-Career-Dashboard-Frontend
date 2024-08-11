import axios from 'axios';
import { BACKEND_URL } from '../constant';

export class UserApis {
  /**
   * Get user secret key
   */
  static async getSecretKey(): Promise<string> {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/v1/user/secret-key`,
        { headers: { Accept: '*/*' } },
      );
      if (response.status === 200) {
        return response.data;
      }
      return '';
    } catch (e) {
      console.log(e);
      return 'defaule-secret-key-111111';
    }
  }

  static async doRefreshSecretKey(): Promise<string> {
    try {
      const [response] = await Promise.all([
        axios.post(`${BACKEND_URL}/api/v1/user/refresh-secret-key`, {
          headers: { Accept: '*/*' },
        }),
      ]);
      if (response.status === 200) {
        return response.data;
      }
      return '';
    } catch (e) {
      console.log(e);
      return 'updated-secret-key-222222';
    }
  }
}
