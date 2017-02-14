package cn.visualweibo.ssm.po;


import java.util.List;
/**   
 * @Title: ItemsQueryVo.java 
 * @Package com.visualweibo.ssm.po 
 * @Description: 商品的包装对象
 * @author cyh tjuchenheng@163.com  
 * @date 2017-2-9 下午10:53:03 
 * @version V1.0   
 */
public class ItemsQueryVo {
   //商品信息
	private Items items;
	
	//为了系统可扩展性，对原始生成的po进行扩展
	private ItemsCustom itemsCustom;
	
	//批量商品信息
	private List<ItemsCustom> itemsList;

	public Items getItems() {
		return items;
	}

	public void setItems(Items items) {
		this.items = items;
	}

	public ItemsCustom getItemsCustom() {
		return itemsCustom;
	}

	public void setItemsCustom(ItemsCustom itemsCustom) {
		this.itemsCustom = itemsCustom;
	}

	public List<ItemsCustom> getItemsList() {
		return itemsList;
	}

	public void setItemsList(List<ItemsCustom> itemsList) {
		this.itemsList = itemsList;
	}
	
	
}
