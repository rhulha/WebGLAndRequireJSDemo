// SINGLETON
define(["GetGL", "Camera", "ShaderUtils", "text!Color.vs", "text!Color.fs"], function(gl, camera, shaderUtils, vertexShader, fragmentShader){
    "use strict";

    return new function() {

		this.mvMatrix = mat4.create();

		this.objects = [];

    	var shaderProgram = shaderUtils.getProgram( vertexShader,  fragmentShader);
		this.shaderProgram = shaderProgram;

		this.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
		gl.enableVertexAttribArray(this.vertexPositionAttribute);

		this.vertexColorAttribute  = gl.getAttribLocation(shaderProgram, "aVertexColor");
		gl.enableVertexAttribArray(this.vertexColorAttribute );

		this.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
		this.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
		this.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");

		
		this.add = function(obj) {
			this.objects.push(obj);
			return obj;
		}

		this.animate = function (elapsed) {
			for (var i = 0; i < this.objects.length; i++)
			{
				var obj = this.objects[i];
				//console.log(obj.name);
				if( obj.enabled && obj.animate)
					obj.animate(elapsed);
			}
		}

		this.drawObjects = function(objects)
		{
			for (var i = 0; i < objects.length; i++)
			{
				var obj = objects[i];
				//console.log(obj.name);
				if( obj.enabled )
					obj.draw(this, this.mvMatrix);
			}
		}

		this.draw = function(pMatrix)
		{
			gl.useProgram(shaderProgram);
	
			gl.uniformMatrix4fv(this.pMatrixUniform, false, pMatrix);

			camera.getMVMatrix(this.mvMatrix, true);
			this.drawObjects(this.objects);		

		}
    }
});
