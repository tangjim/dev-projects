/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
package com.jeesite.modules.ticket.web;

import com.jeesite.common.config.Global;
import com.jeesite.common.entity.Page;
import com.jeesite.common.web.BaseController;
import com.jeesite.modules.ticket.entity.CustomUser;
import com.jeesite.modules.ticket.service.CustomUserService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 用户表Controller
 * @author tjm
 * @version 2021-10-09
 */
@Controller
@RequestMapping(value = "${adminPath}/ticket/agnetUser")
public class AgnetUserController extends BaseController {

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
	@RequiresPermissions("ticket:agnet:user:view")
	@RequestMapping(value = {"list", ""})
	public String list(CustomUser customUser, Model model) {
		model.addAttribute("customUser", customUser);
		return "modules/ticket/user/agent/list";
	}
	
	/**
	 * 查询列表数据
	 */
	@RequiresPermissions("ticket:agnet:user:view")
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
	@RequiresPermissions("ticket:agnetUser:view")
	@RequestMapping(value = "form")
	public String form(CustomUser customUser, Model model) {
		model.addAttribute("customUser", customUser);
		return "modules/ticket/user/agent/form";
	}

	/**
	 * 保存数据
	 */
	@RequiresPermissions("ticket:agnet:user:edit")
	@PostMapping(value = "save")
	@ResponseBody
	public String save(@Validated CustomUser customUser) {
		customUserService.save(customUser);
		return renderResult(Global.TRUE, text("保存用户表成功！"));
	}
}