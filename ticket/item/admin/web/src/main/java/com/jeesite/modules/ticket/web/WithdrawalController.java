/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
package com.jeesite.modules.ticket.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jeesite.common.config.Global;
import com.jeesite.common.entity.Page;
import com.jeesite.common.web.BaseController;
import com.jeesite.modules.ticket.entity.Withdrawal;
import com.jeesite.modules.ticket.service.WithdrawalService;

/**
 * 用户提币记录Controller
 * @author tjm
 * @version 2021-10-09
 */
@Controller
@RequestMapping(value = "${adminPath}/ticket/withdrawal")
public class WithdrawalController extends BaseController {

	@Autowired
	private WithdrawalService withdrawalService;
	
	/**
	 * 获取数据
	 */
	@ModelAttribute
	public Withdrawal get(String orderNo, boolean isNewRecord) {
		return withdrawalService.get(orderNo, isNewRecord);
	}
	
	/**
	 * 查询列表
	 */
	@RequiresPermissions("ticket:withdrawal:view")
	@RequestMapping(value = {"list", ""})
	public String list(Withdrawal withdrawal, Model model) {
		model.addAttribute("withdrawal", withdrawal);
		return "modules/ticket/withdrawal/list";
	}
	
	/**
	 * 查询列表数据
	 */
	@RequiresPermissions("ticket:withdrawal:view")
	@RequestMapping(value = "listData")
	@ResponseBody
	public Page<Withdrawal> listData(Withdrawal withdrawal, HttpServletRequest request, HttpServletResponse response) {
		withdrawal.setPage(new Page<>(request, response));
		Page<Withdrawal> page = withdrawalService.findPage(withdrawal);
		return page;
	}
	
}