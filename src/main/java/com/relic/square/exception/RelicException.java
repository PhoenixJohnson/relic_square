package com.relic.square.exception;

import com.ebay.globalenv.util.StringUtils;
import org.ebayopensource.ginger.common.types.ErrorMessage;


public class RelicException extends Exception {

    public final static String DEFAULT_ERROR_CODE = "70001";
    /**
     *
     */
    private static final long serialVersionUID = -8198402697931984140L;

    private ErrorMessage originalError;
    private String errorCode;

    private void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

    public RelicException() {
        super();
    }

    public RelicException(String message) {
        super(message);
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

    public RelicException(String message, ErrorMessage originalError) {
        super(message);
        this.setOriginalError(originalError);
    }

    public ErrorMessage getOriginalError() {
        return originalError;
    }

    public void setOriginalError(ErrorMessage originalError) {
        this.originalError = originalError;
    }

    public String getErrorCode() {
        return StringUtils.isEmpty(this.errorCode) ? getDefaultErrorCode() : this.errorCode;
    }

    protected String getDefaultErrorCode() {
        return DEFAULT_ERROR_CODE;
    }


}
