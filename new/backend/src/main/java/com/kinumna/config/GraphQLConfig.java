package com.kinumna.config;

import graphql.GraphQL;
import graphql.scalars.ExtendedScalars;
import graphql.schema.GraphQLScalarType;
import graphql.schema.GraphQLSchema;
import graphql.schema.idl.RuntimeWiring;
import graphql.schema.idl.SchemaParser;
import graphql.schema.idl.TypeDefinitionRegistry;
import lombok.extern.slf4j.Slf4j;

import java.io.InputStream;
import java.io.IOException;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import com.kinumna.payload.CustomSchemaGenerator;
import com.kinumna.payload.UploadCoercing;

@Slf4j
@Configuration
public class GraphQLConfig {

    @Bean
    public GraphQL graphQL() throws IOException {
        SchemaParser schemaParser = new SchemaParser();
        
        GraphQLScalarType uploadScalar = GraphQLScalarType.newScalar()
            .name("Upload")
            .description("Custom scalar type for file uploads")
            .coercing(new UploadCoercing())
            .build();
    
        RuntimeWiring runtimeWiring = RuntimeWiring.newRuntimeWiring()
            .scalar(uploadScalar) // Register the custom scalar
            .scalar(ExtendedScalars.Date)
            .build();
    
        // Load the schema file
        ClassPathResource resource = new ClassPathResource("graphql/schema.graphqls");
        try (InputStream inputStream = resource.getInputStream()) {
            TypeDefinitionRegistry typeRegistry = schemaParser.parse(inputStream);
    
            // Build the GraphQL schema
            CustomSchemaGenerator schemaGenerator = new CustomSchemaGenerator();
            GraphQLSchema graphQLSchema = schemaGenerator.makeExecutableSchema(typeRegistry, runtimeWiring);
    
            // Ensure the Upload scalar is recognized
            if (!typeRegistry.getType("Upload").isPresent()) {
                graphQLSchema = graphQLSchema.transform(builder -> builder.additionalType(uploadScalar));
            }

            // Return the GraphQL instance
            return GraphQL.newGraphQL(graphQLSchema).build();
        }
    }
}