package com.ssafy.ssantaClinic.api.service;

import com.ssafy.ssantaClinic.db.entity.columnEnum.Emotion;

public interface ClovaService {
    Emotion getEmotion(String text);
}
