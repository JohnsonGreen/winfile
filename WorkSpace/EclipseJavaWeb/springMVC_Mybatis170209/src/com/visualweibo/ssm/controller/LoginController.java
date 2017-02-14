package com.visualweibo.ssm.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**   
 * @Title: LoginController.java 
 * @Package com.visualweibo.ssm.controller 
 * @Description: 
 * @author cyh tjuchenheng@163.com  
 * @date 2017-2-14 下午12:39:24 
 * @version V1.0   
 */
@Controller
public class LoginController {

	//登陆
	@RequestMapping("/login")
	public String login(HttpSession session, String username, String password)throws Exception{
		
		//调用servic进行用户身份验证
		
		
		
		//在session中保存用户身份信息
		session.setAttribute("username", username);
		
		//重定向到商品列表页面
		
		
		return "redirect:/items/queryItems.action";
	}
	
	@RequestMapping("/logout")
	public String logout(HttpSession session)throws Exception{
		
		//清除session
		session.invalidate();
		
		return "redirect:/items/queryItems.action";
	}
	
}
