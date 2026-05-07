/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
package com.jeesite.modules.ticket.web;

import com.jeesite.common.entity.Page;
import com.jeesite.common.web.BaseController;
import com.jeesite.modules.ticket.entity.Order;
import com.jeesite.modules.ticket.service.OrderService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 订单表Controller
 * @author tjm
 * @version 2021-10-09
 */
@Controller
@RequestMapping(value = "${adminPath}/ticket/order")
public class OrderController extends BaseController {

	@Autowired
	private OrderService orderService;
	
	/**
	 * 获取数据
	 */
	@ModelAttribute
	public Order get(String orderNo, boolean isNewRecord) {
		return orderService.get(orderNo, isNewRecord);
	}
	
	/**
	 * 查询列表
	 */
	@RequiresPermissions("ticket:order:view")
	@RequestMapping(value = {"complete/list", ""})
	public String completeList(Order order, Model model) {
		model.addAttribute("order", order);
		return "modules/ticket/order/complete/list";
	}
	
	/**
	 * 查询完成列表数据
	 */
	@RequiresPermissions("ticket:order:view")
	@RequestMapping(value = "complete/listData")
	@ResponseBody
	public Page<Order> completeCistData(Order order, HttpServletRequest request, HttpServletResponse response) {
		order.setPage(new Page<>(request, response));
		Integer[] state = {1,5,7};
		order.setState_in(state);
		Page<Order> page = orderService.findPage(order);
		return page;
	}

	/**
	 * 查询列表
	 */
	@RequiresPermissions("ticket:order:view")
	@RequestMapping(value = {"unpaid/list", ""})
	public String unpaidList(Order order, Model model) {
		model.addAttribute("order", order);
		return "modules/ticket/order/unpaid/list";
	}
	/**
	 * 查询未支付列表数据
	 */
	@RequiresPermissions("ticket:order:view")
	@RequestMapping(value = "unpaid/listData")
	@ResponseBody
	public Page<Order> unpaidListData(Order order, HttpServletRequest request, HttpServletResponse response) {
		order.setPage(new Page<>(request, response));
		order.setState(0);
		Page<Order> page = orderService.findPage(order);
		return page;
	}

	/**
	 * 查询列表
	 */
	@RequiresPermissions("ticket:order:view")
	@RequestMapping(value = {"refund/apply/list", ""})
	public String refundApplyList(Order order, Model model) {
		model.addAttribute("order", order);
		return "modules/ticket/order/refund/apply/list";
	}
	/**
	 * 查询未支付列表数据
	 */
	@RequiresPermissions("ticket:order:view")
	@RequestMapping(value = "refund/apply/listData")
	@ResponseBody
	public Page<Order> refundApplyListData(Order order, HttpServletRequest request, HttpServletResponse response) {
		order.setPage(new Page<>(request, response));
		order.setState(3);
		order.setRefundState(1);
		Page<Order> page = orderService.findPage(order);
		return page;
	}

	/**
	 * 查询列表
	 */
	@RequiresPermissions("ticket:order:view")
	@RequestMapping(value = {"refund/list", ""})
	public String refundList(Order order, Model model) {
		model.addAttribute("order", order);
		return "modules/ticket/order/refund/list";
	}
	/**
	 * 查询未支付列表数据
	 */
	@RequiresPermissions("ticket:order:view")
	@RequestMapping(value = "refund/listData")
	@ResponseBody
	public Page<Order> refundListData(Order order, HttpServletRequest request, HttpServletResponse response) {
		order.setPage(new Page<>(request, response));
		order.setState(4);
		Integer[] refundState = {2,4};
		order.setRefundState_in(refundState);
		Page<Order> page = orderService.findPage(order);
		return page;
	}
	
}