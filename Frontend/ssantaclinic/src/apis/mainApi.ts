import { ItemsReq, MoneyReq, ShopReq } from './request/main';
import { ItemsRes, MoneyRes, ShopRes } from './response/main';
// import { SuccessRes } from './response/success';
import { RequestConfig } from './ssantaApi';

export interface MainApi {
  money(
    moneyReq: MoneyReq,
    requestConfig: RequestConfig<MoneyRes>,
  ): Promise<void>;

  items(
    itemsReq: ItemsReq,
    requestConfig: RequestConfig<ItemsRes>,
  ): Promise<void>;

  shop(shopReq: ShopReq, requestConfig: RequestConfig<ShopRes>): Promise<void>;
}
