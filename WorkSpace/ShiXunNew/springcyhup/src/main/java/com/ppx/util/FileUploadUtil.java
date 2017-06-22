package com.ppx.util;

/**
 * Created by cyh on 2017/6/13.
 */
import java.io.File;
import java.io.IOException;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.multipart.MultipartFile;

public class FileUploadUtil {

    public static Boolean uploadFile(HttpServletRequest request, MultipartFile file) {
        System.out.println("开始");
       // String path = request.getSession().getServletContext().getRealPath("G:\\");
        String path = "J:\\";
        String fileName = file.getOriginalFilename();
        System.out.println(path);
        System.out.println(fileName);
        File targetFile = new File(path+fileName);
        try{
            targetFile.createNewFile();
        }catch(IOException e){
            e.printStackTrace();
        }

       // if (!targetFile.exists()){
      //      targetFile.mkdirs();
      //  }
        // 保存
        try {
            file.transferTo(targetFile);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

    }

}