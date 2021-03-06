package cn.visualweibo.ssm.service.impl;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;

import sun.print.resources.serviceui;


import cn.visualweibo.ssm.exception.CustomException;
import cn.visualweibo.ssm.mapper.ItemsMapper;
import cn.visualweibo.ssm.mapper.ItemsMapperCustom;
import cn.visualweibo.ssm.po.Items;
import cn.visualweibo.ssm.po.ItemsCustom;
import cn.visualweibo.ssm.po.ItemsExample;
import cn.visualweibo.ssm.po.ItemsQueryVo;
import cn.visualweibo.ssm.service.ItemsService;


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
	
	@Autowired
	private ItemsMapper itemsMapper;
	
//	@Autowired
//	private ItemsCustom
	
	@Override
	public List<ItemsCustom> findItemsList(ItemsQueryVo itemsQueryVo)
			throws Exception {
		//通过ItemCustom查询数据库
		
		
		return itemsMapperCustom.findItemsList(itemsQueryVo);
	}

	@Override
	public ItemsCustom findItemsById(Integer id) throws Exception {
		
		Items items = itemsMapper.selectByPrimaryKey(id);
		
		
		//判断商品是否为空，根据id没有查询到商品，抛出异常，提示用户商品信息不存在
		if(items == null){
			throw new CustomException("修改的商品信息不存在！");
		}
		
		//对商品信息进行业务处理
		ItemsCustom itemsCustom = null;
	
		
		//将items的属性值拷贝到itemsCustom, 通过反射将一个对象的值赋值个另外一个对象（前提是对象中属性的名字相同）
		if(items != null){
			itemsCustom = new ItemsCustom();
			BeanUtils.copyProperties(items, itemsCustom);
		}
		
		
		
		return itemsCustom;
		
	}

	@Override
	public void updateItems(Integer id, ItemsCustom itemsCustom) throws Exception {
		//添加业务校验，在service接口对关键参数进行校验
		//校验id是否为空，如果为空抛出异常,使用Integer是因为int类型没有办法判断是否为空
		
		//更新商品信息使用updateByPrimaryKeyWithBLOBs根据id更新items表中所有字段，包括大文本类型字段
		//要求必须传入id
		itemsCustom.setId(id);
		itemsMapper.updateByPrimaryKeyWithBLOBs(itemsCustom);
	   
	}
	
	
   
	
}
