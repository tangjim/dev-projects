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
 * 公告表Entity
 * @author tjm
 * @version 2021-05-31
 */
@Table(name="${_prefix}ticket_seller_notice", alias="a", columns={
		@Column(name="id", attrName="id", label="id", isPK=true, isInsert = false),
		@Column(name="title", attrName="title", label="标题", queryType=QueryType.LIKE),
		@Column(name="content", attrName="content", label="内容"),
		@Column(name="status", attrName="status", label="状态", isUpdate=false, isQuery=false),
		@Column(name="create_date", attrName="createDate", label="添加时间", isUpdate=false),
		@Column(name="remarks", attrName="remarks", label="备注", isQuery=false),
	}, orderBy="a.create_date DESC"
)
public class Notice extends DataEntity<Notice> {
	
	private static final long serialVersionUID = 1L;
	private String id;
	private String title;		// 标题
	private String content;		// 内容
	
	public Notice() {
		this(null);
	}

	public Notice(String id){
		super(id);
	}

	@Override
	public String getId() {
		return id;
	}

	@Override
	public void setId(String id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
	
	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	@Override
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	public Date getCreateDate() {
		return createDate;
	}
	
}