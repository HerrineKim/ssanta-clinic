import axios, { AxiosInstance, Method } from 'axios';
import { API_BASE_URL } from './url';
import { GameApi } from './gameApi';

import { NavigateFunction } from 'react-router';
import { GameReq } from './request/game';
import { SuccessRes } from './response/success';
import { GameRes } from './response/game';
import { ItemsRes, MoneyRes, ShopRes } from './response/main';
import { ItemsReq, MoneyReq, ShopReq } from './request/main';
import { MainApi } from './mainApi';

export interface RequestConfig<R> {
  onSuccess?(data: R): void;
  onFailure?(error: any): void;
  navigate: NavigateFunction;
}

interface Config<P, R> {
  method: Method;
  url: string;
  data?: P;
  onSuccess?(data: R): void;
  onFailure?(error: any): void;
  navigate: NavigateFunction;
}

export class SSantaApi implements GameApi, MainApi {
  private static instance: SSantaApi;
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = this.createAxiosInstance();
  }

  // Avatar API ====================================================================
  async gameResult(
    gameReq: GameReq,
    requestConfig: RequestConfig<GameRes>,
  ): Promise<void> {
    await this.request<GameReq, GameRes>({
      method: 'patch',
      url: `/api/coin`,
      data: gameReq,

      ...requestConfig,
    });
  }

  async money(
    moneyReq: MoneyReq,
    requestConfig: RequestConfig<MoneyRes>,
  ): Promise<void> {
    await this.request<MoneyReq, MoneyRes>({
      method: 'get',
      url: `/api/coin`,
      data: moneyReq,
      ...requestConfig,
    });
  }

  async items(
    itemsReq: ItemsReq,
    requestConfig: RequestConfig<ItemsRes>,
  ): Promise<void> {
    await this.request<ItemsReq, ItemsRes>({
      method: 'get',
      url: `/store/items/${itemsReq.userId}`,
      data: itemsReq,
      ...requestConfig,
    });
  }

  async shop(
    shopReq: ShopReq,
    requestConfig: RequestConfig<ShopRes>,
  ): Promise<void> {
    await this.request<ShopReq, ShopRes>({
      method: 'post',
      url: `/api/store/buy`,
      data: shopReq,
      ...requestConfig,
    });
  }

  static getInstance(): SSantaApi {
    return this.instance || (this.instance = new this());
  }

  login(newToken: string) {
    this.axiosInstance = this.createAxiosInstance(newToken);
  }

  logout() {
    this.axiosInstance = this.createAxiosInstance();
  }

  private async request<P, R>(config: Config<P, R>) {
    const headers: any = {};

    if (localStorage.getItem('jwt')) {
      headers.Authorization = `${localStorage.getItem('jwt')}`;
    }
    const request = async () => {
      try {
        const res: R = (
          await this.axiosInstance.request({
            method: config.method,
            url: config.url,
            data: config.data,
            headers: headers,
          })
        ).data;

        if (config.onSuccess) {
          config.onSuccess(res);
        }
      } catch (error: any) {
        console.log(error);
        const status = error.response.status;

        switch (status) {
          case 401:
            localStorage.removeItem('token');
            config.navigate('/login', { replace: true });
            return;
          case 500 <= status:
            alert('서버에서 알 수 없는 에러가 발생했어요 ㅠ');
            console.log(error);
            return;
        }

        if (config.onFailure) {
          config.onFailure(error);
        }
      }
    };

    await request();
  }

  private createAxiosInstance = (token?: string) => {
    const headers: any = {
      'content-type': 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    } else if (localStorage.getItem('jwt')) {
      headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
    }

    return axios.create({
      baseURL: API_BASE_URL,
      timeout: 1000,
      headers,
    });
  };
}
