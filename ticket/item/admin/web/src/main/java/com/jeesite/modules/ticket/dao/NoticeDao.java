/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
package com.jeesite.modules.ticket.dao;

import com.jeesite.common.dao.CrudDao;
import com.jeesite.common.mybatis.annotation.MyBatisDao;
import com.jeesite.modules.ticket.entity.Notice;

/**
 * 公告表DAO接口
 * @author tjm
 * @version 2021-05-31
 */
@MyBatisDao
public interface NoticeDao extends CrudDao<Notice> {
	void deleteEntity(int id);
}