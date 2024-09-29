import axios from 'axios';
import { BACKEND_URL } from '../constant';
import { logger } from '@douyinfe/semi-ui/lib/es/table/utils';
import { Notification } from '@douyinfe/semi-ui';
import { getToken, removeToken } from '../common/common.ts';

export class UserApis {
  /**
   * Register user
   */
  static async registerUser({
    username,
    email,
    password,
    confirmPassword,
  }: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/register`, {
        username,
        email,
        password,
        confirmPassword,
      });
      if (response.status !== 200) {
        return {
          success: false,
          message: 'Something went wrong, please try again',
        };
      }
      return response.data;
    } catch (e) {
      console.log(`[registerUser] error: ${e}`);
      return {
        success: false,
        message: 'Something went wrong, please try again',
      };
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
  }): Promise<{
    success: boolean;
    message: string;
    data?: any;
  }> {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/login`, {
        username,
        password,
      });
      console.log(
        `[loginUser] response.data: ${JSON.stringify(response.data)}`,
      );
      return response.data;
    } catch (e: any) {
      console.log(`[loginUser] error message: ${e.message}`);
      return {
        success: false,
        message: 'Something went wrong, please try again',
      };
    }
  }

  /**
   * verify user token
   */
  static async verifyToken(): Promise<boolean> {
    try {
      const token = getToken();

      if (!token) {
        return false;
      }

      // console.log(`[getPlayerList] token: ${token}`);
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/verify-token`,
        {},
        { headers: { token } },
      );
      logger.info(`[verifyToken] response: ${JSON.stringify(response)}`);
      if (response?.status === 200) {
        console.log(
          `[verifyToken] response.data: ${JSON.stringify(response.data)}`,
        );
        return true;
      } else {
        return false;
      }
    } catch (e: any) {
      console.log(`[verifyToken] error.message: ${e.message}`);
      if (e.message === 'Network Error') {
        Notification.error({
          title: 'Network Error',
          content: 'Please check your network connection',
          duration: 10,
        });
      }
      console.log(`[verifyToken] error.status: ${e?.response?.status}`);
      console.log(
        `[verifyToken] error.data: ${JSON.stringify(e?.response?.data)}`,
      );
      return false;
    }
  }

  static async doLogout(): Promise<boolean> {
    try {
      const token = getToken();
      // console.log(`[getPlayerList] token: ${token}`);
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/logout`,
        {},
        {
          headers: {
            Accept: '*/*',
            token: token,
          },
        },
      );
      console.log(`[doLogout] response: ${JSON.stringify(response)}`);
      if (response.status !== 200) {
        return false;
      }
      if (!response.data.success) {
        return false;
      }

      removeToken();
      return true;
    } catch (e) {
      console.log(`[doLogout] error: ${e}`);
      return false;
    }
  }

  /**
   * Get user secret key
   */
  static async getSecretKey(): Promise<string> {
    try {
      const token = getToken();
      // console.log(`[getPlayerList] token: ${token}`);
      const response = await axios.get(`${BACKEND_URL}/api/v1/user/secret`, {
        headers: {
          Accept: '*/*',
          token: token,
        },
      });
      console.log(`[getSecretKey] response: ${JSON.stringify(response)}`);

      if (response.status !== 200) {
        return '';
      }
      if (!response.data.success) {
        return '';
      }
      return response.data.data.secretKey;
    } catch (e) {
      console.log(e);
      return '';
    }
  }

  static async doRefreshSecretKey(): Promise<string> {
    try {
      const token = getToken();
      // console.log(`[getPlayerList] token: ${token}`);
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/secret/refresh`,
        {},
        {
          headers: {
            Accept: '*/*',
            token: token,
          },
        },
      );
      console.log(`[doRefreshSecretKey] response: ${JSON.stringify(response)}`);
      if (response.status !== 200) {
        return '';
      }
      if (!response.data.success) {
        return '';
      }
      return response.data.data.secretKey;
    } catch (e) {
      console.log(`[doRefreshSecretKey] error: ${e}`);
      return '';
    }
  }

  /**
   * Get user setting
   */
  static async getUserSetting(): Promise<{
    success: boolean;
    message: string;
    data?: {
      userId: number | string;
      defaultGameVersion: number;
      enableNotification: boolean;
      notificationItems: {
        PlayerUpdate_Overall: boolean;
        PlayerUpdate_SkillMove: boolean;
        PlayerUpdate_WeakFoot: boolean;
      };
    };
  }> {
    try {
      const token = getToken();
      // console.log(`[getPlayerList] token: ${token}`);
      const response = await axios.get(`${BACKEND_URL}/api/v1/user/setting`, {
        headers: {
          Accept: '*/*',
          token: token,
        },
      });
      console.log(`[getUserSetting] response: ${JSON.stringify(response)}`);

      if (response.status !== 200) {
        return {
          success: false,
          message: 'Failed to fetch user setting',
        };
      }
      if (!response.data.success) {
        return {
          success: false,
          message: 'Failed to fetch user setting',
        };
      }
      return response.data.data;
    } catch (e) {
      console.log(e);
      return {
        success: false,
        message: 'Failed to fetch user setting',
      };
    }
  }

  static async updateUserSetting({
    category,
    subItem,
    value,
  }: {
    category: string;
    subItem?: string;
    value: boolean | number;
  }) {
    try {
      const token = getToken();
      // console.log(`[getPlayerList] token: ${token}`);

      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/setting`,
        {
          category,
          subItem,
          value,
        },
        {
          headers: {
            Accept: '*/*',
            token: token,
          },
        },
      );
      console.log(`[updateUserSetting] response: ${JSON.stringify(response)}`);
      return response.data;
    } catch (e) {
      console.log(`[updateUserSetting] error: ${e}`);
      return {
        success: false,
        message: 'Failed to update user setting',
      };
    }
  }
}
