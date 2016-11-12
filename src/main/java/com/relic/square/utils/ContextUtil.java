package com.relic.square.utils;

import com.ebay.raptor.kernel.context.IRAppCtx;
import com.ebay.raptor.kernel.context.IRaptorContext;
import com.ebay.raptor.kernel.context.RaptorContextFactory;
import com.ebay.raptor.kernel.util.RaptorConstants;
import com.ebay.raptor.metadata.external.IRaptorPage;
import com.ebay.raptor.metadata.runtime.RaptorMetadata;
import com.ebay.security.raptor.csrf.CSRFTokenFunctions;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentMap;

public class ContextUtil {

  private static final String USER_AGENT_HEADER = "User-Agent";
  private static final String REFERER_HEADER = "Referer";
  private static final String ACCPET_LANGUAGE = "Accept-Language";


  private static ContextUtil instance = new ContextUtil();

  public static ContextUtil getInstance() {
    return instance;
  }


  public String getLoginUserName(IRaptorContext raptorCtx) {
    return raptorCtx.getRequest().getCookieProvider().getUserId();
  }

  public long getLoginUserId(IRaptorContext raptorCtx) {
    Long userId = raptorCtx.getRequest().getCookieProvider().getAccountId();
    if (userId == null)
      return 0;
    return userId;
  }

  public RaptorMetadata getMetaData(IRaptorContext raptorCtx) {
    RaptorMetadata metaData = (RaptorMetadata) raptorCtx.getSysInfo().get(RaptorConstants.SYSINFO_METADATA);
    return metaData;
  }

  public String getPageId(IRaptorContext raptorCtx, String pageName) {
    RaptorMetadata mataData = getMetaData(raptorCtx);
    if (mataData != null) {
      IRaptorPage page = mataData.getAppMetadata().getPage(pageName);
      if (page != null) {
        return page.getId();
      }
    }
    return null;
  }

  public static int getSiteId() {
    return RaptorContextFactory.getCtx().getDomain().getSiteId();
  }

  public static String getUA() {
    return RaptorContextFactory.getCtx().getHttpServletRequest().getHeader(USER_AGENT_HEADER);
  }

  public String getReferer() {
    return RaptorContextFactory.getCtx().getHttpServletRequest().getHeader(REFERER_HEADER);
  }




  public String generateCsfrToken(int sourcePageId, int targetPageId, IRaptorContext raptorCtx) {
    String guid = raptorCtx.getRequest().getCookieProvider().getGuid();
    return CSRFTokenFunctions.generateToken(sourcePageId, targetPageId, guid);
  }

  public String transferDomainPrefixTo(String domainPrefix, String command) {

    return domainPrefix + getSiteDomainString() + command;
  }

  public String getSiteDomainString() {
    IRaptorContext rapCtx = RaptorContextFactory.getCtx();
    String domain = rapCtx.getDomain().getDomainString();
    return domain;
  }


  @SuppressWarnings("unchecked")
  public String getUserIafToken() {
    IRAppCtx<ConcurrentMap<String, Object>> appCtx = RaptorContextFactory.getCtx().getAppCtx();
    ConcurrentMap<String, Object> appInfo = appCtx.getAppInfo();
    String token = (String) appInfo.get(RaptorConstants.APPINFO_IAF_TOKEN);
    return token;
  }

  public String getAppIafToken() {
    String token = RaptorContextFactory.getCtx().getAppCtx().getAppConfig().getIAFToken();
    return token;
  }


  public static String getAcceptLanguage(){return RaptorContextFactory.getCtx().getHttpServletRequest().getHeader(ACCPET_LANGUAGE);}

  public static String getCurrentUserId(){
    return RaptorContextFactory.getCtx().getRequest().getCookieProvider().getUserId();
  }

  public static String arrayToString(List<String> input){
    if(input.size()<=0)
      return "";
    StringBuilder builder = new StringBuilder();
    for (String ele : input) {
      builder.append(ele);
      builder.append(":");
    }
    builder.setLength(builder.length() - 1);
    return builder.toString();
  }

}
