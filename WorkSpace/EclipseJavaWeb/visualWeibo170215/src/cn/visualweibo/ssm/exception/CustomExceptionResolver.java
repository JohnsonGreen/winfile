package cn.visualweibo.ssm.exception;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;



/**   
 * @Title: CustomExceptionResolver.java 
 * @Package com.visualweibo.ssm.exception 
 * @Description: 全局异常处理器
 * @author cyh tjuchenheng@163.com  
 * @date 2017-2-13 下午5:38:34 
 * @version V1.0   
 */
public class CustomExceptionResolver implements HandlerExceptionResolver{

	@Override
	public ModelAndView resolveException(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex) {
		//handler就是处理器适配器要执行的Handler对象(只有method)
		
		
		//解析出异常类型
		//如果该异常类型使系统自定义的异常，直接取出异常信息，在错误页面显示
//		String message = null;
//		if(ex instanceof CustomException){
//			message= ((CustomException)ex).getMessage();
//		}else{
//			//如果该异常类型不是系统自定义的一场，构造一个自定义的异常类型，（信息为”未知错误“）
//			message="未知错误";
//			
//		}
//		
		
		//上边代码变为
		CustomException customException = null;
		if(ex instanceof CustomException){
		    customException = (CustomException)ex;
		}else{
			customException = new CustomException("未知错误！");
		}
		
		//错误信息
		String message = customException.getMessage();
		
		ModelAndView modelAndView = new ModelAndView();
		
		
		modelAndView.addObject("message", message);
		
		//返回错误页面
		modelAndView.setViewName("error");
		
		
		return modelAndView;
	}

}
