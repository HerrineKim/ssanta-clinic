package com.ssafy.ssantaClinic;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class SsantaClinicApplication {

	public static void main(String[] args) {
		SpringApplication.run(SsantaClinicApplication.class, args);
	}

}