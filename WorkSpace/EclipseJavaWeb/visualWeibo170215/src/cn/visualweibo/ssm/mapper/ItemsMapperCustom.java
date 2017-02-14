package cn.visualweibo.ssm.mapper;

import java.util.List;

import cn.visualweibo.ssm.po.ItemsCustom;
import cn.visualweibo.ssm.po.ItemsQueryVo;


public interface ItemsMapperCustom {
    //商品的查询列表
	
	 List<ItemsCustom> findItemsList(ItemsQueryVo itemsQueryVo) throws Exception;
}