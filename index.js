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
  } 
  else {
    var argsArray = program.args.toString().split(',');

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
      for(i in hueId){
        hue.light(hueId[i], function(light){
          hue.change(light.set({'on': boolSetAction}));
        });
      }
    }

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

    // color
    if(argsArray[0] == 'color'){
      if(argsArray[1] >= 1 && argsArray[1] <= 3){
        if(argsArray.length == 5){
          rgbArray = [~~argsArray[2],~~argsArray[3],~~argsArray[4]];
          hue.light(argsArray[1], function(light){
            hue.change(light.set({"on":true,"rgb":rgbArray}));
          });
        }
      }
    }
  }
})();
