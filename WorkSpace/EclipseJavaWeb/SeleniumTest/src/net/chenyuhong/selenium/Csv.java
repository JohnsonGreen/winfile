package net.chenyuhong.selenium;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**   
 * @Title: Csv.java 
 * @Package net.chenyuhong.selenium 
 * @Description: 
 * @author cyh tjuchenheng@163.com  
 * @date 2017-3-24 下午2:17:15 
 * @version V1.0   
 */
public class Csv {
  
	/**
     * 导入
     * 
     * @param file csv文件(路径+文件)
     * @return
     */
    public static List<Student> importCsv(File file){
        List<Student> dataList=new ArrayList<Student>();
        
        BufferedReader br=null;
        try { 
            br = new BufferedReader(new FileReader(file));
            String line = ""; 
            br.readLine(); 
            
            while ((line = br.readLine()) != null) { 
            	
            	 String[] result = line.split("\\,");
            	 Student student= new Student();
            	 student.setStunum(result[0]);
            	 student.setGithub(result[2]);
            	 for (String s : result) {
                     System.out.println(s);
                 }
            	 
                dataList.add(student);
            }
        }catch (Exception e) {
        }finally{
            if(br!=null){
                try {
                    br.close();
                    br=null;
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
 
        return dataList;
    }
    
    public static Object[][] getStu(){
    	    String path = "F:\\TESTFILE\\inputgit.csv";
    		File file = new File(path);  
    		
    		 List<Student> stuList = Csv.importCsv(file); 
    		Object[][] aObjects = new Object[stuList.size()][2];
    		int i = 0;
    		for(Student stu : stuList){
    			aObjects[i][0] = stu.getStunum();
    			aObjects[i][1] = stu.getGithub();
    			i++;
    		}
    		
    		return aObjects;         //读取文件	
    }

}
