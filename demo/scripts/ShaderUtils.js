define(["GetGL"], function(gl){
    "use strict";

	return {
		getShader : function(type, text) {
			var shader = gl.createShader(type);

			gl.shaderSource(shader, text);
			gl.compileShader(shader);

			if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
				throw new Error(gl.getShaderInfoLog(shader));
			}
			return shader;
		},


		getProgram : function(vertexShaderText, fragmentShaderText) {

			var shaderProgram = gl.createProgram();
			gl.attachShader(shaderProgram, this.getShader( gl.VERTEX_SHADER, vertexShaderText));
			gl.attachShader(shaderProgram, this.getShader( gl.FRAGMENT_SHADER, fragmentShaderText));
			gl.linkProgram(shaderProgram);

			if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
				throw new Error("Could not initialise shaders");
			}

			return shaderProgram;
		}
	}
});
