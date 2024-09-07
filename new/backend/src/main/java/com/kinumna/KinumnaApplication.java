package com.kinumna;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@SpringBootApplication
public class KinumnaApplication {

	public static void main(String[] args) {
		SpringApplication.run(KinumnaApplication.class, args);
	}

	@Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .info(new Info()
            .title("Kinam na")
            .version("1.0")
            .description("API documentation of Kinam na")
            .termsOfService("Terms of service")
            .contact(new io.swagger.v3.oas.models.info.Contact()
                .name("Dipendra Bhatta")
                .url("https://kinamna.com")
                .email("bhattadipen557@gmail.com"))
            .license(new io.swagger.v3.oas.models.info.License()
                .name("License of API")
                .url("API license URL")));
    }
}
