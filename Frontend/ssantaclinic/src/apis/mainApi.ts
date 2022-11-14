import { ItemsReq, MoneyReq } from './request/main';
import { ItemsRes, MoneyRes } from './response/main';
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
}
