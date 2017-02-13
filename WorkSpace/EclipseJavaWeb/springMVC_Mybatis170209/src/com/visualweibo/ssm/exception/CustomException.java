package com.visualweibo.ssm.exception;
/**   
 * @Title: CustomException.java 
 * @Package com.visualweibo.ssm.exception 
 * @Description: 系统自定义异常类
 * @author cyh tjuchenheng@163.com  
 * @date 2017-2-13 下午5:32:00 
 * @version V1.0   
 */
public class CustomException extends Exception{
  
	
	//异常信息
	public String message;
	
	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public CustomException(String message){
		super(message);
		this.message = message;
	}
	
	
}
