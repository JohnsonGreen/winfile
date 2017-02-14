package cn.visualweibo.ssm.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**   
 * @Title: LoginController.java 
 * @Package cn.visualweibo.ssm.controller 
 * @Description: 登录控制
 * @author cyh tjuchenheng@163.com  
 * @date 2017-2-15 上午1:09:07 
 * @version V1.0   
 */
@Controller
public class LoginAndRegisterController {
	
	    
		@RequestMapping("/login")
		public String login(HttpSession session, String username, String password)throws Exception{
			
			session.setAttribute("username", username);
			return "redirect:/items/queryItems.action";
		}
		
		
		
		@RequestMapping("/logout")
		public String logout(HttpSession session)throws Exception{
			
			session.invalidate();
			
			return "redirect:/items/queryItems.action";
		}
}
