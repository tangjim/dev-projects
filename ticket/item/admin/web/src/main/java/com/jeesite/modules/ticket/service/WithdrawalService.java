/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
package com.jeesite.modules.ticket.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jeesite.common.entity.Page;
import com.jeesite.common.service.CrudService;
import com.jeesite.modules.ticket.entity.Withdrawal;
import com.jeesite.modules.ticket.dao.WithdrawalDao;

/**
 * 用户提币记录Service
 * @author tjm
 * @version 2021-10-09
 */
@Service
@Transactional(readOnly=true)
public class WithdrawalService extends CrudService<WithdrawalDao, Withdrawal> {
	
	/**
	 * 获取单条数据
	 * @param withdrawal
	 * @return
	 */
	@Override
	public Withdrawal get(Withdrawal withdrawal) {
		return super.get(withdrawal);
	}
	
	/**
	 * 查询分页数据
	 * @param withdrawal 查询条件
	 * @param withdrawal.page 分页对象
	 * @return
	 */
	@Override
	public Page<Withdrawal> findPage(Withdrawal withdrawal) {
		return super.findPage(withdrawal);
	}
	
	/**
	 * 保存数据（插入或更新）
	 * @param withdrawal
	 */
	@Override
	@Transactional(readOnly=false)
	public void save(Withdrawal withdrawal) {
		super.save(withdrawal);
	}
	
	/**
	 * 更新状态
	 * @param withdrawal
	 */
	@Override
	@Transactional(readOnly=false)
	public void updateStatus(Withdrawal withdrawal) {
		super.updateStatus(withdrawal);
	}
	
	/**
	 * 删除数据
	 * @param withdrawal
	 */
	@Override
	@Transactional(readOnly=false)
	public void delete(Withdrawal withdrawal) {
		super.delete(withdrawal);
	}
	
}