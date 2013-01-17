// CLASS
define(["glMatrix", "GetGL"], function(glmat, gl){

	return function(vertices, texture)
	{
		this.name ="";
		this.type ="particles";
		this.enabled = true;
		// position
		this.x = 0;
		this.y = 0;
		this.z = 0;

		this.numItems = vertices.length / 3;
		
		this.texture = texture;

		this.verticesBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);

		this.mvMatrix = mat4.create();

		this.draw = function(program)
		{
			if( !this.texture.ready)
				return;
			mat4.set( program.mvMatrix, this.mvMatrix); // copy the mvMatrix, so we don't change the original
			
			//gl.disable(gl.DEPTH_TEST);
			gl.enable(gl.BLEND);
			gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

			mat4.translate(this.mvMatrix, [this.x, this.y, this.z]);

			gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesBuffer);
			gl.vertexAttribPointer(program.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, this.texture);
			gl.uniform1i(this.samplerUniform, 0);

			gl.uniformMatrix4fv(program.mvMatrixUniform, false, this.mvMatrix);
			gl.drawArrays(gl.POINTS, 0, this.numItems);
			gl.disable(gl.BLEND);
			gl.enable(gl.DEPTH_TEST);
		}
	}
});
