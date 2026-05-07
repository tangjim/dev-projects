package com.upload.util;

import com.jeesite.common.collect.MapUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.math.BigDecimal;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;

public class PhotoUtil {

    /**
     * 功能描述   保存图片
     * @param filedata 文件数据 返回图片位置
     */
    public static Map<String, Object> saveFile(MultipartFile filedata, String fileName, String pathval, String saveFilePath) {
        // TODO Auto-generated method stub
//        String pathval = request.getSession().getServletContext().getRealPath("/")+"/upload/";
        // 根据配置文件获取服务器图片存放路径
        // String newFileName = String.valueOf( System.currentTimeMillis());
//        String saveFilePath = "/upload/";
        /* 构建文件目录 */
        File fileDir = new File(pathval + saveFilePath);
        if (!fileDir.exists()) {
            fileDir.mkdirs();
        }
        //上传的文件名
         String filename = filedata.getOriginalFilename();
        //文件的扩张名
         String extensionName = filename.substring(filename.lastIndexOf(".") + 1);
        try {
            String imgPath = saveFilePath + fileName + "." +extensionName;
            //System.out.println(pathval + imgPath);打印图片位置
            FileOutputStream out = new FileOutputStream(pathval + imgPath);

            Map<String, Object> objectMap = MapUtils.newHashMap();
            objectMap.put("state", "SUCCESS");
            objectMap.put("size", pathSize(pathval + imgPath));
            objectMap.put("original", filename);
            objectMap.put("type", extensionName);

            // 写入文件
            out.write(filedata.getBytes());
            out.flush();
            out.close();

            return objectMap;
        } catch (Exception e) {
            e.printStackTrace();
        }
        Map<String, Object> objectMap = MapUtils.newHashMap();
        objectMap.put("state", "ERROR");
        return objectMap;
    }

    /**
     * 功能描述  抓去网络图片
     */
    public static Map<String, Object> downImage(String destUrl, String fileName, String pathval, String saveFilePath) {
        FileOutputStream fos = null;
        BufferedInputStream bis = null;
        HttpURLConnection httpUrl = null;

        String extensionName = destUrl.substring(destUrl.lastIndexOf(".") + 1);
        String imgPath = saveFilePath + fileName + "." +extensionName;
        File fileDir = new File(pathval + saveFilePath);
        /* 构建文件目录 */
        if (!fileDir.exists()) {
            fileDir.mkdirs();
        }

        URL url = null;
        int BUFFER_SIZE = 1024;
        byte[] buf = new byte[BUFFER_SIZE];
        int size = 0;
        try {
            url = new URL(destUrl);
            httpUrl = (HttpURLConnection) url.openConnection();
            httpUrl.connect();
            bis = new BufferedInputStream(httpUrl.getInputStream());
            fos = new FileOutputStream(pathval + imgPath);
            while ((size = bis.read(buf)) != -1) {
                fos.write(buf, 0, size);
            }
            fos.flush();
        } catch (IOException e) {
            Map<String, Object> objectMap = MapUtils.newHashMap();
            objectMap.put("state", "ERROR");
            objectMap.put("size", 0);
            return objectMap;
        } catch (ClassCastException e) {
            Map<String, Object> objectMap = MapUtils.newHashMap();
            objectMap.put("state", "ERROR");
            objectMap.put("size", 0);
            return objectMap;
        } finally {
            try {
                fos.close();
                bis.close();
                httpUrl.disconnect();
                Map<String, Object> objectMap = MapUtils.newHashMap();
                objectMap.put("state", "SUCCESS");
                objectMap.put("type", extensionName);
                objectMap.put("size", pathSize(pathval + imgPath));
                return objectMap;
            } catch (IOException e) {
                Map<String, Object> objectMap = MapUtils.newHashMap();
                objectMap.put("state", "ERROR");
                objectMap.put("size", 0);
                return objectMap;
            } catch (NullPointerException e) {
                Map<String, Object> objectMap = MapUtils.newHashMap();
                objectMap.put("state", "ERROR");
                objectMap.put("size", 0);
                return objectMap;
            }
        }
    }

    /**
     * 获取本地图片的字节数
     * @param imgPath
     * @return
     */
    private static int pathSize(String imgPath) {
        File file = new File(imgPath);
        FileInputStream fis;
        int fileLen = 0;
        try {
            fis = new FileInputStream(file);
            fileLen = fis.available();
        }
        catch (FileNotFoundException e)
        {
            e.printStackTrace();
        } catch (IOException e)
        {
            e.printStackTrace();
        }
        return fileLen;
    }

    /**
     * 将获取到的字节数转换为KB，MB模式
     * @param bytes
     * @return
     */
    private static String bytes2kb(long bytes){
        BigDecimal filesize = new BigDecimal(bytes);
        BigDecimal megabyte = new BigDecimal(1024 * 1024);
        float returnValue = filesize.divide(megabyte, 2, BigDecimal.ROUND_UP).floatValue();
        if(returnValue > 1)
            return (returnValue + "MB");
        BigDecimal kilobyte = new BigDecimal(1024);
        returnValue = filesize.divide(kilobyte, 2, BigDecimal.ROUND_UP).floatValue();
        return (returnValue + "KB");
    }

}
