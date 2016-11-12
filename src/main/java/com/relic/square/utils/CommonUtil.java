package com.relic.square.utils;



import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import java.io.*;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.*;
import java.util.regex.Pattern;


/**
 * Created by yunjiang on 2015/12/8.
 */
public class CommonUtil {
    public static String getMD5(String input) {
        try {
            MessageDigest md5 = MessageDigest.getInstance("MD5");
            md5.update(input.getBytes("UTF-8"));
            byte[] messageDisgest = md5.digest();
            BigInteger number = new BigInteger(1, messageDisgest);
            String hashText = number.toString(16);
            return hashText;
        } catch (NoSuchAlgorithmException e) {
            return "md5" + e.getMessage() + input;
        } catch (UnsupportedEncodingException e) {
            return "md5" + e.getMessage() + input;
        }
    }

    private static final String ELIPSES = "...";
    private static final String AT_THE_RATE = "@";

    public static String maskEmailId(String emailAddr) {
        StringBuilder encEmailAddr = new StringBuilder();
        if (emailAddr != null && !emailAddr.isEmpty()) {
            char firstChar = emailAddr.charAt(0);
            encEmailAddr = encEmailAddr.append(firstChar);
            String[] split = emailAddr.split(AT_THE_RATE);
            char lastChar = split[0].charAt((split[0].length() - 1));
            encEmailAddr.append(ELIPSES).append(lastChar).append(AT_THE_RATE).append(split[1]);

        }
        return encEmailAddr.toString();
    }
    public static Pattern getLikePattern(Object obj) {
        String str = String.valueOf(obj);
        return Pattern.compile("^.*" + str + ".*$", Pattern.CASE_INSENSITIVE);
    }
    public static long getDiffTime(Date d1,Date d2,long nd){
    	return (d1.getTime()-d2.getTime())/nd;
    }
    public static boolean isPrimitiveNumber(Class claz) {
        if (claz.isPrimitive()) {
            if (claz == int.class || claz == float.class || claz == double.class || claz == long.class) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }


    public static List<String> filterListNullAndEmptyStr(List<String> input) {
        for (int i = 0; i < input.size(); i++) {
            if (input.get(i) == null || input.get(i).equals("")) {
                input.remove(i--);
            }
        }
        return input;
    }

    public static void setSerializedData(Object obj, String filename)
            throws IOException {
        FileOutputStream fostream = null;
        ObjectOutputStream oostream = null;

        try {
            fostream = new FileOutputStream(filename);
            oostream = new ObjectOutputStream(fostream);
            oostream.writeObject(obj);
        } catch (IOException ioe) {
            throw ioe;
        } finally {
            oostream.flush();
            fostream.close();
        }
    }
    

    public static Unmarshaller getUnmarshaller(Class<?> clazz)
            throws JAXBException {
        JAXBContext jc = JAXBContext.newInstance(clazz);
        Unmarshaller u = jc.createUnmarshaller();
        return u;
    }

    public static Marshaller getMarshaller(Class<?> clazz) throws Exception {

        JAXBContext jc = JAXBContext.newInstance(clazz);
        Marshaller marshaller = jc.createMarshaller();
        marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
        return marshaller;
    }


    public static String genDedupId(){
        return UUID.randomUUID().toString();
    }

    public static String getStringFromInputStream(InputStream is) {

        BufferedReader br = null;
        StringBuilder sb = new StringBuilder();

        String line;
        try {

            br = new BufferedReader(new InputStreamReader(is));
            while ((line = br.readLine()) != null) {
                sb.append(line);
            }

        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (br != null) {
                try {
                    br.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        return sb.toString();

    }
}
