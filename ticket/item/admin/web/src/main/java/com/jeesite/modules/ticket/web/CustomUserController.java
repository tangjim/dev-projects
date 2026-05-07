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
import com.jeesite.modules.ticket.entity.CustomUser;
import com.jeesite.modules.ticket.service.CustomUserService;

/**
 * 用户表Controller
 * @author tjm
 * @version 2021-10-09
 */
@Controller
@RequestMapping(value = "${adminPath}/ticket/customUser")
public class CustomUserController extends BaseController {

	@Autowired
	private CustomUserService customUserService;
	
	/**
	 * 获取数据
	 */
	@ModelAttribute
	public CustomUser get(String userCode, boolean isNewRecord) {
		return customUserService.get(userCode, isNewRecord);
	}
	
	/**
	 * 查询列表
	 */
	@RequiresPermissions("ticket:customUser:view")
	@RequestMapping(value = {"list", ""})
	public String list(CustomUser customUser, Model model) {
		model.addAttribute("customUser", customUser);
		return "modules/ticket/user/custom/list";
	}
	
	/**
	 * 查询列表数据
	 */
	@RequiresPermissions("ticket:customUser:view")
	@RequestMapping(value = "listData")
	@ResponseBody
	public Page<CustomUser> listData(CustomUser customUser, HttpServletRequest request, HttpServletResponse response) {
		customUser.setPage(new Page<>(request, response));
		Page<CustomUser> page = customUserService.findPage(customUser);
		return page;
	}

	/**
	 * 查看编辑表单
	 */
	@RequiresPermissions("ticket:customUser:view")
	@RequestMapping(value = "form")
	public String form(CustomUser customUser, Model model) {
		model.addAttribute("customUser", customUser);
		return "modules/ticket/user/custom/form";
	}

	/**
	 * 保存数据
	 */
	@RequiresPermissions("ticket:customUser:edit")
	@PostMapping(value = "save")
	@ResponseBody
	public String save(@Validated CustomUser customUser) {
		customUserService.save(customUser);
		return renderResult(Global.TRUE, text("保存用户表成功！"));
	}

	@RequiresPermissions("ticket:user:state:login")
	@RequestMapping(value = "loginDisable")
	@ResponseBody
	public String loginDisable(CustomUser customUser) {
		customUser.setIsLogin(1);
		customUserService.updateLoginState(customUser);
		return renderResult(Global.TRUE, text("已禁用用户登录功能"));
	}

	@RequiresPermissions("ticket:user:state:login")
	@RequestMapping(value = "loginEnable")
	@ResponseBody
	public String loginEnable(CustomUser customUser) {
		customUser.setIsLogin(0);
		customUserService.updateLoginState(customUser);
		return renderResult(Global.TRUE, text("已启用用户登录功能"));
	}

	@RequiresPermissions("ticket:user:state:withdrawals")
	@RequestMapping(value = "withdrawalsDisable")
	@ResponseBody
	public String withdrawalsDisable(CustomUser customUser) {
		customUser.setIsWithdrawals(1);
		customUserService.updateWithdrawalsState(customUser);
		return renderResult(Global.TRUE, text("已禁用用户提币功能"));
	}

	@RequiresPermissions("ticket:user:state:withdrawals")
	@RequestMapping(value = "withdrawalsEnable")
	@ResponseBody
	public String withdrawalsEnable(CustomUser customUser) {
		customUser.setIsWithdrawals(0);
		customUserService.updateWithdrawalsState(customUser);
		return renderResult(Global.TRUE, text("已启用用户提币功能"));
	}

	@RequiresPermissions("ticket:user:state:transaction")
	@RequestMapping(value = "transactionDisable")
	@ResponseBody
	public String transactionDisable(CustomUser customUser) {
		customUser.setIsTransaction(1);
		customUserService.updateTransactionState(customUser);
		return renderResult(Global.TRUE, text("已禁用用户交易功能"));
	}

	@RequiresPermissions("ticket:user:state:transaction")
	@RequestMapping(value = "transactionEnable")
	@ResponseBody
	public String transactionEnable(CustomUser customUser) {
		customUser.setIsTransaction(0);
		customUserService.updateTransactionState(customUser);
		return renderResult(Global.TRUE, text("已启用用户交易功能"));
	}
}