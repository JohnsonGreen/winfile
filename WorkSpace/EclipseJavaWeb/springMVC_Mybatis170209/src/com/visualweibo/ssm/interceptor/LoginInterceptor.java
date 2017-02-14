package com.visualweibo.ssm.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

/**   
 * @Title: HandlerInterceptor1.java 
 * @Package com.visualweibo.ssm.interceptor 
 * @Description: 登录认证拦截器
 * @author cyh tjuchenheng@163.com  
 * @date 2017-2-14 上午12:30:43 
 * @version V1.0   
 */
public class LoginInterceptor implements HandlerInterceptor {

	
	
	//进入handler方法之前执行
	//用于身份认证，身份授权
	//比如身份认证不通过表示当前用户没有登陆，需要此方法拦截不再向下执行
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
			Object arg2) throws Exception {
	
		//获取请求的url
		String url= request.getRequestURI();
		
		//判断url是否是公开地址（实际使用时将公开地址配置在配置文件中）
		//这里公开地址是登陆提交的地址
		//判断url中是否包括login.action,找到则返回索引位置，未找到则返回-1
		if(url.indexOf("login.action")>=0){
			
			//如果进行登陆提交，放行
			return true;
		}
		
		//判断session
		HttpSession session = request.getSession();
		
		//从session中取出用户身份信息
		String username=(String)session.getAttribute("username");
		
		if(username != null){
			 //身份存在，放行
			return true;
		}
	
		
		//执行这里表示用户需要身份认证，跳转到登陆页面,没有model和view，采取这种方式
		request.getRequestDispatcher("/WEB-INF/jsp/login.jsp").forward(request, response);
		
		return false;  
	}
		
    //进入handler方法之后，返回modelAndView之前
	//应用场景从modelandview出发：将公用的模型数据在这里传至视图，也可以在这里统一指定试图
     @Override
     public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1,
		 Object arg2, ModelAndView arg3) throws Exception {
    	 System.out.println("HandlerInterceptor2......postHandle");
	 		
	 }	
		
		
	 //执行Handler完成执行此方法
     //应用场景：统一的异常处理，统一的日志处理
	 @Override
	 public void afterCompletion(HttpServletRequest arg0,
		 HttpServletResponse arg1, Object arg2, Exception arg3)
			throws Exception {
		 System.out.println("HandlerInterceptor2......afterCompletion");
		
	}

	

	
	

}
