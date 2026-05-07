package com.upload.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.jeesite.common.collect.ListUtils;
import com.jeesite.common.io.PropertiesUtils;
import com.upload.util.PhotoUtil;
import com.upload.vo.CatchImageResultVo;
import com.upload.vo.UploadImageVo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;


@Controller
@RequestMapping("/")
public class HomeController {

    @ResponseBody
    @RequestMapping("test")
    public String catchImage(HttpServletRequest request, HttpServletResponse response) {
        return "SUCCESS";
    }

    // 下载图片
    @ResponseBody
    @RequestMapping("catchimage")
    public String catchImage(@RequestParam(required = false, value = "source[]")List<String> source, HttpServletRequest request, HttpServletResponse response) {
        PropertiesUtils propertiesUtils = new PropertiesUtils("classpath:config/config.properties");
        String environment = propertiesUtils.getProperty("environment");
        response.setHeader("Access-Control-Allow-Origin",propertiesUtils.getProperty(environment+".http.origin"));
        response.setHeader("Access-Control-Allow-Methods", "POST");
        response.setHeader("Access-Control-Allow-Credentials", "true");

        String rootDiv = "/";
        List<Object> catchImageResultVoList = ListUtils.newArrayList();
        for (int i=0; i<source.size(); i++) {
            String title = String.valueOf(System.currentTimeMillis());

             String pathval = request.getSession().getServletContext().getRealPath("/")+rootDiv;
             String saveFilePath = "/images/ueditor/";

            Map<String, Object> map = PhotoUtil.downImage(source.get(i), title, pathval, saveFilePath);
            CatchImageResultVo catchImageResultVo = new CatchImageResultVo();
            catchImageResultVo.setState(map.get("state").toString());
            catchImageResultVo.setSize(map.get("size").toString());
            catchImageResultVo.setSource(source.get(i));
            catchImageResultVo.setTitle(title+"."+map.get("type").toString());
            catchImageResultVo.setUrl(rootDiv+"upload/"+saveFilePath+title+"."+map.get("type").toString());

            catchImageResultVoList.add(catchImageResultVo);
        }
//        Map<String, Object> map = MapUtils.newHashMap();
//        map.put("state", "SUCCESS");
//        map.put("list", catchImageResultVoList);
//        JSONObject jsonObject = new JSONObject(map);
//        System.out.println(jsonObject.toJSONString());
        JSONArray jsonArray = new JSONArray(catchImageResultVoList);

        System.out.println("{state:\"SUCCESS\",list:"+jsonArray.toJSONString()+"}");

        return "{state:\"SUCCESS\",list:"+jsonArray.toJSONString()+"}";
    }

    @ResponseBody
    @CrossOrigin
    @RequestMapping(value = "uploadimage", method = RequestMethod.POST)
    public UploadImageVo uploadImage(@RequestParam("upfile") MultipartFile upfile, HttpServletRequest request, HttpServletResponse response) {
        PropertiesUtils propertiesUtils = new PropertiesUtils("classpath:config/config.properties");
        String environment = propertiesUtils.getProperty("environment");
        response.setHeader("Access-Control-Allow-Origin", propertiesUtils.getProperty(environment+".http.origin"));
        response.setHeader("Access-Control-Allow-Methods", "POST");
        response.setHeader("Access-Control-Allow-Credentials", "true");
//        Result<String> result = Result.build();
        String fileName = String.valueOf(System.currentTimeMillis());
        String rootDiv = "/";
        String pathval = request.getSession().getServletContext().getRealPath("/")+rootDiv;
        String saveFilePath = "/images/ueditor/";
        Map<String, Object> map = PhotoUtil.saveFile(upfile, fileName, pathval, saveFilePath);

        UploadImageVo uploadImageVo = new UploadImageVo();
        uploadImageVo.setOriginal(map.get("original").toString());
        uploadImageVo.setSize(map.get("size").toString());
        uploadImageVo.setState(map.get("state").toString());
        uploadImageVo.setTitle(fileName+"."+map.get("type").toString());
        uploadImageVo.setType(map.get("size").toString());
        uploadImageVo.setSize("." + map.get("type").toString());
        uploadImageVo.setUrl(rootDiv+"upload/"+saveFilePath+fileName+"."+map.get("type").toString());
        uploadImageVo.setCode("0");

//        JSONObject jsonObject = new JSONObject(uploadImageVo);

        System.out.println(JSONObject.toJSONString(uploadImageVo));
        return uploadImageVo; //JSONObject.toJSONString(uploadImageVo);
    }

}
