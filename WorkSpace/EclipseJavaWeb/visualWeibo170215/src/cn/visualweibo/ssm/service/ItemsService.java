package cn.visualweibo.ssm.service;

import java.util.List;

import cn.visualweibo.ssm.po.ItemsCustom;
import cn.visualweibo.ssm.po.ItemsQueryVo;

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
	
	
	//根据id查询商品信息
	public ItemsCustom findItemsById(Integer id) throws Exception;
	
	
	//修改商品信息
	/**
	 * 
	 * @param id  修改商品的id
	 * @param itemsCustom 修改的商品信息
	 * @throws Exception
	 */
	public void updateItems(Integer id, ItemsCustom itemsCustom) throws Exception;
	
	
}
