define(['glMatrix'], function(glMat){

		window.requestAnimFrame = (function() {
		  return window.requestAnimationFrame ||
				 window.webkitRequestAnimationFrame ||
				 window.mozRequestAnimationFrame ||
				 window.oRequestAnimationFrame ||
				 window.msRequestAnimationFrame ||
				 function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
				   window.setTimeout(callback, 1000/60);
				 };
		})();

		mat4.translate_alt = function (mat, vec, factor) {
				factor = factor || 1;
			mat[12] += vec[0]*factor;
			mat[13] += vec[1]*factor;
			mat[14] += vec[2]*factor;
		}

        mat4.copyPosition = function (mat, dest, factor) {
        	factor = factor || 1;
	        dest[12] = mat[12] * factor;
	        dest[13] = mat[13] * factor;
	        dest[14] = mat[14] * factor;
	        return dest;
	    };

        mat4.setPosition = function (vec, dest) {
	        dest[12] = vec[0];
	        dest[13] = vec[1];
	        dest[14] = vec[2];
	        return dest;
	    };

        mat4.getPosition = function (mat, dest) {
	        if (!dest) { dest = vec3.create(); }
	        dest[0] = mat[12];
	        dest[1] = mat[13];
	        dest[2] = mat[14];
	        return dest;
	    };

});
