package com.ssafy.ssantaClinic.db.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Type {
    REPLY("산타답장"),
    GIFT("캘린더선물도착");
    private final String type;
}
