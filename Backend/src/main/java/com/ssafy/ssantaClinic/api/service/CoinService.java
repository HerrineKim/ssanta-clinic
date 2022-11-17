package com.ssafy.ssantaClinic.api.service;

import com.ssafy.ssantaClinic.api.response.CoinResponse;

public interface CoinService {
    CoinResponse earnMoney(int userId, int money);
    CoinResponse getMoneyInfo(int userId);
}
