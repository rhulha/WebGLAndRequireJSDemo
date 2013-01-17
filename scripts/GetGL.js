// SINGLETON
define(["GetCanvas"], function(canvas){
   "use strict";

   var gl;
   try {
	   gl = canvas.getContext("experimental-webgl");
	} catch (e) {
	  alert(e);
	}
	if (!gl) {
		alert("Could not initialise WebGL, get Chrome or Firefox !");
	}

	console.log('GL created');
	return gl;
	
});
