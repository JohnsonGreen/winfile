package com.visualweibo.ssm.mapper;

import java.util.List;

import com.visualweibo.ssm.po.ItemsCustom;
import com.visualweibo.ssm.po.ItemsQueryVo;


public interface ItemsMapperCustom {
    //商品的查询列表
	
	 List<ItemsCustom> findItemsList(ItemsQueryVo itemsQueryVo) throws Exception;
}