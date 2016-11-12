package com.relic.square.utils;


import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonMethod;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.type.TypeFactory;
import org.codehaus.jackson.type.JavaType;

import java.io.*;
import java.util.List;

/**
 * Created by yunjiang on 2015/12/8.
 */
public class JsonUtil {
	
	private static JsonUtil instance = null;
	
	public static synchronized JsonUtil getInstance() {
		if (instance == null) {
			instance = new JsonUtil();
		}
		return instance;
	}
	
	
	public String readJson(String path){
        
		File file = new File(path);
        BufferedReader reader = null;
        
        StringBuffer data = new StringBuffer();
        //
        try {
            reader = new BufferedReader(new FileReader(file));
            
            String temp = null;
            while((temp = reader.readLine()) != null){
                data.append(temp);
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            return "";
        } catch (IOException e) {
            e.printStackTrace();
            return "";
        }finally {
           
            if (reader != null){
                try {
                    reader.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        String returnString = data.toString();

        return returnString;
	     
    }
	
    public static <T> List<T> jsonStrToList(String jsonStr, Class<T> clazz)
            throws IOException, JsonParseException, JsonMappingException {
        ObjectMapper mapper = new ObjectMapper().setVisibility(
                JsonMethod.FIELD, JsonAutoDetect.Visibility.ANY);
        mapper.configure(
                org.codehaus.jackson.map.DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES,
                false);
        List<T> hitList = mapper.readValue(jsonStr,
                TypeFactory.collectionType(List.class, clazz));
        return hitList;
    }


    public static <T> void convertToJson(String fullFileName, T o) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        mapper.writeValue(new File(fullFileName), o);
    }

    public static <T> T convertFromJson(String fullFileName, Class<T> claz) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        T t = mapper.readValue(new File(fullFileName), claz);
        return t;
    }
    public static <T> T jsonStr2Obj(String jsonStr,Class<T> tClass) throws IOException {
        ObjectMapper mapper = new ObjectMapper().setVisibility(JsonMethod.FIELD, JsonAutoDetect.Visibility.ANY);
        mapper.configure(org.codehaus.jackson.map.DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES,false);
        return mapper.readValue(jsonStr, tClass);
    }
    public static <T> List<T> convertToListFromJson(String fullFileName, JavaType javaType) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        List<T> list = mapper.readValue(new File(fullFileName), javaType);
        return list;
    }
    public boolean writeJson(String path,List<Object> jsonList){
//
        JsonConfig cfg=new JsonConfig();
        JSONArray objlist = JSONArray.fromObject(jsonList, cfg);
        FileOutputStream out = null;
        OutputStreamWriter osw = null;
        BufferedWriter bw = null;
        try {
            out = new FileOutputStream(path);
            osw = new OutputStreamWriter(out, "UTF-8");
            bw = new BufferedWriter(osw);
            if (objlist != null && !objlist.isEmpty()) {
                bw.write(objlist.toString());
            }

        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }catch(Exception ex){
            ex.printStackTrace();
            return false;
        }finally {
            if (bw != null) {
                try {
                    bw.close();
                    bw = null;
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (osw != null) {
                try {
                    osw.close();
                    osw = null;
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (out != null) {
                try {
                    out.close();
                    out = null;
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        System.out.println("Audit Json file generated successfully!");
        return true;
    }
}
