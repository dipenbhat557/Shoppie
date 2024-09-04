package com.kinumna.payload;

import graphql.schema.GraphQLSchema;
import graphql.schema.idl.RuntimeWiring;
import graphql.schema.idl.SchemaGenerator;
import graphql.schema.idl.TypeDefinitionRegistry;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class CustomSchemaGenerator extends SchemaGenerator {

    @Override
    public GraphQLSchema makeExecutableSchema(TypeDefinitionRegistry typeRegistry, RuntimeWiring runtimeWiring) {
        GraphQLSchema graphQLSchema = super.makeExecutableSchema(typeRegistry, runtimeWiring);
        

        return graphQLSchema;
    }
}