<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
 <%@page import="java.util.Date" %>  
    <%@ taglib uri="http://www.opensymphony.com/oscache" prefix="oscache" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title></title>
</head>
<body>
  现在时间: <%= new Date() %> <br> <br>
  
  <oscache:cache time="4">
        缓存时间：<%= new Date() %>
  </oscache:cache>


</body>
</html>