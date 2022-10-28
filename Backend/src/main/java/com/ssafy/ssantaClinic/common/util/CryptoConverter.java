package com.ssafy.ssantaClinic.common.util;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class CryptoConverter implements AttributeConverter<String, String> {

    @Override
    public String convertToDatabaseColumn(String attribute) {
        if(attribute == null) return null;
        return SEED.encrypt(attribute);
    }

    @Override
    public String convertToEntityAttribute(String dbData) {
        if(dbData == null) return null;
        return SEED.decrypt(dbData);
    }
}
