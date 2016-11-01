package com.relic.square.domain;

/**
 * Created by Phoenix on 2016/10/30.
 */
public class GenericRequest<T> {

    String requestHeader;

    String key;

    T requestData;

    public String getRequestHeader() {
        return requestHeader;
    }

    public void setRequestHeader(String requestHeader) {
        this.requestHeader = requestHeader;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public T getRequestData() {
        return requestData;
    }

    public void setRequestData(T requestData) {
        this.requestData = requestData;
    }
}
