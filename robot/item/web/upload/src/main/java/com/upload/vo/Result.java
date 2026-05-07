package com.upload.vo;

import java.io.Serializable;

public class Result<T> implements Serializable {
    private static final long serialVersionUID = 2829303515605210142L;

    private int code;
    private String message;
    private T data;

    private Result() {
        this.code = ResultCode.SUCCESS;
        this.message = "success";
    }

    private Result(T data) {
        this.data = data;
        this.code = ResultCode.SUCCESS;
        this.message = "success";
    }

    public void success(T data, String message) {
        this.data = data;
        this.code = ResultCode.SUCCESS;
        this.message = message;
    }

    public void success(T data, int code, String message) {
        this.data = data;
        this.code = code;
        this.message = message;
    }

    public void error(String message) {
        this.code = ResultCode.SYSTEM_ERROR;
        this.message = message;
    }

    public void error(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public static <T> Result<T> build(T data) {
        return new Result<T>(data);
    }

    public static <T> Result<T> build() {
        return new Result<T>();
    }

    public int getCode() {
        return code;
    }
    public void setCode(int code) {
        this.code = code;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public T getData() {
        return data;
    }
    public void setData(T data) {
        this.data = data;
    }

    public static boolean isSuccess(Result result) {
        return null != result && result.code==ResultCode.SUCCESS;
    }
}
