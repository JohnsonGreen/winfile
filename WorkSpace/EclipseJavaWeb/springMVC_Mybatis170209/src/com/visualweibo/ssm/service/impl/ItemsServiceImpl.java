package com.visualweibo.ssm.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;


import com.visualweibo.ssm.mapper.ItemsMapperCustom;
import com.visualweibo.ssm.po.ItemsCustom;
import com.visualweibo.ssm.po.ItemsQueryVo;
import com.visualweibo.ssm.service.ItemsService;

/**   
 * @Title: ItemsServiceImpl.java 
 * @Package com.visualweibo.ssm.service.impl 
 * @Description: 商品的管理
 * @author cyh tjuchenheng@163.com  
 * @date 2017-2-9 下午11:46:58 
 * @version V1.0   
 */


public class ItemsServiceImpl implements ItemsService{
    
	
	//通过spring配置文件中对mapper包的扫描，ItemsMapperCustom已经在spring容器中注册，因此可以把对象注入
	@Autowired
	private ItemsMapperCustom itemsMapperCustom;
	
	@Override
	public List<ItemsCustom> findItemsList(ItemsQueryVo itemsQueryVo)
			throws Exception {
		//通过ItemCustom查询数据库
		
		
		return itemsMapperCustom.findItemsList(itemsQueryVo);
	}
   
	
}
