/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
package com.jeesite.modules.ticket.service;

import com.jeesite.common.entity.Page;
import com.jeesite.common.service.CrudService;
import com.jeesite.modules.ticket.dao.NoticeDao;
import com.jeesite.modules.ticket.entity.Notice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 公告表Service
 * @author tjm
 * @version 2021-05-31
 */
@Service
@Transactional(readOnly=true)
public class NoticeService extends CrudService<NoticeDao, Notice> {
	
	/**
	 * 获取单条数据
	 * @param notice
	 * @return
	 */
	@Override
	public Notice get(Notice notice) {
		return super.get(notice);
	}
	
	/**
	 * 查询分页数据
	 * @param notice 查询条件
	 * @param notice.page 分页对象
	 * @return
	 */
	@Override
	public Page<Notice> findPage(Notice notice) {
		return super.findPage(notice);
	}
	
	/**
	 * 保存数据（插入或更新）
	 * @param notice
	 */
	@Override
	@Transactional(readOnly=false)
	public void save(Notice notice) {
		super.save(notice);
	}
	
	/**
	 * 更新状态
	 * @param notice
	 */
	@Override
	@Transactional(readOnly=false)
	public void updateStatus(Notice notice) {
		super.updateStatus(notice);
	}
	
	/**
	 * 删除数据
	 * @param id
	 */
	@Transactional(readOnly=false)
	public void delete(int id) {
		super.dao.deleteEntity(id);
	}


}