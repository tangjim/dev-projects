/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
package com.jeesite.modules.ticket.dao;

import com.jeesite.common.dao.CrudDao;
import com.jeesite.common.mybatis.annotation.MyBatisDao;
import com.jeesite.modules.ticket.entity.CustomUser;

/**
 * 用户表DAO接口
 * @author tjm
 * @version 2021-10-09
 */
@MyBatisDao
public interface CustomUserDao extends CrudDao<CustomUser> {
    void updateLoginState(CustomUser customUser);
    void updateWithdrawalsState(CustomUser customUser);
    void updateTransactionState(CustomUser customUser);
}