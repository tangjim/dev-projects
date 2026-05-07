/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
package com.jeesite.modules.ticket.dao;

import com.jeesite.common.dao.CrudDao;
import com.jeesite.common.mybatis.annotation.MyBatisDao;
import com.jeesite.modules.ticket.entity.Order;

/**
 * 订单表DAO接口
 * @author tjm
 * @version 2021-10-09
 */
@MyBatisDao
public interface OrderDao extends CrudDao<Order> {
	
}