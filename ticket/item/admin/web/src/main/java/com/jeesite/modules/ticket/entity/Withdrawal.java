/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
package com.jeesite.modules.ticket.entity;

import org.hibernate.validator.constraints.Length;
import java.math.BigDecimal;
import com.jeesite.common.mybatis.annotation.JoinTable;
import com.jeesite.common.mybatis.annotation.JoinTable.Type;
import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;

import com.jeesite.common.entity.DataEntity;
import com.jeesite.common.mybatis.annotation.Column;
import com.jeesite.common.mybatis.annotation.Table;
import com.jeesite.common.mybatis.mapper.query.QueryType;

/**
 * 用户提币记录Entity
 * @author tjm
 * @version 2021-10-09
 */
@Table(name="${_prefix}ticket_seller_user_withdrawal", alias="a", columns={
		@Column(name="order_no", attrName="orderNo", label="订单号", isPK=true),
//		@Column(name="user_code", attrName="userCode", label="用户编码"),
		@Column(name="amount", attrName="amount", label="金额"),
		@Column(name="fee", attrName="fee", label="手续费"),
		@Column(name="ip", attrName="ip", label="IP地址"),
		@Column(name="transaction_hash", attrName="transactionHash", label="交易哈希"),
		@Column(name="audit_user_code", attrName="auditUserCode", label="审核用户编码"),
		@Column(name="audit_user_name", attrName="auditUserName", label="审核用户名称", queryType=QueryType.LIKE),
		@Column(name="audit_state", attrName="auditState", label="审核状态:", comment="审核状态:（1-待审核，2-审核通过，3-审核不通过，4-已完成）"),
		@Column(name="audit_date", attrName="auditDate", label="审核日期"),
		@Column(name="create_date", attrName="createDate", label="创建时间", isUpdate=false, isQuery=false),
		@Column(name="update_date", attrName="updateDate", label="更新时间", isQuery=false),
		@Column(name="remarks", attrName="remarks", label="备注", queryType=QueryType.LIKE),
	}, joinTable = {
		@JoinTable(type = JoinTable.Type.LEFT_JOIN, entity = CustomUser.class, alias = "user",
				on = "user.user_code = a.user_code", columns = {
				@Column(name="user_code", attrName="user_code", label="用户编码", isPK=true),
				@Column(name="user_name", attrName="userName", label="用户名"),
				@Column(name="mobile_phone", attrName="mobilePhone", label="手机号码", queryType= QueryType.LEFT_LIKE),
				@Column(name="nick_name", attrName="nickName", label="昵称")
		})
}, orderBy="a.update_date DESC"
)
public class Withdrawal extends DataEntity<Withdrawal> {
	
	private static final long serialVersionUID = 1L;
	private String orderNo;		// 订单号
	private BigDecimal amount;		// 金额
	private BigDecimal fee;		// 手续费
	private String ip;		// IP地址
	private String transactionHash;		// 交易哈希
	private String auditUserCode;		// 审核用户编码
	private String auditUserName;		// 审核用户名称
	private Integer auditState;		// 审核状态:（1-待审核，2-审核通过，3-审核不通过，4-已完成）
	private Date auditDate;		// 审核日期
	private Date createDate;
	private Date updateDate;
	private CustomUser customUser;
	
	public Withdrawal() {
		this(null);
	}

	public Withdrawal(String id){
		super(id);
	}
	
	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}
	
	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}
	
	public BigDecimal getFee() {
		return fee;
	}

	public void setFee(BigDecimal fee) {
		this.fee = fee;
	}
	
	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}
	
	public String getTransactionHash() {
		return transactionHash;
	}

	public void setTransactionHash(String transactionHash) {
		this.transactionHash = transactionHash;
	}
	
	public String getAuditUserCode() {
		return auditUserCode;
	}

	public void setAuditUserCode(String auditUserCode) {
		this.auditUserCode = auditUserCode;
	}
	
	public String getAuditUserName() {
		return auditUserName;
	}

	public void setAuditUserName(String auditUserName) {
		this.auditUserName = auditUserName;
	}
	
	public Integer getAuditState() {
		return auditState;
	}

	public void setAuditState(Integer auditState) {
		this.auditState = auditState;
	}

	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	public Date getAuditDate() {
		return auditDate;
	}

	public void setAuditDate(Date auditDate) {
		this.auditDate = auditDate;
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

	public CustomUser getCustomUser() {
		return customUser;
	}

	public void setCustomUser(CustomUser customUser) {
		this.customUser = customUser;
	}
}