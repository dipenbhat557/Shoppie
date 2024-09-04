package com.kinumna.config;

import graphql.GraphQL;
import graphql.scalars.ExtendedScalars;
import graphql.schema.GraphQLScalarType;
import graphql.schema.GraphQLSchema;
import graphql.schema.idl.RuntimeWiring;
import graphql.schema.idl.SchemaGenerator;
import graphql.schema.idl.SchemaParser;
import graphql.schema.idl.TypeDefinitionRegistry;
import lombok.extern.slf4j.Slf4j;

import java.io.InputStream;
import java.io.IOException;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import com.kinumna.payload.UploadCoercing;

@Slf4j
@Configuration
public class GraphQLConfig {

    @Bean
    public GraphQL graphQL() throws IOException {
        SchemaParser schemaParser = new SchemaParser();
        SchemaGenerator schemaGenerator = new SchemaGenerator();

        // Load the schema file
        ClassPathResource resource = new ClassPathResource("graphql/schema.graphqls");
        try (InputStream inputStream = resource.getInputStream()) {
            TypeDefinitionRegistry typeRegistry = schemaParser.parse(inputStream);

            // Define the custom scalar type
            GraphQLScalarType uploadScalar = GraphQLScalarType.newScalar()
                    .name("Upload")
                    .description("Custom scalar type for file uploads")
                    .coercing(new UploadCoercing())
                    .build();

            log.info("Created upload scalar: {}", uploadScalar);

            // Create RuntimeWiring with custom scalar
            RuntimeWiring runtimeWiring = RuntimeWiring.newRuntimeWiring()
                    .scalar(uploadScalar) // Register the custom scalar
                    .scalar(ExtendedScalars.Date) // Register other scalars if needed
                    .build();

            log.info("Created runtime wiring: {}", runtimeWiring);
            log.info("Registered scalars: {}", runtimeWiring.getScalars());

            // Build the GraphQL schema
            GraphQLSchema graphQLSchema = schemaGenerator.makeExecutableSchema(typeRegistry, runtimeWiring);

            // Return the GraphQL instance
            return GraphQL.newGraphQL(graphQLSchema).build();
        }
    }
}
