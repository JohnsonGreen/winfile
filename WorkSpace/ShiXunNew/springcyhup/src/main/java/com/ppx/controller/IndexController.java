package com.ppx.controller;


import com.ppx.pojo.Progress;
import com.ppx.util.FileUploadUtil;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.ProgressListener;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Iterator;
import java.util.List;

/**
 * Created by cyh on 2017/6/12.
 */

@Controller
public class IndexController {

    @RequestMapping("/")
    public String index(){
        return "index";
    }

    @RequestMapping("/up")
    public String upview(){
        return "upview";
    }

    /**
     * upload  上传文件
     * @param request
     * @param response
     * @return
     * @throws Exception
     */

    @RequestMapping(value = "/upload")
    public void uploadFile(HttpServletRequest request,HttpServletResponse response,
                           @RequestParam("fileup") MultipartFile file)throws IOException {

        response.setContentType("text/html");
        response.setCharacterEncoding("GBK");
        PrintWriter out;
        boolean flag = false;
        if (file.getSize() > 0) {
            //文件上传的位置可以自定义
            flag = FileUploadUtil.uploadFile(request,file );
        }
        out = response.getWriter();
        if (flag == true) {
            out.print("1");
        } else {
            out.print("2");
        }

    }

    /**
     * process 获取进度
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/process.json", method = RequestMethod.GET)
    @ResponseBody
    public Object process(HttpServletRequest request,
                          HttpServletResponse response) throws Exception {
        HttpSession session  = request.getSession();
        Progress pro = (Progress)session.getAttribute("proInfo");
        System.out.println(pro);
        return pro;
    }

}
