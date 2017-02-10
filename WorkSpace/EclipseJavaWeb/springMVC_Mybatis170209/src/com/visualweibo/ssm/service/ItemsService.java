package com.visualweibo.ssm.service;

import java.util.List;

import com.visualweibo.ssm.po.ItemsCustom;
import com.visualweibo.ssm.po.ItemsQueryVo;

/**   
 * @Title: ItemsService.java 
 * @Package com.visualweibo.ssm.service 
 * @Description: 商品管理service
 * @author cyh tjuchenheng@163.com  
 * @date 2017-2-9 下午11:42:00 
 * @version V1.0   
 */
public interface ItemsService {
  
	//商品查询列表
	public List<ItemsCustom> findItemsList(ItemsQueryVo itemsQueryVo) throws Exception;
	
}
