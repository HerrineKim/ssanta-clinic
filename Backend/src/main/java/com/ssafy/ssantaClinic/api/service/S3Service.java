package com.ssafy.ssantaClinic.api.service;

import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteBucketRequest;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ssafy.ssantaClinic.common.exception.CustomException;
import com.ssafy.ssantaClinic.common.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
/**
 * @FileName : S3Service
 * @Class 설명 : S3 관련 비즈니스 처리 로직을 위한 서비스 구현 정의
 */
@RequiredArgsConstructor
@Component
@Slf4j
public class S3Service {
    @Value("${cloud.aws.s3.bucket.url}")
    private String defaultUrl;

    @Value("${cloud.aws.s3.bucket.name}") // 프로퍼티에서 cloud.aws.s3.bucket에 대한 정보를 불러옴
    public String bucket;

    @Value("${aws.accessKey}")
    private String key;

    private final AmazonS3Client amazonS3Client;

    public String upload(MultipartFile uploadFile) throws IOException {
        /**
         * @Method Name : upload
         * @Method 설명 : 파일 업로드를 위한 로직
         */
        String origName = uploadFile.getOriginalFilename();
        if(origName.isBlank()){
            throw new CustomException(ErrorCode.FILE_NAME_BLANK_ERROR);
        }
        String url;
            // 확장자를 찾기 위한 코드
            final String ext = origName.substring(origName.lastIndexOf('.'));
            // 파일이름 암호화
            final String saveFileName = getUuid() + ext;
            // 파일 객체 생성
            // System.getProperty => 시스템 환경에 관한 정보를 얻을 수 있다. (user.dir = 현재 작업 디렉토리를 의미함)
            File file = new File(System.getProperty("user.dir") + saveFileName);
        try {
            // 파일 변환
            uploadFile.transferTo(file);
            // S3 파일 업로드
            uploadOnS3(saveFileName, file);
            // 주소 할당
            url = defaultUrl + saveFileName;
        } catch (IOException e) {
            throw new CustomException(ErrorCode.IMAGE_UPLOAD_ERROR);
        }
        // 파일 삭제
        if(!file.delete()){
            throw new CustomException(ErrorCode.FILE_DELETE_ERROR);
        }
        return url;
    }

    public String uploadGlb(MultipartFile uploadFile) throws IOException {
        /**
         * @Method Name : upload
         * @Method 설명 : 파일 업로드를 위한 로직
         */
        String url;
            // 파일이름 암호화
            var saveFileName = getUuid() + ".glb";
            // 파일 객체 생성
            // System.getProperty => 시스템 환경에 관한 정보를 얻을 수 있다. (user.dir = 현재 작업 디렉토리를 의미함)
            File file = new File(System.getProperty("user.dir") + saveFileName);
            saveFileName = "tree/" + saveFileName;
        try {
            // 파일 변환
            uploadFile.transferTo(file);
            // S3 파일 업로드
            uploadOnS3(saveFileName, file);
            // 주소 할당
            url = defaultUrl + saveFileName;
        } catch (IOException e) {
            throw new CustomException(ErrorCode.IMAGE_UPLOAD_ERROR);
        }
        // 파일 삭제
        if(!file.delete()){
            throw new CustomException(ErrorCode.FILE_DELETE_ERROR);
        }
        return url;
    }

    public List<String> uploadImges(List<MultipartFile> multipartFile) throws IOException {
        /**
         * @Method Name : uploadImges
         * @Method 설명 : 이미지 리스트를 한 번에 업로드
         */
        log.info("이미지 업로드 시작");
        List<String> imgUrlList = new ArrayList<>();

        // forEach 구문을 통해 multipartFile로 넘어온 파일들 하나씩 fileNameList에 추가
        for (MultipartFile file : multipartFile) {
            String url = upload(file);
            log.info("이미지 url = "+ url);
            imgUrlList.add(url);
        }
        return imgUrlList;
    }

    private static String getUuid() {
        /**
         * @Method Name : getUuid
         * @Method 설명 : 파일 이름 암호화를 위한 UUID 생성
         */
        return UUID.randomUUID().toString().replaceAll("-", "");
    }

    private void uploadOnS3(final String findName, final File file) {
        /**
         * @Method Name : uploadOnS3
         * @Method 설명 : S3 버킷에 파일 업로드
         */
        amazonS3Client.putObject(new PutObjectRequest(bucket, findName, file)
                .withCannedAcl(CannedAccessControlList.PublicRead));
    }
    public void delete(String imageUrl) {
        /**
         * @Method Name : delete
         * @Method 설명 : S3 버킷에서 파일 삭제
         */
        try {
            final String deleteFileName = "tree/" + imageUrl.substring(imageUrl.lastIndexOf('/')+1);
//            amazonS3Client.deleteObject(this.bucket, deleteFileName);
            amazonS3Client.deleteObject(new DeleteObjectRequest(bucket, deleteFileName));
        } catch (SdkClientException e) {
            e.printStackTrace();
        }
    }
}