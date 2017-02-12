package com.visualweibo.ssm.controller.converter;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.core.convert.converter.Converter;

/**   
 * @Title: CustomDateConverter.java 
 * @Package com.visualweibo.ssm.controller.converter 
 * @Description: 字符串到Date转换器
 * @author cyh tjuchenheng@163.com  
 * @date 2017-2-12 下午10:46:56 
 * @version V1.0   
 */
public class CustomDateConverter implements Converter<String, Date>{

	@Override
	public Date convert(String source) {
		
		//实现将日期转成类型(格式是yyyy-MM-dd HH:mm:ss)
		
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		try {
			//转成直接返回
			return simpleDateFormat.parse(source);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		
		//如果参数绑定失败
		return null;
	}

}
