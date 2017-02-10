package com.visualweibo.ssm.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.visualweibo.ssm.po.ItemsCustom;
import com.visualweibo.ssm.service.ItemsService;

/**   
 * @Title: ItemsController.java 
 * @Package com.visualweibo.ssm.controller 
 * @Description: 商品的controller
 * @author cyh tjuchenheng@163.com  
 * @date 2017-2-10 下午6:44:56 
 * @version V1.0   
 */
@Controller
public class ItemsController {
	
	   @Autowired
	   private ItemsService itemsService;
	
	
	    //商品查询列表
		//实现对queryItems方法和url进行映射，一个方法对应一个url
		@RequestMapping("/queryItems")
		public ModelAndView queryItems() throws Exception{
			//调用service查找数据库，查询商品列表，从service中获取
		    List<ItemsCustom> itemsList = itemsService.findItemsList(null);//ArrayList就是动态数组,LinkedList基于链表的数据结构。都是继承自List接口
		
		    
		    //返回ModelAndView
		    ModelAndView modelAndView = new ModelAndView();
		    //相当于reuqest的setAttribute，在jsp页面中通过itemsList取数据
		    modelAndView.addObject("itemsList", itemsList);
		    
		    //指定视图
		    modelAndView.setViewName("items/itemsList");
		    
		   
			return modelAndView;	
		}
		
		//
		
}
