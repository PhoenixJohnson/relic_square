package com.relic.square.constant;

/**
 * Created by yunjiang on 2016/11/4.
 */
public enum ResponseStatus {

    SUCCESS("0"),FAILED_CAN_RETRY("80000"),FAILED_CAN_NOT_RETRY("90000"),PENDING("10000"),UNKNOWN("-1");

    private String code;
    ResponseStatus(String s) {
        this.code = s;
    }

    public String getCode() {
        return code;
    }
}
