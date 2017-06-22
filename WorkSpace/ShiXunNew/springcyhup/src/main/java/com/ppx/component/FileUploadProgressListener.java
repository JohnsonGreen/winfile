package com.ppx.component;

/**
 * Created by cyh on 2017/6/12.
 */
import javax.servlet.http.HttpSession;

import com.ppx.pojo.Progress;
import org.apache.commons.fileupload.ProgressListener;
import org.springframework.stereotype.Component;

@Component
public class FileUploadProgressListener implements ProgressListener {
    private HttpSession session;
    public void setSession(HttpSession session){
        this.session=session;
        Progress status = new Progress();//保存上传状态
        session.setAttribute("proInfo", status);
    }
    @Override
    public void update(long pBytesRead, long pContentLength, int pItems) {
        Progress status = (Progress) session.getAttribute("proInfo");
        try {
            Thread.sleep(5);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        status.setpBytesRead(pBytesRead);
        status.setpContentLength(pContentLength);
        status.setpItems(pItems);
       // session.setAttribute("proInfo", status);
        System.out.println(">>>>>>>>>>>>>>>>>>>>"+status);

    }

}