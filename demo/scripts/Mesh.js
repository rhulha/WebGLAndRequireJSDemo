// CLASS
define(["glMatrix", "GetGL", "Spatial"], function(glmat, gl, Spatial){

	function Mesh(dataObj)
	{
		this.name ="";
		this.type ="";
		this.enabled = true;

		// position and rotation
		this.matrix = mat4.create();
		mat4.identity(this.matrix);

		// children inheret the parent matrix for its rotation and position
		this.children = [];

		this.add = function(obj) {
			this.children.push(obj);
			return obj;
		}

		this.numItems = dataObj.vertexIndices.length;
		this.texture = dataObj.texture;


		this.verticesBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(dataObj.vertices), gl.STATIC_DRAW);

		this.textureCoordBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(dataObj.textureCoords), gl.STATIC_DRAW);	
		
		this.vertexIndexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(dataObj.vertexIndices), gl.STATIC_DRAW);


		// overwrite to animate this object
		this.animate = function(elapsed)
		{

		}

		this.mvMatrix = mat4.create();

		this.draw = function(program, parentMVMatrix)
		{
			mat4.set( parentMVMatrix, this.mvMatrix); // copy the mvMatrix, so we don't change the original

 			mat4.multiply( this.mvMatrix, this.matrix);

			gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesBuffer);
			gl.vertexAttribPointer(program.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

			gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordBuffer);
			gl.vertexAttribPointer(program.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);

			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, this.texture);
			gl.uniform1i(program.samplerUniform, 0);

			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer);
			gl.uniformMatrix4fv(program.mvMatrixUniform, false, this.mvMatrix);
			gl.drawElements(gl.TRIANGLES, this.numItems, gl.UNSIGNED_SHORT, 0);

			for (var i = 0; i < this.children.length; i++)
			{
				this.children[i].draw( program, this.mvMatrix);
			}
		}
	}
	Mesh.prototype = new Spatial(false);
	return Mesh;

});
