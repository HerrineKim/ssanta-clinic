package com.ssafy.ssantaClinic.api.service;

import com.ssafy.ssantaClinic.db.entity.columnEnum.Emotion;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import javax.print.DocFlavor;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
public class ClovaServiceImpl implements ClovaService {
    private final String REQUEST_URL = "https://naveropenapi.apigw.ntruss.com/sentiment-analysis/v1/analyze";
    private final String HEADER_KEY_ID = "X-NCP-APIGW-API-KEY-ID";
    private final String HEADER_KEY = "X-NCP-APIGW-API-KEY";

    private final String KEY_ID;
    private final String KEY;

    private final RestTemplate restTemplate;
    private final JSONParser jsonParser = new JSONParser();
    private final HttpHeaders headers = new HttpHeaders();

    ClovaServiceImpl(@Value("${X.NCP.APIGW.API.KEY.ID}") String keyId,
                     @Value("${X.NCP.APIGW.API.KEY}") String key) {
        this.KEY_ID = keyId;
        this.KEY = key;
        this.restTemplate = new RestTemplate();

        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.add(HEADER_KEY_ID, KEY_ID);
        headers.add(HEADER_KEY, KEY);
    }

    @Override
    public Emotion getEmotion(String text) {
        Map<String, String> params = new HashMap<>();
        params.put("content", text);

        HttpEntity<Map<String, String>> entity = new HttpEntity<>(params, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(REQUEST_URL, entity, String.class);
        System.out.println(response.toString());

        try {
            JSONObject jsonObj = (JSONObject) jsonParser.parse(response.getBody());
            JSONObject document = (JSONObject) jsonObj.get("document");
            String sentiment = (String) document.get("sentiment");

            switch (sentiment){
                case "positive":
                    return Emotion.Positive;
                case "neutral":
                    return Emotion.Neutral;
                case "negative":
                    return Emotion.Negative;
            }
        } catch (ParseException e) {
            log.error("ClovaService getEmotion error");
        }
        return Emotion.Positive;
    }
}
