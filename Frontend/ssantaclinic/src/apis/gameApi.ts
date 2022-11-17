import { GameReq } from './request/game';
import { GameRes } from './response/game';
import { RequestConfig } from './ssantaApi';
// import { SuccessRes } from './response/success';

export interface GameApi {
  gameResult(
    gameReq: GameReq,
    requestConfig: RequestConfig<GameRes>,
  ): Promise<void>;
}
