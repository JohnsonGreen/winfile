<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<c:set var="picPath" value="http://127.0.0.1:8003/ssmImage19"></c:set>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>修改商品信息</title>
<script type="text/javascript" src="${pageContext.request.contextPath }/js/jquery.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath }/js/jquery.form.js"></script>
<script type="text/javascript">
function submitImgSize1Upload(){
	
	
	var option={
			type:'POST',
			url:'${pageContext.request.contextPath }/upload/uploadPic.do',
			dataType:'text',
			data:{
				fileName : 'imgSize1File'
			},
			success:function(data){
				
				//把json格式的字符串转换成json对象
				var jsonObj = $.parseJSON(data);
				
				//返回服务器图片路径，把图片路径设置给img标签
				$("#imgSize1ImgSrc").attr("src",jsonObj.fullPath);
				//数据库保存相对路径
				$("#imgSize1").val(jsonObj.relativePath);
			}
			
		};
	
	$("#itemForm").ajaxSubmit(option);
	
}
</script>

</head>
<body> 

<!-- 显示错误信息 -->
<c:if test="${allErrors!=null}">
  <c:forEach items="${allErrors}" var="error">
     ${error.defaultMessage }
  </c:forEach>
</c:if>


<form id="itemForm" action="${pageContext.request.contextPath }/items/editItemsSubmit.action" method="post" enctype="multipart/form-data">
<input type="hidden" name="id" value="${itemsCustom.id }"/>
修改商品信息：
<table width="100%" border=1>
<tr>
	<td>商品名称</td>
	<td><input type="text" name="name" value="${itemsCustom.name }"/></td>
</tr>
<tr>
	<td>商品价格</td>
	<td><input type="text" name="price" value="${itemsCustom.price }"/></td>
</tr>
<tr>
	<td>商品生产日期</td>
	<td><input type="text" name="createtime" value="<fmt:formatDate value="${itemsCustom.createtime}" pattern="yyyy-MM-dd HH:mm:ss"/>"/></td>
</tr>
<tr>
	<td>商品图片</td>
	<td>
		<p><label></label>
		<c:if test="${itemsCustom.pic != null }">
		  <img src="/pic/${itemsCustom.pic }" width=100 height=100/>
		  </br>
		</c:if>
		
		<input type="file" name="items_pic"/>
	
	
		<!--<img id='imgSize1ImgSrc' src='${picPath }${item.pic }'  height="100" width="100" />
		 <input type='file' id='imgSize1File' name='imgSize1File' class="file" onchange='submitImgSize1Upload()' /><span class="pos" id="imgSize1FileSpan">请上传图片的大小不超过5MB</span>
        <input type='hidden' id='imgSize1' name='pic' value='' reg="^.+$" tip="亲！您忘记上传图片了。" /> -->
		</p>
 
	</td>
</tr>
<tr>
	<td>商品简介</td>
	<td>
	<textarea rows="3" cols="30" name="detail">${itemsCustom.detail }</textarea>
	</td>
</tr>
<tr>
<td colspan="2" align="center"><input type="submit" value="提交"/>
</td>
</tr>
</table>

</form>
</body>

</html>