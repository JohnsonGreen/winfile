package com.visualweibo.ssm.controller;



import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.apache.catalina.connector.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;


import com.visualweibo.ssm.controller.validation.ValidGroup1;
import com.visualweibo.ssm.exception.CustomException;
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
	   
	   
	   //商品分类
	   //itemtypes表示最终将方法返回值放在request中的key
	   //页面上可以得到itemtypes数据
	   @ModelAttribute("itemtypes")
	   public Map<String, String> getItemTypes(){
		    Map<String, String> itemTypes = new HashMap<String,String>();
		   
		     itemTypes.put("101", "数码");
		     itemTypes.put("102", "母婴");
		     return itemTypes;
	   }
	   
	   
	
	
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
			
//			//判断商品是否为空，根据id没有查询到商品，抛出异常，提示用户商品信息不存在
//			if(itemsCustom == null){
//				throw new CustomException("修改的商品信息不存在！");
//			}
			
			
		    //通过形参中的model将model数据传到页面
			//相当于modelAndView.addObject方法
			model.addAttribute("itemsCustom", itemsCustom);
			
			/*
			 * forward:转发页面和转发到的页面可以共享request里面的数据.url不变
             * redirect:不能共享数据.
			 */
			
			
			//重定向
			//return "redirect:queryItems.action";
			
			return "items/editItems";
			
		}
		
		
		
		
		//商品信息修改提交
		//BindingResult bindingResult 是为了捕获错误信息
		//value={ValidGroup1.class}指定使用ValidGroup1分组的校验
		//@ModelAttribute("items")可以指定pojo回显到在request中的key，还可以将方法的返回值返回页面
		@RequestMapping("/editItemsSubmit")
		public String editItemsSubmit(Model model,HttpServletRequest request,Integer id,@ModelAttribute("items") @Validated(value={ValidGroup1.class}) ItemsCustom itemsCustom, BindingResult bindingResult,MultipartFile items_pic) throws Exception{
			
			//获取校验错误信息
			if(bindingResult.hasErrors()){
				//输出错误信息
				List<ObjectError> allErrors = bindingResult.getAllErrors();
				
				for(ObjectError objectError:allErrors){
					//输出错误信息
					System.out.println(objectError.getDefaultMessage());
				}
				
				//将错误信息传到页面
				model.addAttribute("allErrors", allErrors);
				
				//出错重新到商品修改页面
				return "items/editItems";
			}
			
			//原始名称
			String originalFilename = items_pic.getOriginalFilename();
			
			//上传图片
			if(items_pic != null && originalFilename != null && originalFilename.length()>0){
				//存储图片的物理路径
				String pic_path = "F:\\Picture\\intel\\";
				
				
				//新的文件名称,添加后缀
				String newFileName = UUID.randomUUID() + originalFilename.substring(originalFilename.lastIndexOf("."));
				
				//新的图片
				File newFile = new File(pic_path + newFileName);
				
				//将内存中的数据写入磁盘
				items_pic.transferTo(newFile);
				
				//将新图片名称写到itemCustom
				itemsCustom.setPic(newFileName);
				
			}
			
		
			
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
		    modelAndView.setViewName("items/editItemsQuery");
		    
		   
			return modelAndView;	
		}
		
		
		//批量修改商品提交,将商品信息存储到ItemsQueryVo中的itemsList当中
		@RequestMapping("/editItemsAllSubmit")
		public String editItemsAllSubmit(ItemsQueryVo itemsQueryVo) throws Exception{
			
			
			return "success";
		}
		
		
		//RESTful
		//查询商品信息，输出json
		//itemsView/{id}表示将这个位置的参数传到PathVariable("id")指定名称中即（Integer id）中
		//PathVariable("id")中的id表示
		@RequestMapping("/itemsView/{id}")
		public @ResponseBody ItemsCustom  itemsView(@PathVariable("id") Integer id) throws Exception{
			//调用service查询商品信息
			ItemsCustom itemsCustom = itemsService.findItemsById(id);
			return itemsCustom;
			
		}
		

		
		
	
	
		
		
		
}
