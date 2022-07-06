({
	doInit : function(component, event, helper) {
		console.log("JScontroller.js>doInit");
		component.set("v.showSpinner", true);
		component.set("v.state", "DEFAULT");   
		component.set("v.msg", null);

		var recordId = component.get("v.recordId");
		console.log("JScontroller.js>recordId: " + recordId);

		component.set("v.showSpinner", false);
	},

	todo : function(component, event, helper) {
		console.log("JScontroller.js>todo");
		component.set("v.showSpinner", true);

		var recordId = component.get("v.recordId");
		console.log("JScontroller.js>todo>recordId: " + recordId);
		
		var action = component.get("c.ApexMethod");
		action.setParams({ recordId : recordId });

		action.setCallback(this, function(response) {
			var state = response.getState();
			var result = response.getReturnValue();
			console.log('JScontroller.js>todo>result.state: ', result.state);
			console.log('JScontroller.js>todo>result.msg: ', result.msg);
			      
			if (state === "SUCCESS") {	
				component.set("v.state", result.state);   
				component.set("v.msg", result.msg);
				if(state == 'FINISH') {
					component.set("v.showSpinner", false);
					// Fresh the page?
				}
			} 
			else {
				component.set("v.state", "ERROR");   
				component.set("v.msg", "Something went wrong.");
			}
			component.set("v.showSpinner", false);
		}) 
		$A.enqueueAction(action);
	},

	cancel : function(component, event, helper) {
		console.log("JScontroller.js>cancel");
		component.set("v.msg", null);
		component.set("v.state", 'DEFAULT');
	},

	back : function(component, event, helper){
		console.log("JScontroller.js>back");
		component.doInitMethod();
	},
})