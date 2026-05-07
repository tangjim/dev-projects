package com.upload.vo;

public class ResultCode {
    /**
     * 成功
     */
    public static final int SUCCESS = 1000;

    /**
     * 系统错误
     */
    public static final int SYSTEM_ERROR = 2000;

    /**
     * 参数错误
     */
    public static final int PARAM_ERROR = 3000;

    /**
     * 业务错误
     */
    public static final int BUSSNESS_ERROR = 4000;

    /**
     * 验密错误
     */
    public static final int VERIFY_ERROR = 5000;

    /**
     * 重复请求
     */
    public static final int DUPLICATE_ERROR = 6000;
}
