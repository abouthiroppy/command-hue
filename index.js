#!/usr/bin/env node

(function(){
	var hue = require('hue-module/lib/hue');
	var program = require('commander');

	program
	    .version('1.0.0')
	    .usage('<keywords>')
	    .parse(process.argv);

	// set ip and username
	hue.load('192.168.11.2', 'newdeveloper');

	if(!program.args.length) {
	    program.help();
	} else {

	    ////////////////////////////////////////////////
	    // all
	    var allAction = function(boolSetAction){
			hue.lights(function(lights){
				for(i in lights){
					if(lights.hasOwnProperty(i)){
			        	hue.change(lights[i].set({'on': boolSetAction}));
					}
				}
			});
	    };
	    var selectAction = function(boolSetAction,hueId){
	    	hue.lights(function(lights){
				for(i in lights){
					if(lights.hasOwnProperty(i) && !hueId.indexOf(lights[i].id)){
			        	hue.change(lights[i].set({'on': boolSetAction}));
					}
				}
			});
	    }

		var argsArray = program.args.toString().split(',');

		// turn off
	    if(argsArray[0] == 'off'){
	    	if(program.args.length == 1){
		    	allAction(false);
	    	}
	    	else{
	    		argsArray.splice(0,1);
	    		selectAction(false,argsArray);
	    	}
	    }
		// turn on
	    if(argsArray[0] == 'on'){
			if(program.args.length == 1){
		    	allAction(true);
		    }
		    else{
				argsArray.splice(0,1);
				selectAction(true,argsArray);
		    }
	    }
	    ////////////////////////////////////////////////
	}
})();
