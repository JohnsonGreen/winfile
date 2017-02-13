package com.visualweibo.ssm.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

/**   
 * @Title: HandlerInterceptor1.java 
 * @Package com.visualweibo.ssm.interceptor 
 * @Description: 测试拦截器1
 * @author cyh tjuchenheng@163.com  
 * @date 2017-2-14 上午12:30:43 
 * @version V1.0   
 */
public class HandlerInterceptor1 implements HandlerInterceptor {

	
	
	//进入handler方法之前执行
	//用于身份认证，身份授权
	//比如身份认证不通过表示当前用户没有登陆，需要此方法拦截不再向下执行
	@Override
	public boolean preHandle(HttpServletRequest arg0, HttpServletResponse arg1,
			Object arg2) throws Exception {
	
		
		//return false;  表示拦截，不向下执行
		//return true; 表示放行
		System.out.println("HandlerInterceptor1......preHandle");
		
		return true;  
	}
		
    //进入handler方法之后，返回modelAndView之前
	//应用场景从modelandview出发：将公用的模型数据在这里传至视图，也可以在这里统一指定试图
     @Override
     public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1,
		 Object arg2, ModelAndView arg3) throws Exception {
			
    	 System.out.println("HandlerInterceptor1......postHandle");
	 		
	 }	
		
		
	 //执行Handler完成执行此方法
     //应用场景：统一的异常处理，统一的日志处理
	 @Override
	 public void afterCompletion(HttpServletRequest arg0,
		 HttpServletResponse arg1, Object arg2, Exception arg3)
			throws Exception {
		 System.out.println("HandlerInterceptor1......afterCompletion");
		
	}

	

	
	

}
