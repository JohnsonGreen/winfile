package net.chenyuhong.junitTest;
/**   
 * @Title: Triangle.java 
 * @Package net.chenyuhong.junitTest 
 * @Description: 测试三角形是否为等边等腰或者是不等边的
 * @author cyh tjuchenheng@163.com  
 * @date 2017-3-10 上午11:13:48 
 * @version V1.0   
 */
public class Triangle {

     public static String classify(int a,int b,int c){
    	 
    	 if(!((a + b > c) && (a + c > b) && (b + c > a))){
    		 return "非三角形";
    	 }else if(a == b && a == c && b == c){
    		 return "等边三角形";
    	 }else if(a != b &&  a != c && b != c){
    		 return "不等边三角形";
    	 }else{
    		 return "等腰三角形";
    	 }
    	 
     }
	
}
