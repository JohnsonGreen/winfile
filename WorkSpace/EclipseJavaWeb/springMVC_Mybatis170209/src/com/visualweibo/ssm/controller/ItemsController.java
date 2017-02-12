package com.visualweibo.ssm.controller;



import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.catalina.connector.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.visualweibo.ssm.po.ItemsCustom;
import com.visualweibo.ssm.po.ItemsQueryVo;
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
@RequestMapping("/items")
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
	
         
		
		//商品信息修改页面显示
		//@RequestParam里边指定request传入参数名称和形参进行绑定
		//通过request属性指定参数是否必须要传入
		//defaultValue="" 可以给方法设定默认值
		@RequestMapping(value="/editItems",method={RequestMethod.POST,RequestMethod.GET})
		public String editItems(Model model,@RequestParam(value="id",required=true) Integer items_id) throws Exception{
			
			//调用service根据商品id查询商品信息
			ItemsCustom itemsCustom = itemsService.findItemsById(items_id);
			
		    //通过形参中的model将model数据传到页面
			//相当于modelAndView.addObject方法
			model.addAttribute("itemsCustom", itemsCustom);
			
			/*
			 * 
			 * forward:转发页面和转发到的页面可以共享request里面的数据.url不变
             * redirect:不能共享数据.
			 */
			
			
			//重定向
			//return "redirect:queryItems.action";
			
			return "items/editItems";
			
		}
		
		
		
		
		//商品信息修改提交
		@RequestMapping("/editItemsSubmit")
		public String editItemsSubmit(HttpServletRequest request,Integer id,ItemsCustom itemsCustom) throws Exception{
			
			
			//调用service更新商品信息，页面需要将商品信息传到此方法
			 itemsService.updateItems(id, itemsCustom);
		
			return "success";
		}
		
		
		//批量修改商品页面，将商品信息查询出来，在页面中可以编辑商品
		@RequestMapping("/editItemsQuery")
		public ModelAndView editItemsQuery(HttpServletRequest request, ItemsQueryVo itemsQueryVo) throws Exception{
			//调用service查找数据库，查询商品列表，从service中获取
		    List<ItemsCustom> itemsList = itemsService.findItemsList(null);//ArrayList就是动态数组,LinkedList基于链表的数据结构。都是继承自List接口
		
		    
		    //返回ModelAndView
		    ModelAndView modelAndView = new ModelAndView();
		    //相当于reuqest的setAttribute，在jsp页面中通过itemsList取数据
		    modelAndView.addObject("itemsList", itemsList);
		    
		    //指定视图
		    modelAndView.setViewName("items/editItems");
		    
		   
			return modelAndView;	
		}
		
		
		//批量修改商品提交,将商品信息存储到ItemsQueryVo中的itemsList当中
		@RequestMapping("/editItemsAllSubmit")
		public String editItemsAllSubmit(ItemsQueryVo itemsQueryVo) throws Exception{
			
			
			return "success";
		}
		
		
	
	
		
		
		
}
