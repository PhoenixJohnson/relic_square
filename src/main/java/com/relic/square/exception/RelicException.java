package com.relic.square.exception;


import org.springframework.util.StringUtils;

public class RelicException extends Exception {

    public final static String DEFAULT_ERROR_CODE = "70001";
    /**
     *
     */
    private static final long serialVersionUID = -8198402697931984140L;


    private String errorCode;

    private void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

    public RelicException() {
        super();
    }


    public RelicException(String message, Throwable cause) {
        super(message, cause);
    }

    public RelicException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
    }

    public RelicException(Throwable cause, String errorCode) {
        super(cause);
        this.errorCode = errorCode;
    }

    public RelicException(String message) {
        super(message);
    }



    public String getErrorCode() {
        return StringUtils.isEmpty(this.errorCode) ? getDefaultErrorCode() : this.errorCode;
    }

    protected String getDefaultErrorCode() {
        return DEFAULT_ERROR_CODE;
    }


}
