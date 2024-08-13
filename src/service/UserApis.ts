import axios from 'axios';
import { BACKEND_URL } from '../constant';

export class UserApis {
  /**
   * Register user
   */
  static async registerUser({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/register`, {
        username,
        email,
        password,
      });
      if (response.status === 200) {
        return response.data;
      }
      return '';
    } catch (e) {
      console.log(e);
      return '';
    }
  }

  /**
   * Login user
   */
  static async loginUser({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/login`, {
        username,
        password,
      });
      if (response.status === 200) {
        return response.data;
      }
      return '';
    } catch (e) {
      console.log(e);
      return '';
    }
  }

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
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/secret/refresh`,
        {
          headers: { Accept: '*/*' },
        },
      );
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
