package com.visualweibo.ssm.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.visualweibo.ssm.po.ItemsCustom;

/**   
 * @Title: JsonTest.java 
 * @Package com.visualweibo.ssm.controller 
 * @Description: 
 * @author cyh tjuchenheng@163.com  
 * @date 2017-2-13 下午10:50:30 
 * @version V1.0   
 */
@Controller
public class JsonTest {
   //请求json（商品信息），输出响应json（商品信息）
	//@RequestBody将请求商品信息的json串专成itemsCustom对象
	//@ResponseBody将itemsCustom转成json输出
	@RequestMapping("/requestJson")
	public @ResponseBody ItemsCustom requestJson(@RequestBody ItemsCustom itemsCustom){
  		
		return itemsCustom;
	  	
	}
	
	@RequestMapping("/jsonTest")
	public String jsonTest(){
  		
		
		return "jsonTest";
	  	
	}
	
	
	//请求key/value 输出json
	@RequestMapping("/responseJson")
	public @ResponseBody ItemsCustom responseJson( ItemsCustom itemsCustom){
  		
		return itemsCustom;
	  	
	}
	
	
	
}
