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
 * 订单表Entity
 * @author tjm
 * @version 2021-10-09
 */
@Table(name="${_prefix}ticket_seller_order", alias="a", columns={
		@Column(name="order_no", attrName="orderNo", label="订单号", isPK=true),
		@Column(name="relation_order_no", attrName="relationOrderNo", label="关联订单号"),
//		@Column(name="user_code", attrName="userCode", label="用户编码"),
		@Column(name="type", attrName="type", label="产品类型", comment="产品类型:0-门票，1-酒店，2-景点"),
		@Column(name="product_code", attrName="productCode", label="产品编码"),
		@Column(name="product_name", attrName="productName", label="产品名称", queryType=QueryType.LIKE),
		@Column(name="amount", attrName="amount", label="费用"),
		@Column(name="num", attrName="num", label="数量"),
		@Column(name="fee", attrName="fee", label="手续费"),
		@Column(name="state", attrName="state", label="0-待支付，1-已支付，2-已取消，3-申请退款，4-已退款"),
		@Column(name="settlement_state", attrName="settlementState", label="1-待结算，2-已结算"),
		@Column(name="settlement_date", attrName="settlementDate", label="结算时间"),
		@Column(name="pay_date", attrName="payDate", label="支付时间"),
		@Column(name="version", attrName="version", label="版本号"),
		@Column(name="create_date", attrName="createDate", label="创建时间", isUpdate=false, isQuery=false),
		@Column(name="update_date", attrName="updateDate", label="修改时间", isQuery=false),
		@Column(name="remarks", attrName="remarks", label="备注", queryType=QueryType.LIKE),
		@Column(name="pay_order_no", attrName="payOrderNo", label="支付订单号"),
		@Column(name="apply_refund_date", attrName="applyRefundDate", label="申请退款时间"),
		@Column(name="refund_state", attrName="refundState", label="退款审批状态:", comment="退款审批状态:（1-待审核，2-审核通过，3-审核不通过，4-已完成）"),
		@Column(name="refund_audit_user", attrName="refundAuditUser", label="退款审批人"),
		@Column(name="refund_audit_date", attrName="refundAuditDate", label="退款审批时间"),
		@Column(name="refund_order_no", attrName="refundOrderNo", label="退款订单号"),
		@Column(name="out_refund_order_no", attrName="outRefundOrderNo", label="支付方退款订单号"),
		@Column(name="refund_deadline_date", attrName="refundDeadlineDate", label="退款截止时间"),
		@Column(name="api_info", attrName="apiInfo", label="接口信息"),
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
public class Order extends DataEntity<Order> {
	
	private static final long serialVersionUID = 1L;
	private String orderNo;		// 订单号
	private String relationOrderNo;		// 关联订单号
	private String userCode;		// 用户编码
	private Integer type;		// 产品类型:0-门票，1-酒店，2-景点
	private String productCode;		// 产品编码
	private String productName;		// 产品名称
	private BigDecimal amount;		// 费用
	private BigDecimal num;		// 数量
	private BigDecimal fee;		// 手续费
	private Integer state;		// 0-待支付，1-已支付，2-已取消，3-申请退款，4-已退款
	private Integer settlementState;		// 1-待结算，2-已结算
	private Date settlementDate;		// 结算时间
	private Date payDate;		// 支付时间
	private Integer version;		// 版本号
	private String payOrderNo;		// 支付订单号
	private Date applyRefundDate;		// 申请退款时间
	private Integer refundState;		// 退款审批状态:（1-待审核，2-审核通过，3-审核不通过，4-已完成）
	private String refundAuditUser;		// 退款审批人
	private Date refundAuditDate;		// 退款审批时间
	private String refundOrderNo;		// 退款订单号
	private String outRefundOrderNo;		// 支付方退款订单号
	private Date refundDeadlineDate;		// 退款截止时间
	private String apiInfo;		// 接口信息

	private Date createDate;
	private Date updateDate;
	private CustomUser customUser;
	
	public Order() {
		this(null);
	}

	public Order(String id){
		super(id);
	}
	
	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}
	
	public String getRelationOrderNo() {
		return relationOrderNo;
	}

	public void setRelationOrderNo(String relationOrderNo) {
		this.relationOrderNo = relationOrderNo;
	}
	
	public String getUserCode() {
		return userCode;
	}

	public void setUserCode(String userCode) {
		this.userCode = userCode;
	}
	
	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}
	
	public String getProductCode() {
		return productCode;
	}

	public void setProductCode(String productCode) {
		this.productCode = productCode;
	}
	
	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}
	
	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}
	
	public BigDecimal getNum() {
		return num;
	}

	public void setNum(BigDecimal num) {
		this.num = num;
	}
	
	public BigDecimal getFee() {
		return fee;
	}

	public void setFee(BigDecimal fee) {
		this.fee = fee;
	}
	
	public Integer getState() {
		return state;
	}

	public void setState(Integer state) {
		this.state = state;
	}
	
	public Integer getSettlementState() {
		return settlementState;
	}

	public void setSettlementState(Integer settlementState) {
		this.settlementState = settlementState;
	}
	
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	public Date getSettlementDate() {
		return settlementDate;
	}

	public void setSettlementDate(Date settlementDate) {
		this.settlementDate = settlementDate;
	}
	
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	public Date getPayDate() {
		return payDate;
	}

	public void setPayDate(Date payDate) {
		this.payDate = payDate;
	}
	
	public Integer getVersion() {
		return version;
	}

	public void setVersion(Integer version) {
		this.version = version;
	}
	
	public String getPayOrderNo() {
		return payOrderNo;
	}

	public void setPayOrderNo(String payOrderNo) {
		this.payOrderNo = payOrderNo;
	}
	
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	public Date getApplyRefundDate() {
		return applyRefundDate;
	}

	public void setApplyRefundDate(Date applyRefundDate) {
		this.applyRefundDate = applyRefundDate;
	}
	
	public Integer getRefundState() {
		return refundState;
	}

	public void setRefundState(Integer refundState) {
		this.refundState = refundState;
	}
	
	public String getRefundAuditUser() {
		return refundAuditUser;
	}

	public void setRefundAuditUser(String refundAuditUser) {
		this.refundAuditUser = refundAuditUser;
	}
	
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	public Date getRefundAuditDate() {
		return refundAuditDate;
	}

	public void setRefundAuditDate(Date refundAuditDate) {
		this.refundAuditDate = refundAuditDate;
	}
	
	public String getRefundOrderNo() {
		return refundOrderNo;
	}

	public void setRefundOrderNo(String refundOrderNo) {
		this.refundOrderNo = refundOrderNo;
	}
	
	public String getOutRefundOrderNo() {
		return outRefundOrderNo;
	}

	public void setOutRefundOrderNo(String outRefundOrderNo) {
		this.outRefundOrderNo = outRefundOrderNo;
	}
	
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	public Date getRefundDeadlineDate() {
		return refundDeadlineDate;
	}

	public void setRefundDeadlineDate(Date refundDeadlineDate) {
		this.refundDeadlineDate = refundDeadlineDate;
	}
	
	public String getApiInfo() {
		return apiInfo;
	}

	public void setApiInfo(String apiInfo) {
		this.apiInfo = apiInfo;
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

	public void setState_in(Integer[] state) {
		sqlMap.getWhere().and("state", QueryType.IN, state);
		this.setState(null);
	}

	public void setRefundState_in(Integer[] refundState) {
		sqlMap.getWhere().and("refund_state", QueryType.IN, refundState);
		this.setState(null);
	}
}