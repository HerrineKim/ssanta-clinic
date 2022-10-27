package com.ssafy.ssantaClinic.config;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.AnonymousAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import io.findify.s3mock.S3Mock;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;

import static org.junit.jupiter.api.Assertions.*;
@TestConfiguration
public class S3ConfigTest {
    @Value("${cloud.aws.region.static}")
    private String region;

    @Value("${cloud.aws.s3.bucket.name}") // 프로퍼티에서 cloud.aws.s3.bucket에 대한 정보를 불러옴
    public String bucket;

    @Bean
    public S3Mock s3Mock() {
        return new S3Mock.Builder().withPort(8080).withInMemoryBackend().build();
    }

    @Bean
    @Primary
    public AmazonS3 amazonS3(S3Mock s3Mock){
        s3Mock.start();
        AwsClientBuilder.EndpointConfiguration endpoint = new AwsClientBuilder.EndpointConfiguration("http://localhost:8080", region);
        AmazonS3 client = AmazonS3ClientBuilder.standard().withPathStyleAccessEnabled(true)
                .withEndpointConfiguration(endpoint)
                .withCredentials(new AWSStaticCredentialsProvider(new AnonymousAWSCredentials()))
                .build();
        client.createBucket(bucket);
        return client;
    }
}