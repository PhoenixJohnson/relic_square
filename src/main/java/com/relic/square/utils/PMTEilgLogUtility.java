package com.relic.square.utils;

import com.ebay.kernel.calwrapper.*;
import com.ebay.kernel.logger.LogLevel;
import com.ebay.kernel.logger.Logger;
import com.ebay.kernel.util.RopeBuffer;

public class PMTEilgLogUtility {
	
	private static final String NULL_VALUE = "NULL";
	public static boolean isDebug = true;
	
	public static void logInfoEvent(String eventType, String calEventName,
			String eventData, Logger logger, boolean logCal) {

		final String message = new RopeBuffer(calEventName).append(":")
				.append(eventData).toString();

		
		if(logger!=null){
			logger.log(LogLevel.INFO, message);
		}
		
		if (isDebug){
			System.out.println(message);
		}

		if (logCal) {
			CalEvent ce = CalEventFactory.create(eventType);
			ce.setName(calEventName);
			ce.addData(eventData);
			ce.setStatus("0");
			ce.completed();
		}
	}
	
	public static void logWarningEvent(String eventType, String calEventName,
			String eventData, Logger logger, boolean logCal) {
		final String message = new RopeBuffer(calEventName).append(":")
				.append(eventData).toString();
		
		if(logger!=null){
			logger.log(LogLevel.WARN, message);
		}
		
		if (isDebug){
			System.out.println(message);
		}

		if (logCal) {
			CalEvent ce = CalEventFactory.create(eventType);
			ce.setName(calEventName);
			ce.addData(eventData);
			ce.setStatus("WARNING");
			ce.completed();
		}
	}
	
	public static void logErrorEvent(String eventType, String calEventName,
			String eventData, Logger logger, boolean logCal) {

		final String message = new RopeBuffer(calEventName).append(":")
				.append(eventData).toString();

		if(logger!=null){
			logger.log(LogLevel.ERROR, message);
		}
		if (isDebug){
			System.out.println(message);
		}

		if (logCal) {
			CalEvent ce = CalEventFactory.create(eventType);
			ce.setName(calEventName);
			ce.addData(eventData);
			ce.setStatus("ERROR");
			ce.completed();
		}
	}
	
	public static void logErrorEvent(String eventType, String calEventName,
			String eventData, Throwable ex, Logger logger, boolean logCal) {

		if(logger!=null){
			logger.log(LogLevel.ERROR, eventData, ex);
		}
		if (isDebug){
			System.out.println(eventData);
			ex.printStackTrace();
		}

		if (logCal) {

			CalEventHelper.writeLog(eventType, calEventName, eventData, ex,
					true, "FAILED");

		}
	}
	
	public static CalTransaction createCalTransaction(String transactionType, String transactionName, Logger logger){

		final String message =
			new RopeBuffer("\n===============Creating CAL transaction [")
				.append(transactionName)
				.append("] of type [")
				.append(transactionType)
				.append("]===============")
				.toString();

		if(logger.isLogEnabled(LogLevel.INFO)){
			logger.log(LogLevel.INFO, message);
		}

		CalTransaction calTransaction = CalTransactionFactory.create(transactionType);
		calTransaction.setName(transactionName);
		return calTransaction;

	}
	
	public static void completeFailedTransaction(CalTransaction calTransaction, String status, Logger logger){

		final String message =
			new RopeBuffer("===============CAL transaction [")
				.append(calTransaction.getName())
				.append("] failed with status [")
				.append(status + "]===============")
				.toString();

		logger.log(LogLevel.ERROR, message);

		calTransaction.setStatus(status);
		calTransaction.completed();
	}
	
	public static void completeSuccessfullTransaction(CalTransaction calTransaction, Logger logger){

		final String message =
			new RopeBuffer("===========CAL transaction [")
				.append(calTransaction.getName())
				.append("] completed successfully===========")
				.toString();

		if(logger.isLogEnabled(LogLevel.INFO)){
			logger.log(LogLevel.INFO, message);
		}

		calTransaction.setStatus("0");
		calTransaction.completed();
	}	
	
	public static CalTransaction createFlowTransaction(String flowName, Logger logger){
		String trxType = String.format("RRP_%S", flowName == null ? NULL_VALUE : flowName);
		return createCalTransaction(trxType, flowName == null ? NULL_VALUE : flowName, logger);
	}

}
