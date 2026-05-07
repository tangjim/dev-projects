/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
package com.jeesite.modules.ticket.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.jeesite.common.entity.DataEntity;
import com.jeesite.common.mybatis.annotation.Column;
import com.jeesite.common.mybatis.annotation.Table;
import com.jeesite.common.mybatis.mapper.query.QueryType;

import java.util.Date;

/**
 * 用户表Entity
 * @author tjm
 * @version 2021-10-09
 */
@Table(name="${_prefix}ticket_seller_user", alias="a", columns={
		@Column(name="user_code", attrName="userCode", label="用户编码", isPK=true),
//		@Column(name="open_id", attrName="openId", label="微信单应用ID"),
//		@Column(name="union_id", attrName="unionId", label="微信应用ID"),
		@Column(name="user_name", attrName="userName", label="用户名", queryType=QueryType.LIKE),
		@Column(name="mobile_phone", attrName="mobilePhone", label="手机号码"),
		@Column(name="password", attrName="password", label="密码"),
		@Column(name="trade_password", attrName="tradePassword", label="交易密码"),
		@Column(name="photo_url", attrName="photoUrl", label="头像地址"),
		@Column(name="nick_name", attrName="nickName", label="昵称", queryType=QueryType.LIKE),
		@Column(name="is_agent", attrName="isAgent", label="是否代理", comment="是否代理:0.否 1.是"),
		@Column(name="is_login", attrName="isLogin", label="用户是否可登录", comment="用户是否可登录(0-正常，1-禁用)"),
		@Column(name="is_withdrawals", attrName="isWithdrawals", label="用户是否可提币 0-正常，1-禁用"),
		@Column(name="is_transaction", attrName="isTransaction", label="用户是否可交易 0-正常，1-禁用"),
		@Column(name="invite_code", attrName="inviteCode", label="用户邀请码"),
		@Column(name="status", attrName="status", label="状态"),
		@Column(name="create_date", attrName="createDate", label="创建时间"),
		@Column(name="update_date", attrName="updateDate", label="修改时间"),
		@Column(name="remarks", attrName="remarks", label="备注", queryType=QueryType.LIKE),
	}, orderBy="a.update_date DESC"
)
public class CustomUser extends DataEntity<CustomUser> {
	
	private static final long serialVersionUID = 1L;
	private String userCode;		// 用户编码
//	private String openId;		// 微信单应用ID
//	private String unionId;		// 微信应用ID
	private String userName;		// 用户名
	private String mobilePhone;		// 手机号码
	private String password;		// 密码
	private String tradePassword;		// 交易密码
	private String photoUrl;		// 头像地址
	private String nickName;		// 昵称
	private Integer isAgent;		// 是否代理:0.否 1.是
	private Integer isLogin;		// 用户是否可登录(0-正常，1-禁用)
	private Integer isWithdrawals;		// 用户是否可提币 0-正常，1-禁用
	private Integer isTransaction;		// 用户是否可交易 0-正常，1-禁用
	private String inviteCode;		// 用户邀请码
	private String status;
	private Date createDate;
	private Date updateDate;
	
	public CustomUser() {
		this(null);
	}

	public CustomUser(String id){
		super(id);
	}
	
	public String getUserCode() {
		return userCode;
	}

	public void setUserCode(String userCode) {
		this.userCode = userCode;
	}
	
//	public String getOpenId() {
//		return openId;
//	}
//
//	public void setOpenId(String openId) {
//		this.openId = openId;
//	}
//
//	public String getUnionId() {
//		return unionId;
//	}
//
//	public void setUnionId(String unionId) {
//		this.unionId = unionId;
//	}
	
	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}
	
	public String getMobilePhone() {
		return mobilePhone;
	}

	public void setMobilePhone(String mobilePhone) {
		this.mobilePhone = mobilePhone;
	}
	
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getTradePassword() {
		return tradePassword;
	}

	public void setTradePassword(String tradePassword) {
		this.tradePassword = tradePassword;
	}
	
	public String getPhotoUrl() {
		return photoUrl;
	}

	public void setPhotoUrl(String photoUrl) {
		this.photoUrl = photoUrl;
	}
	
	public String getNickName() {
		return nickName;
	}

	public void setNickName(String nickName) {
		this.nickName = nickName;
	}
	
	public Integer getIsAgent() {
		return isAgent;
	}

	public void setIsAgent(Integer isAgent) {
		this.isAgent = isAgent;
	}
	
	public Integer getIsLogin() {
		return isLogin;
	}

	public void setIsLogin(Integer isLogin) {
		this.isLogin = isLogin;
	}
	
	public Integer getIsWithdrawals() {
		return isWithdrawals;
	}

	public void setIsWithdrawals(Integer isWithdrawals) {
		this.isWithdrawals = isWithdrawals;
	}
	
	public Integer getIsTransaction() {
		return isTransaction;
	}

	public void setIsTransaction(Integer isTransaction) {
		this.isTransaction = isTransaction;
	}
	
	public String getInviteCode() {
		return inviteCode;
	}

	public void setInviteCode(String inviteCode) {
		this.inviteCode = inviteCode;
	}

	@Override
	public String getStatus() {
		return status;
	}

	@Override
	public void setStatus(String status) {
		this.status = status;
	}

	@Override
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	public Date getCreateDate() {
		return createDate;
	}

	@Override
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	@Override
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	public Date getUpdateDate() {
		return updateDate;
	}

	@Override
	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}
	
}