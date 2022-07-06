public class DailyFunHubController {

	public class ResultWrapper {
		@AuraEnabled
		public String state;
		@AuraEnabled
		public String msg;
	}

	public class CustomException extends Exception { }

	@AuraEnabled(cacheable = false)
	static public ResultWrapper ApexMethod(String recordId) {
		System.debug('ApexController>ApexMethod>parameters: ' + recordId);
		System.debug('ApexController>ApexMethod: setSavepoint');
		Savepoint sp = Database.setSavepoint();
		ResultWrapper rw = new ResultWrapper();
		try {
			// TODO
			if (rw.state == 'DEFAULT') {
				// TODO
			}
			return rw;
		}
		catch(Exception e) {
			System.debug('ApexController>ApexMethod: rollback');
			Database.rollback(sp);
			System.debug('ApexController>ApexMethod>Exception: ' + e.getMessage());
			System.debug('ApexController>ApexMethod>Exception: ' + e.getStackTraceString());
			rw.msg = e.getMessage();
			rw.state = 'ERROR';
			if (rw.msg.contains('FIELD_CUSTOM_VALIDATION_EXCEPTION, ')) {
				rw.msg = rw.msg.split('FIELD_CUSTOM_VALIDATION_EXCEPTION, ') [1];
				if (rw.msg.contains(': []')) {
					rw.msg = rw.msg.split('\\: \\[\\]') [0];
				}
			}
		}
		return rw;
	}

}