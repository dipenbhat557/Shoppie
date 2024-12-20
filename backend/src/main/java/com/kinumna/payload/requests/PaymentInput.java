package com.kinumna.payload.requests;

import com.kinumna.model.PaymentStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentInput {
    private int amount;
    private PaymentStatus status;
    private String referenceId;
    private String method;
}
