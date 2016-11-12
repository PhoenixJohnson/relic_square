package com.relic.square.exception;

/**
 * Created by yunjiang on 10/26/16.
 */
public class ValidationException extends RelicException {

    protected String errorCode = "90001";


    public ValidationException(String message, Throwable cause) {
        super(message, cause);
        // TODO Auto-generated constructor stub
    }

    public ValidationException(String message) {
        super(message);
        // TODO Auto-generated constructor stub
    }

    protected String getDefaultErrorCode() {
        return errorCode;
    }
}
