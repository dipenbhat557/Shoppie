package com.kinumna.payload;

import graphql.schema.Coercing;
import graphql.schema.CoercingParseValueException;
import graphql.schema.CoercingSerializeException;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
public class UploadCoercing implements Coercing<MultipartFile, String> {

    @Override
    public String serialize(Object dataFetcherResult) {
        throw new CoercingSerializeException("Upload is an input-only type and cannot be serialized");
    }

    @Override
    public MultipartFile parseValue(Object input) {
        if (input instanceof MultipartFile) {
            return (MultipartFile) input;
        }
        throw new CoercingParseValueException("Expected MultipartFile but was " + input.getClass().getName());
    }

    @Override
    public MultipartFile parseLiteral(Object input) {
        throw new CoercingParseValueException("Upload is an input-only type and cannot be parsed from literals");
    }
}
