package com.ppx;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan
public class SpringcyhupApplication {
	public static void main(String[] args) {
		SpringApplication.run(SpringcyhupApplication.class, args);
	}
}
