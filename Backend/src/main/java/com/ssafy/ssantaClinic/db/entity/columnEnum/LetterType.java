package com.ssafy.ssantaClinic.db.entity.columnEnum;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;

@Getter
public enum LetterType {
    WORK("WORK"), STUDY("STUDY"), CHRISTMAS("CHRISTMAS");

    private final String value;

    LetterType(String value) {
        this.value = value;
    }
    @JsonCreator(mode = JsonCreator.Mode.DELEGATING)
    public static LetterType from(String value) {
        for (LetterType status : LetterType.values()) {
            if (status.getValue().equals(value)) {
                return status;
            }
        }
        return null;
    }

    @JsonValue
    public String getValue() {
        return value;
    }
}
