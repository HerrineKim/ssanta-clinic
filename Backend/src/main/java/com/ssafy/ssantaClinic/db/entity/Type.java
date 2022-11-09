package com.ssafy.ssantaClinic.db.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Type {
    REPLY("산타답장", "letter"),
    GIFT("캘린더선물도착", "calendar");
    private final String type;
    private final String url;
}
