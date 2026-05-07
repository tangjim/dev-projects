/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
package com.jeesite.modules.ticket.service;

import com.jeesite.common.entity.Page;
import com.jeesite.common.service.CrudService;
import com.jeesite.modules.ticket.dao.CustomUserDao;
import com.jeesite.modules.ticket.entity.CustomUser;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 用户表Service
 * @author tjm
 * @version 2021-10-09
 */
@Service
@Transactional(readOnly=true)
public class CustomUserService extends CrudService<CustomUserDao, CustomUser> {
	
	/**
	 * 获取单条数据
	 * @param customUser
	 * @return
	 */
	@Override
	public CustomUser get(CustomUser customUser) {
		return super.get(customUser);
	}
	
	/**
	 * 查询分页数据
	 * @param customUser 查询条件
	 * @param customUser.page 分页对象
	 * @return
	 */
	@Override
	public Page<CustomUser> findPage(CustomUser customUser) {
		return super.findPage(customUser);
	}
	
	/**
	 * 保存数据（插入或更新）
	 * @param customUser
	 */
	@Override
	@Transactional(readOnly=false)
	public void save(CustomUser customUser) {
		super.save(customUser);
	}
	
	/**
	 * 更新状态
	 * @param customUser
	 */
	@Override
	@Transactional(readOnly=false)
	public void updateStatus(CustomUser customUser) {
		super.updateStatus(customUser);
	}

	@Transactional(readOnly=false)
	public void updateLoginState(CustomUser customUser) {
		this.dao.updateLoginState(customUser);
	}

	@Transactional(readOnly=false)
	public void updateWithdrawalsState(CustomUser customUser) {
		this.dao.updateWithdrawalsState(customUser);
	}

	@Transactional(readOnly=false)
	public void updateTransactionState(CustomUser customUser) {
		this.dao.updateTransactionState(customUser);
	}
	
}